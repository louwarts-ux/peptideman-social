# Blogaanpassingen peptideman.nl (6 november 2026)

Per artikel een voorstel met de oude tekst (letterlijk, voor zoek-en-vervang) en de nieuwe tekst. Gebaseerd op `inzichten/2026-11-06-blog-claimcheck.md` en de aangepaste regel 7 in `kennis/peptideman.md`. De website zelf is niet aangepast: de sitecode staat in `louwarts-ux/peptideman-site`, en deze sessie kreeg daar geen toegang toe.

## Werkwijze
1. Een schrijver maakte per artikel het voorstel; een script controleerde dat elk Oud-blok letterlijk in het artikel staat.
2. De agent `claimcheck` las elk artikel zoals het wordt na alle wijzigingen, met een frisse blik.
3. De punten uit die controle zijn verwerkt. Bij "AANPASSEN; punten verwerkt" is na het verwerken geen tweede claimcheck gedaan.
4. Alle PubMed-nummers die nieuw in een artikel komen, zijn via PubMed (eutils) nagekeken: 7070207, 26424265, 10567002, 27847966, 21030672, 16099219, 10469335.

## Stand per artikel (39)

**Eerst doen**
| Artikel | Stand |
|---|---|
| peptiden-voor-wetenschappelijk-onderzoek-kopen | Was AFKEUREN. Nu GOED na tweede claimcheck. BPC-157-sectie weg. |
| peptiden-bestellen-farmaceutisch-onderzoek | GOED. BPC-157-sectie weg (aanbevolen keuze). |
| bpc-157-en-tb-500-samen-onderzoek | Punten verwerkt. Bronnen erbij, productlinks weg uit de onderzoeksalinea's. Jurist. |
| betrouwbare-leverancier-voor-wetenschappelijke-peptiden | GOED. "Elke batch getest" als norm weg. |
| kwaliteitsverschillen-…-europese-pepti | GOED. "Elke batch, niet alleen steekproeven" weg. |
| transparante-sourcing-van-wetenschappelijke-peptiden | Punten verwerkt. Eigen werkwijze niet meer als teken van vervalsing. |
| hoe-lees-je-een-analysecertificaat-voor-peptiden | GOED. "Identiek rapport = hergebruikt document" weg. |
| waar-let-je-op-bij-peptiden-webshops | GOED. Meta en "standaard-COA" als rode vlag aangepast. |
| snelle-levering-onderzoekspeptiden-nederland | Punten verwerkt. Meta zonder "COA per batch". |

**Wacht op David**
| Artikel | Waarom |
|---|---|
| peptiden-verzending-belgie-onderzoek | **Niet live zetten** voordat David bevestigt dat PeptideMan naar België levert; bij ja eerst de jurist. |
| custom-peptide-synthese-aanvragen-stap-voor-stap | Biedt PeptideMan custom synthese aan? Nieuwe titel klopt in beide gevallen. |
| retatrutide-simpel-uitgelegd | Geen bestaande bron gevonden; de voorstellen schrappen de onderbouwde details. Hoort retatrutide bij de 16 producten met rapport? |
| hplc-zuiverheid-peptiden-controleren | GOED onder voorbehoud van "15 van 16 rapporten ≥99%". |
| 5-beste-methoden-peptide-synthese | Alleen gericht gecontroleerd (tekst kon niet worden opgeslagen); David leest het één keer na. |

**Overige, GOED**
98-procent-vs-99-procent-peptidezuiverheid-verschil, batchcontrole-peptide-stabiliteit-gids, direct-sourcing-strategie-voor-peptiden, hoeveelheid-peptiden-wetenschappelijk-lab, hoogwaardige-peptiden-voor-academisch-onderzoek, hplc-analyse-wetenschappelijk-onderzoek, kosten-van-peptide-synthese-per-gram-2026-prijsgids, kwaliteitseisen-voor-wetenschappelijke-onderzoekspeptiden, peptide-leveranciers-vergelijken-peptideman, peptiden-zuiverheid-98-versus-99-uitgelegd, productzuiverheid-direct-sourcing-peptiden-prijzen, waar-let-je-op-bij-leverancier-onderzoekspeptiden.

**Overige, punten verwerkt**
belang-van-batchnummers-bij-peptiden, betrouwbare-peptide-leverancier-onderzoekers, garantie-op-kwaliteit-bij-peptide-leveranciers, kwaliteit-van-onderzoekspeptiden-consistent-waarborgen, peptidekwaliteit-garanderen-gids, peptiden-bewaren-gids-maximale-houdbaarheid, peptiden-kopen-met-gedetailleerde-specificaties, peptiden-opslag-voor-maximale-stabiliteit, risico-van-onzuivere-peptiden-beperken-een-gids, snelle-verzending-peptiden-binnen-europa, standaard-custom-peptiden-standaard-vs-custom-peptiden-verschil, transparante-productspecificaties-peptide-onderzoek, zuiverheid-onderzoekspeptiden-controleren.

De 17 artikelen met GOED uit de eerste claimcheck hebben geen voorstel.

## Vragen voor David
De antwoorden bepalen de definitieve tekst van meerdere artikelen; per bestand staat onder "Na te gaan door David" wat er dan verandert.
1. Klopt "op 15 van de 16 rapporten een zuiverheid, steeds 99% of hoger"? Welke 2 producten hebben geen rapport (horen retatrutide, BPC-157 en TB-500 bij de 16)?
2. Wat staat er op de Janoshik-rapporten: batchnummer, chromatogram, MS, opslagcondities, accreditatienummer?
3. Is Janoshik ISO/IEC 17025-geaccrediteerd? (Het staat niet in het Nederlandse RvA-register.)
4. Wat staat er op de flacon en de productpagina: batchnummer, houdbaarheidsdatum, opslagtemperatuur? Staat het certificaat ook op de productpagina?
5. Kan PeptideMan per product een veiligheidsinformatieblad (SDS) leveren? Is er een vervangingsbeleid?
6. Biedt PeptideMan custom synthese aan? Koopt PeptideMan rechtstreeks bij fabrikanten?
7. Levert PeptideMan naar België of de rest van Europa? Is er express, dagelijkse verzending of tracking?
8. Wat staat er op `kwaliteit.html`? Alle voorstellen linken nu naar `certificaten.html` tot dat is nagekeken.
9. SEO-keuzes: nieuwe slugs voor de artikelen met "garantie", "garanderen" en "batchcontrole" (met 301-redirect); de twee 98/99-artikelen samenvoegen.

## Voor de jurist
- BPC-157- en TB-500-productlinks op pagina's met bronnen over weefselherstel.
- Diermodellen als toepassing (nu geschrapt) naast "niet voor dierlijke consumptie".
- Teksten voor "laboratoria" en "farmaceutisch onderzoek" terwijl de webshop aan particulieren (18+) verkoopt.
- Verzending naar België en Europa.
- Normen in de blog waar PeptideMan zelf niet aan voldoet (reclameregels, oneerlijke handelspraktijken).
