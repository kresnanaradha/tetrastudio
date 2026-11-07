import { site } from '@/content/site'
import { SectionHead, wrap } from './shared'

const { why } = site

export function Why() {
  return (
    <section id="kenapa" className="border-t border-navy/10 py-16 lg:py-24">
      <div className={`${wrap} grid gap-12 lg:grid-cols-12`}>
        <SectionHead n="01" label={why.label} title={why.title} className="text-navy lg:col-span-5" />

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-12">
          <p className="text-lg leading-relaxed text-pretty lg:text-xl">{why.body}</p>
          <ol className="mt-8">
            {why.benefits.map((b, i) => (
              <li key={b.title} className="grid grid-cols-[3rem_1fr] gap-2 border-t border-navy/15 py-6">
                <span className="text-sm font-bold text-gold tabular-nums" aria-hidden="true">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-xl font-bold text-navy">{b.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted lg:text-lg">{b.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className={`${wrap} mt-12 lg:mt-16`}>
        <p className="max-w-4xl text-[clamp(1.5rem,2.5vw+1rem,2.75rem)] leading-tight font-display font-normal tracking-[-0.015em] text-balance">
          {why.closingLead} <span className="text-navy italic underline decoration-gold decoration-2 underline-offset-8">{why.closingPunch}</span>
        </p>
      </div>
    </section>
  )
}
