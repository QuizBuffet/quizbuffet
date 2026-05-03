// Featured carousel — rotates through live certs with auto-advance, dots, arrows, pause-on-hover
const PALETTE = {
  'comptia-security-plus':   ['#0b6e4f', '#15a96f'],
  'comptia-network-plus':    ['#1f4287', '#3a6ed1'],
  'comptia-cloud-plus':      ['#2b6cb0', '#56a3d6'],
  'comptia-cysa-plus':       ['#9c1d1d', '#cf3a3a'],
  'comptia-pentest-plus':    ['#7a1f1f', '#b03434'],
  'comptia-a-plus-core-1':   ['#5b3a8c', '#8a5fc7'],
  'comptia-a-plus-core-2':   ['#5b3a8c', '#8a5fc7'],
  'comptia-itf-plus':        ['#8a4a00', '#c47828'],
  'comptia-data-plus':       ['#a83b5b', '#d4658c'],
};

let timer = null;
let currentIdx = 0;

function renderSlide(certs, idx) {
  const cert = certs[idx];
  const [c1, c2] = PALETTE[cert.slug] || ['#333', '#666'];
  return `
    <article class="featured-slide" style="--c1:${c1};--c2:${c2}" data-slide="${idx}">
      <div class="featured-tag">Featured</div>
      <h2 class="featured-headline">${cert.name}</h2>
      <div class="featured-sub">${cert.code} · ${cert.vendor || ''}</div>
      ${cert.tagline ? `<p class="featured-desc">${cert.tagline}</p>` : ''}
      <a href="/${cert.slug}/" class="featured-cta">Start practicing →</a>
    </article>`;
}

function renderDots(certs, idx) {
  return certs.map((_, i) =>
    `<button class="featured-dot${i === idx ? ' active' : ''}" data-go="${i}" aria-label="Go to slide ${i + 1}"></button>`
  ).join('');
}

function setSlide(certs, idx) {
  currentIdx = (idx + certs.length) % certs.length;
  const stage = document.querySelector('.featured-stage');
  const dots = document.querySelector('.featured-dots');
  if (!stage || !dots) return;
  stage.innerHTML = renderSlide(certs, currentIdx);
  dots.innerHTML = renderDots(certs, currentIdx);
  dots.querySelectorAll('.featured-dot').forEach(b =>
    b.addEventListener('click', () => { resetTimer(certs); setSlide(certs, +b.dataset.go); })
  );
}

function resetTimer(certs) {
  if (timer) clearInterval(timer);
  timer = setInterval(() => setSlide(certs, currentIdx + 1), 6000);
}

export function renderFeatured(_legacy, allCerts) {
  const el = document.getElementById('featured');
  if (!el) return;
  // Backward-compat: when called with just one cert object (old signature), wrap it
  const certs = Array.isArray(allCerts) ? allCerts : (_legacy && _legacy.slug ? [_legacy] : []);
  if (!certs.length) { el.innerHTML = ''; return; }

  el.innerHTML = `
    <section class="featured-carousel" aria-roledescription="carousel" aria-label="Featured certifications">
      <button class="featured-nav featured-prev" aria-label="Previous">‹</button>
      <div class="featured-stage">${renderSlide(certs, 0)}</div>
      <button class="featured-nav featured-next" aria-label="Next">›</button>
      <div class="featured-dots">${renderDots(certs, 0)}</div>
    </section>`;

  el.querySelector('.featured-prev').addEventListener('click', () => { resetTimer(certs); setSlide(certs, currentIdx - 1); });
  el.querySelector('.featured-next').addEventListener('click', () => { resetTimer(certs); setSlide(certs, currentIdx + 1); });
  el.querySelectorAll('.featured-dot').forEach(b =>
    b.addEventListener('click', () => { resetTimer(certs); setSlide(certs, +b.dataset.go); })
  );

  el.addEventListener('mouseenter', () => { if (timer) clearInterval(timer); });
  el.addEventListener('mouseleave', () => resetTimer(certs));

  resetTimer(certs);
}
