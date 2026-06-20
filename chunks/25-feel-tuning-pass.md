# Chunk 25 - Feel Tuning Pass

Status: First pass complete

Goal: Smooth the first sound and pacing mix after the generated cue pass.

## What Changed

- Lowered steady rain slightly so short UI cues have more room.
- Raised transition thunder slightly so scene changes feel intentional.
- Softened scan chirp and tile rotate click so repeated interactions do not poke through too sharply.
- Raised the repair success chime so puzzle completion has a clearer payoff.
- Moved thunder response closer to the lightning flash.
- Moved the default scene-entry lightning earlier.
- Shortened the repair-complete hold from `1.65s` to `1.35s`.
- Shortened reward bubble timing:
  - bubbles fade after `2.45s`
  - continue prompt appears after `2.75s`
- Shortened the in-app scene transition:
  - scene swap at `690ms`
  - transition complete at `1480ms`
- Bumped all scene page module cache tags to `v=20260620-feel-tuning`.

## Why This Step Matters

The previous chunk added the right sounds. This chunk gives them a first mix pass so the game feels less like separate effects pasted onto the route and more like one continuous rainy repair sequence.

## Verification

- Syntax checked the touched audio, repair, storm, and transition files.
- Confirmed the existing local preview on port `5186` is serving the new cache tag.
- Ran the timed scene-transition sanity check against the shorter transition values.

## Next Refactor Chunk

Use an actual ear-and-feel playthrough to tune what cannot be judged from code:

- rain loudness
- scan chirp pitch/volume
- repair success chime brightness
- tile click fatigue
- transition thunder weight
- whether the reward prompt appears too early or too late
