import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { site } from '@/content/site'
import { Mark, WaLink, btn, wrap } from './shared'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const toggleRef = useRef<HTMLButtonElement>(null)

  // Tandai bagian yang sedang ada di tengah layar.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    document.querySelectorAll('main section[id]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const links = site.nav.links.map((link) => {
    const current = active === link.href.slice(1)
    return (
      <li key={link.href}>
        <a
          href={link.href}
          onClick={() => setOpen(false)}
          aria-current={current ? 'location' : undefined}
          className={`flex min-h-11 items-center border-b-2 font-medium transition-colors lg:text-[1.0625rem] ${
            current ? 'border-gold text-navy' : 'border-transparent text-ink/80 hover:text-navy'
          }`}
        >
          {link.label}
        </a>
      </li>
    )
  })

  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-offwhite">
      <div className={`${wrap} flex h-16 items-center justify-between gap-6`}>
        <a href="#beranda" aria-label={site.nav.homeLabel} className="flex min-h-11 items-center gap-2.5">
          <Mark className="h-8 w-9 text-navy" />
          <span className="text-xl font-extrabold tracking-tight whitespace-nowrap text-navy">{site.brand.name}</span>
        </a>

        <nav aria-label="Utama" className="hidden lg:block">
          <ul className="flex items-center gap-8">{links}</ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <WaLink message={site.whatsappMessages.consult} location="navbar" className={`${btn.primary} px-5 text-base`}>
              {site.nav.cta}
            </WaLink>
          </div>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-md text-navy lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? site.nav.menuClose : site.nav.menuOpen}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      <nav
        id="menu-mobile"
        aria-label="Menu seluler"
        hidden={!open}
        className="border-t border-navy/10 bg-offwhite lg:hidden"
      >
        <div className={`${wrap} pt-2 pb-6`}>
          <ul className="flex flex-col text-lg">{links}</ul>
          <WaLink
            message={site.whatsappMessages.consult}
            location="navbar"
            className={`${btn.primary} mt-4 w-full sm:hidden`}
          >
            {site.nav.cta}
          </WaLink>
        </div>
      </nav>
    </header>
  )
}
