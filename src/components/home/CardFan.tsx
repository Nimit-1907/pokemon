import { CardArt } from "@/components/shared/CardArt";
import { getCollection } from "@/lib/data";
import type { CollectionSlug } from "@/types";
import { cn } from "@/lib/utils";

/** A fanned spread of trading cards — the hero's signature visual. */
const FAN: {
  slug: CollectionSlug;
  rotate: number;
  x: number;
  y: number;
  z: number;
  scale: number;
}[] = [
  { slug: "sports-cards", rotate: -22, x: -170, y: 46, z: 10, scale: 0.9 },
  { slug: "magic", rotate: -11, x: -90, y: 8, z: 20, scale: 0.96 },
  { slug: "pokemon", rotate: 0, x: 0, y: -8, z: 40, scale: 1.08 },
  { slug: "one-piece", rotate: 11, x: 90, y: 8, z: 20, scale: 0.96 },
  { slug: "disney-lorcana", rotate: 22, x: 170, y: 46, z: 10, scale: 0.9 },
];

export function CardFan({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative mx-auto h-[340px] w-full max-w-md sm:h-[420px]",
        className,
      )}
    >
      {/* Emerald glow pool behind the cards */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "rgba(85,231,27,0.22)" }}
      />
      {FAN.map((card) => {
        const collection = getCollection(card.slug)!;
        return (
          <div
            key={card.slug}
            className="absolute left-1/2 top-1/2 w-32 sm:w-40"
            style={{
              transform: `translate(-50%, -50%) translate(${card.x}px, ${card.y}px) rotate(${card.rotate}deg) scale(${card.scale})`,
              zIndex: card.z,
            }}
          >
            <div className="overflow-hidden rounded-xl border border-white/15 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.8)] ring-1 ring-black/40">
              <CardArt
                name={collection.name}
                gradient={collection.gradient}
                className="aspect-[3/4] w-full"
                compact
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
