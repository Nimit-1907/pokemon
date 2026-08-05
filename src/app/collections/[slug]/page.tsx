import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { CardArt } from "@/components/shared/CardArt";
import { CollectionProducts } from "@/components/collection/CollectionProducts";
import {
  collections,
  getCollection,
  getProductsByCollection,
} from "@/lib/data";

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

  // Showing a short sample per collection for now, not the full catalogue.
  const products = getProductsByCollection(slug).slice(0, 3);

  return (
    <>
      {/* Header band */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 80% at 85% 30%, rgba(85,231,27,0.12), transparent 60%)",
          }}
        />
        <Container className="py-10 sm:py-14">
          <Link
            href="/collections"
            className="inline-flex items-center gap-1.5 text-body-sm text-muted-foreground transition-colors hover:text-brand"
          >
            <ArrowLeft className="size-4" />
            Back to Collections
          </Link>

          <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h1 className="font-display text-h1 font-bold uppercase text-foreground">
                {collection.name}{" "}
                <span className="text-glow">Collection</span>
              </h1>
              <p className="mt-4 text-lead text-muted-foreground">
                {collection.description}
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
      <section className="py-12">
        <Container>
          <CollectionProducts collection={collection} products={products} />
        </Container>
      </section>
    </>
  );
}
