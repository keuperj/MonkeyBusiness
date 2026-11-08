# All-act hotspot audit

## Scope

The automated audit visits all 51 chapter room/act combinations plus the additional non-intro progression presets (60 presets total). It captures labeled hotspot overlays, records geometry, checks that every target has an exposed clickable point, and dispatches real browser mouse clicks through Phaser input. The callback is intercepted only in the audit test to avoid changing puzzle state while inspecting every target. Separate gameplay tests exercise the actual puzzle callbacks.

**This is not a complete visual sign-off of painted background objects.** The landing background was displayed, but a complete room-by-room visual comparison has not been completed. Background rectangles are checked for reachability and overlap, but those checks cannot establish correspondence to painted pixels. Their existing coordinates have not been arbitrarily moved. The standalone tavern/bridge prototypes are outside this five-chapter hotspot audit.

## Confirmed corrections

- Act I float: the hotspot follows the actual float position, including freeing and observation movement, instead of remaining at an old rectangle below the sprite.
- Act I chest, survey, tankard, cupboard and hook: targets use displayed sprite bounds. Open chests no longer retain the smaller closed-chest rectangle.
- Act I bridge notices and ledger: target bounds follow the actual text plaques. The practice sword rectangle is corrected to its rotated displayed position. Quibble and the moving parrot use their actual displayed bounds.
- Acts II–V characters: all hit regions follow current world bounds, including movement, rather than only their initial position.
- Act II pickups and boat: hotspots follow displayed sprites; the boat follows recovery movement. Hidden/collected objects do not keep active bound hotspots.
- Acts III–V open chests and boats, Act III tracing, and Act IV cabinet/link/handle/roster overlays: use actual displayed bounds, including centered sprites previously treated as bottom-anchored.
- Act V Recorder Room: removes the obsolete recess target underneath Exhibit Zero. Boat targets are omitted on the shore where the boat is absent.
- Small targets receive priority over large surrounding areas. The audit found Orin's enlarged rectangle entirely covering the tankard; the tankard is now independently clickable.

## Implementation

`/home/keuper/Projekte/MonkeyBusiness/src/scene-hotspots.ts` creates and synchronizes zones and hotspot outlines. Bound targets inherit world position, size and visibility from their rendered object every frame. Background-only targets retain their authored coordinates. Listener cleanup happens when the zone is destroyed, avoiding accumulation on room changes. Labels are clamped to the canvas edges.

No new artwork is generated. Bounds are rectangular sprite/world bounds, not alpha-pixel silhouettes; transparent padding can remain clickable. Closely neighboring painted features still need visual review against the overlay screenshots.

## Reproduce

From `/home/keuper/Projekte/MonkeyBusiness`:

```sh
CHROMIUM_PATH=/usr/bin/chromium-browser npx playwright test tests/hotspot-audit.spec.ts
```

Source: `/home/keuper/Projekte/MonkeyBusiness/tests/hotspot-audit.spec.ts`.

Outputs: `/home/keuper/Projekte/MonkeyBusiness/test-results/hotspot-audit/`, with one PNG per preset and one JSON report per act. Each target records its authored/rendered bounds, sprite binding when present, and an exposed point actually clicked in the browser. Additional tests verify moving-float alignment and the open-chest width.

Validation logs: `/tmp/monkey-hotspot-audit.log` (initial findings), `/tmp/monkey-hotspot-act1.log` (Act I fixes), `/tmp/monkey-hotspot-build.log` (TypeScript/build), and `/tmp/monkey-hotspot-final.log` (combined final audit and gameplay regressions). Check final log completion before claiming the entire suite passed.

Final observed results: the combined run completed with 34 passing tests and one Act V audit failure caused by `ECONNRESET` while fetching the scene module. The isolated Act V rerun passed (2.0m), recorded in `/tmp/monkey-hotspot-act5-recheck.log`. TypeScript/build and `git diff --check` passed. Thus all selected tests passed across these runs, not in one uninterrupted run. Playwright clears previous output when starting a new suite; the last run's screenshot directory contains Act V only. Run the complete audit again to regenerate all acts' captures together.