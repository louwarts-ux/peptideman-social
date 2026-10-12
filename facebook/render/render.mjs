// Rendert alle Facebook-beelden naar PNG: `node facebook/render/render.mjs`
// Uitvoer in facebook/beelden/. Inhoud staat in facebook/content/carrousels.mjs.
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import { carrousels, SITE, KENNISBANK } from '../content/carrousels.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const out = join(here, '..', 'beelden')
// De kennisbank-data is een browserscript (window.PEPTIDES); lees hem in een lege context in
const kb = { window: {} }
runInNewContext(readFileSync(join(here, '..', '..', 'kennisbank', 'data.js'), 'utf8'), kb)
const { PEPTIDES, STATUS, BEWIJS } = kb.window
const font = f => pathToFileURL(join(here, 'fonts', f)).href

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const CSS = `
@font-face { font-family: 'Archivo'; src: url(${font('archivo.woff2')}) format('woff2'); font-weight: 400 800; font-stretch: 62% 125%; }
@font-face { font-family: 'Source Sans 3'; src: url(${font('source-sans-3.woff2')}) format('woff2'); font-weight: 200 900; }
@font-face { font-family: 'JetBrains Mono'; src: url(${font('jetbrains-mono.woff2')}) format('woff2'); font-weight: 500; }
:root {
  --bg: #0b0b0d; --card: #121215; --deep: #060607; --ink: #f5f2ea; --soft: #b7b1a3; --faint: #8b8577; --line: #2a2a30;
  --gold: #c9a227; --gold-l: #e2ba3c; --ok: #6fcf97; --info: #9fb6cf; --warn: #e3805a;
  --display: 'Archivo', 'Inter', sans-serif; --body: 'Source Sans 3', 'Inter', sans-serif; --mono: 'JetBrains Mono', 'DejaVu Sans Mono', monospace;
}
* { box-sizing: border-box; margin: 0; padding: 0 }
html, body { width: var(--w); height: var(--h); overflow: hidden }
body { font-family: var(--body); color: var(--ink); background: var(--card); -webkit-font-smoothing: antialiased }
.slide { position: relative; width: 100%; height: 100%; padding: 84px 88px; display: flex; flex-direction: column; background: linear-gradient(180deg, #141417 0%, var(--card) 100%) }
.slide::after { content: ''; position: absolute; inset: 28px; border: 1px solid rgba(201,162,39,.22); border-radius: 6px; pointer-events: none }
.dark { background: radial-gradient(110% 80% at 88% 0%, rgba(201,162,39,.20) 0%, rgba(201,162,39,0) 55%), var(--bg) }
.top, .bottom { position: relative; z-index: 1; display: flex; justify-content: space-between; align-items: center; font: 500 22px/1 var(--mono); letter-spacing: .08em; text-transform: uppercase; color: var(--faint) }
.brand { display: flex; align-items: center; gap: 16px; color: inherit }
.brand b { font: 800 30px/1 var(--display); font-stretch: 100%; letter-spacing: .01em; text-transform: none; color: var(--ink) }
.mark { width: 44px; height: 44px; border-radius: 10px; background: var(--gold); color: var(--bg); display: grid; place-items: center; font: 800 28px/1 var(--display) }
.main { position: relative; z-index: 1; flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 40px; min-height: 0 }
.kicker { font: 500 26px/1 var(--mono); letter-spacing: .12em; text-transform: uppercase; color: var(--gold) }
h1 { font: 800 112px/0.98 var(--display); font-stretch: 78%; letter-spacing: -.01em; text-wrap: balance }
h2 { font: 800 92px/1.0 var(--display); font-stretch: 80%; text-wrap: balance }
.sub { font: 400 40px/1.3 var(--body); color: var(--soft); max-width: 22ch }
p.body { font: 400 44px/1.4 var(--body); color: var(--soft); max-width: 30ch }
.rule { height: 3px; width: 120px; background: var(--gold) }
.tag { align-self: flex-start; display: inline-flex; align-items: center; gap: 14px; border: 2px solid var(--gold); color: var(--ink); padding: 18px 26px; font: 500 28px/1 var(--mono); letter-spacing: .04em }
.tag::before { content: ''; width: 14px; height: 14px; border-radius: 50%; background: var(--gold) }
.pill { align-self: flex-start; padding: 14px 26px; border-radius: 999px; font: 700 28px/1 var(--display); font-stretch: 100%; letter-spacing: .1em; text-transform: uppercase; color: var(--bg) }
.ok { background: var(--ok) } .info { background: var(--info) } .warn { background: var(--warn) }
.ex { font: 400 32px/1.3 var(--body); color: var(--faint); border-top: 2px solid var(--line); padding-top: 26px }
.ex b { font-weight: 600; color: var(--ink) }
.num { font: 800 300px/0.8 var(--display); font-stretch: 70%; color: transparent; -webkit-text-stroke: 3px var(--gold) }
.mono { display: grid; grid-template-columns: auto 1fr; border-top: 2px solid var(--gold) }
.mono div { padding: 22px 0; border-bottom: 1px solid var(--line); font: 400 32px/1.2 var(--body) }
.mono div:nth-child(odd) { font: 500 22px/1.6 var(--mono); letter-spacing: .08em; text-transform: uppercase; color: var(--faint); padding-right: 40px }
.mono .badge { display: inline-block; padding: 4px 16px; border-radius: 999px; font: 700 24px/1.3 var(--display); color: var(--bg) }
.cls { font: 500 28px/1 var(--mono); letter-spacing: .06em; color: var(--gold) }
.icon { width: 200px; height: 200px; color: var(--gold) }
.search { display: flex; align-items: center; gap: 24px; background: var(--gold); color: var(--bg); border-radius: 14px; padding: 34px 38px; font: 500 38px/1 var(--mono) }
.search svg { width: 44px; height: 44px; flex: none }
.cta { font: 700 32px/1 var(--display); font-stretch: 100%; letter-spacing: .08em; text-transform: uppercase; color: var(--gold) }
.disc { font: 400 24px/1.3 var(--body); color: var(--faint) }
.chain { display: flex; align-items: center }
.chain span { display: grid; place-items: center; width: 92px; height: 92px; border-radius: 50%; border: 3px solid var(--gold); font: 500 36px/1 var(--mono); color: var(--ink) }
.chain span:nth-child(3n+2) { background: var(--gold); color: var(--bg) }
.chain span:nth-child(3n) { border-color: var(--faint); color: var(--soft) }
.chain i { width: 34px; height: 3px; background: #4a4335 }
`

