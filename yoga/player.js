/* chopradio — minimalist yoga player
   Vanilla JS, no dependencies. Wraps a native <video> with a custom, understated UI:
   play/pause, seek scrubber, elapsed/total time, and a cycling speed control. */

(function () {
  "use strict";

  var player   = document.getElementById("player");
  var video    = document.getElementById("video");
  var bigplay  = document.getElementById("bigplay");
  var playpause= document.getElementById("playpause");
  var elapsedEl= document.getElementById("elapsed");
  var totalEl  = document.getElementById("total");
  var scrubber = document.getElementById("scrubber");
  var progress = document.getElementById("progress");
  var buffered = document.getElementById("buffered");
  var thumb    = document.getElementById("thumb");
  var speedBtn = document.getElementById("speed");

  if (!video) return;

  var SPEEDS = [1, 1.25, 1.5, 2, 0.5];
  var speedIdx = 0;
  var idleTimer = null;

  function fmt(t) {
    if (!isFinite(t) || t < 0) t = 0;
    t = Math.floor(t);
    var h = Math.floor(t / 3600);
    var m = Math.floor((t % 3600) / 60);
    var s = t % 60;
    var mm = h > 0 && m < 10 ? "0" + m : "" + m;
    var ss = s < 10 ? "0" + s : "" + s;
    return h > 0 ? h + ":" + mm + ":" + ss : m + ":" + ss;
  }

  function setPlayIcons(isPlaying) {
    // Icon visibility is driven by the `.is-playing` class in CSS; here we only
    // keep the accessible label in sync.
    playpause.setAttribute("aria-label", isPlaying ? "Pause" : "Play");
  }

  function toggle() {
    if (video.paused || video.ended) video.play();
    else video.pause();
  }

  // --- playback state --------------------------------------------------------
  video.addEventListener("play", function () {
    player.classList.add("is-playing", "is-started");
    setPlayIcons(true);
    scheduleIdle();
  });
  video.addEventListener("pause", function () {
    player.classList.remove("is-playing");
    setPlayIcons(false);
    showControls();
  });
  video.addEventListener("ended", function () {
    player.classList.remove("is-playing");
    setPlayIcons(false);
    showControls();
  });

  bigplay.addEventListener("click", toggle);
  playpause.addEventListener("click", toggle);
  video.addEventListener("click", toggle);

  // --- time + progress -------------------------------------------------------
  video.addEventListener("loadedmetadata", function () {
    totalEl.textContent = fmt(video.duration);
    scrubber.setAttribute("aria-valuemax", String(Math.floor(video.duration)));
    updateProgress();
  });

  video.addEventListener("timeupdate", updateProgress);
  video.addEventListener("progress", updateBuffered);

  function updateProgress() {
    var d = video.duration || 0;
    var pct = d ? (video.currentTime / d) * 100 : 0;
    progress.style.width = pct + "%";
    thumb.style.left = pct + "%";
    elapsedEl.textContent = fmt(video.currentTime);
    scrubber.setAttribute("aria-valuenow", String(Math.floor(video.currentTime)));
    scrubber.setAttribute("aria-valuetext", fmt(video.currentTime) + " of " + fmt(d));
    updateBuffered();
  }

  function updateBuffered() {
    var d = video.duration || 0;
    if (d && video.buffered.length) {
      var end = video.buffered.end(video.buffered.length - 1);
      buffered.style.width = Math.min(100, (end / d) * 100) + "%";
    }
  }

  // --- scrubbing -------------------------------------------------------------
  function seekFromPointer(clientX) {
    var rect = scrubber.getBoundingClientRect();
    var ratio = (clientX - rect.left) / rect.width;
    ratio = Math.max(0, Math.min(1, ratio));
    if (video.duration) video.currentTime = ratio * video.duration;
  }

  var scrubbing = false;
  scrubber.addEventListener("pointerdown", function (e) {
    scrubbing = true;
    player.classList.add("is-scrubbing");
    scrubber.setPointerCapture(e.pointerId);
    seekFromPointer(e.clientX);
  });
  scrubber.addEventListener("pointermove", function (e) {
    if (scrubbing) seekFromPointer(e.clientX);
  });
  scrubber.addEventListener("pointerup", function (e) {
    scrubbing = false;
    player.classList.remove("is-scrubbing");
    try { scrubber.releasePointerCapture(e.pointerId); } catch (_) {}
  });

  // keyboard on the scrubber: arrows seek, Home/End jump
  scrubber.addEventListener("keydown", function (e) {
    var d = video.duration || 0;
    if (!d) return;
    var step = e.shiftKey ? 30 : 5;
    if (e.key === "ArrowRight") { video.currentTime = Math.min(d, video.currentTime + step); e.preventDefault(); }
    else if (e.key === "ArrowLeft") { video.currentTime = Math.max(0, video.currentTime - step); e.preventDefault(); }
    else if (e.key === "Home") { video.currentTime = 0; e.preventDefault(); }
    else if (e.key === "End") { video.currentTime = d; e.preventDefault(); }
  });

  // --- speed -----------------------------------------------------------------
  speedBtn.addEventListener("click", function () {
    speedIdx = (speedIdx + 1) % SPEEDS.length;
    var r = SPEEDS[speedIdx];
    video.playbackRate = r;
    speedBtn.textContent = (r % 1 === 0 ? r : r) + "×";
  });

  // --- global keyboard shortcuts --------------------------------------------
  document.addEventListener("keydown", function (e) {
    if (e.target === scrubber) return; // scrubber handles its own arrows
    if (e.code === "Space" || e.key === "k") { toggle(); e.preventDefault(); }
    else if (e.key === "ArrowRight") { video.currentTime = Math.min(video.duration || 0, video.currentTime + 5); }
    else if (e.key === "ArrowLeft") { video.currentTime = Math.max(0, video.currentTime - 5); }
  });

  // --- idle auto-hide of controls during playback ----------------------------
  function showControls() {
    player.classList.remove("is-idle");
    if (idleTimer) clearTimeout(idleTimer);
    if (!video.paused) scheduleIdle();
  }
  function scheduleIdle() {
    if (idleTimer) clearTimeout(idleTimer);
    idleTimer = setTimeout(function () {
      if (!video.paused) player.classList.add("is-idle");
    }, 2600);
  }
  player.addEventListener("pointermove", showControls);
  player.addEventListener("pointerleave", function () {
    if (!video.paused) player.classList.add("is-idle");
  });
})();
