import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { Reveal } from "@/components/motion/Reveal";
import { HoursList } from "@/components/shared/HoursList";
import { Button } from "@/components/ui/button";
import { asset } from "@/lib/asset";
import { site } from "@/lib/site";
import { mapsHref, telHref } from "@/lib/contact";

const STORE_IMAGE = asset("/images/store-home.webp");

export function AboutSection() {
  return (
    <section className="band overflow-hidden py-section">
      {/* Decorative emerald gem, far right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-1/2 hidden size-72 -translate-y-1/2 rotate-12 opacity-20 blur-[1px] lg:block"
        style={{
          clipPath: "polygon(35% 5%, 65% 5%, 92% 40%, 50% 96%, 8% 40%)",
          background:
            "linear-gradient(150deg, rgba(62,221,107,0.5), rgba(27,158,75,0.15))",
        }}
      />

      <Container className="relative">
        <Reveal>
          <SectionHeading eyebrow="1555 Talbot Rd, Windsor" title="Visit the shop" />
        </Reveal>

        <Reveal
          delay={0.05}
          className="grid items-stretch gap-tile lg:grid-cols-[1.1fr_1fr_1fr]"
        >
          {/* Store image */}
          <div className="panel relative min-h-44 overflow-hidden rounded-xl border sm:min-h-56">
            <Image
              src={STORE_IMAGE}
              alt="Inside Emerald Cards & Games"
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(6,16,11,0.6), transparent 60%)",
              }}
            />
          </div>

          {/* Story */}
          <div className="flex flex-col justify-center">
            <p className="text-body text-muted-foreground">
              A local game store in Windsor, Ontario. We stock singles, sealed
              product and supplies across five card games, run tournaments and
              league nights most weeks, and keep a play space open for whoever
              wants to sit down and use it.
            </p>
            <Button
              asChild
              className="mt-5 w-full font-semibold sm:mt-6 sm:w-fit"
            >
              <Link href="/about">
                More about us
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          {/* Contact + socials */}
          <div className="panel flex flex-col justify-center gap-4 rounded-xl p-5 sm:p-6">
            {/* Address and phone are tap-to-act on a phone. */}
            <ContactRow icon={<MapPin className="size-4" />}>
              <a
                href={mapsHref(site.mapQuery)}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-brand"
              >
                {site.address.line}
                <br />
                {site.address.city}
              </a>
            </ContactRow>
            <ContactRow icon={<Phone className="size-4" />}>
              <a
                href={telHref(site.phone)}
                className="transition-colors hover:text-brand"
              >
                {site.phone}
              </a>
            </ContactRow>
            <ContactRow icon={<Clock className="size-4" />}>
              <HoursList />
            </ContactRow>

            <SocialLinks className="mt-1" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function ContactRow({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 text-body-sm text-muted-foreground">
      <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand">
        {icon}
      </span>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

