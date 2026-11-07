# Sessie 7 nov 2026: aanpassingsvoorstellen blog en poging tot livegang

**Doel**: alle afgekeurde en aan te passen blogartikelen herschrijven en live zetten. Vervolg op `geheugen/sessies/2026-11-06-seo-audit-blog-claimcheck.md`.

**Gedaan**
- `inzichten/blog-aanpassingen/`: 39 voorstellen (oude tekst letterlijk, nieuwe tekst), elk door de claimcheck gelezen. `README.md` geeft het overzicht, 9 vragen voor David en 5 punten voor de jurist. Nieuwe PMID's via eutils nagekeken (7070207, 26424265, 10567002, 27847966, 21030672, 16099219, 10469335).
- PR #10 (peptideman-social, base `claude/mods-overview-a6tdns`) bijgewerkt; geen reviews, geen CI. Controle-check-ins via een geplande taak.
- `peptideman-site` gekloond naar `/home/user/peptideman-site`. Niets gewijzigd.

**Open**
- Live zetten: blogartikelen staan in Netlify Blobs. Route: `tools/herschrijf-blog.mjs --bundel` → `netlify/functions/_blog_herschreven.json` (nieuwe stempel) → PR → na merge en productie-deploy importeert `deploy-succeeded.mjs` met back-up. Daarvoor is de huidige HTML per artikel nodig: `peptideman.nl` moet bereikbaar zijn (proxy 403).
- Merge en deploy alleen als David het uitdrukkelijk vraagt (`peptideman-site/CLAUDE.md`).
- Niet live: `peptiden-verzending-belgie-onderzoek` tot David bevestigt dat PeptideMan naar België levert (en jurist).
- Bij 21 voorstellen is na het verwerken van de claimcheck geen tweede claimcheck gedaan.
- David: de 9 vragen in de README. Jurist: de 5 punten. Overige open punten uit de sessie van 6 nov blijven staan.

**Besluiten**
- Regel 7 van de kennis en de testclaim-regel in de poort: op verzoek van de gebruiker. Of het verzoek van David kwam is niet bevestigd.
- Netwerktoegang tot `peptideman.nl` (nieuwe omgeving): geweigerd door de gebruiker. Niet opnieuw voorstellen zonder vraag.

**Let op**
- Toegang tot `peptideman-site` werd eerst automatisch geweigerd en lukte pas op uitdrukkelijk verzoek.
- Een bundel-import overschrijft `title` en `summary` in de index: neem die velden altijd mee.
