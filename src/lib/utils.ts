import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidExternalUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ["https:", "mailto:", "tel:"].includes(parsed.protocol);
  } catch {
    return false;
  }
}
