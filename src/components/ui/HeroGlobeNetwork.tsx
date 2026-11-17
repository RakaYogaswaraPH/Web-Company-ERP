"use client";

import React, { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  depth: number; // 0.2 (far/faint) to 1.0 (near/crisp)
  alpha: number;
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

    // Mouse tracking for interactive connection & gentle magnetic pull
    let mouseX = -1000;
    let mouseY = -1000;
    let isHovering = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isHovering = true;
    };

    const handleMouseLeave = () => {
      isHovering = false;
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Node configuration inspired by reference image
    // Density scaled to screen size
    const nodeCount = Math.max(55, Math.min(125, Math.floor((width * height) / 9500)));
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const depth = 0.25 + Math.random() * 0.75; // depth factor for 3D depth-of-field
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (0.28 * depth),
        vy: (Math.random() - 0.5) * (0.24 * depth),
        radius: depth > 0.8 ? 2.8 + Math.random() * 1.4 : depth > 0.5 ? 1.8 + Math.random() * 0.8 : 1.2,
        depth,
        alpha: 0.15 + depth * 0.65, // deeper nodes are fainter
      });
    }

    let animId: number;

    const render = () => {
      animId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, width, height);

      // Connection threshold distance
      const maxDistance = 145;

      // 1. Draw connecting lines between nodes (#2e2f2d)
      for (let i = 0; i < nodes.length; i++) {
        const na = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const nb = nodes[j];
          const dx = na.x - nb.x;
          const dy = na.y - nb.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDistance) {
            const avgDepth = (na.depth + nb.depth) / 2;
            const distanceFactor = 1 - dist / maxDistance;
            // Line opacity based on distance and depth
            const lineAlpha = distanceFactor * avgDepth * 0.28;

            ctx.beginPath();
            ctx.moveTo(na.x, na.y);
            ctx.lineTo(nb.x, nb.y);
            // Strict #2e2f2d color palette with varying opacity
            ctx.strokeStyle = `rgba(46, 47, 45, ${lineAlpha})`;
            ctx.lineWidth = 0.5 + avgDepth * 0.75;
            ctx.stroke();
          }
        }

        // 2. Interactive line connecting nodes to cursor
        if (isHovering && mouseX > 0 && mouseY > 0) {
          const mDist = Math.hypot(na.x - mouseX, na.y - mouseY);
          const mouseReach = 175;
          if (mDist < mouseReach) {
            const mFactor = 1 - mDist / mouseReach;
            ctx.beginPath();
            ctx.moveTo(na.x, na.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.strokeStyle = `rgba(46, 47, 45, ${mFactor * na.depth * 0.45})`;
            ctx.lineWidth = 1.0 * na.depth;
            ctx.stroke();
          }
        }
      }

      // 3. Draw nodes & update positions
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        // Wrap around boundaries smoothly
        if (node.x < -20) node.x = width + 20;
        else if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        else if (node.y > height + 20) node.y = -20;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);

        // Foreground nodes are crisp #2e2f2d; background nodes have soft aura
        if (node.depth > 0.75) {
          ctx.fillStyle = `rgba(46, 47, 45, ${node.alpha * 0.95})`;
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(46, 47, 45, ${node.alpha * 0.65})`;
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
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 100% Pure Dynamic Canvas Network (#2e2f2d) spanning entire Hero section */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Subtle bottom fade to blend smoothly into the next section */}
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#f6f6f2] via-[#f6f6f2]/80 to-transparent" />
    </div>
  );
}
