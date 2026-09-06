// Memoized fetch of /data/coming-soon.json. Shared by app.js (for the slug set
// that bypasses the SPA), footer, cert preview, home init, cert init.
// Returns a Promise<Array>: empty array on failure.

let _pending = null;

export function loadComingSoon() {
  if (_pending) return _pending;
  _pending = fetch('/data/coming-soon.json')
    .then(r => r.ok ? r.json() : [])
    .catch(() => []);
  return _pending;
}
