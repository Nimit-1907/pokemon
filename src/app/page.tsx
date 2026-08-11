import { Hero } from "@/components/home/Hero";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { AboutSection } from "@/components/home/AboutSection";
import { PageTransition } from "@/components/motion/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <FeaturedCollections />
      <UpcomingEvents />
      <AboutSection />
    </PageTransition>
  );
}
