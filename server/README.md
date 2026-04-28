# Choplogic analytics server

A small, self-contained analytics service for chopradio.com.  Pure OSS,
no third-party SaaS, no platform lock-in.  Runs on any machine with
Node 20+ — designed for a Mac mini at home.

## Stack

| Component        | Why                                                     |
| ---------------- | ------------------------------------------------------- |
| Node.js (≥20)    | Standard library only + one npm dep                     |
| `better-sqlite3` | Fast synchronous SQLite bindings, MIT-licensed          |
| SQLite           | Public-domain, embedded, the data lives in one file     |
| launchd          | macOS auto-start (built-in)                             |
| Tailscale Funnel | Public HTTPS endpoint for a residential box (WireGuard) |

No Cloudflare, no Vercel, no analytics SaaS.  All code is in this repo.

## What it does

- `POST /track` — anonymous beacon from the static site.  Records a
  pageview or named custom event.
- `POST /admin/login` — verify password, issue an HMAC-signed httpOnly
  session cookie (30 days).
- `POST /admin/logout` — clear the cookie.
- `GET /api/stats?days=N` — aggregates for the dashboard (timeseries,
  top paths, referrers, devices, UA, hour-of-day matrix).
- `GET /api/events?limit=N` — recent activity stream.
- `GET /healthz` — liveness probe.

Privacy: no raw IPs stored, no cookies on visitors.  Session ID is
`sha256(ip + ua + YYYY-MM-DD + salt)` rotated daily.

## Deploy on a Mac mini

```bash
# in the repo, on the mini:
cd server
./deploy-macmini.sh
```

The script:
1. Installs Homebrew + Node if needed
2. `npm install` (only `better-sqlite3`)
3. Initializes `analytics.db` from `schema.sql`
4. Generates `.env` with random salts and the `log123` admin hash
5. Installs the launchd plist at `~/Library/LaunchAgents/com.chopradio.analytics.plist`
6. Boots the service and probes `http://localhost:4040/healthz`

Re-running is safe — existing `.env` and `.db` are left alone.

## Expose it publicly

The cleanest OSS path is Tailscale Funnel (built on WireGuard, free for
personal use, works through CGNAT, gives you a real HTTPS hostname).

```bash
# one-time on the mini
brew install tailscale
sudo tailscaled install-system-daemon
tailscale up
tailscale funnel --bg 4040
# prints something like: https://this-mini.tail-scales.ts.net
```

Then in your DNS provider, add:

```
api.chopradio.com   CNAME   this-mini.tail-scales.ts.net.
```

Wait a minute, then:

```bash
curl https://api.chopradio.com/healthz
# → {"ok":true,"ts":...}
```

## Wire the beacon into the static site

Add to every page (or to a shared snippet):

```html
<meta name="chop-analytics" content="https://api.chopradio.com">
<script src="/js/beacon.js" defer></script>
```

Then you can fire custom events from anywhere:

```js
window.Chop?.track('cv_expanded');
window.Chop?.track('modal_opened', { piece: 'medium-is-the-problem' });
```

## Change the admin password

```bash
echo -n 'your-new-password' | shasum -a 256 | awk '{print $1}'
# paste that hex string into .env as ADMIN_HASH=…
launchctl kickstart -k gui/$(id -u)/com.chopradio.analytics
```

## Files

```
server/
├── index.mjs                       Node server (~300 LOC)
├── schema.sql                      SQLite schema
├── package.json                    one dep: better-sqlite3
├── deploy-macmini.sh               idempotent installer
├── com.chopradio.analytics.plist   launchd template
└── README.md                       this file
```

Logs: `server.log`, `server.err.log` next to the script.
DB:   `analytics.db` (also next to the script — `scp` it to back up).

## Operations

```bash
# tail logs
tail -f server.log server.err.log

# restart (after code changes or .env edits)
launchctl kickstart -k "gui/$(id -u)/com.chopradio.analytics"

# stop
launchctl bootout "gui/$(id -u)/com.chopradio.analytics"

# inspect the DB directly
sqlite3 analytics.db
> SELECT path, COUNT(*) FROM pageviews GROUP BY path ORDER BY 2 DESC;

# back up
cp analytics.db backups/analytics-$(date +%F).db
```
