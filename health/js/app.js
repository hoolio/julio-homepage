// Health Log App v2
(function () {
  'use strict';

  const STORAGE_KEY = 'health_entries';
  const SETTINGS_KEY = 'health_settings';
  let chartDays = 14;

  // --- Encrypted storage ---
  async function getSettings() {
    try { return await Vault.getEncrypted(SETTINGS_KEY, {}); } catch { return {}; }
  }
  async function saveSettings(s) { await Vault.setEncrypted(SETTINGS_KEY, s); }
  async function getEntries() {
    try { return await Vault.getEncrypted(STORAGE_KEY, []); } catch { return []; }
  }
  async function saveEntries(entries) { await Vault.setEncrypted(STORAGE_KEY, entries); }

  async function upsertEntry(entry) {
    const entries = await getEntries();
    const idx = entries.findIndex(e => e.date === entry.date);
    if (idx >= 0) entries[idx] = { ...entries[idx], ...entry };
    else entries.push(entry);
    entries.sort((a, b) => b.date.localeCompare(a.date));
    await saveEntries(entries);
    return entries;
  }

  async function deleteEntry(date) {
    const entries = (await getEntries()).filter(e => e.date !== date);
    await saveEntries(entries);
    return entries;
  }

  async function seedIfEmpty() {
    if ((await getEntries()).length === 0 && typeof SEED_DATA !== 'undefined') {
      const sorted = [...SEED_DATA].sort((a, b) => b.date.localeCompare(a.date));
      await saveEntries(sorted);
    }
  }

  // --- Lock screen ---
  function showLockScreen() {
    const isNew = !Vault.isSetUp();
    document.getElementById('lock-screen').style.display = 'flex';
    document.getElementById('app-shell').style.display = 'none';
    document.getElementById('lock-title').textContent = isNew ? 'Create Password' : 'Health Log';
    document.getElementById('lock-subtitle').textContent = isNew
      ? 'Set a password to encrypt your health data.' : 'Enter your password to unlock.';
    document.getElementById('lock-confirm-group').style.display = isNew ? 'block' : 'none';
    document.getElementById('lock-btn').textContent = isNew ? 'Set Password & Enter' : 'Unlock';
    document.getElementById('lock-error').textContent = '';
    document.getElementById('lock-password').value = '';
    document.getElementById('lock-confirm').value = '';
    setTimeout(() => document.getElementById('lock-password').focus(), 100);
  }

  async function handleUnlock(ev) {
    ev.preventDefault();
    const pw = document.getElementById('lock-password').value;
    const errorEl = document.getElementById('lock-error');
    const btn = document.getElementById('lock-btn');
    if (!pw) { errorEl.textContent = 'Enter a password.'; return; }
    btn.disabled = true;
    btn.textContent = 'Unlocking...';
    try {
      if (!Vault.isSetUp()) {
        const confirm = document.getElementById('lock-confirm').value;
        if (pw !== confirm) { errorEl.textContent = 'Passwords do not match.'; btn.disabled = false; btn.textContent = 'Set Password & Enter'; return; }
        if (pw.length < 4) { errorEl.textContent = 'Password too short.'; btn.disabled = false; btn.textContent = 'Set Password & Enter'; return; }
        await Vault.setup(pw);
        await seedIfEmpty();
      } else {
        await Vault.unlock(pw);
      }
      document.getElementById('lock-screen').style.display = 'none';
      document.getElementById('app-shell').style.display = 'block';
      await initApp();
    } catch (err) {
      errorEl.textContent = err.message || 'Failed to unlock.';
      btn.disabled = false;
      btn.textContent = 'Unlock';
    }
  }

  // --- Navigation ---
  const views = ['dashboard', 'log', 'photos', 'import', 'settings'];

  function switchView(view) {
    views.forEach(v => document.getElementById(`view-${v}`).classList.toggle('active', v === view));
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.toggle('active', btn.dataset.view === view));
    if (view === 'dashboard') renderDashboard();
  }

  // --- Dashboard ---
  async function renderDashboard() {
    const entries = await getEntries();
    renderPhaseCard(entries);
    renderCharts(entries);
    renderLogStrip(entries);
  }

  function renderPhaseCard(entries) {
    const el = document.getElementById('phase-card');
    if (!entries.length) {
      el.innerHTML = '<div class="card-title">Right Now</div><p style="color:var(--text-tertiary);font-size:14px">No data yet. Start logging.</p>';
      return;
    }

    const phase = Intel.inferPhase(entries);
    const nudges = Intel.getNudges(entries);
    const avgProtein = Intel.nutritionAvg(entries, 'protein', 7);
    const avgCals = Intel.nutritionAvg(entries, 'calories', 7);
    const avgHrv = Intel.rollingAvg(entries, 'hrv', 7);

    const nudgeHtml = nudges.map(n =>
      `<div class="nudge nudge-${n.type}"><div class="nudge-icon">${n.type === 'warning' ? '!' : '\u2713'}</div><div>${esc(n.text)}</div></div>`
    ).join('');

    el.innerHTML = `
      <div class="card-title">Right Now</div>
      <div class="phase-header">
        <div class="phase-icon" style="background:${phase.color}15;color:${phase.color}">${phase.icon}</div>
        <div>
          <div class="phase-label" style="color:${phase.color}">${phase.phase}</div>
          <div class="phase-sublabel">Based on ${entries.length > 14 ? '14' : entries.length}-day trend</div>
        </div>
      </div>
      ${nudgeHtml}
      <div class="macro-strip">
        <div class="macro-pill">
          <div class="macro-value">${avgCals != null ? avgCals : '\u2014'}</div>
          <div class="macro-label">kcal/d (7d)</div>
        </div>
        <div class="macro-pill">
          <div class="macro-value">${avgProtein != null ? avgProtein + 'g' : '\u2014'}</div>
          <div class="macro-label">protein (7d)</div>
        </div>
        <div class="macro-pill">
          <div class="macro-value">${avgHrv != null ? Math.round(avgHrv) : '\u2014'}</div>
          <div class="macro-label">HRV (7d)</div>
        </div>
      </div>
    `;
  }

  function renderCharts(entries) {
    const container = document.getElementById('charts-container');
    const range = Intel.getRange(entries, chartDays);

    const hrvData = range.filter(e => e.hrv != null).map(e => ({ date: e.date, value: e.hrv }));
    const sleepData = range.filter(e => e.sleep_hours != null).map(e => ({ date: e.date, value: e.sleep_hours }));
    const rhrData = range.filter(e => e.rhr != null).map(e => ({ date: e.date, value: e.rhr }));
    const weightData = range.filter(e => e.weight != null).map(e => ({ date: e.date, value: e.weight }));

    container.innerHTML = `
      <div class="chart-section">
        <div class="chart-label"><span class="chart-label-dot" style="background:var(--gold)"></span>HRV</div>
        <div class="chart-container" id="chart-hrv"></div>
      </div>
      <div class="chart-section">
        <div class="chart-label"><span class="chart-label-dot" style="background:var(--amber)"></span>Sleep</div>
        <div class="chart-container" id="chart-sleep"></div>
      </div>
      <div class="chart-section">
        <div class="chart-label"><span class="chart-label-dot" style="background:var(--red)"></span>RHR</div>
        <div class="chart-container" id="chart-rhr"></div>
      </div>
      ${weightData.length ? `<div class="chart-section">
        <div class="chart-label"><span class="chart-label-dot" style="background:var(--text-secondary)"></span>Weight</div>
        <div class="chart-container" id="chart-weight"></div>
      </div>` : ''}
    `;

    // Render after DOM is ready
    requestAnimationFrame(() => {
      Charts.line(document.getElementById('chart-hrv'), hrvData, { color: '#c9a84c', highlightAbove: 150, highlightColor: '#d4b85c' });
      Charts.bar(document.getElementById('chart-sleep'), sleepData, { color: '#a08338', warnBelow: 6, warnColor: '#a04535' });
      Charts.line(document.getElementById('chart-rhr'), rhrData, { color: '#8b3a2a' });
      if (weightData.length) {
        Charts.line(document.getElementById('chart-weight'), weightData, { color: '#9a8060' });
      }
    });
  }

  function renderLogStrip(entries) {
    const el = document.getElementById('log-strip');
    const recent = entries.slice(0, 20);
    if (!recent.length) { el.innerHTML = '<li style="padding:20px 0;text-align:center;color:var(--text-tertiary);font-size:13px">No entries</li>'; return; }

    el.innerHTML = recent.map(e => {
      const exerciseSummary = e.exercise ? e.exercise.split(';')[0].trim().substring(0, 50) : '';
      return `<li class="log-strip-item" data-date="${e.date}">
        <span class="log-date">${fmtCompact(e.date)}</span>
        <div class="log-metrics">
          ${e.hrv != null ? `<span class="log-metric log-metric-hrv">${e.hrv}</span>` : ''}
          ${e.sleep_hours != null ? `<span class="log-metric log-metric-sleep">${e.sleep_hours}h</span>` : ''}
          ${e.rhr != null ? `<span class="log-metric log-metric-rhr">${e.rhr}</span>` : ''}
        </div>
        <span class="log-exercise">${esc(exerciseSummary)}</span>
      </li>`;
    }).join('');

    el.querySelectorAll('.log-strip-item').forEach(item => {
      item.addEventListener('click', () => showDetail(item.dataset.date));
    });
  }

  // --- Entry detail ---
  async function showDetail(date) {
    const entry = (await getEntries()).find(e => e.date === date);
    if (!entry) return;
    const overlay = document.getElementById('modal-overlay');
    const modal = document.getElementById('modal-content');
    const nutrition = Intel.parseNutrition(entry);

    const field = (label, value) => value ? `<div class="detail-section"><div class="detail-label">${label}</div><div class="detail-value">${esc(value)}</div></div>` : '';
    const metric = (label, value) => `<div class="detail-metric"><div class="detail-label">${label}</div><div class="detail-value${value != null ? '' : ' empty'}">${value != null ? value : '\u2014'}</div></div>`;

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
        ${metric('HRV', entry.hrv)}
        ${metric('RHR', entry.rhr)}
        ${metric('Sleep', entry.sleep_hours ? entry.sleep_hours + 'h' : null)}
        ${metric('Quality', entry.sleep_quality)}
        ${metric('Energy', entry.energy)}
        ${metric('Weight', entry.weight ? entry.weight + ' lbs' : null)}
      </div>
      ${nutrition.calories ? `<div class="macro-strip" style="margin-bottom:14px">
        <div class="macro-pill"><div class="macro-value">${nutrition.calories}</div><div class="macro-label">kcal</div></div>
        ${nutrition.protein ? `<div class="macro-pill"><div class="macro-value">${nutrition.protein}g</div><div class="macro-label">protein</div></div>` : ''}
        ${nutrition.carbs ? `<div class="macro-pill"><div class="macro-value">${nutrition.carbs}g</div><div class="macro-label">carbs</div></div>` : ''}
        ${nutrition.fat ? `<div class="macro-pill"><div class="macro-value">${nutrition.fat}g</div><div class="macro-label">fat</div></div>` : ''}
      </div>` : ''}
      ${field('Food', entry.food)}
      ${field('Exercise', entry.exercise)}
      ${field('Mood', entry.mood)}
      ${field('Notes', entry.notes)}
    `;

    overlay.classList.add('active');

    document.getElementById('btn-delete-entry').onclick = async () => {
      if (confirm('Delete entry for ' + fmtDate(date) + '?')) {
        await deleteEntry(date);
        overlay.classList.remove('active');
        await renderDashboard();
        toast('Entry deleted');
      }
    };
    document.getElementById('btn-edit-entry').onclick = () => {
      overlay.classList.remove('active');
      populateLogForm(entry);
      switchView('log');
    };
    overlay.onclick = (ev) => { if (ev.target === overlay) overlay.classList.remove('active'); };
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

  async function handleLogSubmit(ev) {
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
    await upsertEntry(entry);
    clearLogForm();
    switchView('dashboard');
    toast('Entry saved');
  }

  // --- Import: Text ---
  async function handleTextImport() {
    const text = document.getElementById('import-text').value.trim();
    if (!text) return;
    const settings = await getSettings();
    if (!settings.anthropicKey) { toast('Set Anthropic API key in Settings first'); return; }
    const btn = document.getElementById('btn-parse-text');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> Parsing...';
    try {
      const result = await callAnthropic(settings.anthropicKey, [{ role: 'user', content: `Parse the following health log text into structured JSON entries. Each entry should have these fields: date (YYYY-MM-DD), food (string or null), exercise (string or null), weight (number in lbs or null), sleep_hours (number or null), sleep_quality (poor|fair|good|great or null), hrv (number or null), rhr (number or null), mood (string or null), energy (low|medium|high or null), notes (string or null).\n\nReturn ONLY a JSON array, no other text.\n\nText to parse:\n${text}` }]);
      showImportPreview(JSON.parse(result));
    } catch (err) { toast('Parse error: ' + err.message); }
    finally { btn.disabled = false; btn.textContent = 'Parse with AI'; }
  }

  // --- Import: Tonal photos ---
  let uploadedPhotos = [];

  function handlePhotoSelect(files) {
    for (const file of files) {
      if (!file.type.startsWith('image/')) continue;
      const reader = new FileReader();
      reader.onload = (ev) => { uploadedPhotos.push({ name: file.name, dataUrl: ev.target.result }); renderPhotoPreview(); };
      reader.readAsDataURL(file);
    }
  }

  function renderPhotoPreview() {
    const grid = document.getElementById('photo-preview-grid');
    grid.innerHTML = uploadedPhotos.map((p, i) => `<div class="photo-preview-item"><img src="${p.dataUrl}" alt="${p.name}"><button class="remove-photo" data-idx="${i}">\u00d7</button></div>`).join('');
    grid.querySelectorAll('.remove-photo').forEach(btn => { btn.onclick = () => { uploadedPhotos.splice(parseInt(btn.dataset.idx), 1); renderPhotoPreview(); }; });
    document.getElementById('btn-parse-photos').style.display = uploadedPhotos.length ? '' : 'none';
  }

  async function handlePhotoImport() {
    if (!uploadedPhotos.length) return;
    const settings = await getSettings();
    if (!settings.anthropicKey) { toast('Set Anthropic API key in Settings first'); return; }
    const btn = document.getElementById('btn-parse-photos');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> Analyzing...';
    const dateVal = document.getElementById('tonal-date').value || today();
    try {
      const content = [{ type: 'text', text: `These are photos of a Tonal workout results screen. Extract all workout data and format as a single string for the "exercise" field. Include: total duration, total volume (lbs), calories, TUT, energy (kJ). Then list each block and exercise with volume, sets/reps, weights, and PRs.\n\nFormat: "Tonal: 35:52, 10,409 lbs, 115 kcal, 29.3 kJ, TUT 9:05. Block 1: ..."\n\nReturn ONLY JSON:\n{"date":"${dateVal}","exercise":"...","notes":"PRs or observations"}\n\nNo other text.` }];
      for (const photo of uploadedPhotos) {
        content.push({ type: 'image', source: { type: 'base64', media_type: photo.dataUrl.match(/data:(.*?);/)[1], data: photo.dataUrl.split(',')[1] } });
      }
      const result = await callAnthropic(settings.anthropicKey, [{ role: 'user', content }]);
      const parsed = JSON.parse(result);
      showImportPreview(Array.isArray(parsed) ? parsed : [parsed]);
    } catch (err) { toast('Photo parse error: ' + err.message); }
    finally { btn.disabled = false; btn.textContent = 'Analyze Photos'; }
  }

  function showImportPreview(entries) {
    const el = document.getElementById('import-preview');
    el.innerHTML = `
      <div class="card" style="margin-top:12px">
        <div class="ai-preview">
          <div class="label">Parsed ${entries.length} entr${entries.length > 1 ? 'ies' : 'y'}</div>
          <pre>${esc(JSON.stringify(entries, null, 2))}</pre>
        </div>
        <button class="btn btn-primary" id="btn-confirm-import" style="margin-top:10px">Confirm & Save</button>
        <button class="btn btn-ghost" id="btn-cancel-import" style="margin-top:6px">Cancel</button>
      </div>`;
    document.getElementById('btn-confirm-import').onclick = async () => {
      for (const e of entries) await upsertEntry(e);
      el.innerHTML = '';
      document.getElementById('import-text') && (document.getElementById('import-text').value = '');
      uploadedPhotos = [];
      renderPhotoPreview();
      toast(`Saved ${entries.length} entr${entries.length > 1 ? 'ies' : 'y'}`);
      switchView('dashboard');
    };
    document.getElementById('btn-cancel-import').onclick = () => { el.innerHTML = ''; };
  }

  // --- Anthropic API ---
  async function callAnthropic(apiKey, messages) {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
      body: JSON.stringify({ model: 'claude-sonnet-4-5-20250514', max_tokens: 4096, messages }),
    });
    if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.error?.message || `API error ${res.status}`); }
    return (await res.json()).content[0].text;
  }

  // --- CSV Export ---
  async function exportCSV() {
    const entries = await getEntries();
    if (!entries.length) { toast('No data to export'); return; }
    const fields = ['date', 'food', 'exercise', 'weight', 'sleep_hours', 'sleep_quality', 'hrv', 'rhr', 'mood', 'energy', 'notes'];
    const rows = [fields.join(',')];
    entries.forEach(e => rows.push(fields.map(f => {
      const v = e[f]; if (v == null) return '';
      const s = String(v); return s.includes(',') || s.includes('"') || s.includes('\n') ? '"' + s.replace(/"/g, '""') + '"' : s;
    }).join(',')));
    const blob = new Blob([rows.join('\n')], { type: 'text/csv' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `health-log-${today()}.csv`; a.click();
    toast('CSV downloaded');
  }

  // --- Settings ---
  async function renderSettings() {
    const s = await getSettings();
    document.getElementById('settings-api-key').value = s.anthropicKey || '';
  }

  async function saveSettingsForm() {
    const s = await getSettings();
    s.anthropicKey = document.getElementById('settings-api-key').value.trim();
    await saveSettings(s);
    toast('Settings saved');
  }

  // --- Photo gallery ---
  async function renderPhotoGallery() {
    const gallery = document.getElementById('photo-gallery');
    const photos = await Photos.getAll();

    if (!photos.length) {
      gallery.innerHTML = '<div class="photo-empty"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg><p>No check-in photos yet</p></div>';
      return;
    }

    const compareMode = window._compareMode();
    const compareSelection = window._compareSelection();

    gallery.innerHTML = `<div class="photo-carousel">${photos.map(p => {
      const url = Photos.blobToUrl(p.blob);
      const selected = compareSelection.includes(p.id);
      return `<div class="photo-carousel-item" data-id="${p.id}" style="${selected ? 'outline:2px solid var(--gold);border-radius:var(--radius-sm)' : ''}">
        <img src="${url}" alt="Check-in ${p.date}">
        <div class="photo-carousel-date">${fmtCompact(p.date)}</div>
      </div>`;
    }).join('')}</div>`;

    gallery.querySelectorAll('.photo-carousel-item').forEach(item => {
      item.addEventListener('click', async () => {
        const id = parseInt(item.dataset.id);
        if (compareMode) {
          const sel = window._compareSelection();
          if (sel.includes(id)) {
            window._setCompareSelection(sel.filter(s => s !== id));
          } else {
            sel.push(id);
            window._setCompareSelection(sel);
          }
          if (window._compareSelection().length === 2) {
            await showCompare(window._compareSelection());
          } else {
            await renderPhotoGallery();
          }
        }
      });
    });
  }

  async function showCompare(ids) {
    const photos = await Photos.getAll();
    const [a, b] = ids.map(id => photos.find(p => p.id === id)).filter(Boolean);
    if (!a || !b) return;

    const grid = document.getElementById('compare-grid');
    grid.innerHTML = `
      <div><img src="${Photos.blobToUrl(a.blob)}" alt="${a.date}"><div class="compare-label">${fmtCompact(a.date)}</div></div>
      <div><img src="${Photos.blobToUrl(b.blob)}" alt="${b.date}"><div class="compare-label">${fmtCompact(b.date)}</div></div>
    `;
    document.getElementById('compare-view').style.display = 'block';
  }

  // --- Helpers ---
  function today() { return new Date().toISOString().slice(0, 10); }
  function fmtDate(d) { const [y,m,day] = d.split('-'); const mo = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']; return `${mo[parseInt(m)-1]} ${parseInt(day)}, ${y}`; }
  function fmtCompact(d) { const [,m,day] = d.split('-'); const mo = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']; return `${mo[parseInt(m)-1]} ${parseInt(day)}`; }
  function parseNum(v) { const n = parseFloat(v); return isNaN(n) ? null : n; }
  function esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
  function toast(msg) { const el = document.getElementById('toast'); el.textContent = msg; el.classList.add('show'); clearTimeout(window._tt); window._tt = setTimeout(() => el.classList.remove('show'), 2500); }

  // --- Init ---
  async function initApp() {
    document.querySelectorAll('.nav-item').forEach(btn => btn.addEventListener('click', () => switchView(btn.dataset.view)));
    document.getElementById('btn-lock').addEventListener('click', () => { Vault.lock(); showLockScreen(); });
    document.getElementById('log-date').value = today();
    document.getElementById('log-form').addEventListener('submit', handleLogSubmit);

    // Chart toggle
    document.querySelectorAll('#chart-toggle .chart-toggle-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        document.querySelectorAll('#chart-toggle .chart-toggle-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        chartDays = parseInt(btn.dataset.days);
        renderCharts(await getEntries());
      });
    });

    // Import tabs
    document.querySelectorAll('.import-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.import-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.import-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(`panel-${tab.dataset.panel}`).classList.add('active');
      });
    });

    document.getElementById('btn-parse-text').addEventListener('click', handleTextImport);

    const uploadZone = document.getElementById('upload-zone');
    const fileInput = document.getElementById('photo-input');
    document.getElementById('tonal-date').value = today();
    uploadZone.addEventListener('click', () => fileInput.click());
    uploadZone.addEventListener('dragover', (ev) => { ev.preventDefault(); uploadZone.classList.add('dragover'); });
    uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('dragover'));
    uploadZone.addEventListener('drop', (ev) => { ev.preventDefault(); uploadZone.classList.remove('dragover'); handlePhotoSelect(ev.dataTransfer.files); });
    fileInput.addEventListener('change', () => { handlePhotoSelect(fileInput.files); fileInput.value = ''; });
    document.getElementById('btn-parse-photos').addEventListener('click', handlePhotoImport);

    document.getElementById('btn-export-csv').addEventListener('click', exportCSV);
    document.getElementById('btn-export-csv-settings').addEventListener('click', exportCSV);

    // Body check-in photos
    document.getElementById('checkin-date').value = today();
    const checkinZone = document.getElementById('checkin-upload-zone');
    const checkinInput = document.getElementById('checkin-input');
    checkinZone.addEventListener('click', () => checkinInput.click());
    checkinInput.addEventListener('change', async () => {
      const file = checkinInput.files[0];
      if (!file) return;
      const date = document.getElementById('checkin-date').value || today();
      await Photos.save(date, file);
      checkinInput.value = '';
      toast('Photo saved');
      await renderPhotoGallery();
    });

    let compareMode = false;
    let compareSelection = [];

    document.getElementById('btn-compare-mode').addEventListener('click', () => {
      compareMode = !compareMode;
      compareSelection = [];
      document.getElementById('btn-compare-mode').textContent = compareMode ? 'Cancel' : 'Compare';
      document.getElementById('btn-compare-mode').style.color = compareMode ? 'var(--red-bright)' : 'var(--gold-dim)';
      renderPhotoGallery();
    });

    document.getElementById('btn-exit-compare').addEventListener('click', () => {
      compareMode = false;
      compareSelection = [];
      document.getElementById('compare-view').style.display = 'none';
      document.getElementById('btn-compare-mode').textContent = 'Compare';
      document.getElementById('btn-compare-mode').style.color = 'var(--gold-dim)';
      renderPhotoGallery();
    });

    window._compareMode = () => compareMode;
    window._compareSelection = () => compareSelection;
    window._setCompareSelection = (v) => { compareSelection = v; };

    await renderPhotoGallery();

    await renderSettings();
    document.getElementById('btn-save-settings').addEventListener('click', saveSettingsForm);
    document.getElementById('btn-reset-data').addEventListener('click', async () => {
      if (confirm('Reset to seed data?')) { await saveEntries([]); await seedIfEmpty(); await renderDashboard(); toast('Data reset'); }
    });
    document.getElementById('btn-clear-all').addEventListener('click', async () => {
      if (confirm('Delete ALL data?')) { await saveEntries([]); await renderDashboard(); toast('Data cleared'); }
    });

    await renderDashboard();
  }

  async function boot() {
    document.getElementById('lock-form').addEventListener('submit', handleUnlock);
    // Try auto-unlock from session (persists across refresh, clears on tab close)
    if (await Vault.trySessionUnlock()) {
      document.getElementById('lock-screen').style.display = 'none';
      document.getElementById('app-shell').style.display = 'block';
      await initApp();
    } else {
      showLockScreen();
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
