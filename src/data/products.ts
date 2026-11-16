import { Product } from "@/types";

export const products: Product[] = [
  {
    slug: "digiars",
    name: "DIGIARS",
    subtitle: "Aplikasi Digital Arsip & Manajemen Berkas",
    tagline: "Penyimpanan, penataan, dan pencarian dokumen perusahaan secara digital",
    description:
      "Platform digital arsip terstruktur yang menyederhanakan siklus hidup dokumen bisnis: dari digitalisasi berkas, pengindeksan cerdas dengan metadata kustom, hingga kontrol hak akses bertingkat dan jejak audit yang terjamin.",
    features: [
      "Pengindeksan cerdas berbasis metadata & kategori departemen",
      "Pencarian cepat full-text dokumen dalam hitungan detik",
      "Hak akses bertingkat (RBAC) dengan audit trail lengkap",
      "Pratinjau dokumen langsung tanpa perlu unduh berkas",
    ],
    status: "live",
    icon: "archive",
    screenshot: "/assets/products/digiars/dashboard.webp",
    highlight: "Efisiensi pencarian dokumen hingga 85%",
  },
  {
    slug: "wms",
    name: "WMS",
    subtitle: "Water Monitoring System IoT",
    tagline: "Pemantauan pemakaian air real-time dan kalkulasi pajak berbasis sensor IoT",
    description:
      "Aplikasi berbasis IoT industri untuk membaca meteran air secara berkala, memantau debit pemakaian secara live 24/7, mendeteksi anomali konsumsi air, dan mengalkulasi kewajiban pajak pemanfaatan air tanah secara otomatis.",
    features: [
      "Integrasi sensor telemetri debit & level air via IoT gateway",
      "Dashboard analitik pemakaian harian, mingguan, & bulanan",
      "Kalkulasi otomatis estimasi pajak pemanfaatan air tanah",
      "Peringatan dini (early warning) indikasi kebocoran & anomali",
    ],
    status: "live",
    icon: "droplet",
    screenshot: "/assets/products/wms/dashboard.webp",
    highlight: "Monitoring 24/7 telemetri debit & pencegahan kebocoran",
  },
  {
    slug: "pesandong",
    name: "PESANDONG",
    subtitle: "Point of Sale & Sistem Kasir Terpadu",
    tagline: "Pencatatan transaksi kasir, manajemen pesanan, dan inventori bisnis",
    description:
      "Aplikasi kasir (POS) modern untuk gerai, ritel, dan operasional resto/bisnis yang mempermudah proses pemesanan cepat, menerima pembayaran multi-metode, pencetakan struk penjualan, hingga pemantauan stok produk secara live.",
    features: [
      "Pencatatan transaksi kasir cepat dengan antarmuka responsif",
      "Multi-metode pembayaran (Tunai, QRIS, & Transfer Bank)",
      "Manajemen katalog produk, varian harga, & stok real-time",
      "Laporan penjualan harian/bulanan & rekapitulasi omzet berkala",
    ],
    status: "live",
    icon: "shopping-bag",
    screenshot: "/assets/products/pesandong/dashboard.webp",
    highlight: "Transaksi kasir kilat dengan pencatatan inventori presisi",
  },
  {
    slug: "keuangan",
    name: "KEUANGAN",
    subtitle: "Sistem Manajemen Iuran, SPP & Tagihan Berkala",
    tagline: "Otomasi perhitungan dan penagihan iuran bulanan, SPP, dan tagihan berkala",
    description:
      "Solusi menyeluruh untuk pengelolaan tagihan rutin (iuran lingkungan, SPP sekolah/kursus, sewa properti, atau tagihan berkala lainnya) dengan pembuatan invoice otomatis, reminder pembayaran, dan rekonsiliasi kas transparan.",
    features: [
      "Otomasi jadwal invoice tagihan bulanan & SPP berkala",
      "Rekonsiliasi status pembayaran lunas & pemantauan tunggakan",
      "Pengiriman reminder tagihan otomatis via WhatsApp & Email",
      "Laporan arus kas masuk terpadu & rekap keuangan periodik",
    ],
    status: "live",
    icon: "wallet",
    screenshot: "/assets/products/keuangan/dashboard.webp",
    highlight: "Otomasi penagihan rutin tanpa rekap manual berulang",
  },
  {
    slug: "hrm",
    name: "HRM",
    subtitle: "Human Resource, Absensi, Task & Surat Menyurat",
    tagline: "Portal terpadu absensi karyawan, manajemen tugas, dan persuratan resmi",
    description:
      "Sistem tata kelola personalia komprehensif yang mengintegrasikan pencatatan kehadiran presisi (geofencing & shift), pembagian dan pemantauan tugas kerja tim (Task Management), serta alur administrasi surat-menyurat kedinasan.",
    features: [
      "Validasi presensi akurat berbasis geofencing GPS & foto selfie",
      "Task Management: penugasan kerja tim, prioritas, & deadline",
      "Administrasi surat-menyurat: nomor surat otomatis, disposisi, & arsip",
      "Portal Employee Self-Service (ESS) untuk cuti, izin, & riwayat kerja",
    ],
    status: "live",
    icon: "users",
    screenshot: "/assets/products/hrm/dashboard.webp",
    highlight: "Integrasi menyeluruh absensi, tugas kerja, dan tata kelola persuratan",
  },
];
