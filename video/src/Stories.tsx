// Empat slide Instagram Story (1080x1920, gambar diam).
// Area aman: teks penting di antara y 250 dan y 1650, karena bagian atas dan bawah tertutup UI Instagram.
import type { CSSProperties, ReactNode } from 'react'
import { AbsoluteFill, Img, staticFile } from 'remotion'
import { GOLD, NAVY, OFFWHITE, WaIcon, sans, serif } from './LiveReel'
import page from './page.json'

const INK = '#1f1f1f'
const MUTED = '#595959'
const URL = 'buildwithtetra.com'

const center: CSSProperties = { position: 'absolute', left: 0, width: '100%', textAlign: 'center' }

function Label({ children, top, color = GOLD }: { children: ReactNode; top: number; color?: string }) {
  return (
    <div style={{ ...center, top, fontFamily: sans, fontWeight: 700, fontSize: 26, letterSpacing: '0.3em', color }}>
      {children}
    </div>
  )
}

function Dot() {
  return <span style={{ color: GOLD }}>.</span>
}

function Logo({ top, size }: { top: number; size: number }) {
  return (
    <div
      style={{
        position: 'absolute', top, left: (1080 - size) / 2, width: size, height: size, borderRadius: '50%',
        overflow: 'hidden', boxShadow: '0 0 0 6px rgba(184,151,90,0.35)',
      }}
    >
      <Img src={staticFile('logo-tetra.jpg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  )
}

/** Slide 1: pengumuman website sudah live, dengan HP yang menampilkan website. */
export function StoryLive() {
  const W = 430
  const K = W / page.width
  const x = (1080 - W) / 2
  const y = 1010
  return (
    <AbsoluteFill style={{ background: NAVY, color: OFFWHITE, fontFamily: sans }}>
      <Logo top={230} size={170} />
      <Label top={448}>
        <span
          style={{
            display: 'inline-block', width: 14, height: 14, borderRadius: '50%', background: GOLD,
            marginRight: 16, verticalAlign: 3, boxShadow: '0 0 0 7px rgba(184,151,90,0.25)',
          }}
        />
        NOW LIVE
      </Label>
      <div style={{ ...center, top: 500, fontFamily: serif, fontWeight: 500, fontSize: 116, lineHeight: 1.0, letterSpacing: '-0.03em' }}>
        Website baru
        <br />
        kami <i style={{ fontWeight: 400 }}>sudah live</i>
        <Dot />
      </div>
      <div style={{ ...center, top: 768, display: 'flex', justifyContent: 'center' }}>
        <div style={{ padding: '16px 38px', border: `2px solid ${GOLD}`, borderRadius: 999, fontWeight: 600, fontSize: 38 }}>{URL}</div>
      </div>
      <div style={{ ...center, top: 880, fontSize: 30, color: 'rgba(250,250,248,0.78)' }}>
        Jasa pembuatan website di Bali, dengan preview gratis.
      </div>

      {/* HP muncul dari bawah layar */}
      <div
        style={{
          position: 'absolute', left: x - 16, top: y - 16, width: W + 32, height: 1100, borderRadius: 70,
          background: '#10213a', boxShadow: '0 40px 120px rgba(0,0,0,0.5), 0 0 0 2px rgba(184,151,90,0.45)',
        }}
      />
      <div style={{ position: 'absolute', left: x, top: y, width: W, height: 1100, borderRadius: 54, overflow: 'hidden', background: OFFWHITE }}>
        <div style={{ height: 46, background: OFFWHITE }} />
        <Img src={staticFile('navbar.png')} style={{ position: 'absolute', top: 46, left: 0, width: W, height: page.nav * K, zIndex: 1 }} />
        <Img src={staticFile(page.tiles[0].src)} style={{ position: 'absolute', top: 46, left: 0, width: W, height: page.viewport * K }} />
        <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 110, height: 30, borderRadius: 20, background: '#000', zIndex: 2 }} />
      </div>
    </AbsoluteFill>
  )
}

const steps = [
  ['Konsultasi Gratis', 'Ceritakan bisnis dan kebutuhanmu lewat WhatsApp.'],
  ['Preview Gratis', 'Kami buatkan gambaran website-nya lebih dulu.'],
  ['Deal', 'Cocok dengan hasilnya? Pilih paket dan mulai pengerjaan.'],
  ['Launch', 'Website disempurnakan, diuji, lalu diluncurkan.'],
]

/** Slide 2: cara kerja build-first. */
export function StoryProcess() {
  const top = 720
  const row = 200
  return (
    <AbsoluteFill style={{ background: OFFWHITE, color: INK, fontFamily: sans }}>
      <Label top={270}>CARA KERJA TETRA</Label>
      <div style={{ ...center, top: 320, fontFamily: serif, fontWeight: 500, fontSize: 104, lineHeight: 1.0, letterSpacing: '-0.03em', color: NAVY }}>
        Lihat dulu hasilnya,
        <br />
        <i style={{ fontWeight: 400 }}>baru putuskan</i>
        <Dot />
      </div>
      <div style={{ position: 'absolute', left: 150, top: top + 32, width: 2, height: row * 3, background: 'rgba(184,151,90,0.45)' }} />
      {steps.map(([title, desc], i) => (
        <div key={title} style={{ position: 'absolute', left: 118, top: top + i * row, width: 860, display: 'flex', gap: 40 }}>
          <div
            style={{
              flex: 'none', width: 66, height: 66, borderRadius: '50%', background: GOLD, color: NAVY,
              display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 30, boxShadow: `0 0 0 10px ${OFFWHITE}`,
            }}
          >
            {i + 1}
          </div>
          <div style={{ paddingTop: 4 }}>
            <div style={{ fontWeight: 700, fontSize: 44, color: NAVY }}>{title}</div>
            <div style={{ marginTop: 8, fontSize: 31, lineHeight: 1.4, color: MUTED, maxWidth: 700 }}>{desc}</div>
          </div>
        </div>
      ))}
      <div style={{ ...center, top: 1560, fontSize: 30, fontWeight: 600, color: NAVY }}>
        Konsultasi dan preview gratis · <span style={{ color: GOLD }}>{URL}</span>
      </div>
    </AbsoluteFill>
  )
}

const services: [string, string, string[]][] = [
  ['Code', 'Website untuk bisnis', ['Desain UI/UX yang mudah dipahami', 'Cepat dan rapi dibuka di HP', 'Siap ditemukan di Google']],
  ['Automation', 'Workflow automation dengan n8n', ['Hubungkan website, WhatsApp, dan Google Sheets', 'Catat lead dan kirim notifikasi otomatis', 'Kurangi pekerjaan berulang']],
]

/** Slide 3: layanan website dan automation. */
export function StoryServices() {
  return (
    <AbsoluteFill style={{ background: NAVY, color: OFFWHITE, fontFamily: sans }}>
      <Label top={270}>LAYANAN</Label>
      <div style={{ ...center, top: 318, fontFamily: serif, fontWeight: 500, fontSize: 104, letterSpacing: '-0.03em' }}>
        Yang kami kerjakan
        <Dot />
      </div>
      {services.map(([pillar, title, points], i) => (
        <div
          key={pillar}
          style={{
            position: 'absolute', left: 90, top: 520 + i * 520, width: 900, height: 470, borderRadius: 40, padding: 56,
            boxSizing: 'border-box', background: 'rgba(250,250,248,0.06)', border: '2px solid rgba(250,250,248,0.12)',
          }}
        >
          <div style={{ fontFamily: serif, fontWeight: 500, fontSize: 104, lineHeight: 1, letterSpacing: '-0.03em', color: GOLD }}>{pillar}.</div>
          <div style={{ marginTop: 22, fontWeight: 700, fontSize: 42 }}>{title}</div>
          <div style={{ marginTop: 26, display: 'grid', gap: 16 }}>
            {points.map((p) => (
              <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: 31, color: 'rgba(250,250,248,0.85)' }}>
                <span style={{ flex: 'none', width: 14, height: 14, borderRadius: '50%', background: GOLD, boxShadow: '0 0 0 7px rgba(184,151,90,0.2)' }} />
                {p}
              </div>
            ))}
          </div>
        </div>
      ))}
      <div style={{ ...center, top: 1590, fontSize: 30, fontWeight: 600, color: 'rgba(250,250,248,0.8)' }}>
        Jasa pembuatan website di Bali · <span style={{ color: GOLD }}>{URL}</span>
      </div>
    </AbsoluteFill>
  )
}

