# Chunk 07 - Playable Prototype Plan

Status: Later

Goal: Plan the first playable version after the visual mockup direction is approved.

Why this matters: Gameplay should come after the visual mood and composition feel right.

## Future Gameplay Direction

- Character selection for masculine-presenting or feminine-presenting apprentice engineer.
- Gentle side-scrolling movement. First movement implementation is left/right only with no jumping or vertical movement. Controls: `A`/Left Arrow and `D`/Right Arrow.
- Lantern reveal interaction.
- Repair requests can come in as notices that something is down, damaged, or offline.
- Instead of requiring loose part collection first, the player can travel to the affected scene and solve a repair puzzle directly at the broken object.
- Collectible parts can still exist later as optional secrets, upgrades, or bonus materials rather than the main required repair flow.
- Cute AI robot hints and reactions.
- Water wheel repair sequence triggered when the player gets close to the machine after receiving a repair notice.
- The water wheel should not auto-fix instantly. Getting close should open a simple repair puzzle or interaction.
- First repair puzzle direction: Lantern Circuit Repair, documented in [08-repair-puzzle-design.md](08-repair-puzzle-design.md).
- Puzzle difficulty should increase gradually by scene, documented in [13-puzzle-progression.md](13-puzzle-progression.md).
- Village lights turn on.
- Gate or path opens.
- Robot celebration.

## Interaction Direction

Use notices for main repair goals so the player understands what needs attention without needing a fetch quest every time. A notice might say the water wheel is offline, the switchyard line is down, or the beacon signal is weak. The player then goes to that scene and fixes the problem with a small puzzle.

Use automatic pickup only for optional loose objects so exploration stays smooth and cozy. The player should not need to press a button every time they find a bonus gear, coil, or seed battery. Instead, optional items can pop into the inventory with a small sound, glow, robot reaction, or UI pulse.

Use a small repair puzzle for the water wheel so the final repair feels earned. Recommended first puzzle: a simple connect-the-circuit panel where the player rotates a few pipe, wire, or gear pieces until lantern energy flows from the glowing seed battery into the generator. No timer, no pressure, just a satisfying civil-engineer repair moment.

## Controls

- Arrow keys or WASD: move.
- Space: jump.
- E: interact when a deliberate action is needed, such as starting or confirming a repair puzzle.
- F: use lantern.

## Notes

This chunk should not start until the visual mockup has been reviewed.

## Next Steps

- Revisit after Chunk 05 and Chunk 06.
