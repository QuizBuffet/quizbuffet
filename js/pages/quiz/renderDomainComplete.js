// Shows completed domain summary with retake-failed option — separate from renderResults because completed domains bypass session state
import { refresh } from '../../router/hashRouter.js';
import { resetDomain } from '../../storage/resetDomain.js';
import { getDomainProgress } from '../../storage/getDomainProgress.js';
import { affiliateLinksHTML } from '../../components/affiliates/affiliateLinksHTML.js';

export function renderDomainComplete(questions, failedIds, domainSlug, backLink = 'index.html', certMeta = null) {
  const failedSet  = new Set(failedIds);
  const passedIds  = questions.filter(q => !failedSet.has(q.id)).map(q => q.id);
  const passCount  = passedIds.length;

  const rows = questions.map(q => {
    const ok = !failedSet.has(q.id);
    return `
      <div class="result-item">
        <span class="${ok ? 'badge-pass' : 'badge-fail'}">${ok ? 'Pass' : 'Fail'}</span>
        <span class="result-question">${q.text}</span>
      </div>`;
  }).join('');

  const retakeFailedBtn = failedIds.length
    ? `<button class="next-btn" id="retake-failed-btn" style="margin-bottom:8px">Retake Failed (${failedIds.length})</button>`
    : '';
  const retakePassedBtn = passedIds.length
    ? `<button class="next-btn" id="retake-passed-btn" style="margin-bottom:8px">Retake Passed (${passedIds.length})</button>`
    : '';

  document.getElementById('question').innerHTML = `
    <p class="quiz-meta" style="margin-bottom:12px">Domain complete &middot; ${passCount} correct &middot; ${failedIds.length} wrong &middot; ${questions.length} total</p>
    <div class="results-list">${rows}</div>
    ${retakeFailedBtn}
    ${retakePassedBtn}
    <button class="next-btn" id="start-fresh" style="margin-top:8px">Start Fresh</button>
    <a href="${backLink}" class="next-btn" style="text-align:center;text-decoration:none;display:block;margin-top:8px">← Back</a>
    ${affiliateLinksHTML(certMeta?.affiliates)}`;
  document.getElementById('answers').innerHTML = '';
  document.getElementById('explanation').innerHTML = '';

  function startRetake(ids) {
    // Remove completed flag but keep answer history so progress isn't lost
    const { answers } = getDomainProgress(domainSlug);
    localStorage.setItem(`qb_${domainSlug}`, JSON.stringify({ answers, completed: false }));
    sessionStorage.setItem(`qbs_${domainSlug}`, JSON.stringify(ids));
    sessionStorage.setItem(`qbs_${domainSlug}_retake`, '1');
    sessionStorage.removeItem(`qbs_${domainSlug}_idx`);
    sessionStorage.removeItem(`qbs_${domainSlug}_failed`);
    sessionStorage.removeItem(`qbs_${domainSlug}_screen`);
    sessionStorage.removeItem(`qbs_${domainSlug}_session_ids`);
    sessionStorage.removeItem(`qbs_${domainSlug}_wrong`);
    refresh();
  }

  if (failedIds.length) {
    document.getElementById('retake-failed-btn').addEventListener('click', () => startRetake([...failedIds]));
  }

  if (passedIds.length) {
    document.getElementById('retake-passed-btn').addEventListener('click', () => startRetake(passedIds));
  }

  document.getElementById('start-fresh').addEventListener('click', () => {
    resetDomain(domainSlug);
    refresh();
  });
}
