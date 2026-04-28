// Persists the current screen type and session question IDs so any screen survives a reload
export function saveScreenState(domainSlug, sessionIds) {
  sessionStorage.setItem(`qbs_${domainSlug}_screen`, 'results');
  sessionStorage.setItem(`qbs_${domainSlug}_session_ids`, JSON.stringify(sessionIds));
}
