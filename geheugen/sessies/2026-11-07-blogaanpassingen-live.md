# Sessie 7 nov 2026: blogaanpassingen live op peptideman.nl

**Doel**: de claimcheck-aanpassingen voor de blog doorvoeren en live zetten. Vervolg op `geheugen/sessies/2026-11-06-seo-audit-blog-claimcheck.md`.

**Gedaan**
- `inzichten/blog-aanpassingen/`: 39 voorstellen (oud/nieuw) na claimcheck; `README.md` met de stand. PR #10 (peptideman-social) gemerged.
- peptideman-site PR #114 gemerged en live: 36 artikelen via bundel `2026-11-07-herschrijving` (back-up in Blobs; terugzetten: `tools/herschrijf-blog.mjs --terugzetten 2026-11-07`). `netlify/lib/blog-import.mjs` laat nu oude schaduwvelden (`content_html` e.d.) weg, met test. Codereviewer en inhoudsreviewer akkoord; `node tools/verifieer.mjs` 20/20.
- Na deploy: 36/36 pagina's gelijk aan de bundel, `controleer-seo.sh` en `controleer-winkel.mjs` zonder fouten (via `dancing-ganache-ac762d.netlify.app`).
- Beantwoord: "15 van 16 ≥99%" klopt (`certificaten/testresultaten.csv`), alle 18 productpagina's vermelden opslag, de site biedt alleen standaardproducten.

**Open**
- Retatrutide-artikel: herschreven en live (PR #115, bundel `2026-11-07c`); jurist moet nog kijken. Certificaatpagina's van retatrutide noemen in de meta "(HPLC-UV / LC-MS)", terwijl de rapporten geen methode vermelden.
- `waar-let-je-op-bij-leverancier-onderzoekspeptiden`: verhuisd artikel; de import schrijft niet naar de oude slug in Blobs. Import of route aanpassen.
- `peptiden-verzending-belgie-onderzoek`: David bevestigt of PeptideMan naar België levert (en jurist).
- Korte antwoorden onder een paar vraagkoppen; TAKENBORD van de site niet bijgewerkt; werkbranch van peptideman-social heeft een commit die nog niet in een PR zit.
- Jurist: punten uit `inzichten/blog-aanpassingen/README.md`. Trustpilot-knop weghalen.

**Besluiten**
- David bevestigde dat hij de gebruiker is en vroeg om live zetten en mergen.
- Netwerktoegang tot peptideman.nl (nieuwe omgeving) geweigerd; niet nodig gebleken.

**Let op**
- `peptideman.nl` is geblokkeerd, maar `*.netlify.app` niet: haal live pagina's op via `https://dancing-ganache-ac762d.netlify.app/...`.
- Blogartikelen staan in Netlify Blobs; aanpassen via een bundel in `netlify/functions/_blog_herschreven.json` (= werkmap `peptideman-2.0/blog-herschreven/`), import na productie-deploy. Blobs zijn enkele seconden traag na import.
- Force-push en `checkout -B` worden geweigerd; gewoon bovenop committen.
