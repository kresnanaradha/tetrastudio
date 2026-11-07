// Semua teks website Tetra Studio ada di file ini.
// Cukup edit nilai di bawah untuk mengubah isi website, tanpa menyentuh komponen.
// Nilai yang diawali "TODO" belum final dan harus diganti sebelum peluncuran (lihat README).

export type NavLink = { label: string; href: `#${string}` }
// action: tombol di kartu layanan yang tersedia. 'paket' = ke bagian Paket, 'whatsapp' = chat konsultasi.
export type Service = { pillar: string; title: string; description: string; available: boolean; action?: 'paket' | 'whatsapp' }
export type Step = { title: string; description: string; points: string[] }
export type PackageId = 'basic' | 'standar' | 'premium'
export type Package = { id: PackageId; name: string; tagline: string; highlighted: boolean }
type Cell = boolean | string
export type FeatureRow = { label: string; values: [Cell, Cell, Cell] }
export type WorkItem = {
  title: string
  category: string
  kind: 'Proyek Konsep' | 'Klien'
  image: { src: string; width: number; height: number; alt: string }
  url?: string
}
export type Faq ={ q: string; a: string }

export const contact = {
  // Nomor WhatsApp format internasional tanpa "+" dan spasi (dipakai untuk tautan wa.me)
  whatsapp: '6281339300119',
  // Nomor yang ditampilkan ke pengunjung
  whatsappDisplay: '0813 3930 0119',
  // Username Instagram tanpa "@"
  instagram: 'buildwithtetra',
  email: 'buildwithtetra@gmail.com',
  location: 'Bali, Indonesia',
}

