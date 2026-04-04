// Chop Player — inline audio component
// Only one plays at a time. Amber pulse while playing.
(function () {
  'use strict';

  let currentAudio = null;
  let currentPlayer = null;

  function fmtTime(sec) {
    if (!isFinite(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  function stopCurrent() {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }
    if (currentPlayer) {
      currentPlayer.classList.remove('playing');
      currentPlayer.classList.remove('expanded');
      // Restore simple markup
      if (currentPlayer._originalHTML) {
        currentPlayer.innerHTML = currentPlayer._originalHTML;
      }
      currentPlayer = null;
    }
  }

  function expand(player) {
    if (player._originalHTML === undefined) {
      player._originalHTML = player.innerHTML;
    }
    const label = player.querySelector('.player-label')?.textContent || '';
    player.classList.add('expanded');
    player.innerHTML = `
      <span class="play-circle"></span>
      <span class="player-body">
        <span class="player-label">${label}</span>
        <span class="scrubber"><span class="scrubber-fill"></span></span>
      </span>
      <span class="player-duration">0:00 / --:--</span>
    `;
  }

  function onClick(ev) {
    ev.stopPropagation();
    const player = ev.currentTarget;
    const url = player.dataset.url;
    if (!url) return;

    // If this player is already playing, pause and collapse
    if (player === currentPlayer && currentAudio && !currentAudio.paused) {
      currentAudio.pause();
      player.classList.remove('playing');
      return;
    }

    // If this player is paused but was playing, resume
    if (player === currentPlayer && currentAudio && currentAudio.paused) {
      currentAudio.play();
      player.classList.add('playing');
      return;
    }

    // New player — stop any existing, expand this one, start audio
    stopCurrent();
    expand(player);

    const audio = new Audio(url);
    currentAudio = audio;
    currentPlayer = player;

    const fill = player.querySelector('.scrubber-fill');
    const dur = player.querySelector('.player-duration');
    const scrubber = player.querySelector('.scrubber');

    audio.addEventListener('loadedmetadata', () => {
      dur.textContent = `0:00 / ${fmtTime(audio.duration)}`;
    });

    audio.addEventListener('timeupdate', () => {
      const pct = (audio.currentTime / audio.duration) * 100;
      fill.style.width = pct + '%';
      dur.textContent = `${fmtTime(audio.currentTime)} / ${fmtTime(audio.duration)}`;
    });

    audio.addEventListener('ended', () => {
      player.classList.remove('playing');
    });

    scrubber?.addEventListener('click', (e) => {
      e.stopPropagation();
      const rect = scrubber.getBoundingClientRect();
      const pct = (e.clientX - rect.left) / rect.width;
      audio.currentTime = pct * audio.duration;
    });

    audio.play().then(() => {
      player.classList.add('playing');
    }).catch(err => {
      console.error('Play failed:', err);
    });
  }

  document.querySelectorAll('.chop-player').forEach(p => {
    p.addEventListener('click', onClick);
  });
})();
