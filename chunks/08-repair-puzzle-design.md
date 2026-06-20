# Chunk 08 - Repair Puzzle Design

Status: Prototype started

Goal: Design the first water wheel repair puzzle for Stormlight Village.

Why this matters: The repair puzzle is the clearest expression of the little civil engineer fantasy. It should make fixing the village feel satisfying without breaking the cozy pace.

## Puzzle Name

Lantern Circuit Repair

## Core Idea

When the player has collected the needed repair parts and walks close to the damaged water wheel generator, a small repair panel opens. The player completes a simple circuit so lantern energy can flow from the glowing seed battery into the generator.

## Trigger

- The player receives a notice that the water wheel generator is down or offline.
- The player travels to the water wheel scene.
- When the player reaches the damaged water wheel, the repair panel appears.
- If the player reaches the water wheel before receiving the notice, the robot can give a gentle hint that the machine needs diagnostics.

## Puzzle Interaction

Recommended first version:

- A small 3-by-3 repair panel appears.
- Some tiles contain circuit paths, pipes, wires, or gear conduits.
- The player rotates tiles until a path connects the glowing seed battery input to the generator output.
- No timer.
- No failure state.
- The player can reset or keep rotating until it works.

## Controls

- Move cursor or selection between tiles with arrow keys or WASD.
- Press `E` or `Space` to rotate the selected tile.
- Press `Esc` to close the panel if needed.

Mouse support can be added later:

- Click a tile to rotate it.

## Visual Direction

The panel should feel handmade and practical, not like a sci-fi hacking screen.

Visual cues:

- Wood and brass frame.
- Copper wire paths.
- Small gear-shaped connectors.
- A glowing seed battery socket on the left.
- Generator output socket on the right.
- Lantern light gently pulses through connected pieces.
- The floating AI robot hovers nearby and reacts as progress is made.

## First Puzzle Layout

Use a simple layout with only one obvious solution.

Concept:

```text
[ Start ] [ Turn ]  [ Blank ]
[ Blank ] [ Turn ]  [ Turn  ]
[ Blank ] [ Line ]  [ Output]
```

The player rotates the turn and line tiles to make one connected path from Start to Output.

## Feedback

Good puzzle feedback matters more than difficulty.

- Connected pieces glow softly.
- Incorrect pieces stay dim.
- The robot chirps or smiles when a correct connection extends the path.
- When the full path connects, the circuit pulses from left to right.
- The panel locks in, the water wheel starts moving, village lights turn on, and the gate opens.
- In the standalone prototype, the small house lights turn on after the puzzle is completed to preview that village-restoration payoff.
- The standalone prototype stores completion locally. When the player exits back to the village mockup, the background house and lamp lights come on there too.

## Difficulty

Very easy for the first version.

The goal is not to stump the player. The goal is to make the repair feel tactile and intentional.

## Audio Notes

Future sounds:

- Soft tile rotate click.
- Copper connection spark.
- Robot happy chirp.
- Low generator hum starting.
- Water wheel wooden creak.
- Village lights turning on.
- Repair success chime.

These should later be added to `src/audio/soundCatalog.js` as sound IDs, not hard-coded into puzzle logic.

## Implementation Notes

Keep puzzle logic separate from rendering.

Recommended future files:

- `src/puzzles/repairPuzzle.js`: puzzle state, tile rotation, connection checks.
- `src/puzzles/repairPuzzleRenderer.js`: panel drawing.
- `src/interactions/waterWheelRepair.js`: proximity trigger and completion handoff.

Standalone prototype files:

- `repair-puzzle.html`: browser page for testing the puzzle by itself.
- `repair-puzzle.css`: standalone page layout.
- `src/puzzleDemo/main.js`: input handling and animation loop for the standalone puzzle.

The gameplay code should only need to know:

- Has the repair notice been received?
- Is the player near the water wheel?
- Is the repair puzzle complete?

## Open Questions

- Should the repair panel pause the game scene behind it?
- Should the robot give one-line text hints or only visual/audio reactions?
- Should the first puzzle use keyboard only, or keyboard plus mouse from the start?

## Next Steps

- Try the standalone repair puzzle prototype at `http://localhost:5174/repair-puzzle.html`.
- After approval, update Chunk 07 with this puzzle as the first playable repair interaction.
