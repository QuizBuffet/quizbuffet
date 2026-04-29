export function getColorTheme() {
  return localStorage.getItem('qb_color') || 'buffet';
}

export function applyColorTheme(c) {
  document.documentElement.dataset.color = c;
  localStorage.setItem('qb_color', c);
}