const MARK = `<span class="mark" aria-hidden="true">P</span>`
const SEARCH = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5" stroke-linecap="round"/></svg>`

const ICONS = {
  cgm: `<svg class="icon" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3.5"><circle cx="50" cy="50" r="34"/><circle cx="50" cy="50" r="20"/><circle cx="50" cy="50" r="4" fill="currentColor"/><path d="M8 82c10-8 16 4 24-4s14 6 22-2 14 4 22-4 12 2 16 0" stroke-linecap="round"/></svg>`,
  ring: `<svg class="icon" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3.5"><ellipse cx="50" cy="56" rx="34" ry="30"/><ellipse cx="50" cy="56" rx="24" ry="20"/><path d="M38 20h24M42 12h16" stroke-linecap="round"/><path d="M30 56h10l5-10 8 20 5-10h12" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  pen: `<svg class="icon" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3.5"><rect x="18" y="42" width="58" height="16" rx="6"/><path d="M76 50h8M84 50l8 0M14 50H8" stroke-linecap="round"/><rect x="28" y="46" width="18" height="8" rx="2" fill="currentColor" stroke="none"/><path d="M58 30a14 14 0 0 1 14-10M58 22a22 22 0 0 1 20-12" stroke-linecap="round"/></svg>`,
  ai: `<svg class="icon" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3.5"><rect x="16" y="14" width="50" height="64" rx="4"/><path d="M26 30h30M26 40h30M26 50h18" stroke-linecap="round"/><circle cx="66" cy="66" r="14"/><path d="m76 76 12 12" stroke-linecap="round"/><path d="M62 66h8M66 62v8" stroke-linecap="round"/></svg>`,
  lab: `<svg class="icon" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3.5"><rect x="56" y="12" width="30" height="56" rx="5"/><path d="M64 56h14" stroke-linecap="round"/><path d="M24 40c0 0-10 14-10 22a10 10 0 0 0 20 0c0-8-10-22-10-22Z" fill="currentColor" fill-opacity=".15"/><path d="M14 86h72" stroke-linecap="round"/></svg>`,
}

