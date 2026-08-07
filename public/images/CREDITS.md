# Image credits

Everything in `public/images` is **placeholder artwork**. It stands in until
the shop has its own product photography. Two different obligations apply, and
they are not the same thing.

## Creative Commons files — attribution is required

These four accessory photos come from Wikimedia Commons under **CC BY-SA 4.0**.
That licence requires visible credit and share-alike terms wherever they are
published. They are currently credited only in this file, which is enough for
a repository but **not** for a live site — surface the credit on the page, or
replace the images, before launch.

| Tile | Product | File | Author |
| --- | --- | --- | --- |
| `products/pk-10.webp` | Premium Card Sleeves | [Sleeved playing card.jpg](https://commons.wikimedia.org/wiki/File:Sleeved_playing_card.jpg) | Lord Belbury |
| `products/op-7.webp` | Playmat — Grand Line | [Netrunner - Gateway starter decks.jpg](https://commons.wikimedia.org/wiki/File:Netrunner_-_Gateway_starter_decks.jpg) | Phelpysan |
| `products/mg-7.webp` | Dragon Shield Sleeves | [Magic the Gathering - Commander.jpg](https://commons.wikimedia.org/wiki/File:Magic_the_Gathering_-_Commander.jpg) | Tourtefouille |
| `products/dl-7.webp` | Card Portfolio Binder | [Magic the Gathering - Trade.jpg](https://commons.wikimedia.org/wiki/File:Magic_the_Gathering_-_Trade.jpg) | Tourtefouille |

The sports tiles (`products/sp-*.webp`) and the sports collection art come from
[Openverse](https://openverse.org) filtered to commercially-licensed results —
mostly Wikimedia, mostly CC BY or CC BY-SA. Re-run
`node scripts/fetch-product-art.mjs` and check each result's licence on its
source page if you intend to keep them.

Two cautions learned the hard way, both recorded in the script:

- Openverse is an unvetted index. A `"trading card album"` query returned a
  1936 Wehrmacht cigarette-card album. Look at what comes back.
- A CC licence covers copyright, not likeness. Photos of identifiable people —
  a child with a card binder, in one case — were rejected on those grounds, and
  the binder shot that did ship is cropped to the pages to keep bystanders out.

## Publisher card art — not licensed, replace before launch

Everything else is card art belonging to The Pokémon Company, Wizards of the
Coast, Bandai and Ravensburger: the product tiles, and the collection posters
and banners built by `scripts/build-collection-art.mjs`.

No licence has been granted for any of it. It is fine while this is a demo. For
the live shop, use distributor-supplied product shots or your own photographs
of stock.
