# Act V — The Right of Way

Implements the narrative and puzzle sequence in `/home/keuper/Projekte/MonkeyBusiness/docs/ACT_5_ROOM_PLAN.md` using the existing chapter UI, Phaser scenes, generated still artwork and static voice recordings.

## Entry and debug starts

Chapter entry: `/home/keuper/Projekte/MonkeyBusiness/act5.html`. Completed Act IV offers **Continue to Act V**; the title menu offers continuation after Act IV completion or when an Act V autosave exists. Direct entry without a predecessor identifies its canonical prepared-harbour baseline. Incomplete or corrupt predecessors are not silently imported.

Title menu → **Debug · choose act and room** → **Act 5** offers **25 presets**: fresh opening, all 16 rooms and eight puzzle stages. Example queries:

```text
?debug=act5-intro
?debug=act5-command
?debug=act5-bypass
?debug=act5-duel
?debug=act5-isolated
?debug=act5-emergency
?debug=act5-local
?debug=act5-review
?debug=act5-chart
?debug=act5-epilogue
?debug=act5-complete
```

Debug fixtures identify themselves, replace only the Act V autosave and preserve manual/earlier-act slots. A room preset is not an automatic all-puzzles solution.

## Implemented progression

1. Current pilot/transit/vessel inspections and explicitly confirmed voyage with Orin.
2. Revision-two capture, station-specific settings, disengaged tests, named replies and combined witness record.
3. Dry access, holds, circuit separation and emergency-return inspection.
4. Five evidence/source-pair exchanges with Vane, including Nell's disclosure and current-cover requirement.
5. Hold, command isolation, inlet relief, outer return and quay balance, with independent final verification.
6. Public emergency assertion classification, current-cover and independent-observation checks; warnings remain available.
7. One inspected public transit and a full witnessed event copy including Vane's declaration.
8. Explicit later charter review, six-part public chart, paid-work boat agreement and final departure.

The ending has optional farewells, replay and a labelled pre-departure epilogue checkpoint. Orin retains Second Opinion. Pocket lint's **Exhibit Zero** is optional, never consumes the item and cannot advance critical state.

## Architecture and recovery

Main files under `/home/keuper/Projekte/MonkeyBusiness/src/`: `act5-state.ts`, `act5-data.ts`, `act5-scene.ts`, `act5-map.ts`, `act5.ts`, `act5-dialogue.json` and `act5-audio-manifest.json`.

Autosave/manual keys: `monkey-buisness-act5-auto` and `monkey-buisness-act5-save`. Current technical tokens bind station, attendant, watch, revision, level and detent. Edits invalidate that station's test/reply and the global witness token. Live stages prohibit casual selector edits. Reverse recovery disengages active pilots before reconnecting central and requires fresh tests afterward.

Voyages commit arrival after presentation; an interrupted voyage reloads its departure state. Physical operations commit before presentation and repeated actions cannot apply the same transition twice. Source inspections explicitly select Look and clear inventory selection. Errors are focused inline, not only in the footer.

## Media and reproducibility

- Eight generated 1536 × 1024 illustrations: command, bypass, watch, coupling, passage, review, chart and ending.
- A ninth image composes the existing shoal map with two illustrated interior cutaways and the dry stair route.
- 25 dialogue blocks and 41 optional topics for all nine established speakers.
- 212 generated spoken entries and four effects. Existing returning-room speech is shared through the combined audio manifest.
- Artwork provenance: `/home/keuper/Projekte/MonkeyBusiness/public/assets/act5/generation.json`.
- Audio provenance: `/home/keuper/Projekte/MonkeyBusiness/public/audio/act5-provenance.json`.
- Scripts under `/home/keuper/Projekte/MonkeyBusiness/scripts/`: `extract-act5.mjs`, `generate-act5-art.mjs`, `compose-act5-map.py`, `generate-act5-audio.mjs`.
- The map compositor uses the Pillow environment of the existing image-generation CLI. Generation services and credentials never enter the browser.

## Design adaptations and limits

The grand finale now uses an intro-style full-screen cinematic: three painted-art scenes with slow camera moves, fades, existing recorded dialogue and readable subtitles. It proceeds to an 85-second gold perspective credits crawl on a star field, then a full-screen director card. It is not bespoke frame-by-frame character animation. Charter review and the relief roster use explicit transitions, not simulated committees or extra voiced crews. The survey boat appears in its inspection/ending illustration rather than as a new transparent room sprite.

The map extension uses room-art cutaways instead of regenerating established landmark positions. New room badges use their room illustrations; returning rooms retain established emblems. The ending includes twelve explicitly fictional celebrity non-credits marked with asterisks. The final card reads “Directed by Janis Keuper”, then fades in the requested comedic attribution “* actual work done by GPT-6 Astra”. These are presentation copy, not production provenance; actual asset provenance remains in the project records.

The cinematic has sound, pause/resume, next and skip controls, Escape dismissal, focus restoration and replay. Hidden tabs pause animation/progression. Reduced-motion mode removes camera moves/fades and substitutes scrollable static credits, with an explicit next button. Completion is saved before presentation starts, so skipping or reloading cannot undo the ending. Implementation: `/home/keuper/Projekte/MonkeyBusiness/src/act5-ending.ts` and `/home/keuper/Projekte/MonkeyBusiness/src/act5-ending.css`. Focused browser tests: `/home/keuper/Projekte/MonkeyBusiness/tests/act5-ending.spec.ts`.

Browser decoding checks establish audio-file validity, not a full subjective listening review. The illustrated normal-controls Act V playbook is now available at `/home/keuper/Projekte/MonkeyBusiness/playbook/Act-V/PLAYBOOK.md`, with 65 screenshots covering recovery, Exhibit Zero, the boat callback and the cinematic/credits ending. Reproduce it with `/home/keuper/Projekte/MonkeyBusiness/tests/act5-playbook.spec.ts` and `CAPTURE_ACT5_PLAYBOOK=1`. The capture passed completion/reload and retained-inventory assertions on 7 November 2026. Its canonical chapter entry does not independently verify an imported Act IV save. The room plan's duration target is not a measured player time.

## Validation coverage

Tests: `/home/keuper/Projekte/MonkeyBusiness/tests/act5.spec.ts` and `/home/keuper/Projekte/MonkeyBusiness/tests/act5-media.spec.ts`.

They cover normal-controls completion, mid-emergency reload/recovery, stale tokens, invalid saves, all 25 debug entries, saved-slot preservation, no-lint ending, mobile keyboard travel, ending cancellation/reload, animated shoal arrival, locked destinations, script/source audio coverage, decoding and cache hashes. Act IV's normal-controls test verifies the actual chapter handoff.

Logs: `/tmp/monkey-act5-validation.log`, `/tmp/monkey-act5-handoff-validation.log`, `/tmp/monkey-act5-recovery-test.log`, and `/tmp/monkey-act5-final-regressions.log`. The final task summary reports inspected results rather than treating failed development runs as successful validation.

### Verified final run

- Serial chapter/handoff/map/bridge/departure/media regression run: **33 passed** (`/tmp/monkey-act5-final-regressions.log`).
- Production build passed (`/tmp/monkey-act5-final-build.log`); existing large-chunk warning remains.
- Artwork contact sheet and rendered command/bypass room screenshots reviewed.
- This is a focused regression set, not a claim that every repository test was rerun.
