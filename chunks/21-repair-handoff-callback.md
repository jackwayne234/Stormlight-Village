# Chunk 21 - Repair Handoff Callback

Status: First pass complete

Goal: Remove direct page-navigation knowledge from the repair flow while preserving current behavior.

## What Changed

- `createRepairFlow` now accepts an `onSceneComplete(nextScene)` callback.
- `repairFlow` no longer imports `getScenePage` or sets `window.location.href` directly.
- `sceneManager` now supplies the current behavior as a callback:

```js
onSceneComplete: navigateToScenePage
```

- `navigateToScenePage(nextScene)` still uses `getScenePage(nextScene)` and `window.location.href`, so the route continues to work as a page-per-scene prototype.

## Why This Step Matters

This is the second safe slice of the single-page refactor. The repair system now says "this repair is complete, go to the next scene" without knowing whether that means page navigation, an in-app transition, or a future scene swap.

## Next Refactor Chunk

Change the callback implementation from page navigation to in-app scene switching.

Do that through `sceneManager.goToScene(nextScene)` and keep global audio alive.
