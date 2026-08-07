import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CollectionCard } from "@/components/shared/CollectionCard";
import { Reveal, StaggerGrid, StaggerItem } from "@/components/motion/Reveal";
import { collections } from "@/lib/data";

export function FeaturedCollections() {
  return (
    <section id="collections" className="band scroll-mt-20 py-section">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Five card games"
            title="Shop by game"
            viewAllHref="/collections"
            viewAllLabel="All collections"
          />
        </Reveal>
        <StaggerGrid className="grid grid-cols-2 gap-tile sm:grid-cols-3 lg:grid-cols-5">
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
