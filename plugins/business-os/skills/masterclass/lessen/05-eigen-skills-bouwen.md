# Masterclass 5 – Je eigen specialisten (skills) bouwen

**Na deze les:** je hebt je eerste eigen skill gemaakt voor een taak die je elke week doet.

## Wanneer een skill?

Als je een taak **vaker dan twee keer** doet op dezelfde manier: weekrapport, offerte voor een vast type klant, onboardingmail, productfoto-briefing, reviewreacties.

## Wat is een skill?

Een map met een `SKILL.md`-bestand:

```markdown
---
name: weekrapport
description: Maakt het wekelijkse omzet- en leadrapport uit de Shopify- en CRM-export. Gebruik bij "weekrapport", "cijfers van deze week".
---

# Weekrapport

1. Lees `business-os/bedrijf.md` voor de KPI's.
2. Lees de nieuwste exports in `exports/`.
3. Bereken met code: omzet, orders, gemiddelde orderwaarde, nieuwe leads, conversie; vergelijk met vorige week.
4. Lever: tabel + 3 inzichten + 1 actie. Sla op in `business-os/output/rapporten/<datum>.md`.

## Regels
- Altijd rekenen met code.
- Geen klantnamen in het rapport.
```

De **description** is het belangrijkste: daarop besluit Claude wanneer de skill gebruikt wordt. Zet er de woorden in die je zelf zegt.

## Snelste route

```
/business-os:prompt-engineer maak een skill voor mijn weekrapport
```

De prompt-engineer interviewt je en schrijft de skill.

## Waar opslaan

- `.claude/skills/<naam>/` in je bedrijfsmap – alleen dit project
- `~/.claude/skills/<naam>/` – overal

## Verbeteren

Gebruik de skill één keer echt. Wat ging mis? Zeg: "pas de skill weekrapport aan zodat …". Na 2–3 rondes doet hij het zonder bijsturen.

## Opdracht

Kies je meest terugkerende taak en bouw er een skill voor.
