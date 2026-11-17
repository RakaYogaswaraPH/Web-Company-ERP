"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { HeroGlobeNetwork } from "@/components/ui/HeroGlobeNetwork";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[#deded6] min-h-[86vh] lg:min-h-[92vh] flex items-center justify-center py-24 sm:py-32 lg:py-44">
      {/* Dynamic Animated Neural Network Background */}
      <HeroGlobeNetwork />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center"
        >
          {/* Main Hero Headline (Grand, Bold, Impactful) */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[86px] font-bold uppercase tracking-tight text-[#2e2f2d] leading-[1.02] text-balance max-w-6xl drop-shadow-xs">
            Unleash your business growth potential
          </h1>

          <p className="mt-8 max-w-2xl text-base sm:text-lg lg:text-xl text-[#2e2f2d]/80 leading-relaxed font-body">
            Optimalkan dan penuhi semua kebutuhan bisnis Anda dalam satu platform dengan mudah, cepat, dan efisien.
          </p>

          {/* Action Buttons (Strictly Equal Dimensions & Perfect Visual Balance) */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
            <a
              href="#portfolio"
              className="inline-flex items-center justify-center gap-2.5 border-2 border-accent-500 bg-accent-500 px-7 py-3.5 font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-accent-600 hover:border-accent-600 active:scale-95 shadow-sm min-w-[210px]"
            >
              Mulai Sekarang
              <ArrowDown className="h-4 w-4" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2.5 border-2 border-[#2e2f2d] bg-[#f6f6f2]/80 backdrop-blur-xs px-7 py-3.5 font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-[#2e2f2d] transition-all hover:bg-[#2e2f2d] hover:text-white active:scale-95 min-w-[210px]"
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
