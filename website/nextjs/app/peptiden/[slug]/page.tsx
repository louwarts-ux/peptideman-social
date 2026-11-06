// Productpagina. Server Component: alle tekst, het labrapport en de JSON-LD staan
// in de ruwe HTML. Geen 'use client', geen fetch in de browser.
//
// Statisch gegenereerd bij de build (generateStaticParams) en elk uur ververst
// (revalidate). Een statische pagina van een CDN laadt sneller dan elke SSR-route.
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { productMetAlles, alleSlugs, SITE, VERZENDING } from '@/lib/data'
// jsonld.js uit deze map; zet hem in de site-repo onder lib/
import { productpagina, alsScriptTag, DISCLAIMER } from '@/lib/jsonld'

export const revalidate = 3600
export const dynamicParams = false // onbekende slug = 404, geen runtime-render

export async function generateStaticParams() {
  return alleSlugs('product')
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const d = await productMetAlles(slug)
  if (!d) return {}
  return {
    title: `${d.product.naam} kopen | onafhankelijk getest | PeptideMan`,
    description: `${d.peptide.kort_antwoord} ${DISCLAIMER}`,
    alternates: { canonical: `${SITE}/peptiden/${slug}` },
  }
}

export default async function Productpagina({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const d = await productMetAlles(slug)
  if (!d) notFound()
  const { product, peptide, rapport, reviews, artikelen } = d

  const graaf = productpagina({ site: SITE, peptide, product, rapport, reviews, artikelen, verzending: VERZENDING })

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: alsScriptTag(graaf) }} />

      <h1>{product.naam}</h1>
      <p>{peptide.kort_antwoord}</p>
      <p><strong>{DISCLAIMER}</strong></p>

      <section aria-labelledby="stof">
        <h2 id="stof">Over de stof</h2>
        <dl>
          <dt>Sequentie</dt><dd>{peptide.sequentie}</dd>
          <dt>Aminozuren</dt><dd>{peptide.aantal_aminozuren}</dd>
          <dt>Molecuulformule</dt><dd>{peptide.molecuulformule}</dd>
          <dt>Molecuulmassa</dt><dd>{peptide.molecuulmassa} g/mol</dd>
          {peptide.pubchem_cid && (
            <><dt>PubChem</dt><dd><a href={`https://pubchem.ncbi.nlm.nih.gov/compound/${peptide.pubchem_cid}`}>CID {peptide.pubchem_cid}</a></dd></>
          )}
          <dt>Inhoud</dt><dd>{product.hoeveelheid_mg} mg, {product.vorm}</dd>
        </dl>
      </section>

      {rapport && (
        <section aria-labelledby="lab">
          <h2 id="lab">Labrapport van deze batch</h2>
          {/* Als tabel in de HTML, niet alleen als PDF: zo kan elke crawler het lezen */}
          <table>
            <tbody>
              <tr><th scope="row">Batch</th><td>{product.batchnummer}</td></tr>
              <tr><th scope="row">Lab</th><td>{rapport.lab}</td></tr>
              <tr><th scope="row">Rapportnummer</th><td>{rapport.rapportnummer}</td></tr>
              <tr><th scope="row">Testdatum</th><td>{new Date(rapport.testdatum).toLocaleDateString('nl-NL')}</td></tr>
              <tr><th scope="row">Methode</th><td>{rapport.methode}</td></tr>
              <tr><th scope="row">Gemeten zuiverheid</th><td>{rapport.zuiverheid_pct}%</td></tr>
              {rapport.gemeten_mg && <tr><th scope="row">Gemeten inhoud</th><td>{rapport.gemeten_mg} mg</td></tr>}
            </tbody>
          </table>
          <p>
            <a href={rapport.pdf_url}>Rapport (PDF)</a> · <a href={rapport.verificatie_url}>Zelf controleren bij {rapport.lab}</a>
          </p>
        </section>
      )}

      {artikelen.length > 0 && (
        <section aria-labelledby="kennisbank">
          <h2 id="kennisbank">Uit de kennisbank</h2>
          <ul>{artikelen.map(a => <li key={a.slug}><a href={`/kennisbank/${a.slug}`}>{a.vraag}</a></li>)}</ul>
        </section>
      )}

      {reviews.length > 0 && (
        <section aria-labelledby="reviews">
          <h2 id="reviews">Ervaringen met levering en service</h2>
          {reviews.map((r, i) => (
            <blockquote key={i}><p>{r.tekst}</p><footer>{r.weergavenaam}, {r.sterren}/5</footer></blockquote>
          ))}
        </section>
      )}

      {/* Bestelknop is het enige stukje client-JS en mag daarom een losse component zijn */}
    </main>
  )
}
