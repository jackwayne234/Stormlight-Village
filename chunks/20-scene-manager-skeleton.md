# Chunk 20 - Scene Manager Skeleton

Status: First pass complete

Goal: Start the single-page app refactor without changing current page-based scene behavior.

## What Changed

- Added scene panel metadata to `src/game/sceneSequence.js`.
- Added `src/app/scenePanel.js` to update the visible scene title, eyebrow, description, document title, and app shell label from scene metadata.
- Added `src/app/sceneManager.js` as the first scene lifecycle owner.
- Updated `src/app/main.js` so app startup asks the scene manager to create:
  - current scene
  - player
  - repair flow
  - storm controller
- Kept current behavior intact: each HTML page still loads its own scene through `body[data-scene]`, and repair handoff still uses page navigation for now.

## Why This Step Is Safe

This chunk does not switch scenes in-app yet. It only moves startup responsibility behind a small manager so later chunks have somewhere stable to put scene switching.

## Next Refactor Chunk

Refactor repair handoff so `createRepairFlow` accepts an `onSceneComplete(nextScene)` callback.

At first, that callback should still navigate to the next page. This preserves behavior while removing direct page-navigation knowledge from `repairFlow`.
