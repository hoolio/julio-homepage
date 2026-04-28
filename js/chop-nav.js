// Shared site navigation — minimal brand mark + subscribe
(function () {
  'use strict';

  const DUSTY_RED = '#6a1e1a';
  const _u = ['chopradio', 'gmail.com'].join('@');

  const css = `
    #chop-nav {
      position: sticky; top: 0; z-index: 80;
      background: rgba(240, 235, 225, 0.85);
      -webkit-backdrop-filter: blur(14px) saturate(1.15);
              backdrop-filter: blur(14px) saturate(1.15);
      color: #1a1714;
      padding: 0 clamp(16px, 3vw, 32px);
      display: flex; align-items: center;
      justify-content: space-between;
      min-height: 44px;
      border-bottom: none;
      font-family: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif;
    }
    #chop-nav .cn-brand {
      display: inline-flex; align-items: center; gap: 9px;
      color: #1a1714; text-decoration: none;
      font-family: 'IBM Plex Sans', sans-serif;
      font-size: 17px; font-weight: 600;
      letter-spacing: -0.01em; line-height: 1;
      flex-shrink: 0;
      position: relative;
      transition: color 0.3s ease;
    }
    #chop-nav .cn-brand:hover { color: ${DUSTY_RED}; }
    #chop-nav .cn-brand .wm-italic {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-style: italic;
      font-weight: 400;
      color: #5a534a;
      margin-left: 1px;
      transition: color 0.3s ease;
    }
    #chop-nav .cn-brand:hover .wm-italic { color: ${DUSTY_RED}; }
    #chop-nav .cn-colophon {
      width: 20px; height: 20px;
      color: #1a1714;
      transition: color 0.3s ease;
    }
    #chop-nav .cn-colophon .cn-sq {
      transform-box: fill-box; transform-origin: center;
      animation: cnSpin 120s linear infinite;
    }
    @keyframes cnSpin { from { transform: rotate(45deg); } to { transform: rotate(405deg); } }
    #chop-nav .cn-brand:hover .cn-colophon { color: ${DUSTY_RED}; }

    /* Subscribe button */
    .cn-sub-wrap {
      display: flex;
      align-items: center;
      gap: 0;
      flex-shrink: 0;
    }
    .cn-sub-btn {
      width: 26px; height: 26px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      color: #5a534a;
      transition: color 0.3s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    .cn-sub-btn:hover { color: ${DUSTY_RED}; }
    .cn-sub-btn.open {
      transform: rotate(135deg);
      color: ${DUSTY_RED};
    }
    .cn-sub-btn svg {
      width: 22px; height: 22px;
    }
    .cn-sub-field {
      overflow: hidden;
      width: 0;
      opacity: 0;
      transition: width 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                  opacity 0.3s ease;
      display: flex;
      align-items: center;
    }
    .cn-sub-field.open {
      width: 200px;
      opacity: 1;
    }
    .cn-sub-input {
      width: 100%;
      font-family: Garamond, Georgia, serif;
      font-size: 15px;
      color: #1a1714;
      background: none;
      border: none;
      border-bottom: 1.5px solid rgba(26, 23, 20, 0.2);
      padding: 4px 0;
      margin-right: 10px;
      outline: none;
      transition: border-color 0.3s;
    }
    .cn-sub-input::placeholder {
      color: #a89c80;
      font-style: italic;
    }
    .cn-sub-input:focus {
      border-color: ${DUSTY_RED};
    }
    .cn-sub-go {
      background: none;
      border: 1px solid rgba(0,0,0,0.1);
      color: #b4a98f;
      font-family: 'IBM Plex Mono', monospace;
      font-size: 8px;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      padding: 4px 8px;
      cursor: pointer;
      flex-shrink: 0;
      transition: color 0.2s, border-color 0.2s;
      margin-right: 10px;
    }
    .cn-sub-go:hover {
      color: ${DUSTY_RED};
      border-color: rgba(106, 30, 26, 0.3);
    }
    .cn-sub-thanks {
      font-family: Garamond, Georgia, serif;
      font-size: 12px;
      font-style: italic;
      color: ${DUSTY_RED};
      white-space: nowrap;
      margin-right: 10px;
      opacity: 0;
      transition: opacity 0.5s ease;
    }
    .cn-sub-thanks.show { opacity: 1; }

    @media (max-width: 680px) {
      #chop-nav { padding: 0 12px; min-height: 44px; }
      #chop-nav .cn-brand { font-size: 15px; }
      #chop-nav .cn-colophon { width: 18px; height: 18px; }
      .cn-sub-field.open { width: 140px; }
      .cn-sub-input { font-size: 12px; }
      .cn-sub-btn svg { width: 20px; height: 20px; }
    }
  `;

  const COLOPHON = `
    <svg class="cn-colophon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="10.5" stroke="currentColor" stroke-width="0.8"/>
      <rect class="cn-sq" x="5.5" y="5.5" width="13" height="13" stroke="currentColor" stroke-width="0.6" transform="rotate(45 12 12)" opacity="0.5"/>
      <line x1="2.5" y1="12" x2="21.5" y2="12" stroke="currentColor" stroke-width="0.6" opacity="0.7"/>
      <line x1="12" y1="2.5" x2="12" y2="21.5" stroke="currentColor" stroke-width="0.6" opacity="0.35"/>
      <circle cx="12" cy="12" r="1.2" fill="currentColor"/>
    </svg>
  `;

  const PLUS_ICON = `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10.5" stroke="currentColor" stroke-width="0.8"/>
      <line x1="7" y1="12" x2="17" y2="12" stroke="${DUSTY_RED}" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="12" y1="7" x2="12" y2="17" stroke="${DUSTY_RED}" stroke-width="1.2" stroke-linecap="round"/>
    </svg>
  `;

  function render() {
    const host = document.getElementById('chop-nav');
    if (!host) return;
    // On the radio archive itself the brand mark points home; everywhere
    // else it links to the archive.
    const onRadio = /^\/home\/radio\/?($|\?|#)/.test(window.location.pathname);
    const brandHref = onRadio ? '/' : '/home/radio/';
    const brandLabel = onRadio ? 'julio avalos — home' : 'chopradio — archive';
    host.innerHTML = `
      <a class="cn-brand" href="${brandHref}" aria-label="${brandLabel}">
        ${COLOPHON}
        <span>chop<span class="wm-italic">radio</span></span>
      </a>
      <div class="cn-sub-wrap">
        <span class="cn-sub-thanks" id="cnThanks">thank you</span>
        <div class="cn-sub-field" id="cnField">
          <input class="cn-sub-input" id="cnEmail" type="email" placeholder="your email" autocomplete="email">
          <button class="cn-sub-go" id="cnGo">ok</button>
        </div>
        <button class="cn-sub-btn" id="cnSubBtn" aria-label="Subscribe">${PLUS_ICON}</button>
      </div>
    `;

    var btn = document.getElementById('cnSubBtn');
    var field = document.getElementById('cnField');
    var input = document.getElementById('cnEmail');
    var go = document.getElementById('cnGo');
    var thanks = document.getElementById('cnThanks');
    var isOpen = false;

    btn.addEventListener('click', function() {
      isOpen = !isOpen;
      btn.classList.toggle('open', isOpen);
      field.classList.toggle('open', isOpen);
      if (isOpen) {
        setTimeout(function() { input.focus(); }, 350);
      }
    });

    function submit() {
      var email = input.value.trim();
      if (!email || email.indexOf('@') < 1) { input.focus(); return; }

      // Send notification via mailto
      var subj = encodeURIComponent('New subscriber — chopradio.com');
      var body = encodeURIComponent('New email signup: ' + email + '\\n\\nFrom chopradio.com');
      var w = window.open('mailto:' + _u + '?subject=' + subj + '&body=' + body, '_blank');
      if (w) setTimeout(function() { w.close(); }, 500);

      // Show thanks
      isOpen = false;
      btn.classList.remove('open');
      field.classList.remove('open');
      input.value = '';
      thanks.classList.add('show');
      setTimeout(function() { thanks.classList.remove('show'); }, 3000);
    }

    go.addEventListener('click', submit);
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') submit();
      if (e.key === 'Escape') {
        isOpen = false;
        btn.classList.remove('open');
        field.classList.remove('open');
      }
    });
  }

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
  else render();
})();
