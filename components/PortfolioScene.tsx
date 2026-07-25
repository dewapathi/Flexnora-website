'use client';
import { useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, QuadraticBezierLine } from '@react-three/drei';
import * as THREE from 'three';
import { IndustryCard } from './IndustryCard';
import { industries, type Industry } from '@/lib/demo/industries';

const SPACING_Z = 7;
const CARD_WIDTH = 340;

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
  const positions = useMemo(
    () => randomBoxPositions(300, { x: 14, y: 8, z: totalZ / 2 + 10 }),
    [totalZ]
  );
  return (
    <points position={[0, 0, -totalZ / 2]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#4f46e5" size={0.03} transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

function ConnectorLines({ positions }: { positions: THREE.Vector3[] }) {
  return (
    <>
      {positions.slice(0, -1).map((p, i) => {
        const next = positions[i + 1];
        const mid = p
          .clone()
          .add(next)
          .multiplyScalar(0.5)
          .setY(Math.max(p.y, next.y) + 1);
        return (
          <QuadraticBezierLine
            key={i}
            start={p}
            mid={mid}
            end={next}
            color="#a855f7"
            lineWidth={1}
            transparent
            opacity={0.35}
          />
        );
      })}
    </>
  );
}

function IndustryCard3D({
  industry,
  position,
  index,
  total,
  scrollRef,
}: {
  industry: Industry;
  position: [number, number, number];
  index: number;
  total: number;
  scrollRef: React.RefObject<number>;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null!);
  const router = useRouter();

  // A tall card rendered as a true CSS-3D plane (drei's Html `transform` mode) has a
  // reproducible hit-testing quirk in this setup: clicks anywhere on the lower half of the
  // card (near the "Explore Live Demo" link) miss the real <a> tag and land on a sibling
  // element instead, even though getBoundingClientRect()/visual position look correct.
  // Rather than chase that further, the whole focused card is also clickable — a click that
  // lands on the real link still navigates natively (handled first, below); anything else
  // within the card falls through to this handler.
  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('a')) return;
    const href = industry.externalUrl ?? `/demo/${industry.slug}`;
    if (industry.externalUrl) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      router.push(href);
    }
  };

  // The focus fade/scale is applied as a plain CSS transform on the DOM wrapper, not on the
  // Three.js group. Mutating the group's own scale every frame made drei's Html (which
  // recomputes its CSS matrix from the object's world matrix each frame) and this ref-based
  // DOM write race each other — getBoundingClientRect() on the real link inside would report
  // a stale position relative to what was actually painted, so clicks landed on the wrong
  // element. Keeping the group's transform static and doing the fade purely in DOM-land avoids
  // that desync.
  useFrame(() => {
    const focusProgress = (scrollRef.current ?? 0) * (total - 1);
    const distance = Math.abs(index - focusProgress);
    const opacity = THREE.MathUtils.clamp(1 - distance / 1.3, 0, 1);
    const scale = THREE.MathUtils.lerp(0.85, 1, opacity);
    if (wrapperRef.current) {
      wrapperRef.current.style.opacity = String(opacity);
      wrapperRef.current.style.transform = `scale(${scale})`;
      wrapperRef.current.style.pointerEvents = distance < 0.15 ? 'auto' : 'none';
    }
  });

  return (
    <group position={position}>
      {/* Html's `transform` mode treats CSS px as world units 1:1 — `scale` shrinks the
          ~340px-wide card down to a few world units so it reads at the right size next to
          the card spacing (SPACING_Z=7). `center` anchors the div's middle, not its corner,
          to this group's 3D position. */}
      <Html transform occlude={false} center scale={0.35}>
        <div
          ref={wrapperRef}
          onClick={handleCardClick}
          style={{ width: CARD_WIDTH, cursor: 'pointer' }}
        >
          <IndustryCard industry={industry} />
        </div>
      </Html>
    </group>
  );
}

// Continuous piecewise-linear position between whichever two cards `t` currently sits between —
// used so the camera's x/y/z target moves smoothly along the whole corridor instead of snapping
// between cards at the halfway point (which a rounded index would do).
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

// Constant viewing distance in front of whichever card is focused. Previously the camera's z
// was driven by an independent start/end lerp (arriving 4 units *behind* the last card, for a
// "settled arrival" feel borrowed from the Hero) while the focus-fade logic separately said the
// last card should be at full opacity right at progress=1 — those two disagreed, so the last
// card ended up behind the camera and rendered at zero size. Tying z directly to the focused
// card's own position keeps every card, including the first and last, in front of the camera.
const VIEW_DISTANCE = 6;

function CameraRig({
  scrollRef,
  mouseRef,
  cardPositions,
}: {
  scrollRef: React.RefObject<number>;
  mouseRef: React.RefObject<{ x: number; y: number }>;
  cardPositions: THREE.Vector3[];
}) {
  useFrame(({ camera }) => {
    const s = scrollRef.current ?? 0;
    const m = mouseRef.current ?? { x: 0, y: 0 };
    const focusProgress = s * (cardPositions.length - 1);
    const target = interpolateAlongPath(focusProgress, cardPositions);
    const targetZ = target.z + VIEW_DISTANCE;

    // Fully track the focused card's x/y (not a fraction of it) — under-shooting here is what
    // left off-axis cards (the ±1.8 zigzag positions) rendering partially or fully out of frame
    // right when they were supposed to be in focus.
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.07);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, target.x + m.x * 0.4, 0.06);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, target.y + m.y * 0.25, 0.06);
    camera.lookAt(target.x, target.y, target.z);
  });
  return null;
}

export function PortfolioScene({
  scrollRef,
  mouseRef,
}: {
  scrollRef: React.RefObject<number>;
  mouseRef: React.RefObject<{ x: number; y: number }>;
}) {
  const cardPositions = useMemo(
    () =>
      industries.map(
        (_, i) => new THREE.Vector3(i % 2 === 0 ? -1.8 : 1.8, Math.sin(i) * 0.6, -i * SPACING_Z)
      ),
    []
  );
  const totalZ = SPACING_Z * (industries.length - 1);

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      camera={{ position: [0, 0, cardPositions[0].z + 6], fov: 50, near: 0.1, far: 200 }}
    >
      <Starfield totalZ={totalZ} />
      <ConnectorLines positions={cardPositions} />
      {industries.map((industry, i) => (
        <IndustryCard3D
          key={industry.slug}
          industry={industry}
          position={cardPositions[i].toArray() as [number, number, number]}
          index={i}
          total={industries.length}
          scrollRef={scrollRef}
        />
      ))}
      <CameraRig scrollRef={scrollRef} mouseRef={mouseRef} cardPositions={cardPositions} />
    </Canvas>
  );
}
