// Clears quiz progress after 90 days of inactivity — preserves theme/color/cursor/sound preferences
const KEY = 'qb_last_active';
const NINETY_DAYS = 90 * 24 * 60 * 60 * 1000;
const PREFS = new Set(['qb_theme', 'qb_color', 'qb_cursor', 'qb_sound', 'qb_difficulty', KEY]);

export function checkInactivityReset() {
  const last = Number(localStorage.getItem(KEY));
  if (last && Date.now() - last > NINETY_DAYS) {
    Object.keys(localStorage)
      .filter(k => k.startsWith('qb_') && !PREFS.has(k))
      .forEach(k => localStorage.removeItem(k));
  }
  localStorage.setItem(KEY, Date.now());
}
