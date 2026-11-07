import { useEffect, useRef } from 'react'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { site, type WorkItem } from '@/content/site'
import { SectionHead, Tri, WaIcon, WaLink, btn, wrap } from './shared'

const { work } = site
// Mulai jumlah ini, kartu proyek bergulir. Di bawahnya tampil sebagai grid biasa supaya tidak terlihat berulang.
const MARQUEE_MIN = 4
// Pola lebar kartu di grid 6 kolom, supaya grid tidak seragam.
const spans = ['md:col-span-4', 'md:col-span-2', 'md:col-span-3']

// Kartu contoh hanya untuk melihat tampilan saat development, tidak pernah tampil di website live.
const devPreview: WorkItem[] = Array.from({ length: 5 }, (_, i) => ({
  title: `TODO: Nama proyek ${i + 1}`,
  category: 'Kategori proyek',
  kind: 'Proyek Konsep',
  image: { src: '', width: 1280, height: 800, alt: '' },
}))

function ProjectCard({ item, hidden = false }: { item: WorkItem; hidden?: boolean }) {
  return (
    <figure className="group">
      <div className="overflow-hidden rounded-xl border border-navy/10 bg-navy/[0.04]">
        {item.image.src ? (
          <img
            src={item.image.src}
            width={item.image.width}
            height={item.image.height}
            alt={hidden ? '' : item.image.alt}
            loading="lazy"
            decoding="async"
            className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105 motion-reduce:transition-none"
          />
        ) : (
          <div className="aspect-[16/10] w-full" />
        )}
      </div>
      <figcaption className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl font-medium text-navy">{item.title}</h3>
          <p className="mt-0.5 text-sm text-muted">
            {item.category} · {item.kind}
          </p>
        </div>
        {item.url && !hidden && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener"
            aria-label={`${work.visit}: ${item.title}`}
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-navy/20 text-navy transition-colors hover:border-gold hover:bg-gold"
          >
            <ArrowUpRight className="size-5" aria-hidden="true" />
          </a>
        )}
      </figcaption>
    </figure>
  )
}

/** Jarak antara awal daftar dan awal salinannya, yaitu panjang satu putaran. */
const loopWidth = (el: HTMLElement) => {
  const copy = el.querySelector<HTMLElement>('[data-copy]')
  const first = el.querySelector<HTMLElement>('li')
  return copy && first ? copy.offsetLeft - first.offsetLeft : 0
}

const SPEED = 0.04 // piksel per milidetik (sekitar 40px per detik)
const RESUME_AFTER = 2500 // jeda sebelum bergulir lagi setelah pengunjung berinteraksi (ms)

/**
 * Kartu proyek yang bergulir otomatis, tapi tetap bisa digeser pengunjung:
 * swipe di HP, scroll trackpad, drag mouse, atau tombol panah.
 * Daftar ditampilkan dua kali; saat posisi melewati salinan pertama, posisinya diputar balik tanpa terlihat.
 */
