# Lanceringspost 12 oktober 2026

Afbeelding en tekst voor de Instagram- en Facebook-post over de opening van peptideman.nl,
in dezelfde stijl als de carrousels van de Peptideman Bibliotheek.

| Bestand | Inhoud |
|---|---|
| `we-zijn-open.jpg` | De afbeelding bij de post (1080 × 1350 px, JPEG) |
| `bijschrift.txt` | De tekst van de post |
| `bron/lancering.html` | Het ontwerp van de afbeelding |
| `bron/build.py` | Maakt van het ontwerp de afbeelding |

De geplande post in Metricool haalt de afbeelding op via de openbare link naar `we-zijn-open.jpg`.

De afbeelding opnieuw maken, bijvoorbeeld na een tekstwijziging in `bron/lancering.html`:

```
python3 bron/build.py bron/lancering.html we-zijn-open.jpg
```

Daarvoor is Python nodig met Playwright (Chromium) en Pillow, plus het lettertype Poppins.
