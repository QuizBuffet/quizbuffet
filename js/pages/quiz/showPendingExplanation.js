// Re-renders a previously wrong-answered question with explanation intact after a reload
import { renderQuestion } from '../../components/question/renderQuestion.js';
import { renderExplanation } from '../../components/explanation/renderExplanation.js';

export function showPendingExplanation(question, chosen, onNext) {
  renderQuestion(question, () => {}); // render buttons but block new answers

  document.querySelectorAll('.answer-btn').forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.id === question.correct) btn.classList.add('correct');
    else if (btn.dataset.id === chosen) btn.classList.add('wrong');
  });

  renderExplanation(question, onNext);
}
