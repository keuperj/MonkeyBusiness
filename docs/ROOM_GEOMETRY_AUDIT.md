# Character scale and room-floor audit

## Scope and limitations

The audit covers all **51 act/room combinations** exposed by the room debug entries: Act I 3, Act II 9, Act III 13, Act IV 10 and Act V 16. These share 16 distinct room layouts. The standalone tavern prototype also now uses the shared floor and actor layout. The standalone bridge duel is a separate fixed-stage presentation, not a freely walkable chapter room.

**Visual sign-off remains outstanding.** Screenshot files were successfully captured, but the image-reading tool returned “media omitted: invalid or exceeds size limit”, including for reduced-size previews. Therefore this report does not claim a completed visual comparison of every polygon or character against the painted background. Geometry is conservative, based on existing scene positions, documented room objects, background-generation descriptions, and known foreground/water boundaries. A human should inspect the plain and green-overlay screenshots before treating the art alignment as final. Solved inlet/hall artwork shares the same conservative foreground lane; not every story-dependent cast combination is separately pictured.

## Changes

- `/home/keuper/Projekte/MonkeyBusiness/src/walkable-floor.ts`: replaces the common rectangular clamp with 16 explicit convex foreground polygons, safe spawns, per-room human height and dry NPC placements. Invalid/old positions project onto the nearest allowed edge. Unknown rooms fail explicitly rather than silently inheriting an unsafe default.
- `/home/keuper/Projekte/MonkeyBusiness/src/actor-layout.ts`: consistent human scale, source-image aspect ratios, gentle near/far perspective and foot-based depth sorting. Pip remains slightly shorter; Fine Print uses a separate bird scale and perch.
- All five chapter scenes use shared geometry and actor layout. Rendered NPC hotspot rectangles follow their actual displayed positions and dimensions. Hotspots and optional outlines remain above depth-sorted figures.
- Act I duel figures are scaled to the bridge and keep feet on deck; idle Quibble no longer has a downward feet offset. The standalone tavern also projects restored positions and uses the same character scale.
- Existing saves require no format migration. Station/puzzle state and background assets are unchanged.

## Room policy

| Room | Foreground human height at midpoint (scene pixels) | Excluded areas |
| --- | ---: | --- |
| Tavern | 420 | Chest, bar and rear tables |
| Bridge | 370 | Near water edge; feet restricted to y=710–745 |
| Outer Landing | 420 | Right-hand float/buoy water |
| Repair Quay | 430 | Right harbour and personnel doorway |
| Quay Quill | 425 | Proof table and press |
| Breakfast Hall | 435 | Table, controller and sorter |
| Workshop | 430 | Model bench and drawing rack |
| Blind Inlet | 420 | Right-hand channel and boat |
| Survey Office | 430 | Desk and rear equipment |
| Service Landing | 405 | Left wet stair and right berth |
| Caretaker’s Gallery | 420 | Rear equipment |
| Recorder Room | 420 | Glazed live shaft and display furniture |
| Chart-drum Overlook | 410 | Far side of railing and drum |
| Dry Station Chamber | 425 | Wet culvert and local machinery |
| Command Floor | 435 | Far side of guard rail |
| Bypass Gallery | 430 | Guarded couplings |

Character height changes by ±6% across each room’s foreground depth. Convex floor polygons deliberately sacrifice some possible walking space to ensure that straight tweens cannot cross excluded areas between two permitted endpoints. Object interactions remain available through their hotspots and keyboard controls without requiring Nell to walk into the object.

## Reproducible checks

From `/home/keuper/Projekte/MonkeyBusiness`:

```sh
CHROMIUM_PATH=/usr/bin/chromium-browser npx playwright test tests/room-geometry.spec.ts
```

The test injects observation hooks into the development-server scene modules, not production code. It captures ordinary room views and green floor overlays, records actual actor dimensions, checks humanoid feet and sprite aspect ratios, and samples full animated walks toward four unsafe screen edges. Pure tests check projection, convex segments, finite defaults and explicit water/wet-stair/railing exclusions.

Outputs: `/home/keuper/Projekte/MonkeyBusiness/test-results/room-audit/`. Each act gets a JSON report, and each room gets plain and `-floor` PNGs. A copy of the initial passing audit is preserved at `/tmp/monkey-room-audit-captures/` because subsequent Playwright runs clear the test-results folder.

Initial all-room automated audit: **6 tests passed**, 51 room views plus 51 overlays. Production TypeScript/build passed with the existing large-bundle warning. The broader 36-test gameplay run passed 35 tests, including full normal-controls completion in all five acts; the remaining Act I bridge test failed because its observation route did not match Vite’s cache-busting query string. The test route now accepts that suffix and the isolated Act I bridge rerun passed. This was a test-observation failure, not evidence of water walking.

Further validation logs: `/tmp/monkey-room-audit.log`, `/tmp/monkey-floor-regressions.log`, `/tmp/monkey-floor-recheck.log`, `/tmp/monkey-floor-act1-recheck.log`, and `/tmp/monkey-floor-build.log`. Read final rerun results rather than assuming an earlier partial run passed.

**Final rerun:** `/tmp/monkey-floor-final-audit.log` reports **14 passed (8.0m)**: the complete 51-room audit with rendered NPC hitbox checks, all five actual bridge water-click tests, and the departure-board/recovery regressions. The current `/home/keuper/Projekte/MonkeyBusiness/test-results/room-audit/` contains the final screenshots and JSON reports. This establishes code and geometry consistency, not the outstanding subjective/art-boundary visual sign-off described above.