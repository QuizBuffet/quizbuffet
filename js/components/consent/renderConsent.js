// GDPR/EEA consent banner for Google Analytics + Google Ads conversion measurement
// (Consent Mode v2). The <head> denies analytics by default everywhere, denies ad
// consent by default only for EEA/UK visitors (granted by default elsewhere), and
// restores a prior 'granted' choice before gtag.js loads. This banner is only the
// UI that lets a first-time visitor grant/decline; it calls gtag('consent','update').
// Accept grants analytics_storage + ad_storage + ad_user_data — never ad_personalization,
// so nothing here is used for personalized ads or remarketing. If a choice was already
// made, the banner never renders.

const KEY = 'qb_consent';

function setConsent(granted) {
  try { localStorage.setItem(KEY, granted ? 'granted' : 'denied'); } catch (_) {}
  if (granted && typeof window.gtag === 'function') {
    window.gtag('consent', 'update', { analytics_storage: 'granted', ad_storage: 'granted', ad_user_data: 'granted' });
  }
}

export function renderConsent() {
  let choice = null;
  try { choice = localStorage.getItem(KEY); } catch (_) {}
  if (choice === 'granted' || choice === 'denied') return; // already decided

  if (document.getElementById('qb-consent')) return;

  const style = document.createElement('style');
  style.textContent = `
    #qb-consent{position:fixed;left:0;right:0;bottom:0;z-index:9999;background:#1c1c1c;color:#fff;
      font:14px/1.5 Nunito,system-ui,sans-serif;padding:14px 18px;display:flex;flex-wrap:wrap;
      align-items:center;gap:12px;justify-content:center;box-shadow:0 -2px 12px rgba(0,0,0,.3)}
    #qb-consent p{margin:0;flex:1 1 320px;max-width:760px}
    #qb-consent a{color:#ffd24a;text-decoration:underline}
    #qb-consent .qb-consent-btns{display:flex;gap:8px;flex:0 0 auto}
    #qb-consent button{font:600 14px Nunito,system-ui,sans-serif;border:0;border-radius:6px;
      padding:9px 16px;cursor:pointer}
    #qb-consent .qb-accept{background:#ffd24a;color:#222}
    #qb-consent .qb-decline{background:transparent;color:#fff;border:1px solid #777}
    @media(max-width:600px){#qb-consent{flex-direction:column;align-items:stretch;text-align:center;
      padding:10px 14px;gap:8px;font-size:13px}
      #qb-consent p{flex:0 0 auto;max-width:none}
      #qb-consent .qb-consent-btns{justify-content:center}
      #qb-consent button{padding:7px 14px}}
  `;
  document.head.appendChild(style);

  const bar = document.createElement('div');
  bar.id = 'qb-consent';
  bar.setAttribute('role', 'dialog');
  bar.setAttribute('aria-label', 'Cookie consent');
  bar.innerHTML = `
    <p>We use Google Analytics to count anonymous page visits and Google Ads to measure
       conversions. Both are off until you choose. No accounts, no personal tracking, no
       personalized ads. See our
       <a href="/privacy/">Privacy &amp; Cookie Policy</a>.</p>
    <div class="qb-consent-btns">
      <button type="button" class="qb-decline">Decline</button>
      <button type="button" class="qb-accept">Accept</button>
    </div>`;

  function close() { bar.remove(); style.remove(); }
  bar.querySelector('.qb-accept').addEventListener('click', () => { setConsent(true); close(); });
  bar.querySelector('.qb-decline').addEventListener('click', () => { setConsent(false); close(); });

  document.body.appendChild(bar);
}
