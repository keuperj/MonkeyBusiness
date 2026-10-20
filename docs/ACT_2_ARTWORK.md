# Act II generated artwork

Mode: built-in `image_gen` image generation, using the imagegen skill. All assets are original pirate-adventure artwork. Shared direction: richly painted 1990s pixel-adventure aesthetic, teal/navy shadows, warm amber lantern light, readable silhouettes, no copyrighted game characters, logos, dialogue or copied compositions. Room images are 1536 × 1024, without characters or user-interface overlays. Sprites and emblems have alpha transparency.

The specifications below record the production subjects and layouts. Runtime uses these complete backgrounds, alpha sprites and SVG atlas crops; no external generated-image path is required by the game.

| Output in `public/assets/act2/` | Generation specification | Source identifier |
| --- | --- | --- |
| `repair-quay.png` | Original nocturnal ship-repair quay; brass retired signal housing and maker plate, public witness board, paper desk, repair bench, mooring rope, working harbour and open foreground walking area. | `exec-f958b3c0-df4c-42f2-83ce-008efaaf1c52.png` |
| `quay-quill.png` | Original harbour newspaper print shop, large hand printing press, proof table, papers and headline, source pigeonholes, dockside doorway, warm lanterns and clear foreground floor. | `exec-b04dd482-81b6-4dab-954e-d4358c36acb6.png` |
| `rook-hall.png` | Eccentric inventor's breakfast hall, brass heater and controller left, central table and chairs, circular household machinery, serving trolley obstructing workshop access, whimsical refuse sorter. | `exec-aa83babc-d171-443f-9e87-72fd648ffb36.png` |
| `rook-workshop.png` | Nautical inventor workshop, service drawings left, tabletop local-channel working model, brass mechanisms, inspection crank on tool board, family portrait, warm wood and clear walking floor. | `exec-77e38f5b-58a3-493a-8857-c7c105c676df.png` |
| `blind-inlet.png` | Sheltered stone harbour service inlet with closed timber lift barrier, inspection controls, fixed split stone pillar, square drain, foreground berth and bollard; visible water and no boat. | `exec-bc822287-3dd8-47c3-9ec0-c2f12e5e2639.png` |
| `survey-office.png` | Elegant reassuring harbour office, licence board, harbour model, director's desk, parchment commission, copy tray, authority plaque, sunset harbour doorway. | `exec-bc3f860d-298a-46b4-a999-e58a40ab081e.png` |
| `inlet-open.png` | Edit `blind-inlet.png`: raise the central wooden barrier, preserve camera, architecture and foreground features; open navigable water beyond; no boat. | `exec-e12d2f94-6148-4b2c-9a67-685b8136fb01.png` |
| `hall-fixed.png` | Edit `rook-hall.png`: safely park table and trolley, clear workshop access; retain room, lighting and perspective. | `exec-a04928b3-6bca-4595-88e2-c6da10233df7.png` |
| `cast.png` | Three equally sized columns: Pip, young ink-stained reporter with spectacles and paper; Rook, red-haired inventor with goggles, green work coat and tools; Vane, composed director with silver-streaked dark hair, navy/gold coat and ledger. Full bodies and alpha background. | `exec-812f2658-bbd0-4426-9fd1-588faf29b026.png` |
| `props.png` | Transparent 3-column × 2-row atlas: rope coil, inspection crank, tracing paper; service drawing, cream-cabin blue-striped boat with copper-kettle vane, wooden barrier. Actual output 1254 × 1254; Phaser crops by source dimensions. | `exec-59853405-dd80-4b85-bcdb-4c0ce393e523.png` |
| `emblems.png` | Transparent illustrated 3-column × 2-row room badge atlas: repair quay, newspaper, breakfast hall; workshop, inlet, survey office. Brass ornament and painted miniature scenes, no labels. | `exec-dbfddaea-8890-46e2-bc2e-09d06d114062.png` |
| `loading.png` | Original chapter illustration of Nell investigating the harbour: workshop, newspaper, service gate and company survey imagery; panoramic pirate-adventure composition suitable for chapter loading screen. | `exec-8bf9bbfe-2441-4fa8-bf93-0c21309f321d.png` |

Generated source images are retained in the image tool's output directory. The first cast generation was `exec-50471fd7-d26a-4e63-b8c0-c1d5081ed41b.png`; the final edit preserved the same identities and columns while explicitly requesting removal of all background and glow.

Final cast edit prompt:

> Edit this exact three-character pirate game sprite sheet. Remove EVERY part of the background including ALL brown glow, ground shadows and black backdrop. Keep precisely the same three characters and poses and their full bodies, in the same three equally sized columns. Entire space between and around characters must have zero alpha, truly transparent. No background color, no halo, no atmosphere. Preserve detailed original painted pixel art. Landscape 1536x1024 PNG with alpha.

The current quay, newspaper and workshop backgrounds have collectible-free edits so their pickups can disappear independently. See [COLLECTIBLE_ART_EDITS.md](COLLECTIBLE_ART_EDITS.md) for the replacement source identifiers and exact built-in image-generation prompts.
