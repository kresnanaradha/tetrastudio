// Dipakai saat build untuk merender halaman ke HTML statis (prerender), supaya isi terbaca tanpa JavaScript.
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import { site } from './content/site'

export const render = () =>
  renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )

export const siteUrl = site.brand.url

/** Data terstruktur FAQPage dari isi FAQ yang tampil di halaman (jawaban yang masih TODO dilewati). */
export const faqJsonLd = () =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: site.faq.items
      .filter((item) => !item.a.includes('TODO'))
      .map((item) => ({
        '@type': 'Question',
        name: item.q.replace(/"/g, ''),
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
  }).replace(/</g, '\\u003c')
