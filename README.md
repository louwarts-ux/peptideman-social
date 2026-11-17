# peptideman-social

Tools for the Peptideman social media workflow.

## Werkwijze in één oogopslag

Een eigen, kleine versie van het idee achter ECC (een agent-harnas): niet in elke prompt opnieuw uitleggen hoe het moet, maar de werkwijze één keer vastleggen en laten afdwingen.

```
plan → schrijven → claimcheck + eindredactie → beeld → inplannen → meten → leren
```

| Onderdeel | Waar | Wat het doet |
|---|---|---|
| Regels | `CLAUDE.md`, `kennis/peptideman.md` | Altijd geladen; de kennis is de enige bron van waarheid |
| Regels als code | `scripts/lib/regels.js` | Claims, dosering, disclaimer, bron, hashtags, kanaalregels: hetzelfde getoetst door hooks en `pm check` |
| Hooks | `.claude/settings.json` | **poort** weigert een post die de regels breekt en elke Metricool-post die direct live gaat, een claim bevat, geen beeld heeft of naar een stil kanaal gaat. **sessie-start** geeft bij elke start de stand, de vorige sessie en de sterke lessen mee |
| Agents | `.claude/agents/` | Zes specialisten met elk een eigen sandbox (zie hieronder) |
| Skills | `.claude/skills/` | `/weekplan`, `/post-maken`, `/controle`, `/leren`, `/sessie-opslaan`, `/sessie-hervatten` |
| Geheugen | `geheugen/` | Sessienotities en lessen met een zekerheid van 0 tot 1; sterke lessen gaan, na akkoord, naar de kennis |
| Shield | `node scripts/pm.js shield` | Scant agents op gevaarlijke tools, controleert of de poort aanstaat, zoekt naar tokens en prompt-injectie in de repo |

```
node scripts/pm.js status    # stand en volgende stap per post
node scripts/pm.js check     # alle posts tegen de regels
node scripts/pm.js tekst [platform] "<tekst>"   # een losse tekst tegen de regels en platformlimieten
node scripts/pm.js shield    # veiligheidsscan
node scripts/pm.js doctor    # is alles aanwezig en aangesloten
npm test                     # tests van regels en hooks
```

Weigert de poort iets, dan staat in de melding waarom; pas de tekst aan. Een nieuwe vaste regel voeg je toe in `scripts/lib/regels.js` met een test in `tests/`.

Een losse tekst (een caption die je wilt plaatsen, een reactie, een idee) toets je met `pm tekst`. Die gebruikt dezelfde regels als de poort, plus de tekenlimieten per platform (`tiktok`, `pinterest`, `instagram`, `threads`, `x`, `linkedin`, `facebook`; zonder platform alleen de huisregels). De limieten staan in `scripts/lib/tekst.js`. Dit vervangt de oude mod `/caption-check`, die eigen en zwakkere regels had.

## Agents

Zes Claude Code-subagents in `.claude/agents/`. Elke agent is opgebouwd uit dezelfde vijf onderdelen: een model, regie (de werkwijze), een sandbox (wat hij wel en niet mag), kennis en tools. De kennis staat op één plek, `kennis/peptideman.md`; pas die aan als er iets verandert, dan weten alle agents het.

| Agent | Doet | Mag |
|---|---|---|
| `bibliotheek-schrijver` | Schrijft Bibliotheek-posts met PubMed-bron naar `posts/` | Lezen, schrijven, Firecrawl |
| `claimcheck` | Toetst teksten op gezondheidsclaims en doseeradvies | Alleen lezen |
| `onderzoeker` | Concurrenten, trends en bronnen, verslag naar `onderzoek/` | Lezen, schrijven, Firecrawl |
| `planner` | Zet goedgekeurde posts klaar in Metricool | Alleen als concept; David zet ze op ingepland |
| `analist` | Leest de Metricool-cijfers en houdt "Wat werkt" in de kennis bij | Alleen cijfers lezen, schrijven in `inzichten/` |
| `eindredacteur` | Toetst een post op kwaliteit en bereik, los van de claimcheck | Alleen lezen |

Werkwijze voor een post:

1. "Laat de bibliotheek-schrijver een Mythe vs Feit maken over BPC-157." Het bestand krijgt `claimcheck: open` en `beeld-url: open`, en er komt een HTML-beeld in `posts/media/`. Zet dat om met `node scripts/render.js posts/media/<naam>.html`.
2. "Laat de claimcheck dat bestand nakijken." Bij **GOED** zet Claude in het bestand `claimcheck: GOED`.
3. Zet de PNG online en vul de openbare link in bij `beeld-url`. Pinterest en TikTok weigeren een post zonder beeld.
4. "Laat de planner hem inplannen op Pinterest." Je keurt hem daarna goed in Metricool.

Laat de analist elke week kijken wat werkt; de schrijver leest dat mee bij elke nieuwe post.

Claude kiest de juiste agent ook zelf op basis van de beschrijving. Bekijk ze met `/agents`. De tools van Firecrawl en Metricool staan met hun volledige naam in de agents; heet een connector bij jou anders, pas dan de regel `tools:` aan.
