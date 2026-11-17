"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Authentic vector contour coordinates extracted directly from official 2D Masagi emblem
const MASAGI_AUTHENTIC_CONTOURS: [number, number][][] = [
  // Component 1: Main Masagi loop & wave
  [
    [0.971, 8.879], [1.676, 8.857], [2.118, 8.614], [2.206, 8.482], [2.25, 8.085],
    [2.029, 7.379], [1.39, 6.143], [1.103, 5.835], [0.662, 5.57], [-0.75, 5.305],
    [-1.147, 5.173], [-1.544, 4.908], [-1.897, 4.423], [-3.331, 1.07], [-5.515, -4.401],
    [-5.625, -4.886], [-5.559, -5.327], [-5.338, -5.526], [-5.029, -5.592], [-4.103, -5.526],
    [-2.118, -5.04], [-0.75, -4.555], [-0.596, -4.246], [-0.86, -3.232], [-0.926, -1.996],
    [-0.772, -0.893], [-0.529, -0.143], [-0.199, 0.474], [0.176, 0.938], [0.86, 1.511],
    [1.566, 1.886], [2.581, 2.107], [3.684, 2.04], [4.522, 1.798], [5.316, 1.423],
    [6.507, 0.585], [7.39, -0.32], [8.029, -1.29], [8.426, -2.349], [8.449, -3.32],
    [8.118, -4.246], [7.765, -4.688], [7.544, -4.776], [7.412, -4.754], [7.125, -4.533],
    [6.574, -3.695], [6.088, -3.121], [5.493, -2.526], [4.654, -1.886], [4.037, -1.533],
    [3.419, -1.29], [2.581, -1.114], [1.743, -1.158], [1.257, -1.379], [0.993, -1.688],
    [0.882, -1.996], [0.971, -2.658], [1.191, -3.011], [1.544, -3.32], [1.985, -3.518],
    [2.868, -3.761], [3.0, -4.114], [2.956, -4.599], [2.713, -5.349], [2.382, -5.967],
    [1.743, -6.651], [1.257, -6.915], [0.419, -7.18], [-3.904, -8.107], [-7.699, -8.835],
    [-8.36, -8.879], [-8.713, -8.768], [-8.846, -8.636], [-9.0, -8.195], [-9.0, -7.665],
    [-8.868, -7.18], [-7.831, -5.151], [-6.882, -3.077], [-4.699, 2.04], [-2.581, 6.717],
    [-2.096, 7.423], [-1.125, 8.217], [-0.066, 8.702], [0.596, 8.857], [0.949, 8.857]
  ],
  // Component 2: Top-right crescent
  [
    [4.831, 6.474], [5.051, 6.408], [5.338, 6.165], [6.529, 4.908], [7.235, 3.982],
    [7.809, 3.055], [8.471, 1.643], [8.89, 0.32], [9.0, -0.298], [9.0, -0.783],
    [8.801, -1.224], [8.449, -1.312], [8.184, -1.136], [7.522, 0.232], [7.169, 0.805],
    [6.309, 1.798], [5.426, 2.526], [4.059, 3.32], [3.772, 3.585], [3.662, 3.938],
    [3.75, 4.511], [4.61, 6.32], [4.831, 6.474]
  ]
];