/** Slide 4: ajakan konsultasi. Ruang kosong di bawah tombol untuk stiker link Instagram. */
export function StoryCta() {
  return (
    <AbsoluteFill style={{ background: OFFWHITE, color: INK, fontFamily: sans }}>
      <Logo top={260} size={150} />
      <div
        style={{
          ...center, top: 480, fontFamily: serif, fontWeight: 500, fontSize: 132, lineHeight: 0.98,
          letterSpacing: '-0.035em', color: NAVY,
        }}
      >
        Your Ideas,
        <br />
        Our Next
        <br />
        <i style={{ fontWeight: 400 }}>Project</i>
        <Dot />
      </div>
      <div style={{ ...center, top: 920, display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 820, fontSize: 36, lineHeight: 1.45, color: MUTED }}>
          Ceritakan bisnismu lewat WhatsApp. Konsultasi dan preview website-nya gratis, tanpa kewajiban lanjut.
        </div>
      </div>
      <div style={{ ...center, top: 1150, display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            display: 'flex', alignItems: 'center', gap: 20, padding: '26px 48px', borderRadius: 999,
            background: NAVY, color: OFFWHITE, fontWeight: 700, fontSize: 40,
          }}
        >
          <WaIcon size={44} color={OFFWHITE} />
          0813 3930 0119
        </div>
      </div>
      <div style={{ ...center, top: 1620, fontSize: 30, fontWeight: 600, color: NAVY }}>
        {URL} · <span style={{ color: GOLD }}>@buildwithtetra</span>
      </div>
    </AbsoluteFill>
  )
}
