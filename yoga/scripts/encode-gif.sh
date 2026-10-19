#!/usr/bin/env bash
# ============================================================================
# encode-gif.sh — build the email time-lapse GIF (the ENTIRE practice, sped up).
#
# Requires build/inter320.mp4 (produced by encode-video.sh) and gifsicle.
# Two-pass palette (palettegen/paletteuse) for quality, then gifsicle lossy
# optimization to cut size.
#
# Output: practice.gif
#
# Usage: ./scripts/encode-gif.sh [OUTDIR]
#
# Tunables (env vars) — defaults reproduce the shipped 8x / ~4.8 min / 18 MB GIF:
#   SPEED=8        time-lapse factor (8 => 40 min becomes ~5 min)
#   FPS=10         output frame rate (higher = smoother + bigger)
#   WIDTH=320      GIF width in px
#   COLORS=96      palette size (max 256)
#   DITHER=bayer:bayer_scale=5   paletteuse dither (use `none` for smallest)
#   LOSSY=80       gifsicle lossy level (higher = smaller + more artifacts)
#
# Size scales ~linearly with (FPS x duration/SPEED) and with WIDTH^2.
# Examples (320px): 8x/10fps ~18 MB · 13x/8fps ~7 MB · 19x/8fps ~3.5 MB.
# ============================================================================
set -euo pipefail

OUT="${1:-.}"
BUILD="$OUT/build"
INTER="$BUILD/inter320.mp4"
[ -f "$INTER" ] || { echo "Missing $INTER — run encode-video.sh first."; exit 1; }

SPEED="${SPEED:-8}"
FPS="${FPS:-10}"
WIDTH="${WIDTH:-320}"
COLORS="${COLORS:-96}"
DITHER="${DITHER:-bayer:bayer_scale=5}"
LOSSY="${LOSSY:-80}"

FILTER="setpts=PTS/${SPEED},fps=${FPS},scale=${WIDTH}:-1:flags=lanczos"

echo ">> palettegen (speed=${SPEED}x, fps=${FPS}, width=${WIDTH}, colors=${COLORS})…"
ffmpeg -y -i "$INTER" -vf "${FILTER},palettegen=max_colors=${COLORS}" "$BUILD/palette.png"

echo ">> paletteuse -> raw gif (dither=${DITHER})…"
ffmpeg -y -i "$INTER" -i "$BUILD/palette.png" \
  -lavfi "${FILTER}[x];[x][1:v]paletteuse=dither=${DITHER}" "$BUILD/raw.gif"

echo ">> gifsicle lossy optimize (lossy=${LOSSY})…"
gifsicle -O3 --lossy="${LOSSY}" "$BUILD/raw.gif" -o "$OUT/practice.gif"

echo ">> Done:"
ls -la "$OUT/practice.gif"
gifsicle --info "$OUT/practice.gif" 2>/dev/null | head -2