export function Masagi3DViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup & Responsive FOV Projection
    const width = container.clientWidth || 360;
    const height = container.clientHeight || 300;
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);

    const updateCameraProjection = (w: number, h: number) => {
      const aspect = w / h;
      camera.aspect = aspect;
      // In mobile portrait or narrow screen, zoom out so 3D emblem fits comfortably
      if (w < 480) {
        camera.position.z = 44;
      } else if (w < 768) {
        camera.position.z = 37;
      } else {
        camera.position.z = 31;
      }
      camera.updateProjectionMatrix();
    };

    updateCameraProjection(width, height);

    // 3. Renderer Setup (Transparent background, high anti-aliasing)
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 4. Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xfff6f2, 1.4);
    scene.add(ambientLight);

    // Key Light from top-right front creates clean highlights
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(16, 22, 24);
    scene.add(keyLight);

    // Soft warm fill light from bottom-left
    const fillLight = new THREE.DirectionalLight(0xf58a7a, 0.85);
    fillLight.position.set(-16, -12, 12);
    scene.add(fillLight);

    // Rim point light to highlight curved 3D edges
    const rimLight = new THREE.PointLight(0xffffff, 1.8, 60);
    rimLight.position.set(0, 16, -14);
    scene.add(rimLight);

    // 5. Build 3D Mesh from authentic vector contours
    const group = new THREE.Group();

    // Premium Glossy Physical Material (#d84939) with rich clearcoat shine
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xd84939,
      emissive: 0x1a0705,
      roughness: 0.16,
      metalness: 0.06,
      clearcoat: 0.95,
      clearcoatRoughness: 0.08,
      reflectivity: 0.95,
      specularIntensity: 1.0,
      specularColor: new THREE.Color(0xffffff),
    });

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 2.2,
      bevelEnabled: true,
      bevelSegments: 6,
      steps: 2,
      bevelSize: 0.55,
      bevelThickness: 0.55,
      bevelOffset: 0,
    };

    MASAGI_AUTHENTIC_CONTOURS.forEach((pts) => {
      const shape = new THREE.Shape();
      shape.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) {
        shape.lineTo(pts[i][0], pts[i][1]);
      }
      shape.closePath();

      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      const mesh = new THREE.Mesh(geometry, material);
      group.add(mesh);
    });

    // Exact perspective angle matching user's official 3D reference image
    group.rotation.x = -0.12;
    group.rotation.y = 0.38;
    group.rotation.z = -0.06;
    scene.add(group);

    // 6. Smooth Mouse & Touch Drag Controls with Natural Inertia & Mobile Gesture Freedom
    let pointerDown = false;
    let prevX = 0;
    let prevY = 0;
    let velX = 0;
    let velY = 0;
    let autoRotateTimer = 0;

    const onPointerDown = (e: PointerEvent) => {
      pointerDown = true;
      setIsDragging(true);
      prevX = e.clientX;
      prevY = e.clientY;
      velX = 0;
      velY = 0;
      autoRotateTimer = 0;
      try {
        (e.target as HTMLElement)?.setPointerCapture(e.pointerId);
      } catch (_) {}
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!pointerDown) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;

      velX = dx * 0.007;
      velY = dy * 0.007;

      group.rotation.y += velX;
      group.rotation.x += velY;

      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onPointerUp = (e?: PointerEvent) => {
      pointerDown = false;
      setIsDragging(false);
      if (e && e.pointerId) {
        try {
          (e.target as HTMLElement)?.releasePointerCapture(e.pointerId);
        } catch (_) {}
      }
    };

    const onPointerCancel = (e?: PointerEvent) => {
      pointerDown = false;
      setIsDragging(false);
      velX = 0;
      velY = 0;
      if (e && e.pointerId) {
        try {
          (e.target as HTMLElement)?.releasePointerCapture(e.pointerId);
        } catch (_) {}
      }
    };

    const handleBlur = () => {
      pointerDown = false;
      setIsDragging(false);
    };

    const dom = renderer.domElement;
    dom.style.touchAction = "pan-y"; // Allows vertical page scroll on mobile while swiping
    dom.addEventListener("pointerdown", onPointerDown);
    dom.addEventListener("pointermove", onPointerMove);
    dom.addEventListener("pointerup", onPointerUp);
    dom.addEventListener("pointercancel", onPointerCancel);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerCancel);
    window.addEventListener("blur", handleBlur);

    // 7. Render Loop: Inertia Damping & Steady Smooth Rotation (No bobbing/floating)
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!pointerDown) {
        // Apply inertia friction from drag
        group.rotation.y += velX;
        group.rotation.x += velY;
        velX *= 0.94;
        velY *= 0.94;

        autoRotateTimer += 0.016;
        if (autoRotateTimer > 0.8 && Math.abs(velX) < 0.001 && Math.abs(velY) < 0.001) {
          // Clean continuous rotation around Y axis without any vertical floating
          group.rotation.y += 0.004;
        }
      }

      // Keep position strictly fixed at center
      group.position.set(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // 8. Responsive Resize Observer with Adaptive Mobile Perspective
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newW = entry.contentRect.width;
        const newH = entry.contentRect.height;
        if (newW > 0 && newH > 0) {
          updateCameraProjection(newW, newH);
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    // 9. Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      dom.removeEventListener("pointerdown", onPointerDown);
      dom.removeEventListener("pointermove", onPointerMove);
      dom.removeEventListener("pointerup", onPointerUp);
      dom.removeEventListener("pointercancel", onPointerCancel);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerCancel);
      window.removeEventListener("blur", handleBlur);
      if (container.contains(dom)) {
        container.removeChild(dom);
      }
      renderer.dispose();
      material.dispose();
      group.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
        }
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[250px] sm:h-[340px] md:h-[400px] lg:h-[460px] select-none flex items-center justify-center touch-pan-y ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
    />
  );
}
