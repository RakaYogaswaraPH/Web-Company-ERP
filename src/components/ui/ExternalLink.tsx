import React from "react";
import { cn, isValidExternalUrl } from "@/lib/utils";

interface ExternalLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function ExternalLink({
  href,
  children,
  className,
  ...props
}: ExternalLinkProps) {
  const isSafe = isValidExternalUrl(href);
  const safeHref = isSafe ? href : "#";

  return (
    <a
      href={safeHref}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center transition-colors hover:text-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-600 focus:ring-offset-2",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}
