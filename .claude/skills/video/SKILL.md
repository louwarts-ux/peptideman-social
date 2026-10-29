---
name: video
description: Maakt een social-veilige PeptideMan-video (TikTok of Pinterest) met AI-beeld, Nederlandse voice-over en eigen muziek, laat hem controleren en zet hem klaar. Gebruik bij "/video <onderwerp>" of "maak een filmpje over ...".
argument-hint: <onderwerp> [tiktok|pinterest] [seconden]
---

# /video: social-veilige video in één keer

Invoer: $ARGUMENTS. Standaard: TikTok, 12 seconden. Kies een onderwerp uit de pijler Labwerk als er geen is.

1. **Bron**: laat `bibliotheek-schrijver` een post in pijler **Video** maken (script met PubMed-bron). Bij Labwerk mag een methodeartikel.
2. **Vooraf controleren**: laat `claimcheck` het script nakijken vóórdat er credits worden uitgegeven. Alleen bij GOED verder.
3. **Maken**: laat de subagent `videomaker` de video bouwen met dat script.
4. **Na controle**: laat `claimcheck` het postbestand met de beeldprompt en caption nog eens nakijken (sectie "Video zonder ban"). Bij GOED: `claimcheck: GOED`.
5. **Online en inplannen**: download de video uit de flow, deploy hem naar `social/` op peptideman-media-hspj, vul `video-url` in en laat `planner` hem klaarzetten ter beoordeling.

Geef David: de flow-link om de video te bekijken, de caption, de geplande tijd, en twee herinneringen: AI-label aan op TikTok, en goedkeuren in Metricool.
