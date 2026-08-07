import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

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

const SOCIALS = [
  { href: site.socials.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: site.socials.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: site.socials.tiktok, label: "TikTok", Icon: TikTokIcon },
];

/** Row of social links with the shared emerald hover-glow treatment. */
export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {SOCIALS.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-all hover:border-brand/60 hover:text-brand hover:shadow-[0_0_18px_-6px_rgba(62,221,107,0.6)]"
        >
          <Icon className="size-4" />
        </a>
      ))}
    </div>
  );
}
