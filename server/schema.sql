-- Choplogic analytics schema (SQLite)
--
-- Privacy: no raw IPs, no cookies on visitors, no PII.  session_id is
-- sha256(ip || '|' || user-agent || '|' || YYYY-MM-DD || '|' || salt)
-- so it rotates daily and is unrecoverable without the salt.

CREATE TABLE IF NOT EXISTS pageviews (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  ts          INTEGER NOT NULL,                 -- epoch ms (UTC)
  session_id  TEXT NOT NULL,                    -- 32-hex daily hash
  path        TEXT NOT NULL,                    -- "/", "/home/radio/", etc.
  ref_host    TEXT,                             -- referrer hostname only
  ua_family   TEXT,                             -- "Chrome", "Safari", "Firefox", "Other"
  device      TEXT CHECK(device IN ('mobile','tablet','desktop')) DEFAULT 'desktop',
  is_unique   INTEGER NOT NULL DEFAULT 0        -- 1 = first hit of this session today
);
CREATE INDEX IF NOT EXISTS idx_pv_ts        ON pageviews(ts);
CREATE INDEX IF NOT EXISTS idx_pv_path      ON pageviews(path);
CREATE INDEX IF NOT EXISTS idx_pv_session   ON pageviews(session_id);
CREATE INDEX IF NOT EXISTS idx_pv_ts_path   ON pageviews(ts, path);

CREATE TABLE IF NOT EXISTS events (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  ts          INTEGER NOT NULL,
  session_id  TEXT NOT NULL,
  path        TEXT NOT NULL,                    -- page where the event fired
  name        TEXT NOT NULL,                    -- e.g. 'cv_expanded', 'modal_opened'
  data        TEXT                              -- optional JSON blob (free-form)
);
CREATE INDEX IF NOT EXISTS idx_ev_ts        ON events(ts);
CREATE INDEX IF NOT EXISTS idx_ev_name      ON events(name);
CREATE INDEX IF NOT EXISTS idx_ev_session   ON events(session_id);

-- Convenience: most-recent activity, used by the admin "live" panel
CREATE VIEW IF NOT EXISTS recent_activity AS
  SELECT ts, 'pageview' AS kind, path, ua_family, device, NULL AS name, NULL AS data
    FROM pageviews
  UNION ALL
  SELECT ts, 'event' AS kind, path, NULL AS ua_family, NULL AS device, name, data
    FROM events
  ORDER BY ts DESC
  LIMIT 200;
