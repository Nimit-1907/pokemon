import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { HoursList } from "@/components/shared/HoursList";
import { StoreStatus } from "@/components/shared/StoreStatus";
import { Container } from "@/components/layout/Container";
import { collections } from "@/lib/data";
import { nav, site } from "@/lib/site";
import { mapsHref, telHref } from "@/lib/contact";
import { showPrices } from "@/lib/flags";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface-1">
      {/*
        The two-column grid below and its internal rhythm are tuned by hand;
        only the outer band moves onto the fluid scale, so the footer keeps
        growing past 640px instead of freezing at 56px.
      */}
      <Container className="py-section-tight">
        {/*
          Two columns from the smallest screen. The link lists are short and
          narrow, so stacking all four blocks made the footer taller than the
          viewport on a phone for no gain. Brand and Visit still span the full
          width — they carry wrapping text and the hours table.
        */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-y-10 lg:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 space-y-3 sm:space-y-4 lg:col-span-1">
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
          <div className="col-span-2 lg:col-span-1">
            <h3 className="mb-3 text-eyebrow font-semibold uppercase text-brass sm:mb-4">
              Visit us
            </h3>

            {/*
              Phones already have the live status pinned in the sticky action
              bar, so repeating it here only costs height.
            */}
            <StoreStatus variant="bare" className="mb-4 hidden md:inline-flex" />

            <ul className="space-y-2.5">
              <li className="flex items-start gap-2.5 text-body-sm text-muted-foreground">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brass" />
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
              </li>
              <li className="flex items-center gap-2.5 text-body-sm text-muted-foreground">
                <Phone className="size-4 shrink-0 text-brass" />
                <a
                  href={telHref(site.phone)}
                  className="font-data inline-block py-1 transition-colors hover:text-brand"
                >
                  {site.phone}
                </a>
              </li>
            </ul>

            {/*
              No "Today" chip down here — the column is too narrow to fit it
              alongside a time range without wrapping every row, and the live
              status (footer on desktop, sticky bar on phones) already says
              where the store is right now.
            */}
            <HoursList
              className="mt-3 border-t border-border pt-3 sm:mt-4 sm:pt-4"
              highlightToday={false}
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-1.5 border-t border-border pt-5 text-center text-caption text-muted-foreground sm:mt-12 sm:gap-3 sm:flex-row sm:pt-6 sm:text-left">
          {/*
            No `new Date()` here. On a static export it would freeze to the
            build date and quietly go stale — a hardcoded start year with no
            end is both honest and maintenance-free.
          */}
          <p>© Emerald Cards &amp; Games. All rights reserved.</p>
          <p>
            {/*
              States the currency once, for every price on the site. Suppressed
              with the prices themselves — otherwise it refers to nothing.
            */}
            {showPrices
              ? `Prices in Canadian dollars · ${site.taxName} added at the till`
              : "Windsor, Ontario · Trading cards & gaming"}
          </p>
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
      <h3 className="mb-2 text-eyebrow font-semibold uppercase text-brass sm:mb-4">
        {title}
      </h3>
      {/*
        The list items carry their own vertical padding for the tap target, so
        on a phone the extra gap between them is redundant height.
      */}
      <ul className="space-y-0.5 sm:space-y-2.5">{children}</ul>
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
