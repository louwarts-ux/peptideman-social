---
name: os
description: De centrale ingang van Business OS. Toont alle specialisten en stuurt een taak naar de juiste specialist(en), of knipt een groter doel op in stappen per specialist. Gebruik bij "/business-os:os", "wat kan Business OS", "welke specialist", of een bedrijfstaak waarvan niet meteen duidelijk is wie hem moet doen.
argument-hint: "[taak of doel]"
---

# Business OS – router

## Zonder taak: toon het menu

Toon deze tabel en vraag wat er vandaag gedaan moet worden.

| Afdeling | Specialist | Commando | Voor |
|---|---|---|---|
| Marketing | Copywriter | `/business-os:copywriter` | Salespagina's, ads, productteksten, hooks |
| | Social media | `/business-os:social-media` | Contentkalender, posts per platform, repurposing |
| | E-mailmarketing | `/business-os:email-marketing` | Welkomstreeksen, nieuwsbrieven, lanceringsmails |
| | SEO | `/business-os:seo` | Zoekwoorden, blogstructuur, on-page check |
| | Advertenties | `/business-os:ads` | Meta/Google-campagnes, varianten, testplan |
| | Merk | `/business-os:merk` | Positionering, tone of voice, boodschap |
| Sales | Aanbod | `/business-os:aanbod` | Offer bouwen, prijzen, bonussen, garantie |
| | Salescoach | `/business-os:sales` | Belscripts, bezwaren, follow-ups, DM's |
| | Offertes | `/business-os:offerte` | Offertes en voorstellen |
| Klant | Klantenservice | `/business-os:klantenservice` | Antwoorden, FAQ, klachten, templates |
| Operations | Operations | `/business-os:operations` | SOP's, processen, checklists |
| | Automatisering | `/business-os:automatisering` | n8n/Zapier/Make-workflows ontwerpen |
| | Projectmanager | `/business-os:planning` | Weekplanning, projecten, prioriteiten |
| | HR & werving | `/business-os:hr` | Vacatures, sollicitatievragen, onboarding |
| Finance & juridisch | Financieel analist | `/business-os:finance` | Cashflow, marges, prijsberekening, KPI's |
| | Juridische check | `/business-os:juridisch` | Voorwaarden, privacy, claims checken |
| Strategie | Strateeg | `/business-os:strateeg` | 90-dagenplan, keuzes, weekreview |
| | Marktonderzoek | `/business-os:marktonderzoek` | Concurrenten, doelgroep, reviews analyseren |
| | Data-analist | `/business-os:data` | CSV/Excel analyseren, rapporten |
| AI | Prompt-engineer | `/business-os:prompt-engineer` | Prompts en nieuwe eigen skills bouwen |

Bestaat `business-os/bedrijf.md` nog niet? Zeg dat eerst en raad `/business-os:start` aan (duurt ~5 minuten).

## Met taak: routeer

1. Lees `business-os/bedrijf.md` als het bestaat.
2. **Eén specialist past?** Noem in één regel wie het doet en waarom, en voer de taak meteen uit volgens die skill (laad de skill via de Skill-tool als die beschikbaar is).
3. **Groter doel** (bv. "lanceer mijn nieuwe cursus", "meer klanten in december")? Maak een plan van 3–7 stappen in een tabel: stap · specialist · deliverable · volgorde. Vraag welke stap eerst, of begin bij stap 1 als de ondernemer "doe maar" zegt. Geef de output van elke stap door aan de volgende.
4. Past geen specialist? Doe de taak gewoon goed, en noem dat `/business-os:prompt-engineer` er een eigen specialist van kan maken als het vaker terugkomt.
