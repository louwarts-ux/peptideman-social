# Masterclass 7 – n8n + Claude: AI in je workflows

**Na deze les:** je workflows kunnen lezen, sorteren en schrijven – met jou als eindcontrole.

## Twee manieren om Claude in n8n te gebruiken

1. **AI-nodes:** een *Basic LLM Chain* of *AI Agent* node met een *Anthropic Chat Model* eraan. Credentials: je Anthropic API-sleutel (console.anthropic.com).
2. **HTTP Request** naar `https://api.anthropic.com/v1/messages` met headers `x-api-key`, `anthropic-version: 2023-06-01` en `content-type: application/json`. Meer controle, iets meer werk.

Kies een actueel model in de node; snel en goedkoop voor sorteren, het sterkste model voor schrijven.

## Drie workflows die direct tijd besparen

**1. Inbox-triage**
Gmail Trigger → Claude: "Label als: offerteaanvraag / support / factuur / spam / overig. Geef JSON: {label, urgentie 1-3, samenvatting}" → Gmail label toevoegen → bij urgentie 3: Slack.

**2. Leadkwalificatie**
Formulier → Claude scoort de lead tegen je ideale klant (plak die uit `bedrijf.md` in de prompt) → hoge score: taak in CRM + conceptmail; lage score: nurture-lijst.

**3. Concept-antwoorden**
Nieuwe supportmail → Claude schrijft een **concept** in jouw stem (met je FAQ in de prompt) → opgeslagen als Gmail-concept. Jij leest en klikt verzenden.

## Regels voor AI in automatisering

- **Laat Claude JSON teruggeven** en controleer het met een IF-node voordat je erop handelt.
- **Mens in de loop** voor alles wat naar klanten gaat, zeker in het begin.
- **Kosten bewaken:** stuur alleen de tekst die nodig is; zet een limiet in je Anthropic-console.
- **Privacy:** check welke persoonsgegevens naar welke dienst gaan (AVG) en vermeld het in je privacyverklaring.

## Met Business OS

```
/business-os:automatisering inbox-triage met AI-labels in n8n
```

## Opdracht

Bouw de inbox-triage en laat hem een week alleen labelen (niets versturen). Beoordeel daarna hoe vaak hij gelijk had.
