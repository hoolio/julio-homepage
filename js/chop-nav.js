// Shared site navigation — minimal brand mark
// Injects into <div id="chop-nav"></div>
(function () {
  'use strict';

  const DUSTY_RED = '#6a1e1a';

  const css = `
    #chop-nav {
      position: sticky; top: 0; z-index: 80;
      background: rgba(240, 235, 225, 0.85);
      -webkit-backdrop-filter: blur(14px) saturate(1.15);
              backdrop-filter: blur(14px) saturate(1.15);
      color: #1a1714;
      padding: 0 clamp(16px, 3vw, 32px);
      display: flex; align-items: center;
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

    @media (max-width: 680px) {
      #chop-nav { padding: 0 12px; min-height: 44px; }
      #chop-nav .cn-brand { font-size: 15px; }
      #chop-nav .cn-colophon { width: 18px; height: 18px; }
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

  function render() {
    const host = document.getElementById('chop-nav');
    if (!host) return;
    host.innerHTML = `
      <a class="cn-brand" href="/home/radio/" aria-label="chopradio — archive">
        ${COLOPHON}
        <span>chop<span class="wm-italic">radio</span></span>
      </a>
    `;
  }

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
  else render();
})();
