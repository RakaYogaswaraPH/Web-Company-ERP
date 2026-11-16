import { Product } from "@/types";

export const products: Product[] = [
  {
    slug: "digiars",
    name: "DIGIARS",
    subtitle: "Digital Archive & Document Intelligence",
    tagline: "Penyimpanan dan penelusuran dokumen arsip perusahaan secara digital",
    description:
      "Platform digital arsip terstruktur yang menyederhanakan siklus hidup dokumen bisnis: dari digitalisasi, pengindeksan cerdas dengan metadata kustom, hingga kontrol hak akses bertingkat dan jejak audit yang terjamin.",
    features: [
      "Pengindeksan cerdas berbasis metadata & kategori departemen",
      "Pencarian cepat full-text dokumen dalam hitungan detik",
      "Hak akses bertingkat (RBAC) dengan audit trail lengkap",
      "Pratinjau dokumen langsung tanpa perlu unduh berkas",
    ],
    status: "live",
    icon: "archive",
    screenshot: "/assets/products/digiars/dashboard.webp", // TODO(isi-konten): unggah screenshot asli DIGIARS
    highlight: "Efisiensi pencarian dokumen hingga 85%",
  },
  {
    slug: "wms",
    name: "WMS",
    subtitle: "Water Management System & IoT Telemetry",
    tagline: "Pemantauan pemakaian air dan kalkulasi pajak berbasis sensor IoT real-time",
    description:
      "Aplikasi berbasis IoT industri untuk membaca meteran air secara berkala, memantau debit pemakaian secara live, mendeteksi anomali konsumsi air, dan mengalkulasi kewajiban pajak pemanfaatan air tanah secara otomatis.",
    features: [
      "Integrasi sensor telemetri debit & level air via IoT gateway",
      "Dashboard analitik pemakaian harian, mingguan, & bulanan",
      "Kalkulasi otomatis estimasi pajak pemanfaatan air tanah",
      "Peringatan dini (early warning) indikasi kebocoran & anomali",
    ],
    status: "live",
    icon: "droplet",
    screenshot: "/assets/products/wms/dashboard.webp", // TODO(isi-konten): unggah screenshot asli WMS
    highlight: "Monitoring 24/7 telemetri debit & pencegahan kebocoran",
  },
  {
    slug: "iurmoney",
    name: "IurMoney", // TODO(isi-konten): konfirmasi nama produk resmi bila sudah final
    subtitle: "Money Collection & Automated Billing Engine",
    tagline: "Perhitungan dan penagihan iuran bulanan berkala terotomasi",
    description:
      "Solusi pengelolaan penagihan iuran rutin (retribusi, sewa, atau iuran lingkungan) yang mengotomasi pembuatan invoice berulang, mengirimkan reminder tagihan, dan menyajikan status pembayaran secara transparan.",
    features: [
      "TODO(isi-konten): Otomasi pembuatan jadwal invoice bulanan",
      "TODO(isi-konten): Rekonsiliasi pembayaran multi-metode",
      "TODO(isi-konten): Reminder tagihan via WhatsApp & Email",
      "TODO(isi-konten): Laporan arus kas masuk & pemantauan tunggakan",
    ],
    status: "coming-soon",
    icon: "receipt",
    screenshot: undefined, // Sesuai aturan: screenshot IurMoney belum ada, gunakan teaser teks & badge
    highlight: "Otomasi penagihan rutin tanpa rekap manual",
  },
  {
    slug: "hris",
    name: "HRIS Masagi", // TODO(isi-konten): konfirmasi penamaan resmi modul HRIS
    subtitle: "Human Resource & Payroll Management",
    tagline: "Manajemen data karyawan, payroll, dan persetujuan cuti dalam satu portal",
    description:
      "Sistem administrasi personalia terpadu untuk mengelola siklus kerja karyawan: administrasi biodata, perhitungan payroll dengan komponen tunjangan dan potongan pajak, hingga approval pengajuan cuti dan lembur.",
    features: [
      "Database terpusat data karyawan, dokumen, & riwayat kontrak",
      "Perhitungan payroll otomatis dengan kalkulasi PPh 21 & BPJS",
      "Workflow pengajuan & approval cuti, izin, serta lembur online",
      "Portal Employee Self-Service (ESS) untuk akses mandiri staf",
    ],
    status: "live",
    icon: "users",
    screenshot: "/assets/products/hris/dashboard.webp", // TODO(isi-konten): unggah screenshot asli HRIS
    highlight: "Rekonsiliasi payroll akurat & bebas human error",
  },
  {
    slug: "absensi",
    name: "AbsensiKu", // TODO(isi-konten): konfirmasi penamaan resmi aplikasi Absensi
    subtitle: "Precision Attendance & Geofencing Tracking",
    tagline: "Pencatatan presensi kerja presisi dengan validasi lokasi dan jam kerja",
    description:
      "Aplikasi presensi modern yang mendukung fleksibilitas kerja lapangan, kantor, maupun remote dengan pembatasan geofencing GPS, verifikasi selfie, dan sinkronisasi real-time ke modul HRIS.",
    features: [
      "Validasi presensi berbasis geofencing GPS & foto verifikasi",
      "Manajemen shift kerja, toleransi keterlambatan, & jadwal fleksibel",
      "Rekapitulasi kehadiran harian/bulanan siap export ke payroll",
      "Monitoring kehadiran tim lapangan secara real-time",
    ],
    status: "live",
    icon: "clock",
    screenshot: "/assets/products/absensi/dashboard.webp", // TODO(isi-konten): unggah screenshot asli AbsensiKu
    highlight: "Verifikasi presensi akurat anti manipulasi lokasi",
  },
];
