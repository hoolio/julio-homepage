#!/usr/bin/env bash
# Deploy choplogic-analytics on a Mac mini.
# Idempotent — safe to re-run.

set -euo pipefail
cd "$(dirname "$0")"
WORKDIR="$(pwd)"
LABEL="com.chopradio.analytics"
PLIST_DST="$HOME/Library/LaunchAgents/${LABEL}.plist"

say() { printf "\033[1;36m%s\033[0m\n" "$*"; }
warn() { printf "\033[1;33m%s\033[0m\n" "$*"; }

# ─── 1. Tooling ─────────────────────────────────────────────────────
if ! command -v brew >/dev/null 2>&1; then
  say "Installing Homebrew…"
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

if ! command -v node >/dev/null 2>&1; then
  say "Installing Node…"
  brew install node
fi

NODE_BIN="$(command -v node)"
say "Node:    ${NODE_BIN} ($(node --version))"

# ─── 2. Dependencies ────────────────────────────────────────────────
say "Installing npm dependencies (better-sqlite3)…"
npm install --silent --omit=dev

# ─── 3. Database ────────────────────────────────────────────────────
if [[ ! -f analytics.db ]]; then
  say "Initialising SQLite database from schema.sql…"
  if command -v sqlite3 >/dev/null 2>&1; then
    sqlite3 analytics.db < schema.sql
  else
    # Fall back to letting the server bootstrap the schema on first run
    warn "sqlite3 CLI not found — server will bootstrap the schema on first launch."
  fi
else
  say "Database exists; leaving it alone."
fi

# ─── 4. Secrets (.env) ──────────────────────────────────────────────
if [[ ! -f .env ]]; then
  say "Generating .env (SALT, SESSION_KEY, ADMIN_HASH)…"
  SALT="$(openssl rand -hex 32)"
  SESSION_KEY="$(openssl rand -hex 32)"
  # Default admin password = log123 (matches the existing static page).
  # Change by overwriting ADMIN_HASH with sha256 of your new password.
  ADMIN_HASH="$(printf '%s' 'log123' | shasum -a 256 | awk '{print $1}')"
  cat > .env <<EOF
SALT=${SALT}
SESSION_KEY=${SESSION_KEY}
ADMIN_HASH=${ADMIN_HASH}
PORT=4040
EOF
  chmod 600 .env
  say "Wrote .env (mode 0600)."
else
  say ".env exists; leaving it alone."
fi

# ─── 5. launchd plist (auto-start on login) ─────────────────────────
say "Installing launchd plist at ${PLIST_DST}…"
mkdir -p "$(dirname "$PLIST_DST")"
sed -e "s|__NODE__|${NODE_BIN}|g" \
    -e "s|__WORKDIR__|${WORKDIR}|g" \
    com.chopradio.analytics.plist > "$PLIST_DST"

# Reload — bootstrap if not loaded, otherwise kickstart to pick up changes
launchctl bootout "gui/$(id -u)/${LABEL}" 2>/dev/null || true
launchctl bootstrap "gui/$(id -u)" "$PLIST_DST"
launchctl kickstart -k "gui/$(id -u)/${LABEL}" || true

sleep 1
say "Service status:"
launchctl print "gui/$(id -u)/${LABEL}" 2>/dev/null | head -20 || warn "(launchctl print failed; service may still be starting)"

# ─── 6. Smoke test ──────────────────────────────────────────────────
say "Probing http://localhost:4040/healthz…"
if curl -fsS --max-time 5 "http://localhost:4040/healthz" >/dev/null; then
  say "✓ Server is up."
else
  warn "✗ Server didn't respond.  Check ./server.err.log for details."
  exit 1
fi

cat <<EOF

──────────────────────────────────────────────────────────────────
✓  choplogic-analytics is running on this Mac mini (port 4040).

Next steps:
  1. Expose it publicly with Tailscale Funnel:
       tailscale funnel --bg 4040
       (gives you e.g. https://this-mini.tail-scales.ts.net)

  2. Point api.chopradio.com at the funnel hostname (CNAME).

  3. Confirm: curl https://api.chopradio.com/healthz
     → {"ok":true,"ts":...}

  4. Wire the beacon into the static site (one <script> include).

Logs:        ${WORKDIR}/server.log
Errors:      ${WORKDIR}/server.err.log
DB file:     ${WORKDIR}/analytics.db
Reload:      launchctl kickstart -k gui/$(id -u)/${LABEL}
Stop:        launchctl bootout gui/$(id -u)/${LABEL}
──────────────────────────────────────────────────────────────────
EOF
