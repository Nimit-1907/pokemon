import { CardArt } from "@/components/shared/CardArt";
import { TiltCard } from "@/components/motion/TiltCard";
import { formatPrice } from "@/lib/format";
import { showPrices } from "@/lib/flags";
import type { Product } from "@/types";

/**
 * Product tile: photo (or gradient stand-in), name, type, and price.
 *
 * A `panel` rather than a `slab` — the tile isn't clickable, and a card that
 * lifts under the cursor promises a link that isn't there. The lift is
 * reserved for tiles that actually go somewhere. The tilt is a different
 * thing and does apply here: it's the material responding to being looked at,
 * the way a card in a sleeve does, not an affordance for a tap.
 *
 * Prices are hidden for the demo (`showPrices` in `lib/flags.ts`); the figures
 * are still in the data and the formatting is still wired up, so turning them
 * back on is a one-line change.
 */
export function ProductCard({ product }: { product: Product }) {
  return (
    <TiltCard>
      <div className="panel group flex h-full flex-col overflow-hidden">
        <CardArt
          name={product.name}
          gradient={product.gradient}
          image={product.image}
          imageFit="contain"
          sizes="(min-width: 1280px) 20vw, (min-width: 640px) 30vw, 45vw"
          className="aspect-square w-full"
          compact
        />
        <div className="flex flex-1 flex-col gap-1 p-4">
          <h3 className="text-body font-semibold leading-tight text-foreground">
            {product.name}
          </h3>
          <p className="text-caption text-muted-foreground">{product.type}</p>
          {showPrices && (
            /*
              Brass and monospaced: prices are data, and the tabular figures line
              the decimals up down the column. `mt-auto` pins them to a common
              baseline so a two-line product name doesn't shunt its price out of
              step with the tile beside it.
            */
            <p className="font-data mt-auto pt-3 text-price font-medium text-brass">
              {formatPrice(product.price)}
            </p>
          )}
        </div>
      </div>
    </TiltCard>
  );
}
