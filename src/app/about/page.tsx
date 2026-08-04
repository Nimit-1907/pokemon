import type { Metadata } from "next";
import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = { title: "About Us" };

export default function AboutPage() {
  return <ComingSoon title="About Us" phase="Phase 5" />;
}
