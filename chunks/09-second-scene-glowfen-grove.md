# Chunk 09 - Second Scene: Glowfen Grove

Status: First pass complete

Goal: Add one more simple walk-around scene while keeping the project scene-by-scene.

Why this matters: A second scene proves the game can grow beyond the first village view without turning into a large, messy system.

## Scene

Glowfen Grove

## Page

`glow-grove.html`

## Direction

Glowfen Grove is a quiet wetland path beyond the village. It keeps the same cozy post-storm mood, but shifts away from the water wheel and into glowing plants, puddles, mist, a small storm-bent bridge, and a more forested path.

## What Was Added

- Separate browser page for the second scene.
- Shared movement, camera, audio, storm, and rendering systems.
- No in-game scene connection yet. The second scene is standalone for now.
- New scene data in `src/scene.js`.
- Optional bridge rendering in `src/render.js`.

## Controls

- `A` or Left Arrow: walk left.
- `D` or Right Arrow: walk right.

No jumping, no vertical movement.

## Notes

This is intentionally still simple. The goal is to make the world feel expandable one scene at a time.

## Next Steps

- Try walking around Glowfen Grove directly at `http://localhost:5174/glow-grove.html`.
- Decide whether the grove should stay purely scenic or become the place where the next repair part is found.
