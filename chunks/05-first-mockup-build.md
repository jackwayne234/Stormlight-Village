# Chunk 05 - First Mockup Build

Status: First pass complete

Goal: Track implementation notes for the first browser-based visual mockup.

Why this matters: This is where build decisions, changes, and user feedback during implementation should be recorded.

## Target Deliverable

A single browser scene for Stormlight Village with no gameplay yet.

## Planned Contents

- Full-screen canvas scene.
- Post-storm forest village.
- Damaged water wheel generator.
- Apprentice civil engineer.
- Floating AI companion robot.
- Lantern glow.
- Ambient visual details such as puddles, mist, broken branches, and flickering lamps.

## Implementation Notes

- Built as a plain browser canvas mockup using HTML, CSS, and JavaScript modules.
- Added expandable project structure: `src/main.js`, `src/config.js`, `src/scene.js`, `src/render.js`, and separate entity files for the character, robot, water wheel, and props.
- Scene includes the post-storm forest village, damaged water wheel generator, apprentice civil engineer, cute floating AI robot, lantern glow, rain, mist, puddles, broken branches, cottages, lamps, glow plants, and visible repair parts.
- The scene has ambient motion: rain drift, mist, lantern pulse, robot hover/blink, water movement, subtle character bob, and rare lightning flashes.
- Added optional low thunder audio using `assets/audio/weather/rolling-thunder-pixabay.mp3`, downloaded by the user from Pixabay. Browser rules require the user to enable sound before thunder can play.
- Lightning/thunder events now happen randomly every 1 to 3 minutes instead of on every short background flash loop.
- Refactored sound into an expandable audio architecture: `src/audio/audioManager.js`, `src/audio/soundCatalog.js`, and `src/audio/weatherAudio.js`.
- Added first movement pass: left/right only, no jumping, no vertical movement. The camera scrolls horizontally through a wider village scene.
- Refactored app and scene organization: shared startup moved to `src/app/main.js`, saved progress moved to `src/app/progress.js`, scene data split into `src/scenes/`, and storm timing moved to `src/storm/stormController.js`.
- Desktop view fills the browser like a game scene. Portrait mobile view shows the full composition instead of cropping out the main story elements.

## Open Questions

- Does the visual direction feel close to Stormlight Village?
- Should the character be smaller, older, younger, more masculine, or more feminine?
- Should the robot feel more futuristic, more handmade, or more toy-like?
- Should the scene be stormier or calmer?
- Should the title appear in the scene or stay out of the mockup?

## Gameplay Notes Captured During Review

- Future loose repair parts should be picked up automatically when the player walks over or close to them.
- The water wheel should detect when the player arrives with the required parts, but it should not instantly fix itself.
- Getting close to the water wheel with the parts should open a small repair puzzle or interaction.
- Recommended repair puzzle: connect lantern energy through a simple circuit, pipe, wire, or gear panel to power the generator.

## Next Steps

- Review the mockup.
- Record feedback in Chunk 06.
- Revise the composition, color, character, robot, or water wheel as needed.
