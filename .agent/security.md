---
trigger: always_on
---

# Rules Keamanan (Security) — Landing Page ERP Jamparing Masagi

Website ini statis (tanpa backend/database) jadi permukaan serangannya kecil, tapi tetap ada titik yang wajib dikunci.

## 1. Security Headers (Wajib di Level Hosting, Bukan next.config)

Karena `output: "export"`, fungsi `headers()` di `next.config.ts` diabaikan — nggak ada server yang bisa menyisipkan header saat request. Header harus diset di layer hosting/CDN:

- Vercel → file `vercel.json` di root
- Netlify / Cloudflare Pages → file `public/_headers`
- Nginx self-host → langsung di server block

Tanyakan ke user hosting mana yang dipakai, baru siapkan konfigurasi yang relevan. Set minimal header berikut untuk semua response:

```
Content-Security-Policy: default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; font-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

Catatan CSP: App Router kadang menyisipkan inline script kecil untuk hydration. Kalau ada fitur interaktif error gara-gara CSP setelah deploy, baru longgarkan `script-src` seperlunya — cek dulu script mana yang kena block lewat console browser, jangan langsung pasang `'unsafe-inline'` blanket. Jangan pernah pakai `'unsafe-eval'`.

Kalau nantinya tiap aplikasi ERP (DIGIARS, WMS, dll.) di-hosting di subdomain terpisah dari landing page ini — landing page cuma *link keluar* ke sana (bukan embed/iframe) — jadi `connect-src`/`frame-src` landing page nggak perlu dilonggarkan untuk itu. Kalau ternyata perlu embed (mis. iframe demo produk), catat dan tanya user dulu sebelum CSP dilonggarkan.

## 2. Secrets & Environment Variables

- Semua `.env*` (kecuali `.env.example`) wajib masuk `.gitignore`.
- Prefix `NEXT_PUBLIC_` otomatis ikut ke bundle client, bisa dibaca siapa saja — jangan taruh API key rahasia di sana.
- Jangan commit API key, token, atau kredensial apa pun ke repo — termasuk di history commit lama.

## 3. CTA "Request Demo" / "Hubungi Kami" per Produk (Kalau Ada)

Static site nggak punya backend buat nerima submit form. Tiap produk bisa punya CTA berbeda sifatnya:

- **DIGIARS, WMS, HRIS Masagi, AbsensiKu** (sudah live) → CTA "Request Demo" / "Hubungi Sales".
- **IurMoney** (coming soon) → CTA "Beri tahu saya saat rilis" — ini capture minat, bukan sales lead biasa.

**Tanyakan user** memilih channel untuk tiap jenis CTA, salah satu:

- `mailto:` langsung
- Link WhatsApp (`wa.me`)
- Form handler pihak ketiga yang memang didesain untuk static site (Web3Forms, Formspree, Netlify Forms) — biasanya sudah ada proteksi spam bawaan, cocok juga untuk capture email "notify me" IurMoney.

Kalau ada input form:

- Tambahkan honeypot field tersembunyi sebagai lapisan tambahan.
- Validasi input di client (format email, panjang pesan) hanya sebagai UX, bukan security boundary — validasi client selalu bisa dilewati.
- Jangan menampilkan input user kembali sebagai HTML mentah (hindari refleksi yang bisa disalahgunakan untuk XSS).

Link eksternal (termasuk link ke sub-domain aplikasi ERP, WhatsApp, atau form pihak ketiga) sebaiknya lewat satu komponen `ExternalLink` yang otomatis kasih `target="_blank"` + `rel="noopener noreferrer"`, dan cuma terima skema `https:`, `mailto:`, `tel:`.

## 4. Dependency & Supply Chain

- Commit `package-lock.json`, pakai `npm ci` (bukan `npm install`) di CI/build pipeline.
- Jalankan `npm audit` rutin, terutama sebelum deploy besar.
- Aktifkan Dependabot (GitHub) atau Renovate untuk auto-PR update dependency.
- Jangan install package cuma buat fungsi kecil yang bisa ditulis sendiri dalam beberapa baris — makin sedikit dependency, makin kecil attack surface.

## 5. Build Output

- `productionBrowserSourceMaps: false` sudah diset di setup — biar source map nggak ke-expose ke publik.
- Pastikan nggak ada `console.log` yang bawa data sensitif ketinggalan di production build.

## 6. Hosting-Level

- Paksa HTTPS, redirect http → https, konsistenkan www vs non-www.
- Kalau pakai Cloudflare di depan hosting, aktifkan WAF dasar + rate limiting biar nggak gampang di-scrape atau kena bot traffic berlebihan.
- Pastikan directory listing di server disable (default-nya sudah disable di Vercel/Netlify/Cloudflare Pages).

## 7. Asset & Privasi

- Strip EXIF/GPS metadata dari foto apa pun yang ada orangnya sebelum masuk repo (mis. kalau nanti ada foto tim Jamparing Masagi) — banyak kamera HP nyimpen lokasi GPS di metadata foto, itu data yang nggak perlu publik.
- Jangan commit file asset mentah yang kebesaran (file project desain, source screenshot resolusi penuh) ke repo — cuma hasil export final yang sudah dioptimasi.

## 8. CI/CD

Tambahkan step `npm audit --audit-level=high` dan `npm run build` (validasi static export berhasil) sebelum deploy otomatis jalan.
