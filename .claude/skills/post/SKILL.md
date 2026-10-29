---
name: post
description: Maakt in één keer een complete PeptideMan-post - schrijven, claimcheck, beeld en klaarzetten in Metricool. Gebruik bij "/post <onderwerp>" of "maak een post over ...".
argument-hint: <onderwerp> [pijler] [tiktok|pinterest]
---

# /post: van onderwerp tot klaar in Metricool

Invoer: $ARGUMENTS. Ontbreekt de pijler, kies dan zelf (bij twijfel Labwerk of Weetje). Ontbreekt het kanaal, maak hem voor Pinterest. Vraag niets na wat je zelf kunt kiezen.

1. **Schrijven**: laat de subagent `bibliotheek-schrijver` de post en het HTML-beeld maken.
2. **Controle**: laat de subagent `claimcheck` het postbestand nakijken.
   - GOED: zet `claimcheck: GOED` in het bestand.
   - AANPASSEN: verwerk de herschrijvingen zelf en laat `claimcheck` nog één keer kijken. Daarna nog niet goed: stop en laat David de bevindingen zien.
   - AFKEUREN: stop en meld waarom.
3. **Beeld**: `node scripts/render.js posts/media/<naam>.html` (TikTok: met `1080 1920`). Bekijk de PNG zelf: tekst leesbaar, niets afgesneden.
4. **Online zetten**: deploy alleen een map met de PNG's in `social/` naar de Netlify-site peptideman-media-hspj (zie kennis), via de Netlify-connector. Vul `beeld-url` in met `https://peptideman-media-hspj.netlify.app/social/<naam>.png` en open de link om te zien dat hij werkt. Lukt deployen niet, stop hier en zeg dat de PNG nog online moet.
5. **Inplannen**: laat de subagent `planner` de post klaarzetten ter beoordeling.

Geef David aan het eind in vijf regels: onderwerp, kanaal, oordeel claimcheck, geplande datum/tijd, en "Keur hem goed in Metricool".
