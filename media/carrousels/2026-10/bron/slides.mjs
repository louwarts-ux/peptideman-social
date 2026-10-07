// Inhoud van de vijf carrousels. Teksten komen uit de bestaande bijschriften in Metricool.
// \n = vaste regelafbreking in een omslagtitel, ­ = zacht afbreekstreepje in een lang woord.
export const carousels = [
  {
    id: '2026-10-08-mots-c-studie',
    slides: [
      { type: 'cover', title: 'Iedereen noemt\ndeze studie.\nBijna niemand\nheeft hem gelezen.', sub: 'MOTS-c in Cell Metabolism, 2015' },
      { type: 'point', label: 'Wat is onderzocht', text: 'De rol van MOTS-c bij de stofwisseling.', support: 'MOTS-c is een peptide dat gecodeerd is in mitochondriaal DNA.' },
      { type: 'point', label: 'Bij wie', text: 'Muizen en celkweken.', support: 'Niet bij mensen.' },
      { type: 'pair',
        a: { label: 'Wat het laat zien', text: 'Een mogelijke rol in metabole regulatie, in die modellen.' },
        b: { label: 'Wat het níet laat zien', text: 'Of dit ook bij mensen zo werkt.' } },
      { type: 'close', text: 'Een belangrijke studie, maar een startpunt.', support: 'Geen eindconclusie.', source: 'Bron: Lee e.a., Cell Metabolism, 2015' },
    ],
  },
  {
    id: '2026-10-10-studie-lezen',
    slides: [
      { type: 'cover', title: 'Een studie lezen\nin 60 seconden.', sub: 'Vier vragen die je bij elke samenvatting kunt stellen.' },
      { type: 'step', n: '1', text: 'Bij wie?', support: 'Mensen, dieren of cellen in een schaaltje?' },
      { type: 'step', n: '2', text: 'Hoeveel?', support: '10 deelnemers of 1.000? Hoe kleiner, hoe voorzichtiger.' },
      { type: 'step', n: '3', text: 'Vergeleken met wat?', support: 'Was er een controlegroep of placebo?' },
      { type: 'step', n: '4', text: 'Wie?', support: 'Is het onafhankelijk herhaald door andere onderzoekers?', note: 'Bewaar dit voor de volgende keer dat iemand zegt: “Het is bewezen.”' },
    ],
  },
  {
    id: '2026-10-16-tb-500-open-vragen',
    slides: [
      { type: 'cover', title: 'Dit weten\nonderzoekers nog\nníet over TB-500.', sub: 'TB-500 is een fragment van Thymosin Beta-4. Drie vragen staan nog open.' },
      { type: 'point', label: 'Open vraag 1', text: 'Vertalen de resultaten uit dier- en celstudies zich naar mensen?' },
      { type: 'point', label: 'Open vraag 2', text: 'Wat zijn de effecten op de lange termijn?' },
      { type: 'point', label: 'Open vraag 3', text: 'Gedraagt het synthetische fragment zich hetzelfde als het volledige lichaamseigen eiwit?' },
      { type: 'close', text: 'Gecontroleerd onderzoek bij mensen is nog beperkt.', support: 'Wie dat verzwijgt, vertelt maar de helft van het verhaal.', cta: true },
    ],
  },
  {
    id: '2026-10-20-rode-vlaggen',
    slides: [
      { type: 'cover', title: '5 rode vlaggen', tail: 'bij een peptidewinkel.' },
      { type: 'flag', n: 1, text: 'Geen testrapport per batch.', support: 'Of alleen één algemeen rapport voor alles.' },
      { type: 'flag', n: 2, text: 'Geen bedrijfsadres of KvK-nummer op de site.' },
      { type: 'flag', n: 3, text: 'Beloftes over resultaten, gezondheid of “bewezen effecten”.' },
      { type: 'flag', n: 4, text: 'Prijzen die veel lager zijn dan overal anders.' },
      { type: 'flag', n: 5, text: 'Advies over hoeveel je zou moeten gebruiken.' },
      { type: 'close', text: 'Zie je er één? Wees kritisch.', text2: 'Zie je er meerdere? Bestel daar niet.', support: 'Bewaar en deel met iemand die dit moet weten.' },
    ],
  },
  {
    id: '2026-10-22-ghk-cu',
    slides: [
      { type: 'cover', title: 'Kleine studie,\ngrote koppen.', sub: 'Wat klopt er over GHK-Cu?' },
      { type: 'point', label: 'In het lab', text: 'Veel onderzoek is gedaan in celkweken en bij dieren.' },
      { type: 'point', label: 'Bij mensen', text: 'Vooral kleinere studies met huidverzorgings­producten, op de huid aangebracht.' },
      { type: 'point', label: 'Wat ontbreekt', text: 'Grote, gecontroleerde studies naar andere toepassingen.' },
      { type: 'close', text: 'Interessant onderzoeks­materiaal, vooral in de huidwetenschap.', support: 'Maar veel online claims gaan verder dan het bewijs.', cta: true },
    ],
  },
];
