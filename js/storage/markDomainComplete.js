// Marks domain complete and folds in session wrong answers so the retake screen is accurate
import { getDomainProgress } from './getDomainProgress.js';

export function markDomainComplete(domainSlug) {
  const { answers } = getDomainProgress(domainSlug);

  // Fold in any wrong answers from the current session
  const sessionFailed = JSON.parse(sessionStorage.getItem(`qbs_${domainSlug}_failed`) || '[]');
  sessionFailed.forEach(id => { if (!(id in answers)) answers[id] = false; });

  localStorage.setItem(`qb_${domainSlug}`, JSON.stringify({ answers, completed: true }));
}
