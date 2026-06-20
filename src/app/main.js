import { config } from "../config.js";
import { createAudioManager } from "../audio/audioManager.js";
import { createWeatherAudio } from "../audio/weatherAudio.js";
import { createPlayerInput } from "../player/playerInput.js";
import { updatePlayer } from "../player/playerState.js";
import { renderScene } from "../render.js";
import { resetProgressIfRequested } from "./progress.js";
import { createSceneManager } from "./sceneManager.js";

const canvas = document.querySelector("#game-canvas");
const context = canvas.getContext("2d");
resetProgressIfRequested();

const audio = createAudioManager();
const input = createPlayerInput();
const sceneManager = createSceneManager({ audioManager: audio, input });
const weatherAudio = createWeatherAudio(() => sceneManager.scene, audio);

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

  if (!sceneManager.transitioning && !sceneManager.repairFlow.isOpen()) {
    updatePlayer(sceneManager.player, input, sceneManager.scene, deltaTime);
  }
  if (!sceneManager.transitioning) {
    sceneManager.storm.update(time);
  }
  renderScene(context, sceneManager.scene, time);
  if (!sceneManager.transitioning) {
    sceneManager.repairFlow.update(time);
  }
  weatherAudio.update(time);
  requestAnimationFrame(frame);
}

function startAudio() {
  weatherAudio.start();
}

window.addEventListener("pointerdown", startAudio, { once: true });
window.addEventListener("keydown", startAudio, { once: true });
resizeCanvasForDisplay();
window.addEventListener("resize", resizeCanvasForDisplay);
requestAnimationFrame(frame);
window.setTimeout(startAudio, 250);
