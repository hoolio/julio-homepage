// Shared auth for Choplogic Radio
// Session-persistent. Same password unlocks any gated section.
(function () {
  'use strict';

  const PASS_HASH = '1d88173f18c4d2c2edae8780a4fcfe7d24123951837296763d1d17d3ac6fecea'; // "chopog"
  const UNLOCKED_KEY = 'chop_unlocked_2026';

  async function sha256(str) {
    if (window.crypto && window.crypto.subtle) {
      try {
        const buf = new TextEncoder().encode(str);
        const hash = await window.crypto.subtle.digest('SHA-256', buf);
        return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
      } catch (e) { /* fall through */ }
    }
    return sha256_js(str);
  }
  // Pure-JS SHA-256 fallback (for non-secure contexts: LAN HTTP from mobile)
  function sha256_js(ascii) {
    function rightRotate(n, x) { return ((x >>> n) | (x << (32 - n))) >>> 0; }
    const mathPow = Math.pow, maxWord = mathPow(2, 32);
    let result = ''; const words = []; const asciiBitLength = ascii.length * 8;
    let hash = sha256_js.h = sha256_js.h || [];
    const k = sha256_js.k = sha256_js.k || [];
    let primeCounter = k.length; const isComposite = {};
    for (let candidate = 2; primeCounter < 64; candidate++) {
      if (!isComposite[candidate]) {
        for (let i = 0; i < 313; i += candidate) isComposite[i] = candidate;
        hash[primeCounter] = (mathPow(candidate, .5) * maxWord) | 0;
        k[primeCounter++] = (mathPow(candidate, 1/3) * maxWord) | 0;
      }
    }
    ascii += '\x80';
    while (ascii.length % 64 - 56) ascii += '\x00';
    for (let i = 0; i < ascii.length; i++) {
      const j = ascii.charCodeAt(i);
      if (j >> 8) return '';
      words[i >> 2] |= j << ((3 - i) % 4) * 8;
    }
    words[words.length] = ((asciiBitLength / maxWord) | 0);
    words[words.length] = (asciiBitLength);
    for (let j = 0; j < words.length;) {
      const w = words.slice(j, j += 16); const oldHash = hash; hash = hash.slice(0, 8);
      for (let i = 0; i < 64; i++) {
        const w15 = w[i - 15], w2 = w[i - 2]; const a = hash[0], e = hash[4];
        const temp1 = hash[7]
          + (rightRotate(6, e) ^ rightRotate(11, e) ^ rightRotate(25, e))
          + ((e & hash[5]) ^ ((~e) & hash[6])) + k[i]
          + (w[i] = (i < 16) ? w[i] : (w[i - 16]
            + (rightRotate(7, w15) ^ rightRotate(18, w15) ^ (w15 >>> 3)) + w[i - 7]
            + (rightRotate(17, w2) ^ rightRotate(19, w2) ^ (w2 >>> 10))) | 0);
        const temp2 = (rightRotate(2, a) ^ rightRotate(13, a) ^ rightRotate(22, a))
          + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
        hash = [(temp1 + temp2) | 0].concat(hash); hash[4] = (hash[4] + temp1) | 0;
      }
      for (let i = 0; i < 8; i++) hash[i] = (hash[i] + oldHash[i]) | 0;
    }
    for (let i = 0; i < 8; i++) {
      for (let j = 3; j + 1; j--) {
        const b = (hash[i] >> (j * 8)) & 255;
        result += ((b < 16) ? '0' : '') + b.toString(16);
      }
    }
    return result;
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
