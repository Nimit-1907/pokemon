import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MapEmbed } from "@/components/shared/MapEmbed";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { ContactForm } from "@/components/contact/ContactForm";
import { HoursList } from "@/components/shared/HoursList";
import { StoreStatus } from "@/components/shared/StoreStatus";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/lib/site";
import { mailHref, mapsHref, telHref } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${site.name} in Windsor, Ontario.`,
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 70% at 50% 0%, rgba(62,221,107,0.12), transparent 65%)",
          }}
        />
        <Container className="py-section text-center">
          <h1 className="font-display text-h1 font-bold uppercase text-foreground">
            Get in <span className="text-brass">Touch</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lead text-muted-foreground">
            Questions about a product, an event, or a special order? Drop by the
            shop or send us a message — we&apos;re happy to help.
          </p>
        </Container>
      </section>

      <section className="band py-section">
        <Container>
          <div className="grid gap-stack lg:grid-cols-[1fr_1.2fr]">
            {/* Info */}
            <Reveal className="flex flex-col gap-6">
              <SectionHeading title="Store information" />

              <StoreStatus />

              <ul className="space-y-5">
                <InfoRow icon={<MapPin className="size-5" />} label="Address">
                  <a
                    href={mapsHref(site.mapQuery)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-brand"
                  >
                    {site.address.line}
                    <br />
                    {site.address.city} {site.address.postalCode}
                  </a>
                </InfoRow>
                <InfoRow icon={<Phone className="size-5" />} label="Phone">
                  <a
                    href={telHref(site.phone)}
                    className="font-data transition-colors hover:text-brand"
                  >
                    {site.phone}
                  </a>
                </InfoRow>
                <InfoRow icon={<Mail className="size-5" />} label="Email">
                  <a
                    href={mailHref(site.email)}
                    className="transition-colors hover:text-brand"
                  >
                    {site.email}
                  </a>
                </InfoRow>
                <InfoRow icon={<Clock className="size-5" />} label="Hours">
                  <HoursList />
                </InfoRow>
              </ul>

              <div>
                <h3 className="mb-3 text-eyebrow font-semibold uppercase text-brass">
                  Follow us
                </h3>
                <SocialLinks />
              </div>

              <MapEmbed className="mt-2 min-h-64" />
            </Reveal>

            {/* Form */}
            <Reveal delay={0.08}>
              <SectionHeading title="Send a message" />
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-4">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand ring-1 ring-brand/20">
        {icon}
      </span>
      <div>
        <p className="text-eyebrow font-semibold uppercase text-muted-foreground">
          {label}
        </p>
        {/*
          A `div`, not a `p`. The hours row renders a `<ul>` in here, and a list
          inside a paragraph is invalid nesting — the browser silently closed
          the `<p>` early, which made the client DOM disagree with the server's
          and threw a hydration error on this page.
        */}
        <div className="mt-0.5 text-body text-foreground">{children}</div>
      </div>
    </li>
  );
}
