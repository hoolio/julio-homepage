#!/usr/bin/env bash
# ============================================================================
# encode-video.sh — build the site MP4 (full real-time practice) AND a small
# 320px intermediate used by encode-gif.sh. Decodes the 4K source ONCE.
#
# Output:
#   practice.mp4         1280x720, H.264, muted, +faststart  (the chopradio.com hero)
#   build/inter320.mp4   320x180,  H.264, muted              (source for the GIF)
#   poster.jpg           1280x720 still                      (video poster + OG image)
#   poster-email.jpg     600px still                         (email static fallback)
#
# Usage: ./scripts/encode-video.sh /path/to/source.mov [OUTDIR]
#
# Tunables (env vars):
#   V_WIDTH=1280   site video width
#   V_CRF=28       quality (lower = better/bigger; 26–30 sane range)
#   V_PRESET=medium
#   KEEP_AUDIO=0   set to 1 to retain audio (re-encodes to AAC 96k)
#   POSTER_AT=1000 seconds into the video to grab the poster frame
# ============================================================================
set -euo pipefail

SRC="${1:?Usage: encode-video.sh <source-video> [outdir]}"
OUT="${2:-.}"
BUILD="$OUT/build"
mkdir -p "$BUILD"

V_WIDTH="${V_WIDTH:-1280}"
V_CRF="${V_CRF:-28}"
V_PRESET="${V_PRESET:-medium}"
KEEP_AUDIO="${KEEP_AUDIO:-0}"
POSTER_AT="${POSTER_AT:-1000}"

if [ "$KEEP_AUDIO" = "1" ]; then
  AUDIO_ARGS=(-c:a aac -b:a 96k)
else
  AUDIO_ARGS=(-an)
fi

echo ">> Encoding site MP4 (${V_WIDTH}px, CRF ${V_CRF}) + 320px intermediate (single decode)…"
ffmpeg -y -i "$SRC" \
  -vf "scale=${V_WIDTH}:-2:flags=lanczos" -c:v libx264 -crf "$V_CRF" -preset "$V_PRESET" \
    "${AUDIO_ARGS[@]}" -movflags +faststart "$OUT/practice.mp4" \
  -vf "scale=320:-2:flags=lanczos" -c:v libx264 -crf 18 -preset veryfast -an \
    "$BUILD/inter320.mp4"

echo ">> Grabbing poster frames…"
ffmpeg -y -ss "$POSTER_AT" -i "$SRC" -frames:v 1 -vf "scale=${V_WIDTH}:-2:flags=lanczos" -q:v 3 "$OUT/poster.jpg"
ffmpeg -y -i "$OUT/poster.jpg" -vf "scale=600:-2" -q:v 6 "$OUT/poster-email.jpg"

echo ">> Done:"
ls -la "$OUT/practice.mp4" "$BUILD/inter320.mp4" "$OUT/poster.jpg" "$OUT/poster-email.jpg"
