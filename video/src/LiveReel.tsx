// Video Reels/Story 1080x1920: "Website kami sudah live" dengan rekaman scroll website di mockup HP.
// Aset halaman diambil dari website live lewat `npm run capture`.
import type { CSSProperties } from 'react'
import { AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion'
import { loadFont as loadNewsreader } from '@remotion/google-fonts/Newsreader'
import { loadFont as loadHanken } from '@remotion/google-fonts/HankenGrotesk'
import page from './page.json'

export const { fontFamily: serif } = loadNewsreader('normal', { weights: ['500'], subsets: ['latin'] })
loadNewsreader('italic', { weights: ['400'], subsets: ['latin'] })
export const { fontFamily: sans } = loadHanken('normal', { weights: ['500', '600', '700'], subsets: ['latin'] })

export const NAVY = '#1e3a5f'
export const GOLD = '#b8975a'
export const OFFWHITE = '#fafaf8'
const BEZEL = '#10213a'

export const FPS = 30

// Linimasa scroll di dalam HP (dalam frame).
const SCROLL_START = 75
const TRAVEL = 26
const HOLD = 34
const keys: [number, number][] = [[0, 0], [SCROLL_START, 0]]
page.stops.slice(1).forEach((y) => {
  const depart = keys[keys.length - 1][0]
  keys.push([depart + TRAVEL, y], [depart + TRAVEL + HOLD, y])
})
export const DURATION = keys[keys.length - 1][0] + 20

// Layar HP: 470x1017 di (305, 772). Skala dari piksel CSS website (390 lebar) ke layar video.
const SCREEN = { x: 305, y: 772, w: 470, h: 1017 }
const K = SCREEN.w / page.width
// Status bar HP di atas halaman, supaya "pulau" kamera tidak menutupi navbar website.
const STATUS = 46

/** Muncul dengan geser ke atas dan fade, mulai di frame `at`. */
const useRise = (at: number, distance = 40): CSSProperties => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const p = spring({ frame: frame - at, fps, config: { damping: 200 } })
  return { opacity: p, transform: `translateY(${(1 - p) * distance}px)` }
}

export function WaIcon({ size, color = NAVY }: { size: number; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={color}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

function Phone() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame: frame - 18, fps, config: { damping: 18, mass: 0.9 } })
  const scroll = interpolate(frame, keys.map(([f]) => f), keys.map(([, y]) => y), {
    easing: Easing.inOut(Easing.cubic),
    extrapolateRight: 'clamp',
  })

  return (
    <div style={{ position: 'absolute', inset: 0, transform: `translateY(${(1 - enter) * 1300}px)` }}>
      <div
        style={{
          position: 'absolute', left: SCREEN.x - 16, top: SCREEN.y - 16, width: SCREEN.w + 32, height: SCREEN.h + 32,
          borderRadius: 68, boxShadow: '0 50px 120px rgba(0,0,0,0.45)',
        }}
      />
      <div
        style={{
          position: 'absolute', left: SCREEN.x, top: SCREEN.y, width: SCREEN.w, height: SCREEN.h,
          overflow: 'hidden', background: OFFWHITE, borderRadius: 52,
        }}
      >
        <div style={{ position: 'absolute', inset: 0, transform: `translateY(${STATUS - scroll * K}px)` }}>
          {page.tiles.map((t) => (
            <Img
              key={t.src}
              src={staticFile(t.src)}
              style={{ position: 'absolute', left: 0, top: t.top * K, width: SCREEN.w, height: page.viewport * K }}
            />
          ))}
        </div>
        <Img src={staticFile('navbar.png')} style={{ position: 'absolute', left: 0, top: STATUS, width: SCREEN.w, height: page.nav * K }} />
        <div
          style={{
            position: 'absolute', left: 0, top: 0, width: SCREEN.w, height: STATUS, background: OFFWHITE,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 34px',
            fontWeight: 700, fontSize: 19, color: '#1f1f1f',
          }}
        >
          <span>9:41</span>
          <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <span style={{ width: 18, height: 11, borderRadius: 2, background: '#1f1f1f', opacity: 0.85 }} />
            <span style={{ width: 26, height: 12, borderRadius: 4, border: '2px solid #1f1f1f', padding: 1 }}>
              <span style={{ display: 'block', height: '100%', width: '70%', borderRadius: 1, background: '#1f1f1f' }} />
            </span>
          </span>
        </div>
        <div
          style={{
            position: 'absolute', right: 16 * K, bottom: 16 * K, width: 56 * K, height: 56 * K, borderRadius: '50%',
            background: GOLD, display: 'grid', placeItems: 'center',
            boxShadow: `0 0 0 ${4 * K}px rgba(250,250,248,0.7), 0 10px 30px -8px rgba(31,31,31,0.45)`,
          }}
        >
          <WaIcon size={28 * K} />
        </div>
      </div>
      <div
        style={{
          position: 'absolute', left: SCREEN.x - 16, top: SCREEN.y - 16, width: SCREEN.w + 32, height: SCREEN.h + 32,
          boxSizing: 'border-box', border: `16px solid ${BEZEL}`, borderRadius: 68,
          boxShadow: `inset 0 0 0 2px rgba(255,255,255,0.06), 0 0 0 2px rgba(184,151,90,0.45)`,
        }}
      >
        <div
          style={{
            position: 'absolute', left: '50%', top: 14, transform: 'translateX(-50%)',
            width: 110, height: 30, borderRadius: 20, background: '#000',
          }}
        />
      </div>
    </div>
  )
}

