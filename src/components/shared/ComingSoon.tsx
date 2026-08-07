import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Phone } from "lucide-react";
import { asset } from "@/lib/asset";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { StoreStatus } from "@/components/shared/StoreStatus";
import { site } from "@/lib/site";
import { telHref } from "@/lib/contact";

/**
 * Placeholder for a route that is linked and reachable but held back.
 *
 * Deliberately restrained — the point is to show nothing half-finished, so it
 * carries no placeholder counts, dates or product data. What it does carry is
 * the two things that are real and useful on any page of a local shop's site:
 * whether the store is open, and its phone number.
 */
export function ComingSoon({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(55% 60% at 50% 0%, rgba(62,221,107,0.1), transparent 65%), radial-gradient(40% 50% at 15% 100%, rgba(217,168,87,0.07), transparent 60%)",
        }}
      />

      <Container className="flex min-h-[58vh] flex-col items-center justify-center py-section text-center">
        {/*
          The one place the full lockup gets to be itself — there's room here
          for its own lettering, which is exactly why it can't go in the header.
        */}
        <Image
          src={asset("/images/logo.webp")}
          alt=""
          aria-hidden
          width={512}
          height={512}
          priority
          className="mb-6 h-28 w-auto object-contain sm:h-32"
        />

        <p className="text-eyebrow font-semibold uppercase text-brass">
          {eyebrow}
        </p>

        {/*
          "Coming soon" is the `h1` so the page still has a heading — each route
          sets its own `metadata.title`, which is what names the browser tab.
        */}
        <h1 className="mt-3 font-display text-h1 font-extrabold uppercase text-foreground">
          {title}
        </h1>

        <p className="mt-4 max-w-md text-lead text-muted-foreground">
          {description}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="font-semibold">
            <a href={telHref(site.phone)}>
              <Phone className="size-4" />
              Call the shop
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="font-semibold hover:border-brand/60 hover:text-brand"
          >
            <Link href="/">
              <ArrowLeft className="size-4" />
              Back home
            </Link>
          </Button>
        </div>

        <StoreStatus className="mt-8" />
      </Container>
    </section>
  );
}
