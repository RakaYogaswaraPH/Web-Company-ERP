import React from "react";
import { cn } from "@/lib/utils";
import { ProductStatus } from "@/types";

interface StatusBadgeProps {
  status: ProductStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  if (status === "coming-soon") {
    return (
      <span
        className={cn(
          "inline-flex items-center px-2.5 py-0.5 text-[11px] font-display uppercase tracking-widest font-semibold border border-navy-900/30 text-navy-900/80 bg-background rounded-none",
          className
        )}
      >
        Coming Soon
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 text-[11px] font-display uppercase tracking-widest font-semibold bg-navy-900 text-white rounded-none",
        className
      )}
    >
      Ready Live
    </span>
  );
}

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-xs font-display uppercase tracking-wider text-navy-900 border border-navy-900/20 bg-surface",
        className
      )}
    >
      {children}
    </span>
  );
}
