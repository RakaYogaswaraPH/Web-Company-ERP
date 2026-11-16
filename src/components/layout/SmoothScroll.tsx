"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    // Global clean anchor link interceptor: scrolls to section smoothly without appending #hash to URL
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a[href*="#"]');
      if (!target) return;

      const rawHref = target.getAttribute("href");
      if (!rawHref) return;

      const hashIndex = rawHref.indexOf("#");
      if (hashIndex === -1) return;

      const hash = rawHref.slice(hashIndex);
      if (!hash || hash === "#") return;

      const targetElement = document.querySelector(hash);
      if (targetElement) {
        e.preventDefault();
        e.stopPropagation();

        lenis.scrollTo(targetElement as HTMLElement, {
          offset: -80, // account for sticky header height
          duration: 1.1,
        });

        // Keep URL completely clean (never show #hash in browser address bar)
        if (window.location.hash) {
          history.replaceState(null, "", window.location.pathname);
        }
      }
    };

    // Clean initial hash if page loaded with one
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname);
    }

    const handleHashChange = () => {
      history.replaceState(null, "", window.location.pathname);
    };

    document.addEventListener("click", handleAnchorClick, true);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleAnchorClick, true);
      window.removeEventListener("hashchange", handleHashChange);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
