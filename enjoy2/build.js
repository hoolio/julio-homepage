// Bake source.md into a fully static index.html — no runtime CDN or fetch.
// The article is baked in (works with JS off / behind content blockers / in
// in-app browsers). {{TODAY}} keeps a live per-visitor date via a tiny inline
// script that has no external dependency and can't block the article rendering.
// Run after editing source.md:  ./build.sh   (then commit index.html)
const fs = require('fs'), path = require('path'), dir = __dirname;
let m = require('./build/marked.min.js');
const marked = m.marked || m;
if (marked.setOptions) marked.setOptions({ gfm: true, breaks: false });

let md = fs.readFileSync(path.join(dir, 'source.md'), 'utf8');
const buildDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
md = md.replace(/\{\{TODAY\}\}/g, `<span class="today">${buildDate}</span>`);
const content = (marked.parse || marked)(md).trim();

let html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
// strip the CDN marked script and the client-side fetch/render script (idempotent)
html = html.replace(/\n?[ \t]*<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/marked[^"]*"><\/script>/g, '');
html = html.replace(/\n?[ \t]*<script>\s*\(async[\s\S]*?<\/script>/g, '');
// bake the article
html = html.replace(/(<article class="prose" id="content">)[\s\S]*?(<\/article>)/, (mm, p1, p2) => p1 + '\n' + content + '\n    ' + p2);
// tiny, dependency-free live-date updater (falls back to the baked date if JS is off)
if (!html.includes('querySelectorAll(".today")')) {
  const s = '<script>document.querySelectorAll(".today").forEach(function(e){try{e.textContent=new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});}catch(_){}}); </script>';
  html = html.replace('</body>', '  ' + s + '\n</body>');
}
// keep <title> synced to the article's h1
const h1 = (content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '';
const h1txt = h1.replace(/<[^>]+>/g, '').trim();
if (h1txt) html = html.replace(/<title>[\s\S]*?<\/title>/, () => '<title>' + h1txt + ' \u2014 Julio Avalos</title>');

fs.writeFileSync(path.join(dir, 'index.html'), html);
console.log('Baked static index.html from source.md (' + content.length + ' chars).');
