export function getErrorCounts(storageKey) {
  try { return JSON.parse(localStorage.getItem(`qb_errs_${storageKey}`)) || {}; }
  catch { return {}; }
}
