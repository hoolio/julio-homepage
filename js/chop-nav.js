// Shared site navigation — editorial paper bar with brand colors intact
// Injects into <div id="chop-nav"></div>
(function () {
  'use strict';

  const LINKS = [
    { href: '/#writings',    label: 'Writings' },
    { href: '/home/radio/',  label: 'Sounds' },
    { href: '/',             label: 'About' },
  ];

  const DUSTY_RED = '#6a1e1a';

  const css = `
    #chop-nav {
      position: sticky; top: 0; z-index: 80;
      background: #f9f6f0;
      color: #1a1714;
      padding: 0 clamp(16px, 3vw, 32px);
      display: flex; align-items: center;
      min-height: 56px;
      border-bottom: 1px solid rgba(26, 23, 20, 0.1);
      font-family: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif;
      overflow: hidden;
    }
    #chop-nav::before {
      content: ''; position: absolute; inset: 0; pointer-events: none;
      opacity: 0.05;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='nn'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23nn)'/%3E%3C/svg%3E");
      background-size: 180px 180px;
      mix-blend-mode: multiply;
    }
    #chop-nav .cn-brand {
      display: inline-flex; align-items: center; gap: 10px;
      color: #1a1714; text-decoration: none;
      font-family: 'IBM Plex Sans', sans-serif;
      font-size: 19px; font-weight: 600;
      letter-spacing: -0.01em; line-height: 1;
      margin-right: clamp(18px, 3vw, 36px);
      flex-shrink: 0;
      position: relative;
    }
    #chop-nav .cn-brand .wm-italic {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-style: italic;
      font-weight: 400;
      color: #5a534a;
      margin-left: 1px;
    }
    #chop-nav .cn-colophon {
      width: 22px; height: 22px;
      color: #1a1714;
      transition: color 0.3s ease;
    }
    #chop-nav .cn-colophon .cn-sq {
      transform-box: fill-box; transform-origin: center;
      animation: cnSpin 120s linear infinite;
    }
    @keyframes cnSpin { from { transform: rotate(45deg); } to { transform: rotate(405deg); } }
    #chop-nav .cn-brand:hover .cn-colophon { color: ${DUSTY_RED}; }

    #chop-nav .cn-scroll {
      display: flex; align-items: center;
      flex: 1 1 auto; min-width: 0;
      overflow-x: auto; overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      white-space: nowrap;
      position: relative;
    }
    #chop-nav .cn-scroll::-webkit-scrollbar { display: none; }

    #chop-nav a.cn-link {
      position: relative;
      color: #1a1714;
      text-decoration: none;
      padding: 20px 16px;
      text-transform: uppercase;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.12em;
      transition: color 0.2s ease, background 0.2s ease, text-shadow 0.3s ease;
      flex-shrink: 0;
      line-height: 1;
      display: flex; align-items: center;
    }
    #chop-nav a.cn-link:hover {
      color: ${DUSTY_RED};
      text-shadow: 0 0 12px rgba(106, 30, 26, 0.25);
    }
    #chop-nav a.cn-link.active {
      color: ${DUSTY_RED};
      box-shadow: inset 0 -2px 0 ${DUSTY_RED};
    }

    @media (max-width: 680px) {
      #chop-nav { padding: 0 12px; min-height: 52px; }
      #chop-nav .cn-brand { font-size: 17px; margin-right: 14px; }
      #chop-nav .cn-colophon { width: 20px; height: 20px; }
      #chop-nav a.cn-link { padding: 16px 10px; font-size: 10px; letter-spacing: 0.1em; }
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
    const here = (location.pathname.replace(/\/+$/, '') + '/') || '/';
    const hash = location.hash || '';
    const isRoot = (here === '/' || here === '/about/');
    function activeFor(href) {
      if (href.startsWith('/#')) return isRoot && hash === href.slice(1);
      if (href === '/') return isRoot && !hash;
      return here === href || here.indexOf(href) === 0;
    }
    const items = LINKS.map(l => {
      const isActive = activeFor(l.href);
      return `<a class="cn-link${isActive ? ' active' : ''}" href="${l.href}">${l.label}</a>`;
    }).join('');
    host.innerHTML = `
      <a class="cn-brand" href="/" aria-label="chopradio">
        ${COLOPHON}
        <span>chop<span class="wm-italic">radio</span></span>
      </a>
      <div class="cn-scroll">${items}</div>
    `;
  }

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
  else render();
})();
