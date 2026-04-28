import { getErrorCounts } from './getErrorCounts.js';

export function incrementErrorCount(storageKey, questionId) {
  const counts = getErrorCounts(storageKey);
  counts[questionId] = (counts[questionId] || 0) + 1;
  localStorage.setItem(`qb_errs_${storageKey}`, JSON.stringify(counts));
}
