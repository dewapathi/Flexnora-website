'use client';
import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { QuadraticBezierLine } from '@react-three/drei';
import * as THREE from 'three';

const ELECTRIC_BLUE = '#2e6bff';
const ROYAL_BLUE = '#4f46e5';
const PURPLE = '#a855f7';

const GLOBE_RADIUS = 2.2;

const COLOMBO = { lat: 6.93, lng: 79.85 };
// One city per region actually named in the hero copy ("Australia, the UK, North America,
// the Middle East") — no invented 5th destination.
const CITIES = [
  { name: 'Sydney', lat: -33.87, lng: 151.21 },
  { name: 'London', lat: 51.51, lng: -0.13 },
  { name: 'New York', lat: 40.71, lng: -74.01 },
  { name: 'Dubai', lat: 25.2, lng: 55.27 },
];

function latLngToVec3(lat: number, lng: number, r: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

function fibonacciSpherePositions(samples: number, radius: number) {
  const positions = new Float32Array(samples * 3);
  const goldenAngle = Math.PI * (Math.sqrt(5) - 1);
  for (let i = 0; i < samples; i++) {
    const y = 1 - (i / (samples - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * i;
    positions[i * 3] = Math.cos(theta) * r * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = Math.sin(theta) * r * radius;
  }
  return positions;
}

function Arc({ start, end, delay }: { start: THREE.Vector3; end: THREE.Vector3; delay: number }) {
  const mid = useMemo(() => {
    const m = start.clone().add(end).multiplyScalar(0.5);
    return m.normalize().multiplyScalar(GLOBE_RADIUS * 1.5);
  }, [start, end]);
  const curve = useMemo(() => new THREE.QuadraticBezierCurve3(start, mid, end), [start, mid, end]);
  const pulseRef = useRef<THREE.Mesh>(null!);
  const progress = useRef(delay);

  useFrame((_, delta) => {
    progress.current = (progress.current + delta * 0.25) % 1;
    pulseRef.current.position.copy(curve.getPoint(progress.current));
  });

  return (
    <>
      <QuadraticBezierLine start={start} end={end} mid={mid} color={PURPLE} lineWidth={1.2} transparent opacity={0.55} />
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshBasicMaterial color={ELECTRIC_BLUE} />
      </mesh>
    </>
  );
}

function Globe() {
  const groupRef = useRef<THREE.Group>(null!);
  const pointPositions = useMemo(() => fibonacciSpherePositions(420, GLOBE_RADIUS * 1.07), []);
  const colombo = useMemo(() => latLngToVec3(COLOMBO.lat, COLOMBO.lng, GLOBE_RADIUS), []);
  const cities = useMemo(() => CITIES.map((c) => ({ ...c, pos: latLngToVec3(c.lat, c.lng, GLOBE_RADIUS) })), []);

  useFrame((_, delta) => {
    groupRef.current.rotation.y += delta * 0.08;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[GLOBE_RADIUS, 2]} />
        <meshBasicMaterial color={ELECTRIC_BLUE} wireframe transparent opacity={0.35} />
      </mesh>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pointPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial color={ROYAL_BLUE} size={0.02} transparent opacity={0.6} sizeAttenuation />
      </points>
      {cities.map((c, i) => (
        <Arc key={c.name} start={colombo} end={c.pos} delay={i * 0.25} />
      ))}
    </group>
  );
}

function CameraRig({
  scrollRef,
  mouseRef,
}: {
  scrollRef: React.RefObject<number>;
  mouseRef: React.RefObject<{ x: number; y: number }>;
}) {
  useFrame(({ camera }) => {
    const s = scrollRef.current ?? 0;
    const m = mouseRef.current ?? { x: 0, y: 0 };
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, THREE.MathUtils.lerp(6, 4.1, s), 0.06);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, THREE.MathUtils.lerp(0, -0.4, s), 0.06);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, m.x * 0.6, 0.05);
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, THREE.MathUtils.lerp(45, 38, s), 0.06);
      camera.updateProjectionMatrix();
    }
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export function GlobeScene({
  scrollRef,
  mouseRef,
}: {
  scrollRef: React.RefObject<number>;
  mouseRef: React.RefObject<{ x: number; y: number }>;
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      camera={{ position: [0, 0, 6], fov: 45, near: 0.1, far: 100 }}
      style={{ pointerEvents: 'none' }}
    >
      <Globe />
      <CameraRig scrollRef={scrollRef} mouseRef={mouseRef} />
    </Canvas>
  );
}
