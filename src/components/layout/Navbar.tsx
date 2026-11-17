"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { navItems, siteConfig } from "@/config/site";
import { motion, AnimatePresence, type Variants } from "motion/react";

// Stagger container for eye-catching nav links reveal
const navContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.16,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

const navItemVariants: Variants = {
  hidden: { opacity: 0, x: -50, filter: "blur(6px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    x: -30,
    filter: "blur(4px)",
    transition: {
      duration: 0.25,
      ease: "easeInOut",
    },
  },
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 1. THINKING ROOM FLOATING SIDE DOCK (Desktop only, hidden on mobile) */}
      <aside
        onClick={() => setIsOpen(true)}
        className="hidden md:flex fixed left-0 top-0 bottom-0 z-50 w-16 flex-col items-center justify-between py-6 border-r border-[#2e2f2d]/15 bg-[#f6f6f2]/40 backdrop-blur-md transition-all duration-300 hover:bg-[#eff1ea] hover:shadow-xl cursor-pointer group select-none"
        title="Buka Menu Navigasi"
        aria-label="Buka Navigasi Samping"
      >
        {/* Top: Brand Emblem Mark with subtle hover spin */}
        <div className="relative flex h-8 w-8 items-center justify-center transition-all duration-300 group-hover:scale-125 group-hover:rotate-6">
          <Image
            src="/assets/brands/Icons.webp"
            alt="Jamparing Masagi Icon"
            width={28}
            height={28}
            className="object-contain"
          />
        </div>

        {/* Middle: Thinking Room 3-Bars Symbol with rhythmic wave animation */}
        <div className="flex flex-col items-center gap-2 py-4">
          <div className="flex items-center gap-1.5">
            <span className="h-6 w-[2.5px] bg-[#2e2f2d]/70 rounded-full transition-all duration-300 group-hover:h-9 group-hover:bg-accent-500" />
            <span className="h-6 w-[2.5px] bg-[#2e2f2d]/70 rounded-full transition-all duration-300 delay-75 group-hover:h-11 group-hover:bg-[#2e2f2d]" />
            <span className="h-6 w-[2.5px] bg-[#2e2f2d]/70 rounded-full transition-all duration-300 delay-150 group-hover:h-9 group-hover:bg-accent-500" />
          </div>
          <span className="mt-1 font-display text-[9px] font-bold uppercase tracking-widest text-[#2e2f2d]/50 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-y-0.5">
            MENU
          </span>
        </div>

        {/* Bottom: Vertical Text Stamp */}
        <div className="flex flex-col items-center gap-3 font-mono text-[9px] font-semibold uppercase tracking-widest text-[#2e2f2d]/60 [writing-mode:vertical-rl] rotate-180 transition-colors group-hover:text-[#2e2f2d]">
          <span>MASAGI • ERP</span>
        </div>

        {/* Dynamic active glowing border indicator on hover */}
        <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-accent-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                className="flex h-10 w-10 items-center justify-center border border-[#deded6] text-[#2e2f2d] hover:border-[#2e2f2d] hover:bg-[#eff1ea] active:scale-95 transition-all focus:outline-none cursor-pointer"
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

            {/* Desktop Center: Tagline text */}
            <div className="hidden lg:flex items-center justify-center flex-1 px-4 text-center">
              <span className="font-display text-xs lg:text-sm font-light uppercase tracking-[0.25em] text-[#2e2f2d]">
                More Than Just ICT Solution
              </span>
            </div>

            {/* Desktop Right: Request Demo Button ONLY */}
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

      {/* 3. EYE-CATCHY FULL SLIDE-OUT DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop Overlay with dynamic fade & blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#2e2f2d]/55 backdrop-blur-sm cursor-pointer"
            />

            {/* Slide-out Panel from Left with spring bounce & leading edge glow */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 270,
                mass: 0.85,
              }}
              className="relative h-full w-full max-w-xl sm:max-w-2xl bg-[#eff1ea] border-r border-[#dcdfd5] shadow-2xl flex flex-col justify-between p-6 sm:p-14 overflow-y-auto"
            >
              {/* Eye-catching Accent Edge Strip */}
              <div className="absolute top-0 right-0 bottom-0 w-1 bg-gradient-to-b from-accent-500 via-[#d84939] to-accent-600 shadow-sm" />

              {/* Drawer Header with Entrance Animation */}
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
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
                      className="flex h-10 w-10 items-center justify-center border border-[#2e2f2d] bg-[#2e2f2d] text-white transition-colors duration-200 hover:bg-accent-500 hover:border-accent-500 focus:outline-none cursor-pointer active:scale-95"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Staggered Giant Typographic Nav Links */}
                <motion.nav
                  variants={navContainerVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="mt-8 sm:mt-12 flex flex-col gap-3 sm:gap-6"
                >
                  {navItems.map((item, idx) => (
                    <motion.div key={item.href} variants={navItemVariants}>
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="group flex items-baseline justify-between border-b border-[#2e2f2d]/10 pb-3 sm:pb-4 text-left transition-all relative overflow-hidden"
                      >
                        <div className="flex items-baseline gap-3 sm:gap-6">
                          <span className="font-mono text-xs sm:text-sm font-bold text-[#2e2f2d]/40 group-hover:text-accent-500 transition-colors duration-200">
                            0{idx + 1}
                          </span>
                          <span className="font-display text-2xl sm:text-5xl font-bold uppercase tracking-tight text-[#2e2f2d] transition-all duration-300 group-hover:translate-x-3 group-hover:text-accent-500">
                            {item.label}
                          </span>
                        </div>
                        <ArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6 text-[#2e2f2d]/30 opacity-0 group-hover:opacity-100 group-hover:text-accent-500 transition-all duration-300 -translate-y-2 translate-x-2 group-hover:translate-y-0 group-hover:translate-x-0" />
                        
                        {/* Hover bottom line reveal */}
                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                      </Link>
                    </motion.div>
                  ))}
                </motion.nav>
              </motion.div>

              {/* Drawer Footer Info with smooth entrance */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[#2e2f2d]/15 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-[#2e2f2d]/75"
              >
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
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
