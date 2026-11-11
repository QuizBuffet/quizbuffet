// Handles answer selection: highlights result, saves progress, sends the question_answered event, shows explanation
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
import { trackEvent } from '../../analytics/trackEvent.js';
import { splitStorageKey } from '../../analytics/splitStorageKey.js';

// Fires answered_10 once per browser session, the first time the visitor crosses 10
// answered questions (any domain): the "actually studying" engagement milestone.
function trackAnsweredMilestone(cert) {
  try {
    if (sessionStorage.getItem('qb_ev_answered10')) return;
    const n = parseInt(sessionStorage.getItem('qb_answered') || '0', 10) + 1;
    sessionStorage.setItem('qb_answered', String(n));
    if (n >= 10) {
      sessionStorage.setItem('qb_ev_answered10', '1');
      trackEvent('answered_10', { cert });
    }
  } catch (_) {}
}

// Seconds on this question, read from the timer's start stamp before it is cleared.
function secondsOnQuestion() {
  try {
    const start = Number(sessionStorage.getItem('qb_timer_start'));
    return start ? Math.max(0, Math.round((Date.now() - start) / 1000)) : undefined;
  } catch (_) { return undefined; }
}

// domainSlug = session key (sessionStorage); questionStorageKey = per-question domain key (localStorage)
// In mixed-domain mode these differ: session key is certSlug--__mix__, save key is the question's actual domain
export function handleAnswer(question, chosen, domainSlug, totalCount, onNext, questionStorageKey = domainSlug) {
  const seconds = secondsOnQuestion();
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
  const { cert, domain } = splitStorageKey(questionStorageKey);
  const isRight = chosen === question.correct;
  trackEvent('question_answered', {
    cert, domain,
    mode: domainSlug.endsWith('--__mix__') ? 'mix' : 'domain',
    question_id: `${cert}/${domain}#${question.id}`,
    objective: question.objective || '',
    difficulty: question.difficulty || '',
    result: isRight ? 'correct' : 'wrong',
    chosen, seconds,
  });
  trackAnsweredMilestone(cert);

  if (isRight) {
    playCorrect();
    saveCorrectAnswer(questionStorageKey, question.id);
    if (totalCount > 0) {
      const { correct } = getDomainProgress(questionStorageKey);
      if (correct.length >= totalCount) {
        markDomainComplete(questionStorageKey);
        trackEvent('domain_complete', { cert, domain, total: totalCount });
      }
    }
    const streak = recordCorrect();
    if (streak % 5 === 0) showStreakToast(streak, 'correct');
  } else {
    playWrong();
    trackFailedAnswer(domainSlug, question.id);
    saveFailedAnswer(questionStorageKey, question.id);
    incrementErrorCount(questionStorageKey, question.id);
    const streak = recordWrong();
    if (streak % 5 === 0) showStreakToast(streak, 'wrong');
  }

  renderExplanation(question, onNext);

}
