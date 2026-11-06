-- PeptideMan webshop + kennisbank: datamodel (PostgreSQL 15+)
--
-- Uitgangspunten
-- 1. Eén stof (peptide) is de spil. Product, kennisbankartikel, bron en labrapport
--    hangen eraan; de JSON-LD koppelt alles via het @id van de stof.
-- 2. Bewust GEEN velden voor dosering, gebruik, toediening, effect of indicatie.
--    Wat er niet in de database kan, komt ook niet per ongeluk op de site.
-- 3. Reviews gaan pas live na moderatie en claimcheck (afgedwongen met CHECK).
-- 4. Elk labrapport hoort bij één batch; de productpagina toont het rapport van de
--    batch die nu verkocht wordt.
--
-- Werkt los van het CMS: Strapi, Payload en Directus kunnen op dit schema draaien,
-- of het CMS genereert deze tabellen uit zijn eigen contenttypes (zie README).

CREATE TYPE publicatiestatus AS ENUM ('concept', 'ter_controle', 'gepubliceerd', 'gearchiveerd');
CREATE TYPE soort_onderzoek  AS ENUM ('in_vitro', 'dier', 'mens', 'review', 'chemie');
CREATE TYPE testmethode      AS ENUM ('HPLC', 'LC-MS', 'HPLC+LC-MS', 'endotoxine', 'overig');
CREATE TYPE reviewstatus     AS ENUM ('nieuw', 'goedgekeurd', 'afgewezen');
CREATE TYPE reviewonderwerp  AS ENUM ('levering', 'verpakking', 'service', 'documentatie', 'overig');

-- Wie schrijft en controleert (E-E-A-T, komt als author/reviewedBy in de JSON-LD)
CREATE TABLE auteur (
  id          serial PRIMARY KEY,
  naam        text NOT NULL,
  rol         text NOT NULL,                     -- bv. 'redactie', 'eindredactie'
  profiel_url text
);

-- De stof zelf: scheikundige identiteit, geen werking
CREATE TABLE peptide (
  id                serial PRIMARY KEY,
  slug              text UNIQUE NOT NULL CHECK (slug ~ '^[a-z0-9-]+$'),
  naam              text NOT NULL,               -- 'BPC-157'
  synoniemen        text[] NOT NULL DEFAULT '{}',-- 'Pentadecapeptide BPC 157'
  sequentie         text,                        -- 'Gly-Glu-Pro-...'
  aantal_aminozuren smallint,
  molecuulformule   text,                        -- 'C62H98N16O22'
  molecuulmassa     numeric(10,2),               -- g/mol
  cas_nummer        text,
  pubchem_cid       integer,
  herkomst          text,                        -- 1-2 zinnen: waar komt de stof vandaan
  kort_antwoord     text NOT NULL                -- 20-25 woorden, het antwoord onder de kop
                    CHECK (array_length(regexp_split_to_array(trim(kort_antwoord), '\s+'), 1) BETWEEN 10 AND 40),
  status            publicatiestatus NOT NULL DEFAULT 'concept',
  aangemaakt_op     timestamptz NOT NULL DEFAULT now(),
  bijgewerkt_op     timestamptz NOT NULL DEFAULT now()
);

