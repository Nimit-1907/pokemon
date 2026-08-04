import { cn } from "@/lib/utils";

/**
 * On-brand gradient stand-in for copyrighted collection/card art.
 * Renders the collection name as a stylized logo lockup over a gradient,
 * with a soft radial highlight and a faint faceted emblem.
 */
export function CardArt({
  name,
  tagline,
  gradient,
  className,
  compact = false,
}: {
  name: string;
  tagline?: string;
  gradient: { from: string; to: string };
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{
        backgroundImage: `linear-gradient(150deg, ${gradient.from}, ${gradient.to})`,
      }}
    >
      {/* Radial sheen */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 30% 15%, rgba(255,255,255,0.28), transparent 55%)",
        }}
      />
      {/* Faceted emblem watermark */}
      <div
        aria-hidden
        className="absolute -right-6 -bottom-8 size-32 rotate-12 opacity-15"
        style={{
          clipPath:
            "polygon(35% 5%, 65% 5%, 90% 40%, 50% 95%, 10% 40%)",
          background: "rgba(255,255,255,0.9)",
        }}
      />
      {/* Bottom shade so text stays legible */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-2/3"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.55), transparent)",
        }}
      />

      <div className="relative flex h-full flex-col items-center justify-center p-4 text-center">
        <span
          className={cn(
            "font-display font-bold uppercase leading-none tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]",
            compact ? "text-lg" : "text-2xl sm:text-3xl",
          )}
        >
          {name}
        </span>
        {tagline && !compact && (
          <span className="mt-2 rounded-full bg-black/30 px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm">
            {tagline}
          </span>
        )}
      </div>
    </div>
  );
}
