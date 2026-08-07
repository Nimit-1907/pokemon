"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

/** Degrees of lean at the far edge of the tile. */
const TILT = 6;

/**
 * Makes a tile behave like a card in a sleeve: it leans toward the pointer in
 * 3D. The light it catches is `.slab`'s foil sweep, which every tile already
 * carries — this only supplies the surface for it to cross.
 *
 * It used to paint its own cursor-tracked highlight on top of that, mixing
 * emerald, white and brass. Over a whole tile that read as a rainbow wash
 * rather than as foil, and it sat on the artwork. The lean is the part worth
 * keeping; the colour belongs to the slab.
 *
 * Mouse only. On a touch screen the same pointer events fire mid-scroll, and a
 * tile that lurches while you're swiping past it is just noise.
 */
export function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);

  // Pointer position over the tile, as a percentage of its own box.
  const px = useMotionValue(50);
  const py = useMotionValue(50);

  const spring = { stiffness: 150, damping: 20, mass: 0.5 };
  const rotateY = useSpring(useTransform(px, [0, 100], [-TILT, TILT]), spring);
  const rotateX = useSpring(useTransform(py, [0, 100], [TILT, -TILT]), spring);

  const track = (event: React.PointerEvent) => {
    if (reduce || event.pointerType !== "mouse") return;
    const rect = box.current?.getBoundingClientRect();
    if (!rect) return;
    px.set(((event.clientX - rect.left) / rect.width) * 100);
    py.set(((event.clientY - rect.top) / rect.height) * 100);
  };

  const settle = () => {
    px.set(50);
    py.set(50);
  };

  return (
    <div
      ref={box}
      onPointerMove={track}
      onPointerLeave={settle}
      className={cn("tilt-card h-full", className)}
    >
      <motion.div
        className="relative h-full [transform-style:preserve-3d]"
        style={{ rotateX, rotateY }}
      >
        {children}
      </motion.div>
    </div>
  );
}
