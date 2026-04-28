import { getSessionHistory } from './getSessionHistory.js';

export function saveSessionHistory(storageKey, pass, total) {
  const hist = getSessionHistory(storageKey);
  hist.push({ ts: Date.now(), pass, total });
  if (hist.length > 20) hist.splice(0, hist.length - 20);
  localStorage.setItem(`qb_hist_${storageKey}`, JSON.stringify(hist));
}
