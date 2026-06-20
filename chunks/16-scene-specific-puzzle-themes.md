# Chunk 16: Scene-Specific Puzzle Themes

## Goal

Make repair puzzles feel connected to each scene without building a separate puzzle engine for every repair.

The first version keeps the same tile-rotation puzzle mechanics, but each scene can now choose a visual and textual theme.

## Current Build

- `src/puzzles/repairPuzzle.js` now supports puzzle themes.
- `src/puzzles/repairPuzzleRenderer.js` reads the puzzle theme for:
  - title
  - instructions
  - objective label
  - completion label
  - success message
  - board colors
  - side illustration
- Each scene repair target can set `puzzleTheme`.

## Current Themes

| Scene | Theme ID | Puzzle Title |
| --- | --- | --- |
| Stormlight Village | `lantern-circuit` | Lantern Circuit Repair |
| Rainbarrel Row | `water-routing` | Stormwater Routing |
| Glowfen Grove | `glow-bridge` | Glow Bridge Circuit |
| Mossline Switchyard | `junction-line` | Junction Line Repair |
| Stormedge Rise | `storm-gauge` | Storm Gauge Calibration |
| Beacon Hill Signal Tower | `beacon-signal` | Beacon Signal Tune |

## Rainbarrel Row Theme

Rainbarrel Row now feels like a water-routing repair:

- puzzle title: "Stormwater Routing"
- instructions describe guiding runoff from barrels into the storm drain
- board uses cooler water colors
- side art shows a rain barrel, runoff channel, and storm drain
- success message says the runoff was redirected

## Future Improvements

- Give each theme a different board layout.
- Increase difficulty scene by scene.
- Add unique tile shapes for water, signal, plant, and gauge puzzles.
- Add small sound cues for each puzzle theme.
