// Inhoud van alle Facebook-beelden. Pas tekst hier aan en draai `node facebook/render/render.mjs`.
// Regels: geen genezings-, behandel- of garantieclaims, geen doseringen. Check bijschriften met /caption-check fb.

export const SITE = 'peptideman.nl'
export const KENNISBANK = 'peptideman.nl/kennisbank'

export const carrousels = [
  {
    id: '01-wat-zijn-peptides',
    thema: 'Basiskennis',
    slides: [
      { type: 'cover', kicker: 'Basiskennis', title: 'Wat zijn peptides eigenlijk?', sub: 'In 7 slides helder uitgelegd', seq: 'G-E-P-P-P-G-K' },
      { type: 'tekst', title: 'Korte ketens van aminozuren', body: 'Een peptide bestaat uit 2 tot ongeveer 50 aminozuren, aan elkaar gekoppeld via peptidebindingen. Is de keten langer, dan spreken we van een eiwit.', fact: '2–50 aminozuren' },
      { type: 'tekst', title: 'Je lichaam maakt ze zelf', body: 'Insuline, oxytocine en glucagon zijn peptiden die je lichaam elke dag gebruikt als signaalstof.', fact: 'Insuline = 51 aminozuren' },
      { type: 'tekst', title: 'Boodschapper, geen bouwsteen', body: 'Veel peptiden werken als sleutel op een slot: ze binden aan een receptor en zetten zo een proces in de cel aan of uit.', fact: 'Receptor → signaal → effect' },
      { type: 'tekst', title: 'Van lab tot apotheek', body: 'Wereldwijd zijn meer dan 80 peptidegeneesmiddelen toegelaten, van insuline tot de GLP-1-middelen van nu.', fact: '80+ toegelaten middelen' },
      { type: 'tekst', title: 'Niet elke peptide is gelijk', body: 'Een toegelaten geneesmiddel, een supplement en een "research chemical" verschillen enorm in controle, zuiverheid en onderbouwing.', fact: 'Status bepaalt alles' },
      { type: 'eind', title: 'Alles over peptides op één plek', sub: 'Zoek, filter en vergelijk in onze gratis kennisbank.' },
    ],
    caption: `Wat zijn peptides eigenlijk? 🔬

Korte ketens van aminozuren die in je lichaam als boodschapper werken. Insuline en oxytocine zijn bekende voorbeelden. In deze carrousel leggen we in 7 slides uit hoe het zit.

👉 Swipe door en sla op voor later.
📚 Meer weten? Alles staat in de kennisbank: peptideman.nl/kennisbank

Educatieve inhoud, geen medisch advies.

#peptides #wetenschap #kennisbank #gezondheid`,
  },
  {
    id: '02-geneesmiddel-of-supplement',
    thema: 'Regelgeving',
    slides: [
      { type: 'cover', kicker: 'Regelgeving NL/EU', title: 'Geneesmiddel, supplement of research chemical?', sub: 'Waarom het label zoveel uitmaakt', seq: 'H-A-E-G-T-F' },
      { type: 'categorie', label: 'Geneesmiddel', tone: 'ok', title: 'Getoetst en op recept', body: 'Beoordeeld door het EMA of CBG op werkzaamheid, veiligheid en kwaliteit. Alleen via arts en apotheek.', voorbeeld: 'Semaglutide, insuline' },
      { type: 'categorie', label: 'Supplement', tone: 'info', title: 'Voeding, geen medicijn', body: 'Valt onder de Warenwet. Geen toetsing vooraf op werkzaamheid. Gezondheidsclaims mogen alleen als de EU ze heeft goedgekeurd.', voorbeeld: 'Collageenpeptiden' },
      { type: 'categorie', label: 'Cosmetica', tone: 'info', title: 'Alleen voor op de huid', body: 'Valt onder de EU-cosmeticaverordening. Bedoeld voor uitwendig gebruik in crèmes en serums.', voorbeeld: 'GHK-Cu, Matrixyl' },
      { type: 'categorie', label: 'Research chemical', tone: 'warn', title: '"Niet voor menselijk gebruik"', body: 'Geen handelsvergunning. Zuiverheid, inhoud en veiligheid zijn niet gecontroleerd.', voorbeeld: 'BPC-157, TB-500' },
      { type: 'tekst', title: 'Sporter? Let op de dopinglijst', body: 'Het WADA verbiedt onder meer BPC-157, TB-500 en groeihormoon-secretagogen, ook buiten wedstrijden.', fact: 'Check altijd de WADA-lijst' },
      { type: 'eind', title: 'Per peptide de status zien?', sub: 'In de kennisbank staat bij elke peptide of hij toegelaten is.' },
    ],
    caption: `Geneesmiddel, supplement of research chemical? 🏷️

Dezelfde term "peptide" kan iets heel anders betekenen. Een geneesmiddel is getoetst door het EMA of CBG. Een supplement valt onder de Warenwet. Een research chemical is nergens op gecontroleerd.

Swipe voor de verschillen en voorbeelden.
📚 Per peptide de status: peptideman.nl/kennisbank

Educatieve inhoud, geen medisch advies.

#peptides #regelgeving #supplementen #kennisbank`,
  },
  {
    id: '03-studie-lezen',
    thema: 'Onderzoek',
    slides: [
      { type: 'cover', kicker: 'Onderzoek', title: 'Zo lees je een peptide-studie', sub: '5 vragen die je altijd stelt', seq: 'R-C-T' },
      { type: 'stap', n: 1, title: 'Mens, muis of petrischaal?', body: 'Veel claims rusten op dier- of celstudies. Interessant, maar het zegt nog weinig over mensen.' },
      { type: 'stap', n: 2, title: 'Hoeveel deelnemers?', body: 'Een studie met 12 mensen weegt veel minder zwaar dan een studie met 12.000 mensen.' },
      { type: 'stap', n: 3, title: 'Was er een controlegroep?', body: 'Gerandomiseerd en placebogecontroleerd onderzoek (RCT) is de gouden standaard.' },
      { type: 'stap', n: 4, title: 'Wie betaalde het onderzoek?', body: 'Kijk naar financiering en belangenverstrengeling. Dat staat onderaan elke publicatie.' },
      { type: 'stap', n: 5, title: 'Is het herhaald?', body: 'Eén studie is een begin. Systematische reviews en meta-analyses geven het complete beeld.' },
      { type: 'eind', title: 'Bewijsniveau per peptide', sub: 'De kennisbank geeft elke peptide een label: sterk, matig of beperkt.' },
    ],
    caption: `Zo lees je een peptide-studie 📄

Online zie je veel claims met "onderzoek toont aan". Met deze 5 vragen zie je snel hoe sterk dat bewijs echt is.

Sla deze carrousel op en gebruik hem als checklist.
📚 Bewijsniveau per peptide: peptideman.nl/kennisbank

#peptides #onderzoek #wetenschap #kritischlezen`,
  },
  {
    id: '04-vijf-uitgelicht',
    thema: 'Peptide A–Z',
    slides: [
      { type: 'cover', kicker: 'Peptide A–Z', title: '5 peptides uitgelicht', sub: 'Van toegelaten middel tot labstof', seq: 'G-H-K' },
      { type: 'profiel', naam: 'Semaglutide', klasse: 'GLP-1-agonist', status: 'Geneesmiddel (recept)', tone: 'ok', bewijs: 'Sterk', body: 'Bootst het darmhormoon GLP-1 na. Toegelaten in de EU bij diabetes type 2 en obesitas, met grote klinische studies.', lengte: '31 aminozuren' },
      { type: 'profiel', naam: 'Tirzepatide', klasse: 'GIP/GLP-1-agonist', status: 'Geneesmiddel (recept)', tone: 'ok', bewijs: 'Sterk', body: 'Werkt op twee darmhormoonreceptoren tegelijk. Toegelaten in de EU bij diabetes type 2 en voor gewichtsbeheersing.', lengte: '39 aminozuren' },
      { type: 'profiel', naam: 'Collageenpeptiden', klasse: 'Gehydrolyseerd collageen', status: 'Supplement', tone: 'info', bewijs: 'Matig', body: 'Kleine stukjes collageen uit voeding. Er zijn studies naar huid en gewrichten, met wisselende uitkomsten.', lengte: 'Mengsel' },
      { type: 'profiel', naam: 'GHK-Cu', klasse: 'Koperpeptide', status: 'Cosmetica', tone: 'info', bewijs: 'Beperkt', body: 'Tripeptide met koper, veel gebruikt in huidverzorging. Vooral lab- en kleine huidstudies.', lengte: '3 aminozuren' },
      { type: 'profiel', naam: 'BPC-157', klasse: 'Synthetisch maagpeptide', status: 'Niet toegelaten', tone: 'warn', bewijs: 'Beperkt', body: 'Populair online, maar vrijwel alleen onderzocht bij dieren. Geen handelsvergunning en op de WADA-dopinglijst.', lengte: '15 aminozuren' },
      { type: 'eind', title: '20+ peptides in de kennisbank', sub: 'Zoek op naam, filter op status en vergelijk ze naast elkaar.' },
    ],
    caption: `5 peptides uitgelicht 🧬

Van toegelaten geneesmiddel tot stof die alleen bij muizen is onderzocht. Per peptide zie je de status en hoe sterk het bewijs is.

Welke peptide moeten we hierna uitlichten? Laat het weten in de reacties 👇
📚 Alle peptides vergelijken: peptideman.nl/kennisbank

Educatieve inhoud, geen medisch advies.

#peptides #semaglutide #collageen #kennisbank`,
  },
  {
    id: '05-tech-snufjes',
    thema: 'Tech & tools',
    slides: [
      { type: 'cover', kicker: 'Tech & tools', title: 'De nieuwste snufjes rond peptide-onderzoek', sub: 'Van sensor tot slimme pen', seq: '0-1-0-1' },
      { type: 'tech', label: 'Sensor', title: 'Continue glucosemeter (CGM)', body: 'Een kleine sensor op de arm meet dag en nacht je glucose en stuurt het naar je telefoon. Veel gebruikt in GLP-1-onderzoek.', icon: 'cgm' },
      { type: 'tech', label: 'Wearable', title: 'Smart ring en smartwatch', body: 'Meten slaap, hartslagvariabiliteit en temperatuur. Handig om trends te zien, maar geen diagnose.', icon: 'ring' },
      { type: 'tech', label: 'Slimme pen', title: 'Connected injectiepen', body: 'Registreert tijdstip en hoeveelheid en koppelt met een app. Al in gebruik bij insuline.', icon: 'pen' },
      { type: 'tech', label: 'AI', title: 'AI-zoektools voor studies', body: 'Vinden en vatten wetenschappelijke artikelen samen. Lees de bron altijd zelf na.', icon: 'ai' },
      { type: 'tech', label: 'Thuistest', title: 'Bloedtest via de app', body: 'Vingerprik thuis, uitslag in een app. Bespreek de uitkomst altijd met een arts.', icon: 'lab' },
      { type: 'eind', title: 'Meer tech & tools', sub: 'In de kennisbank vind je de tech-gids met uitleg per apparaat.' },
    ],
    caption: `De nieuwste snufjes rond peptide-onderzoek 📲

Continue glucosemeters, smart rings, slimme injectiepennen en AI die studies voor je zoekt. Wat kunnen ze, en waar liggen de grenzen?

Welke gadget gebruik jij al? 👇
📚 Tech-gids: peptideman.nl/kennisbank

#peptides #wearables #healthtech #kennisbank`,
  },
]

// Losse beelden: profielfoto, omslagfoto en het vastgezette welkomstbericht
export const welkom = {
  caption: `Welkom bij Peptideman 👋

Wij maken peptides begrijpelijk. Onafhankelijk, met bronnen en zonder hype.

📚 Kennisbank met 20+ peptides: status, bewijs en bronnen
🖼️ Elke week een nieuwe carrousel
📲 De nieuwste tech rond onderzoek en gezondheid

Start hier: peptideman.nl/kennisbank
Vragen? Stuur ons een bericht.

Educatieve inhoud, geen medisch advies.`,
}
