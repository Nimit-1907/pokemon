import { Clock, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";

/** The three store-info cards: location, phone, hours. */
export function StoreInfoCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <InfoCard icon={<MapPin className="size-5" />} title="Our Location">
        {site.address.line}
        <br />
        {site.address.city}
      </InfoCard>
      <InfoCard icon={<Phone className="size-5" />} title="Call Us">
        <a href={`tel:${site.phone}`} className="hover:text-brand">
          {site.phone}
        </a>
      </InfoCard>
      <InfoCard icon={<Clock className="size-5" />} title="Store Hours">
        {site.hours.map((h) => (
          <span key={h.days} className="block">
            {h.days}: {h.time}
          </span>
        ))}
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
    <div className="glow-card rounded-xl p-5">
      <span className="grid size-10 place-items-center rounded-lg bg-brand/10 text-brand">
        {icon}
      </span>
      <h3 className="mt-4 font-semibold text-foreground">{title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
        {children}
      </p>
    </div>
  );
}
