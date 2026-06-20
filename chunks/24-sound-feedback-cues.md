# Chunk 24 - Sound Feedback Cues

Status: First pass complete

Goal: Add small generated sound cues for repair interactions and scene transitions.

## What Changed

- Added generated sound definitions in `src/audio/soundCatalog.js`:
  - `ui.scan.chirp`
  - `ui.repair.success`
  - `ui.puzzle.rotate`
  - `weather.transition.thunder`
- Extended `src/audio/audioManager.js` with synthesized cue generators:
  - robot scan chirp
  - repair success chime
  - tile rotate click
  - transition thunder using the existing generated thunder path
- Fixed the cooldown logic so a sound that has never played is not suppressed during the first seconds after page load.
- Threaded the shared audio manager into `sceneManager` and `repairFlow`.
- Added cue triggers:
  - scan chirp when repair analysis starts
  - success chime when the puzzle enters its repair-complete hold
  - tile click when a puzzle tile rotates by keyboard or pointer
  - transition thunder when the next-scene overlay starts
- Bumped all scene page module cache tags to `v=20260620-sound-cues`.

## Why This Step Matters

The game now gives feedback at the exact points where the player expects the world to respond: inspection, puzzle manipulation, repair completion, and movement into the next scene. The cooldown fix also makes the global weather layer more reliable immediately after page load.

## Verification

- Syntax checked the touched audio, repair flow, scene manager, and app entry files.
- Confirmed the existing local preview on port `5186` is serving the new cache tag.
- Ran a generated-cue smoke test with a fake audio context.
- Ran a sound-wiring sanity check for scan start and transition thunder.

## Next Refactor Chunk

Play through the six-scene route and tune the feel:

- cue volumes
- transition duration
- reward timing
- puzzle click frequency
- rain/thunder balance
