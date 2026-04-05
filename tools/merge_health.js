#!/usr/bin/env node
// Merge batch2_parsed.json + batch3_parsed.json into Health page entry schema
// Outputs: health_entries_merged.json (array) AND health_console_snippet.txt (paste-in-browser)

const fs = require('fs');
const path = require('path');

const b2 = require('./batch2_parsed.json');
const b3 = require('./batch3_parsed.json');

// --- 1. Merge by date, preferring non-null values ---
const byDate = new Map();
function ingest(entry) {
  if (!entry.date || !/^\d{4}-\d{2}-\d{2}$/.test(entry.date)) return;
  const existing = byDate.get(entry.date);
  if (!existing) { byDate.set(entry.date, { ...entry }); return; }
  for (const [k, v] of Object.entries(entry)) {
    if (v != null && v !== '' && (existing[k] == null || existing[k] === '')) {
      existing[k] = v;
    } else if (v != null && v !== '' && typeof v === 'string' && typeof existing[k] === 'string' && !existing[k].includes(v) && v.length > existing[k].length) {
      // Prefer longer version of same field
      existing[k] = v;
    }
  }
}
for (const e of b2) ingest(e);
for (const e of b3) ingest(e);

// --- 2. Drop empties (context-only rows with nothing useful) ---
function isEmpty(e) {
  const hasData = e.food || e.exercise || e.weight != null || e.sleep_hours != null ||
                  e.hrv != null || e.rhr != null || e.mood || e.energy;
  if (hasData) return false;
  // Keep notes-only if notes has substantive content
  if (e.notes && e.notes.length > 30 && !/context only|previous section/i.test(e.notes)) return false;
  return true;
}

// --- 3. Extract calories + protein from text (regex best-effort) ---
function extractNum(text, patterns) {
  if (!text) return null;
  for (const pat of patterns) {
    const m = text.match(pat);
    if (m) {
      const n = parseFloat(m[1].replace(/,/g, ''));
      if (!isNaN(n)) return Math.round(n);
    }
  }
  return null;
}

function extractCalories(e) {
  const blob = [e.food, e.exercise, e.notes].filter(Boolean).join(' ');
  // Look for "total calories: 1890" or "~1,890 kcal" or "1800 kcal"
  return extractNum(blob, [
    /total\s+calories?[:\s~]*([0-9,]{3,6})/i,
    /([0-9,]{3,5})[\s-]*kcal\b(?!\s*burn)/i,
    /~\s*([0-9,]{3,5})\s*(?:kcal|calories)/i,
  ]);
}
function extractProtein(e) {
  const blob = [e.food, e.notes].filter(Boolean).join(' ');
  return extractNum(blob, [
    /total\s+protein[:\s~]*([0-9]{2,3})\s*g/i,
    /~\s*([0-9]{2,3})\s*g\s+protein/i,
    /([0-9]{2,3})\s*g\s+protein/i,
    /protein[:\s~]*([0-9]{2,3})\s*g/i,
  ]);
}

// --- 4. Convert to Health page schema ---
function splitToArray(s) {
  if (!s) return [];
  return s.split(/[;\n]+/).map(x => x.trim()).filter(x => x.length > 0);
}

const converted = [];
for (const e of byDate.values()) {
  if (isEmpty(e)) continue;
  const food = splitToArray(e.food);
  const activity = splitToArray(e.exercise);
  const calories = extractCalories(e);
  const protein = extractProtein(e);

  // Build note as brief summary
  let note = '';
  if (e.mood) note += e.mood;
  if (e.energy) note += (note ? '. ' : '') + `Energy: ${e.energy}`;
  if (e.weight != null) note += (note ? '. ' : '') + `Weight: ${e.weight}`;
  if (e.notes) {
    const n = e.notes.replace(/\s+/g, ' ').trim();
    note = note ? note + '. ' + n : n;
  }
  // Trim absurdly long notes
  if (note.length > 300) note = note.slice(0, 297) + '...';

  converted.push({
    date: e.date,
    hrv: e.hrv ?? null,
    rhr: e.rhr ?? null,
    sleep: e.sleep_hours ?? null,
    calories: calories,
    protein: protein,
    note: note || null,
    activity: activity,
    food: food,
    strong: (e.energy === 'high') || /multiple prs|pr hit|strong day/i.test(e.notes || '') || false,
  });
}

converted.sort((a,b) => a.date.localeCompare(b.date));

// --- 5. Write merged JSON ---
fs.writeFileSync(
  path.join(__dirname, 'health_entries_merged.json'),
  JSON.stringify(converted, null, 2)
);

// --- 6. Write console snippet ---
const snippet = `// Paste this into the browser console on /health/ (localhost:8888/health/)
// It will MERGE these ${converted.length} imported entries with whatever is already in localStorage,
// preferring existing data on date conflicts.
(function(){
  const KEY = 'health_entries';
  const imported = ${JSON.stringify(converted, null, 2)};
  const existing = JSON.parse(localStorage.getItem(KEY) || '[]');
  const byDate = new Map();
  for (const e of existing) byDate.set(e.date, e);
  let added = 0, skipped = 0;
  for (const e of imported) {
    if (byDate.has(e.date)) { skipped++; continue; }
    byDate.set(e.date, e);
    added++;
  }
  const merged = Array.from(byDate.values()).sort((a,b)=>a.date.localeCompare(b.date));
  localStorage.setItem(KEY, JSON.stringify(merged));
  console.log('Imported:', added, 'added,', skipped, 'skipped (already existed). Total now:', merged.length);
  location.reload();
})();
`;
fs.writeFileSync(path.join(__dirname, 'health_console_snippet.js'), snippet);

console.log(`Wrote ${converted.length} entries to health_entries_merged.json`);
console.log(`Console snippet ready at tools/health_console_snippet.js`);
console.log(`Date range: ${converted[0]?.date} to ${converted[converted.length-1]?.date}`);
console.log(`With HRV: ${converted.filter(e=>e.hrv!=null).length}, With calories: ${converted.filter(e=>e.calories!=null).length}, With protein: ${converted.filter(e=>e.protein!=null).length}`);
