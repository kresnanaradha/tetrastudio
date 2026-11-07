import { Check, Minus } from 'lucide-react'
import { site, type Package } from '@/content/site'
import { SectionHead, WaLink, btn, wrap } from './shared'

const { packages: p } = site

function QuoteButton({ pkg, className }: { pkg: Package; className: string }) {
  return (
    <WaLink
      message={site.whatsappMessages.package.replace('{paket}', pkg.name)}
      location={`paket-${pkg.id}`}
      label={`${p.cta} paket ${pkg.name}`}
      className={className}
    >
      {p.cta}
    </WaLink>
  )
}

function CellValue({ value }: { value: boolean | string }) {
  if (typeof value === 'string') return <span className="font-semibold">{value}</span>
  return value ? (
    <Check className="mx-auto size-5 text-navy" role="img" aria-label={p.yes} />
  ) : (
    <Minus className="mx-auto size-5 text-muted" role="img" aria-label={p.no} />
  )
}

export function Packages() {
  const hl = (i: number) => (p.items[i].highlighted ? 'bg-navy/[0.06]' : '')

  return (
    <section id="paket" className="py-16 lg:py-24">
      <div className={wrap}>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHead n="04" label={p.label} title={p.title} className="text-navy lg:col-span-7" />
          <p className="text-lg leading-relaxed text-pretty text-muted lg:col-span-5 lg:col-start-8 lg:text-xl">{p.intro}</p>
        </div>

        <table className="mt-10 w-full table-fixed border-collapse text-sm sm:text-base lg:mt-12">
          <caption className="sr-only">{p.title}</caption>
          <colgroup>
            <col className="w-[40%] sm:w-[34%]" />
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr className="border-b-2 border-navy">
              <th scope="col" className="sr-only">
                {p.featureLabel}
              </th>
              {p.items.map((pkg, i) => (
                <th key={pkg.id} scope="col" className={`px-2 pt-4 pb-5 align-bottom ${hl(i)}`}>
                  {pkg.highlighted && (
                    <span className="mb-2 block text-xs font-semibold text-navy">{p.popular}</span>
                  )}
                  <span className="block text-xl font-display font-medium text-navy sm:text-3xl">{pkg.name}</span>
                  <span className="mx-auto mt-2 hidden max-w-[16rem] text-sm leading-snug font-normal text-muted md:block">{pkg.tagline}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {p.features.map((row) => (
              <tr key={row.label} className="border-b border-navy/10">
                <th scope="row" className="py-3.5 pr-3 text-left font-medium">
                  {row.label}
                </th>
                {row.values.map((v, i) => (
                  <td key={i} className={`px-1 py-3.5 text-center ${hl(i)}`}>
                    <CellValue value={v} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot className="hidden md:table-footer-group">
            <tr>
              <td />
              {p.items.map((pkg, i) => (
                <td key={pkg.id} className={`px-2 pt-6 pb-2 text-center ${hl(i)}`}>
                  <QuoteButton pkg={pkg} className={`${btn.outline} w-full px-3 text-sm`} />
                </td>
              ))}
            </tr>
          </tfoot>
        </table>

        {/* Di layar kecil kolom terlalu sempit untuk tombol, jadi tombol ditaruh di bawah tabel. */}
        <ul className="mt-8 grid gap-3 md:hidden">
          {p.items.map((pkg) => (
            <li key={pkg.id} className="flex items-center justify-between gap-4 border-b border-navy/10 pb-4">
              <span>
                <span className="block font-display text-xl font-medium text-navy">{pkg.name}</span>
                <span className="mt-1 block text-sm leading-snug text-muted">{pkg.tagline}</span>
              </span>
              <QuoteButton pkg={pkg} className={`${btn.outline} text-sm`} />
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-2xl border-l-2 border-gold pl-4 text-muted">{p.note}</p>
      </div>
    </section>
  )
}
