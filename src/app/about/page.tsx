import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, ShoppingBag, Users } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StoreInfoCards } from "@/components/shared/StoreInfoCards";
import { MapEmbed } from "@/components/shared/MapEmbed";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { Reveal } from "@/components/motion/Reveal";
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
    title: "Five card games",
    desc: "Pokémon, One Piece, Magic, Lorcana and sports cards.",
  },
  {
    icon: CalendarDays,
    title: "Events most weeks",
    desc: "Sanctioned tournaments, league nights and prereleases.",
  },
  {
    icon: Users,
    title: "Tables to play on",
    desc: "Play space in store, open to anyone who drops by.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Intro */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(55% 60% at 15% 0%, rgba(62,221,107,0.1), transparent 60%)",
          }}
        />
        <Container className="grid items-center gap-stack py-section lg:grid-cols-2">
          <div>
            <h1 className="font-display text-h1 font-bold uppercase text-foreground">
              About Emerald{" "}
              <span className="text-brass">Cards &amp; Games</span>
            </h1>
            <p className="mt-5 max-w-lg text-lead text-muted-foreground">
              A local game store on Talbot Road, just off the 401. We stock five
              card games, run events most weeks, and keep tables open for anyone
              who wants to sit down and play.
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
              <Link href="/contact">Get in touch</Link>
            </Button>
          </div>

          <div className="panel relative aspect-[4/3] overflow-hidden rounded-2xl border">
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
                  "linear-gradient(to top, rgba(6,16,11,0.55), transparent 55%)",
              }}
            />
          </div>
        </Container>
      </section>

      {/* Store info + map */}
      <section className="band py-section">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="1555 Talbot Rd, Windsor"
              title="Visit the store"
            />
          </Reveal>
          <Reveal className="grid gap-tile lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              <StoreInfoCards />
              <div className="panel flex flex-wrap items-center justify-between gap-4 rounded-xl p-5">
                <div>
                  <h3 className="text-h3 font-semibold text-foreground">
                    Follow us
                  </h3>
                  <p className="text-body-sm text-muted-foreground">
                    Restock and event announcements go out here first.
                  </p>
                </div>
                <SocialLinks />
              </div>
            </div>
            <MapEmbed className="min-h-72 lg:min-h-full" />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
