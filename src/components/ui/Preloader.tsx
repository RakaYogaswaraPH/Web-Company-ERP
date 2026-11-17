"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Lock body scroll during preloader
    document.body.style.overflow = "hidden";

    let current = 0;
    const startTime = performance.now();
    const duration = 2200; // Intentional 2.2s duration so the user can enjoy the smooth animation

    let animId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progressRatio = Math.min(elapsed / duration, 1);

      // Non-linear easing: starts fast, pauses slightly around 70-85%, then completes
      let eased = progressRatio;
      if (progressRatio < 0.4) {
        eased = progressRatio * 1.5;
      } else if (progressRatio < 0.8) {
        eased = 0.6 + (progressRatio - 0.4) * 0.6;
      } else {
        eased = 0.84 + (progressRatio - 0.8) * 0.8;
      }

      current = Math.min(Math.round(eased * 100), 100);
      setProgress(current);

      if (progressRatio < 1) {
        animId = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        // Brief hold at 100% before smooth curtain exit
        setTimeout(() => {
          setIsComplete(true);
          document.body.style.overflow = "";
        }, 300);
      }
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f6f6f2] select-none"
        >
          {/* Centered Masagi Emblem & Progress Indicator */}
          <div className="flex flex-col items-center px-6">
            {/* Logo with delicate scale entry */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8"
            >
              <Image
                src="/assets/logo/logo-dark.webp"
                alt="Jamparing Masagi"
                width={180}
                height={55}
                priority
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </motion.div>

            {/* Progress Track */}
            <div className="w-56 sm:w-64 h-[2px] bg-[#deded6] overflow-hidden rounded-full relative">
              <motion.div
                className="h-full bg-accent-500 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>

            {/* Labels: MEMUAT and Percentage Counter */}
            <div className="w-56 sm:w-64 flex items-center justify-between mt-3">
              <span className="font-mono text-[10px] tracking-widest text-[#2e2f2d]/50 uppercase font-semibold">
                MEMUAT
              </span>
              <span className="font-mono text-[11px] tracking-wider text-[#2e2f2d] font-bold">
                {progress}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
