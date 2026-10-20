# Monkey Buisness

An original open-source maritime point-and-click adventure, built with Phaser and TypeScript. The playable first chapter, **A Job, a Tankard and a Toll**, follows Nell through The Crooked Compass, Quibble’s Crossing and the Outer Landing. No original Monkey Island artwork, dialogue, characters or music is included.

## Story development

The editable [story plan](docs/STORY_PLAN.md) outlines Nell’s adventure, the character arcs, five acts, puzzle principles and optional classic-adventure homages. It is a working proposal for the next room-planning pass.

The [Act I room plan](docs/ACT_1_ROOM_PLAN.md) details the tavern, bridge and outer landing, including dialogue, objects, puzzle dependencies and an optional Space Quest Easter egg.

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

## Opening sequence

Completed follow-up work is recorded in [FOLLOW_UP.md](docs/FOLLOW_UP.md).

The game opens on an original painted splash cover, followed by a start menu over the story map. **Start game** begins a three-scene animated introduction to Nell; **Load game** offers the autosave and manual save separately and skips the intro. Starting again asks before replacing autosaved progress and preserves the manual save. **Main menu** returns to these options during play.

The introduction has subtitles, **Pause / Resume**, **Next scene** and **Skip intro** controls. Escape also skips it. It pauses when the tab is hidden and respects reduced-motion preferences. All three intro scenes have generated narration using Nell’s existing Alice voice, alongside subtitles and harbour ambience. Enable **Sound** on the splash or start menu to hear it. The editable narration is in `src/intro-lines.json`.

Map travel follows traced waypoints along the tavern lane, timber bridge and repair-yard quay. Return journeys follow the same paths in reverse.

## Illustrated room headers

All rooms share one compact header row: game logo and current-room emblem on the left, decorative act lettering, and reachable-room emblems beside the sound icon on the right. Click a destination emblem to travel; destinations appear as progress unlocks them. Hover or focus an emblem for its room name. Future-room integration is documented in [ROOM_HEADERS.md](docs/ROOM_HEADERS.md).

## Controls

The action tray and footer use generated painted pirate icons with hover labels and accessible names. Notebook and Map are in the pockets tray; the pencil and lint are permanent personal effects, separate from puzzle inventory. Existing keyboard shortcuts still work. The lower-right controls use compact 27px artwork (with larger touch targets on touchscreens). The shared atlas is `public/assets/pirate-ui-atlas.png`; generation notes are in `docs/UI_ARTWORK.md`. Shared icon definitions and styling live in `src/control-icons.ts` and `src/control-icons.css`.

Click the floor to walk. Choose **Look at**, **Talk to**, **Pick up** or **Use**, then click a person or object. Click a pocket item to use it with a scene target. Keys 1–5 select verbs, H toggles hotspots, and Escape closes a conversation. The expandable object list provides keyboard-accessible alternatives to canvas hotspots.

Progress autosaves in this browser across all three rooms, including the notebook and unfinished duels. **Save / Load** provides a separate explicit save slot. **New adventure** clears the current adventure while preserving that slot. **Notebook** keeps clues, conversations and replayable speech; **Hint** suggests the next puzzle step.

Choose a destination or use a scene exit to travel. The story map draws a red route with a moving marker from your current room to the destination. **Continue** skips travel; reduced motion shows the complete route until you press Continue. The outer landing opens after winning bridge passage.

Click **Sound off** to enable generated voices, ambient loops, footsteps and action effects. Subtitles are always available. Dialogue ducks the ambience; muting or hiding the tab stops playback. Character voices: Alice (Nell), Matilda (Mara), Bill (Orin and theatrical Quibble), and Charlie (Fine Print). Audio is served locally; playing requires no API key.

<details><summary>Act I walkthrough — spoilers</summary>

1. Pick up the brass tankard and use it on Mara. Use her key on the sea chest to obtain the old survey; Nell returns the key to its hook.
2. Optional: Use the cleaning cupboard for the Space Quest maintenance joke.
3. Travel to Quibble’s Crossing. Challenge the bridge keepers and win at least three of five word exchanges. You can retry without losing inventory or progress.
4. At the Outer Landing, look at the tide board and fixed landmarks. Use the old survey on the sighting cleat; choose the warehouse corner and lighthouse notch.
5. Use the boathook, then the tethered float. Watch the channel through four replayable observation steps, or read the complete observation immediately.
6. Review the evidence: select the ebb reading, signal before the current change, and company launch using that route. Choose an investigation lead to finish Act I.

The bridge can be solved before the tavern; landing clues remain recorded if you return later with the chart. Visit characters again after witnessing the current for their reactions.

</details>

## Development

- `src/front.ts` / `src/front.css`: splash, menu, save selection and cinematic intro.
- `src/map-routes.ts`: traced walkable map routes.
- `src/chapter.ts`: chapter interactions, conversations, puzzles, notebook and animated map travel.
- `src/chapter-state.ts`: shared progress and save validation.
- `src/chapter-scene.ts`: three Phaser rooms, hotspots and procedural animations.
- `src/chapter-lines.json`: original chapter voice script; `src/duel.json`: duel script and answer keys.
- `src/chapter.css`: responsive chapter interface.
- `public/assets/`: generated backgrounds, sprite atlases, survey and map. See `ASSETS.md` for provenance and prompts.
- `tests/chapter.spec.ts`: full walkthrough, alternate puzzle order, save restoration, mobile travel and voice coverage.

