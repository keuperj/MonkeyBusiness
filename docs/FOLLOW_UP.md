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
