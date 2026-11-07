import { Plus } from 'lucide-react'
import { site } from '@/content/site'
import { SectionHead, wrap } from './shared'

const { faq } = site

// Accordion memakai <details>/<summary> bawaan browser: bisa dibuka dengan keyboard,
// beberapa item boleh terbuka sekaligus, dan semantiknya sudah benar tanpa ARIA tambahan.
export function Faq() {
  return (
    <section id="faq" className="border-t border-navy/10 py-16 lg:py-24">
      <div className={`${wrap} grid gap-10 lg:grid-cols-12`}>
        <div className="lg:col-span-4">
          <SectionHead n="06" label={faq.label} title={faq.title} intro={faq.intro} className="text-navy lg:sticky lg:top-28" />
        </div>
        <div className="border-t border-navy/15 lg:col-span-7 lg:col-start-6">
          {faq.items.map((item) => (
            <details key={item.q} className="group border-b border-navy/15">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold text-navy [&::-webkit-details-marker]:hidden">
                {item.q}
                <Plus
                  className="size-5 shrink-0 text-gold transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </summary>
              <p className="max-w-2xl pb-6 leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
