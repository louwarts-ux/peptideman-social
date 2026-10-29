# PeptideMan-social: werkafspraken voor Claude

Social media van PeptideMan (peptideman.nl). Eigenaar: David. Schrijf in het Nederlands; merknaam PeptideMan. Alle vaste kennis staat in `kennis/peptideman.md`; die gaat voor alles.

## Zo werkt David met het team
David hoeft alleen dit te typen:

| Typ | Wat er gebeurt |
|---|---|
| `/post <onderwerp>` | Post schrijven, claimcheck, beeld maken, online zetten, klaar in Metricool |
| `/video <onderwerp>` | Social-veilige video met AI-beeld, Nederlandse stem en muziek, gecontroleerd en klaar |
| `/week` | Cijfers bekijken, 5 posts en 1 video voor de week, alles klaar ter beoordeling |
| "Wat werkt er?" | De analist bekijkt de cijfers |
| "Wat doen de concurrenten?" | De onderzoeker zoekt het uit |

Kies zelf pijler, kanaal en tijd als David die niet noemt. Vraag alleen iets als je echt vastzit.

## Het team (`.claude/agents/`)
`bibliotheek-schrijver` (teksten en beelden), `videomaker` (video's), `claimcheck` (controle, past niets aan), `planner` (Metricool, alleen ter beoordeling), `analist` (cijfers), `onderzoeker` (web).

## Harde regels
- Niets gaat live zonder `claimcheck: GOED` en zonder goedkeuring van David in Metricool.
- Geen gezondheidsclaims, geen dosering of gebruik bij mensen; onderzoek met bron. Zie de kennis.
- Video's volgen "Video zonder ban" in de kennis. Video-generatie kost credits: elke node één keer draaien, niet zelf opnieuw proberen.
- Geen sleutels of wachtwoorden in bestanden of in de chat.
- Werk op een branch en lever aan via een pull request.
