// JSON-LD voor peptideman.nl, automatisch uit de database-records.
//
// Eén graaf per pagina. Entiteiten verwijzen naar elkaar via vaste @id's, zodat
// een productpagina en een kennisbankartikel over dezelfde stof één netwerk vormen:
//
//   Organization ──seller──> Offer <──offers── Product ──subjectOf──> labrapport (PDF)
//                                                 ▲
//   WebPage ──mainEntity────────────────────────┘ │
//   WebPage ──about──> ChemicalSubstance <────────┘ (zelfde @id op elke pagina)
//   Article ──about──> ChemicalSubstance, ──citation──> ScholarlyArticle (PubMed)
//
// Bewuste keuzes (zie README): ChemicalSubstance in plaats van Substance, WebPage in
// plaats van MedicalWebPage, en alleen gecontroleerde reviews. Geen afhankelijkheden;
// werkt in Node en in Next.js server components.

const DISCLAIMER = 'Uitsluitend voor onderzoek.'

const ids = site => ({
  organisatie: `${site}/#organisatie`,
  website: `${site}/#website`,
  stof: slug => `${site}/#stof-${slug}`,
  product: slug => `${site}/peptiden/${slug}#product`,
  productpagina: slug => `${site}/peptiden/${slug}`,
  artikel: slug => `${site}/kennisbank/${slug}`,
  rapport: nr => `${site}/#labrapport-${encodeURIComponent(nr)}`,
  bron: b => (b.pmid ? `https://pubmed.ncbi.nlm.nih.gov/${b.pmid}/` : `https://doi.org/${b.doi}`),
})

const euro = cent => (cent / 100).toFixed(2)
const datum = d => (d instanceof Date ? d.toISOString() : d ?? undefined)

// Laat lege velden weg, zodat validators niet over null struikelen
function schoon(obj) {
  if (Array.isArray(obj)) return obj.map(schoon).filter(v => v !== undefined)
  if (obj && typeof obj === 'object') {
    const uit = {}
    for (const [k, v] of Object.entries(obj)) {
      const s = schoon(v)
      if (s === undefined || s === null || s === '' || (Array.isArray(s) && s.length === 0)) continue
      uit[k] = s
    }
    return uit
  }
  return obj
}

function organisatie(site) {
  const id = ids(site)
  return [
    {
      '@type': 'Organization',
      '@id': id.organisatie,
      name: 'PeptideMan',
      url: site,
      email: 'info@peptideman.nl',
      logo: `${site}/logo.png`,
      sameAs: [
        'https://www.instagram.com/peptideman.nl',
        'https://www.threads.net/@peptideman.nl',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': id.website,
      url: site,
      name: 'PeptideMan',
      inLanguage: 'nl-NL',
      publisher: { '@id': id.organisatie },
    },
  ]
}

// De stof: alleen scheikundige identiteit, nooit werking of gebruik
function stof(site, peptide, artikelen = []) {
  const id = ids(site)
  return {
    '@type': 'ChemicalSubstance',
    '@id': id.stof(peptide.slug),
    name: peptide.naam,
    alternateName: peptide.synoniemen,
    description: peptide.kort_antwoord,
    molecularFormula: peptide.molecuulformule,
    molecularWeight: peptide.molecuulmassa
      ? { '@type': 'QuantitativeValue', value: Number(peptide.molecuulmassa), unitText: 'g/mol' }
      : undefined,
    chemicalComposition: peptide.sequentie,
    identifier: [
      peptide.cas_nummer && { '@type': 'PropertyValue', propertyID: 'CAS', value: peptide.cas_nummer },
      peptide.pubchem_cid && { '@type': 'PropertyValue', propertyID: 'PubChem CID', value: String(peptide.pubchem_cid) },
    ].filter(Boolean),
    sameAs: peptide.pubchem_cid ? [`https://pubchem.ncbi.nlm.nih.gov/compound/${peptide.pubchem_cid}`] : [],
    subjectOf: artikelen.map(a => ({ '@id': id.artikel(a.slug) })),
  }
}

function labrapport(site, r) {
  if (!r?.rapportnummer) return undefined
  return {
    '@type': 'DigitalDocument',
    '@id': ids(site).rapport(r.rapportnummer),
    name: `Labrapport ${r.lab} ${r.rapportnummer}`,
    encodingFormat: 'application/pdf',
    url: r.pdf_url,
    dateCreated: datum(r.testdatum),
    author: { '@type': 'Organization', name: r.lab },
    sameAs: r.verificatie_url,
  }
}

// Alleen reviews die door moderatie en claimcheck zijn gekomen
const toonbaar = r => r.status === 'goedgekeurd' && r.claimcheck_ok === true

function productpagina({ site, peptide, product, rapport, reviews = [], artikelen = [], verzending }) {
  const id = ids(site)
  const zichtbaar = reviews.filter(toonbaar)
  const r = labrapport(site, rapport)

  const eigenschappen = [
    { name: 'Inhoud', value: Number(product.hoeveelheid_mg), unitCode: 'MGM' },
    { name: 'Vorm', value: product.vorm },
    rapport?.zuiverheid_pct != null && { name: 'Zuiverheid (gemeten)', value: Number(rapport.zuiverheid_pct), unitText: '%' },
    rapport?.methode && { name: 'Testmethode', value: rapport.methode },
    rapport?.lab && { name: 'Onafhankelijk lab', value: rapport.lab },
    product.batchnummer && { name: 'Batch', value: product.batchnummer },
  ].filter(Boolean).map(p => ({ '@type': 'PropertyValue', ...p }))

  const productNode = {
    '@type': 'Product',
    '@id': id.product(product.slug),
    name: product.naam,
    sku: product.sku,
    gtin: product.gtin,
    image: product.afbeelding_url,
    description: `${peptide.kort_antwoord} ${DISCLAIMER}`,
    category: 'Onderzoekschemicaliën',
    brand: { '@id': id.organisatie },
    additionalProperty: eigenschappen,
    subjectOf: r ? { '@id': r['@id'] } : undefined,
    offers: {
      '@type': 'Offer',
      url: id.productpagina(product.slug),
      price: euro(product.prijs_cent),
      priceCurrency: 'EUR',
      availability: product.voorraad > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@id': id.organisatie },
      shippingDetails: verzending && {
        '@type': 'OfferShippingDetails',
        shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'NL' },
        shippingRate: { '@type': 'MonetaryAmount', value: euro(verzending.tarief_cent), currency: 'EUR' },
      },
    },
    review: zichtbaar.map(v => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: v.weergavenaam },
      datePublished: datum(v.geplaatst_op),
      reviewBody: v.tekst,
      reviewRating: { '@type': 'Rating', ratingValue: v.sterren, bestRating: 5, worstRating: 1 },
    })),
    aggregateRating: zichtbaar.length
      ? {
          '@type': 'AggregateRating',
          ratingValue: (zichtbaar.reduce((s, v) => s + v.sterren, 0) / zichtbaar.length).toFixed(1),
          reviewCount: zichtbaar.length,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined,
  }

  const pagina = {
    '@type': 'WebPage',
    '@id': id.productpagina(product.slug),
    url: id.productpagina(product.slug),
    name: product.naam,
    inLanguage: 'nl-NL',
    isPartOf: { '@id': id.website },
    mainEntity: { '@id': productNode['@id'] },
    about: [{ '@id': productNode['@id'] }, { '@id': id.stof(peptide.slug) }],
    dateModified: datum(product.bijgewerkt_op),
    breadcrumb: kruimels(site, [['Peptiden', '/peptiden'], [product.naam, `/peptiden/${product.slug}`]]),
  }

  return schoon({
    '@context': 'https://schema.org',
    '@graph': [...organisatie(site), pagina, productNode, stof(site, peptide, artikelen), r].filter(Boolean),
  })
}

