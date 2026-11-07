/*
  Scroll Statement (PRD Bagian 5.13), dipakai di Hero ("we craft Pixels. Code. Strategy.").
  Diadaptasi dari demo publik "you can scroll" karya jh3yy (2024). Cek lisensi sumber sebelum peluncuran.

  Browser yang mendukung CSS scroll-driven animation memakai CSS murni (lihat index.css).
  Browser lain memuat fallback GSAP lewat dynamic import, jadi gsap tidak pernah masuk bundle awal.
*/
import { useEffect, useRef, type CSSProperties } from 'react'
import { Punct, wrap } from '@/components/shared'

type Props = {
  title: string
  words: string[]
  srText: string
  /** h1 untuk Hero, h2 untuk bagian lain. */
  heading?: 'h1' | 'h2'
  /** Varian hero: judul diam lebih kecil, kata menyala di garis 30% layar. */
  hero?: boolean
}

export default function ScrollStatement({ title, words, srText, heading: Heading = 'h2', hero = false }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (
      !el ||
      matchMedia('(prefers-reduced-motion: reduce)').matches ||
      CSS.supports('(animation-timeline: view()) and (animation-range: 0% 100%)')
    )
      return
    let cleanup: (() => void) | undefined
    let alive = true
    import('./scroll-statement-fallback').then((m) => {
      if (alive) cleanup = m.animate(el, hero ? '30%' : '50%')
    })
    return () => {
      alive = false
      cleanup?.()
    }
  }, [hero])

  return (
    <div
      ref={ref}
      className={`scroll-statement ${hero ? 'ss-hero' : ''}`}
      style={{ '--count': words.length } as CSSProperties}
    >
      <div className={`ss-row ${wrap}`}>
        <Heading className="ss-title">
          <span aria-hidden="true">{title}&nbsp;</span>
          <span className="sr-only">{srText}</span>
        </Heading>
        <ul aria-hidden="true">
          {words.map((word, i) => (
            <li key={word} style={{ '--i': i } as CSSProperties}>
              <Punct text={word} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
