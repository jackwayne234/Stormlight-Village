# Stormlight Village Working Log

Last updated: June 20, 2026

## Current Direction

We are treating Chapter 1 as a protected golden build and using it as the foundation for a larger Stormlight Village game. The first expansion track is visual: make the playable game feel closer to the itch.io cover art while keeping the current browser/canvas game playable.

## Visual North Star

Reference image:

- `assets/art/reference/stormlight-village-cover-reference.png`

Core visual goals:

- Rainy, cozy, lamp-lit village mood.
- Young apprentice civil engineer with messy dark hair, teal raincoat, brown tool satchel, and warm side-profile charm.
- Floating robot companion with friendly cyan face glow.
- Wet stone paths, warm windows, water wheels, bridges, hillside village depth, and storm clouds breaking into golden light.

## Decisions So Far

- Work from the richer project folder, not the itch zip export:
  - `/Users/tempaccout/Documents/Codex/2026-06-20/can/work/stormlight-village-project`
- Keep the itch zip/export as reference only.
- Use a dedicated asset workspace for visuals:
  - `assets/art/reference/` for source references.
  - `assets/art/sprite-lab/` for experiments.
  - `assets/sprites/characters/apprentice/` for apprentice sprite candidates.
  - `assets/sprites/characters/robot/` for robot sprite candidates.
- Expand sprite organization by gameplay use:
  - `assets/sprites/characters/` for apprentice, robot, villagers, and pose sets.
  - `assets/sprites/environment/` for scene-specific world art.
  - `assets/sprites/props/` for reusable objects.
  - `assets/sprites/devices/` for repair targets and infrastructure.
  - `assets/sprites/puzzles/` for puzzle UI art.
  - `assets/sprites/effects/` for glows, scans, rain, lightning, and repair bursts.
  - `assets/sprites/parallax/` for skies, hills, trees, and foreground layers.
- Browser/canvas games can use sprites cleanly, so the plan is to gradually move important character art from code-drawn shapes to transparent PNG sprites.
- The current single apprentice sprite works in-game and looks strong, but holding exposed schematics while walking in rain feels odd.
- Best near-term direction: normal walking/idle sprite should be rain-ready with hands mostly free and plans tucked into the satchel; schematic-out sprite should become an inspect/repair pose later.
- Character-duo pass is the first visual milestone. Background upgrades like parallax, trees, hills, storm sky, ground, and wet path reflections are intentionally deferred.
- The first visual slice target is Stormlight Village, with gameplay readability prioritized over exact cover fidelity.
- The default playable apprentice should have hood down, messy hair visible, hands free, teal raincoat, brown satchel, tools, and protected/tucked plans.
- The robot should move toward the cover design: round gray body, cyan face glow, small antenna/arms, friendly readable silhouette.
- Background Slice v1 starts with code-native wet path and lamp glow polish before introducing painted/parallax assets.

## Current Sprite Assets

First generated apprentice pose:

- Source with chroma background: `assets/sprites/characters/apprentice/apprentice-schematic-source.png`
- Transparent version: `assets/sprites/characters/apprentice/apprentice-schematic-alpha.png`
- Trimmed transparent version: `assets/sprites/characters/apprentice/apprentice-schematic-trimmed.png`

Current live game sprite path:

- `assets/sprites/characters/apprentice/apprentice-rain-ready-trimmed.png`

Rain-ready apprentice default pose:

- Source with chroma background: `assets/sprites/characters/apprentice/apprentice-rain-ready-source.png`
- Transparent version: `assets/sprites/characters/apprentice/apprentice-rain-ready-alpha.png`
- Trimmed transparent version: `assets/sprites/characters/apprentice/apprentice-rain-ready-trimmed.png`

Apprentice walking frames:

- Frame 1 source/alpha/trimmed:
  - `assets/sprites/characters/apprentice/apprentice-walk-1-source.png`
  - `assets/sprites/characters/apprentice/apprentice-walk-1-alpha.png`
  - `assets/sprites/characters/apprentice/apprentice-walk-1-trimmed.png`
- Frame 2 source/alpha/trimmed:
  - `assets/sprites/characters/apprentice/apprentice-walk-2-source.png`
  - `assets/sprites/characters/apprentice/apprentice-walk-2-alpha.png`
  - `assets/sprites/characters/apprentice/apprentice-walk-2-trimmed.png`

Cover-matching robot idle pose:

- Source with chroma background: `assets/sprites/characters/robot/robot-cover-idle-source.png`
- Transparent version: `assets/sprites/characters/robot/robot-cover-idle-alpha.png`
- Trimmed transparent version: `assets/sprites/characters/robot/robot-cover-idle-trimmed.png`

Robot scan pose:

- Source with chroma background: `assets/sprites/characters/robot/robot-scan-source.png`
- Transparent version: `assets/sprites/characters/robot/robot-scan-alpha.png`
- Trimmed transparent version: `assets/sprites/characters/robot/robot-scan-trimmed.png`

Renderer integration:

- `src/entities/character.js` now loads the rain-ready apprentice sprite when available.
- `src/entities/robot.js` now loads the cover-matching robot sprite when available.
- If either sprite fails to load, the old code-drawn character or robot still renders as a fallback.
- Pose Lane v1 switches the apprentice to the schematic `inspect` pose and the robot to the cyan-beam `scan` pose during scan/repair flow.
- Walk Cycle v1 alternates `walk-1`, standing default, `walk-2`, standing default while the apprentice is moving.

Asset notes:

- `assets/sprites/README.md` documents the sprite folder map and naming rules.
- Early root-level apprentice sprite files were moved into `assets/art/sprite-lab/` as `apprentice-schematic-v1-*` lab assets.

## Open Questions

- Should the default playable sprite have hood up, hood down, or high collar with visible hair?
- Should the apprentice carry a small tool while walking, or keep both hands free?
- How close should gameplay sprites stay to the cover art versus simplifying for small on-screen readability?
- Should the robot remain code-drawn for now, or get a matching sprite soon?
- Do we want a title/menu scene that recreates the cover composition more directly?

## Suggested Next Experiment

Fit-check wet path and lamp glow in Stormlight Village:

- Load `index.html?resetProgress=1`.
- Confirm the path reads wetter and more reflective without overpowering the characters.
- Confirm lit lamps cast warmer halos and subtle road reflections.
- Confirm darker scenes still remain readable.
- If accepted, plan the next background slice: sky/hills parallax or water wheel/cottage props.

## How We Work

- Make one visual change at a time.
- Put experiments in the sprite/art folders before wiring them into gameplay.
- Keep the game playable after every change.
- Log decisions here when they affect visual direction, asset naming, or gameplay integration.
