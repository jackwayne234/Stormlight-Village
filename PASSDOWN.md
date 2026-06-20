# Stormlight Village Passdown

Last updated: June 20, 2026

## Read This First

Stormlight Village Chapter 1 is at a golden build checkpoint.

The full six-scene route was played externally after the sound/feel tuning pass, and the result was judged complete and satisfying. Protect this build before adding scope.

Golden checkpoint commit:

```text
d4eceea Mark Chapter 1 golden build
```

## Project Location

```text
/Users/tempaccout/Documents/Codex/2026-06-19/files-mentioned-by-the-user-video/Video Game
```

## How To Run

From the project folder:

```bash
python3 -m http.server 5192 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:5192/index.html?resetProgress=1
```

Useful direct scene test:

```text
http://127.0.0.1:5192/stormedge-rise.html?resetProgress=1&startAtRepair=1
```

If the browser seems stale, use a fresh port or check the HTML script tag. Current golden build cache tag:

```text
v=20260620-feel-tuning
```

## Current Chapter 1 Route

1. Stormlight Village
2. Glowfen Grove
3. Mossline Switchyard
4. Stormedge Rise
5. Beacon Hill
6. Rainbarrel Row

## Core Loop

1. Walk through a rainy scene.
2. Robot guides attention to a broken infrastructure point.
3. Repair scan starts automatically by proximity.
4. Player solves a short tile-rotation repair puzzle.
5. The world visibly changes.
6. Short reward bubbles appear, then fade.
7. Player continues into the next scene through an in-app transition.
8. Rain/thunder ambience stays alive across the chapter.

## What To Protect

- The quiet rainy mood.
- The compact scene length.
- The inspect, solve, reward, transition rhythm.
- Persistent global rain/thunder audio.
- The gentle puzzle difficulty curve.
- Reward bubbles that do not overstay.
- The warm handmade feel of Chapter 1.

## Important Files

- `src/app/main.js` - app loop and global audio hookup
- `src/app/sceneManager.js` - in-app scene lifecycle and handoff
- `src/app/sceneTransition.js` - title/weather transition overlay
- `src/game/sceneSequence.js` - scene order and panel metadata
- `src/interactions/repairFlow.js` - scan, puzzle, reward, continue flow
- `src/puzzles/repairPuzzle.js` - scene puzzle layouts/themes
- `src/audio/audioManager.js` - generated audio and playback manager
- `src/audio/soundCatalog.js` - cue definitions and mix values
- `src/audio/weatherAudio.js` - persistent rain/thunder behavior
- `chunks/26-chapter-one-golden-build.md` - milestone note

## Best Next Choices

Pick one path deliberately:

1. Package/preserve Chapter 1.
   - Make a simple playable archive or deployable static build.
   - Keep this as the shareable first chapter.

2. Tiny polish only.
   - Only adjust things found in repeat playthroughs.
   - Avoid adding new mechanics to Chapter 1 unless the game clearly asks for them.

3. Plan Chapter 2 separately.
   - Start with a new planning chunk.
   - Keep Chapter 1's rhythm as the template, not a place to cram new ideas.

## Avoid Next Session

- Do not rewrite the core loop.
- Do not expand the first chapter route before deciding the larger structure.
- Do not replace the browser-game architecture without a clear reason.
- Do not bury the rainy ambience under louder music or oversized cues.

## Current Git State At Passdown

After creating this note, make or verify a small passdown commit if desired.

Recommended commit message:

```text
Add next-session passdown note
```
