import { site } from '@/content/site'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Why } from '@/components/Why'
import { Services } from '@/components/Services'
import { Process } from '@/components/Process'
import { Packages } from '@/components/Packages'
import { Work } from '@/components/Work'
import { Faq } from '@/components/Faq'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { FloatingWa } from '@/components/shared'

export default function App() {
  return (
    <>
      <a
        href="#konten"
        className="sr-only z-[60] rounded bg-navy px-4 py-3 font-semibold text-offwhite focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {site.nav.skip}
      </a>
      <Navbar />
      <main id="konten" tabIndex={-1} className="outline-none">
        <Hero />
        <Why />
        <Services />
        <Process />
        <Packages />
        <Work />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingWa message={site.whatsappMessages.consult} label={site.nav.floatingLabel} />
    </>
  )
}
