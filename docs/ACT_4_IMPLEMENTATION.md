# Act IV implementation

Implemented 6 November 2026 from `/home/keuper/Projekte/MonkeyBusiness/docs/ACT_4_ROOM_PLAN.md`.

## Entry and scope

`/home/keuper/Projekte/MonkeyBusiness/act4.html` runs **Nobody Opens a Harbour Alone**. Complete Act III and choose **Continue to Act IV**, resume from the start menu, or select **Act 4** in the debug menu. Eleven debug presets cover the fresh opening and all ten rooms. Debug starts replace only the Act IV autosave; manual and earlier-act saves remain untouched.

The chapter implements the sourced evidence comparison, qualified charter argument, publication with disclosure and response, authorised dry station access and signal-branch repair, three separate station preparations/readbacks, public signal rehearsal, Vane's genuine counteroffer, and the centralisation announcement. Act V is explicitly unavailable. Live authority remains CENTRAL, local drives remain disengaged, and Second Opinion remains at Blind Inlet throughout.

The illustrated interactive map and animated route are retained. The chamber uses the quay personnel stair, never a walking route across the sea. Reduced motion presents the completed route and waits for Continue.

## Ownership and recovery

- Autosave: `monkey-buisness-act4-auto`; manual: `monkey-buisness-act4-save`.
- Completed Act III imports keep evidence and optional lint absence. An incomplete predecessor is not silently treated as complete. Direct entry with no predecessor uses the canonical completed-chapter inventory.
- Invalid autosaves offer explicit raw backup/fresh start and, if valid, manual restoration.
- Each local acknowledgement is bound to station identity, watch, revision, level and detent. Editing a setting invalidates its test/readback and the global rehearsal, not other completed stations.
- Completion makes station controls read-only. Offer review and final confirmation can be cancelled without loss.
- Mara, Rook, Quibble, Fine Print and Vane relocate explicitly in state and render in only one room; Orin remains captain, not inlet attendant.

## Dialogue and presentation

The room plan supplies 19 mandatory/optional blocks and 45 optional topics in `/home/keuper/Projekte/MonkeyBusiness/src/act4-dialogue.json`. Conditional replies are selected at runtime. Essential progression actions remain visible as named room actions rather than being hidden in optional conversations. Long printed evidence is readable text; spoken object descriptions have static voice clips too.

Three tracked optional discoveries: mascot promises, lint appointment clock, and Bram's maintenance credit. None consumes lint or changes machinery. All nine established speakers have chapter dialogue.

Implementation uses the existing Phaser scene conventions, shared UI/icons, audio playback, chapter cache and Playwright tooling. No runtime generation services or API credentials are shipped.

## Media provenance and checks

Twelve newly generated illustrations and sprites are documented in `/home/keuper/Projekte/MonkeyBusiness/docs/ACT_4_ARTWORK.md`. Static ElevenLabs generation is reproducible through `/home/keuper/Projekte/MonkeyBusiness/scripts/generate-act4-audio.mjs`; its manifest covers 216 spoken lines and four ambience/effect clips. Generation records are in `/home/keuper/Projekte/MonkeyBusiness/public/audio/act4-provenance.json`.

Tests are in `/home/keuper/Projekte/MonkeyBusiness/tests/act4.spec.ts` and `/home/keuper/Projekte/MonkeyBusiness/tests/act4-media.spec.ts`. They cover the complete normal-controls route, mid-repair reload, stale acknowledgement invalidation, cancellation, completed reload, debug saves, recovery, source/audio coverage, cache hashes and browser audio decoding. Browser decoding establishes file validity, not a subjective listening review of every line.

## Design adaptations

The service kit is collected with one explicit consent-gated action as well as individual object pickups. Evidence documents and the roster use readable panel/notebook views instead of a drag-and-drop interface. Character moves use visible state changes and the ordinary travel map; no separate escort simulation is introduced. The publication is available in the press/notebook rather than requiring a delivery errand. The final departure illustration depicts Vane's launch, not Nell's boat.

No illustrated Act IV playbook is claimed here; the room plan and automated walkthrough provide the solution reference until a dedicated capture is requested.

## Validation record

- Final production build: passed; existing large-bundle warning remains.
- Focused chapter/handoff/map/debug run: 21 passed.
- Final Act IV gameplay and media run: 8 passed, including corrected debug-menu expansion in the test and automatic animated-map arrival.
- Full serial regression: 73 passed, 2 opt-in captures skipped, 3 failures. One was the subsequently corrected debug-menu test; the other two were Act I arrival and duel timing failures. Both Act I tests passed together on isolated rerun (2 passed). The full suite was not rerun a second time, so it is not claimed as a clean full-suite pass.
- Whitespace/diff check: passed. Generated contact sheet, rendered station and completed harbour were visually reviewed.

Logs: `/tmp/monkey-act4-validation.log`, `/tmp/monkey-act4-final-tests.log`, `/tmp/monkey-act4-final-build.log`, `/tmp/monkey-act4-full-suite.log`, `/tmp/monkey-act4-legacy-recheck.log`.