// Zet een HTML-beeld om naar PNG (1000x1500, Pinterest 2:3).
// Gebruik: node scripts/render.js posts/media/<naam>.html
const path = require('path');
const { chromium } = require('playwright');

(async () => {
  const src = path.resolve(process.argv[2]);
  const out = src.replace(/\.html$/, '.png');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1000, height: 1500 } });
  await page.goto('file://' + src);
  await page.screenshot({ path: out });
  await browser.close();
  console.log(out);
})();
