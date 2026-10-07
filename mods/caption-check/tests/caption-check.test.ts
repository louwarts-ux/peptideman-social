import { describe, expect, test } from 'claude-code/testing'

import { check, findPlatform, format } from '../hooks/check'

describe('check', () => {
  test('flags a caption too long for X', async () => {
    const report = check('a'.repeat(300), findPlatform('twitter'))
    expect(report.results[0]?.problems).toEqual(['20 characters over the 280 limit'])
  })

  test('counts an emoji as one character', async () => {
    expect(check('💪🧬').chars).toBe(2)
  })

  test('flags more than one hashtag on Threads', async () => {
    const report = check('morning stack #peptides #recovery', findPlatform('threads'))
    expect(report.results[0]?.problems).toEqual(['2 hashtags, limit is 1'])
  })

  test('flags health-claim wording', async () => {
    const report = check('BPC-157 heals your gut, guaranteed')
    expect(report.claims.map(c => c.why)).toEqual(['healing claim', 'guaranteed result'])
    expect(format(report)).toContain('"heals": healing claim')
  })

  test('passes a short clean caption everywhere', async () => {
    const report = check('New lab results are in #research')
    expect(report.results.every(r => r.problems.length === 0)).toBe(true)
    expect(report.claims).toEqual([])
  })
})

// As the person typing the command at the prompt
const TYPED = { origin: { kind: 'composer' }, presentation: { isFullscreen: false, columns: 80 } } as const

describe('/caption-check', () => {
  test('answers with the report for one platform', async $ => {
    const ran = await $.command.run({ ...TYPED, command: 'caption-check', args: 'x ' + 'a'.repeat(281) })
    expect(ran.text).toContain('X: too long or too many tags')
    expect(ran.text).not.toContain('Instagram')
  })

  test('shows usage with no caption', async $ => {
    const ran = await $.command.run({ ...TYPED, command: 'caption-check', args: '' })
    expect(ran.text).toContain('Usage: /caption-check')
  })
})
