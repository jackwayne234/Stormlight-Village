import {
  createRepairPuzzle,
  moveSelection,
  rotateSelectedTile,
  rotateTileAt,
  updateConnections
} from "../puzzles/repairPuzzle.js";
import { createRepairPuzzleRenderer } from "../puzzles/repairPuzzleRenderer.js";

const canvas = document.querySelector("#repair-canvas");
const resetButton = document.querySelector("#reset-puzzle");
let puzzle = createRepairPuzzle();
let renderer = createRepairPuzzleRenderer(canvas, puzzle);
let startTime = performance.now();
let completionRecorded = false;

updateConnections(puzzle);
renderer.resizeForDisplay();

function resetPuzzle() {
  localStorage.removeItem("stormlight.waterWheelRepaired");
  completionRecorded = false;
  puzzle = createRepairPuzzle();
  updateConnections(puzzle);
  renderer = createRepairPuzzleRenderer(canvas, puzzle);
  renderer.resizeForDisplay();
}

function animationFrame(now) {
  if (puzzle.completed && !completionRecorded) {
    localStorage.setItem("stormlight.waterWheelRepaired", "true");
    completionRecorded = true;
  }

  renderer.render((now - startTime) / 1000);
  requestAnimationFrame(animationFrame);
}

function handleKeyDown(event) {
  const key = event.key.toLowerCase();
  const handledKeys = ["arrowup", "w", "arrowright", "d", "arrowdown", "s", "arrowleft", "a", " ", "e"];

  if (!handledKeys.includes(key)) {
    return;
  }

  event.preventDefault();

  if (key === "arrowup" || key === "w") moveSelection(puzzle, -1, 0);
  if (key === "arrowright" || key === "d") moveSelection(puzzle, 0, 1);
  if (key === "arrowdown" || key === "s") moveSelection(puzzle, 1, 0);
  if (key === "arrowleft" || key === "a") moveSelection(puzzle, 0, -1);
  if (key === " " || key === "e") rotateSelectedTile(puzzle);
}

function handlePointerDown(event) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = 960 / rect.width;
  const scaleY = 680 / rect.height;
  const point = renderer.tileAtPoint((event.clientX - rect.left) * scaleX, (event.clientY - rect.top) * scaleY);

  if (point) {
    rotateTileAt(puzzle, point.row, point.col);
  }
}

resetButton.addEventListener("click", resetPuzzle);
window.addEventListener("resize", renderer.resizeForDisplay);
window.addEventListener("keydown", handleKeyDown);
canvas.addEventListener("pointerdown", handlePointerDown);
requestAnimationFrame(animationFrame);
