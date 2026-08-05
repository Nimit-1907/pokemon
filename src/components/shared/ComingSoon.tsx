import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";

/**
 * Placeholder for a route that is linked and reachable but not built out yet.
 * Deliberately bare: the message and a way back, nothing else. "Coming Soon"
 * is the `h1` so the page still has a heading — each route sets its own
 * `metadata.title`, which is what names the browser tab.
 */
export function ComingSoon() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      {/* `.text-glow` is the site's green heading treatment — brand + soft bloom. */}
      <h1 className="text-glow font-display text-h1 font-bold uppercase">
        Coming Soon
      </h1>
      <Button asChild variant="outline" className="mt-8 hover:text-brand">
        <Link href="/">
          <ArrowLeft className="size-4" />
          Back home
        </Link>
      </Button>
    </Container>
  );
}
