# Chunk 14: Linear Repair Flow

## Goal

Connect the existing scenes into a simple first chapter:

1. The player starts in Stormlight Village.
2. Each scene has one broken infrastructure point.
3. Walking close to the broken point automatically opens the repair puzzle.
4. Completing the puzzle changes something visible in that scene.
5. The repaired scene gets a short reward beat with speech bubbles.
6. The player chooses when to continue to the next scene.

This keeps the first playable version small while leaving room to add richer puzzles, story notices, and scene transitions later.

## Current Scene Order

| Step | Scene | Broken Thing | Completion Payoff | Next Scene |
| --- | --- | --- | --- | --- |
| 1 | Stormlight Village | Water wheel generator | Water wheel repairs and village lights come on | Glowfen Grove |
| 2 | Glowfen Grove | Glow plant bridge | Bridge/glow plants wake up | Mossline Switchyard |
| 3 | Mossline Switchyard | Junction line | Switchyard poles, boxes, and lamps come online | Stormedge Rise |
| 4 | Stormedge Rise | Storm gauge | Gauge stabilizes and the storm softens slightly | Beacon Hill |
| 5 | Beacon Hill Signal Tower | Beacon signal | Beacon and hill lights restore | Rainbarrel Row |
| 6 | Rainbarrel Row | Clogged storm drain | Runoff channels flow and barrels stop overflowing | Chapter complete |

## Implementation Notes

- `src/game/sceneSequence.js` stores the scene order and page names.
- Each scene file owns its `repairTarget`, including the prompt, target position, robot guidance, reward reactions, effect name, and next scene.
- `src/interactions/repairFlow.js` owns the generic repair panel overlay, proximity check, puzzle completion, save key, reward timing, and scene handoff.
- `src/repairs/repairEffects.js` owns named visual changes such as village lights, bridge glow, and beacon restoration.
- `src/repairs/repairReactions.js` turns scene reaction data into positioned speech bubbles.
- `src/app/main.js` creates the shared repair flow for every walk-around scene.
- Repair saves use `stormlight.repair.<repair-id>` keys in browser storage.

## Reward Beat

After a repair puzzle is completed:

1. The puzzle panel closes.
2. The repair effect appears in the scene.
3. Villager/scene speech bubbles appear near the repaired area.
4. The robot adds a short engineering-style comment.
5. After a few seconds, the player can press Space, Enter, E, or walk right to continue.

The first village reward includes cottage comments such as "Yay, the lights are back on!" so the repair feels helpful before the next scene loads.

## Robot Guidance

Each scene now starts with one short robot guidance bubble after a small delay. The line points the player toward the local infrastructure problem without feeling like a menu tutorial.

Current guidance lines:

- Stormlight Village: "Power is down near the water wheel. Let's inspect it."
- Glowfen Grove: "The bridge plants are dim. Their circuit might be asleep."
- Mossline Switchyard: "One junction is offline. I'm reading a break ahead."
- Stormedge Rise: "Wind is rising. The storm gauge needs calibration."
- Beacon Hill Signal Tower: "The beacon signal is weak. We're close."
- Rainbarrel Row: "Runoff is pooling near the cottages. The drain needs clearing."

The guidance bubble disappears after a few seconds, and it also disappears immediately if the player reaches the repair target and opens the puzzle.

## Testing Notes

- Add `?resetProgress=1` to a scene URL to clear repair progress for replay testing.
- Add `?startAtRepair=1` to spawn at that scene's repair target for quick testing.
- Example: `http://localhost:5174/index.html?resetProgress=1&startAtRepair=1`

## Future Improvements

- Replace the reused circuit puzzle with scene-specific puzzle variations.
- Add an in-world repair notice before each scene objective.
- Add softer transition screens or short bridge animations between scenes.
- Save chapter completion after Beacon Hill.
