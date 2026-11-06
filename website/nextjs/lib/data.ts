// Data-laag: draait alleen op de server (nooit in de browser).
// Voorbeeld met PostgreSQL via `postgres` (porsager). Met Strapi/Payload/Sanity
// vervang je deze functies door hun SDK-call; de rest van de site blijft gelijk.
import 'server-only'
import postgres from 'postgres'

const sql = postgres(process.env.DATABASE_URL!) // alleen in Netlify-omgevingsvariabelen

export async function productMetAlles(slug: string) {
  const [product] = await sql`SELECT * FROM v_productpagina WHERE slug = ${slug}`
  if (!product) return null

  const [peptide] = await sql`SELECT * FROM peptide WHERE id = ${product.peptide_id}`
  const reviews = await sql`
    SELECT weergavenaam, sterren, tekst, status, claimcheck_ok, geplaatst_op
    FROM review WHERE product_id = ${product.id} AND status = 'goedgekeurd' AND claimcheck_ok
    ORDER BY geplaatst_op DESC LIMIT 20`
  const artikelen = await sql`
    SELECT a.slug, a.vraag FROM artikel a
    JOIN artikel_peptide ap ON ap.artikel_id = a.id
    WHERE ap.peptide_id = ${peptide.id} AND a.status = 'gepubliceerd'`

  const rapport = product.rapportnummer ? product : null // de view levert het actuele rapport mee
  return { product, peptide, rapport, reviews, artikelen }
}

export async function artikelMetAlles(slug: string) {
  const [artikel] = await sql`SELECT * FROM artikel WHERE slug = ${slug} AND status = 'gepubliceerd'`
  if (!artikel) return null
  const [auteur] = await sql`SELECT * FROM auteur WHERE id = ${artikel.auteur_id}`
  const [eindredactie] = await sql`SELECT * FROM auteur WHERE id = ${artikel.eindredactie_id}`
  const peptiden = await sql`
    SELECT p.* FROM peptide p JOIN artikel_peptide ap ON ap.peptide_id = p.id
    WHERE ap.artikel_id = ${artikel.id}`
  const bronnen = await sql`
    SELECT b.* FROM bron b JOIN artikel_bron ab ON ab.bron_id = b.id
    WHERE ab.artikel_id = ${artikel.id} ORDER BY ab.volgorde`
  return { artikel, auteur, eindredactie, peptiden, bronnen }
}

export async function alleSlugs(tabel: 'product' | 'artikel') {
  const rijen = tabel === 'product'
    ? await sql`SELECT slug FROM product WHERE status = 'gepubliceerd'`
    : await sql`SELECT slug FROM artikel WHERE status = 'gepubliceerd'`
  return rijen.map(r => ({ slug: r.slug as string }))
}

export const SITE = 'https://peptideman.nl'
export const VERZENDING = { tarief_cent: 695, gratis_vanaf_cent: 15000 }
