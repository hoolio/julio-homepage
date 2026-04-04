#!/usr/bin/env node
// Health Log Importer — Node.js CLI
// Usage: node import.js <logfile.txt> [--key sk-ant-...]
//
// Reads a plain text health log, chunks it by day boundaries,
// sends each chunk to Claude for parsing, deduplicates, outputs JSON.

const fs = require('fs');
const path = require('path');

// Load the shared chunker
const chunkerPath = path.join(__dirname, '..', 'health', 'js', 'chunker.js');
const chunkerSrc = fs.readFileSync(chunkerPath, 'utf-8');
const chunkerModule = {};
const wrappedFn = new Function('module', 'exports', 'window', chunkerSrc);
wrappedFn(chunkerModule, chunkerModule.exports = {}, undefined);
const { Chunker } = chunkerModule.exports;

// --- Config ---
const MAX_RETRIES = 5;
const BASE_DELAY = 1000;

// --- Parse CLI args ---
const args = process.argv.slice(2);
const inputFile = args.find(a => !a.startsWith('--'));
const keyFlag = args.find(a => a.startsWith('--key='));
let apiKey = keyFlag ? keyFlag.split('=')[1] : process.env.ANTHROPIC_API_KEY;

if (!inputFile) {
  console.error('Usage: node import.js <logfile.txt> [--key=sk-ant-...]');
  console.error('  Or set ANTHROPIC_API_KEY environment variable');
  process.exit(1);
}

if (!apiKey) {
  // Try .env file
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const match = envContent.match(/ANTHROPIC_API_KEY=(.+)/);
    if (match) apiKey = match[1].trim();
  }
}

if (!apiKey) {
  console.error('No API key found. Provide via --key=, ANTHROPIC_API_KEY env var, or tools/.env file');
  process.exit(1);
}

// --- API call with retry ---
async function callAnthropic(chunk, retryCount = 0) {
  const body = JSON.stringify({
    model: 'claude-sonnet-4-5-20250514',
    max_tokens: 4096,
    messages: [{
      role: 'user',
      content: Chunker.PARSE_PROMPT + '\n\n' + chunk
    }]
  });

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body,
  });

  if (res.status === 429 || res.status >= 500) {
    if (retryCount >= MAX_RETRIES) throw new Error(`API error ${res.status} after ${MAX_RETRIES} retries`);
    const delay = BASE_DELAY * Math.pow(2, retryCount) + Math.random() * 1000;
    process.stderr.write(`  Rate limited (${res.status}), retrying in ${(delay / 1000).toFixed(1)}s...\n`);
    await sleep(delay);
    return callAnthropic(chunk, retryCount + 1);
  }

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(`API error ${res.status}: ${errBody.error?.message || 'Unknown'}`);
  }

  const data = await res.json();
  return data.content[0].text;
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// --- Merge entries (don't overwrite existing data with nulls) ---
function mergeEntries(allEntries) {
  const byDate = new Map();
  for (const entry of allEntries) {
    if (!entry.date) continue;
    const existing = byDate.get(entry.date);
    if (existing) {
      for (const [key, value] of Object.entries(entry)) {
        if (value != null && (existing[key] == null || existing[key] === '')) {
          existing[key] = value;
        }
      }
    } else {
      byDate.set(entry.date, { ...entry });
    }
  }
  return Array.from(byDate.values()).sort((a, b) => a.date.localeCompare(b.date));
}

// --- Main ---
async function main() {
  const text = fs.readFileSync(inputFile, 'utf-8');
  console.log(`Read ${text.length} chars from ${inputFile}`);
  console.log(`Estimated tokens: ~${Chunker.estimateTokens(text)}`);

  const chunks = Chunker.prepareChunks(text, 8000);
  console.log(`Split into ${chunks.length} chunks\n`);

  const allEntries = [];
  const startTime = Date.now();

  for (const chunk of chunks) {
    const chunkNum = chunk.index + 1;
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(0);
    const rate = chunkNum > 1 ? ((Date.now() - startTime) / (chunkNum - 1) / 1000).toFixed(1) : '?';
    const remaining = chunkNum > 1 ? ((chunks.length - chunkNum + 1) * parseFloat(rate)).toFixed(0) : '?';

    process.stdout.write(`Processing chunk ${chunkNum} of ${chunks.length}... `);
    process.stdout.write(`(${allEntries.length} entries so far, ~${remaining}s remaining) `);

    try {
      const result = await callAnthropic(chunk.text);
      // Clean potential markdown fences
      const cleaned = result.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = JSON.parse(cleaned);
      const entries = Array.isArray(parsed) ? parsed : [parsed];
      allEntries.push(...entries);
      process.stdout.write(`\u2713 ${entries.length} entries\n`);
    } catch (err) {
      process.stdout.write(`\u2717 Error: ${err.message}\n`);
    }

    // Small delay between chunks to avoid rate limits
    if (chunkNum < chunks.length) await sleep(500);
  }

  const merged = mergeEntries(allEntries);
  console.log(`\nDone. ${merged.length} unique entries from ${allEntries.length} raw entries.`);

  // Output
  const outFile = inputFile.replace(/\.[^.]+$/, '') + '_parsed.json';
  fs.writeFileSync(outFile, JSON.stringify(merged, null, 2));
  console.log(`Written to ${outFile}`);
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
