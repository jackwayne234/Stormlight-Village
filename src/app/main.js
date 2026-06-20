import { config } from "../config.js";
import { createAudioManager } from "../audio/audioManager.js";
import { createWeatherAudio } from "../audio/weatherAudio.js";
import { createPlayerInput } from "../player/playerInput.js";
import { createPlayer, updatePlayer } from "../player/playerState.js";
import { createRepairFlow } from "../interactions/repairFlow.js";
import { createScene } from "../scenes/sceneFactory.js";
import { createStormController } from "../storm/stormController.js";
import { renderScene } from "../render.js";
import { applySavedProgress, resetProgressIfRequested } from "./progress.js";

const canvas = document.querySelector("#game-canvas");
const audioToggle = document.querySelector("#audio-toggle");
const context = canvas.getContext("2d");
resetProgressIfRequested();
const scene = createScene(document.body.dataset.scene || "village");
applySavedProgress(scene);

const audio = createAudioManager();
const weatherAudio = createWeatherAudio(scene, audio);
const input = createPlayerInput();
const player = createPlayer(scene);

if (new URLSearchParams(window.location.search).has("startAtRepair") && scene.repairTarget) {
  player.x = scene.repairTarget.x;
  updatePlayer(player, { direction: 0 }, scene, 0);
}

const repairFlow = createRepairFlow({ scene, player });
const storm = createStormController(scene);

let startTime = performance.now();
let previousFrameTime = startTime;

function resizeCanvasForDisplay() {
  const ratio = window.devicePixelRatio || 1;
  const { width, height } = config.canvas;
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function frame(now) {
  const time = (now - startTime) / 1000;
  const deltaTime = Math.min((now - previousFrameTime) / 1000, 0.05);
  previousFrameTime = now;

  if (!repairFlow.isOpen()) {
    updatePlayer(player, input, scene, deltaTime);
  }
  storm.update(time);
  renderScene(context, scene, time);
  repairFlow.update(time);
  weatherAudio.update(time);
  requestAnimationFrame(frame);
}

function toggleAudio() {
  const enabled = audioToggle.getAttribute("aria-pressed") !== "true";
  weatherAudio.setEnabled(enabled);
  audioToggle.setAttribute("aria-pressed", String(enabled));
  audioToggle.textContent = enabled ? "Audio On" : "Audio";
}

audioToggle.addEventListener("click", toggleAudio);
resizeCanvasForDisplay();
window.addEventListener("resize", resizeCanvasForDisplay);
requestAnimationFrame(frame);
