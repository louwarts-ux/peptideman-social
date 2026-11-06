const { test } = require('node:test')
const assert = require('node:assert')
const fs = require('fs')
const path = require('path')
const { parsePost, checkPost, checkText } = require('../scripts/lib/regels')

// Een echte post als voorbeeld, teruggezet naar de stand vóór inplannen, zodat de tests niet
// afhangen van hoe ver die post in de keten is.
const voorbeeld = fs.readFileSync(path.join(__dirname, '../posts/2026-10-28-weetje-bpc-157.md'), 'utf8')
  .replace(/^ingepland:.*\n?/m, '')
  .replace(/^beeld-url: .*$/m, 'beeld-url: https://peptideman-media-hspj.netlify.app/social/2026-10-28-weetje-bpc-157.png')

test('leest velden en een caption-blok', () => {
  const post = parsePost(voorbeeld)
  assert.strictEqual(post.kanaal, 'Pinterest')
  assert.match(post.caption, /^Wist je dat/)
  assert.match(post.caption, /Uitsluitend voor onderzoek\.$/)
})

test('de bestaande post komt door de regels', () => {
  const { fout, stap } = checkPost(voorbeeld)
  assert.deepStrictEqual(fout, [])
  assert.strictEqual(stap, 'inplannen')
})

test('zonder openbare beeld-url is de volgende stap beeld online zetten', () => {
  const zonderUrl = voorbeeld.replace(/^beeld-url: .*$/m, 'beeld-url: open')
  const { fout, stap } = checkPost(zonderUrl)
  assert.deepStrictEqual(fout, [])
  assert.strictEqual(stap, 'beeld online zetten')
})

test('waarschuwt bij een Pinterest-beschrijving boven 500 tekens, zonder fout', () => {
  assert.ok(!checkPost(voorbeeld).letOp.some(l => l.includes('Pinterest-beschrijving')))
  const lang = voorbeeld.replace(/^caption: \|\n/m, `caption: |\n  ${'Een lange zin over onderzoek. '.repeat(20)}\n`)
  const { fout, letOp } = checkPost(lang)
  assert.deepStrictEqual(fout, [])
  assert.ok(letOp.some(l => /Pinterest-beschrijving is \d+ tekens, advies maximaal 500/.test(l)))
})

test('met ingepland erbij is de post klaar', () => {
  const { fout, stap } = checkPost(`${voorbeeld.trimEnd()}\ningepland: 2026-11-07 11:00 (concept)\n`)
  assert.deepStrictEqual(fout, [])
  assert.strictEqual(stap, 'klaar')
})

test('vangt claims en doseeradvies', () => {
  const { fout } = checkText('BPC-157 geneest je darmen, 250 mcg per dag. Uitsluitend voor onderzoek.')
  assert.ok(fout.some(f => f.includes('geneesclaim')))
  assert.ok(fout.some(f => f.includes('dosis per dag')))
})

test('mist de disclaimer', () => {
  assert.ok(checkText('Een feit over peptiden.').fout.some(f => f.includes('Uitsluitend voor onderzoek')))
})

test('lichaamstaal alleen fout op Pinterest', () => {
  const tekst = 'Voor en na. Uitsluitend voor onderzoek.'
  assert.deepStrictEqual(checkText(tekst, { kanaal: 'TikTok' }).fout, [])
  assert.strictEqual(checkText(tekst, { kanaal: 'Pinterest' }).fout.length, 1)
})

test('TikTok: link in caption is fout, lange caption een waarschuwing', () => {
  const post = voorbeeld.replace('kanaal: Pinterest', 'kanaal: TikTok').replace('Wist je dat', 'Kijk op peptideman.nl. Wist je dat')
  const { fout, letOp } = checkPost(post)
  assert.ok(fout.some(f => f.includes('link in TikTok-caption')))
  assert.ok(letOp.some(l => l.includes('advies maximaal 150')))
})

test('meer dan vijf hashtags en een stil kanaal', () => {
  const post = voorbeeld.replace('kanaal: Pinterest', 'kanaal: Instagram').replace('#PeptideMan', '#PeptideMan #a #b')
  const { fout } = checkPost(post)
  assert.ok(fout.some(f => f.includes('7 hashtags')))
  assert.ok(fout.some(f => f.includes('alleen TikTok en Pinterest')))
})

test('overclaims over het testen: "per batch" en "elke batch" zijn fout, HPLC-methode is let op', () => {
  const ok = 'Uitsluitend voor onderzoek.'
  for (const zin of [
    'Elke batch wordt getest door Janoshik.',
    'Per batch onafhankelijk getest.',
    'Wij testen elke batch.',
    'Zo wordt het per batch geborgd.',
  ]) {
    const { fout } = checkText(`${zin} ${ok}`)
    assert.ok(fout.some(f => /één batch getest/.test(f)), zin)
  }
  const { fout, letOp } = checkText(`Van 16 producten is een batch met HPLC geanalyseerd. ${ok}`)
  assert.deepStrictEqual(fout, [])
  assert.ok(letOp.some(l => /geen analysemethode/.test(l)))
  const schoon = checkText(`Voor 16 van de 18 producten staat het rapport van één geteste batch online. Een HPLC-test scheidt stoffen in pieken. ${ok}`)
  assert.deepStrictEqual(schoon.fout, [])
  assert.deepStrictEqual(schoon.letOp, [])
})
