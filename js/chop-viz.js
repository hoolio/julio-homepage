// Chop Viz — lightweight D3-style interactive SVG components
// No dependencies. Canvas + SVG. Mobile-aware.
(function () {
  'use strict';

  const COLORS = {
    gold: '#c4962e',
    goldDim: '#8a6622',
    amber: '#c47d28',
    oxblood: '#7a2e1c',
    paper: '#f9f6f0',
    ink: '#ede8df',
    dim: 'rgba(237, 232, 223, 0.35)',
    wire: 'rgba(237, 232, 223, 0.12)',
  };

  // ═══════════ OBSERVABLE: Living Data Field ═══════════
  // Particles attracted to cursor, trails, like a data field
  window.vizField = function (el) {
    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    el.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    let w, h, mouseX, mouseY, particles = [];
    const count = 80;

    function resize() {
      w = el.clientWidth;
      h = el.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.scale(dpr, dpr);
      mouseX = w / 2;
      mouseY = h / 2;
    }

    function init() {
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: Math.random() * 1.5 + 0.5,
          hue: Math.random(),
        });
      }
    }

    function frame() {
      ctx.fillStyle = 'rgba(15, 12, 8, 0.08)';
      ctx.fillRect(0, 0, w, h);

      particles.forEach((p, i) => {
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const force = Math.min(80 / (dist + 1), 0.6);
        p.vx += (dx / dist) * force * 0.02;
        p.vy += (dy / dist) * force * 0.02;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Wire connection to nearby
        for (let j = i + 1; j < particles.length; j++) {
          const o = particles[j];
          const d = Math.hypot(p.x - o.x, p.y - o.y);
          if (d < 80) {
            ctx.strokeStyle = `rgba(196, 125, 40, ${(1 - d / 80) * 0.15})`;
            ctx.lineWidth = 0.4;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(o.x, o.y);
            ctx.stroke();
          }
        }

        const color = p.hue > 0.5 ? COLORS.gold : COLORS.amber;
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(frame);
    }

    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      mouseX = e.clientX - r.left;
      mouseY = e.clientY - r.top;
    });
    el.addEventListener('touchmove', e => {
      const r = el.getBoundingClientRect();
      mouseX = e.touches[0].clientX - r.left;
      mouseY = e.touches[0].clientY - r.top;
    });

    window.addEventListener('resize', () => { resize(); init(); });
    resize();
    init();
    frame();
  };

  // ═══════════ SHADES: Multi-angle Prism ═══════════
  // Concentric rings that rotate independently, stylized refraction
  window.vizPrism = function (el) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 400 400');
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.maxHeight = '420px';
    el.appendChild(svg);

    const cx = 200, cy = 200;
    const rings = 8;
    const hues = [COLORS.gold, COLORS.amber, COLORS.oxblood, COLORS.goldDim];

    for (let i = 0; i < rings; i++) {
      const r = 30 + i * 20;
      const ring = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      ring.dataset.speed = (0.15 + i * 0.08) * (i % 2 === 0 ? 1 : -1);
      ring.dataset.angle = Math.random() * 360;

      // 6-8 facets per ring
      const facets = 6 + (i % 3);
      for (let j = 0; j < facets; j++) {
        const a1 = (j / facets) * Math.PI * 2;
        const a2 = ((j + 0.7) / facets) * Math.PI * 2;
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const x1 = cx + Math.cos(a1) * r;
        const y1 = cy + Math.sin(a1) * r;
        const x2 = cx + Math.cos(a2) * r;
        const y2 = cy + Math.sin(a2) * r;
        path.setAttribute('d', `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', hues[(i + j) % hues.length]);
        path.setAttribute('stroke-width', 0.8 + (i % 3) * 0.3);
        path.setAttribute('opacity', 0.5 + (i / rings) * 0.3);
        ring.appendChild(path);
      }
      svg.appendChild(ring);
    }

    let mx = 0;
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    });
    el.addEventListener('mouseleave', () => { mx = 0; });

    function frame() {
      const groups = svg.querySelectorAll('g');
      groups.forEach(g => {
        const speed = parseFloat(g.dataset.speed);
        let angle = parseFloat(g.dataset.angle);
        angle += speed * (1 + mx * 3);
        g.dataset.angle = angle;
        g.setAttribute('transform', `rotate(${angle} ${cx} ${cy})`);
      });
      requestAnimationFrame(frame);
    }
    frame();
  };

  // ═══════════ GITHUB: Timeline Skyline ═══════════
  // Stacked bars representing 2012-2018 growth, interactive hover
  window.vizSkyline = function (el) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 800 360');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svg.style.width = '100%';
    svg.style.height = '100%';
    el.appendChild(svg);

    // Synthetic growth curve 2012-2018
    const data = [
      { y: 2012, users: 3, vol: 3 },
      { y: 2013, users: 5, vol: 8 },
      { y: 2014, users: 8, vol: 14 },
      { y: 2015, users: 11, vol: 22 },
      { y: 2016, users: 15, vol: 34 },
      { y: 2017, users: 22, vol: 52 },
      { y: 2018, users: 31, vol: 85 },
    ];

    const w = 800, h = 360;
    const marginL = 60, marginB = 50, marginT = 30, marginR = 30;
    const chartW = w - marginL - marginR;
    const chartH = h - marginT - marginB;
    const barW = chartW / data.length * 0.45;
    const gap = chartW / data.length;
    const maxVol = Math.max(...data.map(d => d.vol));

    // Grid lines
    for (let i = 0; i <= 4; i++) {
      const y = marginT + (chartH / 4) * i;
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', marginL); line.setAttribute('x2', w - marginR);
      line.setAttribute('y1', y); line.setAttribute('y2', y);
      line.setAttribute('stroke', COLORS.wire);
      line.setAttribute('stroke-width', 0.5);
      svg.appendChild(line);
    }

    // Bars
    data.forEach((d, i) => {
      const x = marginL + i * gap + (gap - barW) / 2;
      const barH = (d.vol / maxVol) * chartH;
      const y = marginT + chartH - barH;

      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', x);
      rect.setAttribute('y', y);
      rect.setAttribute('width', barW);
      rect.setAttribute('height', barH);
      rect.setAttribute('fill', COLORS.gold);
      rect.setAttribute('opacity', 0.25 + (i / data.length) * 0.55);
      rect.style.transition = 'opacity 0.3s, y 0.4s cubic-bezier(0.2,0.9,0.3,1), height 0.4s cubic-bezier(0.2,0.9,0.3,1)';
      rect.dataset.year = d.y;
      rect.dataset.vol = d.vol;
      svg.appendChild(rect);

      // Highlight 2018 (acquisition)
      if (d.y === 2018) {
        rect.setAttribute('fill', COLORS.amber);
        rect.setAttribute('opacity', 0.9);
      }

      // Year label
      const yt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      yt.setAttribute('x', x + barW / 2);
      yt.setAttribute('y', h - 24);
      yt.setAttribute('text-anchor', 'middle');
      yt.setAttribute('fill', COLORS.dim);
      yt.setAttribute('font-family', 'IBM Plex Mono, monospace');
      yt.setAttribute('font-size', '10');
      yt.setAttribute('letter-spacing', '1.5');
      yt.textContent = d.y;
      svg.appendChild(yt);
    });

    // Title annotation
    const lbl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    lbl.setAttribute('x', marginL);
    lbl.setAttribute('y', marginT - 10);
    lbl.setAttribute('fill', COLORS.dim);
    lbl.setAttribute('font-family', 'IBM Plex Mono, monospace');
    lbl.setAttribute('font-size', '9');
    lbl.setAttribute('letter-spacing', '2');
    lbl.textContent = 'GITHUB GROWTH ARC — USERS IN MILLIONS';
    svg.appendChild(lbl);

    // Acquisition marker
    const marker = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    marker.setAttribute('x', marginL + 6 * gap + gap / 2);
    marker.setAttribute('y', marginT - 10);
    marker.setAttribute('text-anchor', 'middle');
    marker.setAttribute('fill', COLORS.amber);
    marker.setAttribute('font-family', 'IBM Plex Mono, monospace');
    marker.setAttribute('font-size', '9');
    marker.setAttribute('letter-spacing', '2');
    marker.textContent = '$7.5B · OCT 2018';
    svg.appendChild(marker);

    // Hover tooltip
    const tip = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    tip.setAttribute('fill', COLORS.gold);
    tip.setAttribute('font-family', 'IBM Plex Mono, monospace');
    tip.setAttribute('font-size', '10');
    tip.setAttribute('text-anchor', 'middle');
    tip.style.opacity = 0;
    tip.style.transition = 'opacity 0.2s';
    svg.appendChild(tip);

    svg.querySelectorAll('rect').forEach(r => {
      r.addEventListener('mouseenter', () => {
        const vol = r.dataset.vol;
        const year = r.dataset.year;
        const x = parseFloat(r.getAttribute('x')) + parseFloat(r.getAttribute('width')) / 2;
        const y = parseFloat(r.getAttribute('y')) - 8;
        tip.setAttribute('x', x);
        tip.setAttribute('y', y);
        tip.textContent = `${year}: ${vol}M`;
        tip.style.opacity = 1;
        r.setAttribute('opacity', 1);
      });
      r.addEventListener('mouseleave', () => {
        tip.style.opacity = 0;
        if (r.dataset.year === '2018') r.setAttribute('opacity', 0.9);
        else {
          const i = parseInt(r.dataset.year) - 2012;
          r.setAttribute('opacity', 0.25 + (i / 7) * 0.55);
        }
      });
    });
  };

})();
