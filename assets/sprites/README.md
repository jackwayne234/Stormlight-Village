# Sprite Asset Map

Organize sprites by how the game uses them.

## Folders

- `characters/` - playable characters, companions, villagers, and pose sets.
- `environment/` - scene-specific world art that belongs to one location.
- `props/` - reusable objects such as lamps, cottages, plants, tools, repair parts, and water-wheel pieces.
- `devices/` - repair targets and infrastructure devices such as storm gauges, beacons, switchyard boxes, and drains.
- `puzzles/` - puzzle tiles, panels, icons, and puzzle-specific UI art.
- `effects/` - visual effects such as rain splashes, glow, lightning, scan beams, and repair bursts.
- `parallax/` - layered backgrounds such as skies, hills, trees, and foreground silhouettes.

## Naming

- Use lowercase kebab-case filenames.
- Keep source/chroma-key images with `-source`.
- Keep background-removed images with `-alpha`.
- Use `-trimmed` for runtime-ready transparent PNGs.

Example:

```text
characters/apprentice/apprentice-rain-ready-source.png
characters/apprentice/apprentice-rain-ready-alpha.png
characters/apprentice/apprentice-rain-ready-trimmed.png
```
