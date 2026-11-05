---
name: artikel-maken
description: Loopt de hele keten voor één SEO-artikel voor peptideman.nl door, van schrijven tot HTML klaar om als concept in de webshop te zetten, met claimcheck en eindredactie tussendoor. Gebruik bij "maak een artikel", "volgende artikel uit het seo-plan", "/artikel-maken".
---

# Artikel maken

De keten, met een poort na elke stap. Ga pas door als de poort open is.

1. **Opdracht.** Neem het zoekwoord uit de vraag, of het eerste `open` zoekwoord uit `seo/plan.md` met `status: akkoord`. Geen plan met akkoord? Draai eerst `/seo-plan`.
2. **Schrijven.** Laat de agent `seo-schrijver` het artikel maken in `artikelen/<slug>.md`. De poort-hook weigert een artikel dat de regels breekt.
3. **Toetsen, met een frisse blik.** Start `claimcheck` en `eindredacteur` tegelijk, elk alleen met het pad (geef je eigen oordeel niet mee). Vraag de eindredacteur te toetsen op "Website-artikelen" in de kennis.
   - claimcheck AFKEUREN: stop en meld het.
   - AANPASSEN (een van beide): pas het artikel aan en laat opnieuw toetsen. Maximaal twee rondes; daarna vraag je David.
   - claimcheck GOED: zet `claimcheck: GOED` in het bestand.
4. **Verifiëren.** `node scripts/pm.js check artikelen/<slug>.md`. Elke ✗ is een stop; de · zijn SEO-adviezen, los ze op waar het kan.
5. **Exporteren.** `node scripts/artikel.js export artikelen/<slug>.md` en zet `export: artikelen/export/<slug>.html` in het bestand. Het script weigert zonder claimcheck GOED.
6. **Online.** Niets gaat direct live. David plakt de HTML als concept in de webshop, met de SEO-titel, meta-beschrijving en slug uit het commentaar bovenaan, en publiceert zelf. Daarna: `online: <url> (<datum>)` in het artikel en status `online` in `seo/plan.md`.
7. **Bewijs.** Geef terug: bestand, zoekwoord, aantal woorden, oordeel claimcheck en eindredacteur, uitkomst van `pm check`, pad van de export. Wat is overgeslagen, zeg je ook.
