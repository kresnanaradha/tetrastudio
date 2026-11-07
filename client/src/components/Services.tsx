import { ArrowRight } from 'lucide-react'
import { site } from '@/content/site'
import { Punct, SectionHead, WaIcon, WaLink, btn, wrap } from './shared'

const { services } = site

export function Services() {
  // Layanan yang tersedia tampil lebih dulu dan lebih besar.
  const items = [...services.items].sort((a, b) => Number(b.available) - Number(a.available))
  const single = items.filter((s) => s.available).length === 1

  return (
    <section id="layanan" className="border-t border-navy/10 py-16 lg:py-24">
      <div className={wrap}>
        <SectionHead n="02" label={services.label} title={services.title} intro={services.intro} className="max-w-3xl text-navy" />

        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-flow-row-dense lg:grid-cols-3">
          {items.map((s) =>
            s.available ? (
              <li
                key={s.pillar}
                data-tone="dark"
                className={`flex flex-col justify-between gap-10 rounded-lg bg-navy p-7 text-offwhite sm:p-10 md:col-span-2 ${
                  single ? 'lg:row-span-2' : ''
                }`}
              >
                <p className="text-[clamp(3rem,7vw,5.5rem)] leading-none font-display font-medium tracking-[-0.03em] text-gold" aria-hidden="true">
                  {s.pillar}.
                </p>
                <div>
                  <h3 className="text-2xl font-bold sm:text-3xl">{s.title}</h3>
                  <p className="mt-3 max-w-lg text-lg leading-relaxed text-offwhite/85">{s.description}</p>
                  {s.action === 'whatsapp' ? (
                    <WaLink
                      message={site.whatsappMessages.automation}
                      location={`layanan-${s.pillar.toLowerCase()}`}
                      className={`${btn.light} mt-8`}
                    >
                      <WaIcon className="size-5" />
                      {services.ctaWhatsapp}
                    </WaLink>
                  ) : (
                    <a href="#paket" className={`${btn.light} mt-8`}>
                      {services.cta}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </li>
            ) : (
              <li key={s.pillar} className="flex flex-col gap-8 rounded-lg border border-navy/15 p-7">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-4xl font-display font-medium tracking-[-0.02em] text-navy/35" aria-hidden="true">
                    <Punct text={`${s.pillar}.`} />
                  </p>
                  <span className="shrink-0 rounded-sm border border-muted/40 px-2 py-1 text-xs font-semibold text-muted">
                    {services.comingSoon}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{s.description}</p>
                </div>
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  )
}
