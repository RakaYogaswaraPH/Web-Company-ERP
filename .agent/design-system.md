---
trigger: always_on
---

# Design System — Landing Page ERP Jamparing Masagi

## 1. Hindari "AI Slop"

Yang bikin tampilan kerasa generik/AI-generated dan harus dihindari:

- Copywriting generik yang nggak ngomong apa-apa ("Solusi Terdepan untuk Masa Depan Anda", "Mitra Terpercaya di Industri Ini", "Ekosistem Digital Terintegrasi"). Ganti dengan klaim konkret tentang tiap produk — apa fungsinya, untuk siapa (mis. "DIGIARS menyimpan dan mencari dokumen arsip perusahaan secara digital", bukan "solusi arsip masa depan").
- Dilarang lorem ipsum, statistik karangan ("dipercaya 500+ perusahaan" tanpa data nyata), testimoni karangan, klaim sertifikasi karangan.
- **Dilarang "eyebrow text"**: teks kecil huruf kapital berspasi lebar di atas judul besar (mis. "— PRODUK KAMI —", "OUR ECOSYSTEM"). Langsung ke headline yang kuat tanpa label kecil basa-basi.
- Ikon di depan setiap heading/section/list item sebagai dekorasi semata. Ikon dipakai hanya kalau fungsional: navigasi, social link, status, form field, dan **satu ikon representasional per produk** — bukan pemanis visual yang muncul di mana-mana.
- Kombinasi efek berlebihan di satu elemen yang sama (gradient + shadow + border + icon sekaligus di tiap card) — maksimal 1-2 aksen visual per komponen, konsisten di seluruh halaman.
- Layout simetris generik tanpa hierarki visual jelas — pastikan tiap section punya elemen yang jelas paling penting (biasanya headline + 1 CTA). Khusus section produk: jangan render ke-5 produk dalam grid kartu identik rata semua — IurMoney (coming soon) harus kelihatan beda treatment-nya (lebih redup/placeholder), bukan dibesar-besarkan setara produk yang sudah live.
- Info produk yang belum diberikan user (nama final IurMoney, detail fitur pasti, screenshot yang belum ada) ditulis `TODO(isi-konten): ...` di `src/data/products.ts`. Jangan mengarang fakta produk.

## 2. Aturan Icon per Produk

Icon cuma dipakai untuk: navigasi (hamburger/close, panah slider), social link, kontak (telepon, email, WhatsApp), dan satu icon representasional per produk yang benar-benar menggambarkan fungsinya — bukan icon generik asal pasang:

- **DIGIARS** → icon arsip/folder/dokumen (`archive`, `folder-open`).
- **WMS** → icon terkait air/sensor (`droplet`, `gauge`, `activity`) — bukan icon rumah/pipa generik yang nggak menggambarkan "pemantauan IoT".
- **IurMoney** → icon terkait pembayaran/iuran (`receipt`, `wallet`) — tetap representasional meski belum rilis.
- **HRIS Masagi** → icon terkait orang/tim (`users`, `id-card`).
- **AbsensiKu** → icon terkait waktu/kehadiran (`clock`, `fingerprint`, `calendar-check`).

Dilarang emoji di UI.

## 3. Visual Produk: Screenshot, Bukan Ilustrasi Abstrak

- Screenshot/mockup asli tiap aplikasi (dari `public/assets/products/<slug>/`) adalah bukti visual utama — jauh lebih kuat daripada ilustrasi generik untuk produk ERP nyata.
- Tampilkan screenshot di dalam "frame" sederhana (border tipis + sedikit shadow meniru window browser/mobile), bukan mockup device 3D berlebihan.
- Jangan meregangkan atau mengubah rasio screenshot maupun logo.
- Kalau screenshot IurMoney belum ada: jangan bikin mockup UI fiktif detail. Cukup teaser teks + icon representasional + badge "Coming Soon".

## 4. Aturan Teknis Tailwind

