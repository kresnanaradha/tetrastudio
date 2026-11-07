// Langkah terakhir build (setelah "vite build" dan "vite build --ssr"). Tanpa dependency tambahan.
// 1. Menyisipkan HTML hasil render React ke client/dist/index.html (PRD Bagian 10, prerender).
// 2. Menyisipkan data terstruktur FAQPage dari isi FAQ di site.ts.
// 3. Mengganti __SITE_URL__ dan __LASTMOD__ di index.html, robots.txt, dan sitemap.xml
//    dengan domain dari site.ts (brand.url), jadi domain cukup diubah di satu tempat.
import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const client = join(import.meta.dirname, '..', 'client')
const dist = join(client, 'dist')
const ssrDir = join(client, 'dist-ssr')

const { render, siteUrl, faqJsonLd } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href)
const lastmod = new Date().toISOString().slice(0, 10)
const fill = (text) => text.replaceAll('__SITE_URL__', siteUrl.replace(/\/$/, '')).replaceAll('__LASTMOD__', lastmod)

const htmlPath = join(dist, 'index.html')
let html = readFileSync(htmlPath, 'utf8')
for (const marker of ['<div id="root"></div>', '<!-- FAQ_JSONLD -->']) {
  if (!html.includes(marker)) throw new Error(`Penanda ${marker} tidak ditemukan di ${htmlPath}`)
}
html = html
  .replace('<div id="root"></div>', `<div id="root">${render()}</div>`)
  .replace('<!-- FAQ_JSONLD -->', `<script type="application/ld+json">${faqJsonLd()}</script>`)
writeFileSync(htmlPath, fill(html))

for (const file of ['robots.txt', 'sitemap.xml']) {
  const path = join(dist, file)
  writeFileSync(path, fill(readFileSync(path, 'utf8')))
}

rmSync(ssrDir, { recursive: true, force: true })
console.log(`Prerender selesai untuk ${siteUrl}`)
