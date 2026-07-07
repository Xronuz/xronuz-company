"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "@/lib/theme";

// additive blending glows on dark but washes out on light —
// light mode uses normal blending with deeper emeralds
const PALETTE = {
  dark: {
    sphere: "#34e2a0",
    ring: "#1f8f68",
    wire: "#2ad391",
    core: "#5cf5bb",
    blending: THREE.AdditiveBlending,
    sphereOpacity: 0.85,
    ringOpacity: 0.6,
    wireOpacity: 0.16,
    coreOpacity: 0.35,
  },
  light: {
    sphere: "#0b7a52",
    ring: "#0a6647",
    wire: "#0e8f60",
    core: "#075e40",
    blending: THREE.NormalBlending,
    sphereOpacity: 0.75,
    ringOpacity: 0.5,
    wireOpacity: 0.22,
    coreOpacity: 0.45,
  },
} as const;

function ParticleSphere({ mode }: { mode: "dark" | "light" }) {
  const c = PALETTE[mode];
  const group = useRef<THREE.Group>(null!);
  const inner = useRef<THREE.Mesh>(null!);
  const outerRing = useRef<THREE.Points>(null!);

  const spherePts = useMemo(() => {
    const N = 3600;
    const arr = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / N);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 2.5 * (1 + (Math.sin(i * 12.9898) * 0.5 + 0.5) * 0.12);
      arr[i * 3] = r * Math.cos(theta) * Math.sin(phi);
      arr[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  const ringPts = useMemo(() => {
    const N = 1400;
    const arr = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const a = (i / N) * Math.PI * 2;
      const rad = 3.6 + Math.sin(i * 78.233) * 0.5;
      arr[i * 3] = Math.cos(a) * rad;
      arr[i * 3 + 1] = Math.sin(i * 45.164) * 0.35;
      arr[i * 3 + 2] = Math.sin(a) * rad;
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    // slow autonomous rotation
    group.current.rotation.y += delta * 0.07;
    // pointer-reactive tilt (lerped)
    const targetX = state.pointer.y * 0.35;
    const targetY = state.pointer.x * 0.5;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.04;
    group.current.position.x += (state.pointer.x * 0.4 - group.current.position.x) * 0.03;
    // breathing scale
    const s = 1 + Math.sin(t * 0.6) * 0.025;
    group.current.scale.setScalar(s);
    // inner wireframe counter-rotation
    inner.current.rotation.y -= delta * 0.12;
    inner.current.rotation.z += delta * 0.05;
    // ring wobble
    outerRing.current.rotation.y += delta * 0.03;
    outerRing.current.rotation.x = Math.sin(t * 0.35) * 0.28 + targetY * 0.15;
  });

  return (
    <group ref={group}>
      <Points positions={spherePts} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={c.sphere}
          size={0.028}
          sizeAttenuation
          depthWrite={false}
          blending={c.blending}
          opacity={c.sphereOpacity}
        />
      </Points>
      <Points ref={outerRing} positions={ringPts} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={c.ring}
          size={0.02}
          sizeAttenuation
          depthWrite={false}
          blending={c.blending}
          opacity={c.ringOpacity}
        />
      </Points>
      <mesh ref={inner}>
        <icosahedronGeometry args={[1.45, 1]} />
        <meshBasicMaterial
          wireframe
          color={c.wire}
          transparent
          opacity={c.wireOpacity}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.62, 0]} />
        <meshBasicMaterial wireframe color={c.core} transparent opacity={c.coreOpacity} />
      </mesh>
    </group>
  );
}

export default function EmeraldScene() {
  const holder = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  const { theme } = useTheme();

  // stop the render loop while the hero is off-screen or the tab is hidden —
  // otherwise the GPU keeps drawing every frame and the rest of the page janks
  useEffect(() => {
    const el = holder.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting && !document.hidden),
      { rootMargin: "10% 0px" }
    );
    io.observe(el);
    const onVis = () => setActive(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div ref={holder} style={{ position: "absolute", inset: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 42 }}
        dpr={[1, 1.5]}
        frameloop={active ? "always" : "never"}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        style={{ position: "absolute", inset: 0 }}
      >
        <ParticleSphere mode={theme} />
      </Canvas>
    </div>
  );
}
