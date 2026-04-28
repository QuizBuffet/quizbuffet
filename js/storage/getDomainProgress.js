// Returns { answers, correct, failed, completed } for a domain.
// answers: { [questionId]: true (correct) | false (wrong) }
// Handles both the new map format and the old array format transparently.
export function getDomainProgress(domainSlug) {
  const raw = localStorage.getItem(`qb_${domainSlug}`);
  if (!raw) return { answers: {}, correct: [], failed: [], completed: false };

  const d = JSON.parse(raw);

  let answers;
  if (d.answers && typeof d.answers === 'object' && !Array.isArray(d.answers)) {
    answers = d.answers;
  } else {
    // Old array format — derive map on the fly, written in new format on next save
    answers = {};
    (d.correct || []).forEach(id => { answers[id] = true; });
    (d.failed  || []).forEach(id => { if (!(id in answers)) answers[id] = false; });
  }

  const correct = Object.keys(answers).filter(id => answers[id] === true);
  const failed  = Object.keys(answers).filter(id => answers[id] === false);

  return { answers, correct, failed, completed: !!d.completed };
}
