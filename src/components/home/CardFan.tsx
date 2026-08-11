"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { CardArt } from "@/components/shared/CardArt";
import { getCollection } from "@/lib/data";
import type { CollectionSlug } from "@/types";
import { cn } from "@/lib/utils";

/**
 * The arc the cards sit on, left to right. Offsets are fractions of a card's
 * own width/height (percentage translates) rather than fixed pixels, so the
 * whole fan scales with its container and every card stays on screen down to
 * the narrowest phone. `--fan-spread` tightens the arc on small screens.
 */
const SLOTS: {
  /** degrees at full spread */
  rotate: number;
  /** multiples of card width */
  x: number;
  /** multiples of card height */
  y: number;
  z: number;
  scale: number;
  /** the half of the card its neighbour doesn't cover */
  align: "start" | "center" | "end";
}[] = [
  { rotate: -22, x: -1.33, y: 0.27, z: 10, scale: 0.9, align: "start" },
  { rotate: -11, x: -0.7, y: 0.05, z: 20, scale: 0.96, align: "start" },
  { rotate: 0, x: 0, y: -0.05, z: 40, scale: 1.08, align: "center" },
  { rotate: 11, x: 0.7, y: 0.05, z: 20, scale: 0.96, align: "end" },
  { rotate: 22, x: 1.33, y: 0.27, z: 10, scale: 0.9, align: "end" },
];

/** The front slot — whichever card is selected rotates into it. */
export const FAN_CENTER = 2;

/** The cards, in their at-rest left-to-right order. */
export const fanCards = (
  [
    { slug: "sports-cards" },
    { slug: "magic", short: "Magic" },
    { slug: "pokemon" },
    { slug: "one-piece" },
    { slug: "disney-lorcana", short: "Lorcana" },
  ] satisfies { slug: CollectionSlug; short?: string }[]
).map((card) => ({ ...card, collection: getCollection(card.slug)! }));

/** Past this much drag (or flick speed) the deck advances one card. */
const SWIPE_DISTANCE = 40;
const SWIPE_VELOCITY = 300;

/** How far the deck leans toward the pointer, in degrees at the far edge. */
const TILT_Y = 13;
const TILT_X = 9;

/** The opening deal: how long before the first card leaves the stack, and the
 *  gap between each card after it. */
const DEAL_DELAY_MS = 220;
const DEAL_STAGGER_MS = 90;

/**
 * A fanned spread of trading cards — the hero's signature visual.
 * `active` is the index of the card held at the front; the rest rotate around
 * the arc to make room for it. Passing `onActiveChange` makes the fan
 * swipeable — drag or flick it sideways to deal the next card to the front.
 */
