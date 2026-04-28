import { getFlaggedQuestions } from './getFlaggedQuestions.js';

export function toggleFlag(storageKey, questionId) {
  const flags = getFlaggedQuestions(storageKey);
  const idx = flags.indexOf(questionId);
  if (idx === -1) flags.push(questionId);
  else flags.splice(idx, 1);
  localStorage.setItem(`qb_flags_${storageKey}`, JSON.stringify(flags));
  return flags.includes(questionId);
}
