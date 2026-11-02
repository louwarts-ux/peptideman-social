# Design-effecten (naslag)

Vier gratis open-source repo's voor opvallende visuele effecten, voor beelden, video en de website.
Bron: gids van Cindy Zhu, opgeslagen op 2-11-2026. Niets hiervan is geïnstalleerd; dit is naslag.

## Werkwijze met Claude Code
1. Geef de GitHub-link en laat Claude eerst de README lezen.
2. Zeg waar het effect komt (hero-achtergrond, menubalk, logo), geef de merkkleuren in hex en zeg hoe subtiel het moet zijn. Wees concreet: "langzaam, zacht, crème naar warm oranje" werkt beter dan "maak het mooi".
3. Zeg waarmee de site of het beeld gebouwd is: gewone HTML, React of Next.js.
4. Laat Claude het installeren, lokaal tonen en daarna bijsturen in woorden: "langzamer", "minder korrel", "alleen achter de hero".

## De vier repo's

| Repo | Wat | Vraagt | Past bij deze repo (`render.js`, gewone HTML) |
|---|---|---|---|
| [Liquid Glass JS](https://github.com/dashersw/liquid-glass-js) | Matglas-panelen met echte breking en blur (Apple-stijl), klassen `Container` en `Button` | Gewone JS, geen build-stap | Ja, het best. Werkt direct in `posts/media/*.html` |
| [ShaderGradient](https://github.com/ruucm/shadergradient) | Zacht bewegend 3D-kleurverloop als achtergrond | React + `three` + `@react-three/fiber`; ook Framer- en Figma-plugin | Half: neem de kleuren uit de demo over als CSS-verloop voor stilstaande beelden |
| [Liquid Logo](https://github.com/paper-design/liquid-logo) | Logo (transparante PNG) wordt bewegend vloeibaar metaal | Hosted demo op liquid.paper.design, of de repo (`@paper-design/shaders-react`) | Als losse loop voor TikTok, via de hosted demo |
| [React Three Fiber](https://github.com/pmndrs/react-three-fiber) | Echte interactieve 3D (objecten, logo in 3D, deeltjes), met `@react-three/drei` | React-project; steilste leercurve | Nee, te zwaar voor een screenshot. Wel voor de website |

## Startprompts (invullen en aanpassen)

**Liquid Glass JS**
> Lees https://github.com/dashersw/liquid-glass-js. Mijn pagina is gewone HTML. Maak van [onderdeel, bijv. het tekstkader] een liquid-glass-paneel met de Container-klasse, zodat de achtergrond er met breking doorheen schijnt. Zorg dat de tekst erop goed leesbaar blijft. Laat het resultaat zien zodat we de blur kunnen bijstellen.

**ShaderGradient**
> Lees https://github.com/ruucm/shadergradient. Mijn site is [React / Next.js]. Ik wil een langzaam, subtiel bewegend verloop achter alleen de hero, in [hex-kleuren], met lichte korrel. Installeer `@shadergradient/react`, `@react-three/fiber` en `three` en draai het lokaal.

**Liquid Logo**
> Gebruik https://github.com/paper-design/liquid-logo of de hosted demo op liquid.paper.design. Hier is het logo als transparante PNG. Stel kleur, breking en snelheid af op [merkkleur] en exporteer een korte loop voor site en social.

**React Three Fiber**
> Lees https://github.com/pmndrs/react-three-fiber. Mijn site is React. Ik wil één rustig 3D-moment in de hero: een langzaam draaiende vorm (of het logo in 3D) in [hex] die licht op de muis reageert. Installeer `@react-three/fiber`, `three` en `@react-three/drei`, houd het licht en pauzeer de animatie als het tabblad niet zichtbaar is.

## Let op
- **Eén effect per pagina of beeld.** Ze draaien zware graphics op het apparaat van de bezoeker; stapelen maakt de pagina traag en trekt de telefoonaccu leeg. Test op een echte telefoon en vraag om een `prefers-reduced-motion`-terugval.
- **Rust werkt beter dan veel effect.** Eén mooi bewegend element op een kalme pagina. Bij PeptideMan haalde een foto met één sterke uitspraak 41.942 weergaven (zie `geheugen/lessen.md`).
- **Screenshots bevriezen beweging.** `scripts/render.js` maakt een PNG; voor bewegende effecten is een video-opname nodig.
- **Downloads zijn onbetrouwbaar.** Clone een repo in de scratchpad en lees de install-scripts voor je iets draait. De regels in `kennis/peptideman.md` gaan altijd voor.
