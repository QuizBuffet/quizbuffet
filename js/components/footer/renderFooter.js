// Renders site footer with cert links — internal links help AdSense content signals and SEO
import { certifications } from '../../data/certifications/index.js';
import { getTheme, applyTheme } from '../../utils/applyTheme.js';
import { getColorTheme, applyColorTheme } from '../../utils/applyColorTheme.js';
import { getSoundEnabled, toggleSound } from '../../utils/soundPref.js';
import { getCursor, setCursor, CURSORS } from '../../utils/cursorPref.js';

const SWATCHES = [
  { id: 'buffet',   label: 'Buffet'         },
  { id: 'navy',     label: 'Midnight Navy'  },
  { id: 'terminal', label: 'Terminal Green' },
  { id: 'amber',    label: 'Indigo Amber'   },
  { id: 'classic',  label: 'Classic'        },
  { id: 'pink',     label: 'Plush Pink'     },
];

export function renderFooter() {
  const el = document.getElementById('footer');
  if (!el) return;

  const year = new Date().getFullYear();

  const certLinks = certifications.map(c =>
    `<a href="/${c.slug}/" class="footer-cert-link">${c.name} <span class="footer-cert-code">${c.code}</span></a>`
  ).join('');

  el.innerHTML = `
    <footer class="footer">
      <div class="footer-orbs" aria-hidden="true">
        <span class="footer-orb"></span>
        <span class="footer-orb"></span>
        <span class="footer-orb"></span>
        <span class="footer-orb"></span>
      </div>
      <div class="container">

        <div class="footer-grid">

          <div class="footer-col">
            <div class="footer-brand"><img src="/icons/favicon.svg" alt="" class="footer-brand-img">QuizBuffet</div>
            <p class="footer-tagline">Built with love for anyone grinding toward a cert.</p>
            <p class="footer-body">
              This is a personal, private study tool — not a commercial platform.
              No accounts. No sign-ups. No emails collected. Just you and your questions.
            </p>
          </div>

          <div class="footer-col">
            <div class="footer-col-title">Available Certifications</div>
            <div class="footer-certs">${certLinks}</div>
          </div>

          <div class="footer-col">
            <div class="footer-col-title">Contact</div>
            <p class="footer-body">Have a question, found a bug, or want to suggest content?</p>
            <a class="footer-contact-btn" href="mailto:artivicolab@gmail.com?subject=QuizBuffet">Contact Us →</a>
          </div>

          <div class="footer-col">
            <div class="footer-col-title">Your Privacy &amp; Security</div>
            <ul class="footer-privacy-list">
              <li><strong>100% local storage.</strong> All your progress lives in your browser's localStorage — nothing is ever sent to a server.</li>
              <li><strong>No backend.</strong> There is no database, no API, no user account, and no login. Zero attack surface on your data.</li>
              <li><strong>No personal tracking.</strong> We use Google Analytics to count page visits only. No fingerprinting, no cookies tied to you personally. Your quiz answers and study habits are yours alone.</li>
              <li><strong>Nothing shared.</strong> Your answers, scores, and progress never leave your device. Period.</li>
              <li><strong>Open to inspect.</strong> Every line of code runs in your browser. Open DevTools and see for yourself.</li>
            </ul>
          </div>

        </div>

        <div class="footer-prefs">
          <div class="footer-prefs-row">
            <span class="footer-prefs-label">Theme</span>
            <button class="settings-toggle" id="footer-theme-toggle">${getTheme() === 'dark' ? 'Light' : 'Dark'}</button>
          </div>
          <div class="footer-prefs-row">
            <span class="footer-prefs-label">Sound</span>
            <button class="settings-toggle" id="footer-sound-toggle">${getSoundEnabled() ? '🔊 On' : '🔇 Off'}</button>
          </div>
          <div class="footer-prefs-row">
            <span class="footer-prefs-label">Color</span>
            <div class="color-swatches">${SWATCHES.map(({ id, label }) =>
              `<button class="color-swatch swatch-${id}${getColorTheme() === id ? ' active' : ''}" data-c="${id}" title="${label}" aria-label="${label} theme"></button>`
            ).join('')}</div>
          </div>
          <div class="footer-prefs-row footer-prefs-cursor">
            <span class="footer-prefs-label">Cursor</span>
            <div class="cursor-picker">${CURSORS.map(({ id, icon, label }) =>
              `<button class="cursor-opt${getCursor() === id ? ' active' : ''}" data-cur="${id}" aria-label="${label} cursor" title="${label}">${icon}</button>`
            ).join('')}</div>
          </div>
        </div>

        <div class="footer-bottom">
          <span>&copy; ${year} QuizBuffet &mdash; a personal project, made with care.</span>
          <span class="footer-disclaimer">Not affiliated with CompTIA or any certification body. All trademarks belong to their respective owners.</span>
        </div>

      </div>
    </footer>`;

  document.getElementById('footer-theme-toggle').addEventListener('click', () => {
    const next = getTheme() === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    document.getElementById('footer-theme-toggle').textContent = next === 'dark' ? 'Light' : 'Dark';
    const navToggle = document.getElementById('theme-toggle');
    if (navToggle) navToggle.textContent = next === 'dark' ? 'Light' : 'Dark';
  });

  document.getElementById('footer-sound-toggle').addEventListener('click', () => {
    const on = toggleSound();
    const btn = document.getElementById('footer-sound-toggle');
    btn.textContent = on ? '🔊 On' : '🔇 Off';
    btn.setAttribute('aria-label', on ? 'Mute' : 'Unmute');
  });

  el.querySelectorAll('.color-swatch').forEach(btn => {
    btn.addEventListener('click', () => {
      applyColorTheme(btn.dataset.c);
      el.querySelectorAll('.color-swatch').forEach(b =>
        b.classList.toggle('active', b.dataset.c === btn.dataset.c)
      );
      document.querySelectorAll('#nav .color-swatch').forEach(b =>
        b.classList.toggle('active', b.dataset.c === btn.dataset.c)
      );
    });
  });

  el.querySelectorAll('.cursor-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      setCursor(btn.dataset.cur);
      el.querySelectorAll('.cursor-opt').forEach(b =>
        b.classList.toggle('active', b.dataset.cur === btn.dataset.cur)
      );
    });
  });
}
