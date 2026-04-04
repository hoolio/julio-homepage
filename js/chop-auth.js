// Shared auth for Choplogic Radio
// Session-persistent. Same password unlocks any gated section.
(function () {
  'use strict';

  const PASS_HASH = '1d88173f18c4d2c2edae8780a4fcfe7d24123951837296763d1d17d3ac6fecea'; // "chopog"
  const UNLOCKED_KEY = 'chop_unlocked_2026';

  async function sha256(str) {
    const buf = new TextEncoder().encode(str);
    const hash = await crypto.subtle.digest('SHA-256', buf);
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  window.ChopAuth = {
    isUnlocked() {
      return sessionStorage.getItem(UNLOCKED_KEY) === 'yes';
    },

    async unlock(pw) {
      if (!pw) return false;
      const hash = await sha256(pw);
      if (hash === PASS_HASH) {
        sessionStorage.setItem(UNLOCKED_KEY, 'yes');
        return true;
      }
      return false;
    },

    async require(label) {
      if (this.isUnlocked()) return true;
      const pw = prompt(label || 'Enter password:');
      if (!pw) return false;
      const ok = await this.unlock(pw);
      if (!ok) { alert('Wrong password.'); return false; }
      return true;
    },

    lock() {
      sessionStorage.removeItem(UNLOCKED_KEY);
    }
  };
})();
