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

function Globe({ scrollRef }: { scrollRef: React.RefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null!);
  const idleRotation = useRef(0);
  const pointPositions = useMemo(() => fibonacciSpherePositions(420, GLOBE_RADIUS * 1.07), []);
  const colombo = useMemo(() => latLngToVec3(COLOMBO.lat, COLOMBO.lng, GLOBE_RADIUS), []);
  const cities = useMemo(() => CITIES.map((c) => ({ ...c, pos: latLngToVec3(c.lat, c.lng, GLOBE_RADIUS) })), []);

  useFrame((_, delta) => {
    idleRotation.current += delta * 0.08;
    // Extra yaw ramps in around the t=0.66 camera keyframe, turning a different arc into frame
    // on top of the constant idle spin — not accumulated per-frame, so it settles rather than drifts.
    const s = scrollRef.current ?? 0;
    const scrollYaw = THREE.MathUtils.smoothstep(s, 0.5, 0.8) * (Math.PI / 2);
    groupRef.current.rotation.y = idleRotation.current + scrollYaw;
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

type CameraKeyframe = { t: number; z: number; y: number; fov: number };

// t=0 wide establishing shot -> 0.33 push in -> 0.66 second framing (paired with the globe's
// scrollYaw) -> 1 settled wider "arrival" shot as the section hands off to the next one.
const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  { t: 0, z: 6, y: 0, fov: 45 },
  { t: 0.33, z: 3.4, y: -0.2, fov: 42 },
  { t: 0.66, z: 3.0, y: 0.3, fov: 40 },
  { t: 1, z: 4.6, y: 0, fov: 44 },
];

function lerpKeyframes(t: number, stops: CameraKeyframe[]) {
  const clamped = THREE.MathUtils.clamp(t, 0, 1);
  for (let i = 0; i < stops.length - 1; i++) {
    const a = stops[i];
    const b = stops[i + 1];
    if (clamped <= b.t) {
      const localT = (clamped - a.t) / (b.t - a.t);
      return {
        z: THREE.MathUtils.lerp(a.z, b.z, localT),
        y: THREE.MathUtils.lerp(a.y, b.y, localT),
        fov: THREE.MathUtils.lerp(a.fov, b.fov, localT),
      };
    }
  }
  const last = stops[stops.length - 1];
  return { z: last.z, y: last.y, fov: last.fov };
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
    const target = lerpKeyframes(s, CAMERA_KEYFRAMES);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, target.z, 0.06);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, target.y, 0.06);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, m.x * 0.6, 0.05);
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, target.fov, 0.06);
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
      <Globe scrollRef={scrollRef} />
      <CameraRig scrollRef={scrollRef} mouseRef={mouseRef} />
    </Canvas>
  );
}
