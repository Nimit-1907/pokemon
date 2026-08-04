import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MapEmbed } from "@/components/shared/MapEmbed";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { ContactForm } from "@/components/contact/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${site.name} in Windsor, Ontario.`,
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 70% at 50% 0%, rgba(85,231,27,0.12), transparent 65%)",
          }}
        />
        <Container className="py-14 text-center sm:py-20">
          <h1 className="font-display text-4xl font-bold uppercase tracking-tight text-foreground sm:text-5xl">
            Get in <span className="text-glow">Touch</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Questions about a product, an event, or a special order? Drop by the
            shop or send us a message — we&apos;re happy to help.
          </p>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
            {/* Info */}
            <div className="flex flex-col gap-6">
              <SectionHeading title="Store Information" />
              <ul className="space-y-5">
                <InfoRow icon={<MapPin className="size-5" />} label="Address">
                  {site.address.line}
                  <br />
                  {site.address.city}
                </InfoRow>
                <InfoRow icon={<Phone className="size-5" />} label="Phone">
                  <a href={`tel:${site.phone}`} className="hover:text-brand">
                    {site.phone}
                  </a>
                </InfoRow>
                <InfoRow icon={<Mail className="size-5" />} label="Email">
                  <a href={`mailto:${site.email}`} className="hover:text-brand">
                    {site.email}
                  </a>
                </InfoRow>
                <InfoRow icon={<Clock className="size-5" />} label="Hours">
                  {site.hours.map((h) => (
                    <span key={h.days} className="block">
                      {h.days}: {h.time}
                    </span>
                  ))}
                </InfoRow>
              </ul>

              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Follow Us
                </h3>
                <SocialLinks />
              </div>

              <MapEmbed className="mt-2 min-h-64" />
            </div>

            {/* Form */}
            <div>
              <SectionHeading title="Send a Message" />
              <ContactForm />
            </div>
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
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <p className="mt-0.5 text-foreground">{children}</p>
      </div>
    </li>
  );
}
