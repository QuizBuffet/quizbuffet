// Readable rundown of each domain — weight, name, and a one-line tie back to the exam.
// Gives the page substantive body copy beyond the dashboard cards.
export function renderCertWhatYouLearn(cert) {
  const el = document.getElementById('cert-what-you-learn');
  if (!el) return;

  el.innerHTML = `
    <section class="cert-learn">
      <h2 class="cert-section-title">What ${cert.code} covers</h2>
      <p class="cert-learn-lead">
        The ${cert.name} exam is organized into ${cert.domains.length} domains weighted by the official exam guide.
        Our practice tests follow the same breakdown, so the time you spend here mirrors the time you'll spend on exam day.
      </p>
      <ol class="cert-learn-list">
        ${cert.domains.map((d, i) => {
          const num = (d.number || '').toString().replace(/\.0$/, '') || String(i + 1);
          return `
            <li class="cert-learn-item">
              <div class="cert-learn-head">
                <span class="cert-learn-num">${num}</span>
                <h3 class="cert-learn-name">${d.name}</h3>
                <span class="cert-learn-weight">${d.weight}% of exam</span>
              </div>
              <p class="cert-learn-desc">
                Practice ${d.name.toLowerCase()} questions modeled on the real ${cert.code} exam.
                <a href="/${cert.slug}/${d.slug}/">Drill this domain →</a>
              </p>
            </li>`;
        }).join('')}
      </ol>
    </section>`;
}
