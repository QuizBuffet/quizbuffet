export function getSessionHistory(storageKey) {
  try { return JSON.parse(localStorage.getItem(`qb_hist_${storageKey}`)) || []; }
  catch { return []; }
}
