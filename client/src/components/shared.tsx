import { useId, type ReactNode } from 'react'
import { waUrl } from '@/lib/whatsapp'
import { track } from '@/lib/analytics'

export const wrap = 'mx-auto w-full max-w-[96rem] px-5 sm:px-8 lg:px-12 xl:px-16'

const btnBase =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-3 font-semibold transition-colors duration-200'
export const btn = {
  primary: `${btnBase} bg-navy text-offwhite hover:bg-ink`,
  outline: `${btnBase} border border-navy/30 text-navy hover:border-gold hover:text-ink`,
  light: `${btnBase} bg-offwhite text-navy hover:bg-gold hover:text-ink`,
}

/** Simbol segitiga Tetra. Celah potongan dibuat transparan lewat mask, jadi cocok di latar apa pun. */
export function Mark({ className }: { className?: string }) {
  const id = useId()
  return (
    <svg viewBox="0 0 100 88" className={className} aria-hidden="true" focusable="false">
      <mask id={id}>
        <path d="M50 0 100 88H0Z" fill="#fff" />
        <path d="M52 3 50 48M21 50 42 63M58 60 80 54M44 68 33 88M60 67 76 88" stroke="#000" strokeWidth="3.5" />
        <path d="M50 45 63 69H37Z" fill="#000" />
      </mask>
      <path d="M50 0 100 88H0Z" fill="currentColor" mask={`url(#${id})`} />
      <path d="M50 51 58.5 66h-17Z" fill="#b8975a" />
    </svg>
  )
}

/** Logo WhatsApp (path dari Simple Icons). */
export function WaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

/** Tombol WhatsApp yang selalu melayang di pojok kanan bawah. */
export function FloatingWa({ message, label }: { message: string; label: string }) {
  return (
    <WaLink
      message={message}
      location="floating"
      label={label}
      className="fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 grid size-14 place-items-center rounded-full bg-gold text-navy shadow-[0_10px_30px_-8px_rgb(31_31_31/0.45)] ring-4 ring-offwhite/70 transition-transform duration-200 hover:scale-110 motion-reduce:transition-none sm:right-6 sm:bottom-6"
    >
      <WaIcon className="size-7" />
    </WaLink>
  )
}

/** Segitiga kecil sebagai penanda (motif dari logo). */
export function Tri({ className, filled = true }: { className?: string; filled?: boolean }) {
  return (
    <svg viewBox="0 0 10 9" className={className} aria-hidden="true" focusable="false">
      <path
        d="M5 .8 9.3 8.3H.7Z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={filled ? 0 : 0.8}
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Tanda baca akhir kalimat diberi warna gold: motif titik dari "Pixels. Code. Strategy." */
export function Punct({ text }: { text: string }) {
  return (
    <>
      {text.split(/([.?!])(?=\s|"|$)/).map((part, i) =>
        i % 2 ? (
          <span key={i} className="text-gold">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  )
}

export function SectionHead({
  n,
  label,
  title,
  intro,
  dark = false,
  className = '',
}: {
  n: string
  label: string
  title: string
  intro?: string
  dark?: boolean
  className?: string
}) {
  return (
    <div className={className}>
      <p className={`flex items-center gap-3 text-sm font-semibold ${dark ? 'text-offwhite/80' : 'text-muted'}`}>
        <Tri className="size-3 shrink-0 text-gold" />
        <span>
          {n} / {label}
        </span>
        <span className="h-px flex-1 bg-gold/70" aria-hidden="true" />
      </p>
      <h2 className="mt-4 text-[clamp(2.25rem,4.5vw+1rem,4.25rem)] leading-[1.05] font-display font-medium tracking-[-0.02em] text-balance">
        <Punct text={title} />
      </h2>
      {intro && (
        <p className={`mt-5 max-w-2xl text-lg leading-relaxed text-pretty lg:text-xl ${dark ? 'text-offwhite/80' : 'text-muted'}`}>
          {intro}
        </p>
      )}
    </div>
  )
}

export function WaLink({
  message,
  location,
  className,
  children,
  label,
}: {
  message: string
  location: string
  className?: string
  children: ReactNode
  label?: string
}) {
  return (
    <a
      href={waUrl(message)}
      target="_blank"
      rel="noopener"
      aria-label={label}
      className={className}
      onClick={() => track('whatsapp_click', { location })}
    >
      {children}
    </a>
  )
}
