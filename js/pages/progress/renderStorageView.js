import { certifications } from '../../data/certifications/index.js';
import { getDomainProgress } from '../../storage/getDomainProgress.js';
import { resetDomain } from '../../storage/resetDomain.js';

export function renderStorageView(onReset) {
  const el = document.getElementById('progress-certs');
  if (!el) return;

  const cards = [];

  for (const cert of certifications) {
    let certCorrect = 0, certFailed = 0, certComplete = 0, certStarted = 0;

    const domainRows = cert.domains.map(domain => {
      const key = `${cert.slug}--${domain.slug}`;
      const prog = getDomainProgress(key);
      const c = prog.correct.length;
      const f = prog.failed.length;

      if (prog.completed) { certComplete++; certStarted++; certCorrect += c; certFailed += f; }
      else if (c > 0 || f > 0) { certStarted++; certCorrect += c; certFailed += f; }

      if (!prog.completed && c === 0 && f === 0) {
        return `<div class="prog-domain-row prog-domain-empty">
          <span class="prog-status">–</span>
          <a class="prog-domain-name" href="/${cert.slug}/${domain.slug}/">${domain.name}</a>
          <span class="prog-domain-stats">Not started</span>
        </div>`;
      }

      const attempted = c + f;
      const acc = attempted > 0 ? Math.round(c / attempted * 100) : 100;
      const barPct = prog.completed ? 100 : acc;
      const icon = prog.completed ? '✓' : '▶';
      const cls  = prog.completed ? 'prog-domain-done' : 'prog-domain-active';
      const stats = prog.completed
        ? `${c} correct · Complete`
        : `${c} correct · ${f} wrong · ${acc}%`;

      return `<div class="prog-domain-row ${cls}">
        <span class="prog-status">${icon}</span>
        <a class="prog-domain-name" href="/${cert.slug}/${domain.slug}/">${domain.name}</a>
        <span class="prog-domain-mid">
          <span class="prog-mini-bar-wrap"><span class="prog-mini-bar" style="width:${barPct}%"></span></span>
          <span class="prog-domain-stats">${stats}</span>
        </span>
        <button class="prog-reset-btn" data-key="${key}" title="Reset ${domain.name}" aria-label="Reset progress for ${domain.name}">✕</button>
      </div>`;
    });

    if (!certStarted) continue;

    const certAttempted = certCorrect + certFailed;
    const certAcc = certAttempted > 0 ? Math.round(certCorrect / certAttempted * 100) : 0;
    const certBarPct = certAttempted > 0 ? certAcc : 0;

    cards.push(`<div class="prog-cert-card" data-cert="${cert.slug}">
      <div class="prog-cert-header">
        <div class="prog-cert-header-row">
          <span class="prog-cert-name">${cert.name}</span>
          <button class="prog-cert-reset-btn" data-cert="${cert.slug}" title="Reset all ${cert.name} progress" aria-label="Reset all ${cert.name} progress">Reset cert</button>
        </div>
        <span class="prog-cert-meta">${cert.code} · ${certComplete}/${cert.domains.length} complete · ${certCorrect} correct · ${certAcc}% accuracy</span>
        <div class="prog-cert-bar-wrap"><div class="prog-cert-bar" style="width:${certBarPct}%"></div></div>
      </div>
      ${domainRows.join('')}
    </div>`);
  }

  el.innerHTML = cards.length
    ? cards.join('')
    : `<p class="prog-empty">No progress saved yet.</p>`;

  // Per-domain reset (single domain)
  el.querySelectorAll('.prog-reset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.closest('.prog-domain-row').querySelector('.prog-domain-name').textContent;
      if (!confirm(`Reset "${name}"? This cannot be undone.`)) return;
      resetDomain(btn.dataset.key);
      onReset();
    });
  });

  // Per-cert reset (all domains of one cert)
  el.querySelectorAll('.prog-cert-reset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const slug = btn.dataset.cert;
      const cert = certifications.find(c => c.slug === slug);
      if (!cert) return;
      if (!confirm(`Reset all progress for ${cert.name}? This will clear ${cert.domains.length} domain${cert.domains.length === 1 ? '' : 's'} and cannot be undone.`)) return;
      for (const d of cert.domains) {
        resetDomain(`${cert.slug}--${d.slug}`);
      }
      onReset();
    });
  });
}
