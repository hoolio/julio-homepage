// Choplogic Radio — background music player
// Wide pill w/ artist, track, skip controls, playlist context. Persists across pages.
(function () {
  'use strict';

  const TRACKS = [
    { n: 1, t: 'Sofj',          url: 'https://archive.org/download/julio-avalos-dregs/01-sofj.mp3' },
    { n: 2, t: 'Swampy',        url: 'https://archive.org/download/julio-avalos-dregs/02-swampy.mp3' },
    { n: 3, t: 'Keyed',         url: 'https://archive.org/download/julio-avalos-dregs/03-keyed.mp3' },
    { n: 4, t: 'Guilt Garden',  url: 'https://archive.org/download/julio-avalos-dregs/04-guilt-garden.mp3' },
    { n: 5, t: 'Uneasy',        url: 'https://archive.org/download/julio-avalos-dregs/05-uneasy.mp3' },
    { n: 6, t: 'Underwater',    url: 'https://archive.org/download/julio-avalos-dregs/06-underwater-dub.mp3' },
  ];

  const ARTIST = 'Dregs';
  const ALBUM = 'Dregs · 2024';
  // Compute "Songs of the Week · W/e Apr 5" — week-ending (Sunday) of current date
  function weekLabel() {
    const d = new Date();
    const daysUntilSun = (7 - d.getDay()) % 7;
    const sun = new Date(d); sun.setDate(d.getDate() + daysUntilSun);
    const mon = sun.toLocaleDateString('en-US', { month: 'short' });
    return `Songs of the Week · W/e ${mon} ${sun.getDate()}`;
  }
  const CONTEXT = weekLabel();

  const MUTE_KEY = 'chop_muted';
  const IDX_KEY = 'chop_track_idx';
  const TIME_KEY = 'chop_track_time';

  const container = document.createElement('div');
  container.id = 'chop-radio';
  container.innerHTML = `
    <div class="cr-shell">
      <button class="cr-art" id="cr-toggle" aria-label="Play / pause">
        <svg class="cr-ico cr-play" viewBox="0 0 14 14" width="12" height="12" fill="currentColor"><path d="M3 2 L12 7 L3 12 Z"/></svg>
        <svg class="cr-ico cr-pause" viewBox="0 0 14 14" width="12" height="12" fill="currentColor" style="display:none"><rect x="3" y="2" width="3" height="10"/><rect x="8" y="2" width="3" height="10"/></svg>
      </button>
      <div class="cr-meta">
        <div class="cr-context">
          <span class="cr-context-label">${CONTEXT}</span>
          <span class="cr-context-dot">·</span>
          <span class="cr-context-num" id="cr-num">01 / 06</span>
        </div>
        <div class="cr-main">
          <span class="cr-artist">${ARTIST}</span>
          <span class="cr-sep">—</span>
          <span class="cr-track" id="cr-track">Sofj</span>
        </div>
      </div>
      <div class="cr-progress"><div class="cr-progress-fill" id="cr-progress"></div></div>
      <div class="cr-controls">
        <button class="cr-ctrl" id="cr-prev" aria-label="Previous track" title="Previous">
          <svg viewBox="0 0 14 14" width="10" height="10" fill="currentColor"><path d="M2 2 L2 12 L3.5 12 L3.5 2 Z M12 2 L4.5 7 L12 12 Z"/></svg>
        </button>
        <button class="cr-ctrl" id="cr-next" aria-label="Next track" title="Next">
          <svg viewBox="0 0 14 14" width="10" height="10" fill="currentColor"><path d="M2 2 L9.5 7 L2 12 Z M10.5 2 L10.5 12 L12 12 L12 2 Z"/></svg>
        </button>
        <button class="cr-ctrl cr-close" id="cr-close" aria-label="Mute" title="Mute">
          <svg viewBox="0 0 12 12" width="9" height="9" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="3" y1="3" x2="9" y2="9"/><line x1="9" y1="3" x2="3" y2="9"/></svg>
        </button>
      </div>
    </div>
  `;

  const style = document.createElement('style');
  style.textContent = `
    #chop-radio {
      position: fixed;
      bottom: 20px; left: 20px;
      z-index: 999;
      max-width: 460px;
    }
    .cr-shell {
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(249, 246, 240, 0.96);
      backdrop-filter: blur(14px) saturate(1.1);
      -webkit-backdrop-filter: blur(14px) saturate(1.1);
      border: 1px solid rgba(26, 23, 20, 0.1);
      border-radius: 2px;
      padding: 9px 12px 9px 9px;
      box-shadow: 0 2px 10px -2px rgba(26, 23, 20, 0.06);
      position: relative;
      transition: border-color 0.3s, box-shadow 0.3s;
    }
    #chop-radio.playing .cr-shell {
      border-color: rgba(196, 125, 40, 0.25);
      box-shadow: 0 2px 14px -3px rgba(196, 125, 40, 0.12);
    }
    .cr-shell::before {
      content: '';
      position: absolute; inset: 0; pointer-events: none;
      opacity: 0.03;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='nn'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23nn)'/%3E%3C/svg%3E");
    }
    .cr-art {
      flex-shrink: 0;
      width: 30px; height: 30px;
      background: none;
      border: 1px solid rgba(26, 23, 20, 0.15);
      color: rgba(26, 23, 20, 0.6);
      border-radius: 1px;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      padding: 0;
      transition: color 0.2s, border-color 0.2s, background 0.2s;
    }
    .cr-art:hover {
      color: #a07828;
      border-color: #a07828;
      background: rgba(196, 125, 40, 0.06);
    }
    #chop-radio.playing .cr-art {
      color: #a07828;
      border-color: rgba(196, 125, 40, 0.4);
      background: rgba(196, 125, 40, 0.05);
    }
    #chop-radio.playing .cr-art::after {
      content: '';
      position: absolute;
      width: 30px; height: 30px;
      border-radius: 1px;
      box-shadow: 0 0 0 0 rgba(196,125,40,0.35);
      animation: crPulse 2.4s ease-out infinite;
      pointer-events: none;
    }
    @keyframes crPulse { 0% { box-shadow: 0 0 0 0 rgba(196,125,40,0.35); } 70% { box-shadow: 0 0 0 6px rgba(196,125,40,0); } 100% { box-shadow: 0 0 0 0 rgba(196,125,40,0); } }

    .cr-meta {
      flex: 1;
      min-width: 0;
      display: flex; flex-direction: column; gap: 2px;
    }
    .cr-context {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 8.5px;
      font-weight: 400;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      color: rgba(160, 120, 40, 0.8);
      display: flex; align-items: center; gap: 6px;
      white-space: nowrap;
    }
    .cr-context-dot { color: rgba(26, 23, 20, 0.22); }
    .cr-context-num { color: rgba(26, 23, 20, 0.5); }
    .cr-main {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 13.5px;
      color: #1a1714;
      display: flex; align-items: baseline; gap: 6px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .cr-artist { font-weight: 500; }
    .cr-sep { color: rgba(26, 23, 20, 0.3); }
    .cr-track { font-style: italic; color: rgba(26, 23, 20, 0.7); }

    .cr-progress {
      position: absolute;
      bottom: 0; left: 0; right: 0;
      height: 1px;
      background: rgba(26, 23, 20, 0.06);
      pointer-events: none;
    }
    .cr-progress-fill {
      height: 100%;
      background: #a07828;
      width: 0%;
      transition: width 0.2s linear;
    }

    .cr-controls { display: flex; gap: 4px; align-items: center; flex-shrink: 0; }
    .cr-ctrl {
      width: 22px; height: 22px;
      background: none;
      border: 1px solid rgba(26, 23, 20, 0.1);
      color: rgba(26, 23, 20, 0.4);
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      padding: 0;
      border-radius: 1px;
      transition: color 0.2s, border-color 0.2s, background 0.2s;
    }
    .cr-ctrl:hover {
      color: #a07828;
      border-color: rgba(196, 125, 40, 0.4);
      background: rgba(196, 125, 40, 0.05);
    }
    .cr-close:hover {
      color: #a04535;
      border-color: rgba(160, 69, 53, 0.4);
      background: rgba(160, 69, 53, 0.04);
    }

    /* Collapsed (muted) — compact but still shows context */
    #chop-radio.muted .cr-shell { padding: 7px 10px 7px 8px; }
    #chop-radio.muted .cr-progress { display: none; }
    #chop-radio.muted .cr-main { font-size: 10.5px; color: rgba(26,23,20,0.5); }
    #chop-radio.muted .cr-artist, #chop-radio.muted .cr-track { color: rgba(26,23,20,0.65); }
    #chop-radio.muted .cr-controls { display: none; }
    #chop-radio.muted .cr-art { width: 26px; height: 26px; }
    #chop-radio.muted .cr-art::after { display: none; }

    @media (max-width: 640px) {
      #chop-radio { bottom: 12px; left: 12px; right: 12px; max-width: none; }
      .cr-shell { padding: 7px 10px 7px 8px; gap: 10px; }
      .cr-art { width: 28px; height: 28px; }
      .cr-main { font-size: 12px; }
      .cr-context { font-size: 8px; }
      .cr-ctrl { width: 22px; height: 22px; }
    }
  `;

  function init() {
    document.head.appendChild(style);
    document.body.appendChild(container);
    setup();
  }

  function setup() {
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.volume = 0.45;

    const toggle = document.getElementById('cr-toggle');
    const playIcon = toggle.querySelector('.cr-play');
    const pauseIcon = toggle.querySelector('.cr-pause');
    const trackEl = document.getElementById('cr-track');
    const numEl = document.getElementById('cr-num');
    const progEl = document.getElementById('cr-progress');

    let muted = sessionStorage.getItem(MUTE_KEY) !== 'no';
    let idx = parseInt(sessionStorage.getItem(IDX_KEY) || '0', 10) % TRACKS.length;
    let savedTime = parseFloat(sessionStorage.getItem(TIME_KEY) || '0');

    function load(i, startAt) {
      idx = ((i % TRACKS.length) + TRACKS.length) % TRACKS.length;
      audio.src = TRACKS[idx].url;
      trackEl.textContent = TRACKS[idx].t;
      numEl.textContent = `${String(TRACKS[idx].n).padStart(2,'0')} / ${String(TRACKS.length).padStart(2,'0')}`;
      sessionStorage.setItem(IDX_KEY, idx);
      if (startAt) {
        audio.addEventListener('loadedmetadata', () => { try { audio.currentTime = startAt; } catch(e){} }, { once: true });
      }
    }

    function play() {
      audio.play().then(() => {
        container.classList.add('playing');
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
      }).catch(() => {
        document.addEventListener('click', () => { if (!muted) play(); }, { once: true });
      });
    }

    function pause() {
      audio.pause();
      container.classList.remove('playing');
      playIcon.style.display = 'block';
      pauseIcon.style.display = 'none';
    }

    function setMuted(m) {
      muted = m;
      sessionStorage.setItem(MUTE_KEY, muted ? 'yes' : 'no');
      container.classList.toggle('muted', muted);
      if (muted) pause();
      else play();
    }

    audio.addEventListener('ended', () => {
      load(idx + 1, 0);
      sessionStorage.setItem(TIME_KEY, '0');
      if (!muted) play();
    });

    audio.addEventListener('timeupdate', () => {
      if (audio.duration) {
        progEl.style.width = (audio.currentTime / audio.duration * 100) + '%';
        if (Math.floor(audio.currentTime) % 3 === 0) {
          sessionStorage.setItem(TIME_KEY, audio.currentTime);
        }
      }
    });

    toggle.addEventListener('click', () => {
      if (muted) setMuted(false);
      else { if (audio.paused) play(); else pause(); }
    });

    document.getElementById('cr-prev').addEventListener('click', () => {
      load(idx - 1, 0); sessionStorage.setItem(TIME_KEY, '0'); if (!muted) play();
    });

    document.getElementById('cr-next').addEventListener('click', () => {
      load(idx + 1, 0); sessionStorage.setItem(TIME_KEY, '0'); if (!muted) play();
    });

    document.getElementById('cr-close').addEventListener('click', () => setMuted(true));

    // Init — always start paused; user must press play
    muted = true;
    sessionStorage.setItem(MUTE_KEY, 'yes');
    container.classList.add('muted');
    load(idx, savedTime);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
