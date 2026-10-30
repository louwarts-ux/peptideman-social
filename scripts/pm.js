#!/usr/bin/env node
// pm: het gereedschap achter de PeptideMan-werkwijze.
//   node scripts/pm.js status          waar staat elke post, wat is de volgende stap
//   node scripts/pm.js check [post...] posts toetsen aan de regels (zonder argument: alle)
//   node scripts/pm.js shield          agents, hooks en repo scannen op risico's
//   node scripts/pm.js doctor          is alles aanwezig en aangesloten
// Exitcode 1 als check, shield of doctor een fout vindt.
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const { checkPost } = require('./lib/regels')

const ROOT = path.resolve(__dirname, '..')
const lees = rel => fs.readFileSync(path.join(ROOT, rel), 'utf8')
const bestaat = rel => fs.existsSync(path.join(ROOT, rel))
const lijst = (rel, re) => (bestaat(rel) ? fs.readdirSync(path.join(ROOT, rel)).filter(f => re.test(f)).sort() : [])

function posts() {
  return lijst('posts', /\.md$/).map(f => ({ bestand: `posts/${f}`, ...checkPost(lees(`posts/${f}`)) }))
}

function status() {
  const regels = ['## Posts']
  const alle = posts()
  if (!alle.length) regels.push('Nog geen posts.')
  for (const p of alle) regels.push(`- ${p.bestand} (${p.post.kanaal ?? '?'}, ${p.post.pijler ?? '?'}): volgende stap ${p.stap}`)

  const inzichten = lijst('inzichten', /^\d{4}-\d{2}-\d{2}\.md$/)
  regels.push('', '## Analyse', inzichten.length ? `Laatste verslag: inzichten/${inzichten.at(-1)}` : 'Nog geen verslag van de analist.')

  const plannen = lijst('planning', /\.md$/)
  if (plannen.length) regels.push('', '## Planning', `Laatste plan: planning/${plannen.at(-1)}`)

  const sessies = lijst('geheugen/sessies', /\.md$/)
  if (sessies.length) regels.push('', '## Vorige sessie', lees(`geheugen/sessies/${sessies.at(-1)}`).trim())

  if (bestaat('geheugen/lessen.md')) {
    const sterk = lees('geheugen/lessen.md').split('\n').filter(l => {
      const m = l.match(/^- \[(\d(?:\.\d+)?)\]/)
      return m && Number(m[1]) >= 0.5
    })
    if (sterk.length) regels.push('', '## Lessen (zekerheid 0,5 of hoger)', ...sterk)
  }
  return regels.join('\n')
}

function check(bestanden) {
  const doel = bestanden.length ? bestanden.map(b => ({ bestand: b, ...checkPost(fs.readFileSync(b, 'utf8')) })) : posts()
  let fouten = 0
  for (const p of doel) {
    console.log(`${p.fout.length ? '✗' : '✓'} ${p.bestand}: volgende stap ${p.stap}`)
    for (const f of p.fout) console.log(`  ✗ ${f}`)
    for (const l of p.letOp) console.log(`  · ${l}`)
    fouten += p.fout.length
  }
  return fouten
}

// Gereedschap dat nooit in een agent hoort: publiceert direct of verwijdert
const GEVAARLIJK = /(__createScheduledPost\b(?!ForReview)|__updateScheduledPost|delete|trash|send_message|share_file)/i
const GEHEIMEN = [
  [/sk-(ant-)?[A-Za-z0-9_-]{20,}/, 'API-sleutel'],
  [/ghp_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,}/, 'GitHub-token'],
  [/nfp_[A-Za-z0-9]{30,}/, 'Netlify-token'],
  [/AKIA[0-9A-Z]{16}/, 'AWS-sleutel'],
  [/xox[abprs]-[A-Za-z0-9-]{10,}/, 'Slack-token'],
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, 'privésleutel'],
]
const INJECTIE = /ignore (all )?(previous|prior) instructions|negeer (alle )?(eerdere|vorige) instructies/i

