export function getColorTheme() {
  return localStorage.getItem('qb_color') || 'classic';
}

export function applyColorTheme(c) {
  document.documentElement.dataset.color = c;
  localStorage.setItem('qb_color', c);
}
