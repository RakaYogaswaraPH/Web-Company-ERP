"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

const SLATS = [0, 1, 2, 3, 4];
const CIRCLE_RADIUS = 58;
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS; // ~364.42

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // 1. Mark preloader as active on root to keep scrollbar track stable while hiding thumb
    document.documentElement.classList.add("preloader-active");
    window.scrollTo(0, 0);

    // 2. Prevent user scrolling without modifying body overflow (avoids scrollbar layout shift)
    const preventScroll = (e: Event) => {
      e.preventDefault();
    };

    const preventKeyScroll = (e: KeyboardEvent) => {
      if (
        [
          "ArrowUp",
          "ArrowDown",
          "Space",
          "PageUp",
          "PageDown",
          "Home",
          "End",
        ].includes(e.code)
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("keydown", preventKeyScroll, false);

    let current = 0;
    const startTime = performance.now();
    const duration = 2100; // 2.1s duration for smooth perception of telemetry progress

    let animId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progressRatio = Math.min(elapsed / duration, 1);

      // Organic ease curve: dynamic acceleration with steady completion
      let eased = progressRatio;
      if (progressRatio < 0.4) {
        eased = progressRatio * 1.45;
      } else if (progressRatio < 0.8) {
        eased = 0.58 + (progressRatio - 0.4) * 0.65;
      } else {
        eased = 0.84 + (progressRatio - 0.8) * 0.8;
      }

      current = Math.min(Math.round(eased * 100), 100);
      setProgress(current);

      if (progressRatio < 1) {
        animId = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        // Brief hold at 100% before kinetic slat cascade exit
        setTimeout(() => {
          setIsComplete(true);
        }, 240);

        // Once the slat cascade completes and lifts off-screen, enable scrolling and smoothly fade in scrollbar
        setTimeout(() => {
          window.removeEventListener("wheel", preventScroll);
          window.removeEventListener("touchmove", preventScroll);
          window.removeEventListener("keydown", preventKeyScroll);
          document.documentElement.classList.remove("preloader-active");
        }, 240 + 1050);
      }
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventKeyScroll);
      document.documentElement.classList.remove("preloader-active");
    };
  }, []);

  const strokeDashoffset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE;

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          key="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 1,
            transition: { duration: 1.15 },
          }}
          className="fixed inset-0 z-[9999] select-none overflow-hidden pointer-events-none"
        >
          {/* 5-Column Kinetic Staggered Slats (Clean, Flat, No Shadow) */}
          {SLATS.map((i) => (
            <motion.div
              key={i}
              initial={{ y: "0%" }}
              exit={{
                y: "-100%",
                transition: {
                  duration: 0.72,
                  ease: [0.76, 0, 0.24, 1],
                  delay: 0.08 + i * 0.065,
                },
              }}
              style={{
                left: `${i * 20}%`,
                width: "calc(20% + 1px)",
              }}
              className="absolute top-0 bottom-0 bg-[#f6f6f2] border-b-[3px] border-accent-500 will-change-transform z-10"
            />
          ))}

          {/* Central Telemetry HUD (Rock-solid fixed coordinates & smooth entrance) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{
              opacity: 0,
              scale: 1.08,
              transition: { duration: 0.28, ease: "easeOut" },
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 pointer-events-none"
          >
            {/* Circular Telemetry Gauge */}
            <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center shrink-0">
              {/* Rotating Orbital Satellite Particle */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2.8, ease: "linear" }}
                className="absolute inset-0 pointer-events-none"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent-500" />
              </motion.div>

              {/* Gauge SVG */}
              <svg
                className="w-full h-full -rotate-90 origin-center"
                viewBox="0 0 140 140"
              >
                {/* Background Track with Subtle Dashes */}
                <circle
                  cx="70"
                  cy="70"
                  r={CIRCLE_RADIUS}
                  stroke="#deded6"
                  strokeWidth="2.5"
                  fill="none"
                  strokeDasharray="4 4"
                  opacity="0.7"
                />

                {/* Outer Decorative Tick Ring */}
                <circle
                  cx="70"
                  cy="70"
                  r={CIRCLE_RADIUS + 7}
                  stroke="#deded6"
                  strokeWidth="1"
                  fill="none"
                  strokeDasharray="2 8"
                  opacity="0.5"
                />

                {/* Active Dynamic Progress Stroke */}
                <circle
                  cx="70"
                  cy="70"
                  r={CIRCLE_RADIUS}
                  stroke="#d84939"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-[stroke-dashoffset] duration-150 ease-out"
                />
              </svg>

              {/* Centered Masagi Emblem - Strictly Centered & Anti-Shift */}
              <div className="absolute inset-0 m-auto w-20 h-9 sm:w-24 sm:h-10 flex items-center justify-center">
                <Image
                  src="/assets/logo/logo-dark.webp"
                  alt="Jamparing Masagi"
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 640px) 80px, 96px"
                />
              </div>
            </div>

            {/* Oversized Dynamic Typography Counter (Tabular numbers, no layout shift) */}
            <div className="mt-5 flex items-baseline justify-center h-10 sm:h-12 shrink-0">
              <span className="font-display text-4xl sm:text-5xl font-black text-[#2e2f2d] tabular-nums tracking-tight">
                {progress}
              </span>
              <span className="text-accent-500 font-display text-xl sm:text-2xl font-bold ml-1">
                %
              </span>
            </div>

            {/* Architectural Status Stamp */}
            <div className="mt-1 flex items-center gap-2 h-4 shrink-0">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-[#2e2f2d]/65 uppercase font-bold select-none">
                {progress === 100
                  ? "SYSTEM READY // STANDBY"
                  : "INITIALIZING MASAGI ERP"}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
