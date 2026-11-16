"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Container } from "@/components/ui/Container";

// Dynamically import 3D Viewer on client side without SSR
const Masagi3DViewer = dynamic(
  () => import("@/components/ui/Masagi3DViewer").then((mod) => mod.Masagi3DViewer),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[380px] sm:h-[450px] lg:h-[480px] flex items-center justify-center">
        <div className="h-10 w-10 border-2 border-[#2e2f2d]/20 border-t-accent-500 rounded-full animate-spin" />
      </div>
    ),
  }
);

export function About() {
  return (
    <section id="about" className="border-b border-[#deded6] bg-[#f6f6f2] py-16 lg:py-24 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Interactive 3D Masagi Emblem (Clean, Frameless, Pure 3D Canvas) */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <Masagi3DViewer />
          </div>

          {/* Right: Narrative & Philosophy */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <span className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-[#2e2f2d]/60 block mb-2">
                Profil Perusahaan
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-[#2e2f2d] leading-[1.1]">
                Tentang Jamparing Masagi
              </h2>

              <p className="mt-6 text-sm sm:text-base text-[#2e2f2d]/80 leading-relaxed font-body">
                Jamparing Masagi adalah pengembang perangkat lunak berdedikasi yang berfokus pada
                pembuatan solusi digital untuk sektor enterprise, instansi pengelola utilitas, dan UMKM berkembang.
              </p>

              <p className="mt-4 text-sm sm:text-base text-[#2e2f2d]/80 leading-relaxed font-body">
                Melalui portofolio 5 modul spesifik kami (DIGIARS, WMS, PESANDONG, KEUANGAN, dan HRM),
                kami mendesain sistem yang tidak berbelit-belit, fokus pada kemudahan pakai sehari-hari,
                serta menghasilkan data analitik yang valid untuk keputusan pimpinan.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[#deded6] pt-6 font-display">
                <div className="border-l-2 border-[#2e2f2d] pl-4">
                  <span className="text-2xl sm:text-3xl font-bold text-[#2e2f2d]">5 Modul</span>
                  <p className="text-xs text-[#2e2f2d]/60 uppercase mt-1 font-mono">Portofolio Terintegrasi</p>
                </div>
                <div className="border-l-2 border-accent-500 pl-4">
                  <span className="text-2xl sm:text-3xl font-bold text-[#2e2f2d]">100%</span>
                  <p className="text-xs text-[#2e2f2d]/60 uppercase mt-1 font-mono">Kedaulatan Data Lokal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
