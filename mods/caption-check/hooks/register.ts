import type { Register } from 'claude-code'

import { check, findPlatform, format, PLATFORMS } from './check'

const USAGE = [
  'Usage: /caption-check [platform] <caption>',
  `Platforms: ${PLATFORMS.map(p => p.id).join(', ')}. Leave it out to check them all.`,
].join('\n')

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'caption-check',
      description: 'Check a draft post against platform length and hashtag limits, and flag health claims',
      argumentHint: '[platform] <caption>',
      immediate: true,
    })
    return next(e)
  })

  on('command.run', { command: 'caption-check' }, async ($, e) => {
    const args = e.args.trim()
    if (args === '') return { text: USAGE }

    const [first = '', ...rest] = args.split(/\s+/)
    const platform = findPlatform(first)
    // Keep the caption's own line breaks: cut only the platform word off the front
    const caption = platform ? args.slice(first.length).trim() : args
    if (caption === '') return { text: USAGE }

    const text = format(check(caption, platform))
    // Claude sees the result too, so a follow-up like "fix it" has something to work from
    return { text, context: [`/caption-check result for the caption:\n${caption}\n\n${text}`] }
  })
}
