const { test } = require('node:test')
const assert = require('node:assert')
const path = require('path')
const { productpagina, artikelpagina, alsScriptTag } = require('../website/jsonld')
const { checkText } = require('../scripts/lib/regels')
const data = require('../website/voorbeeld-data.json')

const SITE = data.site
const peptide = data.peptiden[0]
const product = { ...data.producten[0], prijs_cent: 3995, voorraad: 4, vorm: 'gevriesdroogd poeder (lyofilisaat)', batchnummer: 'B-001', bijgewerkt_op: '2026-11-06' }
const rapport = { lab: 'Janoshik Analytical', rapportnummer: '12345', testdatum: '2026-10-01', methode: 'HPLC+LC-MS', zuiverheid_pct: 99.2, pdf_url: 'https://peptideman.nl/rapporten/12345.pdf', verificatie_url: 'https://janoshik.com/verify/12345' }
const reviews = [
  { weergavenaam: 'M.', sterren: 5, tekst: 'Snel geleverd en netjes verpakt.', status: 'goedgekeurd', claimcheck_ok: true, geplaatst_op: '2026-10-20' },
  { weergavenaam: 'K.', sterren: 5, tekst: 'Mijn knie is genezen!', status: 'nieuw', claimcheck_ok: false, geplaatst_op: '2026-10-21' },
]

const alleTekst = graaf => JSON.stringify(graaf)
const typen = graaf => graaf['@graph'].map(n => n['@type'])

test('productpagina: Product, stof en labrapport hangen aan elkaar via @id', () => {
  const g = productpagina({ site: SITE, peptide, product, rapport, reviews, verzending: data.verzending })
  assert.deepStrictEqual(typen(g).sort(), ['ChemicalSubstance', 'DigitalDocument', 'Organization', 'Product', 'WebPage', 'WebSite'].sort())
  const pagina = g['@graph'].find(n => n['@type'] === 'WebPage')
  const prod = g['@graph'].find(n => n['@type'] === 'Product')
  const stof = g['@graph'].find(n => n['@type'] === 'ChemicalSubstance')
  assert.strictEqual(pagina.mainEntity['@id'], prod['@id'])
  assert.ok(pagina.about.some(a => a['@id'] === stof['@id']))
  assert.strictEqual(prod.offers.price, '39.95')
  assert.strictEqual(prod.offers.priceCurrency, 'EUR')
  assert.ok(prod.additionalProperty.some(p => p.name === 'Zuiverheid (gemeten)' && p.value === 99.2))
})

test('alleen gecontroleerde reviews komen in de JSON-LD', () => {
  const g = productpagina({ site: SITE, peptide, product, rapport, reviews })
  const prod = g['@graph'].find(n => n['@type'] === 'Product')
  assert.strictEqual(prod.review.length, 1)
  assert.strictEqual(prod.aggregateRating.reviewCount, 1)
  assert.doesNotMatch(alleTekst(g), /genezen/)
})

test('geen medische schematypen en geen dosisvelden', () => {
  const g = productpagina({ site: SITE, peptide, product, rapport, reviews })
  const tekst = alleTekst(g)
  assert.doesNotMatch(tekst, /MedicalWebPage|"Substance"|Drug|maximumIntake|doseSchedule|indication|activeIngredient/)
})

test('alle vijf peptiden: teksten slagen voor de regels, met disclaimer', () => {
  for (const p of data.peptiden) {
    const prod = { ...data.producten.find(x => x.peptide === p.slug), prijs_cent: 1000, voorraad: 1 }
    const g = productpagina({ site: SITE, peptide: p, product: prod })
    const prodNode = g['@graph'].find(n => n['@type'] === 'Product')
    const { fout } = checkText(prodNode.description)
    assert.deepStrictEqual(fout, [], `${p.naam}: ${fout.join(', ')}`)
    const woorden = p.kort_antwoord.trim().split(/\s+/).length
    assert.ok(woorden >= 15 && woorden <= 30, `${p.naam}: kort antwoord is ${woorden} woorden`)
  }
})

test('artikelpagina: Article, FAQ en bronnen met PubMed-link', () => {
  const bron = data.bronnen[0]
  const g = artikelpagina({
    site: SITE,
    artikel: { slug: 'wat-is-bpc-157', vraag: 'Wat is BPC-157?', kort_antwoord: peptide.kort_antwoord, gepubliceerd_op: '2026-11-01', bijgewerkt_op: '2026-11-06' },
    auteur: data.auteurs[0],
    eindredactie: { naam: 'David' },
    peptiden: [peptide],
    bronnen: [bron],
  })
  const art = g['@graph'].find(n => n['@type'] === 'Article')
  assert.strictEqual(art.citation[0]['@id'], `https://pubmed.ncbi.nlm.nih.gov/${bron.pmid}/`)
  assert.strictEqual(art.about[0]['@id'], `${SITE}/#stof-bpc-157`)
  const faq = g['@graph'].find(n => n['@type'] === 'FAQPage')
  assert.match(faq.mainEntity[0].acceptedAnswer.text, /Uitsluitend voor onderzoek\.$/)
})

test('script-tag kan niet uit de HTML breken', () => {
  const g = productpagina({ site: SITE, peptide: { ...peptide, kort_antwoord: '</script><script>alert(1)</script>' }, product })
  assert.doesNotMatch(alsScriptTag(g), /<\/script>/)
})
