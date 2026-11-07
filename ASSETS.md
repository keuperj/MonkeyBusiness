# Generated artwork

## Illustrated room headers — 20 October 2026

Generated with the built-in image-generation tool. `public/assets/game-logo.png` is the shared game wordmark; `public/assets/room-emblems.png` contains the tavern, bridge and landing emblems. Both are 1536 × 1024 RGBA assets. The runtime clips atlas frames for room headings and miniature-map destinations. Sound glyphs are inline SVG; act lettering is live styled text so future acts can change without regenerating artwork.

### Game logo prompt

Create an original illustrated logo for the pirate comedy adventure game "Monkey Buisness". Exact lettering MONKEY BUISNESS, intentionally spelled B-U-I-S-N-E-S-S. Wide compact horizontal logo, 1536x1024 transparent canvas, artwork centered with generous clear margins. Bold large gold hand-carved pirate serif lettering in two tight lines, MONKEY above BUISNESS, readable at small sizes. A small mischievous monkey silhouette curls around a brass compass to the left, weathered teal wooden plaque behind lettering, subtle rope and parchment details. Warm gold, teal, ink navy. Lavish hand-painted early 1990s adventure box illustration, clean silhouette, no extra text, no background scene, no existing franchise insignia. Actual transparent background outside the emblem. Logo fills central 90 percent width and 70 percent height.

### Room emblems prompt

Original pirate adventure UI room-emblem atlas, 1536x1024 canvas, THREE equal 512-pixel-wide columns. Exactly one ornate compact illustrated sign per column, entirely within column, no overlapping, each centered vertically. Hand-painted classic adventure game style, warm gold parchment, carved dark teal wood, brass and rope, strong distinct silhouettes. LEFT emblem: cozy crooked tavern and a brass compass, parchment lettering exactly "The Crooked Compass". MIDDLE emblem: small wooden footbridge, crossed fencing swords and cheeky emerald parrot, parchment lettering exactly "Quibble’s Crossing". RIGHT emblem: small dock, lighthouse and brass sighting instrument, parchment lettering exactly "Outer Landing". All three names clearly readable at medium size. Art occupies x20..490, x532..1002, x1044..1514, y230..790. No other lettering. Same scale and consistent craft. Actual transparent background throughout empty canvas, no scenery behind signs, no shadows or glow outside signs. Original designs, no franchise logos.

## Title sequence additions

Generated with the built-in image-generation tool on 2026-10-19. Both images are 1536 × 1024. The splash uses original characters and a new composition in the painted adventure-box tradition; title lettering and decorative UI are HTML/CSS. The prologue uses animated camera moves and light effects over the workshop, existing map and tavern art.

### `public/assets/splash-cover.png`

Prompt:

Use case: illustration-story. Asset type: landscape 1536x1024 painted cover art for an original comedic pirate adventure game splash screen. Evoke the lavish hand-painted early-1990s adventure-game box art tradition: dramatic moonlight, rich brushwork, deep ultramarine and emerald, warm gold, romantic maritime mystery and playful character expressions. Completely original composition and characters. Center foreground: Nell, a young aspiring chartmaker with short dark curly hair, teal waistcoat, cream shirt, rust trousers, holding an unfurled nautical survey and a pencil like a heroic instrument; curious, wry, determined. A dramatic curling sea and crooked lantern-lit harbor surround her. In supporting vignettes at lower sides: a stocky tavern keeper in burgundy headscarf and apron; a pompous elderly pirate with silver moustache, plum coat and burgundy bandana accompanied by an emerald and coral parrot. Distant lighthouse and a small ship against moonlit cliffs. Brass compass and rolled parchment frame the lower foreground. Top quarter is dark atmospheric sky with generous calm negative space for a title overlaid in the game. Wide theatrical composition with main face below title area, full bleed, beautifully polished illustration. No text, no lettering, no logos, no skull-shaped island, no existing franchise characters, no copied cover composition. More painted illustrated box art than pixel sprites.

### `public/assets/intro-workshop.png`

Prompt:

