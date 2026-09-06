// Fires a Google Ads conversion. Labels come from Google Ads > Goals > Conversions >
// that action > "Add a conversion action manually" > copy the tag's send_to value.
// REPLACE_ME labels are inert (trackConversion no-ops) until real labels are set, // see TODO.md A1.
const LABELS = {
  quiz_start: 'AW-17221241617/REPLACE_ME',
  domain_complete: 'AW-17221241617/REPLACE_ME',
  answered_10: 'AW-17221241617/REPLACE_ME',
};

export function trackConversion(name) {
  const label = LABELS[name];
  if (typeof gtag !== 'function' || !label || label.endsWith('REPLACE_ME')) return;
  gtag('event', 'conversion', { send_to: label });
}
