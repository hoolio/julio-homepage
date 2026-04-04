// Minimal SVG chart rendering
const Charts = (function () {
  'use strict';

  const PAD = { top: 20, right: 12, bottom: 28, left: 36 };

  function line(container, data, opts = {}) {
    const { color = '#c9a84c', height = 160, highlightAbove, highlightColor = '#d4b85c', label = '' } = opts;
    if (!data.length) { container.innerHTML = '<div class="chart-empty">No data</div>'; return; }

    const el = container;
    const w = el.offsetWidth || 320;
    const h = height;
    const plotW = w - PAD.left - PAD.right;
    const plotH = h - PAD.top - PAD.bottom;

    const vals = data.map(d => d.value);
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const range = max - min || 1;
    const yPad = range * 0.1;

    const x = (i) => PAD.left + (i / (data.length - 1 || 1)) * plotW;
    const y = (v) => PAD.top + plotH - ((v - min + yPad) / (range + yPad * 2)) * plotH;

    const points = data.map((d, i) => `${x(i)},${y(d.value)}`);
    const pathD = 'M' + points.join(' L');

    // Y-axis ticks
    const yTicks = [min, min + range / 2, max].map(v => Math.round(v));
    const yTicksSvg = yTicks.map(v =>
      `<text x="${PAD.left - 6}" y="${y(v) + 4}" text-anchor="end" class="chart-tick">${v}</text>
       <line x1="${PAD.left}" y1="${y(v)}" x2="${w - PAD.right}" y2="${y(v)}" class="chart-grid"/>`
    ).join('');

    // X-axis labels (first, middle, last)
    const xLabels = [0, Math.floor(data.length / 2), data.length - 1]
      .filter((v, i, a) => a.indexOf(v) === i)
      .map(i => `<text x="${x(i)}" y="${h - 4}" text-anchor="middle" class="chart-tick">${fmtShort(data[i].date)}</text>`)
      .join('');

    // Highlight dots
    let dots = '';
    data.forEach((d, i) => {
      const isHighlight = highlightAbove != null && d.value >= highlightAbove;
      if (isHighlight) {
        dots += `<circle cx="${x(i)}" cy="${y(d.value)}" r="3.5" fill="${highlightColor}" />`;
      }
    });

    // Highlight threshold line
    let threshLine = '';
    if (highlightAbove != null && highlightAbove >= min && highlightAbove <= max) {
      threshLine = `<line x1="${PAD.left}" y1="${y(highlightAbove)}" x2="${w - PAD.right}" y2="${y(highlightAbove)}" stroke="${highlightColor}" stroke-width="1" stroke-dasharray="4,3" opacity="0.4"/>`;
    }

    el.innerHTML = `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      ${yTicksSvg}${xLabels}${threshLine}
      <path d="${pathD}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      ${dots}
    </svg>`;
  }

  function bar(container, data, opts = {}) {
    const { color = '#a08338', height = 140, warnBelow, warnColor = '#a04535', label = '' } = opts;
    if (!data.length) { container.innerHTML = '<div class="chart-empty">No data</div>'; return; }

    const el = container;
    const w = el.offsetWidth || 320;
    const h = height;
    const plotW = w - PAD.left - PAD.right;
    const plotH = h - PAD.top - PAD.bottom;

    const vals = data.map(d => d.value);
    const max = Math.max(...vals, 1);

    const barW = Math.max(4, Math.min(20, (plotW / data.length) - 3));

    const bars = data.map((d, i) => {
      const bx = PAD.left + (i / data.length) * plotW + (plotW / data.length - barW) / 2;
      const bh = (d.value / max) * plotH;
      const by = PAD.top + plotH - bh;
      const fill = (warnBelow != null && d.value < warnBelow) ? warnColor : color;
      return `<rect x="${bx}" y="${by}" width="${barW}" height="${bh}" rx="2" fill="${fill}" opacity="0.8"/>`;
    }).join('');

    // Y-axis
    const yTicks = [0, Math.round(max / 2), Math.round(max)];
    const yScale = (v) => PAD.top + plotH - (v / max) * plotH;
    const yTicksSvg = yTicks.map(v =>
      `<text x="${PAD.left - 6}" y="${yScale(v) + 4}" text-anchor="end" class="chart-tick">${v}</text>
       <line x1="${PAD.left}" y1="${yScale(v)}" x2="${w - PAD.right}" y2="${yScale(v)}" class="chart-grid"/>`
    ).join('');

    // X-axis
    const xLabels = [0, Math.floor(data.length / 2), data.length - 1]
      .filter((v, i, a) => a.indexOf(v) === i)
      .map(i => {
        const bx = PAD.left + (i / data.length) * plotW + (plotW / data.length) / 2;
        return `<text x="${bx}" y="${h - 4}" text-anchor="middle" class="chart-tick">${fmtShort(data[i].date)}</text>`;
      }).join('');

    // Warn threshold line
    let warnLine = '';
    if (warnBelow != null) {
      const wy = yScale(warnBelow);
      warnLine = `<line x1="${PAD.left}" y1="${wy}" x2="${w - PAD.right}" y2="${wy}" stroke="${warnColor}" stroke-width="1" stroke-dasharray="4,3" opacity="0.4"/>`;
    }

    el.innerHTML = `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      ${yTicksSvg}${xLabels}${warnLine}${bars}
    </svg>`;
  }

  function fmtShort(d) {
    const [, m, day] = d.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(m) - 1]} ${parseInt(day)}`;
  }

  return { line, bar };
})();
