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

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Mouse tracking for interactive connection
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

    // Initial node creation distributed evenly across the full width and height
    const calcNodeCount = (w: number, h: number) => {
      return Math.max(55, Math.min(140, Math.floor((w * h) / 9000)));
    };

    let targetCount = calcNodeCount(width, height);
    const nodes: Node[] = [];

    const createNode = (initX?: number, initY?: number): Node => {
      const depth = 0.25 + Math.random() * 0.75;
      return {
        x: initX ?? Math.random() * width,
        y: initY ?? Math.random() * height,
        vx: (Math.random() - 0.5) * (0.28 * depth),
        vy: (Math.random() - 0.5) * (0.24 * depth),
        // Thicker, more prominent node dots for high visual impact
        radius: depth > 0.8 ? 4.5 + Math.random() * 2.0 : depth > 0.5 ? 3.0 + Math.random() * 1.2 : 2.0,
        depth,
        alpha: 0.35 + depth * 0.65,
      };
    };

    for (let i = 0; i < targetCount; i++) {
      nodes.push(createNode());
    }

    let animId: number;

    const render = () => {
      animId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, width, height);

      const maxDistance = 155;

      // 1. Draw connecting lines between nodes (#2e2f2d) - thicker & richer opacity
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
            // Clean, refined opacity so it stays in background behind headline
            const lineAlpha = distanceFactor * avgDepth * 0.32;

            ctx.beginPath();
            ctx.moveTo(na.x, na.y);
            ctx.lineTo(nb.x, nb.y);
            ctx.strokeStyle = `rgba(46, 47, 45, ${lineAlpha})`;
            // Crisp, thinner stroke width (0.8px to 1.3px)
            ctx.lineWidth = 0.7 + avgDepth * 0.65;
            ctx.stroke();
          }
        }

        // 2. Interactive line connecting nodes to cursor
        if (isHovering && mouseX > 0 && mouseY > 0) {
          const mDist = Math.hypot(na.x - mouseX, na.y - mouseY);
          const mouseReach = 180;
          if (mDist < mouseReach) {
            const mFactor = 1 - mDist / mouseReach;
            ctx.beginPath();
            ctx.moveTo(na.x, na.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.strokeStyle = `rgba(46, 47, 45, ${mFactor * na.depth * 0.45})`;
            ctx.lineWidth = 1.0 + na.depth * 0.8;
            ctx.stroke();
          }
        }
      }

      // 3. Draw nodes & update positions
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        // Wrap around boundaries smoothly without hard clumping
        if (node.x < -30) node.x = width + 30;
        else if (node.x > width + 30) node.x = -30;
        if (node.y < -30) node.y = height + 30;
        else if (node.y > height + 30) node.y = -30;

        // Subtle soft halo for focal foreground nodes
        if (node.depth > 0.82) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 3.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(46, 47, 45, 0.09)`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);

        if (node.depth > 0.75) {
          ctx.fillStyle = `rgba(46, 47, 45, ${Math.min(0.95, node.alpha)})`;
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(46, 47, 45, ${node.alpha * 0.78})`;
          ctx.fill();
        }
      }
    };

    render();

    // Robust ResizeObserver: scales node coordinates proportionally so they never clump on window resize
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newW = entry.contentRect.width;
        const newH = entry.contentRect.height;
        if (newW <= 0 || newH <= 0) continue;

        if (width > 0 && height > 0) {
          const scaleX = newW / width;
          const scaleY = newH / height;
          // Scale existing node positions proportionally
          for (const node of nodes) {
            node.x *= scaleX;
            node.y *= scaleY;
          }
        }

        width = newW;
        height = newH;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        // Adjust node count if aspect ratio or dimensions changed significantly
        targetCount = calcNodeCount(width, height);
        while (nodes.length < targetCount) {
          nodes.push(createNode());
        }
        if (nodes.length > targetCount + 10) {
          nodes.splice(targetCount);
        }
      }
    });

    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
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
