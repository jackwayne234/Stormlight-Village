# Chunk 03 - Code Structure

Status: Ready

Goal: Plan the expandable browser code structure before implementation.

Why this matters: Even the visual mockup should be organized like the seed of a real game so future gameplay can be added without a rewrite.

## Recommended Files

- `index.html`: page shell and app mount.
- `styles.css`: full-screen layout and visual presentation around the canvas.
- `src/app/main.js`: starts the shared browser app for walk-around scenes.
- `src/app/progress.js`: applies saved progress such as repaired village lights.
- `src/config.js`: title, canvas size, colors, tuning values, and future asset paths.
- `src/scenes/sceneFactory.js`: loads the correct scene data for the current page.
- `src/scenes/villageScene.js`: scene data for Stormlight Village.
- `src/scenes/glowGroveScene.js`: scene data for Glowfen Grove.
- `src/scenes/mosslineSwitchyardScene.js`: scene data for Mossline Switchyard.
- `src/interactions/repairFlow.js`: generic repair interaction conductor.
- `src/repairs/repairEffects.js`: named scene repair effects.
- `src/repairs/repairReactions.js`: converts scene repair reaction data into bubble positions.
- `src/render.js`: shared render coordinator for canvas scenes.
- `src/sceneRenderers/`: scene-specific drawing modules for special set pieces.
- `src/sceneRenderers/bridgeRenderer.js`: Glowfen Grove footbridge drawing.
- `src/sceneRenderers/switchyardRenderer.js`: Mossline Switchyard poles, lines, boxes, and gate.
- `src/sceneRenderers/stormRidgeRenderer.js`: Stormedge Rise posts and gauge.
- `src/sceneRenderers/beaconHillRenderer.js`: Beacon Hill tower, flags, shed, and cables.
- `src/sceneRenderers/rainbarrelRowRenderer.js`: Rainbarrel Row gutters, barrels, channels, and drain.
- `src/audio/audioManager.js`: shared sound playback, unlock, volume buses, cooldowns, and fallbacks.
- `src/audio/soundCatalog.js`: sound IDs, file paths, categories, volumes, and tuning.
- `src/audio/weatherAudio.js`: weather-specific audio behavior such as thunder after lightning.
- `src/player/playerInput.js`: left/right keyboard input.
- `src/player/playerState.js`: player position, facing direction, movement speed, and camera follow.
- `src/storm/stormController.js`: rare lightning event timing.
- `src/entities/character.js`: apprentice civil engineer drawing/data.
- `src/entities/robot.js`: floating AI companion robot drawing/data.
- `src/entities/waterWheel.js`: damaged water wheel generator drawing/data.
- `src/entities/props.js`: village props, plants, lamps, puddles, branches, and background details.
- `assets/`: future PNGs, animations, sounds, and generated art.
- `assets/audio/weather/`: thunder, rain, wind, and future storm sounds.
- `assets/audio/archive/`: old or unused audio experiments.

## Coding Direction

Use plain browser JavaScript with modules and canvas. Keep the first version light, readable, and expandable.

Gameplay and rendering files should call the audio manager by sound ID, not by direct file path. For example: `audio.play("collect.gear")` or `audio.play("weather.thunder.roll")`.

Scene files should own scene-specific repair data: prompt text, robot guidance, reward reactions, effect name, and next scene. Shared systems should read that data instead of hardcoding scene dialogue.

The main renderer should stay a coordinator. Shared world pieces stay in `src/render.js` and reusable entities stay in `src/entities/`; special scene set pieces belong in `src/sceneRenderers/`.

## Notes

Do not overbuild an engine yet. The structure should make room for gameplay later, but the first output is still only a visual mockup.

## Next Steps

- Create the browser files.
- Keep rendering code separated from scene data.
- Add a short README after the mockup exists.
