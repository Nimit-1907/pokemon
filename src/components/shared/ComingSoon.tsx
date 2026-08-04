import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";

/** Placeholder for routes built in a later phase. */
export function ComingSoon({ title, phase }: { title: string; phase: string }) {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <span className="mb-4 rounded-full border border-brand/40 bg-brand/5 px-3 py-1 text-xs font-medium text-brand">
        {phase}
      </span>
      <h1 className="font-display text-4xl font-bold uppercase tracking-tight text-foreground sm:text-5xl">
        {title}
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        This page arrives in a later build phase. The navigation, theme, and
        layout shell are live now.
      </p>
      <Button asChild variant="outline" className="mt-8 hover:text-brand">
        <Link href="/">
          <ArrowLeft className="size-4" />
          Back home
        </Link>
      </Button>
    </Container>
  );
}
