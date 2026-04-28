// Persists a wrong answer to localStorage — only if the question hasn't been answered correctly yet
import { getDomainProgress } from './getDomainProgress.js';

export function saveFailedAnswer(domainSlug, questionId) {
  const { answers, completed } = getDomainProgress(domainSlug);
  if (answers[questionId] === true) return; // don't overwrite a correct answer
  answers[questionId] = false;
  localStorage.setItem(`qb_${domainSlug}`, JSON.stringify({ answers, completed }));
}
