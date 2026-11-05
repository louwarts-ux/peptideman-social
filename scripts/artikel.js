#!/usr/bin/env node
// artikel: zet een goedgekeurd website-artikel om naar HTML om in de webshop te plakken.
//   node scripts/artikel.js export artikelen/<slug>.md
// Schrijft artikelen/export/<slug>.html: titel en meta als commentaar bovenaan, de tekst als HTML
// en schema.org-gegevens (Article, plus FAQPage als er een "Veelgestelde vragen"-sectie is).
// Weigert te exporteren zolang het artikel regelfouten heeft of de claimcheck niet GOED is.
// Publiceert niets: David zet het artikel zelf als concept in de webshop en publiceert het.
const fs = require('fs')
const path = require('path')
const { checkArtikel } = require('./lib/regels')

const ROOT = path.resolve(__dirname, '..')

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function inline(s) {
  return esc(s)
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, tekst, url) => {
      const extern = /^https?:\/\//.test(url) && !/^https:\/\/(www\.)?peptideman\.nl/.test(url)
      return `<a href="${url}"${extern ? ' rel="noopener" target="_blank"' : ''}>${tekst}</a>`
    })
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>')
}

// Kleine Markdown-omzetter: koppen, alinea's, lijsten, citaten, vet, cursief en links.
function naarHtml(md) {
  const uit = []
  let lijst = null
  let alinea = []
  const sluitAlinea = () => {
    if (alinea.length) uit.push(`<p>${inline(alinea.join(' '))}</p>`)
    alinea = []
  }
  const sluitLijst = () => {
    if (lijst) uit.push(`</${lijst}>`)
    lijst = null
  }
  for (const regel of md.split(/\r?\n/)) {
    const kop = regel.match(/^(#{1,4}) (.+)$/)
    const item = regel.match(/^\s*([-*]|\d+\.) (.+)$/)
    if (kop) {
      sluitAlinea(), sluitLijst()
      uit.push(`<h${kop[1].length}>${inline(kop[2])}</h${kop[1].length}>`)
    } else if (item) {
      sluitAlinea()
      const soort = /\d/.test(item[1]) ? 'ol' : 'ul'
      if (lijst !== soort) sluitLijst(), uit.push(`<${soort}>`), (lijst = soort)
      uit.push(`<li>${inline(item[2])}</li>`)
    } else if (/^>\s?/.test(regel)) {
      sluitAlinea(), sluitLijst()
      uit.push(`<blockquote><p>${inline(regel.replace(/^>\s?/, ''))}</p></blockquote>`)
    } else if (!regel.trim()) {
      sluitAlinea(), sluitLijst()
    } else {
      sluitLijst()
      alinea.push(regel.trim())
    }
  }
  sluitAlinea(), sluitLijst()
  return uit.join('\n')
}

// Vragen (### ...) met hun antwoord uit de sectie "## Veelgestelde vragen"
function faq(md) {
  const sectie = md.split(/^## /m).find(s => /^veelgestelde vragen/i.test(s))
  if (!sectie) return []
  return sectie.split(/^### /m).slice(1).map(blok => {
    const [vraag, ...rest] = blok.split('\n')
    const antwoord = (rest.join('\n').trim().split(/\n\s*\n/)[0] ?? '').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[*_]/g, '').replace(/\s+/g, ' ').trim()
    return { vraag: vraag.trim(), antwoord }
  }).filter(v => v.vraag && v.antwoord)
}

function exporteer(bestand, vandaag = new Date().toISOString().slice(0, 10)) {
  const { velden, tekst, fout } = checkArtikel(fs.readFileSync(bestand, 'utf8'))
  if (fout.length) throw new Error(`Regelfouten, eerst herstellen:\n- ${fout.join('\n- ')}`)
  if (velden.claimcheck !== 'GOED') throw new Error('De claimcheck is nog niet GOED; eerst laten toetsen.')

  const url = `https://peptideman.nl/${velden.slug}`
  const schema = [{
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: velden.titel,
    description: velden.meta,
    inLanguage: 'nl-NL',
    datePublished: velden.datum || vandaag,
    mainEntityOfPage: url,
    author: { '@type': 'Organization', name: 'PeptideMan', url: 'https://peptideman.nl' },
    publisher: { '@type': 'Organization', name: 'PeptideMan', url: 'https://peptideman.nl' },
    citation: (velden.bronnen.match(/https:\/\/\S+/g) ?? []),
  }]
  const vragen = faq(tekst)
  if (vragen.length) {
    schema.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: vragen.map(v => ({ '@type': 'Question', name: v.vraag, acceptedAnswer: { '@type': 'Answer', text: v.antwoord } })),
    })
  }

  const html = [
    '<!--',
    `  SEO-titel: ${velden.titel}`,
    `  Meta-beschrijving: ${velden.meta}`,
    `  URL (slug): /${velden.slug}`,
    `  Zoekwoord: ${velden.zoekwoord}`,
    '  Plak dit als concept in de webshop; David publiceert.',
    '-->',
    naarHtml(tekst),
    ...schema.map(s => `<script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n</script>`),
    '',
  ].join('\n')

  const doel = path.join(ROOT, 'artikelen/export', `${velden.slug}.html`)
  fs.mkdirSync(path.dirname(doel), { recursive: true })
  fs.writeFileSync(doel, html)
  return path.relative(ROOT, doel)
}

module.exports = { naarHtml, faq, exporteer }

if (require.main === module) {
  const [cmd, bestand] = process.argv.slice(2)
  if (cmd !== 'export' || !bestand) {
    console.log('Gebruik: node scripts/artikel.js export artikelen/<slug>.md')
    process.exit(cmd ? 1 : 0)
  }
  try {
    const doel = exporteer(bestand)
    console.log(`✓ ${doel}\nZet daarna in ${bestand}: export: ${doel}`)
  } catch (e) {
    console.error(`✗ ${e.message}`)
    process.exit(1)
  }
}
