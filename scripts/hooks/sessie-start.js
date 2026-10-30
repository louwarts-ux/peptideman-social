#!/usr/bin/env node
// SessionStart: geeft Claude bij de start de stand van zaken mee (posts, laatste analyse,
// vorige sessie, sterke lessen), zodat niemand dat elke keer opnieuw hoeft uit te leggen.
const { status } = require('../pm')

try {
  console.log(`# Stand van PeptideMan bij de start van deze sessie\n\n${status()}`)
} catch (e) {
  // Een kapotte status mag een sessie nooit tegenhouden
  console.log(`Status kon niet geladen worden: ${e.message}`)
}
