"use client";

import { Fragment } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

/*
  A headline that wipes up from behind itself, a word at a time.

  The difference from a fade-up is that the words are *masked* rather than
  faded: each one is clipped by its own box and slides in from below it, so the
  type appears to be revealed rather than to materialise. On a display-weight
  uppercase face that reads as a title card; a fade reads as a page loading.

  This deliberately has no `initial`/`animate` of its own. It declares the same
  "hidden"/"show" variant names the hero's copy container uses, so it inherits
  that container's state through context and takes its turn in the existing
  stagger instead of starting a second, competing sequence.
*/

const line: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const word: Variants = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    // Overshoot-free but late-decelerating, so the word settles rather than stops.
    transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] },
  },
};

export type WipeLine = {
  text: string;
  /**
   * Sets the line in brass and passes a single foil highlight across it once,
   * on arrival. See `.foil-sweep` in `globals.css` — and note it sweeps once
   * and stops. A looping shimmer on a headline is the clearest tell that a
   * page came out of a template.
   */
  accent?: boolean;
};

/** Renders inside a heading — the caller owns the `<h1>` and its type styles. */
export function WordWipe({
  lines,
  className,
}: {
  lines: WipeLine[];
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <span className={className}>
        {lines.map((l, i) => (
          <Fragment key={l.text}>
            {i > 0 && <br />}
            <span className={cn(l.accent && "text-brass")}>{l.text}</span>
          </Fragment>
        ))}
      </span>
    );
  }

  return (
    <span className={className}>
      {lines.map((l, i) => (
        <Fragment key={l.text}>
          {i > 0 && <br />}
          <motion.span variants={line} className="inline-block">
            {l.text.split(" ").map((w, j, all) => (
              <Fragment key={`${w}-${j}`}>
                {/*
                  The mask. Padding plus an equal negative margin gives
                  descenders and the apostrophe somewhere to live without the
                  clip biting into them, and without changing the line box.
                */}
                <span className="inline-block overflow-hidden pb-[0.14em] align-bottom -mb-[0.14em]">
                  <motion.span
                    variants={word}
                    className={cn(
                      "inline-block",
                      l.accent && "foil-sweep text-brass",
                    )}
                  >
                    {w}
                  </motion.span>
                </span>
                {j < all.length - 1 && " "}
              </Fragment>
            ))}
          </motion.span>
        </Fragment>
      ))}
    </span>
  );
}
