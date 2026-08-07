import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Keyless Google Maps embed centered on the store address. */
export function MapEmbed({ className }: { className?: string }) {
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(
    site.mapQuery,
  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div
      className={cn(
        "panel relative overflow-hidden rounded-2xl border",
        className,
      )}
    >
      <iframe
        title={`Map to ${site.name}`}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full min-h-64 w-full"
      />
    </div>
  );
}
