# Chunk 13 - Puzzle Progression

Status: First pass implemented

Goal: Define how repair puzzles become gradually harder from scene to scene.

Why this matters: The game can stay cozy while still giving the player a sense of growth. Each scene should teach or extend one repair idea.

## Core Direction

Each scene can have a repair notice and an on-site repair puzzle. Puzzles should become harder slowly, adding one new idea at a time.

No timers. No harsh failure. No combat pressure.

## Difficulty Curve

### 1. Stormlight Village - Water Wheel Generator

Difficulty: Very easy

Puzzle idea: Lantern Circuit Repair

- 3-by-3 circuit grid.
- Rotate a few simple tiles.
- One clear path from seed battery to generator.
- Teaches the basic repair puzzle language.

### 2. Glowfen Grove - Glow Plant Bridge

Difficulty: Easy

Puzzle idea: Light the stepping plants

- Use a slightly larger or more branching circuit.
- The player powers two glow plant nodes instead of one output.
- Teaches that one repair can have multiple endpoints.

### 3. Mossline Switchyard - Junction Box

Difficulty: Medium

Puzzle idea: Restore the line

- Connect input to output through switch tiles.
- Some tiles may split power.
- One or two inactive junction boxes must be connected.
- Teaches switches, branches, and line routing.

### 4. Stormedge Rise - Storm Gauge

Difficulty: Medium-plus

Puzzle idea: Stabilize the gauge

- Circuit puzzle plus wind interference concept.
- Certain tiles may rotate back or pulse unless locked.
- Keep it gentle: no timer, but the puzzle feels more unstable.
- Teaches repairing in rough weather.

### 5. Beacon Hill - Signal Tower

Difficulty: Hardest of the first set

Puzzle idea: Align the beacon

- Connect power to the beacon and align a few lens/reflector pieces.
- Could combine circuit routing with simple rotation alignment.
- Success sends a warm signal light across the hill.
- Teaches a two-step repair: power plus alignment.

## Design Rule

Only add one new puzzle idea per scene.

Examples:

- Scene 1: basic circuit.
- Scene 2: multiple outputs.
- Scene 3: switch routing.
- Scene 4: unstable/weather-affected pieces.
- Scene 5: circuit plus lens alignment.

## Feedback

Each completed puzzle should visibly improve the scene:

- Lights turn on.
- Machines start moving.
- Plants glow.
- Cables pulse.
- Beacon shines.
- Robot celebrates.

## Notes

Harder should mean more interesting, not more punishing. The player should always feel like a thoughtful repair apprentice, not like they are being tested under pressure.

## Implemented First Pass

The puzzle system now supports scene-specific 3-by-3 layouts, multiple output nodes, and a tee/splitter tile.

Shortest solution lengths by theme:

| Scene | Theme | Shortest solution |
| --- | --- | --- |
| Stormlight Village | `lantern-circuit` | 1 rotation |
| Glowfen Grove | `glow-bridge` | 5 rotations |
| Mossline Switchyard | `junction-line` | 7 rotations |
| Stormedge Rise | `storm-gauge` | 5 rotations |
| Beacon Hill | `beacon-signal` | 7 rotations |
| Rainbarrel Row | `water-routing` | 6 rotations |

This keeps the first repair very approachable while giving later scenes more distinct shapes:

- Glowfen Grove branches to two glow endpoints.
- Mossline Switchyard uses a snaking junction route.
- Stormedge Rise is a brisk weather-gauge line.
- Beacon Hill branches the repaired signal to two endpoints.
- Rainbarrel Row splits stormwater into two safe runoff channels.
