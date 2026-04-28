// Interactive acronym flashcard drill — collapsed by default so it doesn't delay the cert page render
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function renderAcronymDrill(cert) {
  const el = document.getElementById('acronym-drill');
  if (!el || !cert.acronyms || !cert.acronyms.length) return;

  const deck = shuffle([...cert.acronyms]);
  let idx = 0;
  let open = false;
  let tileWords = null; // set when hint is shown

  function render() {
    const done = idx >= deck.length;
    el.innerHTML = `
      <button class="acronym-toggle" id="acr-toggle">
        Acronyms (${deck.length}) ${open ? '▴' : '▾'}
      </button>
      ${open ? (done ? renderDone() : renderCard()) : ''}`;

    document.getElementById('acr-toggle').addEventListener('click', () => {
      open = !open;
      render();
      if (open && !done) document.getElementById('acr-input')?.focus();
    });

    if (open && done) {
      document.getElementById('acr-restart').addEventListener('click', () => {
        shuffle(deck);
        idx = 0;
        tileWords = null;
        render();
        document.getElementById('acr-input')?.focus();
      });
    }

    if (open && !done) bindCard();
  }

  function renderCard() {
    const { a } = deck[idx];
    const hintSection = tileWords
      ? renderTiles(tileWords)
      : `<input class="acronym-input" id="acr-input" type="text" placeholder="Type the full name…" autocomplete="off" autocorrect="off" spellcheck="false">
         <button class="acronym-hint-btn" id="acr-hint-btn">Hint — show word tiles</button>`;
    return `
      <div class="acronym-card">
        <div class="acronym-progress">${idx + 1} / ${deck.length}</div>
        <div class="acronym-term">${a}</div>
        ${hintSection}
        <div class="acronym-feedback" id="acr-feedback"></div>
        <button class="acronym-skip" id="acr-skip">Skip →</button>
      </div>`;
  }

  function renderTiles(words) {
    const tiles = words.map((w, i) =>
      `<button class="acronym-tile" data-i="${i}">${w}</button>`
    ).join('');
    return `
      <div class="acronym-tiles" id="acr-tiles">${tiles}</div>
      <div class="acronym-building" id="acr-building"></div>`;
  }

  function renderDone() {
    return `
      <div class="acronym-card">
        <p class="acronym-done">All ${deck.length} acronyms covered!</p>
        <button class="random-btn" id="acr-restart">Shuffle &amp; restart</button>
      </div>`;
  }

  function advance() {
    idx++;
    tileWords = null;
    render();
    if (idx < deck.length) document.getElementById('acr-input')?.focus();
  }

  function markCorrect(feedback, skip) {
    const { d } = deck[idx];
    feedback.textContent = '✓ ' + d;
    feedback.className = 'acronym-feedback correct';
    skip.style.visibility = 'hidden';
    setTimeout(advance, 1200);
  }

  function bindCard() {
    const feedback = document.getElementById('acr-feedback');
    const skip     = document.getElementById('acr-skip');
    const { d }    = deck[idx];

    if (!tileWords) {
      const input   = document.getElementById('acr-input');
      const hintBtn = document.getElementById('acr-hint-btn');

      input.focus();

      input.addEventListener('input', () => {
        if (input.value.trim().toLowerCase() === d.toLowerCase()) {
          input.classList.add('correct');
          input.disabled = true;
          markCorrect(feedback, skip);
        }
      });

      hintBtn.addEventListener('click', () => {
        tileWords = shuffle(d.split(' '));
        render();
      });
    } else {
      bindTiles(d, feedback, skip);
    }

    skip.addEventListener('click', () => {
      feedback.textContent = d;
      feedback.className = 'acronym-feedback reveal';
      skip.style.visibility = 'hidden';
      document.querySelectorAll('.acronym-tile').forEach(t => t.disabled = true);
      const input = document.getElementById('acr-input');
      if (input) input.disabled = true;
      setTimeout(advance, 1400);
    });
  }

  function bindTiles(d, feedback, skip) {
    const words    = d.split(' ');
    const building = document.getElementById('acr-building');
    const tiles    = document.querySelectorAll('.acronym-tile');
    let selected   = [];

    tiles.forEach(tile => {
      tile.addEventListener('click', () => {
        if (tile.disabled) return;
        const word     = tile.textContent;
        const expected = words[selected.length];

        if (word === expected) {
          tile.disabled = true;
          tile.classList.add('used');
          selected.push(word);
          building.textContent = selected.join(' ');

          if (selected.length === words.length) {
            building.classList.add('correct');
            markCorrect(feedback, skip);
          }
        } else {
          building.classList.add('wrong');
          setTimeout(() => {
            building.classList.remove('wrong');
            building.textContent = '';
            selected = [];
            tiles.forEach(t => { t.disabled = false; t.classList.remove('used'); });
          }, 500);
        }
      });
    });
  }

  render();
}
