// Featured carousel — pulls a random sample of live certs each visit so every
// cert gets a chance to be shown over time. Cap keeps the dot count tight on mobile.
import { loadCounts } from '../../data/counts/loadCounts.js';

const FEATURED_COUNT = 8;

function pickRandom(certs, n) {
  // Fisher-Yates partial shuffle for an unbiased random sample.
  const a = certs.slice();
  const k = Math.min(n, a.length);
  for (let i = 0; i < k; i++) {
    const j = i + Math.floor(Math.random() * (a.length - i));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, k);
}

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

function fillCount(certs, idx) {
  const cert = certs[idx];
  const slot = document.querySelector(`.featured-slide [data-count="${cert.slug}"]`);
  if (!slot) return;
  loadCounts().then(c => {
    const n = (c && c.perCert && c.perCert[cert.slug]) || 0;
    slot.textContent = n ? n.toLocaleString() : '…';
  });
}

function renderSlide(certs, idx) {
  const cert = certs[idx];
  const totalDomains = (cert.domains || []).length;
  const topDomains = (cert.domains || []).slice(0, 4);
  const domainBars = topDomains.map(d => {
    const pct = Math.max(4, d.weight || 0);
    return `<div class="featured-bar">
      <div class="featured-bar-row">
        <span class="featured-bar-name" title="${d.name}">${d.name}</span>
        <span class="featured-bar-pct">${d.weight || 0}%</span>
      </div>
      <div class="featured-bar-track"><div class="featured-bar-fill" style="width:${pct}%"></div></div>
    </div>`;
  }).join('');

  return `
    <article class="featured-slide" data-slide="${idx}">
      <div class="featured-left">
        <div class="featured-tag">Featured certification · #${idx + 1}</div>
        <h2 class="featured-headline">${cert.name}</h2>
        <div class="featured-sub">
          <span class="featured-vendor">${cert.vendor || ''}</span>
          ${cert.code ? `<span class="featured-code">${cert.code}</span>` : ''}
        </div>
        ${cert.tagline ? `<p class="featured-desc">${cert.tagline}</p>` : ''}
        <div class="featured-statline">
          <div class="featured-statbox">
            <span class="featured-statbox-num" data-count="${cert.slug}">…</span>
            <span class="featured-statbox-lbl">questions</span>
          </div>
          <div class="featured-statbox">
            <span class="featured-statbox-num">${totalDomains}</span>
            <span class="featured-statbox-lbl">domains</span>
          </div>
          <div class="featured-statbox">
            <span class="featured-statbox-num">$0</span>
            <span class="featured-statbox-lbl">forever</span>
          </div>
        </div>
        <a href="/${cert.slug}/" class="featured-cta">Start practicing<span aria-hidden="true">  →</span></a>
      </div>
      <div class="featured-right" aria-hidden="true">
        <div class="featured-poster">
          <div class="featured-poster-code">${cert.code || cert.name.split(/\s+/)[0]}</div>
          <div class="featured-poster-vendor">${cert.vendor || ''}</div>
        </div>
        <div class="featured-domains">
          <div class="featured-domains-title">Top exam domains</div>
          ${domainBars}
          ${totalDomains > 4 ? `<div class="featured-domains-more">+${totalDomains - 4} more</div>` : ''}
        </div>
      </div>
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
  fillCount(certs, currentIdx);
}

function resetTimer(certs) {
  if (timer) clearInterval(timer);
  timer = setInterval(() => setSlide(certs, currentIdx + 1), 6000);
}

export function renderFeatured(_legacy, allCerts) {
  const el = document.getElementById('featured');
  if (!el) return;
  // Backward-compat: when called with just one cert object (old signature), wrap it
  const allList = Array.isArray(allCerts) ? allCerts : (_legacy && _legacy.slug ? [_legacy] : []);
  if (!allList.length) { el.innerHTML = ''; return; }
  // Random sample so every cert gets airtime across visits.
  const certs = pickRandom(allList, FEATURED_COUNT);

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

  fillCount(certs, 0);
  resetTimer(certs);
}
