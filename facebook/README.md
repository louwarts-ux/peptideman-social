# Facebook-pagina PeptideMan: nieuwe inrichting

Doel: een zakelijke kennispagina in de zwart-gouden huisstijl van peptideman.nl, waar bezoekers met een paar klikken alles over peptides vinden. De Facebook-pagina is de etalage; de **kennisbank** op [peptideman.nl/kennisbank/](https://peptideman.nl/kennisbank/) is de bibliotheek waar elke post naar verwijst.

## Wat er in deze repo staat

| Map / bestand | Inhoud |
|---|---|
| `beelden/profielfoto.png` | Profielfoto, 1080×1080 (Facebook toont hem rond) |
| `beelden/omslagfoto.png` | Omslagfoto, 1640×624. Linksonder is vrij gehouden voor de profielfoto |
| `beelden/welkomstbericht.png` | Beeld voor het vastgezette welkomstbericht |
| `beelden/carrousel-*.png` | 5 carrousels van 7 slides, 1080×1350 (4:5) |
| `beelden/profiel-*.png` | Eén profielkaart per peptide uit de kennisbank (27 stuks) |
| `beelden/kennisbank-og.png` | Deelafbeelding van de kennisbank (de preview als iemand de link deelt) |
| `content/carrousels.mjs` | Alle teksten van de carrousels + de bijschriften |
| `render/render.mjs` | Maakt alle beelden opnieuw |
| `../kennisbank/data.js` | De inhoud van de kennisbank (één bron voor website én profielkaarten) |
| `../kennisbank/pagina.html` | De kennisbankpagina; `bouw.mjs` zet hem in de website-repo |

Na een wijziging in teksten of kennisbank:

```
cd facebook && npm install && npm run render     # beelden opnieuw
node kennisbank/bouw.mjs ../peptideman-site      # kennisbank in de website zetten
```

Daarna de website-repo committen en pushen; Netlify zet hem automatisch live.

## Stap 1: profiel en omslag

1. Pagina → **Bewerken** → profielfoto: upload `beelden/profielfoto.png`.
2. Omslagfoto: upload `beelden/omslagfoto.png`. Controleer op je telefoon of de tekst niet wordt afgesneden.

## Stap 2: paginagegevens

**Categorieën** (maximaal 3): *Wetenschapswebsite*, *Onderwijswebsite*, *Bedrijf voor medische en gezondheidsinformatie*.

**Intro** (max. 101 tekens, 100 gebruikt):

> Peptides helder uitgelegd: status, bewijs en bronnen per peptide. Gratis kennisbank op peptideman.nl

**Over / Gegevens**:

> PeptideMan maakt peptides begrijpelijk. In onze gratis kennisbank zie je per peptide wat het is, of het in de EU is toegelaten, hoe sterk het wetenschappelijk bewijs is en waar je de bronnen zelf kunt nalezen. Daarnaast leggen we uit hoe je een studie leest, wat de regels zijn voor geneesmiddelen, supplementen en cosmetica, en welke nieuwe tech een rol speelt in onderzoek.
>
> PeptideMan (KvK 42111297) levert ook onderzoekspeptiden via peptideman.nl, uitsluitend voor laboratorium- en onderzoeksdoeleinden. Op deze pagina delen we educatieve inhoud: geen medisch advies en geen doseringsadvies.

**Website**: `https://peptideman.nl/kennisbank/`
**Gebruikersnaam**: `@peptideman.nl` (gelijk aan Instagram en TikTok)

## Stap 3: actieknop

Knop toevoegen → **Meer informatie** → `https://peptideman.nl/kennisbank/`.
Zo staat de bibliotheek één klik onder de omslagfoto.

## Stap 4: welkomstbericht vastzetten

Plaats `beelden/welkomstbericht.png` met het bijschrift `welkom.caption` uit `content/carrousels.mjs` (staat ook klaar als concept in Metricool). Daarna: ⋯ → **Vastzetten bovenaan pagina**.

## Stap 5: albums en uitgelicht

| Album | Wat erin |
|---|---|
| Basiskennis | Carrousel 01 en latere uitlegposts |
| Regelgeving | Carrousel 02 |
| Onderzoek lezen | Carrousel 03 |
| Peptide A–Z | Carrousel 04 en alle peptideprofielen |
| Tech & tools | Carrousel 05 en alle gadget-posts |

Zet onder **Uitgelicht** de vijf carrousels, in de volgorde 01 → 05.

## Stap 6: Messenger-snelkoppelingen

Instellingen → Messenger → **Veelgestelde vragen**:

| Vraag | Automatisch antwoord |
|---|---|
| Waar vind ik de kennisbank? | Alles staat op peptideman.nl/kennisbank. Zoek op naam of filter op status. |
| Is peptide X toegelaten? | Open de peptide in de kennisbank; bovenaan staat de status. Staat hij er niet in? Stuur de naam, dan zetten we hem op de lijst. |
| Geven jullie doseringsadvies? | Nee. Onze inhoud is educatief. Voor gebruik van een geneesmiddel ga je naar je arts of apotheker. |
| Waar vind ik testrapporten? | Per batch staat het rapport van Janoshik op peptideman.nl/certificaten.html. |

## Stap 7: tabbladen

Volgorde: **Startpagina → Over → Foto's → Video's → Reviews**. Zet *Evenementen*, *Winkel* en *Vacatures* uit.

## Postritme

| Dag | Format | Bron |
|---|---|---|
| Maandag | Carrousel (7 slides) | `beelden/carrousel-*` |
| Woensdag | Peptideprofiel (1 beeld) | `beelden/profiel-*`, link `peptideman.nl/kennisbank/#<id>` |
| Vrijdag | Tech & tools of een vraag uit de reacties | Kennisbank, onderdeel Tech & tools |

## Let op: Facebook-regels voor een pagina die ook verkoopt

Meta verbiedt het verkopen en promoten van geneesmiddelen en niet-toegelaten stoffen via Facebook en Instagram, ook organisch. Pagina's die dat doen worden beperkt of verwijderd. Houd de pagina daarom strikt educatief:

- Link alleen naar de **kennisbank** of de **blog**, nooit naar productpagina's, prijzen, de winkelwagen of acties.
- Geen productfoto's van flacons, geen kortingscodes, geen "nu op voorraad".
- Geen woorden als *geneest*, *behandelt*, *voorkomt*, *gegarandeerd* of *wondermiddel* (`/caption-check` waarschuwt hiervoor).
- Geen doseringen, geen "protocollen", geen ervaringsverhalen over gebruik.
- Niet boosten of adverteren met peptide-inhoud: advertenties worden afgekeurd en kunnen het advertentieaccount blokkeren.
