#!/usr/bin/env node
// Journal builder — compiles /posts/*.md → /home/journal/[slug]/index.html
// Custom tags: ::audio, ::notebook, ::pullquote, ::break
// Also rebuilds /home/journal/index.html with all posts listed

const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, '..', 'posts');
const OUT_DIR = path.join(__dirname, '..', 'home', 'journal');

// ═══════════ Markdown parsing (minimal) ═══════════

function parseFrontmatter(src) {
  const match = src.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: src };
  const meta = {};
  match[1].split('\n').forEach(line => {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) meta[kv[1]] = kv[2].trim();
  });
  return { meta, body: match[2] };
}

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderInline(text) {
  // bold **x**
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // italic *x* or _x_
  text = text.replace(/(^|[\s(])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  text = text.replace(/(^|[\s(])_([^_\n]+)_/g, '$1<em>$2</em>');
  // inline code `x`
  text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
  // links [text](url)
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  return text;
}

function renderBody(md) {
  const lines = md.split('\n');
  const out = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Blank line
    if (!trimmed) { i++; continue; }

    // Custom block: ::audio[Title](url)
    const audioMatch = trimmed.match(/^::audio\[([^\]]+)\]\(([^)]+)\)$/);
    if (audioMatch) {
      out.push(renderAudio(audioMatch[1], audioMatch[2]));
      i++;
      continue;
    }

    // Custom block: ::notebook[@user/notebook]
    const notebookMatch = trimmed.match(/^::notebook\[([^\]]+)\]$/);
    if (notebookMatch) {
      out.push(renderNotebook(notebookMatch[1]));
      i++;
      continue;
    }

    // Custom block: ::pullquote[text]
    const pullquoteMatch = trimmed.match(/^::pullquote\[(.+)\]$/);
    if (pullquoteMatch) {
      out.push(`<div class="chop-pullquote">${renderInline(pullquoteMatch[1])}</div>`);
      i++;
      continue;
    }

    // Custom block: ::break
    if (trimmed === '::break') {
      out.push('<div class="chop-break">* * *</div>');
      i++;
      continue;
    }

    // Heading
    const h3 = trimmed.match(/^###\s+(.+)$/);
    const h2 = trimmed.match(/^##\s+(.+)$/);
    const h1 = trimmed.match(/^#\s+(.+)$/);
    if (h3) { out.push(`<h3>${renderInline(h3[1])}</h3>`); i++; continue; }
    if (h2) { out.push(`<h2>${renderInline(h2[1])}</h2>`); i++; continue; }
    if (h1) { out.push(`<h1>${renderInline(h1[1])}</h1>`); i++; continue; }

    // Blockquote
    if (trimmed.startsWith('> ')) {
      const parts = [];
      while (i < lines.length && lines[i].trim().startsWith('> ')) {
        parts.push(lines[i].trim().slice(2));
        i++;
      }
      out.push(`<blockquote>${renderInline(parts.join(' '))}</blockquote>`);
      continue;
    }

    // Paragraph — collect until blank line or block
    const para = [trimmed];
    i++;
    while (i < lines.length && lines[i].trim() && !isBlockStart(lines[i].trim())) {
      para.push(lines[i].trim());
      i++;
    }
    out.push(`<p>${renderInline(para.join(' '))}</p>`);
  }

  return out.join('\n\n');
}

function isBlockStart(line) {
  return line.startsWith('#') || line.startsWith('>') || line.startsWith('::');
}

// ═══════════ Custom components ═══════════

function renderAudio(title, url) {
  const id = 'p' + Math.random().toString(36).slice(2, 10);
  return `<span class="chop-player" data-url="${esc(url)}" data-id="${id}">
    <span class="play-circle"></span>
    <span class="player-label">${esc(title)}</span>
  </span>`;
}

function renderNotebook(ref) {
  // ref format: @user/notebook or full URL
  let src;
  if (ref.startsWith('@')) {
    // Convert @user/notebook to embed URL
    src = `https://observablehq.com/embed/${ref}?cells=viewof+chart`;
  } else {
    src = ref;
  }
  return `<div class="chop-notebook"><iframe src="${esc(src)}" allow="fullscreen"></iframe></div>`;
}

// ═══════════ Page templates ═══════════

function postHTML(meta, body) {
  const date = meta.date || '';
  const dateDisplay = formatDate(date);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(meta.title)} — Choplogic Radio</title>
<meta name="description" content="${esc(meta.deck || '')}">
<link rel="stylesheet" href="/css/journal.css">
</head>
<body>

<nav class="journal-nav">
  <a href="/home/" class="journal-nav-home">← Choplogic Radio</a>
  <ul class="journal-nav-links">
    <li><a href="/home/journal/">Journal</a></li>
    <li><a href="/home/radio/">Radio</a></li>
    <li><a href="/about/">About</a></li>
  </ul>
</nav>

<article class="post">
  <div class="post-meta">
    <span>${dateDisplay}</span>
    <span class="divider"></span>
    <span>Journal</span>
  </div>

  <h1>${renderInline(meta.title)}</h1>

  ${meta.deck ? `<p class="post-deck">${renderInline(meta.deck)}</p>` : ''}

  ${body}
</article>

<footer class="post-foot">
  <span>Choplogic Radio · Est. 2006</span>
  <a href="/home/journal/">All entries →</a>
</footer>

<script src="/js/chop-player.js"></script>
</body>
</html>`;
}

function indexHTML(posts) {
  const items = posts.map(p => `
    <a href="/home/journal/${p.slug}/" class="journal-item">
      <div class="journal-item-date">${formatDate(p.date)}</div>
      <div class="journal-item-title">${renderInline(p.title)}</div>
      <div class="journal-item-deck">${renderInline(p.deck || '')}</div>
    </a>
  `).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Journal — Choplogic Radio</title>
<link rel="stylesheet" href="/css/journal.css">
</head>
<body>

<nav class="journal-nav">
  <a href="/home/" class="journal-nav-home">← Choplogic Radio</a>
  <ul class="journal-nav-links">
    <li><a href="/home/journal/">Journal</a></li>
    <li><a href="/home/radio/">Radio</a></li>
    <li><a href="/about/">About</a></li>
  </ul>
</nav>

<header class="journal-header">
  <h1 class="journal-title">Journal</h1>
  <p class="journal-subtitle">Essays, annotations, archives.</p>
</header>

<div class="journal-list">
  ${items}
</div>

<footer class="post-foot">
  <span>Choplogic Radio · Est. 2006</span>
  <a href="/home/">Home</a>
</footer>

</body>
</html>`;
}

function formatDate(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[parseInt(m)-1]} ${parseInt(d)}, ${y}`;
}

// ═══════════ Build ═══════════

function build() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.error(`No posts directory at ${POSTS_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
  const posts = [];

  for (const file of files) {
    const src = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');
    const { meta, body } = parseFrontmatter(src);

    if (!meta.slug || !meta.title) {
      console.warn(`Skipping ${file}: missing slug or title`);
      continue;
    }

    const html = postHTML(meta, renderBody(body));
    const outPath = path.join(OUT_DIR, meta.slug);
    if (!fs.existsSync(outPath)) fs.mkdirSync(outPath, { recursive: true });
    fs.writeFileSync(path.join(outPath, 'index.html'), html);
    console.log(`✓ ${meta.slug}`);

    posts.push(meta);
  }

  // Sort by date descending
  posts.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  // Write index
  fs.writeFileSync(path.join(OUT_DIR, 'index.html'), indexHTML(posts));
  console.log(`✓ index (${posts.length} posts)`);
}

build();
