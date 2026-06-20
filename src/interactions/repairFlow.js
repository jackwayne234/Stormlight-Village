import { getScenePage } from "../game/sceneSequence.js";
import {
  createRepairPuzzle,
  moveSelection,
  rotateSelectedTile,
  rotateTileAt,
  updateConnections
} from "../puzzles/repairPuzzle.js";
import { createRepairPuzzleRenderer } from "../puzzles/repairPuzzleRenderer.js";
import { applyRepairEffect } from "../repairs/repairEffects.js";
import { createRepairReactions } from "../repairs/repairReactions.js";

export function createRepairFlow({ scene, player }) {
  const ui = createRepairUi();
  let puzzle = null;
  let renderer = null;
  let open = false;
  let completed = isRepairComplete(scene);
  let completionHandled = false;
  let awaitingContinue = false;
  let continueReadyAt = 0;
  let continueReady = false;
  let celebrationBubbles = [];
  let guidanceDismissed = completed;
  let guidanceVisible = false;
  let guidanceHideAt = 0;
  let scanning = false;
  let scanStartedAt = 0;
  let scanReadyAt = 0;
  let currentTime = 0;

  if (completed) {
    applyRepairEffect(scene);
  }

  function update(time) {
    currentTime = time;

    if (!scene.repairTarget) {
      return;
    }

    if (open) {
      renderer.render(time);
      if (puzzle.completed && !completionHandled) {
        completeRepair(time);
      }
      return;
    }

    if (awaitingContinue) {
      updateCelebration(time);
      return;
    }

    const nearTarget = isNearRepairTarget(scene, player);
    updateGuidance(time, nearTarget);

    if (scanning) {
      updateScan(time);
      return;
    }

    ui.prompt.hidden = completed || !nearTarget;
    ui.prompt.textContent = completed ? "" : `${scene.repairTarget.prompt} Move closer to inspect.`;

    if (nearTarget && !completed) {
      startScan(time);
    }
  }

  function isOpen() {
    return open || scanning;
  }

  function startScan(time) {
    if (!scene.repairTarget || completed || !isNearRepairTarget(scene, player)) {
      return;
    }

    scanning = true;
    scanStartedAt = time;
    scanReadyAt = time + 0.72;
    hideGuidance();
    ui.prompt.hidden = false;
    ui.prompt.textContent = `${scene.repairTarget.prompt} Analyzing repair...`;
    ui.scan.hidden = false;
    updateScan(time);
  }

  function updateScan(time) {
    if (!isNearRepairTarget(scene, player)) {
      cancelScan();
      return;
    }

    positionScan(scene, ui.scan, time - scanStartedAt);

    if (time >= scanReadyAt) {
      openPuzzle();
    }
  }

  function cancelScan() {
    scanning = false;
    ui.scan.hidden = true;
  }

  function openPuzzle() {
    if (!scene.repairTarget || completed || !isNearRepairTarget(scene, player)) {
      return;
    }

    open = true;
    scanning = false;
    completionHandled = false;
    puzzle = createRepairPuzzle(scene.repairTarget.puzzleTheme);
    updateConnections(puzzle);
    renderer = createRepairPuzzleRenderer(ui.canvas, puzzle);
    renderer.resizeForDisplay();
    ui.status.textContent = "Repair panel active";
    ui.overlay.hidden = false;
    ui.prompt.hidden = true;
    ui.scan.hidden = true;
    hideGuidance();
  }

  function closePuzzle() {
    open = false;
    ui.overlay.hidden = true;
  }

  function completeRepair(time) {
    completed = true;
    completionHandled = true;
    localStorage.setItem(progressKey(scene), "true");
    applyRepairEffect(scene);
    closePuzzle();
    startCelebration(time);
  }

  function startCelebration(time) {
    awaitingContinue = true;
    continueReadyAt = time + 4.5;
    continueReady = false;
    hideGuidance();
    ui.scan.hidden = true;
    celebrationBubbles = createCelebrationBubbles(scene, ui.celebration);
    ui.celebration.hidden = false;
    ui.prompt.hidden = true;
    updateCelebration(time);
  }

  function updateCelebration(time) {
    positionCelebrationBubbles(scene, ui.celebration, celebrationBubbles);

    if (time >= continueReadyAt) {
      continueReady = true;
      ui.prompt.hidden = false;
      ui.prompt.textContent = scene.repairTarget.continueMessage
        ? scene.repairTarget.continueMessage
        : scene.repairTarget.nextScene
        ? "Repair complete. Press Space or walk right to continue."
        : "Repair complete. Press Space to enjoy the view.";
    }
  }

  function continueAfterCelebration() {
    if (!awaitingContinue) {
      return;
    }

    ui.celebration.hidden = true;
    ui.celebration.replaceChildren();
    ui.prompt.hidden = true;
    awaitingContinue = false;

    const nextScene = scene.repairTarget.nextScene;
    if (nextScene) {
      window.location.href = getScenePage(nextScene);
    }
  }

  function updateGuidance(time, nearTarget) {
    if (completed || guidanceDismissed || !scene.repairTarget.guidance) {
      hideGuidance();
      return;
    }

    if (nearTarget) {
      guidanceDismissed = true;
      hideGuidance();
      return;
    }

    if (!guidanceVisible && time >= 1) {
      guidanceVisible = true;
      guidanceHideAt = time + 5.25;
      ui.guidance.textContent = scene.repairTarget.guidance;
      ui.guidance.hidden = false;
    }

    if (guidanceVisible) {
      positionBubbleAtWorldPoint(scene, ui.guidance, scene.robot.x, scene.robot.y - 84);
    }

    if (guidanceVisible && time >= guidanceHideAt) {
      guidanceDismissed = true;
      hideGuidance();
    }
  }

  function hideGuidance() {
    guidanceVisible = false;
    ui.guidance.hidden = true;
  }

  function handleKeyDown(event) {
    const key = event.key.toLowerCase();

    if (awaitingContinue) {
      const continueKeys = [" ", "enter", "e", "arrowright", "d"];

      if (continueReady && continueKeys.includes(key)) {
        event.preventDefault();
        continueAfterCelebration();
      }
      return;
    }

    if (!open && !scanning && (key === "e" || key === " ")) {
      startScan(currentTime);
      return;
    }

    if (!open) {
      return;
    }

    const handledKeys = ["arrowup", "w", "arrowright", "d", "arrowdown", "s", "arrowleft", "a", " ", "e", "escape"];
    if (!handledKeys.includes(key)) {
      return;
    }

    event.preventDefault();
    if (key === "escape") closePuzzle();
    if (key === "arrowup" || key === "w") moveSelection(puzzle, -1, 0);
    if (key === "arrowright" || key === "d") moveSelection(puzzle, 0, 1);
    if (key === "arrowdown" || key === "s") moveSelection(puzzle, 1, 0);
    if (key === "arrowleft" || key === "a") moveSelection(puzzle, 0, -1);
    if (key === " " || key === "e") rotateSelectedTile(puzzle);
  }

  function handlePointerDown(event) {
    if (!open || !renderer) {
      return;
    }

    const rect = ui.canvas.getBoundingClientRect();
    const scaleX = 960 / rect.width;
    const scaleY = 680 / rect.height;
    const point = renderer.tileAtPoint((event.clientX - rect.left) * scaleX, (event.clientY - rect.top) * scaleY);

    if (point) {
      rotateTileAt(puzzle, point.row, point.col);
    }
  }

  window.addEventListener("keydown", handleKeyDown);
  ui.canvas.addEventListener("pointerdown", handlePointerDown);
  window.addEventListener("resize", () => renderer?.resizeForDisplay());

  return {
    isOpen,
    update
  };
}

