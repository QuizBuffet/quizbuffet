// Handles answer selection: highlights result, saves correct answer, shows explanation, refreshes ad
import { saveCorrectAnswer } from '../../storage/saveCorrectAnswer.js';
import { saveFailedAnswer } from '../../storage/saveFailedAnswer.js';
import { markDomainComplete } from '../../storage/markDomainComplete.js';
import { getDomainProgress } from '../../storage/getDomainProgress.js';
import { renderExplanation } from '../../components/explanation/renderExplanation.js';
import { renderAd } from '../../components/ad/renderAd.js';
import { advanceSessionIndex } from '../../state/advanceSessionIndex.js';
import { saveWrongAnswer } from '../../state/saveWrongAnswer.js';
import { trackFailedAnswer } from '../../state/trackFailedAnswer.js';
import { incrementErrorCount } from '../../storage/incrementErrorCount.js';

// domainSlug = session key (sessionStorage); questionStorageKey = per-question domain key (localStorage)
// In mixed-domain mode these differ: session key is certSlug--__mix__, save key is the question's actual domain
export function handleAnswer(question, chosen, domainSlug, totalCount, onNext, questionStorageKey = domainSlug) {
  advanceSessionIndex(domainSlug);

  document.querySelectorAll('.answer-btn').forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.id === question.correct) btn.classList.add('correct');
    else if (btn.dataset.id === chosen) btn.classList.add('wrong');
  });

  saveWrongAnswer(domainSlug, question.id, chosen);

  if (chosen === question.correct) {
    saveCorrectAnswer(questionStorageKey, question.id);
    if (totalCount > 0) {
      const { correct } = getDomainProgress(questionStorageKey);
      if (correct.length >= totalCount) markDomainComplete(questionStorageKey);
    }
  } else {
    trackFailedAnswer(domainSlug, question.id);
    saveFailedAnswer(questionStorageKey, question.id);
    incrementErrorCount(questionStorageKey, question.id);
  }

  renderExplanation(question, onNext);

  const mid = document.getElementById('ad-mid');
  if (mid) { mid.style.display = 'block'; renderAd('ad-mid'); }
}
