# Video promo Tetra Studio (Remotion)

Video Reels/Story 1080x1920, 15 detik: logo Tetra, "Website kami sudah live", alamat website, dan rekaman scroll website live di mockup HP.

Folder ini terpisah dari website (bukan bagian npm workspaces), jadi dependency Remotion tidak ikut ke build atau deploy website.

```bash
cd video
npm install
npm run capture   # ambil ulang screenshot halaman HP dari https://buildwithtetra.com (butuh Google Chrome)
npm run studio    # pratinjau dan edit di Remotion Studio
npm run render    # hasil: ../promo/tetra-live-reels.mp4
```

- Animasi ada di `src/LiveReel.tsx` (teks, warna, durasi tiap bagian: `SCROLL_START`, `TRAVEL`, `HOLD`).
- `npm run capture` menulis `public/page-*.png`, `public/navbar.png`, dan `src/page.json`. Jalankan lagi setiap kali website berubah.
- Lisensi Remotion: gratis untuk individu dan tim kecil (sampai 3 orang). Cek https://remotion.dev/license bila tim bertambah.
