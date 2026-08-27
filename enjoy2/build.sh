#!/usr/bin/env bash
# Bake source.md into a fully static index.html (no runtime JS or CDN).
# Run this after editing source.md, then commit index.html.
cd "$(dirname "$0")" && node build.js
