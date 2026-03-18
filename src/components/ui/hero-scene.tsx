"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function MorphingSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.elapsedTime * 0.08;
      meshRef.current.rotation.y = clock.elapsedTime * 0.12;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={2.4}>
        <icosahedronGeometry args={[1, 64]} />
        <MeshDistortMaterial
          color="#7c6bf0"
          emissive="#3b82f6"
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.8}
          distort={0.45}
          speed={2}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const count = 2000;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const purple = new THREE.Color("#7c6bf0");
    const blue = new THREE.Color("#3b82f6");
    const white = new THREE.Color("#ffffff");

    for (let i = 0; i < count; i++) {
      // Distribute in a sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 3 + Math.random() * 5;

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      // Random color between purple, blue, and white
      const t = Math.random();
      const color = t < 0.4 ? purple : t < 0.7 ? blue : white;
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }

    return { positions: pos, colors: col };
  }, []);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.elapsedTime * 0.03;
      pointsRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.02) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function MouseParallax({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  useFrame(({ pointer }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        (pointer.x * viewport.width) / 100,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        (-pointer.y * viewport.height) / 100,
        0.05
      );
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#7c6bf0" />
      <pointLight position={[-5, -3, 3]} intensity={0.8} color="#3b82f6" />
      <pointLight position={[0, 5, -5]} intensity={0.5} color="#60a5fa" />

      <MouseParallax>
        <MorphingSphere />
        <ParticleField />
      </MouseParallax>

      <fog attach="fog" args={["#0a0a0a", 5, 15]} />
    </>
  );
}

/**
 * Three.js R3F hero background with morphing iridescent sphere + particle field.
 * Brand-colored lighting (purple/blue). Responds to mouse position.
 */
export function HeroScene() {
  return (
    <div className="absolute inset-0">
      {/* CSS gradient fallback shown during load and on reduced-motion */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(124, 107, 240, 0.2) 0%, rgba(59, 130, 246, 0.1) 30%, #0a0a0a 70%)",
        }}
      />

      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          style={{ position: "absolute", inset: 0 }}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}
