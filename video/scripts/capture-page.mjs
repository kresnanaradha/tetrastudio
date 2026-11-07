// Mengambil aset untuk video dari website live lewat Chrome DevTools Protocol (Node bawaan, tanpa dependency):
// - public/page-*.png : potongan halaman versi HP (390px, 2x), tanpa navbar dan tombol WhatsApp melayang
// - public/navbar.png : navbar, ditempel tetap di atas layar HP saat video
// - src/page.json     : tinggi halaman, daftar potongan, dan posisi tiap bagian untuk berhenti saat scroll
// Pemakaian: node scripts/capture-page.mjs [url]
import { spawn } from 'node:child_process'
import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

const url = process.argv[2] ?? 'https://tetra.naradh.my.id/'
const root = join(import.meta.dirname, '..')
const pub = join(root, 'public')
mkdirSync(pub, { recursive: true })

const W = 390
const H = 844
const NAV = 64
const profile = join(tmpdir(), `tetra-capture-${Date.now()}`)
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--remote-debugging-port=9334',
  `--user-data-dir=${profile}`, 'about:blank',
], { stdio: 'ignore' })

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
let target
for (let i = 0; i < 50 && !target; i++) {
  await sleep(200)
  try {
    target = (await (await fetch('http://127.0.0.1:9334/json/list')).json()).find((t) => t.type === 'page')
  } catch {}
}
if (!target) throw new Error('Chrome DevTools tidak bisa diakses')

const ws = new WebSocket(target.webSocketDebuggerUrl)
await new Promise((r) => ws.addEventListener('open', r, { once: true }))
let id = 0
const pending = new Map()
ws.addEventListener('message', (e) => {
  const m = JSON.parse(e.data)
  if (m.id && pending.has(m.id)) {
    const p = pending.get(m.id)
    pending.delete(m.id)
    m.error ? p.reject(new Error(m.error.message)) : p.resolve(m.result)
  }
})
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const n = ++id
    pending.set(n, { resolve, reject })
    ws.send(JSON.stringify({ id: n, method, params }))
  })
const evaluate = async (expression) =>
  (await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result.value
const shot = async (file, clip) => {
  const { data } = await send('Page.captureScreenshot', { format: 'png', ...(clip ? { clip: { ...clip, scale: 1 } } : {}) })
  writeFileSync(file, Buffer.from(data, 'base64'))
}
const frame = () => evaluate('new Promise(r => requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(r, 120))))')

await send('Page.enable')
await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 2, mobile: true })
// Reduced motion: semua kata "Pixels. Code. Strategy." tampil penuh dan scroll tidak smooth.
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] })
await send('Page.navigate', { url })
await sleep(2500)
await evaluate('document.fonts.ready')
await frame()

await shot(join(pub, 'navbar.png'), { x: 0, y: 0, width: W, height: NAV })

await evaluate(`(() => {
  const s = document.createElement('style')
  s.textContent = 'header, a[aria-label="Chat WhatsApp Tetra Studio"] { visibility: hidden !important }'
  document.head.append(s)
})()`)

const info = await evaluate(`(() => {
  const top = (id) => Math.round(document.getElementById(id).getBoundingClientRect().top + scrollY)
  return {
    height: document.documentElement.scrollHeight,
    sections: { beranda: 0, kenapa: top('kenapa'), layanan: top('layanan'), caraKerja: top('cara-kerja'), paket: top('paket'), karya: top('karya'), kontak: top('kontak') },
  }
})()`)

// Potongan setinggi viewport. Potongan terakhir digeser ke bawah agar pas di ujung halaman.
const tiles = []
for (let y = 0; y < info.height; y += H) {
  const top = Math.min(y, info.height - H)
  await evaluate(`window.scrollTo({ top: ${top}, behavior: 'instant' })`)
  await frame()
  const name = `page-${tiles.length}.png`
  await shot(join(pub, name))
  tiles.push({ src: name, top })
}

const maxScroll = info.height - H
const stops = Object.values(info.sections).map((y) => Math.max(0, Math.min(y === 0 ? 0 : y - NAV, maxScroll)))
writeFileSync(join(root, 'src', 'page.json'), JSON.stringify({ width: W, viewport: H, nav: NAV, height: info.height, tiles, stops }, null, 2))
console.log(`tinggi ${info.height}px, ${tiles.length} potongan, stops ${stops.join(', ')}`)

ws.close()
chrome.kill()
await sleep(500)
rmSync(profile, { recursive: true, force: true })
process.exit(0)
