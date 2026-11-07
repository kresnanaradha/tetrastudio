import { ArrowDown } from 'lucide-react'
import { site } from '@/content/site'
import ScrollStatement from '@/components/ui/scroll-statement'
import { Tri, WaIcon, WaLink, btn, wrap } from './shared'

const { hero } = site

// TODO: ganti mockup CSS ini dengan tangkapan layar karya sungguhan (WebP, dengan width, height, fetchpriority="high").
function DeviceMockup() {
  const bar = 'h-2 rounded-full bg-navy/15'
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-lg pb-10 lg:max-w-none">
      <div className="rounded-lg border border-navy/15 bg-offwhite shadow-[0_30px_60px_-30px_rgb(30_58_95/0.35)]">
        <div className="flex gap-1.5 border-b border-navy/10 px-3 py-2.5">
          <span className="size-2 rounded-full bg-navy/20" />
          <span className="size-2 rounded-full bg-navy/20" />
          <span className="size-2 rounded-full bg-navy/20" />
        </div>
        <div className="grid grid-cols-5 gap-4 p-5 sm:p-7">
          <div className="col-span-3 space-y-3">
            <div className="h-5 w-11/12 rounded bg-navy" />
            <div className="h-5 w-8/12 rounded bg-navy" />
            <div className="flex items-center gap-1.5 pt-1">
              <Tri className="size-2.5 text-gold" />
              <div className={`${bar} w-1/2`} />
            </div>
            <div className={`${bar} w-full`} />
            <div className={`${bar} w-10/12`} />
            <div className="mt-4 h-6 w-1/3 rounded bg-navy/85" />
          </div>
          <div className="col-span-2 aspect-[4/5] rounded bg-navy/10" />
          <div className="col-span-5 mt-2 grid grid-cols-3 gap-3 border-t border-gold/50 pt-4">
            <div className="h-12 rounded bg-navy/[0.07]" />
            <div className="h-12 rounded bg-navy/[0.07]" />
            <div className="h-12 rounded bg-navy/[0.07]" />
          </div>
        </div>
      </div>
      <div className="absolute right-3 bottom-0 w-[30%] rounded-[1.1rem] border-[5px] border-ink bg-offwhite p-2.5 shadow-[0_20px_40px_-20px_rgb(31_31_31/0.5)] sm:right-6">
        <div className="mx-auto mb-2 h-1 w-1/3 rounded-full bg-ink/20" />
        <div className="space-y-1.5">
          <div className="h-2.5 w-11/12 rounded-sm bg-navy" />
          <div className="h-2.5 w-7/12 rounded-sm bg-navy" />
          <div className="h-1.5 w-full rounded-full bg-navy/15" />
          <div className="h-1.5 w-9/12 rounded-full bg-navy/15" />
          <div className="aspect-square rounded bg-navy/10" />
          <div className="h-3 w-1/2 rounded-sm bg-navy/85" />
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section id="beranda" className="relative pb-14 lg:pb-20">
      <div className={`${wrap} absolute inset-x-0 top-6 lg:top-8`}>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-muted">
          {hero.meta.map((m) => (
            <li key={m} className="flex items-center gap-2">
              <Tri className="size-2.5 text-gold" />
              {m}
            </li>
          ))}
        </ul>
      </div>

      <ScrollStatement heading="h1" hero title={hero.prefix} words={hero.headline} srText={hero.srHeadline} />

      {/* Subjudul dan CTA tepat di bawah kata-kata, masih di layar pertama. */}
      <div className={`${wrap} mt-6 grid gap-12 lg:mt-8 lg:grid-cols-12`}>
        <div className="lg:col-span-6">
          <p className="max-w-2xl text-lg leading-relaxed text-pretty text-ink/90">{hero.subtitle}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <WaLink message={site.whatsappMessages.consult} location="hero" className={btn.primary}>
              <WaIcon className="size-5" />
              {hero.primaryCta}
            </WaLink>
            <a href="#cara-kerja" className={btn.outline}>
              {hero.secondaryCta}
              <ArrowDown className="size-4" aria-hidden="true" />
            </a>
          </div>
          <p className="mt-4 text-sm text-muted">{hero.ctaNote}</p>
        </div>
        <div className="lg:col-span-6">
          <DeviceMockup />
        </div>
      </div>
    </section>
  )
}
