---
trigger: always_on
---

# Setup PWA (Serwist) — Landing Page ERP Jamparing Masagi

## 1. Service Worker

`src/app/sw.ts`:

```ts
import { defaultCache } from "@serwist/next/worker";
import { Serwist } from "serwist";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}
declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
});

serwist.addEventListeners();
```

## 2. Bungkus `next.config.ts`

```ts
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
});

export default withSerwist(nextConfig);
```

## 3. Web App Manifest

`src/app/manifest.ts`:

```ts
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ERP Jamparing Masagi", // TODO(isi-konten): konfirmasi nama resmi ke user
    short_name: "Jamparing Masagi",
    description: "Portofolio aplikasi ERP Jamparing Masagi: DIGIARS, WMS, IurMoney, HRIS Masagi, dan AbsensiKu.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f6f2",
    theme_color: "#f6f6f2",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
```

## 4. Catatan Penting

- Serwist belum kompatibel penuh dengan Turbopack. Untuk test PWA pas development, jalankan `next dev --webpack`. Untuk kerja harian biasa, Turbopack normal (`next dev`) tetap jalan.
- PWA cuma bisa diuji dengan benar di `next build` (production) — service worker memang didesain disable di development.
- Siapkan icon PWA minimal 192×192 dan 512×512 px (idealnya plus maskable icon) di `public/icons/`, dibuat dari logo Jamparing Masagi di `Assets/Logo/`. Logo non-persegi ditaruh di tengah kanvas persegi dengan latar putih, jangan diregangkan.
- Install prompt & offline behavior baru bisa dites setelah deploy ke HTTPS (atau di localhost untuk testing lokal — browser modern mengizinkan service worker di localhost tanpa HTTPS).
- Precache cukup app shell + `offline.html` + icon. Screenshot produk yang berat (banyak file, resolusi besar) **tidak perlu** di-precache semua — biarkan ter-cache lewat `runtimeCaching` bawaan Serwist saat diakses, supaya ukuran precache nggak membengkak.
