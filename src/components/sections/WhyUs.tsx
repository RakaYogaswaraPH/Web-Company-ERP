import React from "react";
import { Container } from "@/components/ui/Container";
import { Cpu, Layers, Lock, Gauge } from "lucide-react";

export function WhyUs() {
  const advantages = [
    {
      num: "01",
      title: "Sistem Cloud",
      description:
        "Akses seluruh sistem dengan mudah dan cepat dimana saja dan kapan saja.",
      icon: Layers,
    },
    {
      num: "02",
      title: "Keamanan Data",
      description:
        "Prosedur keamanan bersertifikasi ISO 27001 yang diterapkan pada semua sistem kami.",
      icon: Cpu,
    },
    {
      num: "03",
      title: "Manajemen Pengguna",
      description:
        "Pemberian hak akses guna memastikan data serta riwayat aktivitas keamanan sistem terjaga.",
      icon: Lock,
    },
    {
      num: "04",
      title: "Layanan 24/7",
      description:
        "Kami melayani bantuan teknis setiap harinya untuk mendukung operasional bisnis.",
      icon: Gauge,
    },
  ];

  return (
    <section id="why-us" className="border-b border-[#deded6] bg-[#f6f6f2] py-16 lg:py-24">
      <Container>
        {/* Top Header: Title on Left, Statement on Right */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[#deded6]">
          <div className="max-w-xl">
            <span className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-[#2e2f2d]/60 block mb-2">
              Layanan Kami
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-[#2e2f2d] leading-[1.1]">
              Mengapa Memilih Kami?
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#2e2f2d]/75 leading-relaxed">
            Arsitektur aplikasi kami dibangun dengan fokus pada layanan operasional,
            kecepatan dalam mengolah data, dan kemudahan dalam penggunaan nya oleh semua pengguna.
          </p>
        </div>

        {/* 4 Feature Columns Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((adv) => {
            const IconComp = adv.icon;
            return (
              <div
                key={adv.num}
                className="group border border-[#deded6] bg-white p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:border-[#2e2f2d]/40 hover:shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#deded6] pb-3 mb-5">
                    <span className="font-mono text-xs font-bold text-accent-500">
                      {adv.num}
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center bg-[#f6f6f2] border border-[#deded6] text-[#2e2f2d] transition-colors group-hover:bg-[#2e2f2d] group-hover:text-white">
                      <IconComp className="h-4 w-4" />
                    </div>
                  </div>

                  <h3 className="font-display text-base font-bold uppercase tracking-wide text-[#2e2f2d]">
                    {adv.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-[#2e2f2d]/70 leading-relaxed font-body">
                    {adv.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
