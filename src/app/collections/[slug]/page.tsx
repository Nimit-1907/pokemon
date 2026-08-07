import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { CardArt } from "@/components/shared/CardArt";
import { CollectionProducts } from "@/components/collection/CollectionProducts";
import {
  ALL_PRODUCTS,
  collections,
  getCollection,
  getListedProducts,
} from "@/lib/data";
import { site } from "@/lib/site";
import { showPrices } from "@/lib/flags";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(
  props: PageProps<"/collections/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const collection = getCollection(slug);
  if (!collection) return { title: "Collection" };
  return {
    title: `${collection.name} Collection`,
    description: collection.description,
  };
}

export default async function CollectionPage(
  props: PageProps<"/collections/[slug]">,
) {
  const { slug } = await props.params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  /*
    A short sample per collection for the demo — `productsPerCollection` in
    `lib/flags.ts`, `null` there lists the full range.

    The category sidebar has to narrow to match. `CollectionProducts` shows a
    per-category count beside each filter, so against a 3-product sample the
    untrimmed list read "Singles 0, Accessories 0" and those filters led to an
    empty grid. Offering only the categories actually represented keeps every
    filter meaningful at any sample size.
  */
  const products = getListedProducts(slug);

  const stocked = new Set(products.map((p) => p.category));
  const categories = collection.categories.filter(
    (category) => category === ALL_PRODUCTS || stocked.has(category),
  );

  return (
    <>
      {/* Header band */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 80% at 85% 30%, rgba(62,221,107,0.12), transparent 60%)",
          }}
        />
        <Container className="py-section-tight">
          <Link
            href="/collections"
            className="inline-flex items-center gap-1.5 text-body-sm text-muted-foreground transition-colors hover:text-brand"
          >
            <ArrowLeft className="size-4" />
            All collections
          </Link>

          <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <p className="text-eyebrow font-semibold uppercase text-brass">
                {collection.tagline}
              </p>
              <h1 className="mt-3 font-display text-h1 font-extrabold uppercase text-foreground">
                {collection.name}
              </h1>
              <p className="mt-4 text-lead text-muted-foreground">
                {collection.description}
              </p>
              {/*
                The currency note is stated once per page, next to the
                products, rather than repeated on every tile — the tiles carry
                the bare figure. With prices hidden it would refer to nothing,
                so it goes with them.
              */}
              <p className="mt-4 text-body-sm text-muted-foreground">
                {products.length} {products.length === 1 ? "item" : "items"}
                {showPrices &&
                  ` · prices in Canadian dollars, ${site.taxName} added at the till`}
              </p>
            </div>
            <CardArt
              name={collection.name}
              tagline={collection.tagline}
              gradient={collection.gradient}
              image={collection.banner}
              sizes="(min-width: 768px) 320px, 100vw"
              priority
              className="h-40 w-full shrink-0 rounded-xl md:w-80"
            />
          </div>
        </Container>
      </section>

      {/* Filters + grid */}
      <section className="band py-section">
        <Container>
          <CollectionProducts
            collection={collection}
            products={products}
            categories={categories}
          />
        </Container>
      </section>
    </>
  );
}
