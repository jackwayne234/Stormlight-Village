# Chunk 23 - Scene Transition Beat

Status: First pass complete

Goal: Make in-app scene changes feel intentional instead of instant.

## What Changed

- Added `src/app/sceneTransition.js` as a small transition overlay helper.
- `sceneManager.goToScene(nextSceneId)` now:
  - pauses gameplay updates
  - shows a short next-scene title/weather overlay
  - swaps the scene, player, repair flow, and storm controller under cover
  - updates the browser address
  - resumes gameplay after the overlay fades
- `main.js` now skips player, storm, and repair updates while the transition is active, but it keeps rendering and weather audio alive.
- Added transition styling to `styles.css`.
- Bumped all scene page module cache tags to `v=20260620-scene-transition`.

## Why This Step Matters

The single-page route now has a visible breath between repairs and the next area. This keeps the persistent audio architecture while avoiding the feeling that the game teleports too abruptly after the reward prompt.

## Verification

- Syntax checked `main.js`, `sceneManager.js`, and `sceneTransition.js`.
- Confirmed the existing local preview on port `5186` is serving the new cache tag.
- Ran a timed scene-transition sanity check:
  - transition starts immediately
  - old scene remains during cover-in
  - next scene swaps under the overlay
  - transition clears after the fade
  - history updates to the next scene URL

## Next Refactor Chunk

Add scene-change sound support.

Good candidates:

- a soft transition thunder roll
- a repair success chime before the transition
- a small scan chirp when repair inspection starts
