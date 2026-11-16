"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { navItems, siteConfig } from "@/config/site";
import { motion, AnimatePresence } from "motion/react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#deded6] bg-[#f6f6f2]/95 backdrop-blur-md transition-colors">
        <Container>
          <div className="flex h-20 items-center justify-between">
            {/* Logo Jamparing Masagi */}
            <Link
              href="/"
              className="flex items-center gap-3 transition-opacity hover:opacity-90 focus:outline-none"
            >
              <div className="relative h-9 w-32 sm:w-36">
                <Image
                  src="/assets/logo/logo.webp"
                  alt="Logo Jamparing Masagi"
                  fill
                  priority
                  className="object-contain object-left"
                />
              </div>
              <span className="hidden h-5 w-px bg-[#deded6] md:inline-block" />
              <span className="hidden font-display text-xs font-bold uppercase tracking-widest text-navy-900 md:inline-block">
                ERP SUITE
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-8 lg:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative font-display text-xs font-semibold uppercase tracking-widest text-navy-900/80 transition-colors hover:text-navy-900"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-navy-900 transition-all duration-200 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Action Buttons & Mobile Hamburger */}
            <div className="flex items-center gap-3">
              <a
                href="#contact"
                className="hidden sm:inline-flex items-center gap-2 border border-navy-900 bg-navy-900 px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-accent-500 hover:border-accent-500 active:scale-95"
              >
                Request Demo
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>

              {/* Hamburger Button */}
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Tutup Menu" : "Buka Menu"}
                className="flex h-10 w-10 items-center justify-center border border-[#deded6] text-navy-900 transition-colors hover:border-navy-900 focus:outline-none lg:hidden"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Thinking Room Style Full-screen / Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-x-0 top-20 z-30 border-b border-[#deded6] bg-[#f6f6f2] p-6 shadow-xl lg:hidden"
          >
            <div className="flex flex-col gap-6">
              <p className="font-display text-[11px] uppercase tracking-widest text-navy-900/50">
                Menu Navigasi
              </p>
              <div className="flex flex-col gap-4">
                {navItems.map((item, idx) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-baseline justify-between border-b border-[#deded6] pb-3 text-left font-display text-2xl font-bold uppercase text-navy-900 transition-colors hover:text-accent-500"
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-xs text-navy-900/40">
                      0{idx + 1}
                    </span>
                  </Link>
                ))}
              </div>

              <div className="pt-2">
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center justify-center gap-2 bg-navy-900 py-3.5 font-display text-sm font-bold uppercase tracking-wider text-white hover:bg-accent-500"
                >
                  Request Demo Langsung
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>

              <div className="pt-4 border-t border-[#deded6] flex flex-col gap-1 text-xs text-navy-900/70">
                <p className="font-semibold text-navy-900">{siteConfig.shortName}</p>
                <p>{siteConfig.contact.email}</p>
                <p>{siteConfig.contact.phone}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
