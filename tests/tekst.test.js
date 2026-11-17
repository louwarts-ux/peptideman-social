const { test } = require('node:test')
const assert = require('node:assert')
const { execFileSync } = require('child_process')
const path = require('path')
const { toetsTekst, PLATFORMS } = require('../scripts/lib/tekst')

const pm = (...args) => {
  try { return { code: 0, uit: execFileSync('node', [path.join(__dirname, '../scripts/pm.js'), ...args], { encoding: 'utf8' }) } }
  catch (e) { return { code: e.status, uit: String(e.stdout) } }
}

test('een losse caption krijgt precies de huisregels: claims, dosering, disclaimer', () => {
  const r = toetsTekst('Helpt bij herstel, ondersteunt afvallen en spiergroei. Dosering: 250 mcg per dag.')
  for (const woord of ['werkingsclaim', 'afvalclaim', 'spiergroeiclaim', 'doseeradvies', 'Uitsluitend voor onderzoek']) {
    assert.ok(r.fout.some(f => f.includes(woord)), `${woord} ontbreekt in ${r.fout.join('; ')}`)
  }
})

test('meer dan 5 hashtags is fout (huisregel), ook voor Instagram', () => {
  const r = toetsTekst('Wist je dat? Uitsluitend voor onderzoek. #a #b #c #d #e #f', 'instagram')
  assert.ok(r.fout.some(f => /6 hashtags, maximaal 5/.test(f)), r.fout.join('; '))
})

test('Pinterest staat erin, met de lichaamsregels en de 500 tekens', () => {
  assert.ok(PLATFORMS.some(p => p.id === 'pinterest'))
  const r = toetsTekst('Voor en na: buikvet weg. Uitsluitend voor onderzoek.', 'pinterest')
  assert.ok(r.fout.some(f => /lichaamsverandering/.test(f)), r.fout.join('; '))
  const lang = toetsTekst('x'.repeat(520) + ' Uitsluitend voor onderzoek.', 'pinterest')
  assert.ok(lang.letOp.some(l => /500/.test(l)), lang.letOp.join('; '))
})

test('platformlimieten: X 280 tekens is fout, TikTok boven 150 is een advies, link in TikTok is fout', () => {
  const x = toetsTekst('a'.repeat(300) + ' Uitsluitend voor onderzoek.', 'x')
  assert.ok(x.fout.some(f => /280/.test(f)), x.fout.join('; '))
  const tt = toetsTekst('a'.repeat(160) + ' Uitsluitend voor onderzoek. Zie peptideman.nl', 'tiktok')
  assert.ok(tt.letOp.some(l => /150/.test(l)), tt.letOp.join('; '))
  assert.ok(tt.fout.some(f => /link in TikTok/.test(f)), tt.fout.join('; '))
})

test('een nette caption komt door', () => {
  const r = toetsTekst('Wist je dat BPC-157 in maagsap werd ontdekt? Bron in bio. Uitsluitend voor onderzoek. #peptiden #onderzoek', 'tiktok')
  assert.deepStrictEqual(r.fout, [])
})

test('pm tekst: exitcode 1 bij een fout, 0 bij een nette tekst, onbekend platform wordt als tekst gelezen', () => {
  assert.strictEqual(pm('tekst', 'tiktok', 'Geneest alles.').code, 1)
  const ok = pm('tekst', 'tiktok', 'Wist je dat? Uitsluitend voor onderzoek.')
  assert.strictEqual(ok.code, 0, ok.uit)
  assert.match(ok.uit, /TikTok/)
  assert.strictEqual(pm('tekst').code, 1)
})
