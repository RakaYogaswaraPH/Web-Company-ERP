import React from "react";
import { Container } from "@/components/ui/Container";
import { ArrowUpRight, Cpu, Layers, Lock, Gauge } from "lucide-react";

export function WhyUs() {
  const advantages = [
    {
      num: "01",
      title: "Interkoneksi Tanpa Silo Data",
      description:
        "Data kehadiran dari AbsensiKu langsung mengalir ke perhitungan gaji HRIS Masagi, sementara dokumen kontrak dan slip tersimpan rapi di DIGIARS tanpa perantara ekspor manual.",
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
            <span className="font-mono text-xs uppercase tracking-widest text-navy-900/60 block mb-2">
              Karakteristik Sistem
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-navy-900 leading-[1.1]">
              Mengapa Memilih Jamparing Masagi?
            </h2>
            <p className="mt-6 text-sm sm:text-base text-navy-900/75 leading-relaxed">
              Arsitektur aplikasi kami dibangun dengan fokus pada keandalan operasional,
              kecepatan olah data, dan kemudahan adopsi oleh staf lapangan maupun jajaran manajemen.
            </p>

            <div className="mt-8 border border-[#deded6] bg-white p-6">
              <span className="font-mono text-xs text-navy-900/50 block mb-1">KOMITMEN KUALITAS</span>
              <p className="font-display text-sm font-bold uppercase text-navy-900">
                Dukungan Purna Jual & Pelatihan Terjadwal
              </p>
              <p className="mt-2 text-xs text-navy-900/70 leading-relaxed">
                Setiap lisensi implementasi didampingi pendampingan migrasi data awal, pelatihan staf,
                dan SLA dukungan teknis responsif.
              </p>
            </div>
          </div>

          {/* Right Grid of Advantages */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {advantages.map((adv) => {
              const IconComp = adv.icon;
              return (
                <div
                  key={adv.num}
                  className="border border-[#deded6] bg-white p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-[#deded6] pb-3 mb-4">
                      <span className="font-mono text-xs font-bold text-accent-500">
                        {adv.num}
                      </span>
                      <IconComp className="h-4 w-4 text-navy-900/60" />
                    </div>

                    <h3 className="font-display text-lg font-bold uppercase text-navy-900">
                      {adv.title}
                    </h3>

                    <p className="mt-3 text-xs sm:text-sm text-navy-900/70 leading-relaxed">
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
