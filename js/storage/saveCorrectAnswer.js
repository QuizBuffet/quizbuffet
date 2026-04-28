// Persists a correct answer to localStorage so it's excluded from future sessions
import { getDomainProgress } from './getDomainProgress.js';

export function saveCorrectAnswer(domainSlug, questionId) {
  const { answers, completed } = getDomainProgress(domainSlug);
  answers[questionId] = true;
  localStorage.setItem(`qb_${domainSlug}`, JSON.stringify({ answers, completed }));
}
