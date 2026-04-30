// Renders featured cert banner — gives new users a clear starting point above the full list
export function renderFeatured(item) {
  const el = document.getElementById('featured');
  if (!el || !item) return;
  el.innerHTML = `
    <div class="featured">
      <div class="featured-label">Featured</div>
      <a href="${item.slug}" class="featured-title">${item.name}</a>
      <p style="font-size:15px;color:var(--text-mid);margin-top:4px">${item.description}</p>
    </div>`;
}
