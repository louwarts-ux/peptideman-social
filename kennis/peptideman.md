# Kennis: PeptideMan

De vaste bedrijfskennis voor alle agents in deze repo. Klopt hier iets niet meer, pas het dan hier aan; alle agents lezen dit bestand.

## De zaak
- PeptideMan (peptideman.nl) is een Nederlandse webshop die onderzoekspeptiden online verkoopt aan particulieren.
- Positionering: zuivere peptiden voor onderzoek, per batch onafhankelijk getest door Janoshik (HPLC/LC-MS), uitsluitend voor onderzoek.
- Verzending vanuit Nederland met PostNL en DHL: €6,95 per bestelling, gratis vanaf €150.
- Concurrenten: Peptidekoning, NexGen, Dutch Peptide.
- Contact: peptideman.nl · info@peptideman.nl
- Schrijf in het Nederlands. Merknaam: PeptideMan (niet Peptideman).

## Huisstijl
- Donker met goud: achtergrond #0B0B0D, goud #C9A227, tekst #B7B1A3, lichte tekst #F5F2EA, vlakken #141417, randen #3A3A42.
- Strak schreefloos systeemlettertype, afgeronde hoeken van ongeveer 8 px.
- Uitstraling: zakelijk en rustig.

## Social
- Actieve kanalen: TikTok en Pinterest. Facebook en Instagram liggen stil. Inplannen via Metricool.
- Metricool: merk-ID 6948479, tijdzone Europe/Amsterdam. Pinterest-bord voor de Bibliotheek: ID 967922213604666698. Pin-link: https://peptideman.nl.
- Bibliotheek-pins gaan om 11:00 de deur uit, één per dag. Metricool geeft voor Pinterest geen beste tijden; neem dan de eerste vrije dag om 11:00.
- Pinterest en TikTok eisen een beeld met een openbare link. Zonder `beeld-url` kan een post niet in Metricool.
- Beelden staan online via de aparte Netlify-site peptideman-media-hspj (site-ID aad221e0-ec80-4ecc-9987-3d34bcc78464), los van de webshop. Link: https://peptideman-media-hspj.netlify.app/social/<naam>.png. Deploy alleen een map met de PNG's in `social/`, nooit de hele repo.
- Bibliotheek-reeks: korte, educatieve posts over peptideonderzoek in vijf pijlers: Weetje, Vraag van de dag, Mythe vs Feit, Video en Labwerk.
- **Labwerk** is de pijler waarmee PeptideMan opvalt: laat zien hoe zuiverheid gemeten wordt. Denk aan een HPLC-chromatogram uitgelegd, wat er in een Janoshik-rapport staat, wat "99%" echt betekent, hoe je een vervalst rapport herkent. Concurrenten roepen "getest"; PeptideMan legt het uit. Geen claims nodig, wel vertrouwen.

## Wat werkt (bijgewerkt door de analist, stand 28 okt 2026)
Nog weinig data: 4 TikTok-posts, Pinterest nog geen cijfers. Behandel dit als werkhypotheses.
- TikTok: de fotopost "Welkom bij PeptideMan" (14 okt) haalde 41.942 weergaven, 19 likes, 2 shares. De carrousel "Wat zijn peptides?" haalde 6 en 7 weergaven: twee keer dezelfde post geplaatst (22 en 25 okt). Een video van 15 s (8 okt) haalde 243.
- Plaats nooit twee keer dezelfde post op TikTok; TikTok drukt dubbele inhoud weg.
- Links in een TikTok-caption zijn niet klikbaar; laat ze weg (zet "link in bio").

## Per kanaal
**Pinterest is een zoekmachine.**
- Pin-titel = een zoekvraag die mensen typen: "Wat is BPC-157?", "Hoe werkt een HPLC-test?". Niet "PeptideMan Bibliotheek - X".
- Het zoekwoord staat in de eerste zin van de beschrijving.
- Eén vaste beeldstijl (sjabloon in `posts/media/`), zodat pins herkenbaar zijn in de feed.
- Link naar de meest passende pagina, liefst een artikel in de kennisbank, niet altijd de homepage.

**TikTok draait om de eerste seconde.**
- Het eerste beeld is één prikkelende uitspraak in grote letters, bijvoorbeeld "99% zuiver? Zo lees je het rapport." of "Dit peptide komt uit maagsap".
- Fotocarrousel: 4 à 6 beelden van 1080×1920, één gedachte per beeld, laatste beeld: "Volg voor meer uit het lab".
- Caption kort (maximaal 150 tekens), 3 à 5 hashtags, geen link.
- Elke post is nieuw: nooit een eerdere post herhalen.

## Video zonder ban (TikTok en Pinterest)
Peptiden vallen bij beide platforms onder gereguleerde of gevoelige producten. Video's die op verkoop of gebruik lijken, worden onderdrukt of verwijderd en kunnen het account een strike geven. Educatief labwerk komt wel door. Daarom:
- **Onderwerp**: uitleg over onderzoek en meten (HPLC, LC-MS, aminozuren, wat "99% zuiver" betekent). Nooit "wat doet X met je lichaam".
- **Beeld**: donker lab, apparatuur, chromatogrammen, abstracte moleculen, handen in labhandschoenen. Nooit naalden, spuiten, huid, lichamen, spieren, voor-en-na, weegschalen, pillen of iemand die iets inneemt.
- **Geen verkoop in de video**: geen prijzen, korting, "bestel", "link in bio om te kopen", geen productfoto als hoofdbeeld. Merknaam en "Volg voor meer uit het lab" mag.
- **Tekst en stem**: dezelfde regels als alle teksten. Elke video eindigt met "Uitsluitend voor onderzoek."
- **AI-label**: AI-video's krijgen bij uploaden op TikTok het label "AI-gegenereerde content" (verplicht voor realistische AI-beelden; zonder label kan TikTok de video verwijderen). Pinterest zet zelf een AI-label; niet weghalen.
- **Geluid**: alleen eigen gegenereerde muziek en stem (ElevenLabs). Geen trending nummers onder een bedrijfsaccount.
- **Variatie**: nooit dezelfde video twee keer; elke video een nieuw onderwerp of nieuwe hook.
- **Lengte en vorm**: TikTok 9:16, 8 à 15 seconden, hook in de eerste 2 seconden. Pinterest 2:3 of 9:16, max 15 seconden, titel als zoekvraag.

## Regels voor alle teksten
- Geen gezondheidsclaims: niets over genezen, afvallen, spiergroei of verjonging bij mensen.
- Geen doseeradvies, gebruiksinstructies of injectie-informatie voor mensen.
- Onderzoek beschrijf je als onderzoek (dier, cel, mens; wat is gemeten), met bron (PubMed-link).
- Pinterest: geen taal of beelden over afvallen of lichaamsverandering.
- Wetgeving (Geneesmiddelenwet, reclameregels): benoem het risico en verwijs naar een jurist; geen juridisch advies.
