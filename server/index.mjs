// Choplogic analytics server.
//
// Single-file Node service.  Serves three endpoints:
//   POST  /track          ← anonymous beacon from the static site
//   POST  /admin/login    ← password → HMAC-signed httpOnly cookie
//   POST  /admin/logout   ← clears the cookie
//   GET   /api/stats      ← aggregates for the admin dashboard
//   GET   /api/events     ← raw event log for the admin dashboard
//   GET   /healthz        ← liveness probe
//
// Storage: better-sqlite3 (synchronous, fast, embedded).  No other deps.
// Auth: HMAC-signed cookie issued at /admin/login, checked on /api/*.
// Privacy: session_id is sha256(ip|ua|date|salt); no raw IPs stored.

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import crypto from 'node:crypto';
import Database from 'better-sqlite3';

// ─── Config ────────────────────────────────────────────────────────────

const HERE = path.dirname(url.fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 4040);
const DB_PATH = process.env.DB_PATH || path.join(HERE, 'analytics.db');

// Read .env (very small parser — no dotenv dep)
const ENV_FILE = path.join(HERE, '.env');
if (fs.existsSync(ENV_FILE)) {
  for (const line of fs.readFileSync(ENV_FILE, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

const SALT        = process.env.SALT        || crypto.randomBytes(32).toString('hex');
const SESSION_KEY = process.env.SESSION_KEY || crypto.randomBytes(32).toString('hex');
const ADMIN_HASH  = process.env.ADMIN_HASH  || sha256('log123');

// Allowed origins for CORS — only the production site + localhost for dev.
const ALLOWED_ORIGINS = new Set([
  'https://chopradio.com',
  'https://www.chopradio.com',
  'http://localhost:8765',
  'http://127.0.0.1:8765',
]);

// ─── Database ──────────────────────────────────────────────────────────

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('synchronous = NORMAL');

// Apply schema on first run
const SCHEMA = fs.readFileSync(path.join(HERE, 'schema.sql'), 'utf8');
db.exec(SCHEMA);

const stmts = {
  insertPageview: db.prepare(`
    INSERT INTO pageviews (ts, session_id, path, ref_host, ua_family, device, is_unique)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `),
  insertEvent: db.prepare(`
    INSERT INTO events (ts, session_id, path, name, data)
    VALUES (?, ?, ?, ?, ?)
  `),
  sessionSeen: db.prepare(`
    SELECT 1 FROM pageviews WHERE session_id = ? LIMIT 1
  `),
  pageviewsBy: {
    day: db.prepare(`
      SELECT strftime('%Y-%m-%d', ts/1000, 'unixepoch') AS bucket,
             COUNT(*) AS views,
             COUNT(DISTINCT session_id) AS uniques
        FROM pageviews
       WHERE ts >= ?
    GROUP BY bucket
    ORDER BY bucket ASC
    `),
    hour: db.prepare(`
      SELECT strftime('%Y-%m-%dT%H:00', ts/1000, 'unixepoch') AS bucket,
             COUNT(*) AS views,
             COUNT(DISTINCT session_id) AS uniques
        FROM pageviews
       WHERE ts >= ?
    GROUP BY bucket
    ORDER BY bucket ASC
    `),
  },
  topPaths: db.prepare(`
    SELECT path, COUNT(*) AS views, COUNT(DISTINCT session_id) AS uniques
      FROM pageviews
     WHERE ts >= ?
  GROUP BY path
  ORDER BY views DESC
     LIMIT 20
  `),
  topReferrers: db.prepare(`
    SELECT ref_host AS host, COUNT(*) AS views
      FROM pageviews
     WHERE ts >= ? AND ref_host IS NOT NULL AND ref_host != ''
  GROUP BY ref_host
  ORDER BY views DESC
     LIMIT 20
  `),
  deviceBreakdown: db.prepare(`
    SELECT device, COUNT(*) AS views
      FROM pageviews
     WHERE ts >= ?
  GROUP BY device
  ORDER BY views DESC
  `),
  uaBreakdown: db.prepare(`
    SELECT ua_family AS family, COUNT(*) AS views
      FROM pageviews
     WHERE ts >= ?
  GROUP BY ua_family
  ORDER BY views DESC
  `),
  hourOfDay: db.prepare(`
    SELECT CAST(strftime('%H', ts/1000, 'unixepoch') AS INTEGER) AS hour,
           CAST(strftime('%w', ts/1000, 'unixepoch') AS INTEGER) AS dow,
           COUNT(*) AS views
      FROM pageviews
     WHERE ts >= ?
  GROUP BY hour, dow
  `),
  recentEvents: db.prepare(`
    SELECT ts, kind, path, ua_family, device, name, data
      FROM recent_activity
     LIMIT ?
  `),
  totals: db.prepare(`
    SELECT COUNT(*) AS views,
           COUNT(DISTINCT session_id) AS uniques
      FROM pageviews
     WHERE ts >= ?
  `),
};

// ─── Helpers ───────────────────────────────────────────────────────────

function sha256(s) {
  return crypto.createHash('sha256').update(s).digest('hex');
}

function sessionHash(ip, ua) {
  const day = new Date().toISOString().slice(0, 10);
  return sha256(`${ip}|${ua}|${day}|${SALT}`).slice(0, 32);
}

// Tiny UA classifier — good enough for "Chrome / Safari / Firefox / Other".
function uaFamily(ua = '') {
  if (/Edg\//.test(ua))      return 'Edge';
  if (/Firefox\//.test(ua))  return 'Firefox';
  if (/Chrome\//.test(ua))   return 'Chrome';
  if (/Safari\//.test(ua))   return 'Safari';
  if (/curl|wget|bot|crawl|spider/i.test(ua)) return 'Bot';
  return 'Other';
}

function clientIp(req) {
  const xff = req.headers['x-forwarded-for'];
  if (xff) return String(xff).split(',')[0].trim();
  return req.socket.remoteAddress || '';
}

function corsHeaders(req) {
  const origin = req.headers.origin || '';
  const allow = ALLOWED_ORIGINS.has(origin) ? origin : '';
  return {
    'access-control-allow-origin': allow,
    'access-control-allow-credentials': 'true',
    'access-control-allow-methods': 'GET, POST, OPTIONS',
    'access-control-allow-headers': 'content-type',
    'vary': 'origin',
  };
}

function readBody(req, max = 8 * 1024) {
  return new Promise((resolve, reject) => {
    let len = 0;
    const chunks = [];
    req.on('data', (c) => {
      len += c.length;
      if (len > max) { req.destroy(); reject(new Error('body too large')); return; }
      chunks.push(c);
    });
    req.on('end', () => {
      try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')); }
      catch (e) { reject(e); }
    });
    req.on('error', reject);
  });
}

function send(res, status, body, extra = {}) {
  const h = { 'content-type': 'application/json', ...extra };
  res.writeHead(status, h);
  res.end(typeof body === 'string' ? body : JSON.stringify(body));
}

// ─── Auth (HMAC-signed cookie) ─────────────────────────────────────────

const COOKIE = 'chop_admin';
const COOKIE_TTL = 30 * 24 * 60 * 60; // 30 days

function signSession() {
  const exp = Date.now() + COOKIE_TTL * 1000;
  const payload = `admin.${exp}`;
  const sig = crypto
    .createHmac('sha256', SESSION_KEY)
    .update(payload)
    .digest('hex')
    .slice(0, 32);
  return `${payload}.${sig}`;
}

function verifySession(token = '') {
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  const [, exp, sig] = parts;
  if (Number(exp) < Date.now()) return false;
  const expected = crypto
    .createHmac('sha256', SESSION_KEY)
    .update(`admin.${exp}`)
    .digest('hex')
    .slice(0, 32);
  return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
}

function readCookie(req, name) {
  const raw = req.headers.cookie || '';
  for (const c of raw.split(';')) {
    const [k, v] = c.trim().split('=');
    if (k === name) return v;
  }
  return '';
}

function isAdmin(req) {
  return verifySession(readCookie(req, COOKIE));
}

function setSessionCookie(token) {
  // Domain=.chopradio.com so the cookie is valid for both chopradio.com
  // (where /admin lives) and api.chopradio.com (where this server lives).
  return [
    `${COOKIE}=${token}`,
    `Max-Age=${COOKIE_TTL}`,
    'Path=/',
    'HttpOnly',
    'Secure',
    'SameSite=Lax',
    'Domain=.chopradio.com',
  ].join('; ');
}

function clearSessionCookie() {
  return [
    `${COOKIE}=`,
    'Max-Age=0',
    'Path=/',
    'HttpOnly',
    'Secure',
    'SameSite=Lax',
    'Domain=.chopradio.com',
  ].join('; ');
}

// ─── Server ────────────────────────────────────────────────────────────

const server = http.createServer(async (req, res) => {
  const u = new URL(req.url, `http://${req.headers.host}`);
  const cors = corsHeaders(req);

  if (req.method === 'OPTIONS') {
    res.writeHead(204, cors);
    return res.end();
  }

  try {
    // ─ Beacon ──────────────────────────────────────────────────────
    if (req.method === 'POST' && u.pathname === '/track') {
      const body = await readBody(req);
      const ip = clientIp(req);
      const ua = req.headers['user-agent'] || '';
      const sid = sessionHash(ip, ua);
      const path_ = String(body.path || '/').slice(0, 500);
      const ref = String(body.ref || '').slice(0, 200);
      const device = ['mobile', 'tablet', 'desktop'].includes(body.device) ? body.device : 'desktop';

      const seen = stmts.sessionSeen.get(sid);
      const isUnique = seen ? 0 : 1;

      if (body.name && body.name !== 'pageview') {
        const data = body.data ? JSON.stringify(body.data).slice(0, 2000) : null;
        stmts.insertEvent.run(Date.now(), sid, path_, String(body.name).slice(0, 64), data);
      } else {
        stmts.insertPageview.run(
          Date.now(), sid, path_, ref, uaFamily(ua), device, isUnique
        );
      }
      res.writeHead(204, cors);
      return res.end();
    }

    // ─ Admin login ────────────────────────────────────────────────
    if (req.method === 'POST' && u.pathname === '/admin/login') {
      const body = await readBody(req);
      const hash = sha256(String(body.password || ''));
      if (hash !== ADMIN_HASH) {
        return send(res, 401, { ok: false }, cors);
      }
      const token = signSession();
      return send(res, 200, { ok: true }, { ...cors, 'set-cookie': setSessionCookie(token) });
    }

    // ─ Admin logout ───────────────────────────────────────────────
    if (req.method === 'POST' && u.pathname === '/admin/logout') {
      return send(res, 200, { ok: true }, { ...cors, 'set-cookie': clearSessionCookie() });
    }

    // ─ Stats (auth required) ──────────────────────────────────────
    if (req.method === 'GET' && u.pathname === '/api/stats') {
      if (!isAdmin(req)) return send(res, 401, { error: 'unauthorized' }, cors);
      const days = Math.max(1, Math.min(365, Number(u.searchParams.get('days') || 30)));
      const since = Date.now() - days * 86400 * 1000;
      const bucket = days <= 2 ? 'hour' : 'day';
      return send(res, 200, {
        range: { days, since, until: Date.now(), bucket },
        totals: stmts.totals.get(since),
        timeseries: stmts.pageviewsBy[bucket].all(since),
        topPaths: stmts.topPaths.all(since),
        topReferrers: stmts.topReferrers.all(since),
        devices: stmts.deviceBreakdown.all(since),
        ua: stmts.uaBreakdown.all(since),
        hourOfDay: stmts.hourOfDay.all(since),
      }, cors);
    }

    // ─ Recent activity stream ─────────────────────────────────────
    if (req.method === 'GET' && u.pathname === '/api/events') {
      if (!isAdmin(req)) return send(res, 401, { error: 'unauthorized' }, cors);
      const limit = Math.max(1, Math.min(500, Number(u.searchParams.get('limit') || 100)));
      return send(res, 200, { events: stmts.recentEvents.all(limit) }, cors);
    }

    // ─ Health ─────────────────────────────────────────────────────
    if (req.method === 'GET' && u.pathname === '/healthz') {
      return send(res, 200, { ok: true, ts: Date.now() }, cors);
    }

    res.writeHead(404, cors);
    res.end();
  } catch (err) {
    console.error('handler error:', err);
    send(res, 500, { error: 'internal' }, cors);
  }
});

server.listen(PORT, () => {
  console.log(`[choplogic-analytics] listening on http://localhost:${PORT}`);
  console.log(`[choplogic-analytics] db=${DB_PATH}`);
});

// Graceful shutdown so launchd's KeepAlive doesn't fight us during stops.
for (const sig of ['SIGINT', 'SIGTERM']) {
  process.on(sig, () => {
    console.log(`[choplogic-analytics] ${sig}, closing db…`);
    db.close();
    server.close(() => process.exit(0));
  });
}
