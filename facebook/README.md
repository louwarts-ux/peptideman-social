# Facebook-pagina Peptideman: nieuwe inrichting

Doel: een zakelijke kennispagina waar bezoekers met een paar klikken alles over peptides vinden. De Facebook-pagina is de etalage; de **kennisbank** (`/kennisbank`) is de bibliotheek waar elke post naar verwijst.

## Wat er in deze map staat

| Map / bestand | Inhoud |
|---|---|
| `beelden/profielfoto.png` | Nieuwe profielfoto, 1080×1080 (Facebook toont hem rond) |
| `beelden/omslagfoto.png` | Nieuwe omslagfoto, 1640×624. Linksonder is vrij gehouden voor de profielfoto |
| `beelden/welkomstbericht.png` | Beeld voor het vastgezette welkomstbericht |
| `beelden/carrousel-*.png` | 5 carrousels van 7 slides, 1080×1350 (4:5) |
| `content/carrousels.mjs` | Alle teksten van de beelden + de bijschriften om te plakken |
| `render/render.mjs` | Maakt alle beelden opnieuw na een tekstwijziging |
| `../kennisbank/` | De kennisbank-website (`index.html` + `data.js`) |

Beelden opnieuw maken na een tekstwijziging:

```
cd facebook && npm install && npm run render
```

## Stap 1: profiel en omslag

1. Pagina → **Bewerken** → profielfoto: upload `beelden/profielfoto.png`.
2. Omslagfoto: upload `beelden/omslagfoto.png`. Controleer op je telefoon of de tekst niet wordt afgesneden.

## Stap 2: paginagegevens

**Categorieën** (maximaal 3): *Onderwijswebsite*, *Wetenschapswebsite*, *Gezondheids- en welzijnswebsite*.

**Intro** (max. 101 tekens, precies 101 gebruikt):

> Peptides helder uitgelegd: status, bewijs en bronnen. Onafhankelijke kennisbank, geen medisch advies.

**Over / Gegevens** (langere omschrijving):

> Peptideman maakt peptides begrijpelijk. In onze gratis kennisbank zie je per peptide wat het is, of het in de EU is toegelaten, hoe sterk het wetenschappelijk bewijs is en waar je de bronnen zelf kunt nalezen. Daarnaast leggen we uit hoe je een studie leest, wat de regels zijn voor geneesmiddelen, supplementen en cosmetica, en welke nieuwe tech (CGM's, wearables, AI-zoektools) een rol speelt in onderzoek.
>
> Onze inhoud is educatief en vervangt geen arts of apotheker. We geven geen doseringsadvies en verkopen geen peptides.

**Website**: `https://peptideman.nl/kennisbank`
**Gebruikersnaam**: `@peptideman.nl` (gelijk aan Instagram en TikTok)

## Stap 3: actieknop

Knop toevoegen → **Meer informatie** → link naar `https://peptideman.nl/kennisbank`.
Zo staat de bibliotheek één klik onder de omslagfoto.

## Stap 4: welkomstbericht vastzetten

Plaats `beelden/welkomstbericht.png` met het bijschrift `welkom.caption` uit `content/carrousels.mjs`. Daarna: ⋯ → **Vastzetten bovenaan pagina**.

## Stap 5: uitgelicht en albums

Maak deze albums, zodat de foto-tab werkt als een inhoudsopgave:

| Album | Wat erin |
|---|---|
| Basiskennis | Carrousel 01 en latere uitlegposts |
| Regelgeving | Carrousel 02 |
| Onderzoek lezen | Carrousel 03 |
| Peptide A–Z | Carrousel 04 en elk nieuw peptideprofiel |
| Tech & tools | Carrousel 05 en alle gadget-posts |

Zet onder **Uitgelicht** de vijf carrousels, in de volgorde 01 → 05.

## Stap 6: Messenger-snelkoppelingen

Instellingen → Messenger → **Veelgestelde vragen** (maximaal 4):

| Vraag | Automatisch antwoord |
|---|---|
| Waar vind ik de kennisbank? | Alles staat op peptideman.nl/kennisbank. Zoek op naam of filter op status. |
| Is peptide X toegelaten? | Open de peptide in de kennisbank; bovenaan staat de status. Staat hij er niet in? Stuur de naam, dan zetten we hem op de lijst. |
| Geven jullie doseringsadvies? | Nee. Onze inhoud is educatief. Voor gebruik van een geneesmiddel ga je naar je arts of apotheker. |
| Verkopen jullie peptides? | Nee. Peptideman is een onafhankelijke kennisbron en verkoopt geen producten. |

## Stap 7: tabbladen

Volgorde: **Startpagina → Over → Foto's → Video's → Reviews**. Zet *Evenementen*, *Winkel* en *Vacatures* uit.

## Postritme

| Dag | Format | Voorbeeld |
|---|---|---|
| Maandag | Carrousel (7 slides) | Een thema uit de kennisbank |
| Woensdag | Peptideprofiel (1 beeld) | Eén peptide met status en bewijs |
| Vrijdag | Tech & tools | Een gadget of app, met de grenzen ervan |

Plan de eerste vijf carrousels op de maandagen. Elk bijschrift staat in `content/carrousels.mjs` en is gecontroleerd met `/caption-check fb`.

## Linken naar één peptide

Elke peptide heeft een eigen link, die direct de detailkaart opent:

```
https://peptideman.nl/kennisbank#bpc-157
https://peptideman.nl/kennisbank#semaglutide
https://peptideman.nl/kennisbank#collageenpeptiden
```

Gebruik die in reacties en in de bijschriften van peptideprofielen.

## Spelregels voor alle posts

- Geen woorden als *geneest*, *behandelt*, *voorkomt*, *gegarandeerd* of *wondermiddel*. `/caption-check` waarschuwt hiervoor.
- Geen doseringen en geen verwijzingen naar verkooppunten.
- Altijd de status (geneesmiddel, supplement, cosmetica of niet toegelaten) erbij.
- Meta staat geen advertenties toe voor niet-toegelaten stoffen. Organische educatieve posts zijn prima; boost alleen algemene uitlegposts.
