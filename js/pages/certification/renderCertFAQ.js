// Visible FAQ section. Mirrors the FAQPage JSON-LD already emitted by build-seo,
// so search snippets and on-page content align.
export function renderCertFAQ(cert, totalQ) {
  const el = document.getElementById('cert-faq');
  if (!el) return;

  const total = totalQ ? totalQ.toLocaleString() : 'hundreds of';
  const faq = [
    {
      q: `Is the ${cert.name} practice test really free?`,
      a: `Yes. All ${total} ${cert.code} practice questions on QuizBuffet are free, with no account, signup, or email required. Your progress is saved locally in your browser.`,
    },
    {
      q: `How many questions are on the ${cert.code} exam?`,
      a: cert.details || `Refer to the official ${cert.vendor} exam guide for the latest format and passing score.`,
    },
    {
      q: `How is this practice test structured?`,
      a: `Questions are grouped into ${cert.domains.length} domains matching the official ${cert.code} exam outline. Each question is tagged by sub-objective and difficulty (easy, medium, medium-hard, hard), so you can drill the topics you find hardest.`,
    },
    {
      q: `What happens when I get a question wrong?`,
      a: `You'll see a contrastive explanation showing why your choice was wrong and what the correct concept is. Wrong answers are queued for a "missed questions" retake at the end of the session.`,
    },
    {
      q: `Does my progress save between sessions?`,
      a: `Yes — your domain progress, missed questions, and completion state are stored in your browser's localStorage. Nothing is uploaded. Clearing your browser data will reset progress.`,
    },
    {
      q: `What should I do after I finish a domain?`,
      a: `Move to your weakest domain next (shown at the top of this page if you've answered any questions). Once every domain is at 80%+, take the Mix Quiz to simulate exam conditions across all topics.`,
    },
  ];

  el.innerHTML = `
    <section class="cert-faq">
      <h2 class="cert-section-title">Frequently asked questions</h2>
      <div class="cert-faq-list">
        ${faq.map((f, i) => `
          <details class="cert-faq-item"${i === 0 ? ' open' : ''}>
            <summary>${f.q}</summary>
            <p>${f.a}</p>
          </details>`).join('')}
      </div>
    </section>`;
}
