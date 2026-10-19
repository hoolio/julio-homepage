# chopradio — Yoga practice: email replay + site player

Converts a ~40-minute yoga video into (A) an autoplaying time-lapse **GIF** for inline
Gmail viewing and (B) a full real-time **MP4** with a minimal custom player on
chopradio.com. Read **COMPATIBILITY.md** first — it explains exactly what email recipients
can and cannot see, and why controls can't live inside Gmail.

## Contents

```
yoga/
  index.html          # the /yoga/ page — custom HTML5 player
  player.css          # player styles (minimalist, image-forward)
  player.js           # player logic — vanilla JS, no dependencies
  practice.mp4        # full practice, 1280x720, muted, +faststart  (~61 MB)
  practice.gif        # entire practice, 8x time-lapse, ~4.8 min, 320px (~18 MB)
  poster.jpg          # video poster / Open Graph image (1280x720)
  poster-email.jpg    # small still fallback for email (600px)
  email-snippet.html  # the block you paste/insert into Gmail
  COMPATIBILITY.md    # email client support + limitations report
  README.md
  scripts/
    probe.sh          # inspect the source video
    encode-video.sh   # build practice.mp4 + 320px intermediate + posters
    encode-gif.sh     # build practice.gif from the intermediate
```

## Regenerate everything from the original video

Requires `ffmpeg`, `ffprobe`, and `gifsicle` (`brew install ffmpeg gifsicle`).

```bash
cd yoga
./scripts/probe.sh /path/to/source.mov          # sanity-check the source
./scripts/encode-video.sh /path/to/source.mov . # -> practice.mp4, build/inter320.mp4, posters
./scripts/encode-gif.sh .                        # -> practice.gif
```

Tune without touching the scripts, e.g. a lighter email GIF:

```bash
SPEED=13 FPS=8 LOSSY=100 ./scripts/encode-gif.sh .   # ~7 MB instead of ~18 MB
KEEP_AUDIO=1 ./scripts/encode-video.sh /path/to/source.mov .  # keep audio on the site MP4
```

## Deploy to chopradio.com

The whole folder is static — no server code. Publish it at `https://chopradio.com/yoga/`.

1. Copy `index.html`, `player.css`, `player.js`, `practice.mp4`, `practice.gif`,
   `poster.jpg` to the web root under `/yoga/`. (The `build/` dir and `scripts/` are
   build-time only — no need to deploy them.)
2. Confirm these resolve over **https** (Gmail requires absolute https for the email image):
   - `https://chopradio.com/yoga/`           → the player page
   - `https://chopradio.com/yoga/practice.gif` → the email GIF
   - `https://chopradio.com/yoga/practice.mp4` → streams (Range requests / faststart)
3. Recommended serving headers:
   - `practice.mp4`, `practice.gif`: `Cache-Control: public, max-age=31536000, immutable`
   - Ensure the host supports HTTP Range requests on the MP4 (almost all do) so seeking works.

> If chopradio.com is served from the `hoolio/julio-homepage` repo, drop this folder in as
> `/yoga/` and commit — same flow as `/enjoy/`.

## Put the replay in a Gmail message

See `email-snippet.html` for the exact block and inline notes. Two ways:

**Option 1 — paste the hosted GIF (simplest, reliable):**
1. In Gmail, compose a message.
2. Insert the image **by URL** so it stays remotely hosted and animates:
   use the "Insert photo → Web Address (URL)" option and paste
   `https://chopradio.com/yoga/practice.gif`.
   (Do **not** download-and-attach it — attach/upload can inline a static copy.)
3. Select the inserted image and add a link to `https://chopradio.com/yoga/`.
4. Send to yourself first and open on both desktop and phone to confirm it animates.

**Option 2 — paste HTML (for tools that allow it):**
Some senders (and the "paste rich HTML" workflows) accept the `email-snippet.html` block
directly. For bulk/newsletter tools, paste that block into a custom-HTML content area.

**Reminder:** the GIF autoplays and loops with no controls — that's the Gmail ceiling.
The link is what gets recipients to the real controls on the site.
```
