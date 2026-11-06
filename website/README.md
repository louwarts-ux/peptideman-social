# Website-datamodel voor peptideman.nl

Briefing en bouwpakket voor de ontwikkelaar: database, automatische JSON-LD en server-side gerenderde pagina's voor de webshop en de kennisbank. Stand 6 nov 2026.

| Bestand | Wat |
|---|---|
| `schema.sql` | Database (PostgreSQL): tabellen, relaties en controles |
| `jsonld.js` | Bouwt de JSON-LD per pagina automatisch uit de records |
| `voorbeeld-data.json` | Startdata voor de vijf hardlopers (stofgegevens nagekeken bij PubChem) |
| `nextjs/` | Voorbeeld voor Next.js (App Router): datalaag, productpagina, kennisbankpagina |
| `../tests/website-jsonld.test.js` | Toetst de JSON-LD op structuur en op de regels (`npm test`) |

## De drie harde eisen, en hoe dit pakket ze invult

### 1. Snel en clean: Next.js met een headless CMS
- **Advies: Next.js + Payload CMS (of Strapi) op PostgreSQL.** De data is relationeel (stof → product → batch → labrapport, artikel ↔ bron), en beide CMS'en bewaren hun content als tabellen. `schema.sql` is dan het contract: het CMS moet deze tabellen en relaties opleveren.
  Sanity kan ook, maar is documentgericht. Gebruik `schema.sql` dan als veldenlijst en leg de relaties vast als references.
- **Statisch genereren, niet per verzoek renderen.** Pagina's worden bij de build gemaakt (`generateStaticParams`) en elk uur ververst (`revalidate`). Een statische pagina van het Netlify-CDN is sneller dan elke SSR-route.
- Een laadtijd onder 0,5 seconde is haalbaar, maar het is een doel en geen garantie. Meet het met PageSpeed Insights (TTFB en LCP) en neem dat op in de oplevering. Dat AI-crawlers trage sites overslaan is niet hard aangetoond. Een snelle site met alle tekst in de HTML is wel de veilige keuze.
- Netlify blijft de host. De site wordt al gebouwd uit `louwarts-ux/peptideman-site`; Next.js draait daar met de standaard Netlify-runtime. Database-URL en API-keys staan alleen in de omgevingsvariabelen van Netlify.

### 2. JSON-LD volledig automatisch
`jsonld.js` maakt per pagina één `@graph` uit de database-records, zonder plugin en zonder handwerk. Alle entiteiten krijgen vaste `@id`'s, zodat de pagina's één samenhangend netwerk vormen:

```
Productpagina:  WebPage ─mainEntity→ Product ─offers→ Offer ─seller→ Organization
                   └─about→ ChemicalSubstance        Product ─subjectOf→ labrapport (PDF)
Kennisbank:     WebPage ─mainEntity→ Article ─about→ ChemicalSubstance (zelfde @id)
                                        └─citation→ ScholarlyArticle (PubMed)
                FAQPage: de vraag-kop met het korte antwoord
```

Wijzigt er iets in de database (nieuwe batch, nieuw rapport, prijs, artikel), dan klopt de JSON-LD bij de volgende build vanzelf.

**Afwijkingen van de oorspronkelijke briefing, met reden.** Bespreek deze met de jurist voordat iemand ze terugdraait:

| Gevraagd | Gebouwd | Waarom |
|---|---|---|
| `MedicalWebPage` | `WebPage` + `Article` | `MedicalWebPage` zegt tegen zoekmachines: dit is medische informatie voor mensen. Dat botst met "uitsluitend voor onderzoek" en kan bij de IGJ juist als argument dienen dat het om een geneesmiddel gaat (Geneesmiddelenwet). |
| `Substance` | `ChemicalSubstance` | `Substance` is in schema.org een *MedicalEntity*, met velden als `maximumIntake` en `activeIngredient`, dus dosering en werkzame stof. `ChemicalSubstance` beschrijft alleen de scheikunde: formule, massa, sequentie, PubChem. |
| `Review` | `Review`, alleen na controle | Klantreviews over peptiden gaan vaak over effecten ("mijn knie is beter"). Op je eigen productpagina geldt dat als gezondheidsclaim. Daarom: alleen geverifieerde kopers, alleen over levering, verpakking, service en documentatie, en pas zichtbaar na moderatie en claimcheck. De database dwingt dat af. |
| `Product` | `Product` + `Offer` | Met het labrapport als `additionalProperty` (zuiverheid, methode, lab, batch) en de rapport-PDF als `subjectOf`. Dat is precies waarin PeptideMan zich onderscheidt. |

