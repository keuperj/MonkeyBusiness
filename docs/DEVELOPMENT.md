# Development guide

[Project overview](../README.md) · [Installation](INSTALLATION.md) · [GitHub Pages styling](PAGES.md)

## Setup & commands

Follow the installation guide, then use the repository root as your working directory:

```sh
npm ci
npm run dev
npm run build
npx playwright install chromium
npm test
```

`npm run build` checks TypeScript and bundles every HTML entry with Vite. Both `predev` and `prebuild` run `scripts/chapter-assets.mjs` to regenerate chapter asset manifests. No generation API key is needed for normal development or testing.

Playwright starts the development server automatically and runs one worker. To use an existing Chromium installation:

```sh
CHROMIUM_PATH=/usr/bin/chromium-browser npm test
```

Set that path to the executable on your own machine. Useful focused checks:

```sh
npx playwright test tests/chapter.spec.ts tests/act2.spec.ts tests/act5.spec.ts
npx playwright test tests/room-geometry.spec.ts tests/hotspot-audit.spec.ts
git diff --check
```

Tests can write screenshots and reports under `test-results/`; subsequent runs may clear them. Preserve audit captures before another suite. Full playbook tests may update tracked walkthrough material: review the working tree before committing.

## Architecture

| Area | Files / purpose |
| --- | --- |
| Entry points | `index.html`, `act2.html` through `act5.html`; isolated prototypes at `tavern-test.html` and `bridge.html` |
| Opening & introductions | `src/front.ts`, `src/front.css`, `src/intro-lines.json`, `src/act-arrival.ts`, `src/act-arrivals.json` |
| Act I | `src/chapter.ts`, `src/chapter-state.ts`, `src/chapter-scene.ts`, `src/chapter-lines.json`, `src/duel.json` |
| Later chapters | `src/act2-*` through `src/act5-*`: state, room data, rendering, dialogue and puzzles |
| Movement & clicks | `src/walkable-floor.ts`, `src/actor-layout.ts`, `src/scene-hotspots.ts`, `src/map-routes.ts` |
| Shared interface | `src/chapter.css`, `src/control-icons.ts`, `src/control-icons.css` |
| Artwork & audio | `public/assets/`, `public/audio/`; provenance in `ASSETS.md` and audio manifests |
| Debug starts | `public/debug-start.json`: configurable act/room progression presets and enable switch |
| Regression tests | `tests/`: browser playthroughs, saves, geometry, interactions, endings and playbooks |

Use the start menu's **Debug start** selector for targeted development. Debug presets are test progression, not a substitute for a normal-controls playthrough.

## Changing rooms or puzzles

1. Read the relevant act's room plan and implementation notes in this directory.
2. Update state validation, room data, scene rendering and puzzle interactions together. Preserve save compatibility or explicitly implement migration.
3. Keep floor polygons, actor placement and clickable bounds consistent with the rendered artwork. Sprite-bound hotspots should use the shared helper.
4. Test normal progression, reloads, alternate order and relevant debug states. Inspect screenshots: passing geometry tests alone do not establish visual alignment.
5. Run the build and focused regressions; review generated manifests and the git diff.

Static illustrated character poses use tweens and procedural animation; they are not frame-by-frame walking sprite sheets. Keep reduced-motion behavior, keyboard/touch alternatives, subtitles and sound controls intact.

## Artwork & audio generation

Existing assets are shipped with the project. Consult [asset provenance](../ASSETS.md) and the act-specific artwork notes before replacing them.

Optional audio regeneration uses the existing ElevenLabs scripts:

```sh
cp .env.example .env
npm run audio:plan
npm run audio:generate
```

Set `ELEVENLABS_API_KEY` only in the ignored `.env` file. Generation can incur provider charges; inspect the plan before generating. Never commit secrets or place them in browser code. Later acts use `scripts/generate-act2-audio.mjs` through `scripts/generate-act5-audio.mjs`; inspect the relevant script before running it. Provenance is recorded under `public/audio/`, while source manifests map speech to the shipped clips. Normal playback does not contact the generation API.

After editing assets while the server is running, regenerate chapter manifests:

```sh
node scripts/chapter-assets.mjs
```

## Promotional screenshots

The README and Pages site share clean, unannotated screenshots captured from gameplay. Regenerate intentionally:

```sh
CAPTURE_PROMO=1 npx playwright test tests/promotion.spec.ts
```

This writes tracked JPEGs in `docs/assets/screenshots/`. The test is skipped during normal runs so `npm test` does not silently replace promotional images. Review all three images before committing; debug presets are used to reach the pictured scenes without including walkthrough annotations.

## Further reading

- [Story plan](STORY_PLAN.md) and [map navigation](MAP_NAVIGATION.md)
- [Room headers](ROOM_HEADERS.md), [UI artwork](UI_ARTWORK.md), [chapter caching](CHAPTER_CACHE.md)
- [Room geometry audit](ROOM_GEOMETRY_AUDIT.md) and [hotspot audit](HOTSPOT_AUDIT.md)
- [Act II](ACT_2_IMPLEMENTATION.md), [Act III](ACT_3_IMPLEMENTATION.md), [Act IV](ACT_4_IMPLEMENTATION.md), [Act V](ACT_5_IMPLEMENTATION.md) implementation notes
- [Act V room plan](ACT_5_ROOM_PLAN.md) and [ending playbook](../playbook/Act-V/PLAYBOOK.md) (spoilers)

Some older planning documents describe earlier milestones; use current source and regression tests to confirm implemented behavior.