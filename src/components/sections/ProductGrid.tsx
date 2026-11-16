import React from "react";
import { Container } from "@/components/ui/Container";
import { products } from "@/data/products";
import { ProductIcon } from "@/components/ui/ProductIcon";
import { CheckCircle2 } from "lucide-react";

export function ProductGrid() {
  return (
    <section id="products" className="border-b border-[#deded6] bg-[#f0f0eb] py-14 lg:py-20">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between border-b border-[#deded6] pb-8">
          <div>
            <span className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-[#2e2f2d]/60 block mb-2">
              Katalog Lengkap
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-[#2e2f2d]">
              Spesifikasi Seluruh Modul
            </h2>
          </div>
          <p className="mt-4 md:mt-0 max-w-md text-xs sm:text-sm text-[#2e2f2d]/70">
            Setiap modul dapat diimplementasikan secara terpisah sesuai skala prioritas divisi Anda,
            atau dihubungkan secara serentak.
          </p>
        </div>

        {/* 5 Products Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((p, idx) => (
            <div
              key={p.slug}
              className={`flex flex-col border bg-white p-5 sm:p-6 transition-shadow hover:shadow-md ${
                p.status === "coming-soon"
                  ? "border-dashed border-[#2e2f2d]/30 bg-[#f9f9f6]"
                  : "border-[#deded6]"
              }`}
            >
              {/* Card Header: number only */}
              <div className="flex items-center justify-between border-b border-[#deded6] pb-3 mb-4">
                <span className="font-mono text-xs font-bold text-[#2e2f2d]/50">
                  0{idx + 1}
                </span>
              </div>

              {/* Icon + Name */}
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-9 w-9 items-center justify-center bg-[#2e2f2d] text-white shrink-0">
                  <ProductIcon name={p.icon} className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold uppercase text-[#2e2f2d]">
                    {p.name}
                  </h3>
                  <p className="font-mono text-[10px] uppercase text-[#2e2f2d]/60">
                    {p.subtitle.split("&")[0]}
                  </p>
                </div>
              </div>

              <p className="mt-1 text-xs sm:text-sm font-semibold text-[#2e2f2d] leading-snug">
                {p.tagline}
              </p>

              <p className="mt-2 text-xs text-[#2e2f2d]/70 leading-relaxed">
                {p.description}
              </p>

              {/* Features */}
              <div className="mt-5 border-t border-[#deded6] pt-4">
                <p className="font-display text-[11px] font-bold uppercase tracking-wider text-[#2e2f2d] mb-2">
                  Fitur Kunci:
                </p>
                <ul className="space-y-1.5">
                  {p.features.slice(0, 3).map((f, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-xs text-[#2e2f2d]/75">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#2e2f2d] shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {/* 6th Card: Custom Integration Consulting */}
          <div className="flex flex-col justify-between border border-[#2e2f2d] bg-[#2e2f2d] text-white p-5 sm:p-6">
            <div>
              <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-4">
                <span className="font-mono text-xs font-bold text-accent-500">
                  KONSULTASI
                </span>
                <span className="text-[11px] font-mono text-white/60">AD HOC / CUSTOM</span>
              </div>

              <h3 className="font-display text-xl font-bold uppercase tracking-tight text-white">
                Butuh Penyesuaian Khusus?
              </h3>

              <p className="mt-3 text-xs sm:text-sm text-white/80 leading-relaxed font-body">
                Setiap alur bisnis memiliki keunikan operasional. Tim engineering Jamparing Masagi siap
                menyesuaikan modul, skema database, atau protokol integrasi API dengan legacy system Anda.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/20">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-xs font-display font-bold uppercase tracking-wider text-white hover:text-accent-500 transition-colors"
              >
                Konsultasikan Kebutuhan →
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
