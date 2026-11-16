"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { navItems, siteConfig } from "@/config/site";
import { motion, AnimatePresence } from "motion/react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 1. THINKING ROOM FLOATING SIDE DOCK (Desktop only, completely hidden on mobile) */}
      <aside
        onClick={() => setIsOpen(true)}
        className="hidden md:flex fixed left-0 top-0 bottom-0 z-50 w-16 flex-col items-center justify-between py-6 border-r border-[#2e2f2d]/15 bg-[#f6f6f2]/20 backdrop-blur-[2px] transition-all duration-300 hover:bg-[#eff1ea] hover:shadow-lg cursor-pointer group select-none"
        title="Buka Menu Navigasi"
        aria-label="Buka Navigasi Samping"
      >
        {/* Top: Brand Emblem Mark */}
        <div className="relative flex h-8 w-8 items-center justify-center transition-transform duration-300 group-hover:scale-110">
          <Image
            src="/assets/brands/Icons.webp"
            alt="Jamparing Masagi Icon"
            width={28}
            height={28}
            className="object-contain"
          />
        </div>

        {/* Middle: Thinking Room 3-Bars Symbol (|||) */}
        <div className="flex flex-col items-center gap-1.5 py-4">
          <div className="flex items-center gap-1">
            <span className="h-6 w-[2px] bg-[#2e2f2d]/70 transition-all duration-300 group-hover:h-8 group-hover:bg-accent-500" />
            <span className="h-6 w-[2px] bg-[#2e2f2d]/70 transition-all duration-300 group-hover:h-8 group-hover:bg-[#2e2f2d]" />
            <span className="h-6 w-[2px] bg-[#2e2f2d]/70 transition-all duration-300 group-hover:h-8 group-hover:bg-accent-500" />
          </div>
          <span className="mt-2 font-display text-[9px] font-bold uppercase tracking-widest text-[#2e2f2d]/50 opacity-0 group-hover:opacity-100 transition-opacity">
            MENU
          </span>
        </div>

        {/* Bottom: Vertical Text Stamp */}
        <div className="flex flex-col items-center gap-3 font-mono text-[9px] font-semibold uppercase tracking-widest text-[#2e2f2d]/60 [writing-mode:vertical-rl] rotate-180">
          <span>MASAGI • ERP</span>
        </div>
      </aside>

      {/* 2. TOP NAVBAR */}
      <header className="sticky top-0 z-40 w-full border-b border-[#deded6] bg-[#f6f6f2]/95 backdrop-blur-md transition-colors pl-0 md:pl-16">
        <Container>
          <div className="flex h-20 items-center justify-between">
            {/* Mobile: Hamburger Button on the side */}
            <div className="flex md:hidden items-center">
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label="Buka Menu"
                className="flex h-10 w-10 items-center justify-center border border-[#deded6] text-[#2e2f2d] hover:border-[#2e2f2d] hover:bg-[#eff1ea] focus:outline-none"
              >
                <div className="flex flex-col gap-1 w-4">
                  <span className="h-[2px] w-full bg-[#2e2f2d]" />
                  <span className="h-[2px] w-full bg-[#2e2f2d]" />
                  <span className="h-[2px] w-full bg-[#2e2f2d]" />
                </div>
              </button>
            </div>

            {/* Logo: Centered on mobile, Left-aligned on desktop */}
            <div className="flex flex-1 md:flex-initial justify-center md:justify-start">
              <Link
                href="/"
                className="flex items-center gap-3 transition-opacity hover:opacity-90 focus:outline-none"
              >
                <div
                  className="relative h-9 w-32 sm:w-36"
                  style={{ position: "relative" }}
                >
                  <Image
                    src="/assets/logo/logo-dark.webp"
                    alt="Logo Jamparing Masagi"
                    fill
                    priority
                    className="object-contain"
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Center: "Enterprise Resource Planning" text */}
            <div className="hidden md:flex items-center justify-center flex-1 px-4 text-center">
              <span className="font-display text-xs lg:text-sm font-bold uppercase tracking-[0.25em] text-[#2e2f2d]">
                Enterprise Resource Planning
              </span>
            </div>

            {/* Desktop Right: Request Demo Button ONLY (no hamburger button next to it!) */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border border-[#2e2f2d] bg-[#2e2f2d] px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-accent-500 hover:border-accent-500 active:scale-95 shadow-sm"
              >
                Ajukan Uji Coba
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Mobile Right Spacer: Perfectly centers the logo on mobile */}
            <div className="w-10 md:hidden" aria-hidden="true" />
          </div>
        </Container>
      </header>

      {/* 3. THINKING ROOM FULL SLIDE-OUT DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#2e2f2d]/50 backdrop-blur-xs"
            />

            {/* Slide-out Panel from Left */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="relative h-full w-full max-w-xl sm:max-w-2xl bg-[#eff1ea] border-r border-[#dcdfd5] shadow-2xl flex flex-col justify-between p-6 sm:p-14 overflow-y-auto"
            >
              {/* Drawer Header */}
              <div>
                <div className="flex items-center justify-between border-b border-[#2e2f2d]/15 pb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className="relative h-8 w-28 sm:w-32"
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

                  <div className="flex items-center gap-4">
                    <span className="hidden sm:inline font-display text-[10px] font-bold uppercase tracking-widest text-[#2e2f2d]/60">
                      WE EMPOWER ENTERPRISE
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      aria-label="Tutup Menu"
                      className="flex h-10 w-10 items-center justify-center border border-[#2e2f2d] bg-[#2e2f2d] text-white transition-all hover:bg-accent-500 hover:border-accent-500 focus:outline-none cursor-pointer"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Main Giant Typographic Nav Links */}
                <nav className="mt-8 sm:mt-12 flex flex-col gap-3 sm:gap-6">
                  {navItems.map((item, idx) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-baseline justify-between border-b border-[#2e2f2d]/10 pb-3 sm:pb-4 text-left transition-all"
                    >
                      <div className="flex items-baseline gap-3 sm:gap-6">
                        <span className="font-mono text-xs sm:text-sm font-bold text-[#2e2f2d]/40 group-hover:text-accent-500 transition-colors">
                          0{idx + 1}
                        </span>
                        <span className="font-display text-2xl sm:text-5xl font-bold uppercase tracking-tight text-[#2e2f2d] transition-all group-hover:translate-x-2 group-hover:text-accent-500">
                          {item.label}
                        </span>
                      </div>
                      <ArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6 text-[#2e2f2d]/30 opacity-0 group-hover:opacity-100 group-hover:text-accent-500 transition-all -translate-y-1 group-hover:translate-y-0" />
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Drawer Footer Info */}
              <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[#2e2f2d]/15 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-[#2e2f2d]/75">
                <div>
                  <p className="font-display font-bold uppercase tracking-wider text-[#2e2f2d] mb-2">
                    Media & Saluran
                  </p>
                  <ul className="space-y-1 font-body">
                    <li>
                      <a
                        href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-accent-500 transition-colors"
                      >
                        WhatsApp Bisnis
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-accent-500 transition-colors"
                      >
                        LinkedIn Resmi
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-accent-500 transition-colors"
                      >
                        Instagram Portfolio
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="font-display font-bold uppercase tracking-wider text-[#2e2f2d] mb-2">
                    Kontak Langsung
                  </p>
                  <p className="font-mono">{siteConfig.contact.email}</p>
                  <p className="font-mono mt-1">{siteConfig.contact.phone}</p>
                  <p className="mt-2 text-[11px] text-[#2e2f2d]/60">{siteConfig.contact.address}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
