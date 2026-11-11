// "comptia-security-plus--security-operations" -> { cert, domain } for analytics params.
export function splitStorageKey(key = '') {
  const i = key.indexOf('--');
  return i < 0 ? { cert: '', domain: key } : { cert: key.slice(0, i), domain: key.slice(i + 2) };
}
