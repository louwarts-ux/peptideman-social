import { createRequire } from 'node:module';
const require = createRequire('/opt/npm-tools/node_modules/');
const { chromium } = require('playwright');
const sharp = require('sharp');
import { mkdir } from 'node:fs/promises';
import { carousels } from './slides.mjs';

const W = 1080, H = 1350, M = 96;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const br = s => esc(s).replace(/\n/g, '<br>');
const plainLen = s => String(s).replace(/­/g, '').length;
const fsFor = n => (n <= 22 ? 104 : n <= 40 ? 90 : n <= 62 ? 78 : 68);

const css = `
:root{--bg:#000;--ink:#f5f2ea;--soft:#b7b1a3;--faint:#8b8577;--gold:#e2ba3c;--gold-base:#c9a227;--red:#f0564a}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:${W}px;height:${H}px;background:var(--bg);overflow:hidden}
body{font-family:'Poppins',sans-serif;color:var(--ink);position:relative;-webkit-font-smoothing:antialiased}
.badge{position:absolute;left:${M}px;top:92px;border:2px solid rgba(226,186,60,.8);border-radius:14px;padding:13px 24px 12px;text-align:center;line-height:1.2}
.badge b{display:block;font-weight:500;font-size:22px;letter-spacing:.24em;margin-right:-.24em;color:var(--ink)}
.badge span{display:block;font-weight:400;font-size:15.5px;letter-spacing:.37em;margin-right:-.37em;margin-top:3px;color:var(--gold)}
.track{position:absolute;left:0;right:0;top:1180px;height:2px;background:rgba(201,162,39,.30)}
.light{position:absolute;top:1181px;left:calc(${M}px + var(--p) * ${W - 2 * M}px);width:0;height:0}
.light i{position:absolute;display:block}
.light .streak{left:-210px;top:-2px;width:420px;height:4px;background:linear-gradient(90deg,transparent,rgba(255,196,84,.9) 42%,#fff8e6 50%,rgba(255,196,84,.9) 58%,transparent);filter:blur(.6px)}
.light .bloom{left:-150px;top:-44px;width:300px;height:88px;background:radial-gradient(ellipse at center,rgba(255,214,120,.60) 0%,rgba(226,160,30,.24) 34%,transparent 70%);filter:blur(7px)}
.light .core{left:-7px;top:-7px;width:14px;height:14px;border-radius:50%;background:#fffaf0;box-shadow:0 0 18px 6px rgba(255,205,96,.85)}
.foot{position:absolute;left:${M}px;right:${M}px;top:1222px;display:flex;justify-content:space-between;align-items:baseline;font-size:28px;font-weight:500;letter-spacing:.01em}
.foot .site{color:var(--soft)}
.foot .count{color:var(--faint);font-variant-numeric:tabular-nums}
/* inhoud: verticaal gecentreerd tussen badge en lichtlijn */
.zone{position:absolute;left:${M}px;right:${M}px;top:214px;bottom:${H - 1136}px;display:flex;flex-direction:column;justify-content:center;padding-bottom:26px}
.zone.close{bottom:${H - 936}px}
.label{font-weight:500;font-size:38px;color:var(--gold);margin-bottom:26px;letter-spacing:.005em}
.text{font-weight:700;font-size:var(--fs,78px);line-height:1.14;letter-spacing:-.016em;text-wrap:balance}
.text + .text{margin-top:.42em}
.support{font-weight:400;font-size:44px;line-height:1.36;color:var(--soft);margin-top:40px;text-wrap:pretty}
.note{margin-top:60px;padding-top:36px;border-top:2px solid rgba(201,162,39,.30);font-weight:400;font-size:36px;line-height:1.4;color:var(--soft);text-wrap:pretty}
.pair .block + .block{margin-top:66px;padding-top:60px;border-top:2px solid rgba(201,162,39,.30)}
.num{font-weight:700;font-size:300px;line-height:.84;letter-spacing:-.04em;margin:0 0 40px -10px;background:linear-gradient(150deg,#f6d977 0%,#e2ba3c 40%,#b3881d 100%);-webkit-background-clip:text;background-clip:text;color:transparent;width:max-content}
.flagrow{display:flex;align-items:center;gap:22px;margin-bottom:34px;color:var(--red);font-weight:500;font-size:40px}
.flagrow svg{width:62px;height:62px;flex:none}
.endblock{position:absolute;left:${M}px;right:${M}px;bottom:${H - 1124}px;display:flex;flex-direction:column;gap:20px}
.cta{font-weight:500;font-size:38px;color:var(--gold);line-height:1.35}
.source{font-weight:400;font-size:32px;color:var(--soft)}
.disc{font-weight:400;font-size:27px;line-height:1.45;color:var(--faint)}
/* omslag */
.hero{position:absolute;left:${M}px;right:${M}px;top:214px;bottom:${H - 1136}px;display:flex;flex-direction:column;justify-content:center;padding-bottom:30px}
.titlewrap{position:relative}
.title{position:relative;z-index:2;font-weight:700;font-size:var(--fs,96px);line-height:1.1;letter-spacing:-.022em;text-shadow:0 2px 24px rgba(0,0,0,.6)}
.tail{position:relative;z-index:2;font-weight:300;font-size:64px;line-height:1.2;letter-spacing:-.01em;margin-top:14px;color:var(--ink)}
.sub{position:relative;z-index:2;font-weight:300;font-size:44px;line-height:1.34;color:#d9d3c4;margin-top:44px;text-wrap:balance;max-width:840px}
.flare{position:absolute;z-index:1;left:${(W - 2 * M) / 2}px;top:var(--fy,50%);width:0;height:0;mix-blend-mode:screen}
.flare i{position:absolute;display:block}
.flare .glow{left:-580px;top:-270px;width:1160px;height:540px;background:radial-gradient(ellipse at center,rgba(232,150,24,.26) 0%,rgba(190,110,10,.10) 38%,transparent 68%)}
.flare .bloom{left:-340px;top:-70px;width:680px;height:140px;background:radial-gradient(ellipse at center,rgba(255,236,190,.80) 0%,rgba(255,190,70,.56) 18%,rgba(226,140,20,.24) 46%,transparent 72%);filter:blur(12px)}
.flare .streak{left:-720px;top:-3px;width:1440px;height:6px;background:linear-gradient(90deg,transparent 4%,rgba(255,176,60,.55) 30%,rgba(255,236,196,.95) 50%,rgba(255,176,60,.55) 70%,transparent 96%);filter:blur(1.4px)}
.flare .ray{left:-310px;top:-1px;width:620px;height:2px;background:linear-gradient(90deg,transparent,rgba(255,200,96,.50) 50%,transparent);transform:rotate(var(--a));filter:blur(.8px)}
`;