export function CardFan({
  active = FAN_CENTER,
  onActiveChange,
  className,
}: {
  active?: number;
  onActiveChange?: (index: number) => void;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const swipeable = Boolean(onActiveChange);
  const stage = useRef<HTMLDivElement>(null);

  /*
    Lean the deck toward the pointer. Cards in a hand catch the light as you
    turn them, and a flat fan on a flat page never does — this is the whole
    reason the stage carries a perspective. Springs rather than raw pointer
    values so it settles instead of tracking twitchily, and mouse-only: on a
    touch screen the same events fire mid-swipe and fight the drag.
  */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const spring = { stiffness: 110, damping: 18, mass: 0.6 };
  const rotateY = useSpring(rawX, spring);
  const rotateX = useSpring(rawY, spring);

  /*
    Where the holographic highlight sits on the front card, tracked off the
    same lean that tilts the deck. Foil doesn't have a fixed pattern — what you
    see is the angle you're holding it at — so driving the sheen from the lean
    rather than from raw cursor position is what makes it read as a property of
    the card instead of as a light following the mouse.

    Inverted against the rotation: leaning the top of the card away from you
    should bring the highlight down its face, not up.
  */
  const holoX = useTransform(rotateY, [-TILT_Y, TILT_Y], ["78%", "22%"]);
  const holoY = useTransform(rotateX, [-TILT_X, TILT_X], ["22%", "78%"]);

  const lean = (event: React.PointerEvent) => {
    if (reduce || event.pointerType !== "mouse") return;
    const box = stage.current?.getBoundingClientRect();
    if (!box) return;
    rawX.set(((event.clientX - box.left) / box.width - 0.5) * 2 * TILT_Y);
    rawY.set(((event.clientY - box.top) / box.height - 0.5) * -2 * TILT_X);
  };

  const level = () => {
    rawX.set(0);
    rawY.set(0);
  };

  /** +1 deals the card on the right to the front, -1 the one on the left. */
  const advance = (direction: number) =>
    onActiveChange?.(
      (active + direction + fanCards.length) % fanCards.length,
    );

  return (
    <motion.div
      ref={stage}
      // `drag` leaves touch-action: pan-y in place, so the page still scrolls.
      drag={swipeable ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={reduce ? 0 : 0.12}
      dragMomentum={false}
      onDragEnd={(_, info) => {
        if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY)
          advance(1);
        else if (
          info.offset.x > SWIPE_DISTANCE ||
          info.velocity.x > SWIPE_VELOCITY
        )
          advance(-1);
      }}
      onPointerMove={lean}
      onPointerLeave={level}
      className={cn(
        "relative mx-auto aspect-[4/3] w-full max-w-md [--fan-spread:0.72] [perspective:1400px]",
        "sm:max-w-lg sm:[--fan-spread:0.85]",
        "lg:max-w-xl lg:[--fan-spread:1]",
        swipeable && "cursor-grab touch-pan-y select-none active:cursor-grabbing",
        className,
      )}
    >
      <motion.div
        className="absolute inset-0 [transform-style:preserve-3d]"
        style={
          {
            rotateX,
            rotateY,
            "--holo-x": holoX,
            "--holo-y": holoY,
          } as React.CSSProperties
        }
      >
        {/* Emerald glow pool behind the cards */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 size-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: "rgba(62,221,107,0.22)" }}
        />
        {fanCards.map((card, i) => {
          // Rotate the deck so the active card lands in the centre slot.
          const slot =
            SLOTS[(i - active + FAN_CENTER + SLOTS.length * 2) % SLOTS.length];
          const centered = slot.align === "center";
          return (
            <div
              key={card.slug}
              className="fan-card absolute left-1/2 top-1/2 w-[30%]"
              style={
                {
                  transform: [
                    "translate(-50%, -50%)",
                    `translate(calc(${slot.x * 100}% * var(--fan-spread)), calc(${slot.y * 100}% * var(--fan-spread)))`,
                    `rotate(calc(${slot.rotate}deg * var(--fan-spread)))`,
                    `scale(${slot.scale})`,
                  ].join(" "),
                  /*
                    Where this card starts the opening deal: squared up in the
                    stack, with a shade of rotation each so the pile has a
                    hand-made edge instead of looking like a single card.
                  */
                  "--stack": `translate(-50%, -50%) rotate(${(i - FAN_CENTER) * 1.2}deg) scale(0.94)`,
                  "--deal-delay": `${DEAL_DELAY_MS + i * DEAL_STAGGER_MS}ms`,
                  zIndex: slot.z,
                } as React.CSSProperties
              }
            >
              <div className="relative overflow-hidden rounded-lg border border-white/15 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.8)] ring-1 ring-black/40 sm:rounded-xl">
                <CardArt
                  /* Only the front card has room for a long name. */
                  name={
                    centered
                      ? card.collection.name
                      : (card.short ?? card.collection.name)
                  }
                  gradient={card.collection.gradient}
                  image={card.collection.image}
                  sizes="(min-width: 1024px) 200px, 32vw"
                  priority
                  className="aspect-[3/4] w-full"
                  compact
                  align={slot.align}
                  /* Nothing beside a fanned card names it. */
                  labelled
                />
                {/*
                  Foil, and only on the card being held at the front. Last in
                  the box so it lies over the artwork without needing a z-index
                  to climb above it.

                  `globals.css` sets the rule this obeys: one light source per
                  surface. The four angled cards stay matte, so the front one
                  is unmistakably the subject — give all five a sheen and the
                  fan becomes five things competing rather than a hand with one
                  card held up out of it.

                  Scoped to the fan. This must never reach a `.slab` tile,
                  which already carries a sweep of its own.
                */}
                {centered && !reduce && <div aria-hidden className="holo-foil" />}
              </div>
            </div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
