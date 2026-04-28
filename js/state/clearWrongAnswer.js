// Clears the wrong answer state once the user has acknowledged the explanation
export function clearWrongAnswer(domainSlug) {
  sessionStorage.removeItem(`qbs_${domainSlug}_wrong`);
}
