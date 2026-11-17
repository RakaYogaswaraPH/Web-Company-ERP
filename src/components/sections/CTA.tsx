"use client";

import React, { useState, useRef, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { ArrowUpRight, MessageSquare, Mail, Phone, CheckCircle2, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const PRODUCT_OPTIONS = [
  { value: "Semua Produk (Full Suite)", label: "Semua Modul (Full Suite ERP)"},
  { value: "DIGIARS", label: "DIGIARS — Manajemen Arsip"},
  { value: "Water Monitoring System", label: "Water Monitoring System — Manajemen Perpajakan Air Tanah"},
  { value: "PESANDONG", label: "PESANDONG — Manajemen Kasir POS & Inventori"},
  { value: "Finance System", label: "Finance System — Manajemen Iuran, SPP & Tagihan"},
  { value: "HR management", label: "HR Management — Manajemen Absensi, Task & Surat Menyurat"},
];

export function CTA() {
  const [submitted, setSubmitted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    selectedProduct: "Semua Produk (Full Suite)",
    message: "",
    // Honeypot field to catch spam bots per security guidelines
    website_hp: "",
  });

  // Close custom dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropdownOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.website_hp) return;

    const subject = encodeURIComponent(`Permintaan Demo ERP - ${formData.company || formData.name}`);
    const body = encodeURIComponent(
      `Nama: ${formData.name}\nPerusahaan: ${formData.company}\nEmail: ${formData.email}\nTelepon: ${formData.phone}\nModul Diminati: ${formData.selectedProduct}\n\nPesan:\n${formData.message}`
    );

    window.location.href = `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const selectedOption = PRODUCT_OPTIONS.find((opt) => opt.value === formData.selectedProduct) || PRODUCT_OPTIONS[0];

  return (
    <section id="contact" className="border-b border-[#deded6] bg-[#f6f6f2] py-16 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-[#2e2f2d]/60 block mb-2">
                Hubungi Kami
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-[#2e2f2d] leading-[1.1]">
                Konsultasikan Kebutuhan Anda
              </h2>

              <p className="mt-6 text-sm sm:text-base text-[#2e2f2d]/75 leading-relaxed font-body">
                Diskusikan kebutuhan bisnis Anda bersama kami untuk mewujudkan bisnis yang anda capai.
              </p>

              {/* Direct Channels */}
              <div className="mt-8 flex flex-col gap-4">
                {/* WhatsApp Link */}
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between border border-[#deded6] bg-white p-4 transition-all hover:border-[#2e2f2d] hover:shadow-sm group"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center bg-[#2e2f2d] text-white">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-display text-xs font-bold uppercase tracking-wider text-[#2e2f2d]">
                        WhatsApp Bisnis
                      </p>
                      <p className="font-mono text-xs text-[#2e2f2d]/60 mt-0.5">
                        +{siteConfig.contact.whatsapp}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[#2e2f2d]/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#2e2f2d]" />
                </a>

                {/* Email Link */}
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center justify-between border border-[#deded6] bg-white p-4 transition-all hover:border-[#2e2f2d] hover:shadow-sm group"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center bg-[#2e2f2d] text-white">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-display text-xs font-bold uppercase tracking-wider text-[#2e2f2d]">
                        Email Resmi
                      </p>
                      <p className="font-mono text-xs text-[#2e2f2d]/60 mt-0.5">
                        {siteConfig.contact.email}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[#2e2f2d]/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#2e2f2d]" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Request Demo Form (Clean #f6f6f2 Background, No Outer Border) */}
          <div className="lg:col-span-7">
            <div className="bg-[#f6f6f2] p-6 sm:p-10">
              <div className="flex items-center justify-between border-b border-[#2e2f2d]/15 pb-4 mb-6">
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-semibold uppercase text-[#2e2f2d]">
                    Permintaan Uji Coba
                  </h3>
                  <p className="text-xs text-[#2e2f2d]/60 mt-1">
                    Pilih aplikasi yang ingin Anda uji coba bersama kami
                  </p>
                </div>
              </div>

              {submitted ? (
                <div className="p-8 text-center bg-white border border-[#deded6]">
                  <CheckCircle2 className="h-12 w-12 text-[#2e2f2d] mx-auto mb-3" />
                  <h4 className="font-display text-lg font-semibold uppercase text-[#2e2f2d]">
                    Permintaan Telah Diteruskan
                  </h4>
                  <p className="text-xs sm:text-sm text-[#2e2f2d]/70 mt-2">
                    Klien email Anda telah terbuka dengan rincian pesan. Tim sales & teknis kami akan merespons dalam waktu 1x24 jam kerja.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 inline-block text-xs font-display font-semibold uppercase tracking-wider text-[#2e2f2d] underline"
                  >
                    Kirim formulir lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot field (hidden from real users) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website_hp">Jangan isi field ini:</label>
                    <input
                      type="text"
                      id="website_hp"
                      name="website_hp"
                      value={formData.website_hp}
                      onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-display text-xs font-light uppercase tracking-wider text-[#2e2f2d] mb-1">
                        Nama Lengkap *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Contoh: Rian Anggoro"
                        className="w-full border border-[#dcdfd5] bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#2e2f2d] focus:border-[#2e2f2d] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-display text-xs font-light uppercase tracking-wider text-[#2e2f2d] mb-1">
                        Nama Perusahaan / Instansi *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Contoh: PT Sumber Tirta Abadi"
                        className="w-full border border-[#dcdfd5] bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#2e2f2d] focus:border-[#2e2f2d] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-display text-xs font-light uppercase tracking-wider text-[#2e2f2d] mb-1">
                        Alamat Email Kerja *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="nama@perusahaan.com"
                        className="w-full border border-[#dcdfd5] bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#2e2f2d] focus:border-[#2e2f2d] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-display text-xs font-light uppercase tracking-wider text-[#2e2f2d] mb-1">
                        Nomor WhatsApp / Telepon *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="0812xxxxxxx"
                        className="w-full border border-[#dcdfd5] bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#2e2f2d] focus:border-[#2e2f2d] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Custom Styled Dropdown Component */}
                  <div className="relative" ref={dropdownRef}>
                    <label className="block font-display text-xs font-light uppercase tracking-wider text-[#2e2f2d] mb-1">
                      Modul Aplikasi yang Diminati *
                    </label>
                    <button
                      type="button"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className={cn(
                        "w-full flex items-center justify-between border bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#2e2f2d] text-left transition-all cursor-pointer focus:outline-none",
                        dropdownOpen ? "border-[#2e2f2d] ring-1 ring-[#2e2f2d]" : "border-[#dcdfd5] hover:border-[#2e2f2d]"
                      )}
                      aria-haspopup="listbox"
                      aria-expanded={dropdownOpen}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="font-light text-[#2e2f2d] truncate">
                          {selectedOption.label}
                        </span>
                      </div>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 text-[#2e2f2d]/70 transition-transform duration-200 shrink-0 ml-2",
                          dropdownOpen && "rotate-180 text-[#2e2f2d]"
                        )}
                      />
                    </button>

                    {/* Popover Menu with custom styling */}
                    {dropdownOpen && (
                      <div className="absolute left-0 right-0 top-full mt-1.5 z-40 border border-[#2e2f2d]/20 bg-white shadow-xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-100">
                        <div className="max-h-60 overflow-y-auto divide-y divide-[#deded6]/60">
                          {PRODUCT_OPTIONS.map((opt) => {
                            const isSelected = formData.selectedProduct === opt.value;
                            return (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => {
                                  setFormData({ ...formData, selectedProduct: opt.value });
                                  setDropdownOpen(false);
                                }}
                                className={cn(
                                  "w-full flex items-center justify-between px-4 py-3 text-left transition-colors cursor-pointer group",
                                  isSelected
                                    ? "bg-[#2e2f2d] text-white"
                                    : "bg-white text-[#2e2f2d] hover:bg-[#f6f6f2]"
                                )}
                              >
                                <div className="pr-2">
                                  <p
                                    className={cn(
                                      "text-xs sm:text-sm font-light",
                                      isSelected ? "text-white" : "text-[#2e2f2d] group-hover:text-accent-500"
                                    )}
                                  >
                                    {opt.label}
                                  </p>
                                  <p
                                    className={cn(
                                      "text-[10px] font-mono mt-0.5",
                                      isSelected ? "text-white/70" : "text-[#2e2f2d]/60"
                                    )}
                                  >
                                  </p>
                                </div>
                                {isSelected && <Check className="h-4 w-4 text-accent-500 shrink-0 ml-2" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block font-display text-xs font-light uppercase tracking-wider text-[#2e2f2d] mb-1">
                      Kebutuhan atau Catatan Tambahan (Opsional)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Ceritakan estimasi jumlah pengguna atau kendala operasional yang ingin diselesaikan..."
                      className="w-full border border-[#dcdfd5] bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#2e2f2d] focus:border-[#2e2f2d] focus:outline-none resize-none transition-colors"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-accent-500 py-3.5 font-display text-xs sm:text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-accent-600 active:scale-[0.99] shadow-sm cursor-pointer"
                    >
                      Kirim Permintaan Uji Coba
                    </button>
                    <p className="mt-2 text-center text-[11px] text-[#2e2f2d]/50">
                      Privasi terjamin. Data Anda tidak akan dibagikan kepada pihak ketiga.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
