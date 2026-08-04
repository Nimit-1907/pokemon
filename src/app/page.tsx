import { Hero } from "@/components/home/Hero";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { AboutSection } from "@/components/home/AboutSection";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCollections />
      <UpcomingEvents />
      <AboutSection />
    </>
  );
}