Use case: illustration-story. Original widescreen 1536x1024 early-1990s pixel-art adventure game cinematic background for Nell's backstory. Warm coastal repair workshop open to the sea at late afternoon, rich amber inside and indigo teal harbor outside, crisp visible painterly pixel clusters. Young adult woman Nell with short dark curly hair, teal waistcoat over cream shirt and rust trousers sits at a wooden workbench right of center, teaching herself chartmaking: sketching a shoreline map in a notebook with pencil, focused wry expression. Coils of rope, patched sail, disassembled brass pump and modest tools convey her family of coastal repairers. Left side wide open timber doorway frames coastline, small delivery sailboat and distant fishing village. Warm shaft of low sun, dust motes, quiet sense of ambition and humble origins. Scene is original and composition is open and cinematic, no text, no logos, no copied franchise characters. Leave lower quarter reasonably dark and uncluttered for subtitle overlay.

The three Nell intro narration clips were generated with ElevenLabs on 2026-10-19 after credits were replenished. They use Nell’s existing Alice voice and settings. The combined manifest contains 185 speech clips and 10 effects; existing recordings were reused. The script is `src/intro-lines.json`; audio files are `nell-b4428462370aab9a.mp3`, `nell-f2301a5fe1f07984.mp3`, and `nell-1e54975cface1289.mp3` under `public/audio/`. Exact inputs and voice settings are recorded in `public/audio/provenance.json`.

## Playable Act I additions

Generated on 2026-10-19 using the built-in image-generation tool. All three images are 1536 × 1024. The chapter reuses the original tavern, bridge, characters and story map, with original new landing scenery, props and survey artwork. Red map routes, tide-board labels, fencing blades and signal effects are rendered in code.

### Outer landing

File: `public/assets/landing.png`.

Generation prompt:

Original early-1990s adventure-game pixel art, landscape 1536x1024. Background for a playable outer harbour landing at blue twilight, same visual language as a cozy pirate tavern and small wooden harbour bridge: crisp visible square pixel clusters, midnight blue and teal water, purple stone, warm amber lanterns. View from the public repair-yard quay across a narrow channel. Bottom 38 percent is a broad clear wooden plank platform for the player to walk. Left edge path back to town. Left rear a wooden tide noticeboard with blank parchment mounted on a post. Center rear edge of platform a brass survey sighting cleat with two notches pointing toward two unmistakable fixed landmarks across the water: a square warehouse corner at x650 and lighthouse at x1050. Right foreground a low observation rail and small rusty bolt above water, leave clear space for separate float and boathook props. Water occupies middle of composition with clear horizontal path for a passing small launch; right-middle distant signal buoy with brass lantern, unlit. Beyond, moored boats, repair cranes and crooked warehouses. No people, no foreground boat, no text, no UI, no labels. Strong readable composition, all required features visibly distinct, no photorealism. Original scene, not any existing franchise layout.

### Chapter prop atlas

File: `public/assets/chapter-props.png`.

Generation prompt:

Pixel-art game prop atlas, original maritime adventure, 1536x1024. Precisely SIX individual isolated props on perfectly flat solid pure magenta RGB255,0,255 chroma-key background with no shadows or glows. Three equal columns and two equal rows; every prop wholly within its 512x512 cell, generous padding. TOP LEFT: small shabby wooden cleaning cupboard with open door, gray bucket, mop leaning awkwardly, tiny plain paper work request pinned inside, front view. TOP MIDDLE: long brass-tipped wooden boathook, diagonal lower left to upper right. TOP RIGHT: small tan cork float with a dark ring, no rope. BOTTOM LEFT: side view of a small dark blue wooden company launch facing RIGHT, tiny cabin, brass monkey emblem on side, one anonymous silhouette deckhand, no water. BOTTOM MIDDLE: old brass key hanging from a tiny wooden hook plaque, front view. BOTTOM RIGHT: rolled parchment chart tied loosely with teal ribbon. Clear coarse pixel clusters, amber highlights and indigo shadows, dark outlines, 1990s adventure game aesthetic, no labels no UI. Six props distinct, no overlap. Solid magenta in all gaps.

### Old survey

File: `public/assets/survey-chart.png`.

Generation prompt:

