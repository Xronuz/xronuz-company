"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleSphere() {
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
          color="#34e2a0"
          size={0.028}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.85}
        />
      </Points>
      <Points ref={outerRing} positions={ringPts} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#1f8f68"
          size={0.02}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.6}
        />
      </Points>
      <mesh ref={inner}>
        <icosahedronGeometry args={[1.45, 1]} />
        <meshBasicMaterial
          wireframe
          color="#2ad391"
          transparent
          opacity={0.16}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.62, 0]} />
        <meshBasicMaterial wireframe color="#5cf5bb" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

export default function EmeraldScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.2], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ParticleSphere />
    </Canvas>
  );
}
