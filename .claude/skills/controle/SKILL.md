---
name: controle
description: Eindcontrole van de PeptideMan-repo en de posts: regels, beelden, hooks en veiligheid, met bewijs. Gebruik voor het inplannen of afronden, of bij "controleer alles", "/controle".
---

# Controle

Draai en lees elke uitkomst; niet aannemen.

1. `node scripts/pm.js doctor`: is alles aanwezig en aangesloten.
2. `node scripts/pm.js check`: elke post tegen de regels.
3. `node scripts/pm.js shield`: agents, hooks, geheimen.
4. `npm test`: regels en hooks.
5. Voor elke post met volgende stap "inplannen": bestaat de PNG en opent de `beeld-url` (status 200)?

Meld per stap ✓ of ✗ met de letterlijke fout. Herstel alleen wat zonder twijfel is (een ontbrekend veld, een verkeerd pad); al het andere leg je voor. Rond nooit af met "alles in orde" als een stap niet gedraaid is.
