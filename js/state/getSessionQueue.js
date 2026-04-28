// Returns remaining questions in a stable order — resumes after the last submitted answer on reload
export function getSessionQueue(questions, correctIds, domainSlug, limit) {
  const difficulty = localStorage.getItem('qb_difficulty') || null;
  const orderKey  = `qbs_${domainSlug}`;
  const idxKey    = `qbs_${domainSlug}_idx`;
  const retakeKey = `qbs_${domainSlug}_retake`;

  let order = JSON.parse(sessionStorage.getItem(orderKey) || 'null');
  if (!order) {
    order = questions.map(q => q.id);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    sessionStorage.setItem(orderKey, JSON.stringify(order));
  }

  // Slice from saved position so reloading never re-shows an already-attempted question
  const pos = parseInt(sessionStorage.getItem(idxKey) || '0');
  const remaining = order.slice(pos);

  const map = Object.fromEntries(questions.map(q => [q.id, q]));

  // correctIds are strings (Object.keys), order IDs are numbers — normalise for comparison
  const correctSet = new Set(correctIds.map(String));

  // Retake mode: show the exact requested questions regardless of saved correct state
  const isRetake = !!sessionStorage.getItem(retakeKey);
  const filtered = remaining
    .filter(id => map[id] && (isRetake || !correctSet.has(String(id))))
    .map(id => map[id])
    .filter(q => !difficulty || q.difficulty === difficulty);

  return limit ? filtered.slice(0, limit) : filtered;
}
