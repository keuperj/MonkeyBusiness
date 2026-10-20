# Act II — Respectable Nonsense

Playable entry: `act2.html`. Continue from the end of Act I, use **Continue Act II** on the start menu once unlocked, or choose a debug start. Act III is a title boundary with continued exploration, not a broken destination.

## Content

Six new illustrated rooms: Repair Quay, The Quay Quill, Rook Breakfast Hall, Rook Workshop, Blind Inlet and Fair Passage Survey Office. The tavern, crossing and outer landing return with Act II interactions. Pip, Rook and Vane have new character sprites; the existing cast retain their artwork and voices.

The playable chain covers witness comparison, the household circular wait, safe inlet inspection, recovering Second Opinion, service measurements, an annotated survey copy, explicit delivery to Vane, and comparison with the company's announcement. Pip is optional. Wrong answers do not consume essential items. Nell retains her original chart and a notebook facsimile after delivery.

Optional Easter eggs:

- **Zak McKracken homage:** use Nell's pencil on the newspaper front-page proof. “LIGHTHOUSE PREDICTS YESTERDAY” becomes an actionable plumbing complaint. Original dialogue; no borrowed character or artwork.
- **Maniac Mansion homage:** inspect the chair reservation cards after restoring breakfast. Try pocket lint on the celestial refuse sorter for a second household joke.

The editable narrative source remains [ACT_2_ROOM_PLAN.md](ACT_2_ROOM_PLAN.md). `node scripts/extract-act2.mjs` rebuilds `src/act2-dialogue.json`: 58 conversation topics and 22 scripted sequences. Conditional topics are selected by progression in `src/act2.ts`.

## Debug starts

Edit [`public/debug-start.json`](../public/debug-start.json). The start menu reads this file at runtime with caching disabled. Set `enabled` to `false` to hide and disable debug presets. Each preset defines:

```json
{
  "id": "act2-workshop",
  "label": "Rook’s Workshop",
  "act": 2,
  "room": "workshop",
  "flags": { "house": true }
}
```

`items` is an optional array of extra inventory item IDs. Act I flags come from `src/chapter-state.ts`; Act II flags/items come from `src/act2-state.ts`. Preconditions must remain consistent. The shipped `act2-handover` preset demonstrates a complete dependency chain and adds the drawing and copy. Room presets start the investigation fresh in that location; the workshop preset opens its household door. Essential inherited chart, hook, pencil and lint are supplied for direct Act II starts.

Selecting a debug preset replaces that act's autosave on entering the room. Manual saves and the other act's saves are retained. Presets can also be opened directly with `act2.html?debug=act2-inlet` or `?debug=act1-landing` on the main page.

Act II uses `monkey-buisness-act2-auto` and `monkey-buisness-act2-save`. Existing Act I notebook entries are carried into a fresh normal Act II start. `act2.html?new=1` starts a fresh Act II investigation.

## Artwork and audio

Artwork was generated using the **built-in image generation tool** and the imagegen skill. All final files are under [`public/assets/act2/`](../public/assets/act2/). The artwork specifications and source-image identifiers are in [ACT_2_ARTWORK.md](ACT_2_ARTWORK.md).

ElevenLabs generated 294 spoken lines and nine new effects: six room ambience loops, a mechanical latch, equalisation flow and an office stamp. Existing pickup, boat and returning-location sounds are reused. Nell uses Alice; Pip uses Charlie with brisk delivery; Rook uses Matilda with measured, crisp delivery; Vane uses Rachel with slower, composed delivery. Returning characters preserve their established voice IDs/settings.

- `src/act2-audio-manifest.json`: runtime speech/effect mapping.
- `public/audio/act2-provenance.json`: exact text, voice IDs, settings, sound prompts and filenames.
- `node scripts/generate-act2-audio.mjs --plan`: count the current audio plan.
- `node scripts/generate-act2-audio.mjs`: generate missing clips; existing content-hashed files are reused.