Original pixel-art antique survey chart for a maritime point-and-click adventure, landscape 1536x1024. Flat overhead view of a single warm worn parchment sheet on dark teal wooden desk, filling nearly all frame. Bold crisp pixel clusters, limited sepia ink and muted teal, not photographic. Main drawing: a narrow harbour channel with shoreline on left, rocky shoal on right, a square warehouse symbol toward upper-left and a tall lighthouse symbol toward upper-right; a dashed straight survey sightline connecting the warehouse corner to lighthouse notch; a small brass sighting-cleat symbol near bottom center aligned toward both. Parallel small water arrows run leftward along channel. Small floating buoy symbols on water clearly unlike fixed buildings. Accurate clean diagram, generous spacing, not dense ornamental scribbles. Text title 'BELLWEATHER SHOAL' and subtitle 'Outer landing survey'. Label warehouse 'WAREHOUSE CORNER', lighthouse 'LIGHTHOUSE NOTCH', arrow legend 'EBB FLOW'. Add one subtle hand-drawn compass rose, aged fold marks, handwritten depth figures. This is a practical old survey, not a treasure map: no skulls, no X, no fantasy islands. Legible text and symbols. No modern UI.

### Chapter voices and sounds

The combined audio manifest now contains 182 speech clips and 10 effects, including retained test-room recordings. This chapter adds 104 new speech recordings and three effects: the landing bell, passing launch and freed float. All chapter-script dialogue is generated, including the optional cupboard joke, post-observation conversations and investigation leads. Exact inputs and stock-voice settings are in `public/audio/provenance.json`; the editable script is `src/chapter-lines.json`. No voice cloning or runtime API calls are used.


## Story map

### Bellweather Shoal inspection map

- File: `public/assets/act3/inspection-map.png` (1536 × 1024).
- Generated with the existing `codex-imagegen-cli 0.2.0` workflow, using the original `inspection-map.svg` rasterized as the layout reference and `story-map-walkways.png` as the style reference. The SVG is retained as the source layout, not the runtime map.
- Used for both Act III destination selection and animated walking. Existing destination coordinates, routes, keyboard controls and the separate sea-voyage requirement are preserved.
- Art direction: richly illustrated 1990s nautical adventure map; midnight indigo and teal sea, purple rocky cliffs, amber windows, golden parchment labels, service boat, caretaker gallery, recorder workshop and domed chart-drum overlook. Keep the four original destinations and dry walkway branches; no mainland geography, red route overlays or UI markers baked into the image.

### Mainland story map

- File: `public/assets/story-map.png` (1536 × 1024).
- Generated on 2026-10-19 with the built-in image-generation tool.
- Original concept geography based on `docs/STORY_PLAN.md`; not to scale. Labels cover the nine principal story locations. The underground Tide Ledger is illustrated as a cutaway.

### Generation prompt

Use case: stylized-concept.
Asset type: illustrated world map for the original point-and-click adventure "Monkey Buisness".
Create a richly detailed landscape 1536x1024 pixel-art game map, an oblique bird's-eye illustrated coastal chart, readable and beautifully composed. Match a classic early-1990s graphical adventure aesthetic: deliberately visible crisp square pixel clusters, deep midnight indigo and teal sea, purple cliffs, amber lanterns and golden parchment labels. Charming crooked maritime buildings, warm windows, tiny sailing boats, rocky shoals, wave marks and a decorative compass rose. Original geography and artwork, no existing franchise imagery.
Title in a tasteful parchment cartouche across the top: "MONKEY BUISNESS"; smaller subtitle "Brindle Quay & Bellweather Shoal".
GEOGRAPHY: One connected mainland coastal town occupies the left 60 percent, winding around a sheltered harbour inlet. A small wooden footbridge spans a narrow inner watercourse connecting the tavern quarter to the working docks. Cobblestone paths visibly connect the mainland landmarks. Upper-left hills hold an eccentric inventor's manor. A secluded maintenance inlet behind a flood barrier contains a stranded small ship. Farther right across the open harbour water lies a SMALL rocky shoal island with ruined harbour arches, a lighthouse, tide gates and caretaker shed. Keep the island visibly separated from mainland by navigable water. A winding dotted gold sailing route goes from town docks through signal buoys to the shoal. Show secondary faint dashed service channel through reefs. Three little brass signal stations around the harbour and shoal suggest a connected tidal system. Not a giant continent, this is one compact local adventure region.
LABELS: Use neat highly legible light parchment plaques with dark lettering, attached to the relevant landmark, never overlapping one another. Include exactly these nine location labels spelled correctly:
"The Crooked Compass" next to a cozy harbour tavern lower-left;
"Quibble's Crossing" next to the small wooden footbridge;
"Pip's Newspaper" next to a small press shop in the town;
"Rook's House" next to the eccentric hilltop manor upper-left;
"Fair Passage Company" next to an imposing merchant building and private pier toward the town's eastern waterfront;
"Repair Yards" next to cranes and boats on slips along the inner harbour;
"Maintenance Inlet" next to the hidden ship and flood barrier on the north coast;
"Bellweather Shoal" next to the offshore rocky island on the right;
"The Tide Ledger" beside a SMALL tasteful illustrated cutaway below the shoal, showing an underground brass control station linked by a stairway to the island above. Make it clear this is below ground, not a second island.
In an open patch of sea at the bottom, small caption: "Nell's working chart — not to scale".
Add tiny whimsical details: a monkey-shaped merchant weather vane, a little parrot on the bridge's signpost, an absurdly complicated rooftop telescope. No characters in close-up, no UI buttons, no speech bubbles, no photorealism, no modern map pins, no franchise logos. Prioritize readable cartographic composition and coherent paths over overcrowding.