const toneColor = { ok: 'var(--ok)', info: 'var(--info)', warn: 'var(--warn)' }

function frame({ dark, label, i, n, body }) {
  return `<div class="slide ${dark ? 'dark' : ''}">
  <div class="top"><span class="brand">${MARK}<b>PeptideMan</b></span><span>${i && n ? `${String(i).padStart(2, '0')} / ${String(n).padStart(2, '0')}` : ''}</span></div>
  <div class="main">${body}</div>
  <div class="bottom"><span>${esc(label)}</span><span>${SITE}</span></div>
</div>`
}

function chain(seq) {
  return `<div class="chain">${seq.split('-').map(c => `<span>${esc(c)}</span>`).join('<i></i>')}</div>`
}

function slideBody(s) {
  switch (s.type) {
    case 'cover':
      return `${chain(s.seq)}<div class="kicker">${esc(s.kicker)}</div><h1>${esc(s.title)}</h1><div class="sub">${esc(s.sub)}&nbsp;<span style="white-space:nowrap">→</span></div>`
    case 'tekst':
      return `<div class="rule"></div><h2>${esc(s.title)}</h2><p class="body">${esc(s.body)}</p><div class="tag">${esc(s.fact)}</div>`
    case 'categorie':
      return `<div class="pill ${s.tone}">${esc(s.label)}</div><h2>${esc(s.title)}</h2><p class="body">${esc(s.body)}</p><div class="ex"><b>Voorbeeld:</b> ${esc(s.voorbeeld)}</div>`
    case 'stap':
      return `<div class="num">${s.n}</div><h2>${esc(s.title)}</h2><p class="body">${esc(s.body)}</p>`
    case 'profiel':
      return `<div class="cls">${esc(s.klasse)}</div><h1>${esc(s.naam)}</h1><div class="mono">
        <div>Status</div><div><span class="badge" style="background:${toneColor[s.tone]}">${esc(s.status)}</span></div>
        <div>Bewijs</div><div>${esc(s.bewijs)}</div>
        <div>Lengte</div><div>${esc(s.lengte)}</div></div><p class="body">${esc(s.body)}</p>`
    case 'tech':
      return `${ICONS[s.icon]}<div class="kicker">${esc(s.label)}</div><h2>${esc(s.title)}</h2><p class="body">${esc(s.body)}</p>`
    case 'eind':
      return `<div class="cta">Meer weten?</div><h1>${esc(s.title)}</h1><div class="sub" style="max-width:26ch">${esc(s.sub)}</div>
        <div class="search">${SEARCH}<span>${KENNISBANK}</span></div><div class="disc">Educatieve inhoud. Geen medisch advies. Raadpleeg bij vragen over je gezondheid altijd een arts.</div>`
  }
  throw new Error(`Onbekend slidetype: ${s.type}`)
}

function page(w, h, html) {
  return `<!doctype html><html lang="nl"><head><meta charset="utf-8"><style>:root{--w:${w}px;--h:${h}px}${CSS}</style></head><body>${html}</body></html>`
}

