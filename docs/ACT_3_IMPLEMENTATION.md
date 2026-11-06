# Act III — The People Who Kept Quiet

Implemented 6 November 2026. Entry: `/act3.html`, the completed Act II ending, or **Continue Act III** on the title screen after Act II completion / an Act III autosave.

## Playable route

1. Read Nell and Mara’s full confession; acknowledge it and take the tracing.
2. Ask Quibble and Fine Print to accept the named harbour watch.
3. At Outer Landing inspect the departure board, fixed transit and float. Compare the west service approach, warehouse/lighthouse transit and today’s west-running ebb.
4. Meet Orin at Blind Inlet, review the checklist and confirm the voyage.
5. Read the gallery system diagram and recorder collar label. Select SERVICE, fit two tabs / blue triangle, return to RUN and print the witnessed copy. Select only the three supported claims.
6. Read the overlook procedure. On the disconnected board choose Watch C everywhere, LOW / MIDDLE / MIDDLE, and LOCAL READY. Request acknowledgements, isolate MODEL CENTRAL and run. Editing any selector invalidates acknowledgements and isolation.
7. Synthesize the first three supported actions. Return with the plan, confirm the voyage and continue through the safe return to Blind Inlet and walk to Repair Quay.

Act IV is explicitly unavailable. Completing this act does not alter live gates, prepare remote stations or execute the pending dispatch order. Continued exploration is available.

## State and accessibility

- Separate version-3 autosave/manual save; earlier chapter saves are never written.
- Completed Act II imports its transcript and lint ownership. Direct chapter entry supplies canonical completed-Act-II inventory.
- Original survey, pencil, hook, inlet drawing and receipt remain owned. The delivered copy, mooring rope and fitted crank do not respawn as pickups.
- Invalid autosaves offer a backup/recovery choice rather than silently replacing progress.
- Dialogue remains fully readable with sound muted. Buttons expose every scene target; selectors and checkboxes have labels. No puzzle uses timing or colour alone.
- Travel overlays require Continue; reduced-motion walking is instant. Harbour travel uses the existing traced pedestrian routes; voyages use the new voyage illustration.

## Media and maintenance

- ElevenLabs speech and ambient audio are static files; credentials are not shipped. Generation is resumable using `/home/keuper/Projekte/MonkeyBusiness/scripts/generate-act3-audio.mjs`.
- Dialogue extraction is chapter-specific: `/home/keuper/Projekte/MonkeyBusiness/scripts/extract-act3.mjs`. Runtime handles conditional variants; no Act II extractor is run over the Act III plan.
- `/home/keuper/Projekte/MonkeyBusiness/tests/act3.spec.ts` covers progression validation and a normal-controls muted/reduced-motion walkthrough, including repair reload and stale acknowledgements.
- The chapter cache manifest includes required shared artwork/audio and Act III media, rather than downloading all earlier dialogue.

## Scope notes

The implemented chapter uses a single full-body Bram sprite, static close-up illustrations with accessible live controls, and a voyage illustration rather than a separately walkable ship deck. There is no claim of a measured 60–90-minute playtime. Bram uses an existing licensed ElevenLabs voice with a distinct delivery configuration, not a newly cloned voice.

## Validation results

- Production build and TypeScript check pass; Vite retains its large shared-bundle warning.
- All five Act III tests pass: progression validation, invalid-autosave recovery, complete normal-controls walkthrough, asset integrity/dialogue coverage, and browser audio decoding.
- Final media set: 222 generated speech entries and one new ambience, plus reused effects; eleven new painted image files including the initial service landing.
- Act II end-to-end, Act II media decoding, chapter-cache retry/offline-range tests, title-screen tests and sound-default tests passed in targeted runs.
- A broader regression attempt was not fully green. The separately rerun Act I reduced-motion arrival test still times out waiting for its arrival overlay to dismiss within 15 seconds. Act II arrival passes. This issue was not changed or suppressed as part of Act III, and a complete passing full-suite run is not claimed.