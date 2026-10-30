const { test } = require('node:test')
const assert = require('node:assert')
const fs = require('fs')
const path = require('path')
const { parsePost, checkPost, checkText } = require('../scripts/lib/regels')

const voorbeeld = fs.readFileSync(path.join(__dirname, '../posts/2026-10-28-weetje-bpc-157.md'), 'utf8')

test('leest velden en een caption-blok', () => {
  const post = parsePost(voorbeeld)
  assert.strictEqual(post.kanaal, 'Pinterest')
  assert.match(post.caption, /^Wist je dat/)
  assert.match(post.caption, /Uitsluitend voor onderzoek\.$/)
})

test('de bestaande post komt door de regels', () => {
  const { fout, stap } = checkPost(voorbeeld)
  assert.deepStrictEqual(fout, [])
  assert.strictEqual(stap, 'beeld online zetten')
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
