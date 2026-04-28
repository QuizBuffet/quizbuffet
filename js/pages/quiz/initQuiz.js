// Entry point for the quiz route — resolves cert/domain from hash params, resumes session state
import { initKeyboard } from './initKeyboard.js';
import { renderAd } from '../../components/ad/renderAd.js';
import { setMeta } from '../../components/meta/setMeta.js';
import { setJsonLd } from '../../components/meta/setJsonLd.js';
import { loadDomain } from '../../loader/loadDomain.js';
import { loadAllDomains } from '../../loader/loadAllDomains.js';
import { getRouteParams } from '../../router/initRouter.js';
import { getDomainProgress } from '../../storage/getDomainProgress.js';
import { getSessionQueue } from '../../state/getSessionQueue.js';
import { getWrongAnswer } from '../../state/getWrongAnswer.js';
import { clearWrongAnswer } from '../../state/clearWrongAnswer.js';
import { showPendingExplanation } from './showPendingExplanation.js';
import { renderDomainComplete } from './renderDomainComplete.js';
import { renderResults } from './renderResults.js';
import { loadNextQuestion } from './loadNextQuestion.js';
import { certifications } from '../../data/certifications/index.js';

export async function init() {
  renderAd('ad-top');
  initKeyboard();

  const { cert: certSlug, domain: domainSlug } = getRouteParams();
  const limit = (() => { const s = localStorage.getItem('qb_session_size'); return s ? parseInt(s) : null; })();
  const storageKey = certSlug ? `${certSlug}--${domainSlug}` : domainSlug;
  const certMeta = certifications.find(c => c.slug === certSlug);

  if (!domainSlug) {
    document.getElementById('question').innerHTML = `<p>No domain selected. <a href="/">← Back</a></p>`;
    return;
  }

  // ── Mixed-domain mode ──────────────────────────────────────────────────────
  if (domainSlug === '__mix__') {
    const backLink = certSlug ? `/cert?cert=${certSlug}` : '/';
    const mixName  = certMeta ? `${certMeta.name} Mix` : 'Mixed Quiz';
    setMeta(mixName, `Free mixed practice test across all ${certMeta?.name || ''} domains. No account needed — instant feedback on every question.`);
    setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Quiz',
      'name': `${mixName} Free Practice Quiz`,
      'description': `Free mixed practice test covering all ${certMeta?.name || ''} exam domains. Randomized questions with instant feedback.`,
      'url': `https://quizbuffet.com/quiz?cert=${certSlug}&domain=__mix__`,
      'numberOfQuestions': allQ.length,
      'educationalLevel': 'Professional',
      'provider': { '@type': 'EducationalOrganization', 'name': 'QuizBuffet', 'url': 'https://quizbuffet.com' },
      'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD', 'availability': 'https://schema.org/InStock' },
    });

    const allQ  = await loadAllDomains(certMeta);
    const qMap  = Object.fromEntries(allQ.map(q => [q.id, q]));

    // Re-show results screen if user navigates back to a finished session
    const screen = sessionStorage.getItem(`qbs_${storageKey}_screen`);
    if (screen === 'results') {
      document.getElementById('quiz-meta').textContent = `${mixName} · Session results`;
      const sessionIds = JSON.parse(sessionStorage.getItem(`qbs_${storageKey}_session_ids`) || '[]');
      const sessionQueue = sessionIds.filter(id => qMap[id]).map(id => qMap[id]);
      renderResults(sessionQueue, storageKey, backLink, 0);
      return;
    }

    // Pending explanation survives reload
    const pending = getWrongAnswer(storageKey);
    const savedOrder = JSON.parse(sessionStorage.getItem(`qbs_${storageKey}`) || 'null');
    const pos = parseInt(sessionStorage.getItem(`qbs_${storageKey}_idx`) || '0');
    const isRetake = !!sessionStorage.getItem(`qbs_${storageKey}_retake`);

    let queue;
    if (savedOrder) {
      queue = savedOrder.slice(pos).filter(id => qMap[id]).map(id => qMap[id]);
    } else {
      queue = limit ? allQ.slice(0, limit) : allQ;
      sessionStorage.setItem(`qbs_${storageKey}`, JSON.stringify(queue.map(q => q.id)));
    }

    if (!queue.length) {
      document.getElementById('question').innerHTML = `<p style="padding:12px 0">No questions available. <a href="${backLink}">← Back</a></p>`;
      return;
    }

    if (pending) {
      const wrongQ = qMap[pending.questionId];
      if (wrongQ) {
        showPendingExplanation(wrongQ, pending.chosen, () => {
          clearWrongAnswer(storageKey);
          loadNextQuestion(queue, 0, storageKey, mixName, backLink, 0);
        });
        return;
      }
      clearWrongAnswer(storageKey);
    }

    loadNextQuestion(queue, 0, storageKey, mixName, backLink, 0);
    return;
  }

  // ── Single-domain mode ─────────────────────────────────────────────────────
  const domainMeta = certMeta?.domains.find(d => d.slug === domainSlug);
  const domainName = domainMeta?.name || domainSlug;
  const backLink   = certSlug ? `/domain?cert=${certSlug}&domain=${domainSlug}` : '/';

  const questions = await loadDomain(certSlug, domainSlug, certMeta);

  if (!questions.length) {
    const subject = encodeURIComponent(`Missing questions: ${certSlug} / ${domainSlug}`);
    const body    = encodeURIComponent(`Hi,\n\nNo questions loaded for:\nCert: ${certSlug}\nDomain: ${domainSlug}\n`);
    document.getElementById('question').innerHTML =
      `<p style="padding:12px 0">No questions available for this domain yet.</p>
       <p style="padding:4px 0;font-size:14px"><a href="${backLink}">← Back</a> &nbsp;·&nbsp; <a href="mailto:quizbuffetinfo@gmail.com?subject=${subject}&body=${body}">Report missing content</a></p>`;
    return;
  }

  if (domainMeta) {
    setMeta(
      `${domainMeta.name} — ${certMeta?.name} (${certMeta?.code}) Practice`,
      `Free ${certMeta?.name} — ${domainMeta.name} practice quiz. ${questions.length} exam-style questions with instant feedback. No account needed.`
    );
    setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Quiz',
      'name': `${domainMeta.name} — ${certMeta?.name} Free Practice Quiz`,
      'description': `Free ${domainMeta.name} practice quiz for the ${certMeta?.name} (${certMeta?.code}) exam. ${questions.length} questions with instant feedback and explanations.`,
      'url': `https://quizbuffet.com/quiz?cert=${certSlug}&domain=${domainSlug}`,
      'numberOfQuestions': questions.length,
      'educationalLevel': 'Professional',
      'teaches': domainMeta.name,
      'provider': { '@type': 'EducationalOrganization', 'name': 'QuizBuffet', 'url': 'https://quizbuffet.com' },
      'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD', 'availability': 'https://schema.org/InStock' },
    });
  }

  const prog = getDomainProgress(storageKey);

  if (prog.completed) {
    document.getElementById('quiz-meta').textContent = `${domainName} · Completed`;
    renderDomainComplete(questions, prog.failed, storageKey, backLink);
    return;
  }

  const screen = sessionStorage.getItem(`qbs_${storageKey}_screen`);
  if (screen === 'results') {
    document.getElementById('quiz-meta').textContent = `${domainName} · Session results`;
    const sessionIds = JSON.parse(sessionStorage.getItem(`qbs_${storageKey}_session_ids`) || '[]');
    const map = Object.fromEntries(questions.map(q => [q.id, q]));
    const sessionQueue = sessionIds.filter(id => map[id]).map(id => map[id]);
    renderResults(sessionQueue, storageKey, backLink, questions.length);
    return;
  }

  const queue = getSessionQueue(questions, prog.correct, storageKey, limit);

  const pending = getWrongAnswer(storageKey);
  if (pending) {
    const wrongQ = questions.find(q => q.id === pending.questionId);
    if (wrongQ) {
      showPendingExplanation(wrongQ, pending.chosen, () => {
        clearWrongAnswer(storageKey);
        loadNextQuestion(queue, 0, storageKey, domainName, backLink, questions.length);
      });
      return;
    }
    clearWrongAnswer(storageKey);
  }

  if (!queue.length) {
    document.getElementById('question').innerHTML = `<p style="padding:12px 0">No questions remaining. <a href="${backLink}">← Back</a></p>`;
    return;
  }

  loadNextQuestion(queue, 0, storageKey, domainName, backLink, questions.length);
}
