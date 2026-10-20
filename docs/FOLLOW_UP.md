# Follow-up status

## Intro narration — completed 19 October 2026

The user confirmed that ElevenLabs credits were replenished and authorized completion. All three Nell lines (`prologue1`, `prologue2`, `prologue3`) in [src/intro-lines.json](../src/intro-lines.json) are now generated using Nell’s existing Alice voice and configured delivery settings.

`npm run audio:generate` generated only the three missing recordings and reused existing cached assets. The manifest and provenance now include 185 speech clips and 10 effects. No audio work remains pending.

Verification completed:

- Production build passed.
- All 195 shipped audio files decoded in Chromium.
- All three intro recordings played to completion during natural intro progression.
- Pause/resume and sound toggling passed actual audio playback checks.
- Skip intro stopped narration before tavern dialogue began.
- API credentials remain excluded from Git and client output.

README.md and ASSETS.md now describe the completed voiced intro. Enable Sound on the splash or start menu to hear it.

## Other requested updates

Completed: painted splash, map-backed start/load menu, three-scene animated intro with skip and pause controls, and traced map travel routes. No other unimplemented task is currently assigned.

## Act II — implemented 20 October 2026

Act II now has six new illustrated rooms, returning harbour locations, its investigation/puzzle chain, a deliberate survey handover, and a playable chapter ending. All 288 Act II speech clips and nine new effects have been generated; no ElevenLabs work remains pending. Built-in image generation produced twelve shipped artwork files including room-state variants, sprites, emblems and loading illustration.

The newspaper pencil interaction adds a Zak McKracken-style situational Easter egg; the repaired household also includes an optional chair-reservation joke. Start-page act/room presets are editable in `public/debug-start.json` and can be disabled with `enabled: false`.

Implementation, save keys and regeneration instructions: [ACT_2_IMPLEMENTATION.md](ACT_2_IMPLEMENTATION.md). Act III remains a future chapter; Act II ends with its title and allows continued exploration.
