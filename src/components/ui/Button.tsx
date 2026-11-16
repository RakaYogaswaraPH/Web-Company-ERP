import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-display font-medium uppercase tracking-wider transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const variants = {
    primary:
      "bg-accent-500 text-white hover:bg-accent-600 active:scale-[0.98] shadow-sm",
    secondary:
      "bg-[#2e2f2d] text-white hover:bg-[#424441] active:scale-[0.98]",
    outline:
      "border border-[#2e2f2d] text-[#2e2f2d] hover:bg-[#2e2f2d] hover:text-white active:scale-[0.98]",
    ghost:
      "text-[#2e2f2d] hover:bg-black/5 active:scale-[0.98]",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-7 py-3.5 gap-2.5",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
