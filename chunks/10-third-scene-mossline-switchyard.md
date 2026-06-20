# Chunk 10 - Third Scene: Mossline Switchyard

Status: First pass complete

Goal: Add a third standalone walk-around scene with a stronger infrastructure-repair feeling.

Why this matters: Mossline Switchyard extends the world toward practical civil-engineer gameplay without connecting scenes yet.

## Scene

Mossline Switchyard

## Page

`mossline-switchyard.html`

## Direction

An old forest maintenance line with storm-soaked switch posts, copper wires, mossy junction boxes, puddles, lamps, and a small locked gate.

## What Was Added

- Separate browser page for Scene 03.
- Shared left/right movement and camera behavior.
- Switchyard scene data in `src/scene.js`.
- Switch post, copper line, junction box, and locked gate drawing in `src/render.js`.

## Controls

- `A` or Left Arrow: walk left.
- `D` or Right Arrow: walk right.

No jumping, no vertical movement.

## Notes

No scene-to-scene connection yet. This is intentionally just another standalone scene.

## Next Steps

- Try walking around Mossline Switchyard.
- Decide whether the locked gate, junction boxes, or cable line should become the next interaction later.
