// Memoized fetch of /data/counts.json. Every consumer (nav, hero, featured,
// cert list, total badge, cert preview, total-question-count loader) shares
// the same in-flight promise so the file is fetched at most once per page.
//
// Returns a Promise<Counts | null>. On fetch failure, resolves to null —
// callers must handle that explicitly (most fall back to 0 or skip the UI).

let _pending = null;

export function loadCounts() {
  if (_pending) return _pending;
  _pending = fetch('/data/counts.json')
    .then(r => r.ok ? r.json() : null)
    .catch(() => null);
  return _pending;
}
