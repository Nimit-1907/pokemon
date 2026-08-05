import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { Container } from "@/components/layout/Container";
import { collections } from "@/lib/data";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-[#080808]">
      <Container className="py-10 sm:py-14">
        <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <BrandLogo />
            <p className="max-w-xs text-body-sm text-muted-foreground">
              {site.description}
            </p>
            <SocialLinks />
          </div>

          {/* Explore */}
          <FooterCol title="Explore">
            {nav.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
            <FooterLink href="/contact">Contact</FooterLink>
          </FooterCol>

          {/* Collections */}
          <FooterCol title="Collections">
            {collections.map((c) => (
              <FooterLink key={c.slug} href={`/collections/${c.slug}`}>
                {c.name}
              </FooterLink>
            ))}
          </FooterCol>

          {/* Visit */}
          <FooterCol title="Visit Us">
            <li className="flex items-start gap-2.5 text-body-sm text-muted-foreground">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand" />
              <span>
                {site.address.line}
                <br />
                {site.address.city}
              </span>
            </li>
            <li className="flex items-center gap-2.5 text-body-sm text-muted-foreground">
              <Phone className="size-4 shrink-0 text-brand" />
              <a
                href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                className="py-1 transition-colors hover:text-brand"
              >
                {site.phone}
              </a>
            </li>
            <li className="flex items-start gap-2.5 text-body-sm text-muted-foreground">
              <Clock className="mt-0.5 size-4 shrink-0 text-brand" />
              <span>
                {site.hours.map((h) => (
                  <span key={h.days} className="block">
                    {h.days}: {h.time}
                  </span>
                ))}
              </span>
            </li>
          </FooterCol>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-caption text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Windsor, Ontario · Trading cards &amp; gaming since day one.</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-4 text-body-sm font-semibold uppercase tracking-wider text-foreground">
        {title}
      </h3>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="inline-block py-1 text-body-sm text-muted-foreground transition-colors hover:text-brand"
      >
        {children}
      </Link>
    </li>
  );
}

