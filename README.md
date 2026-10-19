# Monkey Buisness

An original open-source maritime point-and-click adventure, built with Phaser and TypeScript. This first development room is **The Crooked Compass**, a tavern with original characters, conversations and an inventory puzzle. No original Monkey Island artwork, dialogue, characters or music is included.

## Run locally

Requires Node.js 18+ and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite (normally http://127.0.0.1:5173).

```sh
npm run build
npm run preview
```

The production output in `dist/` can be served by any static web server. Phaser is pinned to 3.90.0 for its established API. No account or backend is required. Google Fonts is optional; system fonts are used when unavailable.

## Controls

Click the floor to walk. Choose **Look at**, **Talk to**, **Pick up** or **Use**, then click a person or object. Click a pocket item to use it with a scene target. Keys 1–5 select verbs, H toggles hotspots, and Escape closes a conversation. The expandable object list provides keyboard-accessible alternatives to canvas hotspots.

Save/Load uses this browser's local storage. Reset starts a fresh room without erasing the saved game. Sound toggles a quiet synthesized tone bed; no external recording is used.

<details><summary>Test puzzle walkthrough</summary>

Talk to Mara about the sea chest. Pick up the brass tankard on the window table. Select it in your pockets, then click Mara to receive a key. Select the key and click the sea chest to discover the chart to Bellweather Shoal.

</details>

## Development

- `src/main.ts`: room targets, dialogue, inventory, save validation, Phaser scene and runtime chroma-key atlas decoding.
- `src/style.css`: responsive interface.
- `public/assets/`: generated background and character/object atlas; see `ASSETS.md` for provenance and generation prompts.
- `tests/tavern.spec.ts`: browser coverage for puzzle completion, persistence, bad saves, canvas interaction and mobile sizing.

Run `npx playwright install chromium` once, then `npm test`. To use an installed Chromium instead, set `CHROMIUM_PATH=/path/to/chromium`.

This is a development slice: one room, static character poses with tweened movement, a rectangular foreground walking area, and a chest tint plus narrative feedback for the solved puzzle. There are no walk-cycle sprites, obstacle navigation, additional rooms or recorded voice acting yet.

Code is covered by the repository's GPLv3 license. Phaser retains its MIT license. Generated asset provenance is recorded separately in `ASSETS.md`.
