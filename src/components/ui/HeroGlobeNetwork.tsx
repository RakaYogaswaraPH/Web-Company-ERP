"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  pulsePhase: number;
  isAccent: boolean;
}

interface Arc {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  controlX: number;
  controlY: number;
  progress: number;
  speed: number;
  color: string;
}

export function HeroGlobeNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Mouse coordinates for interactive parallax
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Initialize neural network nodes
    const nodeCount = Math.min(Math.floor((width * height) / 14000), 65);
    const nodes: Node[] = [];

    // Focus more nodes in a circular globe-like area in the center/upper center
    const globeCenterX = width * 0.5;
    const globeCenterY = height * 0.48;
    const globeRadius = Math.min(width, height) * 0.42;

    for (let i = 0; i < nodeCount; i++) {
      // Clustered around globe perimeter and inner region
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.sqrt(Math.random()) * globeRadius;
      const x = globeCenterX + Math.cos(angle) * dist + (Math.random() - 0.5) * 80;
      const y = globeCenterY + Math.sin(angle) * (dist * 0.72) + (Math.random() - 0.5) * 60;

      nodes.push({
        x: Math.max(20, Math.min(width - 20, x)),
        y: Math.max(20, Math.min(height - 20, y)),
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() > 0.85 ? 3.2 : Math.random() > 0.5 ? 2.2 : 1.5,
        baseAlpha: 0.3 + Math.random() * 0.6,
        pulsePhase: Math.random() * Math.PI * 2,
        isAccent: Math.random() > 0.7,
      });
    }

    // Long-distance high-speed dynamic data arcs
    const arcs: Arc[] = [];
    const maxArcs = 6;

    const createArc = (): Arc => {
      const n1 = nodes[Math.floor(Math.random() * nodes.length)];
      let n2 = nodes[Math.floor(Math.random() * nodes.length)];
      while (n1 === n2) {
        n2 = nodes[Math.floor(Math.random() * nodes.length)];
      }

      const midX = (n1.x + n2.x) / 2;
      const midY = (n1.y + n2.y) / 2;
      const dist = Math.hypot(n2.x - n1.x, n2.y - n1.y);
      const angle = Math.atan2(n2.y - n1.y, n2.x - n1.x);

      // Arc curves upward / outward like satellite trajectory
      const curveHeight = Math.min(dist * 0.45, 120);
      const controlX = midX - Math.sin(angle) * curveHeight;
      const controlY = midY + Math.cos(angle) * curveHeight;

      return {
        startX: n1.x,
        startY: n1.y,
        endX: n2.x,
        endY: n2.y,
        controlX,
        controlY,
        progress: 0,
        speed: 0.006 + Math.random() * 0.009,
        color: Math.random() > 0.4 ? "#d84939" : "#f59e0b",
      };
    };

    for (let i = 0; i < maxArcs; i++) {
      const arc = createArc();
      arc.progress = Math.random();
      arcs.push(arc);
    }

    // Animation loop
    let animId: number;

    const render = () => {
      animId = requestAnimationFrame(render);

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;
      const parallaxX = (mouseX - width / 2) * 0.025;
      const parallaxY = (mouseY - height / 2) * 0.025;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw connecting mesh lines between nearby nodes
      const maxDistance = 140;
      for (let i = 0; i < nodes.length; i++) {
        const na = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const nb = nodes[j];
          const dx = (na.x + parallaxX) - (nb.x + parallaxX);
          const dy = (na.y + parallaxY) - (nb.y + parallaxY);
          const dist = Math.hypot(dx, dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.28;
            ctx.beginPath();
            ctx.moveTo(na.x + parallaxX, na.y + parallaxY);
            ctx.lineTo(nb.x + parallaxX, nb.y + parallaxY);

            if (na.isAccent && nb.isAccent) {
              ctx.strokeStyle = `rgba(216, 73, 57, ${alpha * 1.5})`;
              ctx.lineWidth = 1.2;
            } else {
              ctx.strokeStyle = `rgba(46, 47, 45, ${alpha})`;
              ctx.lineWidth = 0.85;
            }
            ctx.stroke();
          }
        }
      }

      // 2. Draw curved satellite/neural arcs and traveling data pulses
      arcs.forEach((arc, idx) => {
        arc.progress += arc.speed;
        if (arc.progress >= 1) {
          arcs[idx] = createArc();
          return;
        }

        const sx = arc.startX + parallaxX;
        const sy = arc.startY + parallaxY;
        const cx = arc.controlX + parallaxX * 1.2;
        const cy = arc.controlY + parallaxY * 1.2;
        const ex = arc.endX + parallaxX;
        const ey = arc.endY + parallaxY;

        // Draw faint guide arc
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.quadraticCurveTo(cx, cy, ex, ey);
        ctx.strokeStyle = arc.color === "#d84939" ? "rgba(216, 73, 57, 0.22)" : "rgba(245, 158, 11, 0.22)";
        ctx.lineWidth = 1.4;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Quadratic bezier position for packet
        const t = arc.progress;
        const px = (1 - t) * (1 - t) * sx + 2 * (1 - t) * t * cx + t * t * ex;
        const py = (1 - t) * (1 - t) * sy + 2 * (1 - t) * t * cy + t * t * ey;

        // Glowing pulse head
        ctx.beginPath();
        ctx.arc(px, py, 3.2, 0, Math.PI * 2);
        ctx.fillStyle = arc.color;
        ctx.shadowColor = arc.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      // 3. Draw nodes
      for (const node of nodes) {
        // Move with gentle drift
        node.x += node.vx;
        node.y += node.vy;
        node.pulsePhase += 0.035;

        // Soft bounce within boundaries
        if (node.x < 30 || node.x > width - 30) node.vx *= -1;
        if (node.y < 30 || node.y > height - 30) node.vy *= -1;

        const posX = node.x + parallaxX;
        const posY = node.y + parallaxY;
        const pulse = Math.sin(node.pulsePhase) * 0.3 + 0.7;

        ctx.beginPath();
        ctx.arc(posX, posY, node.radius * pulse, 0, Math.PI * 2);

        if (node.isAccent) {
          ctx.fillStyle = `rgba(216, 73, 57, ${node.baseAlpha * pulse * 0.95})`;
          ctx.shadowColor = "rgba(216, 73, 57, 0.6)";
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = `rgba(46, 47, 45, ${node.baseAlpha * pulse * 0.75})`;
          ctx.fill();
        }
      }
    };

    render();

    // Resize handler
    const handleResize = () => {
      if (!container || !canvas) return;
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Underlying Stylized High-Tech Globe Image Backdrop */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 lg:opacity-35 mix-blend-multiply transition-opacity duration-700">
        <div className="relative w-[580px] sm:w-[760px] lg:w-[940px] aspect-[16/10] filter contrast-125 saturate-150">
          <Image
            src="/assets/hero/hero-globe.jpg"
            alt="Global ERP Network"
            fill
            priority
            className="object-cover rounded-full"
            style={{
              maskImage: "radial-gradient(circle at 50% 50%, black 35%, rgba(0,0,0,0.5) 60%, transparent 80%)",
              WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 35%, rgba(0,0,0,0.5) 60%, transparent 80%)",
            }}
          />
        </div>
      </div>

      {/* 2. Soft Ambient Radial Vignette / Glow to blend with canvas #f6f6f2 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 20%, rgba(246, 246, 242, 0.4) 60%, #f6f6f2 92%)",
        }}
      />

      {/* 3. Live Dynamic Canvas with Neural Network Nodes, Connected Lines & Traveling Data Arcs */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* 4. Bottom Fade Out to ensure seamless border transition */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#f6f6f2] via-[#f6f6f2]/80 to-transparent" />
    </div>
  );
}