// Profielfoto: gouden P-merk (zoals op de website) in een ring van aminozuren; Facebook toont hem rond
function profiel() {
  const n = 16, r = 400
  const dots = Array.from({ length: n }, (_, k) => {
    const a = (k / n) * Math.PI * 2 - Math.PI / 2
    const x = 540 + r * Math.cos(a), y = 540 + r * Math.sin(a)
    const fill = k % 3 === 1 ? '#c9a227' : '#0b0b0d'
    const stroke = k % 3 === 2 ? '#8b8577' : '#c9a227'
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="30" fill="${fill}" stroke="${stroke}" stroke-width="6"/>`
  }).join('')
  return `<div class="slide dark" style="padding:0;display:grid;place-items:center">
    <svg width="1080" height="1080" viewBox="0 0 1080 1080" style="position:absolute;inset:0"><circle cx="540" cy="540" r="${r}" fill="none" stroke="#4a4335" stroke-width="5"/>${dots}</svg>
    <div style="position:relative;z-index:1;display:grid;justify-items:center;gap:30px">
      <div style="width:330px;height:330px;border-radius:64px;background:#c9a227;color:#0b0b0d;display:grid;place-items:center;font:800 270px/1 var(--display)">P</div>
      <div style="font:800 64px/1 var(--display);letter-spacing:.01em">PeptideMan</div>
    </div></div>`
}

// Omslagfoto 1640x624. Linksonder blijft vrij voor de profielfoto; tekst staat binnen de mobiele uitsnede.
function omslag() {
  return `<div class="slide dark" style="padding:0 260px;justify-content:center;gap:34px">
    <div class="kicker" style="position:relative;z-index:1">Kennisbank · Onderzoek · Tech</div>
    <div style="position:relative;z-index:1;font:800 92px/0.98 var(--display);font-stretch:80%;max-width:15ch">Peptides, helder uitgelegd.</div>
    <div style="position:relative;z-index:1;display:flex;gap:44px;align-items:center;font:400 32px/1.2 var(--body);color:var(--soft)">
      <span>Status, bewijs en bronnen van ${PEPTIDES.length} peptides</span>
      <span class="search" style="font-size:28px;padding:20px 26px">${SEARCH.replace('<svg', '<svg style="width:30px;height:30px"')}<span>${KENNISBANK}</span></span>
    </div>
    <div style="position:absolute;right:120px;top:90px;z-index:1">${chain('G-H-K').replace(/class="chain"/, 'class="chain" style="transform:scale(.8);transform-origin:right top"')}</div>
  </div>`
}

// Deelafbeelding (Open Graph) voor de kennisbank, 1200x630
function ogBeeld() {
  return `<div class="slide dark" style="padding:80px 90px;justify-content:center;gap:30px">
    <span class="brand" style="position:relative;z-index:1">${MARK}<b>PeptideMan</b></span>
    <div style="position:relative;z-index:1;font:800 96px/0.98 var(--display);font-stretch:80%">Peptide-kennisbank</div>
    <div style="position:relative;z-index:1;font:400 36px/1.3 var(--body);color:var(--soft);max-width:30ch">Status, bewijsniveau en bronnen van ${PEPTIDES.length} peptides. Zoek, filter en vergelijk.</div>
  </div>`
}

function welkomBeeld() {
  const pijlers = [
    ['Kennisbank', `Status, bewijs en bronnen van ${PEPTIDES.length} peptides`],
    ['Carrousels', 'Elke week een onderwerp in 7 slides'],
    ['Tech & tools', 'Sensoren, wearables en AI-zoektools'],
  ]
  return frame({
    dark: true, label: 'Start hier',
    body: `${chain('W-E-L-K-O-M')}<h1>Welkom bij PeptideMan</h1><div class="sub" style="max-width:28ch">Peptides begrijpelijk gemaakt. Met bronnen en zonder hype.</div>
      <div style="display:grid;border-top:2px solid var(--gold)">${pijlers.map(([t, d]) => `<div style="display:grid;grid-template-columns:300px 1fr;padding:26px 0;border-bottom:1px solid var(--line);font:400 32px/1.3 var(--body);color:var(--soft)"><b style="font:700 34px/1.2 var(--display);color:var(--ink)">${t}</b><span>${d}</span></div>`).join('')}</div>
      <div class="search">${SEARCH}<span>${KENNISBANK}</span></div>`,
  })
}

// Peptideprofiel (losse post voor woensdag), gegenereerd uit de kennisbank-data
const TONE = { geneesmiddel: 'ok', supplement: 'info', cosmetica: 'info', 'niet-toegelaten': 'warn' }
function peptideProfiel(p) {
  const wada = p.wada === true ? 'Verboden' : p.wada === false ? 'Niet op de lijst' : 'Check de WADA-lijst'
  return frame({
    label: 'Peptide-profiel',
    body: `${p.seq && p.seq.length <= 7 ? chain([...p.seq].join('-')) : ''}<div class="cls">${esc(p.klasse)}</div><h1>${esc(p.naam)}</h1><div class="mono">
      <div>Status</div><div><span class="badge" style="background:var(--${TONE[p.status]})">${esc(STATUS[p.status].label)}</span></div>
      <div>Bewijs</div><div>${esc(BEWIJS[p.bewijs])}</div>
      <div>WADA</div><div>${wada}</div></div>
      <p class="body" style="font-size:40px">${esc(p.kort)}</p>
      <div class="tag">${KENNISBANK}/#${p.id}</div>`,
  })
}

