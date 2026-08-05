import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CollectionCard } from "@/components/shared/CollectionCard";
import { Reveal, StaggerGrid, StaggerItem } from "@/components/motion/Reveal";
import { collections } from "@/lib/data";

export function FeaturedCollections() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            title="Featured Collection"
            viewAllHref="/collections"
            viewAllLabel="View All Collections"
          />
        </Reveal>
        <StaggerGrid className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {collections.map((collection) => (
            <StaggerItem key={collection.slug}>
              <CollectionCard collection={collection} />
            </StaggerItem>
          ))}
        </StaggerGrid>
      </Container>
    </section>
  );
}
