# Masterclass 6 – n8n: automatiseren zonder te programmeren

**Na deze les:** je begrijpt hoe een n8n-workflow werkt en hebt er één draaien.

## Wat is n8n?

Een tool die apps aan elkaar koppelt: "als X gebeurt, doe Y en Z". Vergelijkbaar met Zapier en Make, maar je kunt het zelf hosten en je betaalt niet per stap. Start met n8n Cloud of draai het zelf (Docker).

## De bouwstenen

| Onderdeel | Uitleg | Voorbeeld |
|---|---|---|
| Trigger | Wat start de workflow | Formulier ingevuld, elke maandag 9:00, webhook |
| Node | Eén stap | Rij toevoegen in Google Sheets, mail sturen |
| Connection | De lijn tussen nodes | Data stroomt van links naar rechts |
| Expression | Data uit een vorige stap gebruiken | `{{ $json.email }}` |
| Credentials | Je inlog bij een app | Eén keer koppelen, daarna hergebruiken |
| IF / Switch | Keuzes | Als bedrag > €500 → Slack-melding |

## Eerste workflow: leadformulier → Sheet → welkomstmail → melding

1. **Trigger:** Form Trigger (of Webhook als je eigen formulier hebt).
2. **Google Sheets:** Append Row – naam, e-mail, bericht, datum.
3. **Gmail:** Send – welkomstmail met `{{ $json.naam }}`.
4. **Slack/Telegram:** "Nieuwe lead: …".
5. Test met "Execute workflow", dan **Activate**.

## Met Business OS

```
/business-os:automatisering nieuwe leads uit mijn formulier in een sheet en een welkomstmail sturen
```

Je krijgt eerst het ontwerp in woorden, na akkoord een workflow-JSON in `business-os/output/automatisering/`. In n8n: **Workflows → Import from File**, credentials koppelen, testen.

## Goede gewoontes

- Bouw klein, test elke node apart (pin testdata).
- Geef nodes een naam die zegt wat ze doen.
- Voeg een Error Workflow toe die je een melding stuurt als iets faalt.
- Pas op voor dubbele runs: check of een lead al bestaat.

## Opdracht

Bouw de leadworkflow hierboven, of laat de automatiseringsspecialist hem voor je maken en importeer hem.
