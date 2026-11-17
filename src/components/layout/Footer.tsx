import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

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
              PT. Jamparing Masagi membangun kerja sama dengan BUMN, instansi pemerintah, dan perusahaan swasta dalam membangun infrastruktur dan layanan dalam bidang TIK.
              </p>
            </div>
          </div>

          {/* Lokasi & Operasional (per reference image) */}
          <div className="lg:col-span-4">
            <p className="font-display text-xs font-bold uppercase tracking-widest text-[#2e2f2d] mb-4">
              LOKASI &amp; OPERASIONAL
            </p>

            <div className="space-y-4 text-xs text-[#2e2f2d]/80">
              <div>
                <p className="font-display font-bold text-xs text-[#2e2f2d] mb-1">
                  Kantor
                </p>
                <p className="leading-relaxed">
                  Graha DLA Lantai 3 Suite 6, Jl. Otto Iskandar Dinata No. 392, Bandung
                </p>
              </div>

              <div>
                <p className="font-display font-bold text-xs text-[#2e2f2d] mb-1">
                  Workshop
                </p>
                <p className="leading-relaxed">
                  Jl. Telexina No. 4 Kebonkopi, Cibeureum, Cimahi 40535
                </p>
              </div>

              <div className="pt-3 border-t border-[#dcdfd5]">
                <p className="font-display font-bold text-[11px] uppercase tracking-wider text-[#2e2f2d] mb-1">
                  JAM OPERASIONAL
                </p>
                <p className="font-mono text-xs text-[#2e2f2d]/70">
                  Senin - Jumat: 08:30 - 17:00 WIB
                </p>
              </div>
            </div>
          </div>

          {/* Kontak Kami (per reference image) */}
          <div className="lg:col-span-3">
            <p className="font-display text-xs font-bold uppercase tracking-widest text-[#2e2f2d] mb-4">
              KONTAK KAMI
            </p>

            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="font-display font-semibold text-[#2e2f2d]/85 hover:text-accent-500 transition-colors block py-1"
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display font-semibold text-[#2e2f2d]/85 hover:text-accent-500 transition-colors block py-1"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display font-semibold text-[#2e2f2d]/85 hover:text-accent-500 transition-colors block py-1"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display font-semibold text-[#2e2f2d]/85 hover:text-accent-500 transition-colors block py-1"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-[#2e2f2d]/60 font-mono">
          <p>© {currentYear} {siteConfig.shortName}.</p>
          <div className="flex items-center gap-6 text-[11px]">
          </div>
        </div>
      </Container>
    </footer>
  );
}
