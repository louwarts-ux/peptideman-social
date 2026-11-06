# Sessie 6 nov 2026: Claude SEO-plugin, SEO-audit en claimcheck van de blog

**Doel**: beoordelen of de Claude SEO-plugin bruikbaar is, peptideman.nl op SEO doorlichten en de 56 blogartikelen op claims laten nakijken.

**Gedaan**
- `inzichten/2026-11-06-claude-seo-veiligheid.md`: SkillSpector + broncode, oordeel CAUTION. Alleen lokaal, zonder extensies of Google-koppeling, en niet in deze repo installeren.
- `inzichten/2026-11-06-seo-audit.md`: techniek goed, maar niet in de top 20 op "peptiden kopen", "research peptiden" en "janoshik getest". Top 5: Trustpilot-profiel verwijderd terwijl de knop op elke productpagina staat (gecontroleerd); bacteriostatisch water en spuiten plus filterlabels (jurist); certificaten.html spreekt de rest van de site tegen over de methode (gecontroleerd); 56 blogartikelen samenvoegen tot 10 à 12; certificaatpagina's indexeerbaar maken.
- `inzichten/2026-11-06-blog-claimcheck.md`: 17 GOED, 38 AANPASSEN, 1 AFKEUREN (`peptiden-voor-wetenschappelijk-onderzoek-kopen`: BPC-157-kooplink na dieronderzoek naar weefselherstel). Hoofdpatroon: "per batch", "met HPLC", en normen waar PeptideMan zelf niet aan voldoet.
- `kennis/peptideman.md` regel 7: "per batch getest (HPLC/LC-MS)" vervangen door "één geteste batch per product, methode niet op het rapport". Tests 21/21.
- Niets aan de website en niets in Metricool gewijzigd.

**Open**
- David: de blog aanpassen volgens het claimcheck-verslag. Eerst het afgekeurde artikel, de vijf artikelen met de norm "elke batch" en de meta descriptions.
- David: de negen feiten uit het verslag nagaan (15/16 ≥99%, batchnummer op flacon, SDS, Janoshik-accreditatie, custom synthese, België, wat er op kwaliteit.html staat).
- Jurist: BPC-157-links naast weefselonderzoek, diermodellen als toepassing, verkoop aan particulieren tegenover teksten voor "laboratoria", België en Europa. Komt bovenop de open vraag uit de vorige sessie.
- Trustpilot: de knop weghalen en vragen waarom het profiel is verwijderd.
- Open uit de vorige sessie blijft staan (concepten inplannen, oude posts weggooien, ~18 nov foto-experiment).

**Besluiten**
- Claude SEO niet in deze repo. David besloot regel 7 in de kennis aan te passen.

**Let op**
- curl naar peptideman.nl wordt door de proxy geblokkeerd (403); Firecrawl werkt wel. Hele artikelen overschrijven kost veel context: maximaal ±10 per agent. Eén artikel (syntheseroutes) werd door een filter tegengehouden; dat heb ik met gerichte citaten (`formats: query`) gecontroleerd.
- PageSpeed-API had zijn daglimiet bereikt (429), dus snelheid is niet gemeten.
