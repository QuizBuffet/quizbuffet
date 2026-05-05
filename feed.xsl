<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" doctype-system="about:legacy-compat"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title><xsl:value-of select="rss/channel/title"/> · RSS feed</title>
        <meta name="robots" content="noindex"/>
        <style>
          :root { color-scheme: light dark; }
          * { box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.55; margin: 0 auto; padding: 24px clamp(16px, 4vw, 64px); max-width: 1600px; color: #222; background: #fafafa; }
          @media (prefers-color-scheme: dark) { body { color: #e5e5e5; background: #1a1a1a; } }
          .feed-banner { background: linear-gradient(135deg, #ee802f, #d96b1a); color: #fff; padding: 22px 28px; border-radius: 10px; margin-bottom: 24px; }
          .feed-banner h1 { margin: 0 0 6px; font-size: clamp(20px, 4vw, 28px); display: flex; align-items: center; gap: 12px; }
          .feed-banner svg { flex-shrink: 0; }
          .feed-banner p { margin: 0; opacity: 0.95; font-size: clamp(14px, 2vw, 16px); max-width: 80ch; }
          .feed-banner a { color: #fff; text-decoration: underline; }
          .help { background: rgba(0,0,0,0.04); border-left: 3px solid #ee802f; padding: 14px 18px; border-radius: 4px; margin-bottom: 24px; font-size: 14px; max-width: 80ch; }
          @media (prefers-color-scheme: dark) { .help { background: rgba(255,255,255,0.05); } }
          .help strong { display: block; margin-bottom: 4px; font-size: 15px; }
          .help code { background: rgba(0,0,0,0.06); padding: 2px 6px; border-radius: 3px; font-size: 13px; }
          @media (prefers-color-scheme: dark) { .help code { background: rgba(255,255,255,0.08); } }
          .feed-url-row { display: flex; align-items: stretch; gap: 0; margin-top: 12px; max-width: 100%; }
          .feed-url-input { flex: 1; min-width: 0; font-family: ui-monospace, "SF Mono", Menlo, monospace; font-size: 13px; padding: 8px 12px; border: 1px solid #d0d0d0; border-radius: 4px 0 0 4px; background: #fff; color: #222; }
          @media (prefers-color-scheme: dark) { .feed-url-input { background: #1f1f1f; color: #e5e5e5; border-color: #444; } }
          .feed-copy-btn { padding: 8px 16px; font-size: 13px; font-weight: 600; color: #fff; background: #ee802f; border: 1px solid #ee802f; border-radius: 0 4px 4px 0; cursor: pointer; transition: background 0.15s; flex-shrink: 0; font-family: inherit; }
          .feed-copy-btn:hover { background: #d96b1a; }
          .feed-copy-btn.copied { background: #2e9b4a; border-color: #2e9b4a; }
          .feed-meta { color: #666; font-size: 13px; margin: -8px 0 16px; }
          @media (prefers-color-scheme: dark) { .feed-meta { color: #999; } }
          .feed-grid { display: grid; grid-template-columns: 1fr; gap: 14px; }
          @media (min-width: 720px)  { .feed-grid { grid-template-columns: 1fr 1fr; gap: 16px; } }
          @media (min-width: 1100px) { .feed-grid { grid-template-columns: 1fr 1fr 1fr; } }
          @media (min-width: 1500px) { .feed-grid { grid-template-columns: 1fr 1fr 1fr 1fr; } }
          .item { background: #fff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 16px 20px; transition: border-color 0.15s, transform 0.1s, box-shadow 0.15s; display: flex; flex-direction: column; min-height: 100%; }
          @media (prefers-color-scheme: dark) { .item { background: #232323; border-color: #333; } }
          .item:hover { border-color: #ee802f; transform: translateY(-1px); box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
          .item h2 { margin: 0 0 6px; font-size: 17px; line-height: 1.35; }
          .item h2 a { color: #06c; text-decoration: none; }
          @media (prefers-color-scheme: dark) { .item h2 a { color: #6ab2ff; } }
          .item h2 a:hover { text-decoration: underline; }
          .item-meta { font-size: 12px; color: #888; margin-bottom: 10px; display: flex; flex-wrap: wrap; gap: 6px 12px; align-items: center; }
          @media (prefers-color-scheme: dark) { .item-meta { color: #aaa; } }
          .item-cat { background: rgba(238, 128, 47, 0.14); color: #c95f12; padding: 2px 8px; border-radius: 10px; font-weight: 600; }
          @media (prefers-color-scheme: dark) { .item-cat { color: #ffa873; } }
          .item-desc { font-size: 14px; color: #444; flex-grow: 1; }
          @media (prefers-color-scheme: dark) { .item-desc { color: #ccc; } }
          .home-link { display: inline-block; margin-top: 24px; color: #06c; }
          @media (prefers-color-scheme: dark) { .home-link { color: #6ab2ff; } }
        </style>
      </head>
      <body>
        <div class="feed-banner">
          <h1>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6.18 15.64a2.18 2.18 0 1 1 0 4.36 2.18 2.18 0 0 1 0-4.36zM4 4.44A19.56 19.56 0 0 1 23.56 24h-2.83A16.73 16.73 0 0 0 4 7.27V4.44zm0 5.66a13.9 13.9 0 0 1 13.9 13.9h-2.83A11.07 11.07 0 0 0 4 12.93V10.1z"/></svg>
            <xsl:value-of select="rss/channel/title"/>
          </h1>
          <p><xsl:value-of select="rss/channel/description"/></p>
        </div>

        <div class="help">
          <strong>This is an RSS feed.</strong>
          To subscribe, copy the feed URL below and paste it into a feed reader like <a href="https://feedly.com" target="_blank" rel="noopener">Feedly</a>, <a href="https://www.inoreader.com" target="_blank" rel="noopener">Inoreader</a>, <a href="https://newsblur.com" target="_blank" rel="noopener">NewsBlur</a>, or any other RSS app. You'll get notified whenever new certifications go live.
          <div class="feed-url-row">
            <input class="feed-url-input" id="feed-url" type="text" value="https://quizbuffet.com/feed.xml" readonly="readonly" aria-label="RSS feed URL"/>
            <button class="feed-copy-btn" id="feed-copy-btn" type="button">Copy</button>
          </div>
        </div>

        <div class="feed-meta">Last updated: <xsl:value-of select="rss/channel/lastBuildDate"/></div>

        <div class="feed-grid">
          <xsl:for-each select="rss/channel/item">
            <div class="item">
              <h2><a href="{link}" target="_blank" rel="noopener"><xsl:value-of select="title"/></a></h2>
              <div class="item-meta">
                <span class="item-cat"><xsl:value-of select="category"/></span>
                <span><xsl:value-of select="pubDate"/></span>
              </div>
              <div class="item-desc"><xsl:value-of select="description"/></div>
            </div>
          </xsl:for-each>
        </div>

        <a class="home-link" href="/" target="_blank" rel="noopener">← Open QuizBuffet home in a new tab</a>

        <script>
          (function() {
            var input = document.getElementById('feed-url');
            var btn = document.getElementById('feed-copy-btn');
            if (!input || !btn) return;
            // Reflect the current location so the URL is always accurate (handles staging/local)
            input.value = location.href;
            btn.addEventListener('click', function() {
              var done = function() {
                var orig = btn.textContent;
                btn.textContent = 'Copied ✓';
                btn.classList.add('copied');
                setTimeout(function() { btn.textContent = orig; btn.classList.remove('copied'); }, 1800);
              };
              if (navigator.clipboard &amp;&amp; navigator.clipboard.writeText) {
                navigator.clipboard.writeText(input.value).then(done, function() {
                  input.select(); document.execCommand('copy'); done();
                });
              } else {
                input.select(); document.execCommand('copy'); done();
              }
            });
            input.addEventListener('focus', function() { input.select(); });
          })();
        </script>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
