// Handles answer selection: highlights result, saves correct answer, shows explanation, refreshes ad
import { saveCorrectAnswer } from '../../storage/saveCorrectAnswer.js';
import { saveFailedAnswer } from '../../storage/saveFailedAnswer.js';
import { markDomainComplete } from '../../storage/markDomainComplete.js';
import { getDomainProgress } from '../../storage/getDomainProgress.js';
import { renderExplanation } from '../../components/explanation/renderExplanation.js';
import { advanceSessionIndex } from '../../state/advanceSessionIndex.js';
import { saveWrongAnswer } from '../../state/saveWrongAnswer.js';
import { trackFailedAnswer } from '../../state/trackFailedAnswer.js';
import { incrementErrorCount } from '../../storage/incrementErrorCount.js';
import { recordCorrect, recordWrong } from '../../storage/streak.js';
import { showStreakToast } from '../../components/streakToast/showStreakToast.js';
import { playCorrect, playWrong } from '../../utils/playSound.js';
import { stopTimer } from '../../utils/questionTimer.js';
import { trackConversion } from '../../analytics/trackConversion.js';

// Fires the answered_10 conversion once per browser session, the first time the visitor
// crosses 10 total answered questions (any domain, correct or wrong).
function trackAnsweredMilestone() {
  try {
    if (sessionStorage.getItem('qb_conv_answered10')) return;
    const n = parseInt(sessionStorage.getItem('qb_answered') || '0', 10) + 1;
    sessionStorage.setItem('qb_answered', String(n));
    if (n >= 10) {
      sessionStorage.setItem('qb_conv_answered10', '1');
      trackConversion('answered_10');
    }
  } catch (_) {}
}

// domainSlug = session key (sessionStorage); questionStorageKey = per-question domain key (localStorage)
// In mixed-domain mode these differ: session key is certSlug--__mix__, save key is the question's actual domain
export function handleAnswer(question, chosen, domainSlug, totalCount, onNext, questionStorageKey = domainSlug) {
  advanceSessionIndex(domainSlug);
  stopTimer();

  document.querySelectorAll('.answer-btn').forEach(btn => {
    btn.disabled = true;
    const isCorrect = btn.dataset.id === question.correct;
    const isChosen  = btn.dataset.id === chosen;
    if (isCorrect) { btn.classList.add('correct'); btn.setAttribute('aria-label', `${btn.dataset.id.toUpperCase()}: Correct answer`); }
    else if (isChosen) { btn.classList.add('wrong'); btn.setAttribute('aria-label', `${btn.dataset.id.toUpperCase()}: Incorrect`); }
  });

  saveWrongAnswer(domainSlug, question.id, chosen);
  trackAnsweredMilestone();

  if (chosen === question.correct) {
    playCorrect();
    saveCorrectAnswer(questionStorageKey, question.id);
    if (totalCount > 0) {
      const { correct } = getDomainProgress(questionStorageKey);
      if (correct.length >= totalCount) {
        markDomainComplete(questionStorageKey);
        if (typeof gtag === 'function') {
          gtag('event', 'domain_complete', { domain: questionStorageKey, total: totalCount });
        }
        trackConversion('domain_complete');
      }
    }
    const streak = recordCorrect();
    if (streak % 5 === 0) showStreakToast(streak, 'correct');
    if (typeof gtag === 'function') gtag('event', 'quiz_correct', { domain: domainSlug });
  } else {
    playWrong();
    trackFailedAnswer(domainSlug, question.id);
    saveFailedAnswer(questionStorageKey, question.id);
    incrementErrorCount(questionStorageKey, question.id);
    const streak = recordWrong();
    if (streak % 5 === 0) showStreakToast(streak, 'wrong');
    if (typeof gtag === 'function') gtag('event', 'quiz_wrong', { domain: domainSlug });
  }

  renderExplanation(question, onNext);

}
