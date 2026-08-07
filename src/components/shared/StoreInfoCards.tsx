import { Clock, MapPin, Phone } from "lucide-react";
import { HoursList } from "@/components/shared/HoursList";
import { StoreStatus } from "@/components/shared/StoreStatus";
import { site } from "@/lib/site";
import { mapsHref, telHref } from "@/lib/contact";

/** The three store-info cards: location, phone, hours. */
export function StoreInfoCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <InfoCard icon={<MapPin className="size-5" />} title="Find us">
        {/* Tapping an address should start navigation, not select text. */}
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
      </InfoCard>
      <InfoCard icon={<Phone className="size-5" />} title="Call us">
        <a
          href={telHref(site.phone)}
          className="font-data transition-colors hover:text-brand"
        >
          {site.phone}
        </a>
      </InfoCard>
      <InfoCard icon={<Clock className="size-5" />} title="Store hours">
        {/*
          The live status carries "what's happening right now", which frees the
          list below from needing a "Today" chip — it doesn't fit in a column
          this narrow alongside a full time range.
        */}
        <StoreStatus variant="bare" className="mb-3" />
        <HoursList highlightToday={false} />
      </InfoCard>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="panel p-5">
      <span className="grid size-10 place-items-center rounded-lg bg-brass/10 text-brass ring-1 ring-brass/20">
        {icon}
      </span>
      <h3 className="mt-4 font-display text-h3 font-bold uppercase text-foreground">
        {title}
      </h3>
      {/* A `div`: the hours card puts a `<ul>` in here, which can't sit in a `<p>`. */}
      <div className="mt-2 text-body-sm text-muted-foreground">{children}</div>
    </div>
  );
}
