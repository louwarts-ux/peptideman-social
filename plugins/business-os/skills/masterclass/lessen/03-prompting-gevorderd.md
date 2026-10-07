# Masterclass 3 – Prompting voor gevorderden

**Na deze les:** je laat Claude complexe taken in stappen doen en je hergebruikt je beste prompts.

## 1. Opknippen in stappen (ketens)

Grote taken worden beter als je ze opdeelt, en elke stap controleert:

1. "Analyseer deze 40 reviews: thema's met citaten." → check
2. "Maak op basis daarvan 5 invalshoeken voor een salespagina." → kies er één
3. "Schrijf de salespagina vanuit invalshoek 3."

In Business OS: `/business-os:os lanceer mijn cursus` maakt die keten voor je, met per stap een specialist.

## 2. Structuur met tags

Bij lange input: markeer wat wat is.

```
<aanbod> … </aanbod>
<reviews> … </reviews>
Schrijf een advertentie op basis van <aanbod>, in de woorden uit <reviews>.
```

## 3. Laat Claude eerst denken

"Denk eerst na over wie de lezer is en wat ze tegenhoudt, en schrijf daarna." Bij analyses: "Toon je redenering, dan je conclusie."

## 4. Kritiek en verbetering

"Beoordeel je eigen tekst als een sceptische klant. Wat overtuigt niet? Herschrijf daarna." Of: "Geef 3 totaal verschillende varianten" in plaats van één.

## 5. Voorbeelden kiezen

Eén voorbeeld = Claude kopieert het. Twee of drie verschillende voorbeelden = Claude pakt het patroon. Geef aan wat het gemeenschappelijke is.

## 6. Valkuilen

- Tegenstrijdige instructies ("kort" en "volledig") → kies.
- Alleen verboden ("niet saai") → zeg wat je wél wilt.
- Feiten laten verzinnen → geef de feiten zelf, of laat placeholders gebruiken.

## 7. Herbruikbaar maken

Een prompt die je drie keer gebruikt hebt, wordt een skill. Zie masterclass 5.

## Opdracht

Doe één echte marketingtaak als keten van 3 stappen en vergelijk met een one-shot prompt.
