// Encryption layer: PBKDF2 key derivation + AES-256-GCM
const Vault = (function () {
  'use strict';

  const SALT_KEY = 'health_vault_salt';
  const VERIFY_KEY = 'health_vault_verify';
  const SESSION_KEY = 'health_vault_session';
  const ENC_PREFIX = 'enc:';
  const ITER = 600000;

  let _key = null;

  function isSetUp() {
    return localStorage.getItem(SALT_KEY) !== null;
  }

  function isUnlocked() {
    return _key !== null;
  }

  function lock() {
    _key = null;
    sessionStorage.removeItem(SESSION_KEY);
  }

  async function _getSalt() {
    const stored = localStorage.getItem(SALT_KEY);
    if (stored) return _b64ToBytes(stored);
    const salt = crypto.getRandomValues(new Uint8Array(16));
    localStorage.setItem(SALT_KEY, _bytesToB64(salt));
    return salt;
  }

  async function _deriveKey(password, salt) {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      'raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']
    );
    return crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt, iterations: ITER, hash: 'SHA-256' },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  }

  async function setup(password) {
    const salt = await _getSalt();
    _key = await _deriveKey(password, salt);
    const token = await encrypt('health_vault_ok');
    localStorage.setItem(VERIFY_KEY, token);
    sessionStorage.setItem(SESSION_KEY, password);
  }

  async function unlock(password) {
    const salt = await _getSalt();
    _key = await _deriveKey(password, salt);
    const token = localStorage.getItem(VERIFY_KEY);
    if (!token) throw new Error('No vault found');
    try {
      const result = await decrypt(token);
      if (result !== 'health_vault_ok') throw new Error();
    } catch {
      _key = null;
      throw new Error('Wrong password');
    }
    sessionStorage.setItem(SESSION_KEY, password);
  }

  // Try to auto-unlock from session (survives refresh, clears on tab close)
  async function trySessionUnlock() {
    const pw = sessionStorage.getItem(SESSION_KEY);
    if (!pw || !isSetUp()) return false;
    try {
      await unlock(pw);
      return true;
    } catch {
      sessionStorage.removeItem(SESSION_KEY);
      return false;
    }
  }

  async function encrypt(plaintext) {
    if (!_key) throw new Error('Vault locked');
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const enc = new TextEncoder();
    const ciphertext = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      _key,
      enc.encode(plaintext)
    );
    // Format: base64(iv) + '.' + base64(ciphertext)
    return ENC_PREFIX + _bytesToB64(iv) + '.' + _bytesToB64(new Uint8Array(ciphertext));
  }

  async function decrypt(stored) {
    if (!_key) throw new Error('Vault locked');
    const payload = stored.startsWith(ENC_PREFIX) ? stored.slice(ENC_PREFIX.length) : stored;
    const [ivB64, ctB64] = payload.split('.');
    const iv = _b64ToBytes(ivB64);
    const ciphertext = _b64ToBytes(ctB64);
    const plainBuffer = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      _key,
      ciphertext
    );
    return new TextDecoder().decode(plainBuffer);
  }

  function isEncrypted(value) {
    return typeof value === 'string' && value.startsWith(ENC_PREFIX);
  }

  // Encrypted localStorage helpers
  async function setEncrypted(key, data) {
    const json = JSON.stringify(data);
    const encrypted = await encrypt(json);
    localStorage.setItem(key, encrypted);
  }

  async function getEncrypted(key, fallback) {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    if (!isEncrypted(raw)) {
      // Plaintext data from before encryption was enabled — migrate it
      const parsed = JSON.parse(raw);
      await setEncrypted(key, parsed);
      return parsed;
    }
    const decrypted = await decrypt(raw);
    return JSON.parse(decrypted);
  }

  // Base64 helpers
  function _bytesToB64(bytes) {
    let binary = '';
    for (const b of bytes) binary += String.fromCharCode(b);
    return btoa(binary);
  }

  function _b64ToBytes(b64) {
    const binary = atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
  }

  return { isSetUp, isUnlocked, lock, setup, unlock, trySessionUnlock, setEncrypted, getEncrypted };
})();