function createRepairUi() {
  const prompt = document.createElement("div");
  prompt.className = "repair-prompt";
  prompt.hidden = true;

  const overlay = document.createElement("div");
  overlay.className = "repair-overlay";
  overlay.hidden = true;

  const canvas = document.createElement("canvas");
  canvas.width = 960;
  canvas.height = 680;
  canvas.className = "repair-overlay-canvas";

  const status = document.createElement("div");
  status.className = "repair-overlay-status";
  status.textContent = "Repair panel active";

  const celebration = document.createElement("div");
  celebration.className = "repair-celebration";
  celebration.hidden = true;

  const guidance = document.createElement("div");
  guidance.className = "repair-guidance repair-bubble repair-bubble-robot";
  guidance.hidden = true;

  const scan = document.createElement("div");
  scan.className = "repair-scan";
  scan.hidden = true;

  overlay.append(canvas, status);
  document.querySelector(".app-shell").append(prompt, overlay, celebration, guidance, scan);

  return { canvas, celebration, guidance, overlay, prompt, scan, status };
}

function isNearRepairTarget(scene, player) {
  const target = scene.repairTarget;
  return Math.abs(player.x - target.x) <= target.radius;
}

function isRepairComplete(scene) {
  return scene.repairTarget ? localStorage.getItem(progressKey(scene)) === "true" : false;
}

function progressKey(scene) {
  return `stormlight.repair.${scene.repairTarget.id}`;
}

function createCelebrationBubbles(scene, celebration) {
  celebration.replaceChildren();

  const reactions = createRepairReactions(scene);
  return reactions.map((reaction, index) => {
    const bubble = document.createElement("div");
    bubble.className = `repair-bubble repair-bubble-${reaction.kind || "villager"}`;
    bubble.textContent = reaction.text;
    bubble.style.animationDelay = `${index * 0.38}s`;
    celebration.append(bubble);
    return { ...reaction, element: bubble };
  });
}

function positionCelebrationBubbles(scene, celebration, bubbles) {
  void celebration;

  bubbles.forEach((bubble) => {
    positionBubbleAtWorldPoint(scene, bubble.element, bubble.worldX, bubble.worldY);
  });
}

function positionBubbleAtWorldPoint(scene, element, worldX, worldY) {
  const canvas = document.querySelector("#game-canvas");
  const rect = canvas.getBoundingClientRect();
  const scaleX = rect.width / 1280;
  const scaleY = rect.height / 720;
  const cameraX = scene.camera?.x || 0;

  element.style.left = `${rect.left + (worldX - cameraX) * scaleX}px`;
  element.style.top = `${rect.top + worldY * scaleY}px`;
}

function positionScan(scene, element, age) {
  const canvas = document.querySelector("#game-canvas");
  const rect = canvas.getBoundingClientRect();
  const scaleX = rect.width / 1280;
  const scaleY = rect.height / 720;
  const cameraX = scene.camera?.x || 0;
  const target = scene.repairTarget;
  const screenX = rect.left + (target.x - cameraX) * scaleX;
  const screenY = rect.top + 560 * scaleY;
  const size = Math.max(88, Math.min(170, target.radius * 0.68 * scaleX));

  element.style.left = `${screenX}px`;
  element.style.top = `${screenY}px`;
  element.style.width = `${size}px`;
  element.style.height = `${size * 0.45}px`;
  element.style.setProperty("--scan-progress", Math.min(age / 0.72, 1));
}