-- Wat je kunt kopen: één peptide in een bepaalde hoeveelheid
CREATE TABLE product (
  id            serial PRIMARY KEY,
  peptide_id    integer NOT NULL REFERENCES peptide(id),
  slug          text UNIQUE NOT NULL CHECK (slug ~ '^[a-z0-9-]+$'),
  sku           text UNIQUE NOT NULL,
  naam          text NOT NULL,                   -- 'BPC-157 5 mg'
  hoeveelheid_mg numeric(8,2) NOT NULL,          -- inhoud van het flesje, geen dosis
  vorm          text NOT NULL DEFAULT 'gevriesdroogd poeder (lyofilisaat)',
  prijs_cent    integer NOT NULL CHECK (prijs_cent > 0),
  voorraad      integer NOT NULL DEFAULT 0,
  gtin          text,
  afbeelding_url text,
  status        publicatiestatus NOT NULL DEFAULT 'concept',
  bijgewerkt_op timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ON product (peptide_id);

-- Productiepartij
CREATE TABLE batch (
  id             serial PRIMARY KEY,
  product_id     integer NOT NULL REFERENCES product(id),
  batchnummer    text NOT NULL,
  productiedatum date,
  houdbaar_tot   date,
  in_verkoop     boolean NOT NULL DEFAULT false,  -- de batch die nu verstuurd wordt
  UNIQUE (product_id, batchnummer)
);
-- Per product hoogstens één batch tegelijk in verkoop
CREATE UNIQUE INDEX een_batch_in_verkoop ON batch (product_id) WHERE in_verkoop;

-- Onafhankelijk labrapport (Janoshik) per batch
CREATE TABLE labrapport (
  id                  serial PRIMARY KEY,
  batch_id            integer NOT NULL REFERENCES batch(id),
  lab                 text NOT NULL DEFAULT 'Janoshik Analytical',
  rapportnummer       text NOT NULL,
  testdatum           date NOT NULL,
  methode             testmethode NOT NULL,
  zuiverheid_pct      numeric(5,2) CHECK (zuiverheid_pct BETWEEN 0 AND 100),
  gemeten_mg          numeric(8,3),               -- gemeten inhoud van het flesje
  identiteit_bevestigd boolean,                   -- massa klopt met de stof (LC-MS)
  verificatie_url     text NOT NULL,              -- openbare check bij het lab
  pdf_url             text NOT NULL,
  chromatogram_url    text,
  UNIQUE (lab, rapportnummer)
);
CREATE INDEX ON labrapport (batch_id);

-- Wetenschappelijke bron. PMID en opzet altijd zelf nakijken via PubMed (eutils).
CREATE TABLE bron (
  id           serial PRIMARY KEY,
  pmid         integer UNIQUE,
  doi          text UNIQUE,
  titel        text NOT NULL,
  auteurs      text NOT NULL,                     -- 'Sikiric P, Seiwerth S, et al.'
  tijdschrift  text,
  jaar         smallint NOT NULL,
  soort        soort_onderzoek NOT NULL,
  onafhankelijk boolean NOT NULL DEFAULT true,    -- niet van de fabrikant/uitvinder zelf
  nagekeken_op date,                              -- wanneer PMID en opzet zijn gecontroleerd
  CHECK (pmid IS NOT NULL OR doi IS NOT NULL)
);

-- Kennisbankartikel: een vraag als kop, kort antwoord eronder
CREATE TABLE artikel (
  id             serial PRIMARY KEY,
  slug           text UNIQUE NOT NULL CHECK (slug ~ '^[a-z0-9-]+$'),
  vraag          text NOT NULL CHECK (vraag LIKE '%?'),   -- 'Wat is BPC-157?'
  kort_antwoord  text NOT NULL,
  inhoud_html    text NOT NULL,                  -- door de server gerenderd, geen client-JS
  auteur_id      integer NOT NULL REFERENCES auteur(id),
  eindredactie_id integer REFERENCES auteur(id),
  claimcheck_ok  boolean NOT NULL DEFAULT false,
  status         publicatiestatus NOT NULL DEFAULT 'concept',
  gepubliceerd_op timestamptz,
  bijgewerkt_op  timestamptz NOT NULL DEFAULT now(),
  -- Geen artikel live zonder claimcheck en eindredactie
  CHECK (status <> 'gepubliceerd' OR (claimcheck_ok AND eindredactie_id IS NOT NULL AND gepubliceerd_op IS NOT NULL))
);

CREATE TABLE artikel_peptide (
  artikel_id integer REFERENCES artikel(id) ON DELETE CASCADE,
  peptide_id integer REFERENCES peptide(id) ON DELETE CASCADE,
  hoofdonderwerp boolean NOT NULL DEFAULT false,
  PRIMARY KEY (artikel_id, peptide_id)
);

CREATE TABLE artikel_bron (
  artikel_id integer REFERENCES artikel(id) ON DELETE CASCADE,
  bron_id    integer REFERENCES bron(id),
  volgorde   smallint NOT NULL DEFAULT 0,
  PRIMARY KEY (artikel_id, bron_id)
);

CREATE TABLE peptide_bron (
  peptide_id integer REFERENCES peptide(id) ON DELETE CASCADE,
  bron_id    integer REFERENCES bron(id),
  PRIMARY KEY (peptide_id, bron_id)
);

-- Klantreview. Alleen over levering, verpakking, service, documentatie.
-- Een review over 'wat het met mij deed' is een gezondheidsclaim en wordt afgewezen.
CREATE TABLE review (
  id               serial PRIMARY KEY,
  product_id       integer NOT NULL REFERENCES product(id),
  bestelling_ref   text NOT NULL,                -- alleen geverifieerde kopers
  weergavenaam     text NOT NULL,                -- voornaam of initialen
  sterren          smallint NOT NULL CHECK (sterren BETWEEN 1 AND 5),
  tekst            text NOT NULL,
  onderwerp        reviewonderwerp NOT NULL,
  status           reviewstatus NOT NULL DEFAULT 'nieuw',
  claimcheck_ok    boolean NOT NULL DEFAULT false,
  gecontroleerd_door integer REFERENCES auteur(id),
  geplaatst_op     timestamptz NOT NULL DEFAULT now(),
  CHECK (status <> 'goedgekeurd' OR (claimcheck_ok AND gecontroleerd_door IS NOT NULL))
);
CREATE INDEX ON review (product_id) WHERE status = 'goedgekeurd';

-- Alles wat een productpagina nodig heeft, in één query
CREATE VIEW v_productpagina AS
SELECT
  p.*,
  pep.slug  AS peptide_slug,
  b.batchnummer,
  b.houdbaar_tot,
  lr.lab, lr.rapportnummer, lr.testdatum, lr.methode, lr.zuiverheid_pct,
  lr.gemeten_mg, lr.identiteit_bevestigd, lr.verificatie_url, lr.pdf_url, lr.chromatogram_url
FROM product p
JOIN peptide pep ON pep.id = p.peptide_id
LEFT JOIN batch b ON b.product_id = p.id AND b.in_verkoop
LEFT JOIN LATERAL (
  SELECT * FROM labrapport WHERE batch_id = b.id ORDER BY testdatum DESC LIMIT 1
) lr ON true
WHERE p.status = 'gepubliceerd';

-- Elke wijziging zet bijgewerkt_op (komt als dateModified in de JSON-LD)
CREATE FUNCTION zet_bijgewerkt() RETURNS trigger AS $$
BEGIN NEW.bijgewerkt_op := now(); RETURN NEW; END $$ LANGUAGE plpgsql;
CREATE TRIGGER t_peptide BEFORE UPDATE ON peptide FOR EACH ROW EXECUTE FUNCTION zet_bijgewerkt();
CREATE TRIGGER t_product BEFORE UPDATE ON product FOR EACH ROW EXECUTE FUNCTION zet_bijgewerkt();
CREATE TRIGGER t_artikel BEFORE UPDATE ON artikel FOR EACH ROW EXECUTE FUNCTION zet_bijgewerkt();
