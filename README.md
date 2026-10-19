# Monkey Buisness

An original open-source maritime point-and-click adventure, built with Phaser and TypeScript. This first development room is **The Crooked Compass**, a tavern with original characters, conversations and an inventory puzzle. No original Monkey Island artwork, dialogue, characters or music is included.

## Story development

The editable [story plan](docs/STORY_PLAN.md) outlines Nell’s adventure, the character arcs, five acts, puzzle principles and optional classic-adventure homages. It is a working proposal for the next room-planning pass.

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

Save/Load uses this browser's local storage. Reset starts a fresh room without erasing the saved game. Sound enables ElevenLabs-generated tavern ambience, footsteps, action effects and voiced dialogue. Audio starts only after clicking Sound off; subtitles always remain visible. Voices are Alice for Nell, Matilda for Mara, and Bill for Orin. Dialogue ducks the ambience; mute and hiding the tab stop playback.

<details><summary>Test puzzle walkthrough</summary>

Talk to Mara about the sea chest. Pick up the brass tankard on the window table. Select it in your pockets, then click Mara to receive a key. Select the key and click the sea chest to discover the chart to Bellweather Shoal.

</details>

## Development

- `src/main.ts`: room targets, dialogue, inventory, save validation, Phaser scene and runtime chroma-key atlas decoding.
- `src/style.css`: responsive interface.
- `public/assets/`: generated background and character/object atlas; see `ASSETS.md` for provenance and generation prompts.
- `tests/tavern.spec.ts`: browser coverage for puzzle completion, persistence, bad saves, canvas interaction and mobile sizing.

Run `npx playwright install chromium` once, then `npm test`. To use an installed Chromium instead, set `CHROMIUM_PATH=/path/to/chromium`.

The tavern is a development slice with static character poses, tweened movement, a rectangular foreground walking area, and a chest tint plus narrative feedback for the solved puzzle. There are no walk-cycle sprites, obstacle navigation or animated chest opening yet. The second room adds procedural fencing animation and a word duel; see below.

Code is covered by the repository's GPLv3 license. Phaser retains its MIT license. Generated asset provenance is recorded separately in `ASSETS.md`.

## Regenerate audio

Copy `.env.example` to `.env` and set `ELEVENLABS_API_KEY` locally. `.env` and its variants are ignored by Git. Never use a `VITE_` prefix for a secret: Vite exposes those variables to the client.

```sh
npm run audio:plan      # Show clip count without generating
npm run audio:generate  # Uses ElevenLabs account credits for missing/changed clips
```

Generation runs in Node, not the browser. `scripts/audio-plan.mjs` contains the voice IDs, delivery settings, NPC lines and sound prompts. Literal narration is extracted from `src/main.ts`; keep NPC conversation lines in the plan synchronized when changing dialogue. Hashed audio filenames cache text, voice and settings; rerunning resumes missing clips without regenerating existing ones. No automatic retry occurs after a failed API request.

`public/audio/provenance.json` records generation inputs and voice settings; `src/audio-manifest.json` maps speech and effects to the shipped MP3 files. API credentials are used only as authentication to api.elevenlabs.io and are never stored in these manifests or client assets. Changing a voice in the plan and regenerating creates a new asset rather than overwriting the old one. The key needs text-to-speech and sound-generation permissions; listing voices is unnecessary.

## Harbour bridge: Quibble’s Crossing

Visit `/bridge.html`, use the tavern’s bridge link, or Walk to / Use the tavern door. This second development room pits Nell against Captain Quibble and his parrot Fine Print in five original word duels. Win at least three exchanges. Answers are shuffled, there is no timer, and misses give a hint explaining the wordplay. Both victory and defeat allow a fresh retry. Tavern progress is carried across room visits in this tab using session storage (explicit Save/Load remains separate).

Generated fencing-pose sprites animate with lunges, pivoting blades, parries and recoil; the parrot swoops during its exchanges. Reduced motion is detected from system preferences and can also be toggled. These are procedural animations of illustrated poses, not frame-by-frame walk or sword sprite sheets.

`src/duel.json` is the single source for bridge dialogue and answer keys, shared by gameplay and audio generation. `src/bridge.ts` owns the encounter; `bridge.html` is the second Vite entry. Captain Quibble uses a theatrical Bill voice; Fine Print uses a quick Charlie voice; Nell retains Alice. Generated files and their exact settings are recorded in the shared audio provenance manifest.
