import { cn } from "@/lib/utils";

/**
 * Centered max-width page container with responsive gutters.
 * Gutters honour the device safe areas so nothing hides under a notch when the
 * page renders edge-to-edge (`viewportFit: "cover"`).
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
        "pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))]",
        "sm:pl-[max(1.5rem,env(safe-area-inset-left))] sm:pr-[max(1.5rem,env(safe-area-inset-right))]",
        "lg:pl-[max(2rem,env(safe-area-inset-left))] lg:pr-[max(2rem,env(safe-area-inset-right))]",
        className,
      )}
    >
      {children}
    </div>
  );
}