const badge = `<div class="badge"><b>PEPTIDEMAN</b><span>BIBLIOTHEEK</span></div>`;
const flagSvg = `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M11 5v38" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="M11 8h24l-6 9 6 9H11z" fill="currentColor"/></svg>`;
const rays = [18, 42, 67, 113, 138, 162].map(a => `<i class="ray" style="--a:${a}deg"></i>`).join('');
const flare = fy => `<div class="flare" style="--fy:${fy}"><i class="glow"></i><i class="bloom"></i>${rays}<i class="streak"></i></div>`;

function frame(inner, i, n) {
  const p = n > 1 ? i / (n - 1) : 0;
  return `<!doctype html><html lang="nl"><head><meta charset="utf-8"><style>${css}</style></head>
<body>${badge}${inner}
<div class="track"></div><div class="light" style="--p:${p.toFixed(4)}"><i class="bloom"></i><i class="streak"></i><i class="core"></i></div>
<div class="foot"><span class="site">peptideman.nl</span><span class="count">${i + 1}/${n}</span></div>
</body></html>`;
}

function render(s, i, n, fs) {
  const t = (txt, size) => `<p class="text fit" style="--fs:${size}px">${esc(txt)}</p>`;
  if (s.type === 'cover') {
    const lines = s.title.split('\n');
    const longest = Math.max(...lines.map(l => l.length));
    const size = s.tail ? 100 : longest > 17 ? 88 : longest > 15 ? 96 : longest > 13 ? 112 : 124;
    // lichtbron: bij een even aantal regels tussen de middelste regels, anders achter de middelste regel
    return frame(`<div class="hero"><div class="titlewrap">${flare('50%')}<h1 class="title fit" style="--fs:${size}px">${br(s.title)}</h1></div>${s.tail ? `<p class="tail">${esc(s.tail)}</p>` : ''}${s.sub ? `<p class="sub">${esc(s.sub)}</p>` : ''}</div>`, i, n);
  }
  if (s.type === 'point') return frame(`<div class="zone"><div class="label">${esc(s.label)}</div>${t(s.text, fs.point)}${s.support ? `<p class="support">${esc(s.support)}</p>` : ''}</div>`, i, n);
  if (s.type === 'pair') return frame(`<div class="zone pair">${[s.a, s.b].map(b => `<div class="block"><div class="label">${esc(b.label)}</div>${t(b.text, 66)}</div>`).join('')}</div>`, i, n);
  if (s.type === 'step') return frame(`<div class="zone"><div class="num">${esc(s.n)}</div>${t(s.text, 96)}<p class="support">${esc(s.support)}</p>${s.note ? `<p class="note">${esc(s.note)}</p>` : ''}</div>`, i, n);
  if (s.type === 'flag') return frame(`<div class="zone"><div class="flagrow">${flagSvg}<span>Rode vlag ${s.n}</span></div>${t(s.text, fs.flag)}${s.support ? `<p class="support">${esc(s.support)}</p>` : ''}</div>`, i, n);
  if (s.type === 'close') {
    const size = fsFor(Math.max(plainLen(s.text), plainLen(s.text2 || '')));
    return frame(`<div class="zone close">${t(s.text, Math.min(size, 78))}${s.text2 ? t(s.text2, Math.min(size, 78)) : ''}${s.support ? `<p class="support">${esc(s.support)}</p>` : ''}</div>
<div class="endblock">${s.source ? `<p class="source">${esc(s.source)}</p>` : ''}${s.cta ? `<p class="cta">Meer in de Peptideman Bibliotheek. Link in bio.</p>` : ''}<p class="disc">Uitsluitend voor onderzoeksdoeleinden.<br>Niet voor menselijk gebruik.</p></div>`, i, n);
  }
  throw new Error('onbekend type ' + s.type);
}

