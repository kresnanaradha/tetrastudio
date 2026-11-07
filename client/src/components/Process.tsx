import { Eye, Globe, Handshake, MessageSquare } from 'lucide-react'
import { site } from '@/content/site'
import { SectionHead, wrap } from './shared'

const { process } = site
const icons = [MessageSquare, Eye, Handshake, Globe]

function StepNumber({ n }: { n: number }) {
  return (
    <span
      aria-hidden="true"
      className="grid size-9 shrink-0 place-items-center rounded-full bg-gold text-sm font-semibold text-navy"
    >
      {n}
    </span>
  )
}

export function Process() {
  const steps = process.steps

  return (
    <section id="cara-kerja" data-tone="dark" className="bg-navy py-16 text-offwhite lg:py-24">
      <div className={wrap}>
        <SectionHead n="03" label={process.label} title={process.title} intro={process.intro} dark className="max-w-4xl" />

        {/* Desktop: deretan nomor dengan garis penghubung di atas kartu. */}
        <div aria-hidden="true" className="relative mt-12 hidden grid-cols-4 gap-6 lg:grid">
          <span className="absolute top-1/2 right-[12.5%] left-[12.5%] h-px bg-gold/40" />
          {steps.map((step, i) => (
            <div key={step.title} className="relative flex justify-center">
              <StepNumber n={i + 1} />
            </div>
          ))}
        </div>

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, i) => {
            const Icon = icons[i] ?? Globe
            return (
              <li
                key={step.title}
                className={`flex flex-col rounded-2xl border p-6 transition duration-300 ease-out hover:-translate-y-1 hover:scale-[1.03] hover:border-gold/50 hover:bg-offwhite/[0.09] motion-reduce:transform-none motion-reduce:transition-none border-offwhite/10 bg-offwhite/[0.04]`}
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-offwhite/[0.08]">
                    <Icon className="size-5 text-offwhite" aria-hidden="true" />
                  </span>
                  <span className="lg:hidden">
                    <StepNumber n={i + 1} />
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold">
                  <span className="sr-only">Langkah {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-2 leading-relaxed text-offwhite/80">{step.description}</p>
                <ul className="mt-6 space-y-3 text-sm text-offwhite/80">
                  {step.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 size-2 shrink-0 rounded-full bg-gold ring-4 ring-gold/20"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
