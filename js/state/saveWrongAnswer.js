// Persists the last answered question to sessionStorage so the explanation survives a reload — cleared only on Next
export function saveWrongAnswer(domainSlug, questionId, chosen) {
  sessionStorage.setItem(`qbs_${domainSlug}_wrong`, JSON.stringify({ questionId, chosen }));
}
