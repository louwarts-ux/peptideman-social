// De vaste regels uit kennis/peptideman.md als code, zodat hooks en `pm check` ze
// altijd hetzelfde toepassen. Twijfelgevallen blijven werk voor de claimcheck-agent:
// hier staat alleen wat zonder twijfel fout is (fout) of een tweede blik verdient (let op).

// Woorden die een gezondheidsclaim of belofte maken
const CLAIMS = [
  { re: /\b(genees|geneest|genezen|genezing|cures?|cured|curing)\b/i, why: 'geneesclaim' },
  { re: /\b(behandelt|behandelen|behandeling tegen|treats?|treatment for)\b/i, why: 'behandelclaim' },
  { re: /\b(heals?|healing)\b/i, why: 'geneesclaim' },
  { re: /\b(helpt|werkt) (bij|tegen)\b/i, why: 'werkingsclaim' },
  { re: /\b(afvallen|vetverbranding|fat ?loss|weight ?loss|lose weight)\b/i, why: 'afvalclaim' },
  { re: /\b(spiergroei|spiermassa opbouwen|muscle growth|build muscle)\b/i, why: 'spiergroeiclaim' },
  { re: /\b(verjong\w*|anti-?aging|jonger worden)\b/i, why: 'verjongingsclaim' },
  { re: /\b(gegarandeerd|guaranteed?)\b/i, why: 'gegarandeerd resultaat' },
  { re: /\b(wondermiddel|miracle)\b/i, why: 'wonderbelofte' },
  { re: /\b(klinisch bewezen|clinically proven|fda[- ]?approved)\b/i, why: 'onterechte bewijs- of goedkeuringsclaim' },
  { re: /\b(geen|zonder|no|zero) (bijwerkingen|side[- ]effects)\b/i, why: 'veiligheidsclaim' },
]

// Doseeradvies of gebruiksinstructies voor mensen
const DOSERING = [
  { re: /\b(dosering|doseer\w*|doseringsadvies|dosage|dosing)\b/i, why: 'doseeradvies' },
  { re: /\b(injecteer|injecteren|inject yourself|zelf (spuiten|injecteren))\b/i, why: 'injectie-instructie' },
  { re: /\b(kuur|protocol voor jezelf|stack(en)? met)\b/i, why: 'gebruiksadvies' },
  { re: /\b\d+([.,]\d+)?\s?(mcg|µg|mg|iu|ie)\s?(per|\/)\s?(dag|day|week)\b/i, why: 'dosis per dag of week' },
]

// Pinterest weigert taal over lichaamsverandering
const LICHAAM = [
  { re: /\b(gewichtsverlies|kilo'?s? kwijt|buikvet|vetverlies|slank(er)?|voor en na|before and after|body ?transformation|droogtrainen)\b/i, why: 'lichaamsverandering (Pinterest)' },
]

const KANALEN = ['tiktok', 'pinterest']
const VELDEN = ['kanaal', 'pijler', 'caption', 'hashtags', 'bron', 'claimcheck']
const DISCLAIMER = /uitsluitend voor onderzoek/i

// Leest een postbestand: `sleutel: waarde` op regelbegin, `sleutel: |` voor een blok
// van ingesprongen regels (zoals de caption).
function parsePost(text) {
  const post = {}
  const lines = text.split(/\r?\n/)
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^([a-z][a-z-]*):\s?(.*)$/)
    if (!m) continue
    const [, key, value] = m
    if (value.trim() !== '|') {
      post[key] = value.trim()
      continue
    }
    const block = []
    while (i + 1 < lines.length && (lines[i + 1] === '' || /^\s/.test(lines[i + 1]))) {
      block.push(lines[++i].replace(/^ {2}/, ''))
    }
    post[key] = block.join('\n').trim()
  }
  return post
}

function vind(text, regels) {
  return regels.flatMap(({ re, why }) => {
    const m = text.match(re)
    return m ? [{ match: m[0], why }] : []
  })
}

// Controle van een losse publieke tekst (caption, beeldtekst, Metricool-tekst)
function checkText(text, { kanaal } = {}) {
  const fout = []
  const letOp = []
  for (const c of vind(text, CLAIMS)) fout.push(`"${c.match}": ${c.why}`)
  for (const c of vind(text, DOSERING)) fout.push(`"${c.match}": ${c.why}`)
  if (/pinterest/i.test(kanaal ?? '')) {
    for (const c of vind(text, LICHAAM)) fout.push(`"${c.match}": ${c.why}`)
  }
  if (!DISCLAIMER.test(text)) fout.push('"Uitsluitend voor onderzoek." ontbreekt')
  if (/\b\d+([.,]\d+)?\s?(mcg|µg|mg|iu|ie)\b/i.test(text)) letOp.push('bevat een hoeveelheid in mg/mcg/IE: is het echt onderzoek en geen dosering?')
  return { fout, letOp }
}

function hashtagsVan(text) {
  return text.match(/#[\p{L}\p{N}_]+/gu) ?? []
}

// Volledige controle van een postbestand in posts/
function checkPost(text) {
  const post = parsePost(text)
  const kanaal = (post.kanaal ?? '').toLowerCase()
  const publiek = [post.caption, post['pin-titel'], post.beeldtekst].filter(Boolean).join('\n')
  const { fout, letOp } = checkText(publiek, { kanaal })

  for (const veld of VELDEN) if (!post[veld]) fout.push(`veld "${veld}" ontbreekt`)
  if (kanaal && !KANALEN.some(k => kanaal.includes(k))) fout.push(`kanaal "${post.kanaal}": alleen TikTok en Pinterest zijn actief`)
  if (post.bron && !/pubmed\.ncbi\.nlm\.nih\.gov\/\d+/.test(post.bron) && !/labwerk/i.test(post.pijler ?? '')) {
    fout.push('bron is geen PubMed-link')
  }

  const tags = hashtagsVan(post.hashtags ?? '')
  if (tags.length > 5) fout.push(`${tags.length} hashtags, maximaal 5`)

  if (kanaal.includes('tiktok')) {
    const lengte = [...(post.caption ?? '')].length
    if (/https?:\/\/|www\.|\.nl\b/i.test(post.caption ?? '')) fout.push('link in TikTok-caption: niet klikbaar, zet "link in bio"')
    if (lengte > 150) letOp.push(`TikTok-caption is ${lengte} tekens, advies maximaal 150`)
  }
  if (kanaal.includes('pinterest') && !post['pin-titel']) letOp.push('pin-titel ontbreekt (een zoekvraag)')

  const beeldUrl = post['beeld-url'] ?? 'open'
  if (beeldUrl !== 'open' && !/^https:\/\//.test(beeldUrl)) fout.push('beeld-url is geen https-link')

  return { post, fout, letOp, stap: volgendeStap(post, fout) }
}

// Waar staat de post in de keten: schrijven -> claimcheck -> beeld online -> inplannen
function volgendeStap(post, fout = []) {
  if (fout.length > 0) return 'herstellen'
  if ((post.claimcheck ?? 'open') !== 'GOED') return 'claimcheck'
  if (!/^https:\/\//.test(post['beeld-url'] ?? '')) return 'beeld online zetten'
  if (!post.ingepland) return 'inplannen'
  return 'klaar'
}

module.exports = { parsePost, checkText, checkPost, volgendeStap, hashtagsVan, KANALEN }
