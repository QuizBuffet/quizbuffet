// Renders start/continue/retake/reset buttons — navigates to quiz route with correct session state set
import { navigate, refresh } from '../../router/hashRouter.js';
import { resetDomain } from '../../storage/resetDomain.js';
import { getDomainProgress } from '../../storage/getDomainProgress.js';
import { getFlaggedQuestions } from '../../storage/getFlaggedQuestions.js';

export function renderDomainActions(storageKey, prog, questions, quizUrl) {
  const el = document.getElementById('domain-actions');
  if (!el) return;

  const correct   = prog.correct;
  const failed    = prog.failed;
  const totalCount = questions.length;
  const notStarted = correct.length === 0 && failed.length === 0 && !prog.completed;

  let html = '';
  if (notStarted) {
    html = `<a href="${quizUrl}" class="domain-action-btn domain-action-primary">Start Quiz →</a>`;
  } else if (prog.completed) {
    html = `
      <button class="domain-action-btn domain-action-primary" id="retake-all-btn" aria-label="Retake all ${totalCount} questions">Retake All (${totalCount})</button>
      <button class="domain-action-btn domain-action-danger" id="start-fresh-btn" aria-label="Reset all progress for this domain and start over">Start Fresh</button>`;
  } else {
    html = `<a href="${quizUrl}" class="domain-action-btn domain-action-primary" id="continue-btn">Continue →</a>`;
    if (failed.length)   html += `<button class="domain-action-btn" id="retake-failed-btn" aria-label="Retake ${failed.length} questions you got wrong">Retake Failed (${failed.length})</button>`;
    if (correct.length)  html += `<button class="domain-action-btn" id="retake-passed-btn" aria-label="Retake ${correct.length} questions you got right">Retake Passed (${correct.length})</button>`;
    html += `<button class="domain-action-btn domain-action-danger" id="start-fresh-btn" aria-label="Reset all progress for this domain and start over">Start Fresh</button>`;
  }

  const flagged = getFlaggedQuestions(storageKey);
  const flaggedInDomain = flagged.filter(id => questions.some(q => q.id === id));
  if (flaggedInDomain.length) {
    html += `<button class="domain-action-btn domain-action-flag" id="review-flagged-btn">Review Flagged (${flaggedInDomain.length})</button>`;
  }

  el.innerHTML = `<div class="domain-actions-row">${html}</div>`;

  function clearSession() {
    sessionStorage.removeItem(`qbs_${storageKey}_idx`);
    sessionStorage.removeItem(`qbs_${storageKey}_failed`);
    sessionStorage.removeItem(`qbs_${storageKey}_screen`);
    sessionStorage.removeItem(`qbs_${storageKey}_session_ids`);
    sessionStorage.removeItem(`qbs_${storageKey}_wrong`);
    sessionStorage.removeItem(`qbs_${storageKey}_retake`);
  }

  function startRetake(ids) {
    clearSession();
    // Remove completed flag but keep answer history
    const { answers } = getDomainProgress(storageKey);
    if (prog.completed) localStorage.setItem(`qb_${storageKey}`, JSON.stringify({ answers, completed: false }));
    sessionStorage.setItem(`qbs_${storageKey}`, JSON.stringify(ids));
    sessionStorage.setItem(`qbs_${storageKey}_retake`, '1');
    navigate(quizUrl);
  }

  document.getElementById('continue-btn')?.addEventListener('click', () => {
    // Clear results screen state so quiz resumes next batch, not old results
    sessionStorage.removeItem(`qbs_${storageKey}_screen`);
    sessionStorage.removeItem(`qbs_${storageKey}_session_ids`);
    sessionStorage.removeItem(`qbs_${storageKey}_failed`);
    sessionStorage.removeItem(`qbs_${storageKey}_wrong`);
    sessionStorage.removeItem(`qbs_${storageKey}_retake`);
  });

  document.getElementById('retake-all-btn')?.addEventListener('click', () =>
    startRetake(questions.map(q => q.id))
  );

  document.getElementById('retake-failed-btn')?.addEventListener('click', () =>
    startRetake(failed.map(String))
  );

  document.getElementById('retake-passed-btn')?.addEventListener('click', () =>
    startRetake(correct.map(String))
  );

  document.getElementById('review-flagged-btn')?.addEventListener('click', () =>
    startRetake(flaggedInDomain.map(String))
  );

  document.getElementById('start-fresh-btn')?.addEventListener('click', () => {
    if (!confirm('Reset all progress for this domain? This cannot be undone.')) return;
    resetDomain(storageKey);
    refresh();
  });
}
