# peptideman-social

Tools for the Peptideman social media workflow.

## Mods

### caption-check

A [Claude Code mod](https://code.claude.com/docs/en/plugins/mods/overview) that adds `/caption-check`. It checks a draft post against each platform's character and hashtag limits, notes where the feed cuts the caption off with "more", and flags health-claim wording ("cures", "FDA approved", "guaranteed", ...) that platforms often reject in peptide posts. It runs at once, even while Claude is working, and Claude sees the result, so you can follow up with "fix it".

```
/caption-check BPC-157 heals your gut, guaranteed #peptides #recovery
/caption-check threads Morning stack #peptides #recovery
```

Platforms: `instagram` (`ig`), `tiktok` (`tt`), `x` (`twitter`), `threads`, `linkedin` (`li`), `facebook` (`fb`). Leave the platform out to check all of them. The limits are in `mods/caption-check/hooks/check.ts`.

Install it from a terminal Claude Code session (v2.1.287 or later):

```
/plugin install caption-check --marketplace louwarts-ux/peptideman-social
```

Answer `y` to add the marketplace, then pick a scope. To try it without installing, run `claude --plugin-dir mods/caption-check` from this repo.

Develop:

```
claude plugin validate mods/caption-check
claude plugin test mods/caption-check
```

## Agents

Vier Claude Code-subagents in `.claude/agents/`. Elke agent is opgebouwd uit dezelfde vijf onderdelen: een model, regie (de werkwijze), een sandbox (wat hij wel en niet mag), kennis en tools. De kennis staat op één plek, `kennis/peptideman.md`; pas die aan als er iets verandert, dan weten alle agents het.

| Agent | Doet | Mag |
|---|---|---|
| `bibliotheek-schrijver` | Schrijft Bibliotheek-posts met PubMed-bron naar `posts/` | Lezen, schrijven, Firecrawl |
| `claimcheck` | Toetst teksten op gezondheidsclaims en doseeradvies | Alleen lezen |
| `onderzoeker` | Concurrenten, trends en bronnen, verslag naar `onderzoek/` | Lezen, schrijven, Firecrawl |
| `planner` | Zet goedgekeurde posts klaar in Metricool | Alleen inplannen ter beoordeling |

Werkwijze voor een post:

1. "Laat de bibliotheek-schrijver een Mythe vs Feit maken over BPC-157." Het bestand krijgt `claimcheck: open` en `beeld-url: open`, en er komt een HTML-beeld in `posts/media/`. Zet dat om met `node scripts/render.js posts/media/<naam>.html`.
2. "Laat de claimcheck dat bestand nakijken." Bij **GOED** zet Claude in het bestand `claimcheck: GOED`.
3. Zet de PNG online en vul de openbare link in bij `beeld-url`. Pinterest en TikTok weigeren een post zonder beeld.
4. "Laat de planner hem inplannen op Pinterest." Je keurt hem daarna goed in Metricool.

Claude kiest de juiste agent ook zelf op basis van de beschrijving. Bekijk ze met `/agents`. De tools van Firecrawl en Metricool staan met hun volledige naam in de agents; heet een connector bij jou anders, pas dan de regel `tools:` aan.
