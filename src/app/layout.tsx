import type { Metadata, Viewport } from "next";
import { Chakra_Petch, Open_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { siteConfig } from "@/config/site";

const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-chakra-petch",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.shortName} — Portfolio 5 Aplikasi ERP Terintegrasi`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: [
    "ERP Jamparing Masagi",
    "DIGIARS",
    "Digital Arsip",
    "WMS Water Management System",
    "IoT Pajak Air",
    "IurMoney",
    "HRIS Masagi",
    "AbsensiKu",
    "Aplikasi Bisnis Terintegrasi",
  ],
  authors: [{ name: siteConfig.shortName, url: siteConfig.url }],
  creator: siteConfig.shortName,
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0b1d3a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${chakraPetch.variable} ${openSans.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#f6f6f2] text-foreground font-body antialiased selection:bg-accent-500 selection:text-white">
        <SmoothScroll>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