## Harbour bridge artwork and audio

Generated using the built-in image-generation tool on 2026-10-19:
- `public/assets/bridge.png`: original moonlit bridge background.
- `public/assets/duel-sprites.png`: Nell, Captain Quibble and Fine Print on a magenta chroma-key atlas decoded at runtime. Swords are separate Phaser graphics for pivoting animation.

Background prompt:

Original 1990s pixel-art adventure game background, landscape 1536x1024. A small wooden footbridge across a narrow seaside harbor inlet at blue twilight. Side-on theatrical view for a funny fencing duel. Wide clear horizontal plank bridge deck fills lower middle from x0 to1536 at y720 to880, solid walking platform, no holes. Low rope railing behind combatants at y650, foreground edge y890. Warm amber lanterns on posts at extreme left and right, moored little fishing boats, indigo water, distant crooked coastal town and tavern windows, crescent moon. Crisp visible pixel clusters, detailed hand-crafted retro adventure atmosphere, deep teal and purple with amber accents. Clear empty space for three characters across center. No people no birds no text no UI no weapons. Original layout, not a recreation of any existing game screen.

Sprite prompt:

Original retro adventure game pixel-art sprite atlas, 1536x1024. EXACTLY THREE isolated sprites, one per equal 512-pixel-wide column. Perfectly flat solid pure magenta RGB255,0,255 background including all gaps. No gradients no shadows no labels. Left column: full-body young woman sailor with short dark curly hair, teal waistcoat over cream shirt, rust trousers and brown boots; facing RIGHT in an energetic fencing guard stance, right forearm extended horizontally forward with closed hand ready to hold a separate sword, no weapon drawn. Middle column: full-body comically pompous elderly pirate captain facing LEFT, big silver moustache, bald head with burgundy bandana, worn plum tailcoat, cream shirt, striped trousers, sea boots, similarly extended fencing hand with no weapon. Right column: single cheeky emerald and coral red parrot with golden beak, facing left, wings partly spread, no perch. All sprites fit fully within their columns with wide margins. Both humans same height filling y150 to900. Parrot centered x1280 y500 medium sized. Crisp chunky pixel clusters, dark outlines, warm amber side lighting, consistent limited palette. No copied characters from any franchise.

The bridge adds 34 ElevenLabs speech clips, harbour ambience and a fencing parry. All player answers, opponent challenges, retorts and endings have generated voice clips. The parrot uses the Charlie stock voice at a faster delivery speed; no voice cloning is used. See `public/audio/provenance.json` for exact generation settings and `src/duel.json` for the original script.

Generated for Monkey Buisness on 2026-10-19 using the built-in image-generation tool. No original game assets or reference screenshots were supplied. These are original generated development assets; no exclusive copyright or trademark clearance is asserted. Distributed with this project under its GPLv3 terms to the extent applicable. Third-party dependency licenses remain separate.

