import { Product } from "@/types";

export const products: Product[] = [
  {
    slug: "digiars",
    name: "DIGIARS",
    subtitle: "Sistem Manajemen Dokumen",
    tagline: "Penyimpanan, Pengelolaan, dan pencarian dokumen digital.",
    description:
      "Platform digital arsip yang memudahkan untuk memanajemen dokumen bisnis: dari digitalisasi berkas, pemberian indeks dokumen dengan fitur metadata kustom, hingga kontrol hak akses untuk keamanan yang terjamin.",
    features: [
      "Fitur Indeks berbasis metadata & kategori sesuai kebutuhan",
      "Pencarian cepat dokumen dalam hitungan detik",
      "Hak akses bertingkat dengan otorisasasi lengkap",
      "Pratinjau dokumen langsung tanpa perlu unduh berkas",
    ],
    status: "live",
    icon: "archive",
    screenshot: "/assets/products/digiars/dashboard.webp",
    highlight: "Efisiensi pencarian dokumen hingga 85%",
  },
  {
    slug: "wms",
    name: "Water Tracking",
    subtitle: "Sistem Manajemen Pajak Air",
    tagline: "Pemantauan pemakaian air real-time dan kalkulasi pajak berbasis perangkat IoT.",
    description:
      "Aplikasi berbasis IoT untuk membaca aliran air secara berkala, memantau debit pemakaian secara sela,a 24/7, mendeteksi anomali konsumsi air, dan mengalkulasi perhitungan pajak air tanah secara otomatis.",
    features: [
      "Integrasi sensor telemetri debit & level air via IoT",
      "Dashboard pemakaian harian, mingguan, & bulanan",
      "Kalkulasi otomatis estimasi pajak pemanfaatan air tanah",
      "Peringatan dini indikasi kebocoran & anomali",
    ],
    status: "live",
    icon: "droplet",
    screenshot: "/assets/products/wms/dashboard.webp",
    highlight: "Monitoring air selama 24/7",
  },
  {
    slug: "pesandong",
    name: "PESANDONG",
    subtitle: "Sistem Manajemen Transaksi",
    tagline: "Pencatatan transaksi kasir, manajemen pesanan, dan inventori barang.",
    description:
      "Aplikasi kasir (POS) modern untuk gerai, ritel, dan operasional resto/bisnis yang mempermudah proses pemesanan cepat, menerima berbagai metode transaksi, pencetakan struk penjualan, hingga pemantauan stok produk.",
    features: [
      "Pencatatan transaksi kasir cepat dengan efisien",
      "Multi-metode pembayaran (Tunai, QRIS, & Transfer Bank)",
      "Manajemen katalog produk, varian harga, & stok real-time",
      "Laporan penjualan harian/bulanan & rekapitulasi omzet berkala",
    ],
    status: "live",
    icon: "shopping-bag",
    screenshot: "/assets/products/pesandong/dashboard.webp",
    highlight: "Transaksi kasir cepat, aman, dan efisien",
  },
  {
    slug: "keuangan",
    name: "FINANCE SYSTEM",
    subtitle: "Sistem Manajemen Keuangan",
    tagline: "Sistem perhitungan dan penagihan iuran bulanan, SPP, dan tagihan.",
    description:
      "Solusi untuk pengelolaan tagihan rutin (iuran lingkungan, SPP sekolah/kursus, sewa properti, atau tagihan berkala lainnya) dengan pembuatan invoice otomatis, pengingat pembayaran, dan rekap keuangan.",
    features: [
      "Otomasi jadwal invoice tagihan bulanan & SPP berkala",
      "Notifikasi status pembayaran lunas & pemantauan tunggakan",
      "Pengiriman pengingat tagihan otomatis via WhatsApp & Email",
      "Laporan arus tagihan dan rekap secara otomatis",
    ],
    status: "live",
    icon: "wallet",
    screenshot: "/assets/products/keuangan/dashboard.webp",
    highlight: "Otomasi penagihan dengan cepat dan efisien",
  },
  {
    slug: "hrm",
    name: "HR MANAGEMENT",
    subtitle: "Sistem Manajemen SDM",
    tagline: "Sistem absensi karyawan, manajemen tugas, dan surat menyurat",
    description:
      "Sistem tata kelola yang mengintegrasikan pencatatan kehadiran, pembagian dan pemantauan tugas kerja tim (Task Management), serta administrasi surat-menyurat kedinasan.",
    features: [
      "Validasi presensi akurat berbasis GPS & foto selfie",
      "Task Management penugasan kerja tim, prioritas, & deadline",
      "Administrasi surat-menyurat nomor surat otomatis, disposisi, & arsip",
      "Portal Karyawan untuk cuti, izin, & riwayat kerja",
    ],
    status: "live",
    icon: "users",
    screenshot: "/assets/products/hrm/dashboard.webp",
    highlight: "Integrasi absensi, tugas kerja, dan tata kelola",
  },
];
