"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { ArrowUpRight, MessageSquare, Mail, Phone, CheckCircle2 } from "lucide-react";

export function CTA() {
  const [submitted, setSubmitted] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // If honeypot filled, silently drop
    if (formData.website_hp) {
      return;
    }

    // Static site submission: direct to mailto or confirm state
    const subject = encodeURIComponent(`Permintaan Demo ERP - ${formData.company || formData.name}`);
    const body = encodeURIComponent(
      `Nama: ${formData.name}\nPerusahaan: ${formData.company}\nEmail: ${formData.email}\nTelepon: ${formData.phone}\nModul Diminati: ${formData.selectedProduct}\n\nPesan:\n${formData.message}`
    );

    window.location.href = `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

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
                Konsultasikan Kebutuhan Sistem Anda
              </h2>

              <p className="mt-6 text-sm sm:text-base text-[#2e2f2d]/75 leading-relaxed font-body">
                Diskusikan tantangan operasional perusahaan Anda bersama konsultan teknis Jamparing Masagi.
                Kami siap mendemokan alur kerja tiap modul secara interaktif.
              </p>

              {/* Direct Channels */}
              <div className="mt-8 flex flex-col gap-4">
                {/* WhatsApp Link */}
                <ExternalLink
                  href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
                    "Halo Tim Jamparing Masagi, saya ingin mendiskusikan implementasi aplikasi ERP untuk perusahaan kami."
                  )}`}
                  className="flex items-center gap-4 border border-[#deded6] bg-white p-4 transition-all hover:border-[#2e2f2d]"
                >
                  <div className="flex h-10 w-10 items-center justify-center bg-[#2e2f2d] text-white shrink-0">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-display text-xs font-bold uppercase text-[#2e2f2d]">
                      WhatsApp Bisnis
                    </p>
                    <p className="text-xs text-[#2e2f2d]/60">{siteConfig.contact.phone}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[#2e2f2d]/50" />
                </ExternalLink>

                {/* Email Link */}
                <ExternalLink
                  href={`mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
                    "Pertanyaan Implementasi ERP Jamparing Masagi"
                  )}`}
                  className="flex items-center gap-4 border border-[#deded6] bg-white p-4 transition-all hover:border-[#2e2f2d]"
                >
                  <div className="flex h-10 w-10 items-center justify-center bg-[#2e2f2d] text-white shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-display text-xs font-bold uppercase text-[#2e2f2d]">
                      Email Resmi
                    </p>
                    <p className="text-xs text-[#2e2f2d]/60">{siteConfig.contact.email}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[#2e2f2d]/50" />
                </ExternalLink>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#deded6] text-xs text-[#2e2f2d]/60">
              <p className="font-semibold text-[#2e2f2d] mb-1">{siteConfig.shortName}</p>
              <p>{siteConfig.contact.address}</p>
              <p className="mt-2 text-[11px] text-[#2e2f2d]/50">
                TODO(isi-konten): Konfirmasi jam operasional & alamat detail kantor resmi
              </p>
            </div>
          </div>

          {/* Right Column: Request Demo Form */}
          <div className="lg:col-span-7">
            <div className="border border-[#2e2f2d] bg-white p-6 sm:p-10 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#deded6] pb-4 mb-6">
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold uppercase text-[#2e2f2d]">
                    Formulir Permintaan Uji Coba
                  </h3>
                  <p className="text-xs text-[#2e2f2d]/60 mt-1">
                    Pilih aplikasi yang ingin Anda uji coba atau jadwalkan presentasi
                  </p>
                </div>
                <span className="font-mono text-xs font-bold text-accent-500 uppercase">
                  GRATIS
                </span>
              </div>

              {submitted ? (
                <div className="p-8 text-center bg-[#eeeee8] border border-[#deded6]">
                  <CheckCircle2 className="h-12 w-12 text-[#2e2f2d] mx-auto mb-3" />
                  <h4 className="font-display text-lg font-bold uppercase text-[#2e2f2d]">
                    Permintaan Telah Diteruskan
                  </h4>
                  <p className="text-xs sm:text-sm text-[#2e2f2d]/70 mt-2">
                    Klien email Anda telah terbuka dengan rincian pesan. Tim sales & teknis kami akan merespons dalam waktu 1x24 jam kerja.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 inline-block text-xs font-display font-bold uppercase tracking-wider text-[#2e2f2d] underline"
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
                      <label className="block font-display text-xs font-bold uppercase tracking-wider text-[#2e2f2d] mb-1">
                        Nama Lengkap *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Contoh: Rian Anggoro"
                        className="w-full border border-[#deded6] bg-[#fbfbf9] px-3.5 py-2.5 text-xs sm:text-sm text-[#2e2f2d] focus:border-[#2e2f2d] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-display text-xs font-bold uppercase tracking-wider text-[#2e2f2d] mb-1">
                        Nama Perusahaan / Instansi *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Contoh: PT Sumber Tirta Abadi"
                        className="w-full border border-[#deded6] bg-[#fbfbf9] px-3.5 py-2.5 text-xs sm:text-sm text-[#2e2f2d] focus:border-[#2e2f2d] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-display text-xs font-bold uppercase tracking-wider text-[#2e2f2d] mb-1">
                        Alamat Email Kerja *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="nama@perusahaan.com"
                        className="w-full border border-[#deded6] bg-[#fbfbf9] px-3.5 py-2.5 text-xs sm:text-sm text-[#2e2f2d] focus:border-[#2e2f2d] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-display text-xs font-bold uppercase tracking-wider text-[#2e2f2d] mb-1">
                        Nomor WhatsApp / Telepon *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="0812xxxxxxx"
                        className="w-full border border-[#deded6] bg-[#fbfbf9] px-3.5 py-2.5 text-xs sm:text-sm text-[#2e2f2d] focus:border-[#2e2f2d] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-display text-xs font-bold uppercase tracking-wider text-[#2e2f2d] mb-1">
                      Modul Aplikasi yang Diminati *
                    </label>
                    <select
                      value={formData.selectedProduct}
                      onChange={(e) => setFormData({ ...formData, selectedProduct: e.target.value })}
                      className="w-full border border-[#deded6] bg-[#fbfbf9] px-3.5 py-2.5 text-xs sm:text-sm text-[#2e2f2d] focus:border-[#2e2f2d] focus:outline-none"
                    >
                      <option value="Semua Produk (Full Suite)">Semua Modul (Full Suite ERP)</option>
                      <option value="DIGIARS (Digital Arsip)">DIGIARS — Digital Arsip Perusahaan</option>
                      <option value="WMS (Water Monitoring System)">WMS — Water Monitoring System IoT</option>
                      <option value="PESANDONG (Kasir POS)">PESANDONG — Kasir POS & Inventori Ritel</option>
                      <option value="KEUANGAN (Iuran & SPP)">KEUANGAN — Manajemen Iuran, SPP & Tagihan</option>
                      <option value="HRM (Absensi, Task & Surat)">HRM — Absensi, Task Management & Surat Menyurat</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-display text-xs font-bold uppercase tracking-wider text-[#2e2f2d] mb-1">
                      Kebutuhan atau Catatan Tambahan (Opsional)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Ceritakan estimasi jumlah pengguna atau kendala operasional yang ingin diselesaikan..."
                      className="w-full border border-[#deded6] bg-[#fbfbf9] px-3.5 py-2.5 text-xs sm:text-sm text-[#2e2f2d] focus:border-[#2e2f2d] focus:outline-none resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-accent-500 py-3.5 font-display text-xs sm:text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-accent-600 active:scale-[0.99] shadow-sm cursor-pointer"
                    >
                      Kirim Permintaan Demo Sekarang
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