export function LiveReel() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const logo = spring({ frame, fps, config: { damping: 12, mass: 0.8 } })
  const pulse = 0.5 + 0.5 * Math.sin(frame / 7)
  const fadeOut = interpolate(frame, [DURATION - 12, DURATION], [1, 0], { extrapolateLeft: 'clamp' })

  return (
    <AbsoluteFill style={{ background: NAVY, color: OFFWHITE, fontFamily: sans, opacity: fadeOut }}>
      <div
        style={{
          position: 'absolute', top: 96, left: 435, width: 210, height: 210, borderRadius: '50%', overflow: 'hidden',
          boxShadow: `0 0 0 6px rgba(184,151,90,0.35)`, transform: `scale(${0.6 + 0.4 * logo})`, opacity: Math.min(1, logo * 1.5),
        }}
      >
        <Img src={staticFile('logo-tetra.jpg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      <div
        style={{
          position: 'absolute', top: 350, width: '100%', textAlign: 'center',
          fontWeight: 700, fontSize: 26, letterSpacing: '0.32em', color: GOLD, ...useRise(8, 20),
        }}
      >
        <span
          style={{
            display: 'inline-block', width: 14, height: 14, borderRadius: '50%', background: GOLD,
            marginRight: 16, verticalAlign: 3, boxShadow: `0 0 0 ${4 + pulse * 6}px rgba(184,151,90,${0.35 - pulse * 0.2})`,
          }}
        />
        NOW LIVE
      </div>

      <div
        style={{
          position: 'absolute', top: 392, width: '100%', textAlign: 'center', fontFamily: serif,
          fontWeight: 500, fontSize: 104, lineHeight: 1.02, letterSpacing: '-0.03em',
        }}
      >
        <div style={useRise(14)}>Website kami</div>
        <div style={{ fontStyle: 'italic', fontWeight: 400, ...useRise(22) }}>
          sudah live<span style={{ color: GOLD }}>.</span>
        </div>
      </div>

      <div style={{ position: 'absolute', top: 632, width: '100%', display: 'flex', justifyContent: 'center', ...useRise(32, 24) }}>
        <div style={{ padding: '14px 34px', border: `2px solid ${GOLD}`, borderRadius: 999, fontWeight: 600, fontSize: 34 }}>
          buildwithtetra.com
        </div>
      </div>

      <Phone />

      <div
        style={{
          position: 'absolute', bottom: 52, width: '100%', textAlign: 'center', fontWeight: 600, fontSize: 28,
          color: 'rgba(250,250,248,0.75)', letterSpacing: '0.02em', ...useRise(48, 16),
        }}
      >
        Konsultasi gratis via WhatsApp · <b style={{ color: GOLD, fontWeight: 700 }}>@buildwithtetra</b>
      </div>
    </AbsoluteFill>
  )
}