- Semua styling wajib lewat utility class Tailwind v4 bawaan. Tidak ada file `.css` custom selain `globals.css` (isinya cuma `@import "tailwindcss"` + blok `@theme` token warna/font — bukan custom class/selector CSS manual).
- Kalau butuh warna/spacing/font custom di luar default Tailwind, definisikan sebagai token di `@theme` (Bagian 5) supaya tetap dipakai sebagai utility class biasa (`bg-brand-600`, bukan `bg-[#123456]` berulang-ulang di banyak file).
- Dilarang class dinamis hasil string concat (`bg-${warna}-500`) — penting karena tiap produk kemungkinan punya aksen warna/icon beda. Gunakan object map berisi class lengkap per produk, bukan concat string.
- Maksimal 2 keluarga font (satu untuk heading, satu untuk body).
- Status badge "Coming Soon" pakai treatment netral (`bg-background` + border navy tipis + teks kecil), **bukan** warna mencolok/berkedip — ini penanda status, bukan promosi.

## 5. Palet Warna — Blue-Black-Red, tapi Cerah

Base-nya terang: background utama putih/abu sangat muda, navy dipakai sebagai aksen kuat (bukan background penuh), merah sebagai accent/CTA.

`src/app/globals.css`:

```css
@import "tailwindcss";

@theme {
  --color-background: #fafafa;
  --color-foreground: #0b1221;

  --color-navy-50: #eef2fa;
  --color-navy-600: #1c3a6e;
  --color-navy-900: #0b1d3a;

  --color-accent-500: #d6293e;
  --color-accent-600: #b81f33;

  --font-display: "Nama Font Display", sans-serif;
  --font-body: "Nama Font Body", sans-serif;
}
```

*(TODO(isi-konten): kalau Jamparing Masagi punya hex warna brand resmi, ganti nilai di atas dengan hex tersebut.)*

Pemakaian:

- Background halaman: `bg-background` (putih/abu muda) — bukan navy penuh, biar nggak gelap.
- Navy (`navy-900`/`navy-600`): header/nav bar, footer, headline besar, tombol secondary, border aksen — jadi "jangkar" warna gelap tanpa mendominasi seluruh layar.
- Merah (`accent-500`): CTA button utama ("Request Demo"), badge highlight, underline aksen, hover state tombol penting — dipakai sedikit tapi konsisten supaya tetap "pop", bukan berlebihan. Jangan dipakai di section "Coming Soon" supaya nggak kesan buru-buru jualan sesuatu yang belum ada.
- Teks body: `foreground` (nyaris hitam-kebiruan, bukan `#000` murni, biar lebih soft).

Hasilnya: halaman tetap terasa terang/lega, tapi identitas blue-black-red tetap kebaca lewat navy di struktur (nav, footer, heading) dan merah di titik-titik aksi.

## 6. Rules Responsif

- Mobile-first: tulis class default untuk mobile dulu, baru override pakai prefix `sm: md: lg: xl: 2xl:` untuk layar lebih besar.
- Jangan pakai `h-[angka tetap]` untuk container yang isinya teks dinamis (nama produk, deskripsi fitur) — pakai `min-h-*` atau biarkan auto, supaya teks panjang nggak kepotong/overflow.
- Semua gambar/screenshot: `w-full h-auto` atau pakai `aspect-*` + `object-cover` di dalam container fleksibel — jangan fixed pixel width yang bisa overflow di layar kecil.
- Test breakpoint minimal di: 320px, 375px, 768px, 1024px, 1440px+. Cek khususnya: navbar (perlu hamburger di mobile?), grid 5 produk (nggak timpang di baris terakhir?), screenshot produk (kepotong/blur di mobile?).
- Pakai data produk asli terpanjang (deskripsi/nama fitur terpanjang di `products.ts`) sebagai acuan test, bukan teks placeholder pendek.
- Pakai `text-balance` / `text-pretty` (utility Tailwind v4) untuk heading supaya nggak ada baris terakhir kepotong aneh (orphan word).
