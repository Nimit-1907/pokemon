import type { Metadata } from "next";
import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = { title: "Collections" };

export default function CollectionsPage() {
  return <ComingSoon title="Collections" phase="Phase 3" />;
}
