# Lessen

Patronen uit echte sessies, elk met een zekerheid van 0 tot 1. De skill `/leren` werkt dit bij; de start van elke sessie toont de lessen van 0,5 of hoger.

- Nieuw: 0,3. Opnieuw bevestigd: +0,2. Tegengesproken: −0,2. Onder 0,2: weg.
- Vanaf 0,8 stelt `/leren` voor om de les over te zetten naar `kennis/peptideman.md`. Pas na akkoord van David.
- Vorm: `- [zekerheid] Kanaal of onderwerp: de les. (bron, datum, aantal keer bevestigd)`

## Lessen
- [0.7] TikTok: plaats nooit twee keer dezelfde post; de herhaalde carrousel haalde 6 en 7 weergaven. (analist, 28-10-2026, 1×)
- [0.5] TikTok: een foto met één sterke uitspraak deed het beter dan carrousel en video (41.942 tegen 243 weergaven), maar het is één uitschieter. (analist, 28-10-2026, 1×)
- [0.8] Werkwijze: een post zonder openbare beeld-url kan niet in Metricool; zet het beeld eerst online. Ook als het beeld al online staat blijft de post hangen tot `beeld-url` is ingevuld (8 posts op 6 nov). (sessie, 06-11-2026, 2×; in kennis gezet)
- [0.3] Bronnen: PubMed-nummers en studieopzet van agents (claimcheck, schrijver) komen soms uit hun geheugen; zoek ze altijd zelf op via PubMed (eutils) en lees de abstract. "Bindt aan de receptor" klopte niet met de abstract van Raun 1998. (sessie, 06-11-2026, 1×)
- [0.3] Metricool: posts die buiten de keten zijn gemaakt staan vaak op ingepland (draft: false) zonder claimcheck of "Uitsluitend voor onderzoek."; op 6 nov waren het er 7. Kijk bij elke sessie de planning na op draft: false en zet die naar concept. (sessie, 06-11-2026, 1×)
- [0.3] Media-site: een Netlify-deploy vervangt de hele site; neem altijd alle PNG's uit `posts/media` mee in `social/` en controleer daarna dat de oude beelden nog online staan. (sessie, 06-11-2026, 1×)
- [0.5] Eigen assortiment: bij een stof die PeptideMan verkoopt keurt de claimcheck effectonderzoek af of laat het aanpassen; houd het bij herkomst, soort onderzoek (cel/dier/mens) en status. Eén stof per pin, nooit een duo dat als combinatie leest. Ook op de website: een kooplink naar BPC-157 vlak na dieronderzoek naar pees- of weefselherstel werd AFGEKEURD. (claimcheck, 06-11-2026, 2×)
- [0.3] Teksten over PeptideMan zelf: schrijf over het testen alleen wat de certificatenpagina laat zien (één geteste batch per product, methode niet op het rapport). "Per batch", "elke batch", "met HPLC geanalyseerd" en een norm met daarna een link naar de eigen certificaten waren het hoofdpunt bij de meeste van de 38 blogartikelen die aangepast moeten worden; de bron was regel 7 van de kennis (nu aangepast). (claimcheck blog, 06-11-2026, 1×)
- [0.3] Werkwijze: curl naar peptideman.nl wordt door de proxy geweigerd (403); gebruik Firecrawl. Laat een agent hooguit ongeveer 10 hele artikelen als tekst opslaan, anders loopt zijn context vol; gebruik voor alleen controleren `formats: query` met gerichte citaten. (sessie, 06-11-2026, 1×)
