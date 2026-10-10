"""Maakt van een HTML-ontwerp (1080 x 1350) een JPEG voor Instagram en Facebook.

Gebruik: python3 build.py <ontwerp.html> <uitvoer.jpg>
Nodig: Playwright met Chromium, Pillow en het lettertype Poppins.
"""
import io
import json
import sys
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

W, H = 1080, 1350

src = Path(sys.argv[1]).resolve()
out = Path(sys.argv[2]).resolve()

with sync_playwright() as p:
    browser = p.chromium.launch()
    # Op dubbele resolutie tekenen en daarna verkleinen geeft scherpere letters.
    page = browser.new_page(viewport={"width": W, "height": H}, device_scale_factor=2)
    page.goto(src.as_uri(), wait_until="load")
    page.evaluate("document.fonts.ready")
    info = page.evaluate(
        """() => {
          const box = s => { const e = document.querySelector(s); if (!e) return null;
            const r = e.getBoundingClientRect(); return [r.left, r.top, r.right, r.bottom].map(Math.round); };
          const title = document.querySelector('.title');
          return {
            font: getComputedStyle(title).fontFamily,
            poppinsLoaded: document.fonts.check("700 100px Poppins"),
            title: box('.title'), tail: box('.tail'), hero: box('.hero'), disc: box('.disc'),
            badge: box('.badge'), foot: box('.foot'),
            titleOverflowsX: title.scrollWidth > title.clientWidth + 1,
            pageOverflow: document.documentElement.scrollWidth > innerWidth || document.documentElement.scrollHeight > innerHeight,
          };
        }"""
    )
    png = page.screenshot(type="png")
    browser.close()

img = Image.open(io.BytesIO(png)).convert("RGB").resize((W, H), Image.LANCZOS)
out.parent.mkdir(parents=True, exist_ok=True)
img.save(out, "JPEG", quality=93, subsampling=0, optimize=True)

check = Image.open(out)
info.update(file=str(out), size=check.size, mode=check.mode, format=check.format, bytes=out.stat().st_size)
print(json.dumps(info, indent=1, ensure_ascii=False))
