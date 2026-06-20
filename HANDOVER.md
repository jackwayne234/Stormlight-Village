# Stormlight Village Handover

Last updated: June 19, 2026

## Current State

Stormlight Village is a cozy 2D side-scrolling browser game prototype about a young apprentice civil engineer and a floating AI companion robot repairing storm-damaged village infrastructure.

The game currently has a playable six-scene chapter route with:

- left/right walking only
- robot guidance at scene start
- automatic repair interaction when close to a broken object
- a short robot scan transition before the puzzle opens
- themed tile-rotation repair puzzles
- visible scene repair payoffs
- reward speech bubbles after each repair
- scene-to-scene progression
- thunder/lightning ambience

GitHub repo:

```text
https://github.com/jackwayne234/Stormlight-Village
```

Latest pushed commit at handover:

```text
fe43df9 Add repair scan transition
```

## How To Run

From the project folder:

```bash
python3 -m http.server 5174
```

Then open:

```text
http://localhost:5174/index.html?resetProgress=1
```

The local session may already have a newer preview server running on `5178`:

```text
http://127.0.0.1:5178/index.html?resetProgress=1
```

## Current Route

1. Stormlight Village
   - Page: `index.html`
   - Repair: water wheel generator
   - Puzzle theme: `lantern-circuit`
   - Next: Glowfen Grove

2. Glowfen Grove
   - Page: `glow-grove.html`
   - Repair: glow plant bridge
   - Puzzle theme: `glow-bridge`
   - Next: Mossline Switchyard

3. Mossline Switchyard
   - Page: `mossline-switchyard.html`
   - Repair: switchyard junction line
   - Puzzle theme: `junction-line`
   - Next: Stormedge Rise

4. Stormedge Rise
   - Page: `stormedge-rise.html`
   - Repair: storm gauge
   - Puzzle theme: `storm-gauge`
   - Next: Beacon Hill

5. Beacon Hill Signal Tower
   - Page: `beacon-hill.html`
   - Repair: beacon signal
   - Puzzle theme: `beacon-signal`
   - Next: Rainbarrel Row

6. Rainbarrel Row
   - Page: `rainbarrel-row.html`
   - Repair: clogged storm drain
   - Puzzle theme: `water-routing`
   - Next: none; current chapter endpoint

## Useful Test URLs

Clean full-route start:

```text
http://localhost:5174/index.html?resetProgress=1
```

Spawn directly at a scene repair target:

```text
http://localhost:5174/index.html?resetProgress=1&startAtRepair=1
http://localhost:5174/glow-grove.html?resetProgress=1&startAtRepair=1
http://localhost:5174/mossline-switchyard.html?resetProgress=1&startAtRepair=1
http://localhost:5174/stormedge-rise.html?resetProgress=1&startAtRepair=1
http://localhost:5174/beacon-hill.html?resetProgress=1&startAtRepair=1
http://localhost:5174/rainbarrel-row.html?resetProgress=1&startAtRepair=1
```

Standalone puzzle prototype:

```text
http://localhost:5174/repair-puzzle.html
```

## Current Controls

- `A` or Left Arrow: walk left
- `D` or Right Arrow: walk right
- Walk close to a broken object to start the repair scan
- During a puzzle:
  - Arrow keys or WASD: move tile selection
  - Space or E: rotate selected tile
  - Click tile: rotate tile
- After repair reward prompt appears:
  - Space, Enter, E, or walk right: continue when there is a next scene

## Important Architecture

Main app startup:

- `src/app/main.js`
- `src/app/progress.js`

Scene data:

- `src/scenes/baseScene.js`
- `src/scenes/sceneFactory.js`
- `src/scenes/villageScene.js`
- `src/scenes/glowGroveScene.js`
- `src/scenes/mosslineSwitchyardScene.js`
- `src/scenes/stormedgeRiseScene.js`
- `src/scenes/beaconHillScene.js`
- `src/scenes/rainbarrelRowScene.js`

Scene order:

- `src/game/sceneSequence.js`

Shared rendering:

