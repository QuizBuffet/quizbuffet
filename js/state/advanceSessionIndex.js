// Increments the session position so a reload can never re-show this question
export function advanceSessionIndex(domainSlug) {
  const key = `qbs_${domainSlug}_idx`;
  const pos = parseInt(sessionStorage.getItem(key) || '0');
  sessionStorage.setItem(key, pos + 1);
}
