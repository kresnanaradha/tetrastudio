// Gagal bila ada em dash (U+2014) atau en dash (U+2013) di repository (PRD Bagian 6.2).
import { readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = join(import.meta.dirname, '..')
const skipDirs = new Set(['node_modules', 'dist', 'dist-ssr', '.git'])
const textFile = /\.(tsx?|jsx?|mjs|cjs|css|html|json|md|txt|xml|svg|ya?ml)$/i
const dash = new RegExp('[' + String.fromCharCode(0x2013, 0x2014) + ']')
const hits = []

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) {
      if (!skipDirs.has(entry.name)) walk(path)
    } else if (textFile.test(entry.name)) {
      readFileSync(path, 'utf8').split('\n').forEach((line, i) => {
        if (dash.test(line)) hits.push(`${relative(root, path)}:${i + 1}`)
      })
    }
  }
}

walk(root)

if (hits.length) {
  console.error('Ditemukan em dash atau en dash:\n' + hits.join('\n'))
  process.exit(1)
}
console.log('check:dashes lulus.')
