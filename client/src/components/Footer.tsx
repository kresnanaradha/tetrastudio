import { Mail } from 'lucide-react'
import { contact, site } from '@/content/site'
import { Mark, WaIcon, WaLink, wrap } from './shared'

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  )
}

const heading = 'text-sm font-semibold text-gold'
const row = 'flex min-h-11 items-center gap-3 text-offwhite/85 transition-colors hover:text-gold'

export function Footer() {
  return (
    <footer data-tone="dark" className="bg-navy text-offwhite">
      <div className={`${wrap} grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12`}>
        <div className="sm:col-span-2 lg:col-span-5">
          <a href="#beranda" aria-label={site.nav.homeLabel} className="inline-flex min-h-11 items-center gap-2.5">
            <Mark className="h-7 w-8 text-offwhite" />
            <span className="text-lg font-extrabold tracking-tight">{site.brand.name}</span>
          </a>
          <p className="mt-4 max-w-sm leading-relaxed text-offwhite/80">{site.footer.tagline}</p>
        </div>

        <nav aria-label={site.footer.navLabel} className="lg:col-span-3">
          <p className={heading}>{site.footer.navTitle}</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-6">
            {site.nav.links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={row}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-4 lg:justify-self-end">
          <p className={heading}>{site.footer.contactTitle}</p>
          <ul className="mt-3">
            <li>
              <WaLink message={site.whatsappMessages.consult} location="footer" className={row}>
                <WaIcon className="size-5 shrink-0" />
                {contact.whatsappDisplay}
              </WaLink>
            </li>
            <li>
              <a href={`https://instagram.com/${contact.instagram}`} target="_blank" rel="noopener" className={row}>
                <InstagramIcon className="size-5 shrink-0" />@{contact.instagram}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className={`${row} break-all`}>
                <Mail className="size-5 shrink-0" aria-hidden="true" />
                {contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-offwhite/15">
        <p className={`${wrap} py-6 text-sm text-offwhite/75`}>
          © {new Date().getFullYear()} {site.footer.copyright} · {contact.location}
        </p>
      </div>
    </footer>
  )
}
