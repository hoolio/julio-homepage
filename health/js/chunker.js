// Text chunker: splits health log text into day-boundary chunks
// Works in both browser and Node.js
(function (exports) {
  'use strict';

  const DATE_PATTERNS = [
    // ISO: 2025-03-21
    /\b(\d{4}-\d{2}-\d{2})\b/,
    // US: March 21, 2025 or Mar 21, 2025
    /\b((?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{1,2}(?:,?\s*\d{4})?)\b/i,
    // Day of week headers: Monday, March 21
    /\b((?:Mon(?:day)?|Tue(?:sday)?|Wed(?:nesday)?|Thu(?:rsday)?|Fri(?:day)?|Sat(?:urday)?|Sun(?:day)?)[,:\s]+(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{1,2}(?:,?\s*\d{4})?)\b/i,
    // Day-of-week standalone: Monday\n or **Monday**
    /^[*_]*\b(Mon(?:day)?|Tue(?:sday)?|Wed(?:nesday)?|Thu(?:rsday)?|Fri(?:day)?|Sat(?:urday)?|Sun(?:day)?)\b[*_]*/im,
    // Numeric: 3/21/2025 or 03/21
    /\b(\d{1,2}\/\d{1,2}(?:\/\d{2,4})?)\b/,
    // Day N or Day 1:
    /\bDay\s+\d+/i,
  ];

  // Rough token count (~4 chars per token)
  function estimateTokens(text) {
    return Math.ceil(text.length / 4);
  }

  // Check if a line looks like a date boundary
  function isDateBoundary(line) {
    const trimmed = line.trim();
    if (!trimmed) return false;
    for (const pat of DATE_PATTERNS) {
      if (pat.test(trimmed)) {
        // Only count as boundary if the date pattern is near the start of the line
        const match = trimmed.match(pat);
        if (match && match.index !== undefined && match.index < 40) return true;
      }
    }
    return false;
  }

  // Split text into day-boundary chunks
  function chunkByDays(text) {
    const lines = text.split('\n');
    const chunks = [];
    let current = [];

    for (let i = 0; i < lines.length; i++) {
      if (isDateBoundary(lines[i]) && current.length > 0) {
        chunks.push(current.join('\n'));
        current = [];
      }
      current.push(lines[i]);
    }
    if (current.length > 0) {
      chunks.push(current.join('\n'));
    }

    return chunks;
  }

  // Merge small chunks and split oversized ones
  function normalizeChunks(rawChunks, maxTokens) {
    maxTokens = maxTokens || 8000;
    const result = [];
    let buffer = '';

    for (const chunk of rawChunks) {
      const combined = buffer ? buffer + '\n\n' + chunk : chunk;

      if (estimateTokens(combined) > maxTokens) {
        // Flush buffer first
        if (buffer) {
          result.push(buffer);
          buffer = '';
        }
        // If single chunk is too big, split at paragraph breaks
        if (estimateTokens(chunk) > maxTokens) {
          const subChunks = splitAtParagraphs(chunk, maxTokens);
          result.push(...subChunks);
        } else {
          buffer = chunk;
        }
      } else {
        buffer = combined;
      }
    }

    if (buffer) result.push(buffer);
    return result;
  }

  // Split a large chunk at paragraph breaks
  function splitAtParagraphs(text, maxTokens) {
    const paragraphs = text.split(/\n\s*\n/);
    const result = [];
    let current = '';

    for (const para of paragraphs) {
      const combined = current ? current + '\n\n' + para : para;
      if (estimateTokens(combined) > maxTokens && current) {
        result.push(current);
        current = para;
      } else {
        current = combined;
      }
    }
    if (current) result.push(current);
    return result;
  }

  // Get last 2 sentences for context overlap
  function getOverlapContext(text) {
    const sentences = text.match(/[^.!?\n]+[.!?\n]+/g) || [];
    return sentences.slice(-2).join('').trim();
  }

  // Main entry: text -> array of chunks with overlap context
  function prepareChunks(text, maxTokens) {
    const raw = chunkByDays(text);
    const normalized = normalizeChunks(raw, maxTokens);

    return normalized.map((chunk, i) => {
      const overlap = i > 0 ? getOverlapContext(normalized[i - 1]) : '';
      const fullChunk = overlap ? '[Context from previous section:]\n' + overlap + '\n\n[Current section:]\n' + chunk : chunk;
      return { index: i, text: fullChunk, raw: chunk };
    });
  }

  const PARSE_PROMPT = 'You are a health log parser. Extract daily entries from this log text. Return ONLY a valid JSON array, no markdown, no code fences. Each element: {"date": "YYYY-MM-DD", "food": "string or null", "exercise": "string or null", "weight": "number in lbs or null", "sleep_hours": "number or null", "sleep_quality": "poor|fair|good|great or null", "hrv": "number or null", "rhr": "number or null", "mood": "string or null", "energy": "low|medium|high or null", "notes": "string or null"}. One object per day. If a date is ambiguous, infer from context. If year is missing, assume 2025. Return empty array [] if no clear daily entries found.';

  exports.Chunker = { prepareChunks, estimateTokens, PARSE_PROMPT };

})(typeof module !== 'undefined' ? module.exports : window);