export const site = {
  brand: {
    name: 'Tetra Studio',
    tagline: 'Pixels. Code. Strategy.',
    description:
      'Agensi kreatif dan teknologi di Bali yang merancang ekosistem digital terintegrasi, digerakkan oleh tiga kolaborator lintas disiplin.',
  },

  whatsappMessages: {
    consult: 'Halo Tetra Studio, saya ingin konsultasi gratis untuk website bisnis saya.',
    // {paket} diganti otomatis dengan nama paket
    package: 'Halo Tetra Studio, saya tertarik dengan paket {paket}. Boleh minta penawarannya?',
    automation: 'Halo Tetra Studio, saya ingin konsultasi soal automation untuk bisnis saya.',
    work: 'Halo Tetra Studio, saya ingin website untuk bisnis saya.',
  },

  nav: {
    skip: 'Lewati ke konten',
    homeLabel: 'Tetra Studio, ke beranda',
    menuOpen: 'Buka menu',
    menuClose: 'Tutup menu',
    cta: 'Konsultasi Gratis',
    floatingLabel: 'Chat WhatsApp Tetra Studio',
    links: [
      { label: 'Layanan', href: '#layanan' },
      { label: 'Cara Kerja', href: '#cara-kerja' },
      { label: 'Paket', href: '#paket' },
      { label: 'Karya', href: '#karya' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Kontak', href: '#kontak' },
    ] satisfies NavLink[],
  },

  hero: {
    // Teks diam di sebelah kiri, lalu kata yang menyala bergantian saat di-scroll
    prefix: 'we craft',
    headline: ['Pixels.', 'Code.', 'Strategy.'],
    srHeadline: 'Pixels. Code. Strategy. Tetra Studio, jasa pembuatan website di Bali.',
    subtitle:
      'Tetra Studio merancang dan membangun website untuk bisnis: cepat dibuka di HP, rapi dilihat, dan jelas mengarahkan pengunjung untuk menghubungimu. Bedanya, kami buatkan preview-nya lebih dulu. Lihat dulu hasilnya, baru putuskan.',
    primaryCta: 'Konsultasi Gratis',
    secondaryCta: 'Lihat Cara Kerja',
    ctaNote: 'Konsultasi dan preview gratis, tanpa kewajiban lanjut.',
    meta: ['Bali, Indonesia', 'Website untuk bisnis', 'Jalur build-first'],
  },

  why: {
    label: 'Kenapa',
    title: 'No Website? We Need to Talk.',
    body: 'Sebelum datang ke kafe baru, memesan villa, atau memakai sebuah jasa, kebanyakan orang mencarinya di Google lebih dulu. Mereka ingin melihat layanan, lokasi, jam buka, dan tanda bahwa bisnismu sungguhan. Kalau informasi itu tidak ditemukan, mereka beralih ke pilihan berikutnya.',
    benefits: [
      {
        title: 'Always Accessible',
        description:
          'Website bekerja 24/7. Calon pelanggan bisa melihat layanan, lokasi, dan cara menghubungimu kapan saja, bahkan saat kamu sedang sibuk melayani pelanggan lain.',
      },
      {
        title: 'Build Trust',
        description:
          'Tampilan yang rapi dan informasi yang jelas membuat bisnismu terlihat serius. Orang lebih yakin menghubungi bisnis yang punya rumah resmi di internet.',
      },
      {
        title: 'Be Easier to Find',
        description:
          'Website membuka peluang bisnismu muncul di hasil pencarian Google, bukan hanya terlihat oleh orang yang sudah mengikuti akun media sosialmu.',
      },
    ],
    closingLead: 'Media sosial bagus untuk menjangkau audiens. Website jadi rumah bisnismu, tempat semua informasi penting berkumpul.',
    closingPunch: 'Why not have both?',
  },

  services: {
    label: 'Layanan',
    title: 'Yang kami kerjakan.',
    intro:
      'Tetra Studio digerakkan oleh tiga kolaborator lintas disiplin: visual, teknologi, dan strategi. Saat ini fokus kami adalah website dan otomatisasi alur kerja, dirancang khusus untuk bisnismu, bukan template yang sama untuk semua orang.',
    comingSoon: 'Segera Hadir',
    cta: 'Lihat Paket',
    ctaWhatsapp: 'Konsultasi Automation',
    // TODO: pastikan apakah Pixels dan Strategy sudah siap dijual, lalu ubah "available"
    items: [
      {
        pillar: 'Pixels',
        title: 'Visual & Design',
        description:
          'Foto, video, dan konten visual yang membangun identitas brand, supaya bisnismu langsung dikenali di website maupun media sosial.',
        available: false,
      },
      {
        pillar: 'Code',
        title: 'UI/UX & Web Development',
        description:
          'Kami merancang tampilan yang mudah dipahami pengunjung, lalu membangunnya menjadi website yang cepat, responsif di semua ukuran layar, dan siap menerima pertanyaan calon pelanggan lewat WhatsApp.',
        available: true,
        action: 'paket',
      },
      {
        pillar: 'Automation',
        title: 'Workflow Automation dengan n8n',
        description:
          'Kami hubungkan website, WhatsApp, Google Sheets, email, dan tools lain yang kamu pakai, supaya pekerjaan berulang seperti mencatat lead, mengirim notifikasi, atau merekap data berjalan otomatis. Kamu fokus melayani pelanggan, sistem yang mengurus sisanya.',
        available: true,
        action: 'whatsapp',
      },
      {
        pillar: 'Strategy',
        title: 'Digital Marketing',
        description:
          'Strategi agar brand menjangkau audiens yang tepat dan makin terlihat online, dari pencarian Google sampai media sosial.',
        available: false,
      },
    ] satisfies Service[],
  },

  process: {
    label: 'Cara Kerja',
    title: 'Lihat Dulu Hasilnya, Baru Putuskan.',
    intro:
      'Biasanya kamu harus membayar dulu sebelum melihat hasilnya. Kami membalik urutannya: kamu melihat gambaran website-mu lebih dulu, lalu memutuskan apakah ingin lanjut.',
    steps: [
      {
        title: 'Konsultasi Gratis',
        description:
          'Ceritakan bisnismu, siapa pelangganmu, dan apa yang ingin dicapai lewat website. Kami dengarkan dulu sebelum menyarankan apa pun.',
        points: ['Ngobrol langsung lewat WhatsApp', 'Gratis, tanpa kewajiban', 'Kami bantu petakan kebutuhan website-mu'],
      },
      {
        title: 'Preview Gratis',
        description:
          'Dari obrolan itu, kami buatkan gambaran website-nya lebih dulu, supaya kamu bisa menilai arah desainnya dengan mata sendiri.',
        points: ['Lihat hasilnya sebelum memutuskan', 'Tanpa kewajiban melanjutkan', 'Masukanmu jadi bahan penyempurnaan'],
      },
      {
        title: 'Deal',
        description:
          'Cocok dengan hasilnya? Kita sepakati paket dan lingkup kerjanya secara tertulis, lalu pengerjaan dimulai.',
        points: ['Pilih paket yang sesuai', 'Tanda tangan perjanjian', 'Bayar DP'],
      },
      {
        title: 'Launch',
        description:
          'Website disempurnakan sesuai masukanmu, diuji di berbagai perangkat, lalu diluncurkan dengan domain atas nama bisnismu.',
        points: ['Revisi sesuai paket', 'Pengujian sebelum tayang', 'Domain dan hosting tahun pertama termasuk'],
      },
    ] satisfies Step[],
  },

  packages: {
    label: 'Paket',
    title: 'Tiga paket, satu proses.',
    intro:
      'Semua paket sudah termasuk desain, domain dan hosting tahun pertama, serta pengujian sebelum tayang. Harga kami sampaikan lewat proposal, setelah kami paham kebutuhan bisnismu.',
    featureLabel: 'Fitur',
    yes: 'Ya',
    no: 'Tidak',
    popular: 'Paling Populer',
    cta: 'Minta Penawaran',
    note: 'Konsultasi awal gratis. Butuh fitur khusus seperti payment gateway atau sistem booking? Kami hitungkan terpisah sesuai kebutuhanmu.',
    // "highlighted: true" menampilkan penanda "Paling Populer". Jangan diaktifkan tanpa dasar data.
    items: [
      {
        id: 'basic',
        name: 'Basic',
        tagline: 'Website profesional pertama: profil, layanan, dan kontak dalam satu tempat.',
        highlighted: false,
      },
      {
        id: 'standar',
        name: 'Standar',
        tagline: 'Untuk bisnis yang ingin mulai ditemukan lewat Google, dengan SEO dasar.',
        highlighted: false,
      },
      {
        id: 'premium',
        name: 'Premium',
        tagline: 'Untuk kebutuhan khusus yang butuh fitur kustom dan ruang revisi paling longgar.',
        highlighted: false,
      },
    ] satisfies Package[],
    // Urutan nilai: Basic, Standar, Premium
    features: [
      { label: 'Desain UI/UX', values: [true, true, true] },
      { label: 'Desain responsif', values: [true, true, true] },
      { label: 'Domain dan hosting 1 tahun', values: [true, true, true] },
      { label: 'Perlindungan website', values: [true, true, true] },
      { label: 'Pengaturan kontak', values: [true, true, true] },
      { label: 'Pengujian dan peluncuran', values: [true, true, true] },
      { label: 'SEO dasar', values: [false, true, true] },
      { label: 'Fitur kustom', values: [false, false, true] },
      { label: 'Revisi', values: ['2 kali', '4 kali', '6 kali'] },
    ] satisfies FeatureRow[],
  },

  work: {
    label: 'Karya',
    title: 'Our Projects.',
    intro:
      'Setiap proyek di sini dimulai dari obrolan dan preview yang sama seperti yang akan kamu dapatkan.',
    empty: 'Karya pertama kami sedang dikerjakan. Mau jadi yang berikutnya?',
    emptyCta: 'Ngobrol di WhatsApp',
    visit: 'Lihat proyek',
    // TODO: isi daftar proyek. Proyek klien hanya boleh tampil dengan izin klien.
    // Contoh satu item:
    // {
    //   title: 'Nama Proyek',
    //   category: 'Website Restoran',
    //   kind: 'Klien', // atau 'Proyek Konsep'
    //   image: { src: '/images/karya/nama-proyek.webp', width: 1280, height: 800, alt: 'Halaman utama website Nama Proyek' },
    //   url: 'https://contoh.com', // opsional
    // },
    // Kosong: tampil ajakan "Karya pertama kami...". 1 sampai 3 proyek: grid. 4 proyek atau lebih: kartu bergulir.
    // Simpan screenshot di client/public/images/karya/ (WebP 1280x800: logo proyek versi emas di tengah latar navy #1e3a5f).
    items: [
      {
        title: 'Bali Water Activity',
        category: 'Website Watersport',
        kind: 'Klien',
        image: { src: '/images/karya/bali-water-activity.webp', width: 1280, height: 800, alt: 'Logo Bali Water Activity' },
        url: 'https://bali-water-activity.vercel.app/',
      },
      {
        title: 'Infusion Bali',
        category: 'Website Klinik IV Therapy',
        kind: 'Klien',
        image: { src: '/images/karya/infusion-bali.webp', width: 1280, height: 800, alt: 'Logo Infusion Bali' },
        url: 'https://naradh.my.id/projects/infusion-bali',
      },
      {
        title: 'FinSight',
        category: 'Asisten Keuangan AI untuk UMKM',
        kind: 'Proyek Konsep',
        image: { src: '/images/karya/finsight.webp', width: 1280, height: 800, alt: 'Logo FinSight' },
        url: 'https://finsight-dicoding.up.railway.app/',
      },
      {
        title: 'Accenprove',
        category: 'Platform Berita Acara Digital',
        kind: 'Proyek Konsep',
        image: { src: '/images/karya/accenprove.webp', width: 1280, height: 800, alt: 'Logo Accenprove' },
        url: 'https://accenprove.vercel.app/',
      },
      {
        title: 'Billens',
        category: 'Aplikasi Split Bill dengan AI',
        kind: 'Proyek Konsep',
        image: { src: '/images/karya/billens.webp', width: 1280, height: 800, alt: 'Logo Billens' },
        url: 'https://billens.vercel.app/',
      },
      {
        title: 'Notulis',
        category: 'AI Meeting Assistant',
        kind: 'Proyek Konsep',
        image: { src: '/images/karya/notulis.webp', width: 1280, height: 800, alt: 'Logo Notulis' },
        url: 'https://naradh.my.id/projects/notulis',
      },
    ] as WorkItem[],
  },

  faq: {
    label: 'FAQ',
    title: 'Yang sering ditanyakan.',
    intro: 'Belum menemukan jawabannya? Tanyakan langsung lewat WhatsApp, kami jawab dengan senang hati.',
    items: [
      {
        q: 'Berapa lama pembuatan website?',
        // TODO: isi estimasi hari kerja
        a: 'Estimasi TODO hari kerja sejak DP diterima dan materi lengkap.',
      },
      {
        q: 'Apa yang perlu saya siapkan?',
        a: 'Logo, teks tentang bisnismu, foto produk atau tempat, dan informasi kontak. Belum lengkap? Tidak masalah, kami bantu arahkan apa saja yang dibutuhkan saat kickoff.',
      },
      {
        q: 'Apakah domain dan hosting sudah termasuk?',
        a: 'Ya. Semua paket sudah termasuk domain dan hosting untuk tahun pertama, jadi kamu tidak perlu mengurusnya sendiri.',
      },
      {
        q: 'Berapa kali saya bisa revisi?',
        a: 'Basic 2 kali, Standar 4 kali, Premium 6 kali. Revisi dipakai untuk menyempurnakan detail setelah arah desain disepakati. Revisi tambahan bisa dikenakan biaya.',
      },
      {
        q: 'Apa itu preview gratis?',
        a: 'Sebelum ada kesepakatan apa pun, kami buatkan gambaran website-mu berdasarkan hasil konsultasi. Kalau cocok, kita lanjut. Kalau tidak, kamu tidak berkewajiban apa-apa.',
      },
      {
        q: 'Bagaimana setelah tahun pertama?',
        a: 'Tersedia layanan maintenance opsional yang mencakup perpanjangan domain dan hosting, keamanan, dan perbaikan teknis dasar.',
      },
      {
        q: 'Selain website, bisa bantu otomatisasi?',
        a: 'Bisa. Kami membangun automation dengan n8n untuk menghubungkan website, WhatsApp, Google Sheets, email, dan tools lain, supaya pekerjaan berulang berjalan sendiri. Ceritakan alur kerjamu sekarang, kami bantu petakan bagian mana yang bisa diotomatisasi.',
      },
      {
        q: 'Bisa tambah fitur khusus seperti payment gateway?',
        a: 'Bisa, misalnya payment gateway atau sistem booking. Fitur seperti ini dihitung terpisah sesuai kebutuhan dan kami jelaskan rinciannya di proposal.',
      },
      {
        q: '"Website itu mahal, kan?"',
        a: 'Belum tentu. Biayanya disesuaikan dengan kebutuhan dan skala bisnismu. Mulai saja dari yang kamu butuhkan. Konsultasi dan preview-nya gratis, jadi kamu bisa menilai dulu sebelum mengeluarkan biaya.',
      },
    ] satisfies Faq[],
  },

  contact: {
    label: 'Kontak',
    title: 'Your Ideas, Our Next Project.',
    body: 'Punya ide atau ingin bisnismu tampil lebih profesional secara digital? Ceritakan sedikit tentang bisnismu lewat WhatsApp. Kami bantu petakan kebutuhannya, lalu buatkan preview website-nya. Yuk, ngobrol dulu, gratis.',
    cta: 'Chat via WhatsApp',
    labels: { whatsapp: 'WhatsApp', instagram: 'Instagram', email: 'Email', location: 'Lokasi' },
  },

  footer: {
    tagline: 'Agensi kreatif dan teknologi di Bali. Kami merancang website dan automation untuk bisnis, dengan preview gratis sebelum kamu memutuskan.',
    navLabel: 'Navigasi footer',
    navTitle: 'Menu',
    contactTitle: 'Hubungi kami',
    copyright: 'Tetra Studio',
  },
}
