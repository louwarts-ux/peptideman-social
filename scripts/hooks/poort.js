#!/usr/bin/env node
// PreToolUse-poort: houdt deterministisch tegen wat nooit mag, wat de agent ook denkt.
// - Schrijven in posts/*.md: de nieuwe inhoud moet door `checkPost` komen.
// - Metricool: direct publiceren is dicht; klaarzetten en wijzigen alleen met een schone tekst en beeld.
// Exit 2 blokkeert de tool; de melding op stderr gaat terug naar Claude.
const fs = require('fs')
const path = require('path')
const { checkPost, checkText, KANALEN } = require('../lib/regels')

const METRICOOL = 'mcp__Metricool_Social_Media_Management__'

function nieuweInhoud(tool, input) {
  if (tool === 'Write') return input.content ?? ''
  let tekst = fs.existsSync(input.file_path) ? fs.readFileSync(input.file_path, 'utf8') : ''
  const edits = tool === 'MultiEdit' ? input.edits ?? [] : [input]
  for (const e of edits) {
    tekst = e.replace_all ? tekst.split(e.old_string).join(e.new_string) : tekst.replace(e.old_string, () => e.new_string)
  }
  return tekst
}

function beoordeel({ tool_name: tool, tool_input: input = {} }, projectDir = process.cwd()) {
  if (['Write', 'Edit', 'MultiEdit'].includes(tool)) {
    const rel = path.relative(projectDir, path.resolve(projectDir, input.file_path ?? '')).split(path.sep).join('/')
    if (!/^posts\/[^/]+\.md$/.test(rel)) return null
    const { fout } = checkPost(nieuweInhoud(tool, input))
    return fout.length ? `Post ${rel} houdt zich niet aan de regels:\n- ${fout.join('\n- ')}` : null
  }

  if (tool === `${METRICOOL}createScheduledPost`) {
    return 'Direct publiceren is dicht. Gebruik createScheduledPostForReview zodat David de post eerst goedkeurt.'
  }
  if (tool === `${METRICOOL}createScheduledPostForReview` || tool === `${METRICOOL}updateScheduledPost`) {
    let info
    try {
      info = typeof input.info === 'string' ? JSON.parse(input.info) : input.info ?? {}
    } catch {
      return 'Kan "info" niet lezen als JSON.'
    }
    const netwerken = (info.providers ?? []).map(p => p.network)
    const problemen = []
    const anders = netwerken.filter(n => !KANALEN.includes(n))
    if (anders.length) problemen.push(`kanaal ${anders.join(', ')} ligt stil; alleen TikTok en Pinterest`)
    if (!(info.media ?? []).length) problemen.push('geen beeld: Pinterest en TikTok weigeren een post zonder beeld')
    for (const m of info.media ?? []) if (!/^https:\/\//.test(m)) problemen.push(`beeld "${m}" is geen openbare https-link`)
    if (info.autoPublish === true && tool === `${METRICOOL}updateScheduledPost`) problemen.push('autoPublish aanzetten bij een wijziging mag niet')
    const tekst = [info.text, info.pinterestData?.pinTitle].filter(Boolean).join('\n')
    problemen.push(...checkText(tekst, { kanaal: netwerken.join(' ') }).fout)
    return problemen.length ? `Metricool-post tegengehouden:\n- ${problemen.join('\n- ')}` : null
  }
  return null
}

module.exports = { beoordeel }

if (require.main === module) {
  let raw = ''
  process.stdin.on('data', d => (raw += d))
  process.stdin.on('end', () => {
    let event
    try {
      event = JSON.parse(raw)
    } catch {
      process.exit(0)
    }
    const reden = beoordeel(event, process.env.CLAUDE_PROJECT_DIR || event.cwd || process.cwd())
    if (reden) {
      process.stderr.write(`${reden}\nPas de tekst aan (zie kennis/peptideman.md, "Regels voor alle teksten") en probeer opnieuw.\n`)
      process.exit(2)
    }
  })
}
