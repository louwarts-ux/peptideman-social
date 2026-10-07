# Business OS

Een plugin voor Claude Code die van Claude een team specialisten maakt voor je bedrijf. Je legt je bedrijf één keer vast, daarna kent elke specialist je klant, je aanbod en je stem.

- **20 specialisten**: marketing, sales, klantenservice, operations, automatisering, finance, juridisch, strategie, data en prompting
- **Router**: `/business-os:os <taak>` kiest de juiste specialist, of knipt een groot doel op in stappen
- **Gedeeld geheugen**: `business-os/bedrijf.md`, gemaakt met `/business-os:start`
- **10 masterclasses**: Claude Code, prompting, eigen skills, n8n en AI-automatisering, content- en salessystemen

## Installeren

In een Claude Code-sessie in de terminal:

```
/plugin install business-os --marketplace louwarts-ux/peptideman-social
```

Antwoord `y` om de marketplace toe te voegen en kies een scope. Uitproberen zonder te installeren: `claude --plugin-dir plugins/business-os` vanuit deze repo.

## Beginnen

```
cd ~/mijn-bedrijf && claude
/business-os:start          # onboarding, ~5 minuten
/business-os:os             # menu met alle specialisten
/business-os:masterclass 1  # eerste les
```

## Specialisten

| Afdeling | Commando | Voor |
|---|---|---|
| Marketing | `copywriter` | Salespagina's, ads, productteksten, hooks |
| | `social-media` | Contentkalender, posts per platform, repurposing |
| | `email-marketing` | Welkomstreeksen, nieuwsbrieven, lanceringsmails |
| | `seo` | Zoekwoorden, blogs, on-page check |
| | `ads` | Meta/Google/TikTok-campagnes, varianten, testplan |
| | `merk` | Positionering, tone of voice, merkverhaal |
| Sales | `aanbod` | Aanbod, prijzen, pakketten, garantie |
| | `sales` | Belscripts, bezwaren, follow-ups, DM's |
| | `offerte` | Offertes en voorstellen |
| Klant | `klantenservice` | Antwoorden, FAQ, klachten, reviews |
| Operations | `operations` | SOP's, processen, delegeren |
| | `automatisering` | n8n/Zapier/Make-workflows, importeerbare n8n-JSON |
| | `planning` | Weekplanning, projectplannen, prioriteiten |
| | `hr` | Vacatures, selectie, onboarding, VA-briefings |
| Finance & juridisch | `finance` | Cashflow, marges, break-even, KPI's |
| | `juridisch` | Claims, voorwaarden, privacy, contracten (geen advocaat) |
| Strategie | `strateeg` | 90-dagenplan, bottleneck, keuzes, weekreview |
| | `marktonderzoek` | Concurrenten, doelgroep, voice of customer |
| | `data` | CSV/Excel-analyse, rapporten, grafieken |
| AI | `prompt-engineer` | Betere prompts, eigen skills bouwen |

Elk commando begint met `/business-os:`, bv. `/business-os:copywriter salespagina voor mijn workshop`. Je hoeft de commando's niet te onthouden: beschrijf je taak gewoon, dan kiest Claude zelf de juiste specialist.

## Waar alles staat

In de map waarin je Claude start:

```
business-os/
  bedrijf.md     # je bedrijfsprofiel (gedeeld geheugen)
  output/        # deliverables per afdeling: copy/, social/, offertes/, sops/, ...
```

## Ontwikkelen

```
claude plugin validate plugins/business-os
```

Een specialist is één bestand: `skills/<naam>/SKILL.md`. De lessen staan in `skills/masterclass/lessen/`.