const only = process.argv[2];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });
const report = [];
for (const c of carousels) {
  if (only && !c.id.includes(only)) continue;
  await mkdir(`out/${c.id}`, { recursive: true });
  // één lettergrootte per soort slide binnen een carrousel
  const sizeOf = type => { const ls = c.slides.filter(s => s.type === type).map(s => plainLen(s.text)); return ls.length ? fsFor(Math.max(...ls)) : 78; };
  const fs = { point: sizeOf('point'), flag: sizeOf('flag') };
  const files = [];
  for (let i = 0; i < c.slides.length; i++) {
    await page.setContent(render(c.slides[i], i, c.slides.length, fs), { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    const info = await page.evaluate(() => {
      const out = { shrunk: [], overflow: false };
      // te brede woorden: lettergrootte stapsgewijs verkleinen
      for (const el of document.querySelectorAll('.fit')) {
        let fsz = parseFloat(getComputedStyle(el).fontSize), guard = 0;
        while (el.scrollWidth > el.clientWidth + 1 && fsz > 48 && guard++ < 40) { fsz -= 2; el.style.fontSize = fsz + 'px'; }
        if (guard) out.shrunk.push(fsz);
      }
      const z = document.querySelector('.zone, .hero'); const zr = z.getBoundingClientRect();
      const kids = [...z.children].map(k => k.getBoundingClientRect());
      const top = Math.min(...kids.map(r => r.top)), bottom = Math.max(...kids.map(r => r.bottom));
      out.block = [Math.round(top), Math.round(bottom)];
      out.overflow = top < zr.top - 1 || bottom > zr.bottom + 1;
      const e = document.querySelector('.endblock'); if (e) out.endTop = Math.round(e.getBoundingClientRect().top);
      out.font = getComputedStyle(document.querySelector('.text, .title')).fontFamily;
      return out;
    });
    const png = await page.screenshot({ type: 'png' });
    const file = `out/${c.id}/${String(i + 1).padStart(2, '0')}.jpg`;
    await sharp(png).resize(W, H, { kernel: 'lanczos3' }).jpeg({ quality: 93, chromaSubsampling: '4:4:4', mozjpeg: true }).toFile(file);
    files.push(file);
    report.push(`${file} block=${info.block} ${info.endTop ? 'end=' + info.endTop : ''} ${info.shrunk.length ? 'VERKLEIND->' + info.shrunk : ''} ${info.overflow ? 'OVERLOOP!' : ''}`);
  }
  const tw = 432, th = 540, gap = 12;
  const sheet = sharp({ create: { width: files.length * (tw + gap) + gap, height: th + 2 * gap, channels: 3, background: '#3a3a3a' } });
  const comps = await Promise.all(files.map(async (f, k) => ({ input: await sharp(f).resize(tw, th).toBuffer(), left: gap + k * (tw + gap), top: gap })));
  await sheet.composite(comps).jpeg({ quality: 88 }).toFile(`sheets/${c.id}.jpg`);
}
await browser.close();
console.log(report.join('\n'));
