# Clickable map and traced routes

All three playable acts use the illustrated map component in `/home/keuper/Projekte/MonkeyBusiness/src/location-map.ts`. Reachable rooms have keyboard/touch/clickable markers and a matching named list. Locks follow act progression. Markers move apart on smaller displays, with leader lines to their actual entrances. Harbour routes follow the shared pedestrian network in `/home/keuper/Projekte/MonkeyBusiness/src/map-routes.ts` and reverse exactly.

Act III uses the same harbour artwork and animated travel as the earlier acts, rather than a replacement room-button list. On Bellweather it uses the illustrated dry inspection-route chart at `/home/keuper/Projekte/MonkeyBusiness/public/assets/act3/inspection-map.svg`, with routes through the gallery defined in `/home/keuper/Projekte/MonkeyBusiness/src/act3-map.ts`. The chart is a schematic, not a claim that the original harbour painting depicts each interior room. Sea crossings still require Orin's voyage confirmation; walking maps never connect across the sea.

Clicking a destination shows Nell's moving location marker and the progressively drawn route, then enters the destination automatically. Continue skips the animation. Reduced motion shows the completed route and waits for Continue. Cancelling the travel dialog commits the same arrival exactly once.

## Playbook captures

The Act II and III opt-in capture tests click actual map markers. Travel illustrations capture just the map, with the target circled and named; button widgets and the destination list are omitted from these screenshots only. `/home/keuper/Projekte/MonkeyBusiness/tests/playbook-map.ts` restores all interactive controls immediately after capture. Gameplay retains keyboard-accessible controls; documentation styling never changes the live map.

## Artwork

Saved asset: `public/assets/story-map-walkways.png`. Original map retained as `public/assets/story-map.png`. Generated using the **built-in imagegen tool** with the imagegen skill. The small cliff walkway supplies the missing visible connection to the maintenance inlet. All live map views and chapter caches use this updated asset.

Source: `exec-71fb550d-f6ec-46f2-b579-655492d58c24.png`.

Final prompt:

Use case: precise-object-edit. Input image 1 is the edit target: existing 1536x1024 painted pixel-art pirate game map. Input image 2 is ONLY a route-position guide, NOT artwork to copy. Change ONLY the cliff between Rook's House and the left end of Maintenance Inlet. Add a narrow ochre stone footpath/stairway with subtle timber handrail, visibly connecting Rook's courtyard at pixel (215,175), along (253,181),(290,175),(315,164),(333,146),(357,134),(389,133),(421,143),(450,158),(477,177),(495,194), to the inlet's left maintenance platform (520,205). This follows the upper yellow guide line in image 2. Make a credible path carved into the cliff, supported by a small wooden gallery where necessary. Integrate into original warm pixel-painted stone/wood style. Do NOT draw any red/yellow overlay lines or UI markers. Preserve every other part of original image 1 as exactly as possible: identical 1536x1024 canvas, no crop or camera movement, same room locations, ALL lettering unchanged, same title, boats, sea, islands, bridge and existing streets. Do not add any other paths or change any other region.
