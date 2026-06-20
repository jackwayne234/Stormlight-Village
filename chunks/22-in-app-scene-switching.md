# Chunk 22 - In-App Scene Switching

Status: First pass complete

Goal: Swap from one scene to the next inside the running page so global browser systems, especially rain and thunder audio, can stay alive.

## What Changed

- `sceneManager.goToScene(nextSceneId)` now replaces the active scene, player, repair flow, and storm controller without assigning `window.location.href`.
- Repair completion now calls `goToScene` through the existing `onSceneComplete(nextScene)` callback.
- The browser address updates with `history.pushState(...)`, so the visible URL follows the current scene without forcing a reload.
- `repairFlow.destroy()` removes its key, pointer, and resize listeners and removes its overlay/prompt/bubble DOM before the next scene creates fresh UI.
- `createWeatherAudio` now reads the current scene through a getter, so the rain/thunder system can keep running while scenes change.
- Scene objects get a stable `scene.id` so thunder strike tracking can distinguish lightning in different scenes.
- `?startAtRepair=1` now only affects the initial loaded scene, not every later in-app scene.

## Why This Step Matters

This is the first real single-page behavior slice. The route can still be opened from any individual scene HTML file, but once the game is running, repair completion can advance the chapter without tearing down the whole browser page.

## Verification

- Syntax checked `main.js`, `sceneManager.js`, `repairFlow.js`, and `weatherAudio.js`.
- Served the updated page on a fresh local preview port and confirmed the new module cache tag is present.
- Ran a headless scene-swap sanity check that moves from Stormedge Rise to Beacon Hill, updates history, and confirms repair UI cleanup/recreate stays balanced.

## Next Refactor Chunk

Add a proper in-app transition between repairs and the next scene.

That can be a short title card, walking interstitial, or quiet weather beat so the scene swap feels intentional instead of instant.