function shield() {
  const fouten = []
  const letOp = []
  for (const f of lijst('.claude/agents', /\.md$/)) {
    const tekst = lees(`.claude/agents/${f}`)
    const tools = (tekst.match(/^tools:\s*(.*)$/m) ?? [])[1]
    if (!tools) fouten.push(`${f}: geen "tools:"-regel, dus de agent krijgt alle tools`)
    else {
      for (const t of tools.split(',').map(s => s.trim())) {
        if (t === '*' || t === 'Bash') letOp.push(`${f}: heeft ${t}; nodig?`)
        if (GEVAARLIJK.test(t)) fouten.push(`${f}: heeft ${t}, dat publiceert of verwijdert zonder controle`)
      }
    }
  }
  if (!bestaat('.claude/settings.json')) fouten.push('.claude/settings.json ontbreekt: de poort-hook staat niet aan')
  else {
    const s = JSON.parse(lees('.claude/settings.json'))
    if (!JSON.stringify(s.hooks?.PreToolUse ?? []).includes('poort.js')) fouten.push('poort-hook staat niet in PreToolUse')
    for (const regel of s.permissions?.allow ?? []) if (/^Bash(\(\*\))?$/.test(regel)) letOp.push(`ruime toestemming "${regel}"`)
    if (/curl|wget|https?:\/\//.test(JSON.stringify(s.hooks ?? {}))) letOp.push('een hook praat met internet')
  }
  let bestanden = []
  try {
    bestanden = execSync('git ls-files', { cwd: ROOT, encoding: 'utf8' }).split('\n').filter(Boolean)
  } catch {}
  for (const f of bestanden) {
    if (/\.(png|jpe?g|gif|webp|pdf)$/i.test(f) || !bestaat(f) || !fs.statSync(path.join(ROOT, f)).isFile()) continue
    const tekst = lees(f)
    for (const [re, naam] of GEHEIMEN) if (re.test(tekst)) fouten.push(`${f}: lijkt een ${naam} te bevatten`)
    if (/\.claude\/|kennis\/|\.agents\//.test(f) && INJECTIE.test(tekst)) fouten.push(`${f}: tekst die op prompt-injectie lijkt`)
  }
  for (const f of fouten) console.log(`✗ ${f}`)
  for (const l of letOp) console.log(`· ${l}`)
  if (!fouten.length) console.log(`✓ shield: geen fouten (${bestanden.length} bestanden, ${lijst('.claude/agents', /\.md$/).length} agents)`)
  return fouten.length
}

function doctor() {
  const fouten = []
  const ok = []
  const major = Number(process.versions.node.split('.')[0])
  ;(major >= 18 ? ok : fouten).push(`Node ${process.versions.node} (18 of hoger nodig)`)
  try {
    require.resolve('playwright')
    ok.push('Playwright gevonden (voor scripts/render.js)')
  } catch {
    fouten.push('Playwright niet gevonden: render.js werkt niet')
  }
  for (const rel of ['kennis/peptideman.md', 'CLAUDE.md', 'geheugen/lessen.md', '.claude/settings.json', 'scripts/hooks/poort.js', 'scripts/hooks/sessie-start.js']) {
    ;(bestaat(rel) ? ok : fouten).push(rel)
  }
  if (bestaat('kennis/peptideman.md')) {
    const kennis = lees('kennis/peptideman.md')
    for (const sectie of ['## Wat werkt', '## Per kanaal', '## Regels voor alle teksten']) {
      ;(kennis.includes(sectie) ? ok : fouten).push(`kennis: sectie "${sectie.slice(3)}"`)
    }
  }
  for (const s of lijst('.claude/skills', /./)) {
    ;(bestaat(`.claude/skills/${s}/SKILL.md`) ? ok : fouten).push(`skill ${s}`)
  }
  for (const p of posts()) if (p.fout.length) fouten.push(`${p.bestand}: ${p.fout.length} regelfout(en), zie pm check`)
  for (const o of ok) console.log(`✓ ${o}`)
  for (const f of fouten) console.log(`✗ ${f}`)
  return fouten.length
}

module.exports = { status }

if (require.main === module) {
  const [cmd, ...args] = process.argv.slice(2)
  const acties = { status: () => (console.log(status()), 0), check: () => check(args), shield, doctor }
  if (!acties[cmd]) {
    console.log('Gebruik: node scripts/pm.js status | check [post...] | shield | doctor')
    process.exit(cmd ? 1 : 0)
  }
  process.exit(acties[cmd]() > 0 ? 1 : 0)
}
