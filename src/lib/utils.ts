import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * The design system's type scale lives in `--text-*` theme keys (globals.css).
 * tailwind-merge only knows Tailwind's built-in font sizes, so it reads an
 * unfamiliar `text-h2` / `text-control-sm` as a *colour* and lets a later
 * `text-brand` in the same merge delete it. Registering the custom steps keeps
 * size and colour in separate conflict groups, so both survive.
 *
 * Add any new `--text-*` token here too.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display",
            "h1",
            "h2",
            "h3",
            "lead",
            "body",
            "body-sm",
            "caption",
            "eyebrow",
            "control",
            "control-lg",
            "control-sm",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
