function correctMessage(n) {
  if (n === 5)  return "5 in a row. You're locked in.";
  if (n === 10) return "10 straight. This is mastery.";
  if (n === 15) return "15 in a row. You're built different.";
  if (n === 20) return "20 correct. Absolute focus.";
  if (n === 25) return "25 in a row. The exam has no chance.";
  if (n === 30) return "30 straight. Dedication personified.";
  if (n === 35) return "35 in a row. Unstoppable.";
  if (n === 40) return "40 correct. That's legendary.";
  if (n === 50) return "50 in a row. You ARE the exam.";
  if (n % 10 === 0) return `${n} in a row. Unstoppable.`;
  return `${n} in a row. Keep pushing.`;
}

function wrongMessage(n) {
  if (n === 5)  return "Tough stretch. Slow down and read carefully.";
  if (n === 10) return "Take a breath. Re-read the explanations.";
  if (n === 15) return "Hard ones now = easy ones on exam day.";
  if (n === 20) return "These are making you stronger. Stay in it.";
  if (n === 25) return "Step back — understanding beats memorization.";
  if (n % 10 === 0) return `${n} wrong in a row. Every wrong answer is information. Use it.`;
  return `${n} wrong in a row. Don't rush. The answer is in there.`;
}

let timer = null;

export function showStreakToast(streak, type) {
  const msg = type === 'correct' ? correctMessage(streak) : wrongMessage(streak);

  let el = document.getElementById('streak-toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'streak-toast';
    document.body.appendChild(el);
  }

  el.textContent = msg;
  el.className = `streak-toast streak-toast--${type} streak-toast--show`;

  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    el.classList.remove('streak-toast--show');
  }, 3000);
}
