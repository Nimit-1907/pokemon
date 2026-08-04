import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CollectionCard } from "@/components/shared/CollectionCard";
import { collections } from "@/lib/data";

export function FeaturedCollections() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          title="Featured Collection"
          viewAllHref="/collections"
          viewAllLabel="View All Collections"
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {collections.map((collection) => (
            <CollectionCard key={collection.slug} collection={collection} />
          ))}
        </div>
      </Container>
    </section>
  );
}
