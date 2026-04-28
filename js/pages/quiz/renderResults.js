// Shows end-of-session results screen — saves screen state so re-entering the quiz route lands back here
import { refresh } from '../../router/hashRouter.js';
import { saveScreenState } from '../../state/saveScreenState.js';
import { getDomainProgress } from '../../storage/getDomainProgress.js';
import { saveSessionHistory } from '../../storage/saveSessionHistory.js';

export function renderResults(queue, domainSlug, backLink = 'index.html', totalCount = 0) {
  const failedIds = new Set(JSON.parse(sessionStorage.getItem(`qbs_${domainSlug}_failed`) || '[]'));
  const passCount = queue.filter(q => !failedIds.has(q.id)).length;
  const failedList = [...failedIds];

  saveScreenState(domainSlug, queue.map(q => q.id));
  saveSessionHistory(domainSlug, passCount, queue.length);

  const { correct } = getDomainProgress(domainSlug);
  const remaining = totalCount > 0 ? totalCount - correct.length : 0;

  const rows = queue.map(q => {
    const ok = !failedIds.has(q.id);
    const domainTag = q._domainName ? `<span class="result-domain">${q._domainName}</span>` : '';
    return `
      <div class="result-item">
        <span class="${ok ? 'badge-pass' : 'badge-fail'}">${ok ? 'Pass' : 'Fail'}</span>
        <span class="result-question">${domainTag}${q.text}</span>
      </div>`;
  }).join('');

  const passedList = queue.filter(q => !failedIds.has(q.id)).map(q => q.id);

  const continueBtn = remaining > 0
    ? `<button class="next-btn" id="continue-btn" style="margin-bottom:8px">Continue — ${remaining} question${remaining !== 1 ? 's' : ''} remaining →</button>`
    : '';
  const retakeFailedBtn = failedList.length
    ? `<button class="next-btn" id="retake-failed-btn" style="margin-bottom:8px">Retake Failed (${failedList.length})</button>`
    : '';
  const retakePassedBtn = passedList.length
    ? `<button class="next-btn" id="retake-passed-btn" style="margin-bottom:8px">Retake Passed (${passedList.length})</button>`
    : '';

  document.getElementById('question').innerHTML = `
    <p class="quiz-meta" style="margin-bottom:12px">${passCount} correct &middot; ${failedList.length} wrong &middot; ${queue.length} total</p>
    <div class="results-list">${rows}</div>
    ${continueBtn}
    ${retakeFailedBtn}
    ${retakePassedBtn}
    <a href="${backLink}" class="next-btn" style="text-align:center;text-decoration:none;display:block;margin-top:8px">← Back</a>`;
  document.getElementById('answers').innerHTML = '';
  document.getElementById('explanation').innerHTML = '';

  function clearSession() {
    sessionStorage.removeItem(`qbs_${domainSlug}_idx`);
    sessionStorage.removeItem(`qbs_${domainSlug}_failed`);
    sessionStorage.removeItem(`qbs_${domainSlug}_screen`);
    sessionStorage.removeItem(`qbs_${domainSlug}_session_ids`);
    sessionStorage.removeItem(`qbs_${domainSlug}_wrong`);
    sessionStorage.removeItem(`qbs_${domainSlug}_retake`);
  }

  if (remaining > 0) {
    document.getElementById('continue-btn').addEventListener('click', () => {
      // Keep order + idx so the next batch continues from where we left off
      sessionStorage.removeItem(`qbs_${domainSlug}_failed`);
      sessionStorage.removeItem(`qbs_${domainSlug}_screen`);
      sessionStorage.removeItem(`qbs_${domainSlug}_session_ids`);
      sessionStorage.removeItem(`qbs_${domainSlug}_wrong`);
      sessionStorage.removeItem(`qbs_${domainSlug}_retake`);
      refresh();
    });
  }

  if (failedList.length) {
    document.getElementById('retake-failed-btn').addEventListener('click', () => {
      clearSession();
      sessionStorage.setItem(`qbs_${domainSlug}`, JSON.stringify(failedList));
      sessionStorage.setItem(`qbs_${domainSlug}_retake`, '1');
      refresh();
    });
  }

  if (passedList.length) {
    document.getElementById('retake-passed-btn').addEventListener('click', () => {
      clearSession();
      sessionStorage.setItem(`qbs_${domainSlug}`, JSON.stringify(passedList));
      sessionStorage.setItem(`qbs_${domainSlug}_retake`, '1');
      refresh();
    });
  }
}
