import type { Metadata } from "next";
import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = { title: "Events" };

export default function EventsPage() {
  return <ComingSoon title="Events" phase="Phase 4" />;
}
