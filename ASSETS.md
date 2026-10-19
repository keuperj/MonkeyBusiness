# Generated artwork

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
