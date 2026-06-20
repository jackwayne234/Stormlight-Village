# Stormlight Village

Stormlight Village is a cozy 2D side-scrolling game concept about a young apprentice civil engineer repairing a whimsical forest village after a heavy storm.

The current deliverable is a first playable chapter pass: five walk-around scenes connected by automatic repair points, robot guidance, a circuit repair puzzle, and a short reward beat after each fix.

## Open Locally

Run a local web server from this folder, then open the local address in a browser.

```bash
python3 -m http.server 5174
```

Then open:

```text
http://localhost:5174/
```

Standalone repair puzzle prototype:

```text
http://localhost:5174/repair-puzzle.html
```

Second walk-around scene:

```text
http://localhost:5174/glow-grove.html
```

Third walk-around scene:

```text
http://localhost:5174/mossline-switchyard.html
```

Fourth walk-around scene:

```text
http://localhost:5174/stormedge-rise.html
```

Fifth walk-around scene:

```text
http://localhost:5174/beacon-hill.html
```

Sixth standalone walk-around scene:

```text
http://localhost:5174/rainbarrel-row.html
```

Development replay helpers:

```text
http://localhost:5174/index.html?resetProgress=1
http://localhost:5174/index.html?resetProgress=1&startAtRepair=1
```

## Project Notes

- [project-index.md](project-index.md)
- [25 questions to guide the project.txt](25%20questions%20to%20guide%20the%20project.txt)
- [chunks/05-first-mockup-build.md](chunks/05-first-mockup-build.md)

## Current Code Shape

- `src/app/main.js`: shared browser app startup for walk-around scenes.
- `src/app/progress.js`: saved progress applied to scenes.
- `src/game/sceneSequence.js`: scene order and page mapping.
- `src/interactions/repairFlow.js`: generic repair prompts, puzzle overlay, completion saves, reward timing, and scene handoff.
- `src/repairs/repairEffects.js`: named visual repair effects.
- `src/repairs/repairReactions.js`: scene reward bubbles and robot reaction positioning.
- `src/render.js`: shared canvas render coordinator.
- `src/sceneRenderers/`: scene-specific set piece drawing modules.
- `src/scenes/sceneFactory.js`: chooses which scene data to load.
- `src/scenes/villageScene.js`: Stormlight Village scene data.
- `src/scenes/glowGroveScene.js`: Glowfen Grove scene data.
- `src/scenes/mosslineSwitchyardScene.js`: Mossline Switchyard scene data.
- `src/scenes/stormedgeRiseScene.js`: Stormedge Rise scene data.
- `src/scenes/beaconHillScene.js`: Beacon Hill Signal Tower scene data.
- `src/scenes/rainbarrelRowScene.js`: Rainbarrel Row scene data.
- `src/player/playerInput.js`: left/right keyboard input.
- `src/player/playerState.js`: player position, facing, movement speed, and camera follow.
- `src/audio/audioManager.js`: shared audio playback, volume buses, cooldowns, and generated fallback sounds.
- `src/audio/soundCatalog.js`: sound IDs, audio files, categories, and tuning values.
- `src/audio/weatherAudio.js`: connects storm events to thunder playback.
- `src/storm/stormController.js`: rare lightning event timing.
- `src/puzzles/repairPuzzle.js`: standalone repair puzzle state and connection logic.
- `src/puzzles/repairPuzzleRenderer.js`: canvas rendering for the repair puzzle panel.

## Current Controls

- `A` or Left Arrow: walk left.
- `D` or Right Arrow: walk right.
- Walk close to a broken infrastructure point to open its repair puzzle automatically.
- After a repair, press Space, Enter, E, or walk right when the continue prompt appears.
