// Background music player — sequential playback through Dregs, mute toggle
// Persists across pages via sessionStorage (track position, mute state)
(function () {
  'use strict';

  const TRACKS = [
    { t: '01 Sofj',          url: 'https://archive.org/download/julio-avalos-dregs/01-sofj.mp3' },
    { t: '02 Swampy',        url: 'https://archive.org/download/julio-avalos-dregs/02-swampy.mp3' },
    { t: '03 Keyed',         url: 'https://archive.org/download/julio-avalos-dregs/03-keyed.mp3' },
    { t: '04 Guilt Garden',  url: 'https://archive.org/download/julio-avalos-dregs/04-guilt-garden.mp3' },
    { t: '05 Uneasy',        url: 'https://archive.org/download/julio-avalos-dregs/05-uneasy.mp3' },
    { t: '06 Underwater',    url: 'https://archive.org/download/julio-avalos-dregs/06-underwater-dub.mp3' },
  ];

  const MUTE_KEY = 'chop_muted';
  const IDX_KEY = 'chop_track_idx';
  const TIME_KEY = 'chop_track_time';

  // Build UI
  const container = document.createElement('div');
  container.id = 'chop-radio';
  container.innerHTML = `
    <button id="cr-toggle" aria-label="Toggle music" title="Play / mute site audio">
      <svg class="cr-icon cr-on" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.4">
        <path d="M3 6 L3 10 L5.5 10 L9 13 L9 3 L5.5 6 Z" stroke-linejoin="round"/>
        <path d="M11.5 5.5 Q13 8 11.5 10.5" stroke-linecap="round"/>
        <path d="M13 4 Q15 8 13 12" stroke-linecap="round"/>
      </svg>
      <svg class="cr-icon cr-off" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.4" style="display:none">
        <path d="M3 6 L3 10 L5.5 10 L9 13 L9 3 L5.5 6 Z" stroke-linejoin="round"/>
        <line x1="11" y1="5" x2="15" y2="11" stroke-linecap="round"/>
        <line x1="15" y1="5" x2="11" y2="11" stroke-linecap="round"/>
      </svg>
      <span class="cr-label" id="cr-label">—</span>
    </button>
  `;

  const style = document.createElement('style');
  style.textContent = `
    #chop-radio {
      position: fixed;
      bottom: 20px; left: 20px;
      z-index: 999;
    }
    #cr-toggle {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(242, 237, 224, 0.9);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(26, 23, 20, 0.1);
      border-radius: 20px;
      padding: 7px 14px 7px 11px;
      font-family: 'IBM Plex Mono', monospace;
      font-size: 9.5px;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      color: #1a1714;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 2px 12px rgba(0,0,0,0.05);
    }
    #cr-toggle:hover {
      background: #f9f6f0;
      border-color: rgba(196, 125, 40, 0.3);
      color: #a07828;
    }
    #cr-toggle.muted { color: rgba(26, 23, 20, 0.4); }
    #cr-toggle.muted:hover { color: #1a1714; }
    #cr-toggle .cr-icon { flex-shrink: 0; }
    #cr-toggle .cr-label { max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    #chop-radio.playing #cr-toggle { border-color: rgba(196, 125, 40, 0.25); }
    @media (max-width: 640px) {
      #chop-radio { bottom: 12px; left: 12px; }
      #cr-toggle { padding: 6px 10px 6px 9px; font-size: 9px; }
      #cr-toggle .cr-label { max-width: 70px; }
    }
  `;

  // Inject when DOM ready
  function init() {
    document.head.appendChild(style);
    document.body.appendChild(container);
    setupPlayer();
  }

  function setupPlayer() {
    const toggle = document.getElementById('cr-toggle');
    const label = document.getElementById('cr-label');
    const iconOn = toggle.querySelector('.cr-on');
    const iconOff = toggle.querySelector('.cr-off');

    const audio = new Audio();
    audio.preload = 'none';
    audio.volume = 0.45;

    let muted = sessionStorage.getItem(MUTE_KEY) === 'yes';
    let trackIdx = parseInt(sessionStorage.getItem(IDX_KEY) || '0', 10) % TRACKS.length;
    let savedTime = parseFloat(sessionStorage.getItem(TIME_KEY) || '0');

    function loadTrack(idx, startAt) {
      trackIdx = idx % TRACKS.length;
      audio.src = TRACKS[trackIdx].url;
      label.textContent = TRACKS[trackIdx].t;
      sessionStorage.setItem(IDX_KEY, trackIdx);
      if (startAt) {
        audio.addEventListener('loadedmetadata', () => { audio.currentTime = startAt; }, { once: true });
      }
    }

    function play() {
      audio.play().then(() => {
        container.classList.add('playing');
        toggle.classList.remove('muted');
      }).catch(() => {
        // Autoplay blocked — wait for first click anywhere
        document.addEventListener('click', resumeOnce, { once: true });
      });
    }

    function resumeOnce() {
      if (!muted) audio.play().catch(()=>{});
      container.classList.add('playing');
    }

    function pause() {
      audio.pause();
      container.classList.remove('playing');
    }

    function setMuted(m) {
      muted = m;
      sessionStorage.setItem(MUTE_KEY, muted ? 'yes' : 'no');
      toggle.classList.toggle('muted', muted);
      iconOn.style.display = muted ? 'none' : 'block';
      iconOff.style.display = muted ? 'block' : 'none';
      if (muted) pause(); else play();
    }

    // Advance to next track
    audio.addEventListener('ended', () => {
      loadTrack(trackIdx + 1, 0);
      sessionStorage.setItem(TIME_KEY, '0');
      if (!muted) play();
    });

    // Save position every 3 seconds
    audio.addEventListener('timeupdate', () => {
      if (audio.currentTime > 0 && Math.floor(audio.currentTime) % 3 === 0) {
        sessionStorage.setItem(TIME_KEY, audio.currentTime);
      }
    });

    // Toggle
    toggle.addEventListener('click', () => setMuted(!muted));

    // Init state
    iconOn.style.display = muted ? 'none' : 'block';
    iconOff.style.display = muted ? 'block' : 'none';
    toggle.classList.toggle('muted', muted);

    loadTrack(trackIdx, savedTime);
    if (!muted) play();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
