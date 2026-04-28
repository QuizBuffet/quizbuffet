// Renders the search box and fires onSearch callback on each keystroke
export function renderSearch(onSearch) {
  const el = document.getElementById('search');
  if (!el) return;
  el.innerHTML = `<input class="search-box" type="text" id="domain-search" placeholder="Search domains...">`;
  document.getElementById('domain-search').addEventListener('input', e => onSearch(e.target.value));
}
