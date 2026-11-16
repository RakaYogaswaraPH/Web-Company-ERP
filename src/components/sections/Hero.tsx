"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[#deded6] pt-16 pb-20 lg:pt-28 lg:pb-32">
      {/* Decorative vertical editorial lines */}
      <div className="pointer-events-none absolute inset-y-0 left-8 hidden border-r border-[#deded6]/60 xl:block" />
      <div className="pointer-events-none absolute inset-y-0 right-8 hidden border-l border-[#deded6]/60 xl:block" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center"
        >
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-[#2e2f2d] leading-[1.05] text-balance max-w-5xl">
            Unleash your business growth potential.
          </h1>

          <p className="mt-8 max-w-2xl text-base sm:text-lg text-[#2e2f2d]/75 leading-relaxed font-body">
            Optimalkan dan penuhi semua kebutuhan bisnis Anda dalam satu platform dengan mudah, efisien, dan terjangkau.
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2.5 bg-accent-500 px-6 py-3.5 font-display text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-accent-600 active:scale-95 shadow-sm"
            >
              Mulai Sekarang
              <ArrowDown className="h-4 w-4" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 border border-[#2e2f2d] bg-transparent px-6 py-3.5 font-display text-xs font-bold uppercase tracking-widest text-[#2e2f2d] transition-all hover:bg-[#2e2f2d] hover:text-white active:scale-95"
            >
              Jadwalkan Uji Coba
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
