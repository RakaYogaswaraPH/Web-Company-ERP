export type ProductStatus = "live" | "coming-soon";

export interface Product {
  slug: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  features: string[];
  status: ProductStatus;
  icon: "archive" | "droplet" | "receipt" | "users" | "clock";
  screenshot?: string;
  highlight?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  url: string;
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
  };
}
