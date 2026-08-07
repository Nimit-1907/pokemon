import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StoreActionBar } from "@/components/layout/StoreActionBar";
import { Ambient } from "@/components/layout/Ambient";
import { site } from "@/lib/site";

/*
  Display face. Archivo is a variable font with a `wdth` axis, which is the
  reason it's here: headlines are set wide (see `.font-display` in globals.css)
  for a broad, packaging-like presence, while the same file still renders at
  normal width elsewhere. `axes` is what ships that axis — next/font requests
  weight only by default, to keep the file small.
*/
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

/* Running copy and UI. Wide apertures, so it holds up at 13–15px. */
const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

/*
  Data face — prices, times, dates, counts. A price guide is monospaced, and
  the tabular figures mean a column of prices lines up on the decimal.
*/
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — Your Ultimate Card Destination`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
};

export const viewport: Viewport = {
  themeColor: "#06100b",
  colorScheme: "dark",
  // Let the ink background run under notches and the home indicator.
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    /*
      `en-CA` rather than `en`: it's the correct tag for the audience, and it
      lets the browser pick Canadian conventions for anything it localises
      itself (spellchecking the contact form, date pickers).
    */
    <html
      lang="en-CA"
      className={`${archivo.variable} ${instrumentSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      {/*
        The bottom padding clears the fixed mobile action bar, which would
        otherwise sit on top of the last few lines of the footer. It's removed
        at `md`, where the bar isn't rendered.
      */}
      <body className="flex min-h-full flex-col pb-[calc(6.25rem+env(safe-area-inset-bottom))] md:pb-0">
        <Ambient />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <StoreActionBar />
      </body>
    </html>
  );
}
