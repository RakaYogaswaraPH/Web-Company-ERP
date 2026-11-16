"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Vector contour coordinates extracted from authentic Masagi emblem
const MASAGI_CONTOURS: [number, number][][] = [
  [
    [0.8, 8.4], [1.6, 8.32], [1.84, 8.12], [1.92, 7.96], [1.92, 7.56],
    [1.72, 7.0], [1.12, 5.88], [0.72, 5.52], [0.16, 5.32], [-0.88, 5.16],
    [-1.36, 4.92], [-1.68, 4.6], [-2.52, 2.76], [-4.8, -2.92], [-5.12, -3.88],
    [-5.12, -4.2], [-5.04, -4.36], [-4.72, -4.56], [-3.76, -4.52], [-2.4, -4.2],
    [-0.8, -3.68], [-0.64, -3.52], [-0.64, -3.28], [-0.88, -2.4], [-0.92, -1.2],
    [-0.8, -0.4], [-0.56, 0.32], [-0.2, 0.96], [0.64, 1.76], [1.2, 2.08],
    [2.16, 2.32], [3.12, 2.28], [4.0, 2.04], [5.36, 1.28], [6.4, 0.32],
    [7.12, -0.72], [7.48, -1.68], [7.48, -2.64], [7.12, -3.52], [6.72, -3.84],
    [6.4, -3.76], [5.4, -2.4], [4.6, -1.64], [3.8, -1.08], [2.68, -0.64],
    [2.2, -0.56], [1.48, -0.6], [1.16, -0.72], [0.8, -1.08], [0.72, -1.32],
    [0.76, -1.88], [1.2, -2.48], [1.68, -2.72], [2.48, -2.92], [2.6, -3.16],
    [2.6, -3.48], [2.48, -4.04], [2.2, -4.68], [1.8, -5.24], [1.32, -5.64],
    [0.6, -5.92], [-0.52, -6.2], [-5.4, -7.2], [-7.24, -7.52], [-7.64, -7.52],
    [-7.88, -7.44], [-8.04, -7.28], [-8.16, -6.96], [-8.16, -6.4], [-8.04, -6.0],
    [-6.76, -3.44], [-2.48, 6.32], [-2.0, 7.04], [-1.6, 7.44], [-1.04, 7.84],
    [0.0, 8.28], [0.8, 8.4],
  ],
  [
    [4.24, 6.24], [4.48, 6.16], [4.8, 5.88], [5.8, 4.8], [6.4, 4.0],
    [7.04, 2.96], [7.6, 1.68], [7.92, 0.56], [8.0, -0.16], [7.84, -0.64],
    [7.6, -0.76], [7.28, -0.64], [6.36, 1.12], [5.44, 2.16], [4.64, 2.8],
    [3.6, 3.36], [3.36, 3.56], [3.2, 3.88], [3.24, 4.36], [4.0, 6.04],
    [4.24, 6.24],
  ],
];

export function Masagi3DViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 450;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0, 32);

    // 3. Renderer Setup (Transparent canvas, high anti-aliasing)
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

    // 4. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xfff6f2, 1.3);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight1.position.set(12, 18, 20);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffb8b8, 1.2);
    dirLight2.position.set(-15, -10, 10);
    scene.add(dirLight2);

    const rimLight = new THREE.PointLight(0xffffff, 2.0, 50);
    rimLight.position.set(0, 15, -12);
    scene.add(rimLight);

    // 5. Build 3D Mesh from Masagi vector contours
    const group = new THREE.Group();

    // Premium Red Physical Material with realistic specular reflections & bevel shine
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xdb242d,
      emissive: 0x220204,
      roughness: 0.22,
      metalness: 0.08,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
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

    MASAGI_CONTOURS.forEach((pts) => {
      const shape = new THREE.Shape();
      shape.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) {
        shape.lineTo(pts[i][0], pts[i][1]);
      }
      shape.closePath();

      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geometry.center();
      const mesh = new THREE.Mesh(geometry, material);
      group.add(mesh);
    });

    // Default angle matching user's reference image
    group.rotation.x = 0.18;
    group.rotation.y = -0.32;
    group.rotation.z = -0.05;
    scene.add(group);

    // 6. Smooth Mouse/Touch Drag Controls with Inertia
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

    const onPointerUp = () => {
      pointerDown = false;
      setIsDragging(false);
    };

    const dom = renderer.domElement;
    dom.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // 7. Render Loop with Smooth Damping & Idle Floating
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (!pointerDown) {
        // Apply smooth friction/inertia
        group.rotation.y += velX;
        group.rotation.x += velY;
        velX *= 0.94;
        velY *= 0.94;

        autoRotateTimer += 0.016;
        if (autoRotateTimer > 1.2 && Math.abs(velX) < 0.001 && Math.abs(velY) < 0.001) {
          // Gentle idle floating & rotation
          group.rotation.y += 0.006;
          group.position.y = Math.sin(elapsedTime * 1.5) * 0.45;
          group.position.x = Math.cos(elapsedTime * 1.2) * 0.25;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // 8. Responsive Resize Handler
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newW = entry.contentRect.width;
        const newH = entry.contentRect.height;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    // 9. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      dom.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
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
      className={`relative w-full h-[380px] sm:h-[450px] lg:h-[480px] select-none flex items-center justify-center ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      title="Klik dan geser untuk memutar logo Masagi 3D"
    />
  );
}
