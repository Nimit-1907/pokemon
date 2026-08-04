import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { Container } from "@/components/layout/Container";
import { collections } from "@/lib/data";
import { nav, site } from "@/lib/site";

// Brand glyphs (lucide 1.x dropped brand logos) — small inline SVGs.
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M14 9h2.5V6H14c-2 0-3.5 1.5-3.5 3.5V11H8v3h2.5v7h3v-7H16l.5-3h-3V9.8c0-.5.4-.8 1-.8Z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M16.5 3c.3 2.1 1.5 3.5 3.5 3.7v2.4c-1.3.1-2.5-.3-3.6-1v5.9c0 3-2.1 5-5 5-2.8 0-5-2.1-5-4.9 0-2.9 2.4-5 5.4-4.7v2.5c-.4-.1-.9-.2-1.3-.1-1.2.1-2.1 1.1-2 2.4.1 1.2 1.1 2.1 2.3 2 1.2 0 2.1-1 2.1-2.3V3h3.1Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-[#080808]">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <BrandLogo />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {site.description}
            </p>
            <div className="flex items-center gap-2">
              <SocialLink href={site.socials.instagram} label="Instagram">
                <InstagramIcon className="size-4" />
              </SocialLink>
              <SocialLink href={site.socials.facebook} label="Facebook">
                <FacebookIcon className="size-4" />
              </SocialLink>
              <SocialLink href={site.socials.tiktok} label="TikTok">
                <TikTokIcon className="size-4" />
              </SocialLink>
            </div>
          </div>

          {/* Explore */}
          <FooterCol title="Explore">
            {nav.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
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
            <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand" />
              <span>
                {site.address.line}
                <br />
                {site.address.city}
              </span>
            </li>
            <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
              <Phone className="size-4 shrink-0 text-brand" />
              {site.phone}
            </li>
            <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
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

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
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
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
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
        className="text-sm text-muted-foreground transition-colors hover:text-brand"
      >
        {children}
      </Link>
    </li>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-all hover:border-brand/60 hover:text-brand hover:shadow-[0_0_18px_-6px_rgba(85,231,27,0.6)]"
    >
      {children}
    </a>
  );
}
