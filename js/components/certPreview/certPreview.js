// Hover/long-press preview popup for cert cards on the home page.
// Desktop: shows on mouseenter (with 250ms delay to avoid flicker), hides on mouseleave/scroll.
// Mobile: shows on long-press (450ms touch hold), absorbs the tap so navigation doesn't fire.
// Keyboard: shows on focus-visible.
import { loadSalaries, getSalaryEntry, formatFullUSD, collarLabel } from '../../data/salaries/loadSalaries.js';
import { loadPricing, getPricingEntry, formatPrice } from '../../data/pricing/loadPricing.js';

const SHOW_DELAY = 250;
const HIDE_DELAY = 120;     // grace period after mouseleave (covers card-to-card transitions)
const SWAP_DELAY = 80;      // when already-visible, swap to the new card almost instantly
const LONG_PRESS_MS = 450;

let tip = null;
let showTimer = null;
let hideTimer = null;
let pressTimer = null;
let lastCard = null;
let touchSuppressClick = false;
let salariesP = null;
let countsP = null;
let comingSoonP = null;
let pricingP = null;

function ensureTip() {
  if (tip) return tip;
  tip = document.createElement('div');
  tip.id = 'cert-preview';
  tip.className = 'cert-preview';
  tip.setAttribute('role', 'tooltip');
  tip.setAttribute('aria-hidden', 'true');
  document.body.appendChild(tip);
  return tip;
}

function hide() {
  clearTimeout(showTimer); clearTimeout(hideTimer); clearTimeout(pressTimer);
  if (!tip) return;
  tip.classList.remove('cert-preview-visible');
  tip.setAttribute('aria-hidden', 'true');
  lastCard = null;
}

function isVisible() {
  return tip && tip.classList.contains('cert-preview-visible');
}

function firstSentence(s) {
  if (!s) return '';
  const m = s.match(/^[^.!?]+[.!?]/);
  return (m ? m[0] : s).trim();
}

async function fetchData() {
  if (!salariesP) salariesP = loadSalaries();
  if (!countsP)   countsP = fetch('/data/counts.json').then(r => r.ok ? r.json() : { perCert: {} }).catch(() => ({ perCert: {} }));
  if (!comingSoonP) comingSoonP = fetch('/data/coming-soon.json').then(r => r.ok ? r.json() : []).catch(() => []);
  if (!pricingP) pricingP = loadPricing();
  const [salaries, counts, comingSoon, pricing] = await Promise.all([salariesP, countsP, comingSoonP, pricingP]);
  return { salaries, counts, comingSoon, pricing };
}

async function buildContent(slug, certs) {
  const { salaries, counts, comingSoon, pricing } = await fetchData();
  const live = certs.find(c => c.slug === slug);
  const cs   = !live ? comingSoon.find(c => c.slug === slug) : null;
  const cert = live || cs;
  if (!cert) return null;

  const isLive = !!live;
  const tagline = cert.tagline || '';
  const aboutFirst = firstSentence(cert.about || '');
  const sal = getSalaryEntry(salaries, slug);
  const price = getPricingEntry(pricing, slug);
  const qcount = (counts.perCert && counts.perCert[slug]) || null;
  const collar = sal ? collarLabel(sal.collar) : null;

  const stats = [];
  if (isLive) {
    stats.push(`<span class="cert-preview-stat"><strong>${cert.domains.length}</strong> domains</span>`);
    if (qcount) stats.push(`<span class="cert-preview-stat"><strong>${qcount.toLocaleString()}</strong> practice questions</span>`);
  } else {
    stats.push(`<span class="cert-preview-stat cert-preview-stat-soon">📚 Coming soon</span>`);
  }
  if (sal) {
    stats.push(`<span class="cert-preview-stat">${formatFullUSD(sal.salary.mid)} median · ${collar.icon} ${collar.label}</span>`);
  }
  if (price) {
    stats.push(`<span class="cert-preview-stat">${formatPrice(price.practice_usd)} elsewhere · <strong>free here</strong></span>`);
  }

  return `
    <div class="cert-preview-head">
      <div class="cert-preview-name">${cert.name}</div>
      <div class="cert-preview-meta">${cert.code}${cert.vendor ? ` · ${cert.vendor}` : ''}</div>
    </div>
    ${tagline ? `<div class="cert-preview-tag">${tagline}</div>` : ''}
    ${aboutFirst ? `<div class="cert-preview-about">${aboutFirst}</div>` : ''}
    ${cert.details ? `<div class="cert-preview-details">${cert.details}</div>` : ''}
    <div class="cert-preview-stats">${stats.join('')}</div>
    <div class="cert-preview-hint">${isLive ? 'Click to start practicing' : 'Click for details'}</div>`;
}

