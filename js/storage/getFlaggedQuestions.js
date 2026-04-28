export function getFlaggedQuestions(storageKey) {
  try { return JSON.parse(localStorage.getItem(`qb_flags_${storageKey}`)) || []; }
  catch { return []; }
}
