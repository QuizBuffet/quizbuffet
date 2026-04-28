// Calculates localStorage usage in bytes and fetches storage quota where available
export async function getStorageInfo() {
  let qbBytes = 0;
  let totalBytes = 0;

  for (const key in localStorage) {
    if (!Object.prototype.hasOwnProperty.call(localStorage, key)) continue;
    const size = (key.length + (localStorage[key] || '').length) * 2; // UTF-16: 2 bytes per char
    totalBytes += size;
    if (key.startsWith('qb_')) qbBytes += size;
  }

  let quota = null;
  if (navigator.storage?.estimate) {
    try { quota = (await navigator.storage.estimate()).quota; } catch {}
  }

  return { qbBytes, totalBytes, quota };
}
