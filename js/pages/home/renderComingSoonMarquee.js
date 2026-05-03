// Infinite-scroll banner of coming-soon certs in priority order.
// Content list is duplicated so the CSS animation loops seamlessly.
export function renderComingSoonMarquee(comingSoon = []) {
  const el = document.getElementById('cs-marquee');
  if (!el || !comingSoon.length) {
    if (el) el.innerHTML = '';
    return;
  }

  const items = comingSoon.map((c, i) => `
    <a href="/${c.slug}/" class="cs-marquee-item" title="${c.name} (${c.code})">
      <span class="cs-marquee-rank">#${i + 1}</span>
      <span class="cs-marquee-name">${c.name}</span>
      <span class="cs-marquee-code">${c.code}</span>
    </a>`).join('');

  // Duplicate twice so the -50% translateX keyframe loops without a visible jump
  el.innerHTML = `
    <div class="cs-marquee" aria-label="Coming soon certifications">
      <div class="cs-marquee-label">Coming soon →</div>
      <div class="cs-marquee-track">
        <div class="cs-marquee-row">${items}${items}</div>
      </div>
    </div>`;
}
