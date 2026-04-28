// Returns the pending wrong answer state for a domain, or null if none
export function getWrongAnswer(domainSlug) {
  const raw = sessionStorage.getItem(`qbs_${domainSlug}_wrong`);
  return raw ? JSON.parse(raw) : null;
}
