// Shows why each answer is correct or wrong after the user submits an answer
export function renderExplanation(question, onNext) {
  const items = question.answers.map(a => {
    const isCorrect = a.id === question.correct;
    const cls = isCorrect ? 'explanation-correct' : 'explanation-wrong';
    const mark = isCorrect ? '✓' : '✗';
    return `
      <div class="explanation-item">
        <span class="${cls}">${mark} ${a.text}</span>
        <small>${question.explanations[a.id]}</small>
      </div>`;
  }).join('');

  const subject = encodeURIComponent(`Question report: ${question.id}`);
  const body    = encodeURIComponent(`Question ID: ${question.id}\n\nIssue:\n`);
  const report  = `<a class="report-link" href="mailto:quizbuffetinfo@gmail.com?subject=${subject}&body=${body}">Report this question</a>`;

  const el = document.getElementById('explanation');
  el.innerHTML =
    `<button class="next-btn" id="next-btn">Next Question →</button>
     <div class="explanation">${items}</div>
     ${report}`;

  document.getElementById('next-btn').addEventListener('click', onNext);

  // Scroll the next button into view on mobile
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
