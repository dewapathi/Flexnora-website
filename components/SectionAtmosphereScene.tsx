'use client';
import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function randomBoxPositions(samples: number, half: { x: number; y: number; z: number }) {
  const positions = new Float32Array(samples * 3);
  for (let i = 0; i < samples; i++) {
    positions[i * 3] = (Math.random() * 2 - 1) * half.x;
    positions[i * 3 + 1] = (Math.random() * 2 - 1) * half.y;
    positions[i * 3 + 2] = (Math.random() * 2 - 1) * half.z;
  }
  return positions;
}

function Starfield({ color }: { color: string }) {
  const positions = useMemo(() => randomBoxPositions(80, { x: 6, y: 4, z: 3 }), []);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.02} transparent opacity={0.35} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function DriftingShape({
  position,
  color,
  speed,
}: {
  position: [number, number, number];
  color: string;
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    ref.current.rotation.y += delta * speed;
    ref.current.rotation.x += delta * speed * 0.6;
  });
  return (
    <mesh ref={ref} position={position}>
      <icosahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.22} />
    </mesh>
  );
}

// Individual small meshes, not a <points> system — a Points-based version of this exact idea
// mysteriously failed to render at all when first built for the World map scene (see
// app/world/_components/WorldMapScene.tsx); mesh-based spheres are the proven-working approach.
function Fireflies({ color }: { color: string }) {
  const count = 22;
  const groupRef = useRef<THREE.Group>(null!);
  const items = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        base: new THREE.Vector3(
          (Math.random() * 2 - 1) * 4.5,
          (Math.random() * 2 - 1) * 2.6,
          (Math.random() * 2 - 1) * 1.8
        ),
        seed: Math.random() * Math.PI * 2,
      })),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      const { base, seed } = items[i];
      child.position.set(
        base.x + Math.sin(t * 0.4 + seed) * 0.3,
        base.y + Math.cos(t * 0.3 + seed) * 0.2,
        base.z
      );
      const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
      mat.opacity = 0.35 + Math.sin(t * 1.6 + seed) * 0.2;
    });
  });

  return (
    <group ref={groupRef}>
      {items.map((item, i) => (
        <mesh key={i} position={item.base}>
          <sphereGeometry args={[0.035, 6, 6]} />
          <meshBasicMaterial color={color} transparent opacity={0.5} toneMapped={false} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

function CameraRig({ mouseRef }: { mouseRef: React.RefObject<{ x: number; y: number }> }) {
  useFrame(({ camera }) => {
    const m = mouseRef.current ?? { x: 0, y: 0 };
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, m.x * 0.6, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, m.y * 0.4, 0.05);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export function SectionAtmosphereScene({
  accentColor,
  mouseRef,
}: {
  accentColor: string;
  mouseRef: React.RefObject<{ x: number; y: number }>;
}) {
  return (
    <Canvas
      dpr={[1, 1.25]}
      gl={{ alpha: true, antialias: false }}
      camera={{ position: [3, 0, 6], fov: 45, near: 0.1, far: 50 }}
    >
      <Starfield color={accentColor} />
      <DriftingShape position={[3.6, 1, -2]} color={accentColor} speed={0.15} />
      <DriftingShape position={[4.3, -1.5, -3.2]} color={accentColor} speed={0.1} />
      <Fireflies color={accentColor} />
      <CameraRig mouseRef={mouseRef} />
    </Canvas>
  );
}
