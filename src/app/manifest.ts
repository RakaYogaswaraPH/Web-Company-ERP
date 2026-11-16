import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ERP Jamparing Masagi",
    short_name: "Jamparing Masagi",
    description:
      "Portofolio aplikasi ERP Jamparing Masagi: DIGIARS, WMS, PESANDONG, KEUANGAN, dan HRM.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f6f2",
    theme_color: "#2e2f2d",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
