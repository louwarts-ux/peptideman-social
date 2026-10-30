---
name: post-maken
description: Loopt de hele keten voor één PeptideMan-post door, van schrijven tot klaarzetten in Metricool, met claimcheck en eindredactie tussendoor. Gebruik bij "maak een post over", "maak de volgende post uit het plan", "/post-maken".
---

# Post maken

De keten, met een poort na elke stap. Ga pas door als de poort open is.

1. **Opdracht.** Neem onderwerp, pijler en kanaal uit de vraag of uit het plan in `planning/` met `status: akkoord`. Ontbreekt er iets, vraag het.
2. **Schrijven.** Laat de agent `bibliotheek-schrijver` de post en het HTML-beeld maken. De poort-hook weigert een postbestand dat de regels breekt; de schrijver past dan zelf aan.
3. **Toetsen, met een frisse blik.** Start `claimcheck` en `eindredacteur` tegelijk, elk alleen met het pad van het bestand (geef je eigen oordeel niet mee).
   - claimcheck AFKEUREN: stop en meld het.
   - AANPASSEN (een van beide): pas de post aan met hun herschrijvingen en laat opnieuw toetsen. Maximaal twee rondes; daarna vraag je David.
   - claimcheck GOED: zet `claimcheck: GOED` in het bestand.
4. **Verifiëren.** Draai `node scripts/pm.js check <bestand>`. Elke ✗ is een stop.
5. **Beeld.** `node scripts/render.js posts/media/<naam>.html` (TikTok: `1080 1920`). Bekijk de PNG zelf. Zet het beeld online volgens de kennis (alleen de map `social/` naar de media-site) en vul `beeld-url` in. Lukt online zetten niet, stop dan hier en zeg wat er nog moet.
6. **Inplannen.** Laat de `planner` de post klaarzetten ter beoordeling. Zet daarna `ingepland: <datum tijd>` in het bestand.
7. **Bewijs.** Geef terug: bestand, oordeel claimcheck en eindredacteur, uitkomst van `pm check`, beeld-url, en datum en tijd in Metricool. Wat is overgeslagen, zeg je ook.
