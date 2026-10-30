---
name: weekplan
description: Maakt een contentplan voor een week PeptideMan-posts op TikTok en Pinterest, als bewerkbaar bestand in planning/, voordat er iets geschreven wordt. Gebruik bij "plan de week", "wat posten we", "/weekplan".
---

# Weekplan

Eerst plannen, dan maken. Het plan is een bestand dat David kan aanpassen; er wordt niets geschreven tot hij akkoord geeft.

1. Draai `node scripts/pm.js status` en lees `kennis/peptideman.md` (vooral "Wat werkt" en "Per kanaal"), `geheugen/lessen.md` en het laatste verslag in `inzichten/`.
2. Kijk welke onderwerpen al in `posts/` staan; herhaal er geen.
3. Maak `planning/<jjjj>-w<weeknummer>.md` met een tabel: dag, kanaal, pijler, onderwerp, hoek (pin-titel als zoekvraag of TikTok-openingszin), waarom (welke les of welk inzicht).
   - Pinterest: één Bibliotheek-pin per dag om 11:00.
   - TikTok: 3 à 4 posts, minstens één Labwerk.
   - Verdeel de vijf pijlers; zet Labwerk vaker in, daarmee onderscheidt PeptideMan zich.
   - Zet één experiment uit het laatste analistverslag bewust in het plan en noem het "experiment".
4. Zet onderaan `status: concept`.
5. Toon het plan en vraag akkoord. Pas het aan tot David akkoord is; zet dan `status: akkoord`.

Daarna maakt `/post-maken` de posts één voor één.
