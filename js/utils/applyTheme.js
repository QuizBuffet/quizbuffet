// Theme helpers — applyTheme sets data-theme on <html> and persists the choice
export function getTheme() {
  return localStorage.getItem('qb_theme') || 'light';
}

export function applyTheme(t) {
  document.documentElement.dataset.theme = t === 'dark' ? 'dark' : '';
  localStorage.setItem('qb_theme', t);
}

export function toggleTheme() {
  const next = getTheme() === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  return next;
}
