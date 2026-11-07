import { contact, site } from '@/content/site'
import { Punct, Tri, WaIcon, WaLink, btn, wrap } from './shared'

const { contact: c } = site
const isTodo = (v: string) => v.startsWith('TODO')

export function Contact() {
  const rows = [
    { label: c.labels.whatsapp, value: contact.whatsapp, text: contact.whatsappDisplay, href: `https://wa.me/${contact.whatsapp}` },
    { label: c.labels.instagram, value: contact.instagram, text: `@${contact.instagram}`, href: `https://instagram.com/${contact.instagram}` },
    { label: c.labels.email, value: contact.email, href: `mailto:${contact.email}` },
    { label: c.labels.location, value: contact.location, href: '' },
  ]

  return (
    <section id="kontak" className="border-t border-navy/10 py-16 lg:py-28">
      <div className={wrap}>
        <p className="flex items-center gap-3 text-sm font-semibold text-muted">
          <Tri className="size-3 text-gold" />
          07 / {c.label}
        </p>
        <h2 className="mt-6 max-w-5xl text-[clamp(2.75rem,8vw,7rem)] leading-[0.98] font-display font-medium tracking-[-0.03em] text-navy text-balance">
          <Punct text={c.title} />
        </h2>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <p className="max-w-2xl text-lg leading-relaxed text-pretty lg:col-span-7 lg:text-xl">{c.body}</p>
          <div className="lg:col-span-5 lg:col-start-8 lg:justify-self-end">
            <WaLink
              message={site.whatsappMessages.consult}
              location="cta-akhir"
              className={`${btn.primary} px-8 py-4 text-lg`}
            >
              <WaIcon className="size-6" />
              {c.cta}
            </WaLink>
          </div>
        </div>

        <dl className="mt-12 grid gap-6 border-t border-gold/70 pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {rows.map((r) => (
            <div key={r.label}>
              <dt className="text-sm text-muted">{r.label}</dt>
              <dd className="mt-1 font-semibold break-words text-ink">
                {r.href && !isTodo(r.value) ? (
                  <a href={r.href} target="_blank" rel="noopener" className="underline decoration-gold underline-offset-4 hover:text-navy">
                    {r.text ?? r.value}
                  </a>
                ) : (
                  r.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
