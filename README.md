# Website Tetra Studio (v1)

Company profile one-page Tetra Studio. React, Vite, TypeScript, Tailwind CSS v4. Tanpa backend: semua kontak lewat WhatsApp.

## Menjalankan

```bash
npm install
npm run dev            # server development
npm run build          # check:dashes, cek tipe, build, lalu prerender ke client/dist
npm run preview        # lihat hasil build
npm run check:dashes   # gagal bila ada em dash atau en dash di repository
```

Butuh Node.js 20 ke atas.

## Mengubah isi website

Semua teks, kontak, flag, paket, FAQ, karya, dan tim ada di **`client/src/content/site.ts`**. Komponen tidak perlu disentuh.

| Flag | Fungsi |
| --- | --- |
| `services.items[].available` | `false` menampilkan lencana "Segera Hadir" tanpa tombol |
| `packages.items[].highlighted` | `true` menampilkan "Paling Populer". Jangan diaktifkan tanpa dasar data |
| `work.items` | Daftar proyek di bagian "Our Projects". Kosong menampilkan empty state |

Aturan bisnis: harga paket tidak pernah ditampilkan, dan proyek klien hanya boleh tampil di Karya dengan izin klien.

## Struktur

```
client/
  index.html                 meta SEO, Open Graph, JSON-LD (statis)
  src/content/site.ts        semua teks
  src/components/            Navbar, Hero, Why, Services, Process, Packages, Work, Faq, Contact, Footer, shared
  src/components/ui/         scroll-statement.tsx (+ fallback GSAP)
  src/lib/                   whatsapp.ts (URL wa.me), analytics.ts (track)
  public/                    404.html, favicon.svg, og-image.png, robots.txt, sitemap.xml, images/
scripts/check-dashes.mjs
```

`client/components.json` dan alias `@/*` sudah disiapkan untuk CLI shadcn. Saat menambah komponen pertama (`npx shadcn@latest add ...`), CLI akan meminta `src/lib/utils.ts` beserta dependensinya (`clsx`, `tailwind-merge`).

## Deploy

Hosting statis (Vercel, Netlify, atau Cloudflare Pages):

- Build command: `npm run build`
- Output directory: `client/dist`
- 404: `404.html` statis sudah ikut di build. Netlify dan Cloudflare Pages otomatis memakainya. Tidak perlu aturan rewrite SPA.

## Catatan teknis

- **Scroll Statement** (Hero "we craft Pixels. Code. Strategy."; bagian "we can" dari PRD 5.13 dihapus atas permintaan pemilik agar efek tidak muncul dua kali): browser yang mendukung CSS `animation-timeline: view()` memakai CSS murni. Browser lain memuat GSAP lewat dynamic import, jadi `gsap` tidak masuk bundle awal. Tidak memakai Tweakpane dan tidak mengubah elemen `html`. Mati saat `prefers-reduced-motion`.
- **Analitik**: `track('whatsapp_click', { location })` dipanggil di setiap tombol WhatsApp (`navbar`, `hero`, `paket-basic`, `paket-standar`, `paket-premium`, `karya-empty`, `cta-akhir`, `floating` untuk tombol melayang, `layanan-automation`, `footer`). Saat ini hanya mencatat ke console di development.
- **Font**: Newsreader (judul) dan Hanken Grotesk (isi) dari Google Fonts dengan `display=swap`. Bisa dipindah ke self-hosted bila diinginkan.
- **SEO**: domain ditulis sekali di `brand.url` (`site.ts`). Saat build, `scripts/prerender.mjs` mengisi canonical, `og:url`, `og:image`, JSON-LD, `robots.txt`, dan `sitemap.xml` dengan domain itu, serta membuat data terstruktur FAQPage dari isi FAQ. Ganti domain cukup di satu baris itu.
- **Prerender**: setelah build, `scripts/prerender.mjs` merender React ke HTML statis di `client/dist/index.html` (memakai `react-dom/server` yang sudah terpasang, tanpa plugin). Isi halaman terbaca Google tanpa JavaScript, lalu React meng-hydrate di browser.
- **FAQ** memakai `<details>` bawaan browser (aksesibel dengan keyboard tanpa JavaScript).

## Daftar TODO sebelum peluncuran

Data (cari teks `TODO` di `site.ts`):
- [ ] Estimasi hari kerja (FAQ nomor 1)
- [ ] Daftar karya (`work.items`), dengan izin klien untuk proyek klien
- [ ] Apakah Pixels dan Strategy sudah dijual (`services.items[].available`)

SEO setelah live (tidak bisa dari kode):
- [ ] Daftarkan https://buildwithtetra.com di Google Search Console (properti Domain, verifikasi lewat DNS), lalu kirim `sitemap.xml`
- [ ] Buat Google Business Profile "Tetra Studio" di Bali
- [ ] Pasang link buildwithtetra.com di bio Instagram @buildwithtetra
- [ ] Pastikan http://buildwithtetra.com diarahkan ke https (saat ini tidak merespons)

Aset dan keputusan:
- [ ] Tangkapan layar karya untuk menggantikan mockup CSS di Hero (`Hero.tsx`, WebP dengan `width`, `height`, `fetchpriority="high"`)
- [ ] `og-image.png` final hasil desain (versi sekarang placeholder sederhana)
- [ ] Logo versi SVG resmi (simbol di navbar dan favicon saat ini digambar ulang dari PNG)
- [ ] Font final
- [ ] Alat analitik (Plausible atau GA4), lalu isi `client/src/lib/analytics.ts`
- [ ] Target audiens final, untuk menyesuaikan teks
- [ ] **Lisensi komponen scroll** dari demo publik jh3yy: pastikan boleh dipakai komersial
- [ ] Pilihan hosting
- [ ] Audit Lighthouse mobile setelah deploy (target 90 ke atas di keempat kategori)
- [ ] Formulir lead dengan backend Express (Fase 2), hanya jika disetujui
