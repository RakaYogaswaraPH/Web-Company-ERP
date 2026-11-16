"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[#deded6] pt-12 pb-16 lg:pt-20 lg:pb-24">
      {/* Decorative vertical editorial lines */}
      <div className="pointer-events-none absolute inset-y-0 left-8 hidden border-r border-[#deded6]/60 xl:block" />
      <div className="pointer-events-none absolute inset-y-0 right-8 hidden border-l border-[#deded6]/60 xl:block" />

      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-start">
          {/* Main Headline & Lead */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Product Badge */}
              <div className="mb-6 inline-flex items-center gap-3 border border-navy-900/20 bg-[#eeeee8] px-3.5 py-1.5">
                <span className="h-2 w-2 rounded-full bg-accent-500 animate-pulse" />
                <span className="font-display text-xs font-bold uppercase tracking-wider text-navy-900">
                  Jamparing Masagi • Integrated Business Suite
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-navy-900 leading-[1.05] text-balance">
                Otomasi Dokumen, IoT Utilitas, Hingga Tata Kelola SDM.
              </h1>

              <p className="mt-8 max-w-2xl text-base sm:text-lg text-navy-900/80 leading-relaxed font-body">
                Satu ekosistem perangkat lunak terintegrasi untuk menjawab kompleksitas operasional:
                dari pengarsipan berkas digital, telemetri pemakaian air real-time, transaksi kasir POS,
                penagihan iuran & SPP bulanan, hingga absensi presisi, task management, dan administrasi surat menyurat.
              </p>

              {/* Action Buttons */}
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#portfolio"
                  className="inline-flex items-center gap-2.5 bg-accent-500 px-6 py-3.5 font-display text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-accent-600 active:scale-95 shadow-sm"
                >
                  Eksplorasi 5 Produk
                  <ArrowDown className="h-4 w-4" />
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2.5 border border-navy-900 bg-transparent px-6 py-3.5 font-display text-xs font-bold uppercase tracking-widest text-navy-900 transition-all hover:bg-navy-900 hover:text-white active:scale-95"
                >
                  Jadwalkan Diskusi Demo
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Thinking Room Style Side Column */}
          <div className="lg:col-span-4 border-t border-[#deded6] pt-6 lg:border-t-0 lg:border-l lg:border-[#deded6] lg:pt-0 lg:pl-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-6"
            >
              <div className="flex items-baseline justify-between border-b border-[#deded6] pb-3">
                <span className="font-display text-xs font-bold uppercase tracking-widest text-navy-900/60">
                  Arsitektur Solusi
                </span>
                <span className="font-mono text-xs font-bold text-navy-900">
                  05 / SUITE
                </span>
              </div>

              <p className="text-xs text-navy-900/70 leading-relaxed">
                Setiap aplikasi dirancang mandiri (modular) namun dapat disinkronkan secara seamless
                guna menghilangkan silo data antar divisi perusahaan.
              </p>

              {/* Quick Module List */}
              <div className="flex flex-col divide-y divide-[#deded6]">
                <div className="py-2.5 flex items-center justify-between text-xs">
                  <span className="font-display font-semibold text-navy-900 uppercase">
                    01 • DIGIARS
                  </span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-navy-900/10 text-navy-900">
                    Live
                  </span>
                </div>
                <div className="py-2.5 flex items-center justify-between text-xs">
                  <span className="font-display font-semibold text-navy-900 uppercase">
                    02 • WMS (Water IoT)
                  </span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-navy-900/10 text-navy-900">
                    Live
                  </span>
                </div>
                <div className="py-2.5 flex items-center justify-between text-xs">
                  <span className="font-display font-semibold text-navy-900 uppercase">
                    03 • PESANDONG (Kasir POS)
                  </span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-navy-900/10 text-navy-900">
                    Live
                  </span>
                </div>
                <div className="py-2.5 flex items-center justify-between text-xs">
                  <span className="font-display font-semibold text-navy-900 uppercase">
                    04 • KEUANGAN (Iuran & SPP)
                  </span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-navy-900/10 text-navy-900">
                    Live
                  </span>
                </div>
                <div className="py-2.5 flex items-center justify-between text-xs">
                  <span className="font-display font-semibold text-navy-900 uppercase">
                    05 • HRM (Absensi & Task)
                  </span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-navy-900/10 text-navy-900">
                    Live
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <div className="p-3 bg-[#eeeee8] border border-[#deded6] text-[11px] text-navy-900/70">
                  <span className="font-bold text-navy-900 block mb-1">
                    Standard Mutu Jamparing Masagi
                  </span>
                  Keamanan data, audit trail terpusat, dan performa respon tinggi untuk produktivitas operasional.
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
