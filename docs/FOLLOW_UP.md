# Pending follow-up

## Intro narration — waiting for ElevenLabs credits

The user explicitly deferred audio generation until new credits are available. Do not retry API calls or poll quota until the user says credits have been replenished. Continue independently authorized work meanwhile.

Three Nell lines remain ungenerated: `prologue1`, `prologue2`, and `prologue3` in [src/intro-lines.json](../src/intro-lines.json). Use Nell’s existing Alice voice and the settings already configured in `scripts/audio-plan.mjs`. The last attempt returned `401 quota_exceeded` before generating these clips. Existing game audio remains functional; the intro currently uses subtitles and optional harbour ambience.

When credits are available:

1. Run `npm run audio:generate`. The generator already includes the intro script and reuses cached recordings; do not regenerate existing assets unnecessarily. It reads the local ElevenLabs key without exposing it to the client.
2. Verify that all three lines have entries in `src/audio-manifest.json`, MP3 files in `public/audio/`, and provenance records. Expected combined total: 185 speech clips and 10 effects if no other dialogue changes have been made.
3. Run the build and relevant audio/intro browser tests. Check narration timing, pause/resume, sound toggle and Skip intro: skipping must stop narration before the tavern dialogue begins.
4. Remove the pending-narration notices from README.md and ASSETS.md, and mark this follow-up complete.

## Other requested updates

Completed: painted splash, map-backed start/load menu, three-scene animated intro with skip and pause controls, and traced map travel routes. These changes have passed build and relevant browser checks. No other unimplemented task is currently assigned.