Run `npx playwright install chromium` once, then `npm test`. To use an installed Chromium instead, set `CHROMIUM_PATH=/path/to/chromium`.

Characters use generated static poses with tweened movement and procedural fencing; this version does not have frame-by-frame walk cycles or obstacle navigation. The landing adds a moving float, signal light and company launch. Act II destinations appear on the map as story context; the playable chapter ends with choosing an investigation lead.

The original isolated test rooms remain available at `/tavern-test.html` and `/bridge.html`, with their original separate save behavior.

Code is covered by the repository's GPLv3 license. Phaser retains its MIT license. Generated asset provenance is recorded separately in `ASSETS.md`.

## Regenerate audio

Copy `.env.example` to `.env` and set `ELEVENLABS_API_KEY` locally. `.env` and its variants are ignored by Git. Never use a `VITE_` prefix for a secret: Vite exposes those variables to the client.

```sh
npm run audio:plan      # Show clip count without generating
npm run audio:generate  # Uses ElevenLabs account credits for missing/changed clips
```

Generation runs in Node, not the browser. `scripts/audio-plan.mjs` contains the voice IDs, delivery settings, NPC lines and sound prompts. Chapter dialogue is read from `src/chapter-lines.json`, intro narration from `src/intro-lines.json`, and duel dialogue from `src/duel.json`. Legacy tavern narration is extracted from `src/main.ts`; keep its NPC lines in the audio plan synchronized when editing the isolated test room. Hashed audio filenames cache text, voice and settings; rerunning resumes missing clips without regenerating existing ones. No automatic retry occurs after a failed API request.

`public/audio/provenance.json` records generation inputs and voice settings; `src/audio-manifest.json` maps speech and effects to the shipped MP3 files. API credentials are used only as authentication to api.elevenlabs.io and are never stored in these manifests or client assets. Changing a voice in the plan and regenerating creates a new asset rather than overwriting the old one. The key needs text-to-speech and sound-generation permissions; listing voices is unnecessary.

## Harbour bridge: Quibble’s Crossing

In the isolated test version, visit `/bridge.html`, use the link from `/tavern-test.html`, or Walk to / Use its tavern door. This second development room pits Nell against Captain Quibble and his parrot Fine Print in five original word duels. Win at least three exchanges. Answers are shuffled, there is no timer, and misses give a hint explaining the wordplay. Both victory and defeat allow a fresh retry. Tavern progress is carried across room visits in this tab using session storage (explicit Save/Load remains separate).

Generated fencing-pose sprites animate with lunges, pivoting blades, parries and recoil; the parrot swoops during its exchanges. Reduced motion is detected from system preferences and can also be toggled. These are procedural animations of illustrated poses, not frame-by-frame walk or sword sprite sheets.

`src/duel.json` is the single source for bridge dialogue and answer keys, shared by gameplay and audio generation. `src/bridge.ts` owns the encounter; `bridge.html` is the second Vite entry. Captain Quibble uses a theatrical Bill voice; Fine Print uses a quick Charlie voice; Nell retains Alice. Generated files and their exact settings are recorded in the shared audio provenance manifest.

Chapter entry now downloads and verifies Act I’s artwork and audio before initializing the game. An illustrated loading screen shows byte-weighted progress; browser Cache Storage reuses unchanged files on later visits. Failed downloads offer Retry. HTTPS (or localhost) and browser storage are required. See [chapter cache documentation](docs/CHAPTER_CACHE.md) for deployment and asset-manifest regeneration.

### Act II — Respectable Nonsense

Act II is playable from the Act I ending or the start menu's configurable **Debug start** selector. Choose act and room; `public/debug-start.json` controls the available presets and the `enabled` switch. Six new rooms, the returning harbour locations, voiced conversations, seven main puzzles, optional classic-adventure Easter eggs, chapter precaching and separate Act II saves are included. See [Act II implementation](docs/ACT_2_IMPLEMENTATION.md) for configuration and asset regeneration.

### Narrated chapter arrivals

New adventures show Nell’s prologue followed by a map introduction to Brindle Quay and the initially accessible Act I venues. Entering Act II for the first time reveals its five new accessible venues over the already known harbour. Each reveal has Nell’s recorded narration and subtitles; the final marker identifies her arrival before the map dissolves into the room. Locked venues are introduced through gameplay instead. Loading a save or using a debug preset bypasses these introductions.

Edit `src/act-arrivals.json` to change the venue order, introductions, known locations, or arrival point. `src/act-arrival.ts` supplies the shared reveal sequence, next/skip controls, sound control, hidden-tab pause, and reduced-motion support. The sound preference carries between acts for the browser session. Narration is included in the chapter pre-cache; regenerate changed lines with `node scripts/generate-audio.mjs` (Act I) and `node scripts/generate-act2-audio.mjs` (Act II), then rebuild the asset manifests with `npm run build`.
