// Accumulates wrong answer IDs in sessionStorage for end-of-session results display
export function trackFailedAnswer(domainSlug, questionId) {
  const key = `qbs_${domainSlug}_failed`;
  const list = JSON.parse(sessionStorage.getItem(key) || '[]');
  if (!list.includes(questionId)) list.push(questionId);
  sessionStorage.setItem(key, JSON.stringify(list));
}
