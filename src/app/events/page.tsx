import type { Metadata } from "next";
import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: "Events",
  description:
    "The full events calendar for Emerald Cards & Games in Windsor, Ontario is coming soon.",
};

/*
  The full events listing and calendar are not live yet. Individual event pages
  (`/events/[slug]`) still work and are what the homepage card links to.
*/
export default function EventsPage() {
  return <ComingSoon />;
}
