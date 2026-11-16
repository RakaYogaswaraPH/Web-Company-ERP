"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { products } from "@/data/products";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ProductIcon } from "@/components/ui/ProductIcon";
import { ChevronLeft, ChevronRight, ArrowUpRight, CheckCircle2, ShieldCheck, Layers } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export function ProductShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProduct = products[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % products.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <section id="portfolio" className="relative border-b border-[#deded6] bg-[#f6f6f2] py-16 lg:py-24">
      <Container>
        {/* Editorial Header & Controls */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-[#deded6] pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-navy-900/60">
              <span>Portofolio ERP</span>
              <span>/</span>
              <span>{String(activeIndex + 1).padStart(2, "0")} Dari 05</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-navy-900">
              5 Solusi Penggerak Operasional
            </h2>
          </div>

          {/* Thinking Room Style Navigation Controls */}
          <div className="flex items-center gap-4">
            <div className="font-mono text-lg font-bold text-navy-900">
              <span>{String(activeIndex + 1).padStart(2, "0")}</span>
              <span className="text-navy-900/30 mx-2">/</span>
              <span className="text-navy-900/50">{String(products.length).padStart(2, "0")}</span>
            </div>

            <div className="flex items-center border border-navy-900 bg-white">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Produk Sebelumnya"
                className="flex h-12 w-12 items-center justify-center border-r border-navy-900 text-navy-900 transition-colors hover:bg-navy-900 hover:text-white focus:outline-none"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Produk Selanjutnya"
                className="flex h-12 w-12 items-center justify-center text-navy-900 transition-colors hover:bg-navy-900 hover:text-white focus:outline-none"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Tab Row for Direct Selection */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-b border-[#deded6]">
          {products.map((p, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={p.slug}
                onClick={() => setActiveIndex(idx)}
                className={cn(
                  "flex flex-col p-4 text-left border-r border-b sm:border-b-0 border-[#deded6] transition-all cursor-pointer",
                  isActive
                    ? "bg-navy-900 text-white"
                    : "bg-[#f6f6f2] hover:bg-[#eeeee8] text-navy-900"
                )}
              >
                <span
                  className={cn(
                    "font-mono text-[11px] mb-1 font-bold",
                    isActive ? "text-accent-500" : "text-navy-900/40"
                  )}
                >
                  0{idx + 1}
                </span>
                <span className="font-display text-sm font-bold uppercase tracking-wider">
                  {p.name}
                </span>
                <span
                  className={cn(
                    "text-[11px] mt-1 line-clamp-1",
                    isActive ? "text-white/70" : "text-navy-900/60"
                  )}
                >
                  {p.status === "coming-soon" ? "Coming Soon" : p.subtitle.split("&")[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Thinking Room Style Slide Showcase Body */}
        <div className="mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch"
            >
              {/* Left Column: Product Information & Features */}
              <div className="lg:col-span-6 flex flex-col justify-between py-2">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <StatusBadge status={activeProduct.status} />
                    <span className="font-mono text-xs uppercase tracking-wider text-navy-900/60">
                      {activeProduct.subtitle}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center bg-navy-900 text-white">
                      <ProductIcon name={activeProduct.icon} className="h-6 w-6" />
                    </div>
                    <h3 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-navy-900">
                      {activeProduct.name}
                    </h3>
                  </div>

                  <p className="mt-4 font-display text-lg font-semibold text-navy-900/90 leading-snug">
                    {activeProduct.tagline}
                  </p>

                  <p className="mt-4 text-sm sm:text-base text-navy-900/75 leading-relaxed">
                    {activeProduct.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="mt-8">
                    <p className="font-display text-xs font-bold uppercase tracking-wider text-navy-900 mb-3">
                      Fitur Utama & Kapabilitas Sistem:
                    </p>
                    <ul className="space-y-2.5">
                      {activeProduct.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-navy-900/80">
                          <CheckCircle2 className="h-4 w-4 text-navy-900 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom CTA & Highlight */}
                <div className="mt-10 pt-6 border-t border-[#deded6] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  {activeProduct.highlight && (
                    <div className="text-xs text-navy-900/70">
                      <span className="font-display font-bold uppercase text-navy-900 block">
                        Keunggulan Kunci
                      </span>
                      {activeProduct.highlight}
                    </div>
                  )}

                  <div>
                    {activeProduct.status === "coming-soon" ? (
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-2 border border-navy-900 bg-white px-5 py-3 font-display text-xs font-bold uppercase tracking-wider text-navy-900 transition-colors hover:bg-navy-900 hover:text-white"
                      >
                        Daftar Notifikasi Rilis
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    ) : (
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-2 bg-accent-500 px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-accent-600 shadow-sm"
                      >
                        Request Demo {activeProduct.name}
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Editorial Product Mock / Frame */}
              <div className="lg:col-span-6 flex flex-col">
                {activeProduct.status === "coming-soon" ? (
                  /* Coming soon teaser treatment strictly per design-system rule */
                  <div className="h-full min-h-[380px] border border-dashed border-navy-900/30 bg-[#eeeee8] p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
                    <div className="flex items-center justify-between border-b border-navy-900/10 pb-4">
                      <span className="font-mono text-xs text-navy-900/50">MODUL DALAM TAHAP PENGEMBANGAN</span>
                      <StatusBadge status="coming-soon" />
                    </div>

                    <div className="my-auto text-center py-8">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center border border-navy-900/20 bg-white text-navy-900">
                        <ProductIcon name={activeProduct.icon} className="h-8 w-8" />
                      </div>
                      <h4 className="font-display text-2xl font-bold uppercase text-navy-900">
                        {activeProduct.name}
                      </h4>
                      <p className="mt-2 text-xs sm:text-sm text-navy-900/60 max-w-sm mx-auto">
                        Modul penagihan dan rekonsiliasi iuran bulanan sedang disiapkan untuk melengkapi ekosistem keuangan Jamparing Masagi.
                      </p>
                      <div className="mt-6 inline-block text-[11px] font-mono text-navy-900/50 bg-white px-3 py-1 border border-navy-900/10">
                        TODO(isi-konten): Tangkapan layar UI resmi akan ditampilkan saat fase rilis publik
                      </div>
                    </div>

                    <div className="border-t border-navy-900/10 pt-4 flex items-center justify-between text-xs text-navy-900/50">
                      <span>Perkiraan Rilis: Q3/Q4</span>
                      <span>Kategori: Money Collection</span>
                    </div>
                  </div>
                ) : (
                  /* Live Product Editorial Browser Frame */
                  <div className="h-full min-h-[380px] border border-[#deded6] bg-white shadow-sm flex flex-col">
                    {/* Frame Top Bar */}
                    <div className="flex items-center justify-between border-b border-[#deded6] bg-[#f0f0eb] px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#deded6]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#deded6]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#deded6]" />
                        <span className="ml-2 font-mono text-[10px] text-navy-900/50 hidden sm:inline">
                          https://app.jamparingmasagi.id/{activeProduct.slug}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 font-mono text-[10px] text-navy-900/60">
                        <ShieldCheck className="h-3.5 w-3.5 text-navy-900" />
                        <span>VERIFIED ENTERPRISE</span>
                      </div>
                    </div>

                    {/* Frame Inner Interactive Preview */}
                    <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between bg-[#fbfbf9]">
                      <div className="flex items-center justify-between border-b border-[#deded6] pb-4">
                        <div>
                          <p className="font-mono text-[10px] uppercase text-navy-900/50">Dashboard Interface</p>
                          <h4 className="font-display text-xl font-bold text-navy-900 uppercase">
                            {activeProduct.name} Console
                          </h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
                          <span className="font-mono text-xs text-navy-900 font-semibold">Service Online</span>
                        </div>
                      </div>

                      {/* Mock UI Data Representation (clean, technical, no cheesy AI artwork) */}
                      <div className="my-6 grid grid-cols-2 gap-4">
                        <div className="border border-[#deded6] bg-white p-4">
                          <p className="text-[11px] text-navy-900/60 font-body">Status Operasional</p>
                          <p className="mt-1 font-display text-lg font-bold text-navy-900">100% Aktif</p>
                          <p className="mt-1 text-[10px] font-mono text-emerald-700">Kesiapan Modul Teruji</p>
                        </div>
                        <div className="border border-[#deded6] bg-white p-4">
                          <p className="text-[11px] text-navy-900/60 font-body">Protokol Akses</p>
                          <p className="mt-1 font-display text-lg font-bold text-navy-900">RBAC Level</p>
                          <p className="mt-1 text-[10px] font-mono text-navy-900/60">Terenkripsi Standar ERP</p>
                        </div>
                        <div className="border border-[#deded6] bg-white p-4 col-span-2">
                          <p className="text-[11px] text-navy-900/60 font-body">Integrasi Terpasang</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="px-2 py-0.5 bg-[#eeeee8] text-[10px] font-mono text-navy-900 border border-[#deded6]">
                              Single Sign-On (SSO)
                            </span>
                            <span className="px-2 py-0.5 bg-[#eeeee8] text-[10px] font-mono text-navy-900 border border-[#deded6]">
                              Export Excel & PDF
                            </span>
                            <span className="px-2 py-0.5 bg-[#eeeee8] text-[10px] font-mono text-navy-900 border border-[#deded6]">
                              Central Audit Trail
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-[#deded6] pt-3 flex items-center justify-between text-[11px] text-navy-900/50">
                        <span>TODO(isi-konten): Tangkapan layar resmi produk dapat disematkan di sini</span>
                        <span className="font-mono font-bold text-navy-900">VER. 2.4.0</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
