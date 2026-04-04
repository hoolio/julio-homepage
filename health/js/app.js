// Health Log App
(function () {
  'use strict';

  // --- Storage ---
  const STORAGE_KEY = 'health_entries';
  const SETTINGS_KEY = 'health_settings';

  function getSettings() {
    try { return JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {}; } catch { return {}; }
  }

  function saveSettings(s) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
  }

  function getEntries() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; }
  }

  function saveEntries(entries) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }

  function upsertEntry(entry) {
    const entries = getEntries();
    const idx = entries.findIndex(e => e.date === entry.date);
    if (idx >= 0) entries[idx] = { ...entries[idx], ...entry };
    else entries.push(entry);
    entries.sort((a, b) => b.date.localeCompare(a.date));
    saveEntries(entries);
    return entries;
  }

  function deleteEntry(date) {
    const entries = getEntries().filter(e => e.date !== date);
    saveEntries(entries);
    return entries;
  }

  // --- Seed data ---
  function seedIfEmpty() {
    if (getEntries().length === 0 && typeof SEED_DATA !== 'undefined') {
      const sorted = [...SEED_DATA].sort((a, b) => b.date.localeCompare(a.date));
      saveEntries(sorted);
    }
  }

  // --- Navigation ---
  const views = ['dashboard', 'log', 'import', 'settings'];
  let currentView = 'dashboard';

  function switchView(view) {
    currentView = view;
    views.forEach(v => {
      document.getElementById(`view-${v}`).classList.toggle('active', v === view);
    });
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === view);
    });
    if (view === 'dashboard') renderDashboard();
  }

  // --- Dashboard ---
  function renderDashboard() {
    const entries = getEntries();
    renderStats(entries);
    renderEntryList(entries);
  }

  function renderStats(entries) {
    const el = document.getElementById('stats-grid');
    const total = entries.length;
    const sleepEntries = entries.filter(e => e.sleep_hours);
    const avgSleep = sleepEntries.length ? (sleepEntries.reduce((s, e) => s + e.sleep_hours, 0) / sleepEntries.length).toFixed(1) : '—';
    const hrvEntries = entries.filter(e => e.hrv);
    const avgHrv = hrvEntries.length ? Math.round(hrvEntries.reduce((s, e) => s + e.hrv, 0) / hrvEntries.length) : '—';
    const exerciseDays = entries.filter(e => e.exercise).length;
    const highHrv = hrvEntries.filter(e => e.hrv >= 150).length;
    const dates = entries.map(e => e.date).sort();
    const range = dates.length >= 2 ? `${fmtShort(dates[0])} – ${fmtShort(dates[dates.length - 1])}` : (dates[0] ? fmtShort(dates[0]) : '—');

    el.innerHTML = `
      <div class="stat-card"><div class="stat-value">${total}</div><div class="stat-label">Entries</div></div>
      <div class="stat-card"><div class="stat-value">${avgSleep}</div><div class="stat-label">Avg Sleep</div></div>
      <div class="stat-card accent"><div class="stat-value">${avgHrv}</div><div class="stat-label">Avg HRV</div></div>
      <div class="stat-card"><div class="stat-value">${exerciseDays}</div><div class="stat-label">Exercise</div></div>
      <div class="stat-card"><div class="stat-value">${highHrv}</div><div class="stat-label">HRV 150+</div></div>
      <div class="stat-card"><div class="stat-value" style="font-size:11px">${range}</div><div class="stat-label">Range</div></div>
    `;
  }

  function renderEntryList(entries) {
    const el = document.getElementById('entry-list');
    if (!entries.length) {
      el.innerHTML = '<div class="empty-state"><p>No entries yet. Start logging.</p></div>';
      return;
    }
    el.innerHTML = entries.map(e => {
      const badges = [];
      if (e.hrv >= 150) badges.push('<span class="badge badge-hrv">HRV ' + e.hrv + '</span>');
      if (e.exercise) badges.push('<span class="badge badge-exercise">Exercise</span>');
      if (e.sleep_quality === 'great') badges.push('<span class="badge badge-sleep">Great sleep</span>');

      const preview = e.food || e.exercise || e.notes || '';
      const metrics = [];
      if (e.sleep_hours) metrics.push(`<span class="entry-metric"><strong>${e.sleep_hours}h</strong> sleep</span>`);
      if (e.hrv) metrics.push(`<span class="entry-metric"><strong>${e.hrv}</strong> HRV</span>`);
      if (e.rhr) metrics.push(`<span class="entry-metric"><strong>${e.rhr}</strong> RHR</span>`);
      if (e.energy) metrics.push(`<span class="entry-metric">${e.energy} energy</span>`);

      return `
        <div class="entry-card" data-date="${e.date}">
          <div class="entry-header">
            <span class="entry-date">${fmtDate(e.date)}</span>
            <div class="entry-badges">${badges.join('')}</div>
          </div>
          ${preview ? `<div class="entry-preview">${esc(preview)}</div>` : ''}
          ${metrics.length ? `<div class="entry-metrics">${metrics.join('')}</div>` : ''}
        </div>
      `;
    }).join('');

    el.querySelectorAll('.entry-card').forEach(card => {
      card.addEventListener('click', () => showDetail(card.dataset.date));
    });
  }

  // --- Entry detail modal ---
  function showDetail(date) {
    const entry = getEntries().find(e => e.date === date);
    if (!entry) return;

    const overlay = document.getElementById('modal-overlay');
    const modal = document.getElementById('modal-content');

    const field = (label, value) => `
      <div class="detail-section">
        <div class="detail-label">${label}</div>
        <div class="detail-value${value ? '' : ' empty'}">${value ? esc(value) : '—'}</div>
      </div>`;

    const metricCard = (label, value) => `
      <div class="detail-metric">
        <div class="detail-label">${label}</div>
        <div class="detail-value${value != null ? '' : ' empty'}">${value != null ? value : '—'}</div>
      </div>`;

    modal.innerHTML = `
      <div class="modal-handle"></div>
      <div class="modal-header">
        <div class="modal-title">${fmtDate(date)}</div>
        <div class="modal-actions">
          <button class="modal-btn" id="btn-edit-entry">Edit</button>
          <button class="modal-btn danger" id="btn-delete-entry">Delete</button>
        </div>
      </div>
      <div class="detail-metrics-grid">
        ${metricCard('Sleep', entry.sleep_hours ? entry.sleep_hours + 'h ' + (entry.sleep_quality || '') : null)}
        ${metricCard('HRV', entry.hrv)}
        ${metricCard('RHR', entry.rhr)}
        ${metricCard('Weight', entry.weight ? entry.weight + ' lbs' : null)}
        ${metricCard('Energy', entry.energy)}
        ${metricCard('Mood', entry.mood)}
      </div>
      ${field('Food', entry.food)}
      ${field('Exercise', entry.exercise)}
      ${field('Notes', entry.notes)}
    `;

    overlay.classList.add('active');

    document.getElementById('btn-delete-entry').onclick = () => {
      if (confirm('Delete entry for ' + fmtDate(date) + '?')) {
        deleteEntry(date);
        overlay.classList.remove('active');
        renderDashboard();
        toast('Entry deleted');
      }
    };

    document.getElementById('btn-edit-entry').onclick = () => {
      overlay.classList.remove('active');
      populateLogForm(entry);
      switchView('log');
    };

    overlay.onclick = (ev) => {
      if (ev.target === overlay) overlay.classList.remove('active');
    };
  }

  // --- Log form ---
  function populateLogForm(entry) {
    document.getElementById('log-date').value = entry.date || today();
    document.getElementById('log-food').value = entry.food || '';
    document.getElementById('log-exercise').value = entry.exercise || '';
    document.getElementById('log-weight').value = entry.weight || '';
    document.getElementById('log-sleep-hours').value = entry.sleep_hours || '';
    document.getElementById('log-sleep-quality').value = entry.sleep_quality || '';
    document.getElementById('log-hrv').value = entry.hrv || '';
    document.getElementById('log-rhr').value = entry.rhr || '';
    document.getElementById('log-mood').value = entry.mood || '';
    document.getElementById('log-energy').value = entry.energy || '';
    document.getElementById('log-notes').value = entry.notes || '';
  }

  function clearLogForm() {
    document.getElementById('log-form').reset();
    document.getElementById('log-date').value = today();
  }

  function handleLogSubmit(ev) {
    ev.preventDefault();
    const entry = {
      date: document.getElementById('log-date').value,
      food: document.getElementById('log-food').value || null,
      exercise: document.getElementById('log-exercise').value || null,
      weight: parseNum(document.getElementById('log-weight').value),
      sleep_hours: parseNum(document.getElementById('log-sleep-hours').value),
      sleep_quality: document.getElementById('log-sleep-quality').value || null,
      hrv: parseNum(document.getElementById('log-hrv').value),
      rhr: parseNum(document.getElementById('log-rhr').value),
      mood: document.getElementById('log-mood').value || null,
      energy: document.getElementById('log-energy').value || null,
      notes: document.getElementById('log-notes').value || null,
    };
    upsertEntry(entry);
    clearLogForm();
    switchView('dashboard');
    toast('Entry saved');
  }

  // --- Import: Text ---
  async function handleTextImport() {
    const text = document.getElementById('import-text').value.trim();
    if (!text) return;
    const settings = getSettings();
    if (!settings.anthropicKey) { toast('Set Anthropic API key in Settings first'); return; }

    const btn = document.getElementById('btn-parse-text');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> Parsing...';

    try {
      const result = await callAnthropic(settings.anthropicKey, [{
        role: 'user',
        content: `Parse the following health log text into structured JSON entries. Each entry should have these fields: date (YYYY-MM-DD), food (string or null), exercise (string or null), weight (number in lbs or null), sleep_hours (number or null), sleep_quality (poor|fair|good|great or null), hrv (number or null), rhr (number or null), mood (string or null), energy (low|medium|high or null), notes (string or null).

Return ONLY a JSON array, no other text.

Text to parse:
${text}`
      }]);

      const parsed = JSON.parse(result);
      showImportPreview(parsed);
    } catch (err) {
      toast('Parse error: ' + err.message);
    } finally {
      btn.disabled = false;
      btn.textContent = 'Parse with AI';
    }
  }

  // --- Import: Tonal photos ---
  let uploadedPhotos = [];

  function handlePhotoSelect(files) {
    for (const file of files) {
      if (!file.type.startsWith('image/')) continue;
      const reader = new FileReader();
      reader.onload = (ev) => {
        uploadedPhotos.push({ name: file.name, dataUrl: ev.target.result });
        renderPhotoPreview();
      };
      reader.readAsDataURL(file);
    }
  }

  function renderPhotoPreview() {
    const grid = document.getElementById('photo-preview-grid');
    grid.innerHTML = uploadedPhotos.map((p, i) => `
      <div class="photo-preview-item">
        <img src="${p.dataUrl}" alt="${p.name}">
        <button class="remove-photo" data-idx="${i}">&times;</button>
      </div>
    `).join('');
    grid.querySelectorAll('.remove-photo').forEach(btn => {
      btn.onclick = () => {
        uploadedPhotos.splice(parseInt(btn.dataset.idx), 1);
        renderPhotoPreview();
      };
    });
    document.getElementById('btn-parse-photos').style.display = uploadedPhotos.length ? '' : 'none';
  }

  async function handlePhotoImport() {
    if (!uploadedPhotos.length) return;
    const settings = getSettings();
    if (!settings.anthropicKey) { toast('Set Anthropic API key in Settings first'); return; }

    const btn = document.getElementById('btn-parse-photos');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> Analyzing photos...';
    const dateVal = document.getElementById('tonal-date').value || today();

    try {
      const content = [
        { type: 'text', text: `These are photos of a Tonal workout results screen. Extract all workout data and format it as a single string for the "exercise" field. Include: total duration, total volume (lbs), calories, time under tension (TUT), and energy (kJ) if visible. Then list each block and exercise with volume, sets/reps, weights, and any PRs noted.

Format example: "Tonal: 35:52, 10,409 lbs, 115 kcal, 29.3 kJ, TUT 9:05. Block 1: Half Kneeling Single Arm Pull (1,230 lbs — 25×16, 42×16), Standing Face Pull (POWER PR, 789 lbs — 39×8, 60×8). Block 2: ..."

Return ONLY a JSON object with these fields:
{
  "date": "${dateVal}",
  "exercise": "the formatted string",
  "notes": "any PRs or notable observations"
}

No other text.` }
      ];

      for (const photo of uploadedPhotos) {
        const base64 = photo.dataUrl.split(',')[1];
        const mediaType = photo.dataUrl.match(/data:(.*?);/)[1];
        content.push({
          type: 'image',
          source: { type: 'base64', media_type: mediaType, data: base64 }
        });
      }

      const result = await callAnthropic(settings.anthropicKey, [{ role: 'user', content }]);
      const parsed = JSON.parse(result);
      showImportPreview(Array.isArray(parsed) ? parsed : [parsed]);
    } catch (err) {
      toast('Photo parse error: ' + err.message);
    } finally {
      btn.disabled = false;
      btn.textContent = 'Analyze Photos';
    }
  }

  function showImportPreview(entries) {
    const el = document.getElementById('import-preview');
    window._pendingImport = entries;
    el.innerHTML = `
      <div class="ai-preview">
        <div class="label">AI parsed ${entries.length} entry${entries.length > 1 ? 'ies' : 'y'}</div>
        <pre>${esc(JSON.stringify(entries, null, 2))}</pre>
      </div>
      <button class="btn btn-primary" id="btn-confirm-import" style="margin-top:12px">Confirm &amp; Save</button>
      <button class="btn btn-ghost" id="btn-cancel-import" style="margin-top:8px">Cancel</button>
    `;

    document.getElementById('btn-confirm-import').onclick = () => {
      entries.forEach(e => upsertEntry(e));
      el.innerHTML = '';
      document.getElementById('import-text').value = '';
      uploadedPhotos = [];
      renderPhotoPreview();
      toast(`Saved ${entries.length} entry${entries.length > 1 ? 'ies' : 'y'}`);
      switchView('dashboard');
    };

    document.getElementById('btn-cancel-import').onclick = () => {
      el.innerHTML = '';
      window._pendingImport = null;
    };
  }

  // --- Anthropic API ---
  async function callAnthropic(apiKey, messages) {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250514',
        max_tokens: 4096,
        messages,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `API error ${res.status}`);
    }

    const data = await res.json();
    return data.content[0].text;
  }

  // --- CSV Export ---
  function exportCSV() {
    const entries = getEntries();
    if (!entries.length) { toast('No data to export'); return; }

    const fields = ['date', 'food', 'exercise', 'weight', 'sleep_hours', 'sleep_quality', 'hrv', 'rhr', 'mood', 'energy', 'notes'];
    const csvRows = [fields.join(',')];
    entries.forEach(e => {
      csvRows.push(fields.map(f => {
        const val = e[f];
        if (val == null) return '';
        const str = String(val);
        return str.includes(',') || str.includes('"') || str.includes('\n')
          ? '"' + str.replace(/"/g, '""') + '"' : str;
      }).join(','));
    });

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `health-log-${today()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast('CSV downloaded');
  }

  // --- Settings ---
  function renderSettings() {
    const settings = getSettings();
    document.getElementById('settings-api-key').value = settings.anthropicKey || '';
  }

  function saveSettingsForm() {
    const settings = getSettings();
    settings.anthropicKey = document.getElementById('settings-api-key').value.trim();
    saveSettings(settings);
    toast('Settings saved');
  }

  // --- Helpers ---
  function today() {
    return new Date().toISOString().slice(0, 10);
  }

  function fmtDate(d) {
    const [y, m, day] = d.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(m) - 1]} ${parseInt(day)}, ${y}`;
  }

  function fmtShort(d) {
    const [y, m, day] = d.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(m) - 1]} ${parseInt(day)}`;
  }

  function parseNum(val) {
    const n = parseFloat(val);
    return isNaN(n) ? null : n;
  }

  function esc(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  function toast(msg) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(() => el.classList.remove('show'), 2500);
  }

  // --- Init ---
  function init() {
    seedIfEmpty();

    // Nav
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.addEventListener('click', () => switchView(btn.dataset.view));
    });

    // Log form
    document.getElementById('log-date').value = today();
    document.getElementById('log-form').addEventListener('submit', handleLogSubmit);
    document.getElementById('btn-clear-log').addEventListener('click', clearLogForm);

    // Import tabs
    document.querySelectorAll('.import-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.import-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.import-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(`panel-${tab.dataset.panel}`).classList.add('active');
      });
    });

    // Text import
    document.getElementById('btn-parse-text').addEventListener('click', handleTextImport);

    // Photo import
    const uploadZone = document.getElementById('upload-zone');
    const fileInput = document.getElementById('photo-input');
    document.getElementById('tonal-date').value = today();

    uploadZone.addEventListener('click', () => fileInput.click());
    uploadZone.addEventListener('dragover', (ev) => { ev.preventDefault(); uploadZone.classList.add('dragover'); });
    uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('dragover'));
    uploadZone.addEventListener('drop', (ev) => {
      ev.preventDefault();
      uploadZone.classList.remove('dragover');
      handlePhotoSelect(ev.dataTransfer.files);
    });
    fileInput.addEventListener('change', () => {
      handlePhotoSelect(fileInput.files);
      fileInput.value = '';
    });
    document.getElementById('btn-parse-photos').addEventListener('click', handlePhotoImport);

    // CSV export
    document.getElementById('btn-export-csv').addEventListener('click', exportCSV);

    // Settings
    renderSettings();
    document.getElementById('btn-save-settings').addEventListener('click', saveSettingsForm);

    // Data management
    document.getElementById('btn-reset-data').addEventListener('click', () => {
      if (confirm('Delete all entries and reload seed data?')) {
        localStorage.removeItem(STORAGE_KEY);
        seedIfEmpty();
        renderDashboard();
        toast('Data reset to seed');
      }
    });

    document.getElementById('btn-clear-all').addEventListener('click', () => {
      if (confirm('Delete ALL entries? This cannot be undone.')) {
        saveEntries([]);
        renderDashboard();
        toast('All data cleared');
      }
    });

    // Initial render
    renderDashboard();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
