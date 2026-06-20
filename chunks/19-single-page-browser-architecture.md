# Chunk 19 - Single-Page Browser Architecture

Status: Planned

Goal: Convert Stormlight Village from separate scene pages into one persistent browser game shell so global audio, transitions, scene state, and pacing can live independently from individual scenes.

## Why This Matters

The current prototype works, but each scene is its own HTML page:

- `index.html`
- `glow-grove.html`
- `mossline-switchyard.html`
- `stormedge-rise.html`
- `beacon-hill.html`
- `rainbarrel-row.html`

Moving between scenes currently reloads the browser page. That is fine for a first prototype, but it makes weather audio fragile because rain and thunder restart every time the page changes. It also makes transitions harder because the app disappears and reloads instead of smoothly moving from one scene to the next.

The next architecture goal is to keep one browser app alive for the whole chapter.

## Current Inventory

What we already have:

- `src/app/main.js` owns app startup, render loop, input, audio, storm controller, player, and repair flow.
- `src/scenes/sceneFactory.js` can create scene data by scene id.
- `src/game/sceneSequence.js` defines the route order and current HTML page for each scene.
- `src/interactions/repairFlow.js` owns repair proximity, scan, puzzle overlay, completion, rewards, and currently uses `window.location.href` for scene handoff.
- `src/audio/audioManager.js`, `src/audio/weatherAudio.js`, and `src/storm/stormController.js` handle rain/thunder and lightning, but they restart whenever the page reloads.
- Progress is already saved by repair id in `localStorage`.
- Scene content is mostly data-driven in `src/scenes/*.js`, which is good for a single-page app.

## Target Architecture

One persistent app shell should own:

- the canvas
- the scene panel
- the render loop
- player input
- global audio
- global weather ambience
- the current scene id
- scene transitions
- repair flow lifecycle

Scene changes should happen inside JavaScript rather than by navigating to a new HTML page.

Proposed file layout:

```text
index.html
src/app/main.js
src/app/gameState.js
src/app/sceneManager.js
src/app/transitionManager.js
src/audio/audioManager.js
src/audio/weatherAudio.js
src/scenes/*
src/game/sceneSequence.js
src/interactions/repairFlow.js
```

## Target Responsibilities

### `main.js`

Starts the app once:

- creates the canvas context
- creates global audio once
- creates input once
- creates the scene manager
- creates the transition manager
- runs the animation loop

### `gameState.js`

Stores app-level state:

- current scene id
- current scene object
- current player object
- route progress
- whether a transition is active

### `sceneManager.js`

Owns scene loading and switching:

- creates scenes with `createScene(sceneId)`
- applies saved progress
- creates/reset player state for the scene
- creates scene-specific storm controller
- creates repair flow for the current scene
- exposes `goToScene(sceneId)`

### `transitionManager.js`

Owns visual transitions:

- displays "Next: Glowfen Grove" style title cards
- fades out and in
- delays scene swap until the transition beat lands
- avoids full browser page reload

### `repairFlow.js`

Should stop navigating directly.

Instead of:

```js
window.location.href = getScenePage(nextScene);
```

It should call a provided callback:

```js
onSceneComplete(nextScene);
```

That callback can be supplied by `sceneManager` or `main.js`.

### `weatherAudio.js`

Should become global chapter ambience:

- rain loop starts once and keeps running
- thunder can happen on chapter/scene transitions
- scene-specific weather can adjust intensity later, but should not recreate the audio system

## Migration Plan

Do this in small chunks. Avoid a big-bang refactor.

### Chunk A - Document and Prepare

- Keep current behavior unchanged.
- Add this architecture plan.
- Identify all places that assume page navigation.

### Chunk B - Add Scene Metadata for Panels

- Move each page's title, eyebrow, and description into scene data or route metadata.
- Let JavaScript update `.scene-panel`.
- Keep old HTML pages working during this step.

### Chunk C - Add `sceneManager`

- Create `src/app/sceneManager.js`.
- It should load the starting scene from `document.body.dataset.scene` or a URL query.
- It should create scene, player, storm controller, and repair flow for the current scene.
- Keep existing page navigation for handoff at first.

### Chunk D - Refactor Repair Handoff

- Add `onSceneComplete(nextScene)` to `createRepairFlow`.
- Replace direct `window.location.href` with that callback.
- Initially the callback can still navigate to preserve behavior.
- This makes repair flow independent from pages.

### Chunk E - Switch Scenes In-App

- Change `onSceneComplete(nextScene)` so it calls `sceneManager.goToScene(nextScene)`.
- Update the canvas scene without reloading the page.
- Recreate scene-specific repair flow and storm controller.
- Keep global audio alive.

### Chunk F - Add Transition Screen

- Add `transitionManager`.
- Between scenes, show a short card:
  - "Repair complete"
  - "Next: Glowfen Grove"
  - optional one-line robot note
- Swap scenes after the transition.

### Chunk G - Browser URL Compatibility

- Decide what old pages should do:
  - Option 1: keep them as direct test entry pages.
  - Option 2: redirect all scene pages into `index.html?scene=stormedge-rise`.
- Recommended: keep old pages temporarily while refactoring, then redirect later.

### Chunk H - Full Route QA

Test:

- clean start from `index.html?resetProgress=1`
- start at each repair target
- all six repairs complete
- no audio restart between scenes
- rain continues across scene changes
- thunder/lighting still feels timely
- chapter-complete ending still appears

## Success Criteria

The refactor is done when:

- the six-scene route can be completed without any full page reload
- rain ambience persists across scene changes
- scene transitions feel intentional
- old direct scene test URLs still have a reasonable migration path
- repair progress and chapter ending still work

## Design Rule

Do not change the game design while doing this refactor.

The refactor should preserve the current six-scene chapter and make it technically cleaner. New scenes, new mechanics, and larger story changes should wait until after the single-page shell is stable.
