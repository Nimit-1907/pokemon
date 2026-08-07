import { Navigation, Phone } from "lucide-react";
import { StoreStatus } from "@/components/shared/StoreStatus";
import { site } from "@/lib/site";
import { telHref, mapsHref } from "@/lib/contact";

/*
  Sticky bottom bar, phones only.

  Someone opening a local shop's site on a phone almost always wants one of
  three things: is it open, where is it, what's the number. Those were three
  scrolls apart. Here they're permanently one tap away, which is the single
  biggest usability change on the site.

  Hidden from `md` up — on a desktop the header and footer already carry all
  of this without costing any screen height.
*/
export function StoreActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-base/95 backdrop-blur-xl md:hidden">
      {/* Status strip */}
      <div className="flex justify-center border-b border-border/60 py-1.5">
        <StoreStatus variant="bare" />
      </div>

      {/*
        The safe-area inset keeps both buttons clear of the iOS home indicator;
        without it the bottom ~20px of the bar is unreachable.
      */}
      <div className="grid grid-cols-2 gap-px bg-border pb-[env(safe-area-inset-bottom)]">
        <a
          href={telHref(site.phone)}
          className="flex items-center justify-center gap-2 bg-base py-3 text-control font-semibold text-foreground transition-colors active:bg-surface-2"
        >
          <Phone className="size-4 text-brand" />
          Call
        </a>
        <a
          href={mapsHref(site.mapQuery)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-base py-3 text-control font-semibold text-foreground transition-colors active:bg-surface-2"
        >
          <Navigation className="size-4 text-brand" />
          Directions
        </a>
      </div>
    </div>
  );
}
