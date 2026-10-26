---
name: "taste"
description: "Smaakcheck en -fixes voor alles wat er gemaakt wordt: webpagina's, componenten, social posts, ontwerpen en teksten. Gebruik na het maken van iets zichtbaars, of als David vraagt om 'taste fixes', 'smaakcheck', 'mooier maken', 'minder AI-achtig', 'strakker' of 'dit ziet er generiek uit'. Spoort de typische AI-standaardkeuzes op en vervangt ze door bewuste keuzes."
---

# Taste: smaakcheck en fixes

Doel: werk dat eruitziet alsof een mens met smaak het bewust heeft gemaakt, niet als het gemiddelde van duizend templates. Werk altijd in drie stappen: **kijken → benoemen → fixen**. Fix het echt; lever niet alleen een lijst.

Werk je voor PeptideMan, laad dan eerst de skill `peptideman`: de huisstijl en tekstregels daar gaan voor op alles hieronder.

## Stap 1: Kijken
- Bekijk het resultaat zoals de gebruiker het ziet: render de pagina (Playwright-screenshot op 1440 px én 390 px breed), open de afbeelding, lees de tekst hardop-in-je-hoofd.
- Beoordeel eerst het geheel (wat valt als eerste op, waar kijkt het oog heen), dan pas details.

## Stap 2: Benoemen — de AI-standaardpatronen
Loop deze lijst af. Elk patroon dat je vindt is een fix-kandidaat.

### Visueel
- **Paars-blauwe gradiënten**, glow-effecten, glassmorphism zonder reden.
- **Alles gecentreerd**: hero, kopjes, tekstblokken, knoppen. Lange tekst hoort links uitgelijnd.
- **Drie gelijke kaartjes op een rij** met elk een icoon, kopje en twee regels tekst.
- **Emoji als iconen** of een willekeurige mix van icoonstijlen.
- **Overal dezelfde ronde hoeken en schaduw**; elke sectie in een kaart gestopt.
- **Te veel accentkleur**: de accentkleur (bij PeptideMan goud #C9A227) op elke knop, rand, kop en icoon. Accent = schaars, max. één primaire actie per scherm.
- **Geen ritme in witruimte**: willekeurige afstanden. Gebruik een vaste schaal (4/8/12/16/24/32/48/64/96 px).
- **Typografie zonder hiërarchie**: alle koppen ongeveer even groot, te veel gewichten. Kies 2–3 groottes met duidelijk verschil, max. 2 gewichten.
- **Regels te lang**: lopende tekst breder dan ~70 tekens.
- **Nepinhoud**: stockfoto-gevoel, lorem-achtige placeholdertekst, verzonnen logo's of reviews.
- **Animatie overal**: fade-in op elk blok, hover-schaal op alles.
- **Contrast**: grijze tekst op donkere achtergrond die onder WCAG AA (4,5:1) zakt.

### Tekst
- Openers als "In de snelle wereld van…", "Ontdek…", "Ontgrendel…", "Duik in…".
- Holle woorden: *naadloos, revolutionair, baanbrekend, ultiem, next-level, game-changer, krachtig, robuust*.
- Steeds drietallen ("snel, veilig en betrouwbaar"), overal uitroeptekens.
- Gedachtestreepjes als stijlfiguur in elke zin.
- Kopjes die niets zeggen ("Waarom kiezen voor ons?", "Onze missie").
- Afsluiters die samenvatten wat er net stond.
- Letterlijk vertaald Engels ("Dit is waar X binnenkomt", "aan het eind van de dag").

## Stap 3: Fixen
Regels bij het fixen:
1. **Kies, verwijder, versterk.** Eerst weghalen wat niets toevoegt, dan het belangrijkste groter/duidelijker maken. Minder elementen > meer decoratie.
2. **Eén idee per sectie**, één primaire actie per scherm.
3. **Asymmetrie mag**: links uitgelijnde hero met tekst + beeld, wisselende sectie-indeling in plaats van steeds hetzelfde raster.
4. **Echte inhoud**: echte productnamen, echte cijfers, echte foto's van product/labrapport. Geen verzonnen claims of reviews.
5. **Tekst concreet maken**: vervang elk hol woord door een feit ("per batch getest door Janoshik" in plaats van "topkwaliteit"). Korte zinnen. Zeg het één keer.
6. **Kleur en type uit tokens**: zet kleuren, groottes en afstanden in CSS-variabelen en gebruik alleen die.
7. **Respecteer de huisstijl** (PeptideMan: donker #0B0B0D, goud spaarzaam, tekst #B7B1A3/#F5F2EA, ~8 px hoeken, systeemfont, zakelijk en rustig).
8. **Controleer opnieuw**: render na de fix opnieuw (desktop + mobiel), vergelijk voor/na. Geen horizontale scroll op mobiel, contrast AA.

## Oplevering
Geef kort:
- **Voor/na**: screenshots of tekstfragmenten naast elkaar.
- **Wat er veranderd is**: max. 5–7 punten, elk met het waarom ("drie gelijke kaarten → één uitgelicht voordeel, want X is het hoofdargument").
- **Wat je bewust niet hebt aangepast** en waarom, als dat relevant is.

Gaat het om de live website: werk via een branch en pull request (zie `peptideman`), nooit direct op main.
