---
name: sessie-opslaan
description: Legt de stand van een lange PeptideMan-sessie vast in geheugen/sessies/, zodat een volgende sessie verder kan. Gebruik aan het eind van een sessie of bij "/sessie-opslaan", "sla op waar we zijn".
---

# Sessie opslaan

Schrijf `geheugen/sessies/<jjjj-mm-dd>-<onderwerp>.md`, kort (maximaal 25 regels):

- **Doel**: wat we wilden.
- **Gedaan**: bestanden met pad, en wat er in Metricool is klaargezet.
- **Open**: wat nog moet, met de volgende concrete stap. Gebruik `node scripts/pm.js status`.
- **Besluiten**: wat David besliste, met reden.
- **Let op**: wat misging of tegenviel.

Geen transcript, geen herhaling van de kennis. De sessie-start-hook toont het nieuwste bestand bij de volgende start. Draai daarna `/leren` als er lessen in zitten.
