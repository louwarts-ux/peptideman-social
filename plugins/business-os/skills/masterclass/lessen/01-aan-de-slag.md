# Masterclass 1 – Aan de slag met Business OS

**Na deze les:** Business OS draait, je bedrijfsprofiel staat, en je hebt je eerste drie taken gedaan.

## 1. Installeren

In een Claude Code-sessie in de terminal:

```
/plugin install business-os --marketplace louwarts-ux/peptideman-social
```

Antwoord `y` om de marketplace toe te voegen en kies een scope ("user" = overal beschikbaar).

## 2. Een werkmap maken

Business OS bewaart alles in de map waarin je Claude start. Maak één vaste map voor je bedrijf:

```
mkdir ~/mijn-bedrijf && cd ~/mijn-bedrijf && claude
```

Zet hier ook bestanden neer die Claude mag gebruiken: prijslijst, website-teksten, exports.

## 3. Onboarding (5 minuten)

```
/business-os:start
```

Claude stelt je vier korte rondes vragen en schrijft `business-os/bedrijf.md`. Dit is het geheugen van al je specialisten. Lees het na en verbeter wat niet klopt – je mag het gewoon zelf bewerken.

## 4. Je eerste drie taken

1. `/business-os:os` – bekijk het menu.
2. `/business-os:strateeg wat is mijn bottleneck?` – één focuspunt voor dit kwartaal.
3. `/business-os:os <iets wat al weken op je lijst staat>` – laat de router de juiste specialist kiezen.

## Hoe het werkt

- **Eén profiel, twintig specialisten.** Elke specialist leest eerst je profiel, dus je hoeft niet steeds uit te leggen wie je klant is.
- **Output in `business-os/output/`**, per afdeling een map.
- **Het profiel groeit.** Als je iets blijvends besluit, stelt de specialist voor het onder "Beslissingen & lessen" te zetten.

## Opdracht

Doe de onboarding en laat de copywriter je homepagekop herschrijven. Vergelijk de drie varianten met je huidige kop.
