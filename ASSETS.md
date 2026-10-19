# Generated artwork


## Story map

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
