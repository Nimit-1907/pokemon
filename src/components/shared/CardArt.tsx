import Image from "next/image";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";

/**
 * Collection/event artwork.
 *
 * With `image` it renders the real artwork. Without one it falls back to the
 * on-brand gradient stand-in with the name set in the display face — titles we
 * don't have art for still look deliberate rather than broken.
 *
 * The artwork carries no text of its own, so anywhere the surrounding layout
 * doesn't already print the title, pass `labelled` to caption it.
 */
export function CardArt({
  name,
  tagline,
  gradient,
  image,
  sizes = "100vw",
  priority = false,
  className,
  compact = false,
  /** Where the lockup sits — useful when a card is partly overlapped. */
  align = "center",
  imageFit = "cover",
  labelled = false,
}: {
  name: string;
  tagline?: string;
  gradient: { from: string; to: string };
  /** Artwork path under /public. Falls back to the gradient when absent. */
  image?: string;
  /** Passed to next/image so phones don't download desktop-sized art. */
  sizes?: string;
  priority?: boolean;
  className?: string;
  compact?: boolean;
  align?: "center" | "start" | "end";
  /**
   * How the artwork fills the frame. Posters and banners are shot to fill, so
   * they `cover`. Product art is portrait card scans and transparent set
   * logos — cropping those to a square tile beheads the card and clips the
   * lockup, so they `contain` and let the gradient show around them.
   */
  imageFit?: "cover" | "contain";
  /**
   * Caption the artwork with `name`. Only needed where nothing beside the card
   * names it — the hero fan, mainly; tiles and headers print their own title.
   */
  labelled?: boolean;
}) {
  return (
    <div
      className={cn("@container relative overflow-hidden", className)}
      style={{
        // Doubles as the backdrop while the artwork decodes.
        backgroundImage: `linear-gradient(150deg, ${gradient.from}, ${gradient.to})`,
      }}
    >
      {image ? (
        <>
          {/*
            Contained art floats on the gradient, so it gets the sheen and a
            drop shadow to sit it on the surface rather than look pasted on.
          */}
          {imageFit === "contain" && (
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(120% 90% at 30% 15%, rgba(255,255,255,0.22), transparent 60%)",
              }}
            />
          )}
          <Image
            src={asset(image)}
            alt={name}
            fill
            sizes={sizes}
            priority={priority}
            className={
              imageFit === "contain"
                ? "object-contain p-[9%] drop-shadow-[0_6px_16px_rgba(0,0,0,0.45)]"
                : "object-cover"
            }
          />
          {labelled && (
            /*
              Scrim first, then the name — illustration runs edge to edge, so
              type set straight onto it is unreadable over a bright panel.
              Sized in container-query units to match the gradient fallback.
            */
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-center bg-gradient-to-t from-black/80 via-black/45 to-transparent p-[7%] pt-[18%] text-center">
              <span
                className={cn(
                  "font-display font-bold uppercase leading-[1.1] tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]",
                  compact
                    ? "text-[clamp(0.55rem,8cqw,1rem)]"
                    : "text-[clamp(0.8rem,10cqw,1.75rem)]",
                )}
              >
                {name}
              </span>
            </div>
          )}
        </>
      ) : (
        <>
          {/* Radial sheen */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 90% at 30% 15%, rgba(255,255,255,0.28), transparent 55%)",
            }}
          />
          {/*
            House artwork: the brand shield watermarked behind the name. A flat
            gradient swatch reads as a missing image; stamped like this, a title
            we have no art for still looks like part of the range.
          */}
          <Image
            src={asset("/images/emblem.webp")}
            alt=""
            aria-hidden
            fill
            sizes="(min-width: 640px) 25vw, 50vw"
            className="scale-[0.72] object-contain opacity-[0.18] mix-blend-luminosity"
          />
          {/* Faceted emblem watermark */}
          <div
            aria-hidden
            className="absolute -right-6 -bottom-8 size-32 rotate-12 opacity-10"
            style={{
              clipPath: "polygon(35% 5%, 65% 5%, 90% 40%, 50% 95%, 10% 40%)",
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

          {/*
            Type is sized in container-query units so a card reads correctly at
            any size — a 100px card in the hero fan, a full-width tile on a
            phone, or a wide event banner — without per-usage breakpoints.
          */}
          <div
            className={cn(
              "relative flex h-full flex-col items-center justify-center p-[6%] text-center",
              align === "start" && "pr-[52%]",
              align === "end" && "pl-[52%]",
            )}
          >
            <span
              className={cn(
                "font-display font-bold uppercase leading-[1.1] tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]",
                compact
                  ? "text-[clamp(0.6rem,9cqw,1.125rem)]"
                  : "text-[clamp(0.85rem,11cqw,1.875rem)]",
              )}
            >
              {name}
            </span>
            {tagline && !compact && (
              <span className="mt-2 rounded-full bg-black/30 px-2.5 py-0.5 text-[clamp(0.5rem,3.4cqw,0.65rem)] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm">
                {tagline}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
