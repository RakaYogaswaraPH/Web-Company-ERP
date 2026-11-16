---
trigger: always_on
---

# AGENTS.md — Landing Page ERP Jamparing Masagi

Rules & Setup Project (Next.js + Tailwind v4) untuk Antigravity — dari instalasi dari nol sampai arsitektur dasar. Rules yang lebih spesifik per topik ada di `.agents/rules/*.md` (security, design-system, pwa, dev-workflow) — baca semuanya sebelum mulai kerja, jangan cuma file ini.

## 1. Cara Pakai Dokumen Ini

Antigravity baca `AGENTS.md` di root otomatis, plus semua file di `.agents/rules/*.md` yang punya frontmatter trigger (`always_on`, `model_decision`, `glob`, `manual`). File ini isinya ringkasan project + rules paling krusial (arsitektur & setup). Detail security, design system/palet, PWA, dan workflow dev ada di file terpisah supaya nggak jadi satu file raksasa.

Folder `Assets/` yang sudah disiapkan dipakai sebagai source gambar asli (logo Jamparing Masagi + screenshot tiap aplikasi) — nanti dipindah ke `public/assets/...` saat setup (lihat Bagian 3 & 4). Folder `Assets/` ini **read-only**, jangan diubah/dipindah/dihapus — yang diubah cuma hasil copy-nya di `public/`.

## 2. Project Brief

Ini landing page **baru dari nol** (bukan redesign dari Figma yang sudah ada) untuk memperkenalkan portofolio aplikasi ERP milik **Jamparing Masagi**. Ada 5 produk yang ditampilkan:

| Produk | Fungsi | Status |
|---|---|---|
| **DIGIARS** | Digital arsip — penyimpanan & pencarian dokumen perusahaan | Live |
| **WMS (Water Management System)** | Aplikasi IoT untuk memantau pemakaian/pajak air | Live |
| **IurMoney** *(nama sementara — ganti kalau sudah ada nama resmi)* | Perhitungan & penagihan iuran bulanan (money collection) | **Coming Soon** |
| **HRIS Masagi** *(nama sementara)* | Manajemen SDM/karyawan (HRD): data karyawan, payroll, cuti | Live |
| **AbsensiKu** *(nama sementara)* | Absensi karyawan (check-in/out, laporan kehadiran) | Live |

Stack: Next.js (App Router, static export) + Tailwind CSS v4, TypeScript, PWA (Serwist). Project masih kosong, belum ada instalasi apa pun.

Aset gambar sudah ada di folder `Assets/`:
- `Logo/` → logo Jamparing Masagi (induk)
- `Screenshots/digiars/`, `Screenshots/wms/`, `Screenshots/money-collection/`, `Screenshots/hris/`, `Screenshots/absensi/` → tangkapan layar UI asli tiap aplikasi

> Catatan scope: landing page ini **hanya memperkenalkan** 5 aplikasi di atas (marketing/showcase, bukan aplikasi ERP-nya sendiri). Jangan membangun fitur login/dashboard/backend fungsional tiap aplikasi di project ini — itu produk terpisah. Kalau butuh fitur yang menyerempet fungsional sungguhan (misal form "request demo" yang nyimpen data), tanya dulu sebelum dikerjakan.

Ikuti `AGENTS.md` ini dan seluruh file di `.agents/rules/` sebagai acuan wajib untuk arsitektur, keamanan, workflow dev, PWA, design system, dan palet warna. **Jangan menyimpang dari rules tersebut tanpa konfirmasi dulu.**

Info yang belum pasti (nama final IurMoney, screenshot IurMoney yang belum ada karena masih coming soon, hex warna brand resmi, channel CTA) ditandai `TODO(isi-konten)` di kode, jangan dikarang.

Mulai dari: setup project sesuai Bagian 3, lalu bangun struktur folder sesuai Bagian 4, baru masuk ke pengerjaan halaman per section.

### Prompt task pertama (tempel di Agent Manager)

```
Saya sedang membangun landing page baru untuk memperkenalkan portofolio 5 aplikasi ERP
milik Jamparing Masagi: DIGIARS, WMS, IurMoney (coming soon), HRIS Masagi, dan AbsensiKu.

Stack: Next.js (App Router, static export) + Tailwind CSS v4, TypeScript, PWA (Serwist).
Project ini masih kosong, belum ada instalasi apapun.

Aset gambar sudah ada di folder Assets/:
- Logo/ -> logo Jamparing Masagi

Ikuti AGENTS.md dan seluruh file di .agents/rules/ sebagai acuan wajib untuk arsitektur,
keamanan, workflow dev, PWA, design system, dan palet warna. Jangan menyimpang dari rules
tersebut tanpa konfirmasi ke saya dulu.

Mulai dari: setup project sesuai Bagian 3, lalu bangun struktur folder sesuai Bagian 4,
baru masuk ke pengerjaan halaman per section (hero, product showcase, kenapa pilih kami, CTA, footer).
```

## 3. Setup & Instalasi Dependency (dari Nol)

Jalankan dari dalam folder root project (mis. `ERP_Jamparing_Masagi/`).

### 3.1 Inisialisasi Next.js

```
npx create-next-app@latest . --typescript --eslint --app --src-dir --import-alias "@/*"
```

Saat prompt Tailwind muncul, pilih Yes — versi terbaru `create-next-app` otomatis memasang Tailwind v4, bukan v3.

Cek versinya:

```
npm ls tailwindcss
```

Harus `4.x`. Kalau ternyata masih v3, install manual:

```
npm install tailwindcss @tailwindcss/postcss postcss
```

`postcss.config.mjs`:

```js
export default {
  plugins: { "@tailwindcss/postcss": {} },
};
```

`src/app/globals.css` cukup:

```css
@import "tailwindcss";
```

Tailwind v4 tidak lagi pakai `tailwind.config.js` — semua theme token (warna, font, spacing custom) didefinisikan langsung di CSS lewat blok `@theme` (contoh ada di `.agents/rules/design-system.md`).

### 3.2 Static Export Mode

Di `next.config.ts`:

```ts
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  productionBrowserSourceMaps: false,
};
```

Karena `output: "export"`, tidak ada server Next.js yang jalan saat production — Image Optimization API bawaan `next/image` nggak bisa dipakai (makanya `unoptimized: true`), dan konfigurasi `headers()` di `next.config.ts` tidak berlaku. Security headers wajib diatur di level hosting (lihat `.agents/rules/security.md`).

### 3.3 Dependency Tambahan

```
# Animasi
npm install motion

# PWA
npm install @serwist/next
npm install -D serwist

# Quality tooling
npm install -D prettier prettier-plugin-tailwindcss husky lint-staged
```

- `motion` dipakai untuk animasi/transition yang nggak bisa dicover utility class murni — layout & styling tetap lewat Tailwind.
- `prettier-plugin-tailwindcss` otomatis urutin class Tailwind biar konsisten.
- Kalau butuh ikon, cukup `lucide-react` dan import per-ikon (bukan library ikon raksasa) — dan pakai seperlunya sesuai `.agents/rules/design-system.md`, jangan taruh ikon di tiap heading/list.

### 3.4 Pindahkan Assets

Salin `Assets/Logo` dan `Assets/Screenshots/<slug>` ke `public/assets/logo` dan `public/assets/products/<slug>`. Sebelum disalin:

1. Compress & convert ke WebP/AVIF (pakai `sharp-cli`, Squoosh, atau TinyPNG) — static export nggak optimasi gambar saat request, jadi harus dioptimasi manual di source.
2. Strip metadata EXIF/GPS dari foto apa pun yang ada orangnya (mis. kalau nanti ada foto tim di halaman Tentang).
3. Rename file ke kebab-case tanpa spasi (`digiars-dashboard-list.webp`, bukan `DIGIARS Dashboard List.png`).
4. Kalau screenshot untuk **IurMoney** belum tersedia (karena masih coming soon), jangan bikin mockup fiktif detail — tandai `TODO(isi-konten): screenshot IurMoney belum ada` dan pakai treatment teaser (lihat `.agents/rules/design-system.md`).

## 4. Struktur Folder & Clean Code Architecture

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── manifest.ts
│   ├── sw.ts
│   ├── robots.ts
│   ├── sitemap.ts
│   └── globals.css
├── components/
│   ├── ui/            # atom: Button, Badge, Container, StatusBadge ("Coming Soon")
│   ├── layout/         # Navbar, Footer, MobileMenu
│   └── sections/       # Hero, ProductShowcase, WhyUs, CTA, Footer
├── data/               # sumber data statis, typed
│   └── products.ts     # satu-satunya sumber data 5 produk (nama, tagline, fitur, status, screenshot)
├── lib/                # helper murni (format, cn(), dsb)
├── types/              # interface/type bersama (Product, ProductStatus "live" | "coming-soon")
└── config/
    └── site.ts         # nama perusahaan, nav links, metadata SEO default
```

Konvensi penamaan:

- Komponen React: `PascalCase.tsx` (`ProductCard.tsx`), satu komponen utama per file.
- File non-komponen (hook, util, data): konsisten pakai `kebab-case.ts` untuk nama file, `camelCase` untuk isi function/variable.
- Konstanta global: `UPPER_SNAKE_CASE`.
- Folder: selalu lowercase/kebab-case, jangan campur gaya.
- Satu komponen = satu tanggung jawab. Kalau section page sudah > ±150 baris JSX, pecah jadi sub-komponen di folder yang sama.

Aturan data: jangan hardcode nama/deskripsi/fitur produk langsung di JSX. Semua didefinisikan di `src/data/products.ts` dengan tipe eksplisit, lalu di-`map()` ke komponen. Ini bikin nambah/ganti info produk cukup edit data file, nggak perlu sentuh komponen.

```ts
// data/products.ts
export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  status: "live" | "coming-soon";
  icon: string; // nama icon lucide-react, mis. "archive"
  screenshot?: string; // path relatif ke /public/assets/products/<slug>, opsional kalau belum ada
}

export const products: Product[] = [
  {
    slug: "digiars",
    name: "DIGIARS",
    tagline: "Digital arsip untuk dokumen perusahaan",
    description: "TODO(isi-konten): deskripsi lengkap DIGIARS dari user",
    features: ["TODO(isi-konten)"],
    status: "live",
    icon: "archive",
    screenshot: "/assets/products/digiars/dashboard.webp",
  },
  // ...wms, money-collection (IurMoney), hris, absensi
];
```

Optimasi:

- Pakai `next/image` untuk semua gambar (tetap, meski `unoptimized: true` — tetap dapat lazy-loading native & `alt` wajib diisi, mis. "Tampilan dashboard DIGIARS").
- Komponen berat yang bukan above-the-fold (mis. modal galeri screenshot) pakai `dynamic()` import.
- Hindari `"use client"` di komponen yang nggak butuh interaktivitas — biar tetap jadi server component dan ter-render statis saat build.

## 5. Rules Lain (Wajib Dibaca)

- `.agents/rules/security.md` — header keamanan, secrets, form CTA, supply chain.
- `.agents/rules/design-system.md` — anti "AI slop", aturan icon per produk, palet warna.
- `.agents/rules/pwa.md` — setup Serwist, manifest, icon PWA.
- `.agents/rules/dev-workflow.md` — kapan restart dev server, checklist sebelum deploy.