const jobs = []
for (const c of carrousels) {
  const n = c.slides.length
  c.slides.forEach((s, k) => {
    const dark = s.type === 'cover' || s.type === 'eind'
    jobs.push({ file: `carrousel-${c.id}-${String(k + 1).padStart(2, '0')}.png`, w: 1080, h: 1350, html: frame({ dark, label: c.thema, i: k + 1, n, body: slideBody(s) }) })
  })
}
jobs.push({ file: 'profielfoto.png', w: 1080, h: 1080, html: profiel() })
jobs.push({ file: 'omslagfoto.png', w: 1640, h: 624, html: omslag() })
jobs.push({ file: 'welkomstbericht.png', w: 1080, h: 1350, html: welkomBeeld() })
jobs.push({ file: 'kennisbank-og.png', w: 1200, h: 630, html: ogBeeld() })
for (const p of PEPTIDES) jobs.push({ file: `profiel-${p.id}.png`, w: 1080, h: 1350, html: peptideProfiel(p) })

mkdirSync(out, { recursive: true })
const browser = await chromium.launch()
const pageCtx = await browser.newPage()
for (const j of jobs) {
  await pageCtx.setViewportSize({ width: j.w, height: j.h })
  await pageCtx.setContent(page(j.w, j.h, j.html), { waitUntil: 'load' })
  await pageCtx.evaluate(() => document.fonts.ready)
  // Lange namen (bv. Collageenpeptiden) verkleinen tot ze op één regel passen
  await pageCtx.evaluate(() => {
    for (const h of document.querySelectorAll('h1, h2')) {
      let size = parseFloat(getComputedStyle(h).fontSize)
      while (h.scrollWidth > h.clientWidth + 1 && size > 40) h.style.fontSize = `${(size -= 4)}px`
    }
  })
  // Tekst die buiten het beeld valt is een fout: liever falen dan een afgekapte slide posten
  const overflow = await pageCtx.evaluate(() => {
    const m = document.querySelector('.main')
    return m && m.scrollHeight > m.clientHeight + 2
  })
  if (overflow) console.warn(`⚠ tekst te lang: ${j.file}`)
  await pageCtx.screenshot({ path: join(out, j.file) })
  console.log(`✓ ${j.file}`)
}
await browser.close()
