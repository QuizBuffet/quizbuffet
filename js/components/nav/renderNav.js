// Renders nav bar with live progress stats — recalculates from localStorage on every call so it's always current
import { certifications } from '../../data/certifications/index.js';
import { getTotalQuestionCount } from '../../loader/getTotalQuestionCount.js';
import { getTheme, applyTheme } from '../../utils/applyTheme.js';
import { getColorTheme, applyColorTheme } from '../../utils/applyColorTheme.js';

function getNavStats() {
  const totalDomains = certifications.reduce((sum, c) => sum + c.domains.length, 0);
  let domainsComplete = 0;
  let domainsStarted = 0;
  let totalCorrect = 0;
  let totalWrong = 0;

  for (const key of Object.keys(localStorage)) {
    if (!key.startsWith('qb_')) continue;
    const raw = localStorage.getItem(key);
    if (!raw) continue;
    try {
      const d = JSON.parse(raw);
      let correct, failed;
      if (d.answers && typeof d.answers === 'object') {
        correct = Object.values(d.answers).filter(v => v === true).length;
        failed  = Object.values(d.answers).filter(v => v === false).length;
      } else {
        correct = (d.correct || []).length;
        failed  = (d.failed  || []).length;
      }
      if (d.completed) { domainsComplete++; domainsStarted++; }
      else if (correct > 0) domainsStarted++;
      totalCorrect += correct;
      totalWrong   += failed;
    } catch {}
  }

  return { totalDomains, domainsComplete, domainsStarted, totalCorrect, totalWrong };
}

export async function renderNav(active) {
  const el = document.getElementById('nav');
  if (!el) return;

  const links = [
    { href: '/', label: 'Home' },
    { href: '/progress', label: 'Progress' },
  ];

  const { totalDomains, domainsComplete, domainsStarted, totalCorrect, totalWrong } = getNavStats();
  const domainLabel = domainsComplete > 0
    ? `${domainsComplete} done · ${domainsStarted} started`
    : `${domainsStarted} / ${totalDomains} started`;

  const totalQuestions = await getTotalQuestionCount();
  const correctPct = totalQuestions ? (totalCorrect / totalQuestions) * 100 : 0;
  const wrongPct   = totalQuestions ? (totalWrong   / totalQuestions) * 100 : 0;

  const rightLabel = (totalCorrect + totalWrong) > 0
    ? `<span class="nav-stat-correct">${totalCorrect} correct</span><span class="nav-stat-wrong">${totalWrong} wrong</span>`
    : `<span class="nav-stat-text">no answers yet</span>`;

  const isDark    = getTheme() === 'dark';
  const colorTheme = getColorTheme();
  const SWATCHES = [
    { id: 'navy',     label: 'Midnight Navy'  },
    { id: 'terminal', label: 'Terminal Green' },
    { id: 'amber',    label: 'Indigo Amber'   },
    { id: 'classic',  label: 'Classic'        },
    { id: 'pink',     label: 'Plush Pink'     },
  ];
  const swatches = SWATCHES.map(({ id, label }) =>
    `<button class="color-swatch swatch-${id}${colorTheme === id ? ' active' : ''}" data-c="${id}" title="${label}" aria-label="${label} theme"></button>`
  ).join('');

  el.innerHTML = `
    <nav class="nav">
      <a href="/" class="nav-logo"><img src="/icons/favicon.svg" alt="" class="nav-logo-img">QuizBuffet</a>
      <div class="nav-menu">
        ${links.map(l => `<a href="${l.href}" ${active === l.label ? 'class="active"' : ''}>${l.label}</a>`).join('')}
        <div class="color-swatches">${swatches}</div>
        <button class="theme-toggle" id="theme-toggle">${isDark ? 'Light' : 'Dark'}</button>
      </div>
    </nav>
    <div class="nav-stats">
      <span class="nav-stat-text">${domainLabel}</span>
      <div class="nav-stat-track">
        <div class="nav-stat-correct-fill" style="width:${correctPct}%"></div>
        <div class="nav-stat-wrong-fill"   style="width:${wrongPct}%"></div>
      </div>
      ${rightLabel}
    </div>`;

  document.getElementById('theme-toggle').addEventListener('click', () => {
    const next = getTheme() === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    document.getElementById('theme-toggle').textContent = next === 'dark' ? 'Light' : 'Dark';
  });

  document.querySelectorAll('.color-swatch').forEach(btn => {
    btn.addEventListener('click', () => {
      const c = btn.dataset.c;
      applyColorTheme(c);
      document.querySelectorAll('.color-swatch').forEach(b =>
        b.classList.toggle('active', b.dataset.c === c)
      );
    });
  });
}