### 3. Alle content in de ruwe HTML
- De pagina's in `nextjs/app/` zijn Server Components: geen `'use client'` en geen data ophalen in de browser.
- De tabel met het labrapport staat als HTML-tabel in de pagina en niet alleen als PDF. Zo leest elke crawler de zuiverheid, de methode en het rapportnummer.
- De JSON-LD staat als `<script type="application/ld+json">` in de HTML. `alsScriptTag()` voorkomt dat een tekst met `</script>` de pagina breekt.
- Alleen de bestelknop en de winkelwagen mogen client-JavaScript gebruiken.
- **Controle bij oplevering:** `curl -s https://peptideman.nl/peptiden/bpc-157-5mg | grep -c "Uitsluitend voor onderzoek"` moet minstens 1 geven, met JavaScript uit. Hetzelfde geldt voor de zuiverheid en het rapportnummer.

## Het datamodel in het kort

```
peptide 1─n product 1─n batch 1─n labrapport
   │            └─1─n review (pas live na moderatie + claimcheck)
   ├─n─m artikel ─n─m bron (PubMed)
   └─n─m bron
auteur ─< artikel (auteur, eindredactie)
```

Ingebouwde regels (gecontroleerd met PostgreSQL 16):
- **Geen velden voor dosering, gebruik, toediening, werking of indicatie.** Wat niet in de database kan, komt ook niet per ongeluk op de site.
- Per product staat hoogstens één batch tegelijk in verkoop. De productpagina toont het rapport van die batch (`v_productpagina`).
- Een artikel kan niet op `gepubliceerd` zonder claimcheck en eindredactie.
- Een review kan niet op `goedgekeurd` zonder claimcheck en een naam van wie het nakeek.
- Een kennisbankvraag eindigt op `?` en het korte antwoord is 10 tot 40 woorden (streven: 20 à 25).
- Bij een bron hoort een PMID of DOI, een soort onderzoek (cel, dier, mens, overzicht, scheikunde) en de vraag of hij onafhankelijk is. Kijk PMID's altijd zelf na via PubMed.

## De vijf hardlopers in de startdata

BPC-157, TB-500, GHK-Cu, Ipamorelin en Epithalon: de stoffen waarover de Bibliotheek al posts heeft. Sequentie, formule, massa en PubChem-CID zijn op 6 nov 2026 bij PubChem nagekeken. De korte antwoorden gaan alleen over herkomst en scheikunde en slagen voor de regelcontrole.

**Nog invullen door David:**
- Prijzen, SKU's, voorraad, batches en Janoshik-rapporten (staan nu leeg of als voorbeeld).
- TB-500: verkoop je het fragment van 7 aminozuren (Ac-LKKTETQ) of het volledige thymosine bèta-4? De startdata gaat uit van het fragment.
- Klopt deze top vijf? Retatrutide heb ik bewust niet opgenomen. Peptidekoning kreeg van de IGJ een verkoopverbod op afslankmiddelen, en een uitgebreide, goed vindbare productpagina voor een afslankmiddel vergroot dat risico. Leg dit eerst aan de jurist voor.
- Retourbeleid (`hasMerchantReturnPolicy`) en levertijd (`deliveryTime`): Google vraagt erom bij productresultaten, maar ik ken ze niet.

## Open voor de jurist

Mag PeptideMan kennisbankpagina's en gestructureerde data publiceren over stoffen die het zelf verkoopt? Die vraag staat al open voor de Bibliotheek-pins en geldt hier sterker: een productpagina met een kennisbanklink is duidelijker reclame dan een pin. Dit is geen juridisch advies. Laat de opzet nakijken voordat de site live gaat.

## Gebruik

```bash
psql "$DATABASE_URL" -f website/schema.sql   # tabellen aanmaken
npm test                                     # JSON-LD tegen de regels
```

Zet `jsonld.js` in de site-repo onder `lib/` en `nextjs/lib/data.ts` en `nextjs/app/...` op dezelfde plek in de Next.js-app. Controleer na de eerste build een product- en een artikelpagina met de [Rich Results Test](https://search.google.com/test/rich-results) en de [Schema Markup Validator](https://validator.schema.org/).
