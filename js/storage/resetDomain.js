// Wipes all saved progress for a single domain from both localStorage and sessionStorage
export function resetDomain(domainSlug) {
  localStorage.removeItem(`qb_${domainSlug}`);
  sessionStorage.removeItem(`qbs_${domainSlug}`);
  sessionStorage.removeItem(`qbs_${domainSlug}_idx`);
  sessionStorage.removeItem(`qbs_${domainSlug}_wrong`);
  sessionStorage.removeItem(`qbs_${domainSlug}_failed`);
  sessionStorage.removeItem(`qbs_${domainSlug}_screen`);
  sessionStorage.removeItem(`qbs_${domainSlug}_session_ids`);
}
