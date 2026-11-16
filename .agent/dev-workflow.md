---
trigger: always_on
---

# Rules Workflow — Kapan Harus Restart Dev Server

## 1. Tabel Restart

| Perubahan | Perlu restart `next dev`? |
|---|---|
| Komponen, page, layout (`.tsx`) | Tidak — Fast Refresh otomatis |
| `globals.css` / class Tailwind di JSX | Tidak |
| Data file (`src/data/products.ts`) | Tidak |
| Gambar/screenshot baru di `public/` | Tidak, cukup refresh browser |
| `next.config.ts` | **Ya** |
| `postcss.config.mjs` | **Ya** |
| `.env` / `.env.local` | **Ya** |
| Install/uninstall package (`package.json`) | **Ya** |
| `middleware.ts` (kalau dipakai) | **Ya**, restart manual untuk aman |
| `tsconfig.json` | Server nggak wajib, tapi restart TS server di editor |

Karena ini static export, jangan cuma andalkan `next dev` untuk validasi akhir — sebelum "selesai" di tiap fitur besar, jalankan build asli:

```
npm run build
npx serve out
```

`next dev` tidak 100% merepresentasikan hasil static export (ada perbedaan di image handling, routing trailing slash). Build asli adalah source of truth.

## 2. Aturan Kerja Agent

- Baca `AGENTS.md` dan semua file di `.agents/rules/` sebelum mulai. Jangan mengubah file rules.
- Buat Implementation Plan dulu. Kerjakan per fase dan commit per fase (Conventional Commits, mis. `feat(sections): add product showcase grid`).
- Kalau informasi kurang (nama final IurMoney, isi fitur tiap produk, hosting, hex warna brand, pilihan channel CTA), **tanya atau tandai `TODO(isi-konten)`**. Jangan mengarang fakta produk.
- Jangan membiarkan dev server menggantung. Sebutkan port yang dipakai, dan matikan kalau sudah nggak perlu.
- Kerjakan tepat sesuai permintaan. Jangan menambah halaman, fitur, atau library di luar scope (mis. jangan bikin fitur login/dashboard aplikasi ERP sungguhan) tanpa bertanya — ini landing page marketing, bukan aplikasi ERP itu sendiri.

## 3. Checklist Sebelum Deploy

- [ ] `npm run build` sukses tanpa warning signifikan
- [ ] Header security sudah dikonfigurasi di level hosting (bukan cuma di `next.config.ts`)
- [ ] Semua screenshot & logo sudah dikompres & di-convert WebP/AVIF
- [ ] Lighthouse score dicek (Performance, Accessibility, Best Practices, SEO, PWA installability)
- [ ] Test di breakpoint 320px s/d desktop besar, grid 5 produk nggak timpang/kepotong
- [ ] `.env*` nggak ke-commit, `npm audit` bersih dari high/critical
- [ ] PWA bisa di-install (test manifest + service worker di production build)
- [ ] `robots.txt` & `sitemap.xml` sudah ada (lewat `app/robots.ts` & `app/sitemap.ts` bawaan Next.js)
- [ ] Semua `TODO(isi-konten)` sudah dikumpulkan jadi satu daftar dan dikasih ke user (nama final IurMoney, screenshot yang belum ada, channel CTA, dll.)
