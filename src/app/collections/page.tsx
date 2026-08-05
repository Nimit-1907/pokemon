import type { Metadata } from "next";
import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "The full collection index at Emerald Cards & Games is coming soon — Pokémon, One Piece, Magic, Disney Lorcana, and Sports Cards.",
};

/*
  The full collection index is not live yet. Individual collection pages
  (`/collections/[slug]`) still work and are what the homepage tiles link to.
*/
export default function CollectionsPage() {
  return <ComingSoon />;
}
