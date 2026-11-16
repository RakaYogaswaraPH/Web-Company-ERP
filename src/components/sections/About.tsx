import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

export function About() {
  return (
    <section id="about" className="border-b border-[#deded6] bg-[#eeeee8] py-16 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Team Visual in Editorial Frame */}
          <div className="lg:col-span-6">
            <div className="border border-[#deded6] bg-white p-2 sm:p-3 shadow-sm">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                <Image
                  src="/assets/brands/Teams.webp"
                  alt="Tim Engineering Jamparing Masagi"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-3 flex items-center justify-between px-2 text-[11px] font-mono text-navy-900/60">
                <span>DOKUMENTASI INTERNAL</span>
                <span>ENGINEERING & PRODUCT DIVISION</span>
              </div>
            </div>
          </div>

          {/* Right: Narrative & Philosophy */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-navy-900/60 block mb-2">
                Profil Perusahaan
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-navy-900 leading-[1.1]">
                Tentang Jamparing Masagi
              </h2>

              <p className="mt-6 text-sm sm:text-base text-navy-900/80 leading-relaxed font-body">
                Jamparing Masagi adalah pengembang perangkat lunak berdedikasi yang berfokus pada
                pembuatan solusi digital untuk sektor enterprise, instansi pengelola utilitas, dan UMKM berkembang.
              </p>

              <p className="mt-4 text-sm sm:text-base text-navy-900/80 leading-relaxed font-body">
                Melalui portofolio 5 modul spesifik kami (DIGIARS, WMS, IurMoney, HRIS Masagi, dan AbsensiKu),
                kami mendesain sistem yang tidak berbelit-belit, fokus pada kemudahan pakai sehari-hari,
                serta menghasilkan data analitik yang valid untuk keputusan pimpinan.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[#deded6] pt-6 font-display">
                <div className="border-l-2 border-navy-900 pl-4">
                  <span className="text-2xl sm:text-3xl font-bold text-navy-900">5 Modul</span>
                  <p className="text-xs text-navy-900/60 uppercase mt-1 font-mono">Portofolio Terintegrasi</p>
                </div>
                <div className="border-l-2 border-accent-500 pl-4">
                  <span className="text-2xl sm:text-3xl font-bold text-navy-900">100%</span>
                  <p className="text-xs text-navy-900/60 uppercase mt-1 font-mono">Kedaulatan Data Lokal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
