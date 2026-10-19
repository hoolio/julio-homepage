# Email Compatibility & Limitations Report

What a recipient actually experiences, verified against current (2026) email-client
behavior — not "works in a browser" behavior.

---

## The one thing to understand first

**There is no technology that puts a 40-minute, scrubber-controlled video inside the
Gmail message body.** Email clients strip the things a real player needs. So this
project splits deliberately into two experiences:

| | **A. Inside Gmail** | **B. On chopradio.com** |
|---|---|---|
| Format | Animated **GIF** (`practice.gif`) | HTML5 **MP4** + custom player |
| Content | Entire practice, time-lapsed 8× (~4.8 min) | Entire practice, real time (38.5 min) |
| Playback | **Autoplays** on open, loops, silent | Click to play |
| Controls | **None possible** | Play/pause, scrub, time, speed |
| Audio | None (GIF cannot carry audio) | Muted by request (easily re-enabled) |

**B is not a substitute for A, and A is not a substitute for B.** The email contains A.
A links to B. Controls described in this repo are controls on **B (the website)** — they
do **not** exist inside Gmail.

---

## What works inside the Gmail body — verified

| Capability | Supported in Gmail? | Notes |
|---|---|---|
| Autoplaying animated **GIF**, remotely hosted | ✅ Yes | The only format that animates inline. Autoplays on open, loops. |
| HTML5 `<video>` | ❌ No | Tag is stripped; at best a poster image remains. |
| JavaScript (any player / controls) | ❌ No | All `<script>` removed. No interactivity of any kind. |
| CSS `@keyframes` animation | ❌ No | Gmail ignores CSS animation (works only in Apple/iOS Mail, Samsung). |
| CSS `:checked` / `:target` / label "control" hacks | ❌ No | Interactive CSS is stripped — so no fake play/pause buttons. |
| `<iframe>` embeds | ❌ No | Stripped. |
| Animated **WebP** | ❌ No | Google's image proxy re-encodes it and drops the animation → first frame only. |
| **APNG** | ❌ No | First frame only. |
| AMP for Email | ⚠️ Technically | Requires Google-whitelisted sender domain + SPF/DKIM/DMARC(reject) + manual review + good sender reputation. Impractical for personal sends, and still gives no 40-min scrubber. Not used here. |

**Net:** inside Gmail the best achievable experience is a silent, autoplaying,
looping GIF with **zero** controls. That is exactly what this project ships as (A).

---

## File-size reality (why the GIF is time-lapsed)

Measured from real test encodes of this source, extrapolated to the full 38.5 min:

| Approach | Full length (real time) |
|---|---|
| GIF 480px / 5 fps | ~210 MB |
| GIF 320px / 3 fps | ~50 MB |

Industry guidance is to keep email GIFs **under 1–2 MB**. A real-time 40-minute GIF is
25–100× that — it would load slowly or partially (especially on mobile), consume a lot
of memory when decoded, and feel broken for many recipients, even though Gmail has no
hard size cutoff.

**Time-lapsing the whole practice** (speeding it up 8×) is what makes a full-practice GIF
viable: the shipped `practice.gif` shows the entire session start-to-finish in ~4.8 min at
**18 MB**. Still heavy by email norms — but it is the complete practice, and it autoplays.

> Lighter options are one env var away — see `scripts/encode-gif.sh`
> (13× → ~7 MB, 19× → ~3.5 MB). Lighter = closer to email norms but choppier.

---

## The 102 KB clip rule (separate issue — we're safe)

Gmail "clips" messages whose **HTML** exceeds ~102 KB (shows a "View entire message"
link). This is about HTML weight, not image weight. Because the GIF is referenced by URL
(`email-snippet.html` is a few hundred bytes), the email stays far under the limit. The
18 MB is downloaded by the recipient's client separately and does not count toward clipping.

---

## What each recipient sees, by client

| Client | Experience of `practice.gif` |
|---|---|
| **Gmail** (web, Android, iOS) | Autoplays, loops, silent. No controls. Tapping opens chopradio.com/yoga/. First paint may lag on mobile due to 18 MB download. |
| **Apple Mail / iOS Mail** | Autoplays, loops. (These could also play inline `<video>`, but Gmail cannot, so we standardize on GIF.) |
| **Outlook (Windows desktop, Word engine)** | Shows **only the first frame** — Outlook desktop does not animate GIFs. Recipient sees a still; the link still works. |
| **Outlook.com / Outlook mobile** | Animates. |
| **Yahoo / Proton / most webmail** | Animates. |

No client in this list exposes playback controls on the GIF — because none can.

---

## Honest conflict summary (per the brief's execution priorities)

1. **Preserve entire 40 min** ✅ — both A (time-lapsed) and B (real time) contain all of it.
2. **Autoplay inline in Gmail** ✅ — via GIF.
3. **Real playback controls** ⚠️ — possible on B only; **impossible** in Gmail. Unavoidable.
4. **Optimize size/quality** ⚠️ — 18 MB GIF is the chosen fidelity/size tradeoff; MP4 is 61 MB streaming.
5. **Minimize complexity** ✅ — static files + one vanilla-JS player, no framework, no build step.
6. **Clean, unobtrusive design** ✅ — image-forward player, controls recede during playback.
