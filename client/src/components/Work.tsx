import { ArrowUpRight } from 'lucide-react'
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

/** Kartu proyek yang bergulir tanpa henti (CSS murni, berhenti saat di-hover). */
function ProjectMarquee({ items }: { items: WorkItem[] }) {
  const cards = (copy: boolean) =>
    items.map((item) => (
      <li key={`${copy}-${item.title}`} aria-hidden={copy || undefined} className="w-72 sm:w-96">
        <ProjectCard item={item} hidden={copy} />
      </li>
    ))
  return (
    <div className="marquee mt-10">
      <ul className="marquee-track">
        {cards(false)}
        {cards(true)}
      </ul>
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
