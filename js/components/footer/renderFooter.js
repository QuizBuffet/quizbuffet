// Renders site footer with cert links — internal links help AdSense content signals and SEO
import { certifications } from '../../data/certifications/index.js';

export function renderFooter() {
  const el = document.getElementById('footer');
  if (!el) return;

  const year = new Date().getFullYear();

  const certLinks = certifications.map(c =>
    `<a href="/cert?cert=${c.slug}" class="footer-cert-link">${c.name} <span class="footer-cert-code">${c.code}</span></a>`
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
              <li><strong>No tracking.</strong> No analytics, no fingerprinting, no cookies tied to you. Your study habits are yours alone.</li>
              <li><strong>Nothing shared.</strong> Your answers, scores, and progress never leave your device. Period.</li>
              <li><strong>Open to inspect.</strong> Every line of code runs in your browser. Open DevTools and see for yourself.</li>
            </ul>
          </div>

        </div>

        <div class="footer-bottom">
          <span>&copy; ${year} QuizBuffet &mdash; a personal project, made with care.</span>
          <span class="footer-disclaimer">Not affiliated with CompTIA or any certification body. All trademarks belong to their respective owners.</span>
        </div>

      </div>
    </footer>`;
}
