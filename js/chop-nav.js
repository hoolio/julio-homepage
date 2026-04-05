// Shared site navigation — injects into <div id="chop-nav"></div>
// Small uppercase gray style; scholastic colophon SVG logo; dusty-red hover shadow
(function () {
  'use strict';

  const LINKS = [
    { href: '/home/writings/', label: 'Writings' },
    { href: '/home/sounds/',   label: 'Sounds' },
    { href: '/home/tech/',     label: 'Tech' },
    { href: '/home/culture/',  label: 'Culture' },
    { href: '/about/',         label: 'About' },
  ];

  // Scholastic / utopian colophon: circle + inscribed rotated square + cross rules + center dot
  const COLOPHON = `
    <svg class="cn-colophon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="10.5" stroke="currentColor" stroke-width="0.8"/>
      <rect class="cn-sq" x="5.5" y="5.5" width="13" height="13" stroke="currentColor" stroke-width="0.6" transform="rotate(45 12 12)" opacity="0.5"/>
      <line x1="2.5" y1="12" x2="21.5" y2="12" stroke="currentColor" stroke-width="0.6" opacity="0.7"/>
      <line x1="12" y1="2.5" x2="12" y2="21.5" stroke="currentColor" stroke-width="0.6" opacity="0.35"/>
      <circle cx="12" cy="12" r="1.2" fill="currentColor"/>
    </svg>
  `;

  // Dead-Ringers dusty red: deep oxblood like operating-theater robes
  const DUSTY_RED = '#6a1e1a';
  const DUSTY_RED_DIM = 'rgba(106, 30, 26, 0.18)';

  const css = `
    #chop-nav {
      padding: 14px 22px;
      font-size: 11px;
      letter-spacing: 0.06em;
      border-bottom: 1px solid rgba(0,0,0,0.06);
      display: flex; align-items: center;
      gap: 0;
      background: #f9f6f0;
      position: relative;
      overflow: hidden;
    }
    #chop-nav .cn-brand {
      display: inline-flex; align-items: center; gap: 9px;
      color: #1a1714; text-decoration: none;
      margin-right: 26px; flex-shrink: 0;
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 17px; font-weight: 500;
      letter-spacing: 0.01em;
      line-height: 1;
    }
    #chop-nav .cn-brand .wm-italic { font-style: italic; font-weight: 400; color: #5a534a; }
    #chop-nav .cn-colophon {
      width: 22px; height: 22px;
      color: #1a1714;
      transition: color 0.4s ease;
    }
    #chop-nav .cn-colophon .cn-sq {
      transform-box: fill-box; transform-origin: center;
      animation: cnSpin 120s linear infinite;
    }
    @keyframes cnSpin { from { transform: rotate(45deg); } to { transform: rotate(405deg); } }
    #chop-nav .cn-brand:hover .cn-colophon { color: ${DUSTY_RED}; }

    #chop-nav .cn-scroll {
      display: flex; align-items: baseline;
      flex: 1 1 auto; min-width: 0;
      overflow-x: auto; overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      white-space: nowrap;
      mask-image: linear-gradient(to right, transparent 0, #000 14px, #000 calc(100% - 22px), transparent 100%);
      -webkit-mask-image: linear-gradient(to right, transparent 0, #000 14px, #000 calc(100% - 22px), transparent 100%);
    }
    #chop-nav .cn-scroll::-webkit-scrollbar { display: none; }
    #chop-nav a.cn-link {
      position: relative;
      color: #8a8580;
      text-decoration: none;
      margin-right: 20px;
      text-transform: uppercase;
      padding: 3px 2px 4px;
      transition: color 0.25s ease, text-shadow 0.35s ease;
      flex-shrink: 0;
    }
    #chop-nav a.cn-link:last-child { margin-right: 8px; }
    #chop-nav a.cn-link::after {
      content: '';
      position: absolute; left: 0; right: 100%; bottom: 0;
      height: 1px; background: ${DUSTY_RED};
      transition: right 0.3s cubic-bezier(0.2, 0.7, 0.2, 1);
      opacity: 0.55;
    }
    #chop-nav a.cn-link:hover {
      color: ${DUSTY_RED};
      text-shadow:
        0 0 1px rgba(106, 30, 26, 0.6),
        0 0 8px rgba(106, 30, 26, 0.35),
        0 0 22px rgba(106, 30, 26, 0.28),
        0 1px 0 rgba(26, 6, 4, 0.4);
    }
    #chop-nav a.cn-link:hover::after { right: 0; }
    #chop-nav a.cn-link.active { color: #1a1714; }
    #chop-nav a.cn-link.active::after { right: 0; background: ${DUSTY_RED}; opacity: 0.35; }

    @media (max-width: 680px) {
      #chop-nav {
        flex-direction: column;
        align-items: stretch;
        padding: 10px 14px;
        font-size: 10px;
        gap: 6px;
      }
      #chop-nav .cn-brand {
        margin-right: 0;
        font-size: 15px;
        align-self: flex-start;
      }
      #chop-nav .cn-colophon { width: 20px; height: 20px; }
      #chop-nav .cn-scroll {
        padding-top: 2px;
        mask-image: linear-gradient(to right, #000 0, #000 calc(100% - 22px), transparent 100%);
        -webkit-mask-image: linear-gradient(to right, #000 0, #000 calc(100% - 22px), transparent 100%);
      }
      #chop-nav a.cn-link { margin-right: 14px; }
    }
  `;

  function render() {
    const host = document.getElementById('chop-nav');
    if (!host) return;
    const here = (location.pathname.replace(/\/+$/, '') + '/') || '/';
    const items = LINKS.map(l => {
      const isActive = here === l.href || (l.href !== '/home/' && here.indexOf(l.href) === 0);
      return `<a class="cn-link${isActive ? ' active' : ''}" href="${l.href}">${l.label}</a>`;
    }).join('');
    host.innerHTML = `
      <a class="cn-brand" href="/home/" aria-label="chopradio">
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
