#!/usr/bin/env bash
# Inspect the source video: duration, dimensions, codecs, frame rate, size.
# Usage: ./scripts/probe.sh /path/to/source.mov
set -euo pipefail
SRC="${1:?Usage: probe.sh <source-video>}"

ffprobe -v error \
  -show_entries format=duration,size,bit_rate:stream=index,codec_type,codec_name,width,height,r_frame_rate,avg_frame_rate,pix_fmt,sample_rate,channels \
  -of default=noprint_wrappers=1 "$SRC"
