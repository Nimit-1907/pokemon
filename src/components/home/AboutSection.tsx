import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { asset } from "@/lib/asset";
import { site } from "@/lib/site";

const STORE_IMAGE = asset("/images/store-home.webp");

export function AboutSection() {
  return (
    <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
      {/* Decorative emerald gem, far right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-1/2 hidden size-72 -translate-y-1/2 rotate-12 opacity-20 blur-[1px] lg:block"
        style={{
          clipPath: "polygon(35% 5%, 65% 5%, 92% 40%, 50% 96%, 8% 40%)",
          background:
            "linear-gradient(150deg, rgba(85,231,27,0.5), rgba(58,165,19,0.15))",
        }}
      />

      <Container className="relative">
        <Reveal>
          <SectionHeading title="About Us" />
        </Reveal>

        <Reveal
          delay={0.05}
          className="grid items-stretch gap-4 sm:gap-6 lg:grid-cols-[1.1fr_1fr_1fr]"
        >
          {/* Store image */}
          <div className="glow-ring relative min-h-44 overflow-hidden rounded-xl border sm:min-h-56">
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
                  "linear-gradient(to top, rgba(5,5,5,0.6), transparent 60%)",
              }}
            />
          </div>

          {/* Story */}
          <div className="flex flex-col justify-center">
            <p className="text-body text-muted-foreground">
              Emerald Cards &amp; Games is Windsor&apos;s go-to destination for
              trading cards and gaming. We offer a wide selection of products,
              host exciting events, and build a strong community for collectors
              and players alike.
            </p>
            <Button
              asChild
              className="mt-5 w-full font-semibold sm:mt-6 sm:w-fit"
            >
              <Link href="/about">
                Learn More About Us
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          {/* Contact + socials */}
          <div className="glow-card flex flex-col justify-center gap-4 rounded-xl p-5 sm:p-6">
            {/* Address and phone are tap-to-act on a phone. */}
            <ContactRow icon={<MapPin className="size-4" />}>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(site.mapQuery)}`}
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
                href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                className="transition-colors hover:text-brand"
              >
                {site.phone}
              </a>
            </ContactRow>
            <ContactRow icon={<Clock className="size-4" />}>
              {site.hours.map((h) => (
                <span key={h.days} className="block">
                  {h.days}: {h.time}
                </span>
              ))}
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
      <span>{children}</span>
    </div>
  );
}

