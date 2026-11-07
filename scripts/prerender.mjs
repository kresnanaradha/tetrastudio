// Menyisipkan HTML hasil render React ke client/dist/index.html (PRD Bagian 10, prerender).
// Dijalankan setelah "vite build" dan "vite build --ssr". Tanpa dependency tambahan.
import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const client = join(import.meta.dirname, '..', 'client')
const ssrDir = join(client, 'dist-ssr')
const htmlPath = join(client, 'dist', 'index.html')

const { render } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href)
const html = readFileSync(htmlPath, 'utf8')
const marker = '<div id="root"></div>'
if (!html.includes(marker)) throw new Error(`Penanda ${marker} tidak ditemukan di ${htmlPath}`)

writeFileSync(htmlPath, html.replace(marker, `<div id="root">${render()}</div>`))
rmSync(ssrDir, { recursive: true, force: true })
console.log('Prerender selesai: client/dist/index.html')
