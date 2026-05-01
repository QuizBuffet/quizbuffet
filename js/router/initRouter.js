// URL param helpers — reads cert and domain slugs from clean path segments
export function getRouteParams() {
  const raw = location.pathname.replace('/index.html', '') || '/';
  const path = raw === '/' ? '/' : raw.replace(/\/$/, '');
  const segments = path === '/' ? [] : path.split('/').filter(Boolean);

  const cert = segments[0] || '';
  const rawDomain = segments[1] || '';
  const domain = rawDomain === 'mix' ? '__mix__' : rawDomain;

  return { cert, domain, id: null };
}
