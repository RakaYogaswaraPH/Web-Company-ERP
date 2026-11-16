import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { siteConfig, navItems } from "@/config/site";
import { products } from "@/data/products";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#dcdfd5] bg-[#eff1ea] text-[#2e2f2d] pt-16 pb-12 pl-0 md:pl-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-[#dcdfd5]">
          {/* Brand Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="relative h-10 w-36"
                  style={{ position: "relative" }}
                >
                  <Image
                    src="/assets/logo/logo-dark.webp"
                    alt="Logo Jamparing Masagi"
                    fill
                    className="object-contain object-left"
                  />
                </div>
              </div>

              <p className="font-display text-sm uppercase tracking-wider text-[#2e2f2d] font-bold mb-3">
                {siteConfig.tagline}
              </p>

              <p className="text-xs text-[#2e2f2d]/75 max-w-sm leading-relaxed">
                Platform ERP terintegrasi untuk mentransformasi tata kelola arsip perusahaan,
                telemetri IoT pemakaian air, transaksi kasir POS, penagihan iuran & SPP, serta absensi, task, dan persuratan resmi.
              </p>
            </div>

            <div className="mt-8 text-xs text-[#2e2f2d]/60">
              <p className="font-mono">{siteConfig.contact.address}</p>
              <p className="mt-1 font-mono">{siteConfig.contact.email} • {siteConfig.contact.phone}</p>
            </div>
          </div>

          {/* Module Links */}
          <div className="lg:col-span-4">
            <p className="font-display text-xs font-bold uppercase tracking-widest text-[#2e2f2d] mb-4">
              Portofolio 5 Modul ERP
            </p>
            <ul className="space-y-3">
              {products.map((p, idx) => (
                <li key={p.slug}>
                  <a
                    href="#portfolio"
                    className="group flex items-center justify-between text-xs text-[#2e2f2d]/80 hover:text-[#2e2f2d] transition-colors"
                  >
                    <span className="font-display font-semibold uppercase tracking-wider">
                      0{idx + 1} • {p.name}
                    </span>
                    <span className="font-mono text-[10px] text-[#2e2f2d]/50 group-hover:text-accent-500 transition-colors">
                      {p.status === "coming-soon" ? "Coming Soon" : "Live"}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3">
            <p className="font-display text-xs font-bold uppercase tracking-widest text-[#2e2f2d] mb-4">
              Navigasi Halaman
            </p>
            <ul className="space-y-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-display text-xs uppercase tracking-wider text-[#2e2f2d]/75 hover:text-[#2e2f2d] transition-colors font-medium"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-[#dcdfd5]">
              <a
                href="#contact"
                className="inline-block bg-[#2e2f2d] hover:bg-accent-500 px-5 py-2.5 font-display text-[11px] font-bold uppercase tracking-wider text-white transition-all shadow-sm"
              >
                Request Demo Sekarang
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-[#2e2f2d]/60 font-mono">
          <p>© {currentYear} {siteConfig.shortName}. All rights reserved.</p>
          <div className="flex items-center gap-6 text-[11px]">
            <span>PROGRESSIVE WEB APP READY</span>
            <span>STATIC SECURED</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
