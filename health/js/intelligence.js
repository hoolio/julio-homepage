// Intelligence layer: parse nutrition, infer phase, generate nudges
const Intel = (function () {
  'use strict';

  // Parse "~1,800 kcal | P 180g | C 90g | F 45g" patterns from notes/food
  function parseNutrition(entry) {
    const text = (entry.notes || '') + ' ' + (entry.food || '');
    const result = { calories: null, protein: null, carbs: null, fat: null };

    // Calories: ~1,800 kcal or ~1800 kcal or 1,800 kcal
    const calMatch = text.match(/~?([\d,]+)\s*kcal/i);
    if (calMatch) result.calories = parseInt(calMatch[1].replace(/,/g, ''));

    // Protein: P 180g or P180g or Protein 180g
    const pMatch = text.match(/P\s*([\d]+)\s*g/i);
    if (pMatch) result.protein = parseInt(pMatch[1]);

    // Carbs: C 90g
    const cMatch = text.match(/C\s*([\d]+)\s*g/i);
    if (cMatch) result.carbs = parseInt(cMatch[1]);

    // Fat: F 45g
    const fMatch = text.match(/F\s*([\d]+)\s*g/i);
    if (fMatch) result.fat = parseInt(fMatch[1]);

    return result;
  }

  // Get rolling average over last N days for a numeric field
  function rollingAvg(entries, field, days) {
    const now = new Date();
    const cutoff = new Date(now);
    cutoff.setDate(cutoff.getDate() - days);
    const cutoffStr = cutoff.toISOString().slice(0, 10);

    const relevant = entries.filter(e => e.date >= cutoffStr && e[field] != null);
    if (!relevant.length) return null;
    return relevant.reduce((sum, e) => sum + e[field], 0) / relevant.length;
  }

  // Get rolling average of parsed nutrition
  function nutritionAvg(entries, nutrientKey, days) {
    const now = new Date();
    const cutoff = new Date(now);
    cutoff.setDate(cutoff.getDate() - days);
    const cutoffStr = cutoff.toISOString().slice(0, 10);

    const values = [];
    for (const e of entries) {
      if (e.date < cutoffStr) continue;
      const n = parseNutrition(e);
      if (n[nutrientKey] != null) values.push(n[nutrientKey]);
    }
    if (!values.length) return null;
    return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  }

  // Infer phase from calorie + weight trends
  function inferPhase(entries) {
    const sorted = [...entries].sort((a, b) => a.date.localeCompare(b.date));
    const last14 = sorted.slice(-14);

    // Calorie trend
    const cals = [];
    for (const e of last14) {
      const n = parseNutrition(e);
      if (n.calories) cals.push(n.calories);
    }
    const avgCal = cals.length >= 3 ? cals.reduce((a, b) => a + b, 0) / cals.length : null;

    // Weight trend (simple: compare first half to second half)
    const weights = last14.filter(e => e.weight != null).map(e => e.weight);
    let weightTrend = null;
    if (weights.length >= 4) {
      const half = Math.floor(weights.length / 2);
      const firstHalf = weights.slice(0, half).reduce((a, b) => a + b, 0) / half;
      const secondHalf = weights.slice(half).reduce((a, b) => a + b, 0) / (weights.length - half);
      weightTrend = secondHalf - firstHalf; // positive = gaining
    }

    // HRV trend
    const hrvs = last14.filter(e => e.hrv != null).map(e => e.hrv);
    const avgHrv = hrvs.length ? hrvs.reduce((a, b) => a + b, 0) / hrvs.length : null;

    if (avgCal !== null) {
      if (avgCal < 1800) return { phase: 'Cutting', icon: '↘', color: '#ef4444' };
      if (avgCal > 2500) return { phase: 'Bulking', icon: '↗', color: '#3b82f6' };
    }

    if (weightTrend !== null) {
      if (weightTrend < -0.5) return { phase: 'Cutting', icon: '↘', color: '#ef4444' };
      if (weightTrend > 0.5) return { phase: 'Bulking', icon: '↗', color: '#3b82f6' };
    }

    return { phase: 'Recomping', icon: '→', color: '#0d9488' };
  }

  // Generate actionable nudges
  function getNudges(entries) {
    const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date));
    const nudges = [];

    // HRV dropping
    const recentHrv = sorted.slice(0, 3).filter(e => e.hrv != null);
    const olderHrv = sorted.slice(3, 7).filter(e => e.hrv != null);
    if (recentHrv.length >= 2 && olderHrv.length >= 2) {
      const recentAvg = recentHrv.reduce((s, e) => s + e.hrv, 0) / recentHrv.length;
      const olderAvg = olderHrv.reduce((s, e) => s + e.hrv, 0) / olderHrv.length;
      if (recentAvg < olderAvg - 15) {
        nudges.push({ type: 'warning', text: 'HRV trending down — consider a rest day or lighter session.' });
      }
      if (recentAvg > 150) {
        nudges.push({ type: 'positive', text: 'HRV is strong — you have room to push intensity.' });
      }
    }

    // Sleep deficit
    const recentSleep = sorted.slice(0, 3).filter(e => e.sleep_hours != null);
    if (recentSleep.length >= 2) {
      const avgSleep = recentSleep.reduce((s, e) => s + e.sleep_hours, 0) / recentSleep.length;
      if (avgSleep < 6) {
        nudges.push({ type: 'warning', text: `Sleep averaging ${avgSleep.toFixed(1)}h — recovery is compromised.` });
      }
    }

    // Low protein streak
    const proteinDays = [];
    for (const e of sorted.slice(0, 5)) {
      const n = parseNutrition(e);
      if (n.protein != null) proteinDays.push(n.protein);
    }
    if (proteinDays.length >= 3) {
      const lowDays = proteinDays.filter(p => p < 180).length;
      if (lowDays >= 3) {
        nudges.push({ type: 'warning', text: `Protein below 180g for ${lowDays} of last ${proteinDays.length} days.` });
      }
    }

    // Calorie deficit streak
    const calDays = [];
    for (const e of sorted.slice(0, 5)) {
      const n = parseNutrition(e);
      if (n.calories != null) calDays.push(n.calories);
    }
    if (calDays.length >= 3) {
      const deficitDays = calDays.filter(c => c < 2000).length;
      if (deficitDays >= 3) {
        nudges.push({ type: 'positive', text: `${deficitDays}-day deficit streak — good cut momentum.` });
      }
    }

    // Exercise consistency
    const exerciseDays = sorted.slice(0, 7).filter(e => e.exercise).length;
    if (exerciseDays >= 6) {
      nudges.push({ type: 'positive', text: `${exerciseDays}/7 exercise days this week — consistency is high.` });
    }

    return nudges.slice(0, 2); // Max 2 nudges
  }

  // Get entries for a date range
  function getRange(entries, days) {
    const now = new Date();
    const cutoff = new Date(now);
    cutoff.setDate(cutoff.getDate() - days);
    const cutoffStr = cutoff.toISOString().slice(0, 10);
    return entries
      .filter(e => e.date >= cutoffStr)
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  // 7-day moving average for weight
  function weightMovingAvg(entries) {
    const sorted = entries.filter(e => e.weight != null).sort((a, b) => a.date.localeCompare(b.date));
    const result = [];
    for (let i = 0; i < sorted.length; i++) {
      const window = sorted.slice(Math.max(0, i - 6), i + 1);
      const avg = window.reduce((s, e) => s + e.weight, 0) / window.length;
      result.push({ date: sorted[i].date, value: Math.round(avg * 10) / 10 });
    }
    return result;
  }

  return { parseNutrition, rollingAvg, nutritionAvg, inferPhase, getNudges, getRange, weightMovingAvg };
})();
