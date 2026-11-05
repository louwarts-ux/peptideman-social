const { test } = require('node:test')
const assert = require('node:assert')
const fs = require('fs')
const path = require('path')
const { checkArtikel, parseArtikel } = require('../scripts/lib/regels')
const { naarHtml, faq } = require('../scripts/artikel')
const { beoordeel } = require('../scripts/hooks/poort')

const ROOT = path.join(__dirname, '..')
const voorbeeld = fs.readFileSync(path.join(__dirname, 'fixtures/artikel.md'), 'utf8')

test('leest velden en tekst gescheiden door ---', () => {
  const { velden, tekst } = parseArtikel(voorbeeld)
  assert.strictEqual(velden.slug, 'hplc-test-peptiden')
  assert.match(velden.bronnen, /pubmed/)
  assert.match(tekst, /^# HPLC test peptiden/)
})

test('het voorbeeldartikel komt door de regels en wacht op de claimcheck', () => {
  const { fout, letOp, stap } = checkArtikel(voorbeeld)
  assert.deepStrictEqual(fout, [])
  assert.deepStrictEqual(letOp, [])
  assert.strictEqual(stap, 'claimcheck')
  assert.match(checkArtikel(voorbeeld.replace('claimcheck: open', 'claimcheck: GOED')).stap, /exporteren/)
})

test('vangt claims in de tekst, een gezondheidszoekwoord en een foute slug', () => {
  const slecht = voorbeeld
    .replace('zoekwoord: hplc test peptiden', 'zoekwoord: peptiden voor afvallen')
    .replace('slug: hplc-test-peptiden', 'slug: HPLC Test')
    .replace('De grootste piek', 'Dit peptide geneest en de grootste piek')
  const { fout } = checkArtikel(slecht)
  assert.ok(fout.some(f => f.includes('geneesclaim')))
  assert.ok(fout.some(f => f.startsWith('zoekwoord')))
  assert.ok(fout.some(f => f.startsWith('slug')))
})

test('eist disclaimer, één H1 en een bronlink', () => {
  const slecht = voorbeeld
    .replace(/Uitsluitend voor onderzoek\./g, '')
    .replace('## Hoe werkt', '# Hoe werkt')
    .replace(/- https:\/\/pubmed\S+/, '- Moore 1982')
  const { fout } = checkArtikel(slecht)
  assert.ok(fout.some(f => f.includes('Uitsluitend voor onderzoek')))
  assert.ok(fout.some(f => f.includes('H1')))
  assert.ok(fout.some(f => f.includes('bronnen')))
})

test('geeft SEO-adviezen bij een te korte tekst en ontbrekend zoekwoord', () => {
  const kort = voorbeeld.split('## Hoe werkt')[0].replace('titel: HPLC test peptiden:', 'titel:') + '\nUitsluitend voor onderzoek.'
  const { letOp } = checkArtikel(kort)
  assert.ok(letOp.some(l => l.includes('woorden')))
  assert.ok(letOp.some(l => l.includes('titel')))
  assert.ok(letOp.some(l => l.includes('interne link')))
})

test('de poort toetst artikelen/*.md', () => {
  const file_path = path.join(ROOT, 'artikelen/nieuw.md')
  assert.strictEqual(beoordeel({ tool_name: 'Write', tool_input: { file_path, content: voorbeeld } }, ROOT), null)
  const slecht = voorbeeld.replace('De grootste piek', 'Gegarandeerd: de grootste piek')
  assert.match(beoordeel({ tool_name: 'Write', tool_input: { file_path, content: slecht } }, ROOT), /Artikel .*gegarandeerd/s)
})

test('zet Markdown om naar HTML en haalt de FAQ eruit', () => {
  const { tekst } = parseArtikel(voorbeeld)
  const html = naarHtml(tekst)
  assert.match(html, /<h1>HPLC test peptiden: wat meet het\?<\/h1>/)
  assert.match(html, /<ul>\n<li>Naam van het monster<\/li>/)
  assert.match(html, /<strong>Zuiverheid<\/strong>/)
  assert.match(html, /<a href="https:\/\/peptideman\.nl\/kwaliteit">onze kwaliteit<\/a>/)
  assert.match(html, /<a href="https:\/\/pubmed[^"]+" rel="noopener" target="_blank">/)
  assert.ok(!html.includes('<script'))
  const vragen = faq(tekst)
  assert.strictEqual(vragen.length, 2)
  assert.strictEqual(vragen[0].vraag, 'Test PeptideMan zelf?')
  assert.strictEqual(vragen[1].antwoord, 'De tijd die een stof nodig heeft om door de kolom te gaan.')
})

test('escapet HTML in de tekst', () => {
  assert.match(naarHtml('Een <script>x</script> test'), /&lt;script&gt;/)
})
