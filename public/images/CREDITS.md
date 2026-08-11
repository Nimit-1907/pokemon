# Image credits

Everything in `public/images` is **placeholder artwork**. It stands in until
the shop has its own product photography. Three different obligations apply,
and they are not the same thing.

## Publisher card art — not licensed, replace before launch

Most of the imagery is card art belonging to The Pokémon Company, Wizards of
the Coast, Bandai and Ravensburger: every product tile except the sports ones.

No licence has been granted for any of it. It is fine while this is a demo. For
the live shop, use distributor-supplied product shots or your own photographs
of stock.

This includes the four accessory tiles — sleeves, playmat, binder. They show
art from their own game rather than a photograph of the accessory, because the
free photography of card supplies is uniformly poor and looked like a mistake
beside the card art on every other tile. The product name carries the meaning;
the tile is decorative.

## Collection key art — supplied, provenance unverified

`collections/<slug>.png` is one 3:4 illustration per collection, supplied by
hand rather than generated or fetched. Four are AI-generated images; the Disney
Lorcana one is an existing Frozen illustration and carries a "©Disney" mark in
its lower corner.

None of it is cleared for commercial use, and it depicts characters owned by
the same publishers named above — an AI-generated Pikachu is still a Pikachu.
Treat it exactly like the card art: fine for a demo, replace before launch.

## Sports photographs — attribution is required

The seven sports tiles (`products/sp-*.webp`) come from
[Openverse](https://openverse.org), filtered to commercially-licensed results
— mostly Wikimedia, mostly CC BY or CC BY-SA.

Those licences require visible credit wherever the images are published. They
are not currently credited on the site, which is fine for a repository but
**not** once it is public: surface the credit on the page, or replace the
photographs, before launch. Re-run `node scripts/fetch-product-art.mjs` and
check each result's licence on its source page to build the list.

Two cautions learned the hard way, both recorded in the script:

- Openverse is an unvetted index. A `"trading card album"` query returned a
  1936 Wehrmacht cigarette-card album. Look at what comes back.
- A CC licence covers copyright, not likeness. Several candidates were photos
  of identifiable children and were rejected on those grounds.
