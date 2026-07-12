'use client';
import { useRef, useState, type ReactNode, type ElementType, type AnchorHTMLAttributes } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useMagneticHover } from '@/hooks/useMagneticHover';

const RANGE = 70;
const STRENGTH = 0.35;

const LENS_RADIUS = 32;
const LENS_ZOOM = 1.35;

export function MagneticButton({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    const dist = Math.sqrt(relX ** 2 + relY ** 2);
    if (dist < RANGE) {
      x.set(relX * STRENGTH);
      y.set(relY * STRENGTH);
    }
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

/**
 * Premium magnetic CTA: the button pulls toward the cursor (max 8px) while its
 * text/icon content shifts slightly further (max 11px) for a layered depth effect,
 * plus a circular loupe that magnifies the text/icon right under the cursor.
 * Renders the anchor itself so `className`/`href` land on the real link element —
 * dimensions, colors, and typography are entirely controlled by the caller's className.
 */
export function MagneticCTA({
  href,
  as,
  className = '',
  contentClassName = 'inline-flex items-center gap-2',
  children,
  ...rest
}: {
  href: string;
  as?: ElementType;
  className?: string;
  /** Layout classes for the icon/text wrapper — match the gap/alignment already in `className` (default gap-2) so spacing doesn't shift. */
  contentClassName?: string;
  children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const Tag = (as ?? 'a') as ElementType;
  const { ref, enabled, style, contentStyle, handlers } = useMagneticHover({ range: 70, max: 8, contentMax: 11 });
  const linkRef = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [lensPos, setLensPos] = useState<{ x: number; y: number } | null>(null);
  const [maskPos, setMaskPos] = useState<{ x: number; y: number } | null>(null);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    handlers.onMouseMove(e);
    if (!enabled) return;
    const link = linkRef.current;
    const text = textRef.current;
    if (!link || !text) return;
    const linkRect = link.getBoundingClientRect();
    setLensPos({ x: e.clientX - linkRect.left, y: e.clientY - linkRect.top });
    // The real text sits inside the <a>'s padding, so its own box has a different
    // origin than the <a>'s border box above — measure it separately rather than
    // subtracting padding by hand, so the punched-out hole lines up exactly under
    // the zoomed duplicate regardless of the button's padding.
    const textRect = text.getBoundingClientRect();
    setMaskPos({ x: e.clientX - textRect.left, y: e.clientY - textRect.top });
  }

  function onMouseLeave() {
    handlers.onMouseLeave();
    setLensPos(null);
    setMaskPos(null);
  }

  const maskImage = maskPos
    ? `radial-gradient(circle at ${maskPos.x}px ${maskPos.y}px, transparent ${LENS_RADIUS}px, black ${LENS_RADIUS + 1}px)`
    : undefined;

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={style}
      className="inline-block"
    >
      {/* data-cursor lives on the plain <a>, not the motion.div above — this element's own
          `hover:scale-[...]` Tailwind utility (in the caller's className) composes correctly
          with any existing hover:translate-* utility via Tailwind's shared transform variables;
          a hand-written `transform` CSS rule here would instead silently replace it. */}
      <Tag ref={linkRef} href={href} className={`relative ${className}`} data-cursor="interactive" {...rest}>
        <motion.span
          ref={textRef}
          style={{
            ...contentStyle,
            ...(maskImage ? { WebkitMaskImage: maskImage, maskImage } : {}),
          }}
          className={contentClassName}
        >
          {children}
        </motion.span>

        {lensPos && (
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 justify-center overflow-hidden ${contentClassName}`}
            style={{ clipPath: `circle(${LENS_RADIUS}px at ${lensPos.x}px ${lensPos.y}px)` }}
          >
            <span
              className={contentClassName}
              style={{ transform: `scale(${LENS_ZOOM})`, transformOrigin: `${lensPos.x}px ${lensPos.y}px` }}
            >
              {children}
            </span>
          </span>
        )}
      </Tag>
    </motion.div>
  );
}