function position(card) {
  if (!tip) return;
  const r = card.getBoundingClientRect();
  const tw = tip.offsetWidth;
  const th = tip.offsetHeight;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const margin = 8;

  // Prefer below; flip above if not enough room.
  let top = r.bottom + margin;
  if (top + th > vh - margin) top = Math.max(margin, r.top - th - margin);

  // Center horizontally on the card, then clamp to viewport.
  let left = r.left + r.width / 2 - tw / 2;
  left = Math.max(margin, Math.min(left, vw - tw - margin));

  tip.style.top  = (top  + window.scrollY) + 'px';
  tip.style.left = (left + window.scrollX) + 'px';
}

async function showFor(card, certs) {
  if (lastCard === card && tip && tip.classList.contains('cert-preview-visible')) return;
  const slug = card.dataset.certItem || card.querySelector('[data-cert-item]')?.dataset.certItem ||
               card.getAttribute('href')?.replace(/^\//,'').replace(/\/$/,'');
  if (!slug) return;
  const html = await buildContent(slug, certs);
  if (!html) return;
  ensureTip();
  tip.innerHTML = html;
  tip.classList.add('cert-preview-visible');
  tip.setAttribute('aria-hidden', 'false');
  lastCard = card;
  // Position after content layout.
  requestAnimationFrame(() => position(card));
}

export function attachCertPreview(rootEl, certs) {
  if (!rootEl) return;
  ensureTip();

  const cards = rootEl.querySelectorAll('a.cert-card');
  cards.forEach(card => {
    // Make sure the slug is reachable from the card itself.
    if (!card.dataset.certItem) {
      const m = card.getAttribute('href')?.match(/^\/([^/]+)\/$/);
      if (m) card.dataset.certItem = m[1];
    }

    // Desktop hover. Cancel any pending hide so card-to-card transitions are
    // instant — no flash of "no popup" while the user moves between cards.
    card.addEventListener('mouseenter', () => {
      clearTimeout(showTimer); clearTimeout(hideTimer);
      // If a popup is already visible, swap to the new card almost immediately
      // so the user doesn't have to re-pause for 250ms on each card.
      const delay = isVisible() ? SWAP_DELAY : SHOW_DELAY;
      showTimer = setTimeout(() => showFor(card, certs), delay);
    });
    card.addEventListener('mouseleave', () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      hideTimer = setTimeout(hide, HIDE_DELAY);
    });

    // Keyboard focus.
    card.addEventListener('focus', () => showFor(card, certs));
    card.addEventListener('blur', hide);

    // Touch: long-press to preview, suppress the click that would otherwise navigate.
    card.addEventListener('touchstart', () => {
      clearTimeout(pressTimer);
      touchSuppressClick = false;
      pressTimer = setTimeout(() => {
        touchSuppressClick = true;
        showFor(card, certs);
      }, LONG_PRESS_MS);
    }, { passive: true });
    card.addEventListener('touchend',   () => clearTimeout(pressTimer));
    card.addEventListener('touchmove',  () => clearTimeout(pressTimer), { passive: true });
    card.addEventListener('touchcancel',() => clearTimeout(pressTimer));
    card.addEventListener('click', e => {
      if (touchSuppressClick) {
        e.preventDefault();
        touchSuppressClick = false;
        // Hide after a beat so the user can read the preview before tapping again.
      }
    });
  });

  // Hide on scroll, resize, escape, or tap outside.
  window.addEventListener('scroll', hide, { passive: true });
  window.addEventListener('resize', hide);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') hide(); });
  document.addEventListener('touchstart', e => {
    if (tip && tip.classList.contains('cert-preview-visible') &&
        !e.target.closest('a.cert-card') && !e.target.closest('#cert-preview')) {
      hide();
    }
  }, { passive: true });
}