function artikelpagina({ site, artikel, auteur, eindredactie, peptiden = [], bronnen = [] }) {
  const id = ids(site)
  const url = id.artikel(artikel.slug)
  const artikelNode = {
    '@type': 'Article',
    '@id': `${url}#artikel`,
    headline: artikel.vraag,
    description: artikel.kort_antwoord,
    inLanguage: 'nl-NL',
    author: { '@type': 'Person', name: auteur.naam, url: auteur.profiel_url },
    publisher: { '@id': id.organisatie },
    datePublished: datum(artikel.gepubliceerd_op),
    dateModified: datum(artikel.bijgewerkt_op),
    mainEntityOfPage: { '@id': url },
    about: peptiden.map(p => ({ '@id': id.stof(p.slug) })),
    citation: bronnen.map(b => ({
      '@type': 'ScholarlyArticle',
      '@id': id.bron(b),
      headline: b.titel,
      author: b.auteurs,
      isPartOf: b.tijdschrift ? { '@type': 'Periodical', name: b.tijdschrift } : undefined,
      datePublished: String(b.jaar),
      identifier: [
        b.pmid && { '@type': 'PropertyValue', propertyID: 'PMID', value: String(b.pmid) },
        b.doi && { '@type': 'PropertyValue', propertyID: 'DOI', value: b.doi },
      ].filter(Boolean),
    })),
  }

  const pagina = {
    '@type': 'WebPage',
    '@id': url,
    url,
    name: artikel.vraag,
    inLanguage: 'nl-NL',
    isPartOf: { '@id': id.website },
    mainEntity: { '@id': artikelNode['@id'] },
    reviewedBy: eindredactie ? { '@type': 'Person', name: eindredactie.naam } : undefined,
    lastReviewed: datum(artikel.bijgewerkt_op),
    breadcrumb: kruimels(site, [['Kennisbank', '/kennisbank'], [artikel.vraag, `/kennisbank/${artikel.slug}`]]),
  }

  // Het korte antwoord als FAQ: de vraag-kop met het antwoord van 20-25 woorden
  const faq = {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: [{
      '@type': 'Question',
      name: artikel.vraag,
      acceptedAnswer: { '@type': 'Answer', text: `${artikel.kort_antwoord} ${DISCLAIMER}` },
    }],
  }

  return schoon({
    '@context': 'https://schema.org',
    '@graph': [...organisatie(site), pagina, artikelNode, faq, ...peptiden.map(p => stof(site, p, [artikel]))],
  })
}

function kruimels(site, stappen) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [['Home', '/'], ...stappen].map(([name, pad], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: `${site}${pad === '/' ? '' : pad}`,
    })),
  }
}

// Veilig in een <script>-tag zetten: "</script>" in een tekst mag de HTML niet breken
function alsScriptTag(graaf) {
  return JSON.stringify(graaf).replace(/</g, '\\u003c')
}

module.exports = { productpagina, artikelpagina, alsScriptTag, toonbaar, DISCLAIMER }