Enable the sound icon to hear dialogue. Subtitles and conversation text remain usable while muted. Leaving a room or opening the map/notebook stops queued speech. No API secrets or runtime generation requests are sent to the browser. `.env` stays excluded from Git.

## Chapter downloads

`node scripts/chapter-assets.mjs` runs before development/build. It writes separate `chapter-assets.json` and `act2-assets.json` inventories with SHA-256 revisions. Act I does not prefetch Act II. Act II downloads its new art/audio and required shared assets behind an illustrated, animated progress screen. Verified cached files are reused. Regenerate the inventories after changing an asset while a development server is already running.

## Verification

`CHROMIUM_PATH=/snap/bin/chromium npm test` includes a complete Act II playthrough without Pip, explicit delivery cancellation, save/resume, preset validation, the newspaper Easter egg, media manifest coverage, browser audio decoding and speech cancellation on travel. `npm run build` checks TypeScript and builds all four entry pages.

## Recap and scene scale

Fresh Act II arrivals at the Repair Quay begin with Nell’s six-line voiced recap of Act I and her three investigation leads. The recap is recorded once in `seen` as `A2-INTRO`. Progressed saves and debug starts in later rooms bypass it. Choose **Replay Act II introduction** in the notebook to hear it again. **Let’s follow those leads**, travelling, or opening the notebook/map stops narration; enabling sound starts the currently displayed dialogue. The script is editable at the end of `ACT_2_ROOM_PLAN.md`; extract it and rerun the Act II audio generator after edits.

Both acts use `src/location-map.ts` for notebook maps, marking the current room at the same coordinates used for travel with a high-contrast pin and a named location label. Nell’s standing sprite is 173 × 355 scene pixels (up from 139 × 285), preserving her proportions and foot position across the chapter scenes and tavern test room.

## Collectible visibility

`src/act2-collectibles.ts` drives collectible sprites, scene hotspots and keyboard targets. Rope disappears at pickup and stays absent after being tied at the inlet. Tracing paper disappears once collected from either source and stays absent after becoming the working copy or being delivered. The service drawing and crank disappear from the workshop when awarded through either dialogue or scene interaction. The used crank appears at the inlet mechanism. These rules derive from existing inventory and progression flags, so older saves need no migration.

The quay, newspaper and workshop backgrounds were edited with built-in image generation to remove baked-in collectibles. Original atlas sprites are now rendered conditionally over the cleared surfaces. Exact prompts and paths: [COLLECTIBLE_ART_EDITS.md](COLLECTIBLE_ART_EDITS.md).

Audit: Act I tankard, boathook and chest survey already used conditional sprites; collected tankard hit areas now also disappear. The isolated tavern test room disables collected-item hit areas and hides their hotspot labels. The chest key remains in the lock intentionally; the current indicator, recovered boat and fitted crank remain in their new world positions rather than being pocketed. Pencil/lint are starting inventory; the annotated copy and receipt are created/received documents, not loose background pickups.

## Clickable map and walking routes

Both acts now render all currently accessible rooms as numbered map buttons, with matching named buttons below the illustration. Markers support mouse, touch and keyboard activation. Nearby entrances are separated automatically at the current display size; dotted leader lines retain their true positions. The current room remains red. Act I hides the outer landing until passage is won; Act II hides the workshop until breakfast is repaired.

`src/map-routes.ts` is the shared coordinate and pedestrian-route source for both acts. It traces the tavern lane, Quibble’s bridge, dock boards, the road past Pip’s newspaper, the winding uphill lane, the maintenance access above the inlet, and the company-office quay. Routes traverse this network and reverse exactly; they do not interpolate arbitrary bends between room centres. The inlet pin marks its land-side access, and the workshop has a separate entrance beside Rook’s hall. Future rooms need an entrance and a traced connection in this network as well as their act’s reachability rule.