## Files

- `public/assets/tavern.png`: 1536 × 1024 background.
- `public/assets/sprites.png`: 1536 × 1024 atlas containing Nell, Mara, Orin, a tankard, key and chest. The runtime removes the deliberately generated magenta chroma-key backdrop and extracts frames. The tool did not produce usable alpha in its initial transparency attempts; those intermediate outputs are not used.

## Background prompt

Use case: stylized-concept. Asset type: background for an original browser point and click adventure. Generate a wide 1536x1024 landscape pixel-art tavern interior, no UI no text no people. Original early 1990s 16-bit adventure game aesthetic, coarse crisp pixel clusters, limited warm amber and dark indigo palette, charming crooked architecture. Eye-level theatrical side view. Left third: stone fireplace and wooden noticeboard. Back center: arched window looking onto moonlit teal harbor, a small round table below the window. Right third: wooden bar counter and shelves of bottles, behind counter empty room for a bartender sprite. Bottom 35 percent clear wooden plank floor for walking, no foreground obstructions. Doorway at far left. Brass lanterns and ropes. Strong readable silhouettes, lovingly detailed cozy maritime atmosphere. No existing franchise characters, no copied game layout, no logos. Entire image is the background, no borders.

## Sprite atlas prompt

Use case: stylized-concept. Asset type: transparent sprite atlas for an original 1990s pixel-art maritime point and click game. Canvas 1536x1024, exact three equal columns and two equal rows, six isolated sprites each centered within its own 512x512 cell with generous transparent padding. TOP LEFT: full body young female sailor adventurer with short dark curly hair, teal waistcoat, cream shirt, rust trousers and boots, standing three-quarter facing right. TOP MIDDLE: full body stocky older woman tavern keeper wearing burgundy headscarf, white sleeves, brown apron, standing facing left. TOP RIGHT: full body elderly male navigator with gray beard, navy coat and mustard scarf, standing facing left. BOTTOM LEFT: one brass tankard with handle. BOTTOM MIDDLE: one large old brass key. BOTTOM RIGHT: closed small wooden sea chest with brass lock. Each object isolated, no ground plane, no shadows outside sprites. Crisp coarse pixel art with limited colors and dark outlines, amber lighting, consistent scale for the three characters. All characters original designs, no franchise likenesses. No text no labels no dividers no background, actual transparent alpha. Six sprites only.

## Final chroma-key edit prompt

Edit this sprite sheet: replace all backdrop and glows with a perfectly flat solid pure magenta RGB(255,0,255) chroma-key background. No gradients, no shadows. Keep the three people and tankard, key and chest identical. Six isolated crisp pixel art sprites. Keep all positions unchanged. The space between legs and inside tankard handle must also be flat pure magenta. This is a technical game sprite atlas for chroma key rendering.

## Generated audio

50 MP3 assets were generated with the ElevenLabs API on 2026-10-19: 45 speech clips and five effects (20-second looping tavern ambience, looping footsteps, tankard pickup, tankard/key exchange, and chest unlocking). Character casting: Nell uses Alice, Mara uses Matilda, and Orin uses Bill. These are stock synthetic voices, not cloned performances of the original game's actors.

Exact text, prompts, model IDs, voice IDs and settings are recorded in `public/audio/provenance.json`. The room serves the saved audio as static files; it makes no runtime ElevenLabs calls.

Audio is generated through ElevenLabs and remains subject to the applicable account/voice/service terms. The code's GPLv3 license is not a claim that ElevenLabs audio is independently cleared for unrestricted redistribution. Account-tier distribution rights have not been verified.

## Act II

Six new room backgrounds, two changed-state backgrounds, character/prop/emblem atlases and a chapter illustration are in `public/assets/act2/`. Generated with the built-in image tool; see [artwork record](docs/ACT_2_ARTWORK.md). Act II's 294 spoken lines and nine effects are mapped by `src/act2-audio-manifest.json`, with exact requests recorded in `public/audio/act2-provenance.json`. See [implementation and regeneration](docs/ACT_2_IMPLEMENTATION.md).