function ProjectMarquee({ items }: { items: WorkItem[] }) {
  const scroller = useRef<HTMLDivElement>(null)
  const paused = useRef(false)
  const resumeTimer = useRef<number>(0)
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false })

  const pause = () => {
    paused.current = true
    window.clearTimeout(resumeTimer.current)
  }
  const resumeLater = (ms = RESUME_AFTER) => {
    window.clearTimeout(resumeTimer.current)
    resumeTimer.current = window.setTimeout(() => (paused.current = false), ms)
  }

  // Posisi yang dituju tombol panah. Dianimasikan di loop yang sama dengan gerak otomatis,
  // karena scroll "smooth" bawaan browser dibatalkan setiap kali posisi scroll ditulis ulang.
  const target = useRef<number | null>(null)
  const pos = useRef(0)

  useEffect(() => {
    const el = scroller.current
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    let last = performance.now()
    pos.current = el.scrollLeft
    const tick = (now: number) => {
      const dt = Math.min(now - last, 64)
      last = now
      if (target.current !== null) {
        pos.current += (target.current - pos.current) * Math.min(1, dt / 90)
        if (Math.abs(target.current - pos.current) < 0.5) {
          pos.current = target.current
          target.current = null
        }
        el.scrollLeft = pos.current
      } else if (paused.current) {
        pos.current = el.scrollLeft
      } else {
        const loop = loopWidth(el)
        pos.current += dt * SPEED
        if (loop && pos.current >= loop) pos.current -= loop
        el.scrollLeft = pos.current
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(resumeTimer.current)
    }
  }, [])

  const step = (dir: 1 | -1) => {
    const el = scroller.current
    const card = el?.querySelector('li')
    if (!el || !card) return
    const width = card.getBoundingClientRect().width + 24
    const loop = loopWidth(el)
    // Lompat ke posisi yang sama di salinan bila perlu, supaya selalu bisa maju dan mundur.
    let start = target.current ?? el.scrollLeft
    if (dir < 0 && start < width) start += loop
    if (dir > 0 && start >= loop) start -= loop
    el.scrollLeft = start
    pos.current = start
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.scrollLeft = start + dir * width
      return
    }
    pause()
    target.current = start + dir * width
    resumeLater(4000)
  }

  const cards = (copy: boolean) =>
    items.map((item, i) => (
      <li key={`${copy}-${item.title}`} aria-hidden={copy || undefined} data-copy={copy && i === 0 ? '' : undefined} className="w-72 sm:w-96">
        <ProjectCard item={item} hidden={copy} />
      </li>
    ))

  return (
    <div className="mt-8">
      <div className={`${wrap} mb-6 flex justify-end gap-2`}>
        {([-1, 1] as const).map((dir) => (
          <button
            key={dir}
            type="button"
            onClick={() => step(dir)}
            aria-label={dir < 0 ? work.prev : work.next}
            className="inline-flex size-11 items-center justify-center rounded-full border border-navy/20 text-navy transition-colors hover:border-gold hover:bg-gold"
          >
            {dir < 0 ? <ChevronLeft className="size-5" aria-hidden="true" /> : <ChevronRight className="size-5" aria-hidden="true" />}
          </button>
        ))}
      </div>
      <div
        ref={scroller}
        className="marquee"
        onPointerEnter={(e) => e.pointerType === 'mouse' && pause()}
        onPointerLeave={(e) => {
          drag.current.active = false
          if (e.pointerType === 'mouse') resumeLater(600)
        }}
        onPointerDown={(e) => {
          pause()
          if (e.pointerType === 'mouse') {
            drag.current = { active: true, startX: e.clientX, startLeft: e.currentTarget.scrollLeft, moved: false }
          }
        }}
        onPointerMove={(e) => {
          const d = drag.current
          if (!d.active) return
          const dx = e.clientX - d.startX
          if (Math.abs(dx) > 5) d.moved = true
          e.currentTarget.scrollLeft = d.startLeft - dx
        }}
        onPointerUp={(e) => {
          drag.current.active = false
          if (e.pointerType !== 'mouse') resumeLater()
        }}
        onClickCapture={(e) => {
          // Klik setelah drag tidak membuka tautan proyek.
          if (drag.current.moved) {
            e.preventDefault()
            e.stopPropagation()
            drag.current.moved = false
          }
        }}
        onFocusCapture={pause}
        onBlurCapture={() => resumeLater()}
      >
        <ul className="marquee-track">
          {cards(false)}
          {cards(true)}
        </ul>
      </div>
    </div>
  )
}

export function Work() {
  const items = work.items

  return (
    <section id="karya" className="border-t border-navy/10 py-16 lg:py-24">
      <div className={wrap}>
        <SectionHead n="05" label={work.label} title={work.title} intro={work.intro} className="text-navy" />

        {items.length === 0 && (
          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
            <p className="relative text-[clamp(1.75rem,3vw+1rem,3.25rem)] leading-tight font-display font-medium tracking-[-0.015em] text-navy text-balance lg:col-span-8">
              <Tri filled={false} className="mb-6 block size-10 text-gold" />
              {work.empty}
            </p>
            <div className="lg:col-span-4 lg:justify-self-end">
              <WaLink message={site.whatsappMessages.work} location="karya-empty" className={btn.primary}>
                <WaIcon className="size-5" />
                {work.emptyCta}
              </WaLink>
            </div>
          </div>
        )}

        {items.length > 0 && items.length < MARQUEE_MIN && (
          <ul className="mt-10 grid gap-6 md:grid-cols-6">
            {items.map((item, i) => (
              <li key={item.title} className={spans[i % spans.length]}>
                <ProjectCard item={item} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Marquee dibuat selebar layar supaya kartu terlihat masuk dan keluar dari tepi. */}
      {items.length >= MARQUEE_MIN && <ProjectMarquee items={items} />}
      {items.length === 0 && import.meta.env.DEV && <ProjectMarquee items={devPreview} />}
    </section>
  )
}
