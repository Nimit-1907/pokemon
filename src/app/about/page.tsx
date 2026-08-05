import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, ShoppingBag, Users } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StoreInfoCards } from "@/components/shared/StoreInfoCards";
import { MapEmbed } from "@/components/shared/MapEmbed";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { Button } from "@/components/ui/button";
import { asset } from "@/lib/asset";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: site.description,
};

const STORE_IMAGE = asset("/images/store-about.webp");

const features = [
  {
    icon: ShoppingBag,
    title: "Wide Selection",
    desc: "From Pokémon to Sports Cards and more.",
  },
  {
    icon: CalendarDays,
    title: "Event Hub",
    desc: "Regular tournaments, leagues & events.",
  },
  {
    icon: Users,
    title: "Community First",
    desc: "A place for players, collectors & friends.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Intro */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(55% 60% at 15% 0%, rgba(85,231,27,0.1), transparent 60%)",
          }}
        />
        <Container className="grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-2">
          <div>
            <h1 className="font-display text-h1 font-bold uppercase text-foreground">
              About Emerald{" "}
              <span className="text-glow">Cards &amp; Games</span>
            </h1>
            <p className="mt-5 max-w-lg text-lead text-muted-foreground">
              We are a local game store in Windsor, Ontario, passionate about
              trading cards, board games, and building a strong gaming
              community.
            </p>

            <ul className="mt-8 space-y-5">
              {features.map(({ icon: Icon, title, desc }) => (
                <li key={title} className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand ring-1 ring-brand/20">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-h3 font-semibold text-foreground">
                      {title}
                    </h3>
                    <p className="text-body-sm text-muted-foreground">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <Button asChild className="mt-8 font-semibold">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>

          <div className="glow-ring relative aspect-[4/3] overflow-hidden rounded-2xl border">
            <Image
              src={STORE_IMAGE}
              alt="Inside Emerald Cards & Games"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(5,5,5,0.55), transparent 55%)",
              }}
            />
          </div>
        </Container>
      </section>

      {/* Store info + map */}
      <section className="py-14 sm:py-20">
        <Container>
          <SectionHeading title="Visit the Store" />
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              <StoreInfoCards />
              <div className="glow-card flex flex-wrap items-center justify-between gap-4 rounded-xl p-5">
                <div>
                  <h3 className="text-h3 font-semibold text-foreground">
                    Follow Us
                  </h3>
                  <p className="text-body-sm text-muted-foreground">
                    Stay up to date with drops and events.
                  </p>
                </div>
                <SocialLinks />
              </div>
            </div>
            <MapEmbed className="min-h-72 lg:min-h-full" />
          </div>
        </Container>
      </section>
    </>
  );
}
