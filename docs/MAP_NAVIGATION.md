# Clickable map and traced routes

Both implemented acts use `src/location-map.ts` and `src/map-routes.ts`. All reachable rooms have keyboard/touch/clickable numbered markers and a matching named list. Locks follow act progression. Markers move apart on smaller displays, with leader lines to their actual entrances. Routes follow a shared pedestrian network and reverse exactly.

## Artwork

Saved asset: `public/assets/story-map-walkways.png`. Original map retained as `public/assets/story-map.png`. Generated using the **built-in imagegen tool** with the imagegen skill. The small cliff walkway supplies the missing visible connection to the maintenance inlet. All live map views and chapter caches use this updated asset.

Source: `exec-71fb550d-f6ec-46f2-b579-655492d58c24.png`.

Final prompt:

Use case: precise-object-edit. Input image 1 is the edit target: existing 1536x1024 painted pixel-art pirate game map. Input image 2 is ONLY a route-position guide, NOT artwork to copy. Change ONLY the cliff between Rook's House and the left end of Maintenance Inlet. Add a narrow ochre stone footpath/stairway with subtle timber handrail, visibly connecting Rook's courtyard at pixel (215,175), along (253,181),(290,175),(315,164),(333,146),(357,134),(389,133),(421,143),(450,158),(477,177),(495,194), to the inlet's left maintenance platform (520,205). This follows the upper yellow guide line in image 2. Make a credible path carved into the cliff, supported by a small wooden gallery where necessary. Integrate into original warm pixel-painted stone/wood style. Do NOT draw any red/yellow overlay lines or UI markers. Preserve every other part of original image 1 as exactly as possible: identical 1536x1024 canvas, no crop or camera movement, same room locations, ALL lettering unchanged, same title, boats, sea, islands, bridge and existing streets. Do not add any other paths or change any other region.