- `src/render.js`

Scene-specific set piece renderers:

- `src/sceneRenderers/bridgeRenderer.js`
- `src/sceneRenderers/switchyardRenderer.js`
- `src/sceneRenderers/stormRidgeRenderer.js`
- `src/sceneRenderers/beaconHillRenderer.js`
- `src/sceneRenderers/rainbarrelRowRenderer.js`

Player and entities:

- `src/player/playerInput.js`
- `src/player/playerState.js`
- `src/entities/character.js`
- `src/entities/robot.js`
- `src/entities/waterWheel.js`
- `src/entities/props.js`

Repair flow:

- `src/interactions/repairFlow.js`
  - proximity detection
  - robot scan transition
  - puzzle overlay
  - completion save
  - reward bubbles
  - scene handoff

Repair effects and reactions:

- `src/repairs/repairEffects.js`
- `src/repairs/repairReactions.js`

Puzzle system:

- `src/puzzles/repairPuzzle.js`
- `src/puzzles/repairPuzzleRenderer.js`
- `src/puzzleDemo/main.js`

Audio and storm:

- `src/audio/audioManager.js`
- `src/audio/soundCatalog.js`
- `src/audio/weatherAudio.js`
- `src/storm/stormController.js`

## Key Design Decisions

- Keep movement simple: left/right only, no jumping.
- Robot stays on the player character's right side.
- Repair interaction is automatic by proximity; no manual pickup system for now.
- Each scene has one broken infrastructure point.
- Puzzle mechanics currently stay the same, but each scene has its own puzzle theme.
- The repair reward matters: the world visibly changes and speech bubbles appear before moving on.
- Scene files own scene-specific content: guidance, repair target, puzzle theme, reward lines, effect name, and next scene.
- Shared systems own behavior: movement, rendering coordination, repair flow, puzzles, audio, weather, progress.

## Current Puzzle Themes

Defined in `src/puzzles/repairPuzzle.js`:

- `lantern-circuit`
- `water-routing`
- `glow-bridge`
- `junction-line`
- `storm-gauge`
- `beacon-signal`

Rainbarrel Row currently has the most distinct puzzle presentation: "Stormwater Routing" with barrel/drain art and water colors.

## Recent Work Completed

- Added Rainbarrel Row as Scene 06.
- Connected Beacon Hill to Rainbarrel Row.
- Pushed the game to GitHub.
- Split special scene art into `src/sceneRenderers/`.
- Added scene-specific puzzle themes.
- Added the robot scan transition before puzzles open.

Recent commits:

```text
fe43df9 Add repair scan transition
bd885df Move Rainbarrel Row after Beacon Hill
4a713dc Add scene-specific puzzle themes
c760680 Connect Rainbarrel Row into route
cca18d6 Initial Stormlight Village prototype
```

## Known Notes

- Browser module caching has been sticky during local testing. If changes do not appear, start a fresh local server on a new port or add a query string to the page URL.
- `?resetProgress=1` clears repair progress.
- `?startAtRepair=1` spawns the player at the scene repair target.
- The repo intentionally ignores `video-transcript.txt`, `.DS_Store`, and `assets/audio/archive/`.
- The latest playable route ends at Rainbarrel Row.

## Suggested Next Session

Good next moves:

1. Tune puzzle difficulty scene by scene.
   - Keep the theme system.
   - Give later scenes different starting rotations or more meaningful layouts.

2. Improve the chapter ending at Rainbarrel Row.
   - Add a final "Chapter Complete" moment after the storm drain repair.
   - Maybe show a warm robot summary.

3. Add a proper scene transition screen.
   - Between reward beat and next page, show a short title card or walking transition.

4. Add more sound cues.
   - scan chirp
   - puzzle rotate click
   - repair success chime
   - water flow payoff for Rainbarrel Row

5. Review the route pacing from start to finish.
   - Check whether Rainbarrel Row feels best as Scene 06 or should move earlier later.

Recommended first next task:

```text
Add a Chapter Complete reward moment after Rainbarrel Row.
```
