import { navigate } from '../../router/hashRouter.js';

export function renderMixQuizBtn(cert) {
  const el = document.getElementById('mix-quiz');
  if (!el) return;

  const url = `/quiz?cert=${cert.slug}&domain=__mix__`;
  el.innerHTML = `<button class="mix-quiz-btn" id="mix-quiz-btn">⇄ Mixed Quiz — all domains</button>`;

  document.getElementById('mix-quiz-btn').addEventListener('click', () => {
    // Clear any stale mixed session so a fresh shuffle starts
    const key = `qbs_${cert.slug}--__mix__`;
    sessionStorage.removeItem(key);
    sessionStorage.removeItem(`${key}_idx`);
    sessionStorage.removeItem(`${key}_failed`);
    sessionStorage.removeItem(`${key}_screen`);
    sessionStorage.removeItem(`${key}_session_ids`);
    sessionStorage.removeItem(`${key}_wrong`);
    sessionStorage.removeItem(`${key}_retake`);
    navigate(url);
  });
}
