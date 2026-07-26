'use client';
import { useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, QuadraticBezierLine } from '@react-three/drei';
import * as THREE from 'three';
import Link from 'next/link';
import { regions, type Region } from '../_data/regions';

const ELECTRIC_BLUE = '#2e6bff';
const ROYAL_BLUE = '#4f46e5';
const PURPLE = '#a855f7';
const AMBER = '#f59e0b';
const RADIUS = 3.2;
const Z_STEP = 3.5;
const VIEW_DISTANCE = 5;

function randomBoxPositions(samples: number, half: { x: number; y: number; z: number }) {
  const positions = new Float32Array(samples * 3);
  for (let i = 0; i < samples; i++) {
    positions[i * 3] = (Math.random() * 2 - 1) * half.x;
    positions[i * 3 + 1] = (Math.random() * 2 - 1) * half.y;
    positions[i * 3 + 2] = (Math.random() * 2 - 1) * half.z;
  }
  return positions;
}

function Starfield({ totalZ }: { totalZ: number }) {
  const positions = useMemo(() => randomBoxPositions(260, { x: 9, y: 6, z: totalZ / 2 + 6 }), [totalZ]);
  return (
    <points position={[0, 0, -totalZ / 2]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={ROYAL_BLUE} size={0.028} transparent opacity={0.5} sizeAttenuation depthWrite={false} />
    </points>
  );
}

// Fast, thin, downward-falling particles — motion is what reads as "rain," not the particle shape.
// Spread tightly around the corridor's own envelope (the waypoints only weave within `RADIUS`) so
// particles actually land inside the camera's field of view as it travels, not scattered across a
// box far wider than what's ever in frame.
function Rain({ totalZ }: { totalZ: number }) {
  const count = 90;
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(
    () => randomBoxPositions(count, { x: RADIUS + 1, y: RADIUS * 0.7, z: totalZ / 2 + 3 }),
    [totalZ]
  );
  const speeds = useMemo(() => Array.from({ length: count }, () => 3 + Math.random() * 2.5), []);

  useFrame((_, delta) => {
    const attr = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      let y = attr.getY(i) - speeds[i] * delta;
      if (y < -4) y = 4;
      attr.setY(i, y);
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref} position={[0, 0, -totalZ / 2]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#8fb4ff" size={0.035} transparent opacity={0.6} sizeAttenuation depthWrite={false} />
    </points>
  );
}

// Slow, warm, sine-wandering particles with pulsing opacity — reads as fireflies. Clustered
// around the actual waypoint positions (a handful near each node) rather than scattered
// uniformly, so they're guaranteed to be near the camera exactly when each place comes into
// focus, instead of statistically likely to land outside the frustum entirely. Individual small
// meshes rather than a Points/bufferGeometry system — simpler to reason about at this low count
// (60) and avoids relying on manual buffer-attribute mutation for such a small object count.
function Fireflies({ nodePositions }: { nodePositions: THREE.Vector3[] }) {
  const perNode = 5;
  const groupRef = useRef<THREE.Group>(null!);
  const items = useMemo(
    () =>
      nodePositions.flatMap((p) =>
        Array.from({ length: perNode }, () => ({
          base: new THREE.Vector3(
            p.x + (Math.random() * 2 - 1) * 1.1,
            p.y + (Math.random() * 2 - 1) * 0.9,
            p.z + (Math.random() * 2 - 1) * 0.9
          ),
          seed: Math.random() * Math.PI * 2,
        }))
      ),
    [nodePositions]
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      const { base, seed } = items[i];
      child.position.set(
        base.x + Math.sin(t * 0.5 + seed) * 0.3,
        base.y + Math.cos(t * 0.4 + seed) * 0.2,
        base.z
      );
      const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
      mat.opacity = 0.5 + Math.sin(t * 2 + seed) * 0.3;
    });
  });

  return (
    <group ref={groupRef}>
      {items.map((item, i) => (
        <mesh key={i} position={item.base}>
          <sphereGeometry args={[0.05, 6, 6]} />
          <meshBasicMaterial color={AMBER} transparent opacity={0.7} toneMapped={false} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

function ConnectorPath({ positions }: { positions: THREE.Vector3[] }) {
  return (
    <>
      {positions.slice(0, -1).map((p, i) => {
        const next = positions[i + 1];
        const mid = p.clone().add(next).multiplyScalar(0.5);
        return (
          <QuadraticBezierLine
            key={i}
            start={p}
            mid={mid}
            end={next}
            color={PURPLE}
            lineWidth={1}
            transparent
            opacity={0.35}
          />
        );
      })}
    </>
  );
}

function Waypoint({
  region,
  position,
  index,
  total,
  scrollRef,
}: {
  region: Region;
  position: [number, number, number];
  index: number;
  total: number;
  scrollRef: React.RefObject<number>;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const wrapperRef = useRef<HTMLDivElement>(null!);
  const router = useRouter();

  // Same drei Html `transform` hit-testing quirk already hit on the Portfolio corridor: the real
  // clickable area doesn't line up with where the label visually renders (clicking slightly below
  // it is what actually lands on the link). Rather than re-chase that, the whole node is clickable
  // — a click that lands on the real <a> still navigates natively; anything else here falls
  // through to this handler.
  const handleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('a')) return;
    router.push(region.route);
  };

  useFrame((_, delta) => {
    meshRef.current.rotation.y += delta * 0.3;
    meshRef.current.rotation.x += delta * 0.15;

    const focusProgress = (scrollRef.current ?? 0) * (total - 1);
    const distance = Math.abs(index - focusProgress);
    const focus = THREE.MathUtils.clamp(1 - distance / 1.3, 0, 1);

    const mat = meshRef.current.material as THREE.MeshBasicMaterial;
    // Never fully invisible — the whole constellation shape stays legible; focus just pops.
    mat.opacity = 0.15 + focus * 0.55;

    if (wrapperRef.current) {
      wrapperRef.current.style.opacity = String(focus);
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.32, 0]} />
        <meshBasicMaterial color={ELECTRIC_BLUE} wireframe transparent opacity={0.15} />
      </mesh>
      {/* Invisible, generously-sized hit target using real WebGL raycasting against actual 3D
          geometry — immune to the CSS-3D Html hit-test/paint mismatch that affects the label
          below (which gets worse the further a node sits from dead-center view, so a fixed CSS
          padding tuned for one node isn't enough for the rest). This is the primary click path;
          the label's own link below still works natively too when it happens to line up. */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          router.push(region.route);
        }}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[0.9, 12, 12]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      <Html transform occlude={false} center scale={0.3}>
        <div ref={wrapperRef} onClick={handleClick} style={{ padding: 36, cursor: 'pointer' }}>
          <Link
            href={region.route}
            className="group flex flex-col items-center gap-1 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue"
          >
            <span className="whitespace-nowrap rounded-full border border-electric-blue/40 bg-bg/85 px-3 py-1.5 text-sm font-semibold text-text opacity-90 backdrop-blur-sm transition-opacity group-hover:opacity-100 group-hover:border-electric-blue">
              {region.label}
            </span>
          </Link>
        </div>
      </Html>
    </group>
  );
}

// Continuous piecewise-linear position between whichever two waypoints `t` currently sits
// between — same technique already used (and proven) in components/PortfolioScene.tsx.
function interpolateAlongPath(t: number, positions: THREE.Vector3[]) {
  const clamped = THREE.MathUtils.clamp(t, 0, positions.length - 1);
  const i0 = Math.floor(clamped);
  const i1 = Math.min(i0 + 1, positions.length - 1);
  const localT = clamped - i0;
  return {
    x: THREE.MathUtils.lerp(positions[i0].x, positions[i1].x, localT),
    y: THREE.MathUtils.lerp(positions[i0].y, positions[i1].y, localT),
    z: THREE.MathUtils.lerp(positions[i0].z, positions[i1].z, localT),
  };
}

function CameraRig({
  scrollRef,
  mouseRef,
  positions,
}: {
  scrollRef: React.RefObject<number>;
  mouseRef: React.RefObject<{ x: number; y: number }>;
  positions: THREE.Vector3[];
}) {
  useFrame(({ camera }) => {
    const s = scrollRef.current ?? 0;
    const m = mouseRef.current ?? { x: 0, y: 0 };
    const focusProgress = s * (positions.length - 1);
    const target = interpolateAlongPath(focusProgress, positions);
    const targetZ = target.z + VIEW_DISTANCE;

    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.07);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, target.x + m.x * 0.4, 0.06);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, target.y + m.y * 0.25, 0.06);
    camera.lookAt(target.x, target.y, target.z);
  });
  return null;
}

