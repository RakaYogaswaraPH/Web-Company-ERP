"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { products } from "@/data/products";
import { ProductIcon } from "@/components/ui/ProductIcon";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

// Wireframe Box Component for placeholder layout per design brief
function WireframeBox({
  className = "",
  hasX = true,
}: {
  className?: string;
  hasX?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative bg-[#e5e7e1] border border-[#d6d8ce] overflow-hidden flex items-center justify-center",
        className
      )}
    >
      {hasX && (
        <svg
          className="absolute inset-0 w-full h-full text-[#b5b8ac]"
          preserveAspectRatio="none"
        >
          <line
            x1="0"
            y1="0"
            x2="100%"
            y2="100%"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <line
            x1="100%"
            y1="0"
            x2="0"
            y2="100%"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      )}
    </div>
  );
}

// Hardware-accelerated directional animation variants with zero text jitter
const showcaseVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 24 : dir < 0 ? -24 : 0,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.32,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -20 : 20,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1] as const,
    },
  }),
};

export function ProductShowcase() {
  const [[activeIndex, direction], setPage] = useState([0, 0]);
  const activeProduct = products[activeIndex];

  const handleTabChange = (newIndex: number) => {
    if (newIndex === activeIndex) return;
    setPage([newIndex, newIndex > activeIndex ? 1 : -1]);
  };

  return (
    <section id="portfolio" className="relative border-b border-[#deded6] bg-[#fefeff] py-16 lg:py-24">
      <Container>
        {/* Editorial Section Header */}
        <div className="border-b border-[#deded6] pb-8">
          <span className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-[#2e2f2d]/60 block mb-2">
            SOFTWARE ERP
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-[#2e2f2d]">
            Solusi Kami
          </h2>
        </div>

        {/* Tab Row with Sliding Active Indicator */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-b border-[#deded6] bg-[#fefeff]">
          {products.map((p, idx) => {
            const isActive = idx === activeIndex;
            const isLastOdd = idx === products.length - 1;
            return (
              <button
                key={p.slug}
                onClick={() => handleTabChange(idx)}
                className={cn(
                  "group relative flex flex-col p-3.5 sm:p-4 text-left border-r border-b sm:border-b-0 border-[#deded6] transition-colors cursor-pointer overflow-hidden",
                  isLastOdd ? "col-span-2 sm:col-span-1" : ""
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeProductTab"
                    className="absolute inset-0 bg-[#2e2f2d]"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <div className="relative z-10 flex flex-col">
                  <span
                    className={cn(
                      "font-mono text-[11px] mb-1 font-bold transition-colors duration-200",
                      isActive ? "text-accent-500" : "text-[#2e2f2d]/40 group-hover:text-accent-500"
                    )}
                  >
                    0{idx + 1}
                  </span>
                  <span
                    className={cn(
                      "font-display text-sm font-bold uppercase tracking-wider transition-colors duration-200",
                      isActive ? "text-white" : "text-[#2e2f2d]"
                    )}
                  >
                    {p.name}
                  </span>
                  <span
                    className={cn(
                      "text-[11px] mt-1 line-clamp-1 transition-colors duration-200",
                      isActive ? "text-white/70" : "text-[#2e2f2d]/60"
                    )}
                  >
                    {p.status === "coming-soon" ? "Coming Soon" : p.subtitle.split("&")[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Thinking Room Style Slide Showcase Body with Butter-Smooth Transition */}
        <div className="mt-12 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeProduct.slug}
              custom={direction}
              variants={showcaseVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch transform-gpu will-change-transform"
            >
              {/* Left Column: Product Information & Features */}
              <div className="lg:col-span-6 flex flex-col justify-between py-2">
                <div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center bg-[#2e2f2d] text-white">
                      <ProductIcon name={activeProduct.icon} className="h-6 w-6" />
                    </div>
                    <h3 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-[#2e2f2d]">
                      {activeProduct.name}
                    </h3>
                  </div>

                  <p className="mt-4 font-display text-lg font-semibold text-[#2e2f2d]/90 leading-snug">
                    {activeProduct.tagline}
                  </p>

                  <p className="mt-4 text-sm sm:text-base text-[#2e2f2d]/75 leading-relaxed font-body">
                    {activeProduct.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="mt-8">
                    <p className="font-display text-xs font-bold uppercase tracking-wider text-[#2e2f2d] mb-3">
                      Fitur Utama:
                    </p>
                    <ul className="space-y-2.5">
                      {activeProduct.features.map((feat, fIdx) => (
                        <li
                          key={fIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2e2f2d]/80"
                        >
                          <CheckCircle2 className="h-4 w-4 text-[#2e2f2d] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right Column: Editorial Wireframe Frame */}
              <div className="lg:col-span-6 flex flex-col">
                <div className="h-full min-h-[290px] sm:min-h-[380px] lg:min-h-[440px] border border-[#deded6] bg-white shadow-xs flex flex-col">
                  {/* Frame Top Bar */}
                  <div className="flex items-center justify-between border-b border-[#deded6] bg-[#f0f0eb] px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#deded6]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#deded6]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#deded6]" />
                      <span className="ml-2 font-mono text-[10px] text-[#2e2f2d]/50 hidden sm:inline">
                        https://app.jamparingmasagi.id/{activeProduct.slug}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#2e2f2d]/60">
                      <ShieldCheck className="h-3.5 w-3.5 text-[#2e2f2d]" />
                    </div>
                  </div>

                  {/* Frame Inner Wireframe Placeholder - Single Image Box with X */}
                  <div className="p-4 sm:p-6 flex-1 flex flex-col bg-[#fbfbf9]">
                    <WireframeBox className="w-full flex-1 min-h-[220px] sm:min-h-[280px]" hasX={true} />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
