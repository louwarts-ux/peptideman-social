const { test } = require('node:test')
const assert = require('node:assert')
const fs = require('fs')
const os = require('os')
const path = require('path')
const { spawnSync } = require('child_process')
const { beoordeel } = require('../scripts/hooks/poort')

const ROOT = path.join(__dirname, '..')
const voorbeeld = fs.readFileSync(path.join(ROOT, 'posts/2026-10-28-weetje-bpc-157.md'), 'utf8')
const M = 'mcp__Metricool_Social_Media_Management__'
const info = over => JSON.stringify({
  providers: [{ network: 'pinterest' }],
  media: ['https://peptideman-media-hspj.netlify.app/social/x.png'],
  text: 'Wat is BPC-157? Uitsluitend voor onderzoek.',
  ...over,
})

test('laat een schone post door en houdt een claim tegen', () => {
  const file_path = path.join(ROOT, 'posts/nieuw.md')
  assert.strictEqual(beoordeel({ tool_name: 'Write', tool_input: { file_path, content: voorbeeld } }, ROOT), null)
  const slecht = voorbeeld.replace('Wist je dat', 'Gegarandeerd: wist je dat')
  assert.match(beoordeel({ tool_name: 'Write', tool_input: { file_path, content: slecht } }, ROOT), /gegarandeerd resultaat/)
})

test('rekent een Edit door op het bestaande bestand', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'pm-'))
  fs.mkdirSync(path.join(dir, 'posts'))
  const file_path = path.join(dir, 'posts/a.md')
  fs.writeFileSync(file_path, voorbeeld)
  const edit = { file_path, old_string: 'Uitsluitend voor onderzoek.', new_string: 'Helpt bij herstel.' }
  const reden = beoordeel({ tool_name: 'Edit', tool_input: edit }, dir)
  assert.match(reden, /werkingsclaim/)
  assert.match(reden, /Uitsluitend voor onderzoek/)
})

test('negeert bestanden buiten posts/', () => {
  assert.strictEqual(beoordeel({ tool_name: 'Write', tool_input: { file_path: path.join(ROOT, 'notities.md'), content: 'geneest' } }, ROOT), null)
  assert.strictEqual(beoordeel({ tool_name: 'Write', tool_input: { file_path: path.join(ROOT, 'posts/media/a.html'), content: 'geneest' } }, ROOT), null)
})

test('Metricool: direct publiceren is dicht, review met schone tekst mag', () => {
  assert.match(beoordeel({ tool_name: `${M}createScheduledPost`, tool_input: {} }), /Direct publiceren is dicht/)
  assert.strictEqual(beoordeel({ tool_name: `${M}createScheduledPostForReview`, tool_input: { info: info() } }), null)
})

test('Metricool: geen beeld, stil kanaal of claim wordt tegengehouden', () => {
  const reden = beoordeel({
    tool_name: `${M}createScheduledPostForReview`,
    tool_input: { info: info({ media: [], providers: [{ network: 'instagram' }], text: 'Afvallen met peptiden' }) },
  })
  assert.match(reden, /geen beeld/)
  assert.match(reden, /instagram ligt stil/)
  assert.match(reden, /afvalclaim/)
})

test('als hook: exit 2 met reden op stderr', () => {
  const event = { tool_name: `${M}createScheduledPost`, tool_input: {} }
  const r = spawnSync('node', [path.join(ROOT, 'scripts/hooks/poort.js')], { input: JSON.stringify(event), encoding: 'utf8' })
  assert.strictEqual(r.status, 2)
  assert.match(r.stderr, /Direct publiceren is dicht/)
})

test('sessie-start toont de stand', () => {
  const r = spawnSync('node', [path.join(ROOT, 'scripts/hooks/sessie-start.js')], { encoding: 'utf8' })
  assert.strictEqual(r.status, 0)
  assert.match(r.stdout, /## Posts/)
})
