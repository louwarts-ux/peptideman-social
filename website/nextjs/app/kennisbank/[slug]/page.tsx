// Kennisbankartikel: vraag als kop, kort antwoord eronder, bronnen met PubMed-link.
// Volledig statisch; de inhoud staat in de ruwe HTML.
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { artikelMetAlles, alleSlugs, SITE } from '@/lib/data'
import { artikelpagina, alsScriptTag, DISCLAIMER } from '@/lib/jsonld'

export const revalidate = 3600
export const dynamicParams = false

export async function generateStaticParams() {
  return alleSlugs('artikel')
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const d = await artikelMetAlles(slug)
  if (!d) return {}
  return {
    title: `${d.artikel.vraag} | PeptideMan kennisbank`,
    description: d.artikel.kort_antwoord,
    alternates: { canonical: `${SITE}/kennisbank/${slug}` },
  }
}

export default async function Artikel({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const d = await artikelMetAlles(slug)
  if (!d) notFound()
  const { artikel, auteur, eindredactie, peptiden, bronnen } = d

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: alsScriptTag(artikelpagina({ site: SITE, artikel, auteur, eindredactie, peptiden, bronnen })) }}
      />
      <h1>{artikel.vraag}</h1>
      <p><strong>{artikel.kort_antwoord}</strong></p>

      {/* inhoud_html komt uit het CMS en is bij het opslaan opgeschoond (sanitize) */}
      <div dangerouslySetInnerHTML={{ __html: artikel.inhoud_html }} />

      <section aria-labelledby="bronnen">
        <h2 id="bronnen">Bronnen</h2>
        <ol>
          {bronnen.map(b => (
            <li key={b.id}>
              {b.auteurs} {b.titel}. <em>{b.tijdschrift}</em> {b.jaar}.{' '}
              {b.pmid && <a href={`https://pubmed.ncbi.nlm.nih.gov/${b.pmid}/`}>PubMed {b.pmid}</a>}{' '}
              ({b.soort === 'mens' ? 'onderzoek bij mensen' : b.soort === 'dier' ? 'dieronderzoek' : b.soort === 'in_vitro' ? 'celonderzoek' : b.soort === 'review' ? 'overzichtsartikel' : 'scheikundig onderzoek'})
            </li>
          ))}
        </ol>
      </section>

      <footer>
        <p>Geschreven door {auteur.naam}{eindredactie && <>, nagekeken door {eindredactie.naam}</>}.
          Bijgewerkt op {new Date(artikel.bijgewerkt_op).toLocaleDateString('nl-NL')}.</p>
        <p><strong>{DISCLAIMER}</strong></p>
      </footer>
    </article>
  )
}