export function WorldMapScene({
  scrollRef,
  mouseRef,
}: {
  scrollRef: React.RefObject<number>;
  mouseRef: React.RefObject<{ x: number; y: number }>;
}) {
  const positions = useMemo(() => {
    const angleStep = (Math.PI * 2 * 1.4) / (regions.length - 1);
    return regions.map(
      (_, i) =>
        new THREE.Vector3(
          Math.cos(i * angleStep) * RADIUS,
          Math.sin(i * angleStep) * RADIUS * 0.5,
          -i * Z_STEP
        )
    );
  }, []);
  const totalZ = Z_STEP * (regions.length - 1);

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      camera={{ position: [0, 0, positions[0].z + VIEW_DISTANCE], fov: 45, near: 0.1, far: 100 }}
    >
      <Starfield totalZ={totalZ} />
      <Rain totalZ={totalZ} />
      <Fireflies nodePositions={positions} />
      <ConnectorPath positions={positions} />
      {regions.map((region, i) => (
        <Waypoint
          key={region.slug}
          region={region}
          position={positions[i].toArray() as [number, number, number]}
          index={i}
          total={regions.length}
          scrollRef={scrollRef}
        />
      ))}
      <CameraRig scrollRef={scrollRef} mouseRef={mouseRef} positions={positions} />
    </Canvas>
  );
}
