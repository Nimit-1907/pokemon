import { cn } from "@/lib/utils";

/**
 * Centered max-width page container with a fluid gutter.
 *
 * The gutter interpolates 16px → 32px with the viewport (`--gutter` in
 * globals.css) instead of stepping at `sm` and `lg`, which is why there are no
 * breakpoint variants here any more.
 *
 * `max()` keeps it clear of the device safe areas, so nothing hides under a
 * notch when the page renders edge-to-edge (`viewportFit: "cover"`).
 */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-7xl",
        "pl-[max(var(--gutter),env(safe-area-inset-left))]",
        "pr-[max(var(--gutter),env(safe-area-inset-right))]",
        className,
      )}
    >
      {children}
    </div>
  );
}
