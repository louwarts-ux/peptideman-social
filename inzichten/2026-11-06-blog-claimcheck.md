# Claimcheck blog peptideman.nl (6 november 2026)

Alle 56 artikelen uit `sitemap-blog.xml` zijn tegen `kennis/peptideman.md` gehouden door de agent `claimcheck`, in zes groepen. Het artikel over syntheseroutes kon niet als tekst worden opgeslagen; dat heb ik zelf op de live pagina gecontroleerd. De ernstigste bevinding in elke groep heb ik in de tekst teruggezocht; alle citaten klopten.

**Uitkomst: 17 GOED · 38 AANPASSEN · 1 AFKEUREN.**

## Kern
- **De harde regels houdt de blog goed aan.** Nergens doseeradvies, injectie-instructies, "afvallen", "spiergroei" of "anti-aging". Alle artikelen hebben de disclaimer bovenaan (met 18+) en onderaan, dier- en celonderzoek wordt bijna overal als zodanig benoemd, vragen over wetgeving gaan naar een jurist.
- **Het probleem zit in wat de blog over PeptideMan zelf zegt.** Volgens de certificatenpagina staat voor 16 van de 18 producten het Janoshik-rapport van **één geteste batch** online, en de rapporten vermelden **geen analysemethode**. De blog zegt op tientallen plekken iets anders: "per batch", "met HPLC geanalyseerd", "HPLC- en massaspectrometrierapport", "hoe wij batches controleren", "batchcontrole".
- **De blog keurt PeptideMan op zijn eigen maatstaf af.** Veel artikelen stellen een norm (certificaat per batch, methode op het rapport, MS, accreditatie) of noemen "één rapport voor meerdere batches" een teken van een vervalst of hergebruikt certificaat, en linken daarna direct naar de eigen certificaten. Een lezer die de checklist volgt, ziet PeptideMan zakken. Dat schaadt het vertrouwen en kan misleidend zijn (reclameregels, oneerlijke handelspraktijken; jurist).
- **De bron van de fout staat ook in deze repo.** `kennis/peptideman.md` regel 7 zegt "per batch onafhankelijk getest door Janoshik (HPLC/LC-MS)". Zolang dat er staat, nemen schrijvers (ook onze social-agents) de overclaim over.

