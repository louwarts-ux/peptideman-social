// Pure checks for a draft caption: no engine calls, so tests can import them directly.

export type Platform = {
  id: string
  label: string
  aliases: readonly string[]
  maxChars: number
  maxHashtags?: number
  // Characters shown before the feed cuts the caption off with "more"
  visibleChars?: number
}

// Limits as published by each platform; update here when they change.
export const PLATFORMS: readonly Platform[] = [
  { id: 'instagram', label: 'Instagram', aliases: ['ig', 'insta'], maxChars: 2200, maxHashtags: 30, visibleChars: 125 },
  { id: 'tiktok', label: 'TikTok', aliases: ['tt'], maxChars: 4000 },
  { id: 'x', label: 'X', aliases: ['twitter'], maxChars: 280 },
  { id: 'threads', label: 'Threads', aliases: [], maxChars: 500, maxHashtags: 1 },
  { id: 'linkedin', label: 'LinkedIn', aliases: ['li'], maxChars: 3000, visibleChars: 210 },
  { id: 'facebook', label: 'Facebook', aliases: ['fb'], maxChars: 63206 },
]

// Wording that platform ad and health policies flag in peptide and supplement posts
const CLAIMS: readonly { pattern: RegExp; why: string }[] = [
  { pattern: /\b(cures?|cured|curing|geneest|genezen)\b/i, why: 'cure claim' },
  { pattern: /\b(treats?|treatment|behandelt|behandeling)\b/i, why: 'treatment claim' },
  { pattern: /\b(heals?|healing)\b/i, why: 'healing claim' },
  { pattern: /\b(prevents?|prevention|voorkomt)\b/i, why: 'prevention claim' },
  { pattern: /\bfda[- ]?approved\b/i, why: 'regulatory approval claim' },
  { pattern: /\bclinically proven\b/i, why: 'unsupported clinical claim' },
  { pattern: /\b(guaranteed?|gegarandeerd)\b/i, why: 'guaranteed result' },
  { pattern: /\b(miracle|wondermiddel)\b/i, why: 'miracle wording' },
  { pattern: /\blose \d+\s?(kg|kilos?|lbs?|pounds)\b/i, why: 'specific weight-loss promise' },
  { pattern: /\b(no|zero) side[- ]effects\b/i, why: 'safety claim' },
]

export type Report = {
  chars: number
  hashtags: readonly string[]
  claims: readonly { match: string; why: string }[]
  results: readonly { platform: Platform; problems: readonly string[]; notes: readonly string[] }[]
}

export function findPlatform(word: string): Platform | undefined {
  const w = word.toLowerCase()
  return PLATFORMS.find(p => p.id === w || p.aliases.includes(w))
}

// Counts code points, so an emoji counts as one character as the platforms count it
export function countChars(text: string): number {
  return [...text].length
}

export function findHashtags(text: string): string[] {
  return text.match(/#[\p{L}\p{N}_]+/gu) ?? []
}

export function check(caption: string, only?: Platform): Report {
  const chars = countChars(caption)
  const hashtags = findHashtags(caption)
  const claims = CLAIMS.flatMap(({ pattern, why }) => {
    const m = caption.match(pattern)
    return m ? [{ match: m[0], why }] : []
  })

  const results = (only ? [only] : PLATFORMS).map(platform => {
    const problems: string[] = []
    const notes: string[] = []
    if (chars > platform.maxChars) {
      problems.push(`${chars - platform.maxChars} characters over the ${platform.maxChars} limit`)
    }
    if (platform.maxHashtags !== undefined && hashtags.length > platform.maxHashtags) {
      problems.push(`${hashtags.length} hashtags, limit is ${platform.maxHashtags}`)
    }
    if (platform.visibleChars !== undefined && chars > platform.visibleChars) {
      notes.push(`only the first ${platform.visibleChars} characters show before "more"`)
    }
    return { platform, problems, notes }
  })

  return { chars, hashtags, claims, results }
}

export function format(report: Report): string {
  const lines = [`${report.chars} characters, ${report.hashtags.length} hashtags`]
  for (const { platform, problems, notes } of report.results) {
    const status = problems.length === 0 ? 'ok' : 'too long or too many tags'
    lines.push(`${platform.label}: ${status}`)
    for (const p of problems) lines.push(`  ✗ ${p}`)
    for (const n of notes) lines.push(`  · ${n}`)
  }
  if (report.claims.length > 0) {
    lines.push('Health-claim wording that platforms may flag:')
    for (const c of report.claims) lines.push(`  ! "${c.match}": ${c.why}`)
  }
  return lines.join('\n')
}
