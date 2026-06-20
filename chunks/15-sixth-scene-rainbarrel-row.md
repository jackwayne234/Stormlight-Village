# Chunk 15: Sixth Scene - Rainbarrel Row

## Goal

Add one new walk-around scene focused on stormwater management after heavy rain.

## Scene Concept

Rainbarrel Row is a cottage lane where gutters spill into overflowing rain barrels and a clogged storm drain sends water across the path.

This scene keeps the civil-engineer theme cozy and practical: the player is not fighting the storm, they are helping the village safely redirect runoff.

## Current Build

- New page: `rainbarrel-row.html`
- New scene data: `src/scenes/rainbarrelRowScene.js`
- New renderer details in `src/sceneRenderers/rainbarrelRowRenderer.js`:
  - rain barrels
  - roof gutters and downspouts
  - runoff channels
  - clogged/cleared storm drain
- New repair effect in `src/repairs/repairEffects.js`: `rainbarrel-drain-clear`
- Scene is registered in `src/scenes/sceneFactory.js`
- Scene page mapping is registered in `src/game/sceneSequence.js`

## Repair Flow

- Broken thing: clogged storm drain
- Robot guidance: "Runoff is pooling near the cottages. The drain needs clearing."
- Repair prompt: "Storm drain is clogged."
- Repair payoff:
  - drain clears
  - runoff channels flow
  - barrels stop overflowing
  - cottage/lamp lights come on
- Reward bubbles:
  - "No more water at the door!"
  - "The barrels are behaving again!"
  - "Runoff channel restored."

## Testing Notes

- Open directly: `http://localhost:5174/rainbarrel-row.html`
- Quick test: `http://localhost:5174/rainbarrel-row.html?resetProgress=1&startAtRepair=1`

Rainbarrel Row now sits in the main route after Beacon Hill as Scene 06.
