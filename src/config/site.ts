import { SiteConfig, NavItem } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Jamparing Masagi",
  shortName: "PT. Jamparing Masagi",
  tagline: "PT. Jamparing Masagi — More Than Just ICT Solution.",
  description:
    "ERP Solution.",
  url: "https://jamparingmasagi.id", // TODO(isi-konten): sesuaikan dengan domain resmi bila sudah ada
  contact: {
    email: "info@jamparingmasagi.id", // TODO(isi-konten): konfirmasi email resmi
    phone: "+62 812-3456-7890", // TODO(isi-konten): konfirmasi nomor telepon resmi
    whatsapp: "6281234567890", // TODO(isi-konten): nomor WhatsApp untuk CTA langsung
    address: "Bandung, Jawa Barat, Indonesia", // TODO(isi-konten): alamat kantor resmi
  },
};

export const navItems: NavItem[] = [
  { label: "Solusi", href: "#portfolio" },
  { label: "Keunggulan", href: "#why-us" },
  { label: "Tentang Kami", href: "#about" },
  { label: "Kontak", href: "#contact" },
];
