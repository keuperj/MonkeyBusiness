# Illustrated room headers

All playable chapter rooms and the isolated tavern/bridge prototypes use `RoomHeader` from `src/room-header.ts`, styled by `src/room-header.css`.

The shared single-row layout contains the game logo and current-room emblem on the left, act lettering in the middle, and reachable-room emblems beside the sound icon on the right. There is no header map or second row. The chapter supplies reachability from game state: the landing appears after passage is won. The current room is shown beside the game logo and omitted from the travel buttons. Accessible names, tooltips and keyboard focus remain available even though visible labels are artwork. The objective remains in the room panel and notebook rather than a separate text strip above the scene.

## Adding a room or act

1. Add the room to the game's state, scene and progression definitions as usual.
2. Register its artwork in `roomBadges`: `name`, `art` (asset filename), `frame` (SVG viewBox crop in the 1536 × 1024 asset), and `point` (coordinates on the 1536 × 1024 story map). Use original generated art with readable lettering and a distinct silhouette. Keep artwork provenance in ASSETS.md.
3. Supply that badge to `RoomHeader.render` with its ID and `reachable` condition. The chapter already builds these entries from its room registry. The destination strip accepts any number of rooms and scrolls horizontally when needed.
4. For a new act, pass its act number and subtitle to the `RoomHeader` constructor. For separate-page prototypes, destinations can have an `href` instead of a travel callback.
5. Use `paintSound(button, enabled)` whenever the sound state changes. Do not replace the button with text; this helper updates the icon, accessible label, pressed state and tooltip together.

Gameplay, travel routes and unlock rules remain owned by the game; the header displays and invokes them. New destinations still need their own scene, assets and route definition.
