// Een losse tekst toetsen (een caption die je wilt plaatsen, een reactie, een idee) met precies de
// huisregels uit regels.js, plus de tekenlimieten per platform. Vervangt de oude caption-check-mod,
// die eigen, zwakkere regels had (17-11-2026). Gebruik: node scripts/pm.js tekst [platform] <tekst>
const { checkText, hashtagsVan } = require('./regels')

const MAX_HASHTAGS = 5 // huisregel, voor elk kanaal (kennis: "3 à 5 hashtags")

// Limieten zoals de platforms ze publiceren (max = harde grens, advies = huisregel of ervaring,
// zichtbaar = tekens vóór "meer"). Bijwerken als een platform ze verandert.
const PLATFORMS = [
  { id: 'tiktok', label: 'TikTok', aliases: ['tt'], max: 4000, advies: 150, geenLink: true },
  // Pinterest: 500 als advies, net als in regels.js (twee pins faalden met "400 Invalid request", nog niet bevestigd)
  { id: 'pinterest', label: 'Pinterest', aliases: ['pin'], max: Infinity, advies: 500 },
  { id: 'instagram', label: 'Instagram', aliases: ['ig', 'insta'], max: 2200, zichtbaar: 125 },
  { id: 'threads', label: 'Threads', aliases: [], max: 500, maxHashtags: 1 },
  { id: 'x', label: 'X', aliases: ['twitter'], max: 280 },
  { id: 'linkedin', label: 'LinkedIn', aliases: ['li'], max: 3000, zichtbaar: 210 },
  { id: 'facebook', label: 'Facebook', aliases: ['fb'], max: 63206 },
]

function vindPlatform(woord = '') {
  const w = woord.toLowerCase()
  return PLATFORMS.find(p => p.id === w || p.aliases.includes(w))
}

const tekens = t => [...t].length

function limieten(platform, text, tags) {
  const fout = []
  const letOp = []
  const n = tekens(text)
  if (n > platform.max) fout.push(`${platform.label}: ${n} tekens, maximaal ${platform.max}`)
  if (platform.advies && n > platform.advies) letOp.push(`${platform.label}: ${n} tekens, advies maximaal ${platform.advies}`)
  if (platform.zichtbaar && n > platform.zichtbaar) letOp.push(`${platform.label}: alleen de eerste ${platform.zichtbaar} tekens staan vóór "meer"`)
  if (platform.maxHashtags !== undefined && tags.length > platform.maxHashtags) fout.push(`${platform.label}: ${tags.length} hashtags, maximaal ${platform.maxHashtags}`)
  if (platform.geenLink && /https?:\/\/|www\.|\.nl\b/i.test(text)) fout.push('link in TikTok-caption: niet klikbaar, zet "link in bio"')
  return { fout, letOp }
}

// { fout, letOp, tekens, hashtags }; zonder platform alleen de huisregels en een overzicht van de limieten.
function toetsTekst(text, platformId) {
  const platform = vindPlatform(platformId)
  const { fout, letOp } = checkText(text, { kanaal: platform ? platform.id : '' })
  const tags = hashtagsVan(text)
  if (tags.length > MAX_HASHTAGS) fout.push(`${tags.length} hashtags, maximaal ${MAX_HASHTAGS}`)
  if (platform) {
    const l = limieten(platform, text, tags)
    fout.push(...l.fout)
    letOp.push(...l.letOp)
  } else {
    const te = PLATFORMS.filter(p => tekens(text) > p.max).map(p => p.label)
    if (te.length) letOp.push(`te lang voor ${te.join(', ')}`)
  }
  return { fout, letOp, tekens: tekens(text), hashtags: tags.length, platform }
}

module.exports = { toetsTekst, vindPlatform, PLATFORMS, MAX_HASHTAGS }