## Eerst doen
1. **Afkeuren, offline of aanpassen:** `peptiden-voor-wetenschappelijk-onderzoek-kopen`. Na knaagdier- en celonderzoek naar pees- en maag-darmweefsel volgt "Voor dit soort laboratoriumwerk is goed gedocumenteerd materiaal nodig, zoals [BPC-157 (10 mg)]", met bronnen over "tendon healing" en "accelerating musculoskeletal soft tissue healing", op een pagina met "kopen" in de URL. Productlink eruit, liefst de hele BPC-157-sectie weg. Hetzelfde patroon (lichter) in `peptiden-bestellen-farmaceutisch-onderzoek`: "modellen van peesschade" met een productlink naar BPC-157 in dezelfde alinea.
2. **De "per batch"-norm die PeptideMan zelf afkeurt:** `betrouwbare-leverancier-voor-wetenschappelijke-peptiden` ("Een betrouwbare leverancier test elke batch met HPLC en massaspectrometrie"; tabel "Elke batch getest" tegen "Steekproefsgewijs testen" als waarschuwing), `kwaliteitsverschillen-…-europese-pepti` ("Een serieuze leverancier test daarom elke batch, niet alleen steekproeven"), `transparante-sourcing-van-wetenschappelijke-peptiden` ("Eén certificaat voor meerdere leveringen" als teken van een vervalst CoA), `hoe-lees-je-een-analysecertificaat-voor-peptiden` ("Identiek rapport voor meerdere batches = hergebruikt document"), `waar-let-je-op-bij-peptiden-webshops` ("één standaard-COA voor alle batches" als signaal).
3. **Wat in Google staat:** meta van `snelle-levering-onderzoekspeptiden-nederland` ("COA per batch"), meta van `waar-let-je-op-bij-peptiden-webshops` ("batchgebonden COA's, HPLC-analyses, laboratoriumverificatie"), titel "Batchcontrole … | PeptideMan", slug `peptidekwaliteit-garanderen-gids` en `garantie-op-kwaliteit-…`, en de titel van `custom-peptide-synthese-aanvragen` (wekt de indruk dat PeptideMan custom synthese doet).
4. **Zoek-en-vervang over alle artikelen** (zie standaardzinnen hieronder): "met HPLC geanalyseerd", "HPLC-zuiverheid" over eigen rapporten, "hoe wij batches controleren", "hoe batches worden geanalyseerd", "per batch borgen", "batchcontrole", "kwaliteitsborging en batchcontrole".
5. **Bronnen toevoegen:** `retatrutide-simpel-uitgelegd` (geen enkele bron), `bpc-157-en-tb-500-samen-onderzoek` (PMID's staan al in het zusterartikel: 21548867, 21030672, 27847966, 16099219, 10469335), TFA-celkweekuitspraken in `transparante-productspecificaties-peptide-onderzoek` en `98-procent-vs-99-procent-…` (PMID 10567002 wordt al gebruikt in `kwaliteitsverschillen-…`), endotoxine-uitspraak in `risico-van-onzuivere-peptiden-…`.
6. **Diermodellen als toepassing** naast "niet voor dierlijke consumptie": `peptiden-kopen-met-gedetailleerde-specificaties` (r50), `kwaliteitseisen-voor-wetenschappelijke-onderzoekspeptiden`. Schrappen of neutraal maken; jurist.

## Standaardzinnen
Eén vaste formulering voorkomt de fout in alle artikelen:
- Over de rapporten: "Voor 16 van de 18 producten staat het Janoshik-rapport van één geteste batch online. Je flacon kan uit een latere batch komen, en de rapporten vermelden de analysemethode niet."
- Verwijzing naar de kwaliteitspagina: "Welke analysegegevens wij per product publiceren, en wat die wel en niet zeggen, lees je op de pagina over [kwaliteitscontrole]."
- Na een norm of checklist: "Op onze certificatenpagina zie je welke van deze gegevens in onze rapporten staan en welke niet."
- Rode vlag "één rapport voor meerdere batches" ombouwen tot aandachtspunt: "Controleer of het certificaat bij jouw batch hoort of bij een eerder geteste batch; dat laatste zegt minder over jouw materiaal."

Goede voorbeelden die er al staan: `peptide-lab-ervaringen-betrouwbare-leveranciers`, `peptiden-kopen-met-batchnummer-analyse` en `peptiden-kopen-zuiverheid-…-98-procent-zuiverheid` (eerlijk over één batch per product).

## Voor David om na te gaan
1. Klopt "op 15 van de 16 rapporten een zuiverheid, steeds 99% of hoger"? (staat in ruim tien artikelen)
2. Staat het certificaat op de productpagina, op de certificatenpagina, of op beide?
3. Staat er op elke flacon een batchnummer? Zit het batchnummer bij de zending?
4. Kan PeptideMan per product een veiligheidsinformatieblad (SDS) leveren? Is er een vervangingsbeleid?
5. Is Janoshik ISO/IEC 17025-geaccrediteerd? Meerdere artikelen noemen accreditatie als eis.
6. Biedt PeptideMan custom synthese aan? (verwacht: nee; zeg dat dan in dat artikel)
7. Levert PeptideMan naar België en de rest van Europa? Express, dagelijkse verzending, tracking, vochtopnemer of isolatie in de verpakking? Koopt PeptideMan rechtstreeks bij fabrikanten?
8. Wat staat er op `kwaliteit.html` over "per batch"? (niet gecontroleerd; vrijwel elk artikel linkt ernaar)
9. `kennis/peptideman.md` regel 7 corrigeren.

## Voor de jurist
- BPC-157-productlinks naast dier- en celonderzoek naar weefselherstel (Geneesmiddelenwet, presentatie).
- Diermodellen als toepassing naast "niet voor dierlijke consumptie".
- Teksten gericht op "laboratoria en onderzoeksinstellingen" terwijl de webshop aan particulieren (18+) verkoopt.
- Kwaliteitsuitspraken die verder gaan dan de rapporten (reclameregels, oneerlijke handelspraktijken).
- Verzending naar België en Europa.

## Per artikel

### AFKEUREN (1)
| Artikel | Ernstigste punt | Herschrijving |
|---|---|---|
| peptiden-voor-wetenschappelijk-onderzoek-kopen | r69 BPC-157-productlink direct na dier- en celonderzoek naar pees en maag-darm; bronnen "healing"; ook r35-37, r116, r136 "per batch", "hoe PeptideMan batches controleert" | Productlink en liefst de BPC-157-sectie weg; "Op onze certificatenpagina staat voor 16 van de 18 producten het rapport van één geteste batch." |

### AANPASSEN (38)
| Artikel | Ernstigste punt | Herschrijving |
|---|---|---|
| betrouwbare-leverancier-voor-wetenschappelijke-peptiden (zwaar) | r19 "test elke batch met HPLC en massaspectrometrie"; r92 tabel "Elke batch getest" tegen "Steekproefsgewijs" | "Een betrouwbare leverancier laat zien welke batch is getest, door wie, en wat er is gemeten." |
| kwaliteitsverschillen-…-europese-pepti (zwaar) | r77/r84 "test daarom elke batch, niet alleen steekproeven"; "HPLC en MS per batch" + "hoe wij werken" | "Hoe meer batches onafhankelijk getest en gedocumenteerd zijn, hoe beter je batches kunt vergelijken. Vraag een leverancier welke batches getest zijn." |
| waar-let-je-op-bij-peptiden-webshops (zwaar) | meta "batchgebonden COA's, HPLC-analyses"; r23 "met HPLC geanalyseerd aan laboratoria en onderzoeksinstellingen"; r74 standaard-COA als signaal | Meta: "Checklist voor het beoordelen van aanbieders van onderzoekspeptiden: certificaten, analysemethoden, laboratoriumgegevens en waarschuwingssignalen."; r23: "PeptideMan levert onderzoekspeptiden. Voor 16 van de 18 producten staat een certificaat van Janoshik van één geteste batch online." |
| transparante-sourcing-van-wetenschappelijke-peptiden (ernstig) | r51 "Eén certificaat voor meerdere leveringen" als teken van vervalsing; "99,9% ongebruikelijk" zonder bron; ISO 17025-check | Verplaatsen naar aandachtspunten met de standaardzin; 99,9%-zin afzwakken of bron |
| snelle-levering-onderzoekspeptiden-nederland | meta "COA per batch"; verpakking met batchgegevens; directe inkoop; "hoe wij" na HPLC+MS; "95% = 5% andere stoffen" technisch onjuist | Meta: "Hoe snel worden onderzoekspeptiden binnen Nederland geleverd? Over levertijd, het analysecertificaat en opslag. Uitsluitend voor laboratoriumonderzoek." |
| peptiden-bestellen-farmaceutisch-onderzoek | r70-72 "modellen van peesschade" + productlink BPC-157 (10 mg); "CoA en veiligheidsinformatieblad per batch" | Productlink uit die alinea; jurist; SDS bevestigen |
| peptiden-verzending-belgie-onderzoek | r66 "een batch wordt gecontroleerd voordat hij wordt verzonden"; tabel "CoA per batch", "identiteit bevestigd met MS"; levering België | r66 schrappen; tabel: "Rapport van één geteste batch, voor 16 van de 18 producten"; jurist |
| snelle-verzending-peptiden-binnen-europa | norm "analyse per batch" gekoppeld aan PeptideMan; "beschermt tegen temperatuurwisselingen", "neutrale buitenkant beschermt je privacy"; express | "Zendingen gaan in stevige verpakking die de vials op hun plek houdt."; privacyzin weg; jurist voor Europa |
| custom-peptide-synthese-aanvragen-stap-voor-stap | titel "… | PeptideMan" en "dien aanvraag in / offerte" wekken de indruk dat PeptideMan dit aanbiedt | Bovenaan: "PeptideMan biedt zelf geen custom synthese aan; dit artikel legt uit hoe je zo'n aanvraag bij een syntheselaboratorium voorbereidt." |
| kosten-van-peptide-synthese-per-gram-2026-prijsgids | r74-81 eigen certificaten als "voorbeeld" van een volledig CoA met MS en houdbaarheid | "Bekijk op onze certificatenpagina welke van deze gegevens in onze rapporten staan." |
| hoe-lees-je-een-analysecertificaat-voor-peptiden | r116/r118 vage methode en identiek rapport als rode vlag; r21 "elke productie apart getest"; r63 te stellig | r21: "Idealiter hoort bij elke batch een eigen rapport."; FAQ: "…zegt het rapport iets over die eerdere batch, niet over jouw flacon. Vraag ons dan welke batch je hebt." |
| hplc-analyse-wetenschappelijk-onderzoek | r143 "kun je deze gegevens zelf naast elkaar leggen" na norm; r85 "batchcontrole" | "Op onze certificatenpagina kun je nagaan welke van deze punten onze rapporten wel en niet vermelden." |
| batchcontrole-peptide-stabiliteit-gids | titel "Batchcontrole"; r54-63 "zie je hoe PeptideMan deze gegevens vastlegt" | Titel "Batchvariatie en peptidestabiliteit uitgelegd"; standaardzin na norm |
| kwaliteit-van-onderzoekspeptiden-consistent-waarborgen | r67 "het HPLC- en massaspectrometrierapport van een geteste batch" | "…het Janoshik-certificaat van één geteste batch. De rapporten vermelden de analysemethode niet." |
| belang-van-batchnummers-bij-peptiden | r131 "op elk product een batchnummer" (bevestigen); "bijbehorende documentatie" | "…vind je het certificaat van de batch die per product is getest. Je flacon kan uit een latere batch komen." |
| peptiden-kopen-met-gedetailleerde-specificaties | "koppelt elk product aan een batchnummer" onder transparantienorm; linktekst "HPLC-verificatie"; r50 diermodellen | "PeptideMan verzendt vanuit Nederland en publiceert voor 16 van de 18 producten het certificaat van één geteste batch."; diermodellen schrappen |
| kwaliteitseisen-voor-wetenschappelijke-onderzoekspeptiden | "met HPLC geanalyseerd"; diermodellen als toepassing; zin dubbel | "…een batch onafhankelijk geanalyseerd door Janoshik" |
| standaard-custom-peptiden-…-verschil | "per productiebatch analytisch gecontroleerd, meestal met HPLC en MS" + eigen assortiment; "met HPLC" (2×); levertijden tegenstrijdig | "Leveranciers publiceren vaak analysegegevens; kijk per product welke batch is getest en wat er is gemeten." |
| garantie-op-kwaliteit-bij-peptide-leveranciers | r134 "een batch met HPLC geanalyseerd"; "garantie" in slug | "…één batch onafhankelijk geanalyseerd door Janoshik. Op 15 van die 16 rapporten staat een zuiverheidswaarde; die ligt steeds op 99% of hoger. De rapporten vermelden de analysemethode niet." |
| hplc-zuiverheid-peptiden-controleren | r113 "gemeten HPLC-zuiverheid"; "hoe de analyses worden uitgevoerd" | "…de gemeten zuiverheid en het batchnummer van die batch. De analysemethode staat niet op het rapport." |
| retatrutide-simpel-uitgelegd | r98 "Per batch zijn analysegegevens beschikbaar"; geen enkele bron | "Voor de meeste producten is een analysecertificaat van een geteste batch openbaar; die vind je op onze pagina met [analysecertificaten]."; PubMed-bronnen |
| bpc-157-en-tb-500-samen-onderzoek | r95 "hoe wij deze punten per batch borgen"; geen PubMed-bronnen | "…lees je welke analysegegevens we per product publiceren en door welk extern laboratorium de analyse is uitgevoerd." |
| risico-van-onzuivere-peptiden-beperken-een-gids | r116 "hoe wij batches controleren en vrijgeven"; endotoxine zonder bron | "Hoe PeptideMan analyses laat uitvoeren door Janoshik, lees je op de pagina over kwaliteitscontrole." |
| betrouwbare-peptide-leverancier-onderzoekers | r99 "welke analyses … zoals HPLC en waar beschikbaar MS, lees je op het certificaat zelf" (onjuist) | "De rapporten vermelden de zuiverheid en gemeten onzuiverheden van één geteste batch; de analysemethode staat er niet op." |
| peptide-leveranciers-vergelijken-peptideman | "Is het certificaat van de batch die je ontvangt, en niet van een algemene 'standaardbatch'?" | "…of van een eerder geteste batch? Beide komen voor; weet wat je krijgt." |
| waar-let-je-op-bij-leverancier-onderzoekspeptiden | linktekst "kwaliteitsborging en batchcontrole" | "kwaliteitscontrole" |
| peptiden-zuiverheid-98-versus-99-uitgelegd | "Hoe wij batches controleren" | "Welke analyses wij per product publiceren, lees je op de pagina over [kwaliteitscontrole]." |
| 98-procent-vs-99-procent-peptidezuiverheid-verschil | "hoe batches worden gecontroleerd"; TFA zonder bron; "opslagcondities op het COA"; "0,9720" moet 0,97^20 zijn; dubbel met vorig artikel | "Op de kwaliteitspagina lees je welke rapporten beschikbaar zijn."; "Volg de opslagcondities op de productpagina." |
| transparante-productspecificaties-peptide-onderzoek | TFA-celkweekuitspraak zonder bron | PubMed 10567002 toevoegen of schrappen |
| direct-sourcing-strategie-voor-peptiden (licht) | "Per product vermelden wij de aanbevolen opslagtemperatuur zoals opgegeven door de fabrikant" | Bevestigen of "Volg de opslagtemperatuur op de productpagina." |
| hoeveelheid-peptiden-wetenschappelijk-lab (licht) | "hoe wij batches controleren"; typfout "Opent je" | Standaardzin; "Open je" |
| productzuiverheid-direct-sourcing-peptiden-prijzen (licht) | "Hoe PeptideMan de kwaliteit van batches bewaakt" | "Welke analyses PeptideMan publiceert, lees je op de pagina over kwaliteit." |
| hoogwaardige-peptiden-voor-academisch-onderzoek (licht) | "met HPLC laten analyseren"; "hoe batches worden geanalyseerd" | "onafhankelijk door Janoshik"; "welke analyses er zijn gepubliceerd" |
| peptidekwaliteit-garanderen-gids (licht) | "garanderen" in URL; "HPLC-chromatogram en massabepaling … zie je op analysecertificaten" | Nieuwe slug met 301; "…welke gegevens wij per product hebben: de gemeten waarden van één geteste batch, zonder vermelding van de analysemethode." |
| zuiverheid-onderzoekspeptiden-controleren (licht) | "zie je hoe zo'n document eruitziet" na beschrijving volledig CoA | "…de rapporten van de batch die per product is getest; de analysemethode staat daar niet op vermeld." |
| peptiden-opslag-voor-maximale-stabiliteit (licht) | r120 "hoe wij batches controleren"; r66 "steriel water zonder bewaarmiddel" lijkt op reconstitutietaal | "Welk oplosmiddel of welke buffer past, hangt af van de sequentie en je assay; volg het werkvoorschrift van je laboratorium." |
| peptiden-bewaren-gids-maximale-houdbaarheid (licht) | r48 "HPLC-zuiverheidsanalyse" | "…het analyserapport van één geteste batch openbaar." |
| 5-beste-methoden-peptide-synthese (licht) | "lees je hoe batches worden geanalyseerd"; "heb je daarom beide analyses nodig" vóór eigen certificaten zonder methode | Standaardzinnen. Alleen gericht gecontroleerd, bronnen niet bekeken. |

### GOED (17)
haal-de-fouten-weg-peptideonderzoek, peptide-lab-ervaringen-betrouwbare-leveranciers, stabiliteitsgegevens-opslagvoorwaarden-peptiden, stappenplan-peptiden-kwaliteit-verificatie, peptide-synthese-vs-recombinante-productie, transparante-productspecificaties-peptiden, peptide-leveranciers-vergelijken-gids, bpc-157-versus-tb-500-wetenschappelijk-onderzoek, bpc-157-peptide-onderzoek-werkingsmechanisme, peptiden-kopen-met-hplc-certificaat-gids-voor-onderzoekers, peptide-alternatieven-…-neder, stabiliteit-en-opslag-van-zuivere-peptiden, peptiden-kopen-zuiverheid-…-98-procent-zuiverheid, peptiden-kopen-met-batchnummer-analyse, goede-zuiverheidsgraad-peptiden-gids, peptiden-bestellen-…-kleine-onderzoeksgroepen, hplc-rapporten-interpreteren-peptiden.

Ook bij een aantal GOED-artikelen staat een link naar de eigen certificaten vlak na een norm die PeptideMan niet haalt. Neem die mee in de zoek-en-vervangronde.

## Grenzen
- De teksten zijn op 6 november via Firecrawl opgehaald; latere wijzigingen zijn niet meegenomen.
- Feiten over PeptideMan zijn alleen getoetst aan de certificatenpagina en de kennis; de vragen hierboven zijn niet beantwoord.
- Afbeeldingen zelf zijn niet bekeken, alleen alt-teksten en bestandsnamen.
- Dit is geen juridisch advies.
