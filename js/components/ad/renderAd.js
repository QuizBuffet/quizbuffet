// AdSense slot renderer — currently a no-op while ads are disabled (no real ca-pub yet).
// To re-enable: restore the AdSense <script> in index.html + build-seo.mjs templates,
// then uncomment the body of this function and replace XXXX values with your real IDs.
export function renderAd(containerId) {
  // const el = document.getElementById(containerId);
  // if (!el) return;
  // el.innerHTML = `
  //   <ins class="adsbygoogle"
  //     style="display:block"
  //     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
  //     data-ad-slot="XXXXXXXXXX"
  //     data-ad-format="auto"
  //     data-full-width-responsive="true"></ins>`;
  // try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (_) {}
}
