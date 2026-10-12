// Zet de kennisbank in de website-repo: `node kennisbank/bouw.mjs [pad-naar-peptideman-site]`
// Neemt header en footer over uit over.html van de site, zodat de pagina altijd het actuele menu heeft.
import { readFileSync, writeFileSync, copyFileSync, mkdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const site = resolve(process.argv[2] ?? join(here, '..', '..', 'peptideman-site'))
const bron = readFileSync(join(site, 'over.html'), 'utf8')

const header = bron.slice(bron.indexOf('<body>') + '<body>\n'.length, bron.indexOf('<main id="main">')).replace(' aria-current="page"', '')
const footer = bron.slice(bron.indexOf('<footer class="site-footer">'), bron.indexOf('<script src="/assets/payment-config.js'))
const scripts = bron.slice(bron.indexOf('<script src="/assets/payment-config.js'), bron.indexOf('</body>'))
if (!header.includes('site-header') || !footer.includes('site-footer')) throw new Error('Header of footer niet gevonden in over.html')

const pagina = readFileSync(join(here, 'pagina.html'), 'utf8')
  .replace('{{HEADER}}', header)
  .replace('{{FOOTER}}', footer + scripts)

const doel = join(site, 'kennisbank')
mkdirSync(doel, { recursive: true })
writeFileSync(join(doel, 'index.html'), pagina)
copyFileSync(join(here, 'data.js'), join(doel, 'data.js'))
copyFileSync(join(here, '..', 'facebook', 'beelden', 'kennisbank-og.png'), join(doel, 'og.png'))
console.log(`✓ kennisbank geschreven naar ${doel}`)
