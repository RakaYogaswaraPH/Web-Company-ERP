import React from "react";
import { Container } from "@/components/ui/Container";
import { Cpu, Layers, Lock, Gauge } from "lucide-react";

export function WhyUs() {
  const advantages = [
    {
      num: "01",
      title: "Interkoneksi Tanpa Silo Data",
      description:
        "Data presensi dan tugas kerja di HRM terhubung langsung dengan dokumen arsip di DIGIARS, serta rekap omzet kasir PESANDONG dan penagihan KEUANGAN terpusat tanpa perantara ekspor manual.",
      icon: Layers,
    },
    {
      num: "02",
      title: "Kapabilitas IoT Hardware & Software",
      description:
        "Bukan sekadar form input data administratif; kami mengintegrasikan gateway telemetri fisik sensor air (WMS) langsung ke dashboard analitik dan kalkulasi pajak terpadu.",
      icon: Cpu,
    },
    {
      num: "03",
      title: "Audit Trail & Keamanan Bertingkat",
      description:
        "Role-Based Access Control (RBAC) ketat pada setiap modul memastikan data sensitif finansial dan kepegawaian hanya dapat diakses personel berwenang dengan log aktivitas lengkap.",
      icon: Lock,
    },
    {
      num: "04",
      title: "Implementasi Fleksibel (Cloud / On-Premise)",
      description:
        "Didukung opsi instalasi di infrastruktur cloud privat yang aman atau deployment on-premise lokal untuk kepatuhan regulasi data internal perusahaan Anda.",
      icon: Gauge,
    },
  ];

  return (
    <section id="why-us" className="border-b border-[#deded6] bg-[#f6f6f2] py-16 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Title & Statement */}
          <div className="lg:col-span-5">
            <span className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-[#2e2f2d]/60 block mb-2">
              Layanan Kami
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-[#2e2f2d] leading-[1.1]">
              Mengapa Memilih Jamparing Masagi?
            </h2>
            <p className="mt-6 text-sm sm:text-base text-[#2e2f2d]/75 leading-relaxed">
              Arsitektur aplikasi kami dibangun dengan fokus pada layanan operasional,
              kecepatan dalam mengolah data, dan kemudahan dalam penggunaan nya oleh semua pengguna.
            </p>
          </div>

          {/* Right Grid of Advantages */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {advantages.map((adv) => {
              const IconComp = adv.icon;
              return (
                <div
                  key={adv.num}
                  className="border border-[#deded6] bg-white p-4 sm:p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-[#deded6] pb-2.5 mb-3">
                      <span className="font-mono text-xs font-bold text-accent-500">
                        {adv.num}
                      </span>
                      <IconComp className="h-4 w-4 text-[#2e2f2d]/60" />
                    </div>

                    <h3 className="font-display text-sm sm:text-base font-bold uppercase text-[#2e2f2d]">
                      {adv.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-[13px] text-[#2e2f2d]/70 leading-relaxed">
                      {adv.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
