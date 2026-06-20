import { getScenePage, getScenePanel, sceneSequence } from "../game/sceneSequence.js";
import { createRepairFlow } from "../interactions/repairFlow.js";
import { createPlayer, updatePlayer } from "../player/playerState.js";
import { createScene } from "../scenes/sceneFactory.js";
import { createStormController } from "../storm/stormController.js";
import { applySavedProgress } from "./progress.js";
import { updateScenePanel } from "./scenePanel.js";
import { createSceneTransition } from "./sceneTransition.js";

export function createSceneManager({ input, audioManager = null }) {
  let sceneId = resolveStartingSceneId();
  let scene = null;
  let player = null;
  let repairFlow = null;
  let storm = null;
  let transitioning = false;
  const sceneTransition = createSceneTransition();

  void input;
  loadScene(sceneId, { startAtRepair: shouldStartAtRepair() });

  function loadScene(nextSceneId, { startAtRepair = false } = {}) {
    sceneId = sceneSequence[nextSceneId] ? nextSceneId : "village";
    scene = createScene(sceneId);
    scene.id = sceneId;
    applySavedProgress(scene);
    player = createPlayer(scene);

    if (startAtRepair && scene.repairTarget) {
      player.x = scene.repairTarget.x;
      updatePlayer(player, { direction: 0 }, scene, 0);
    }

    repairFlow = createRepairFlow({
      scene,
      audioManager,
      player,
      onSceneComplete: goToScene
    });
    storm = createStormController(scene);
    updateScenePanel(sceneId);

    return { scene, player, repairFlow, storm };
  }

  function goToScene(nextSceneId) {
    if (!sceneSequence[nextSceneId] || transitioning) {
      return;
    }

    transitioning = true;
    audioManager?.play("weather.transition.thunder").catch(() => {});
    repairFlow?.destroy();
    sceneTransition.play({
      panel: getScenePanel(nextSceneId),
      onSwap: () => {
        loadScene(nextSceneId);
        updateAddress(nextSceneId);
      },
      onComplete: () => {
        transitioning = false;
      }
    });
  }

  return {
    goToScene,
    get panel() {
      return getScenePanel(sceneId);
    },
    get player() {
      return player;
    },
    get repairFlow() {
      return repairFlow;
    },
    get scene() {
      return scene;
    },
    get sceneId() {
      return sceneId;
    },
    get storm() {
      return storm;
    },
    get transitioning() {
      return transitioning || sceneTransition.active;
    }
  };
}

function updateAddress(sceneId) {
  const nextPage = getScenePage(sceneId);

  if (window.location.pathname.endsWith(nextPage.replace("./", "/"))) {
    return;
  }

  window.history?.pushState?.({ sceneId }, "", nextPage);
}

function resolveStartingSceneId() {
  const params = new URLSearchParams(window.location.search);
  const queryScene = params.get("scene");
  const bodyScene = document.body.dataset.scene;

  if (queryScene && sceneSequence[queryScene]) {
    return queryScene;
  }

  return bodyScene || "village";
}

function shouldStartAtRepair() {
  return new URLSearchParams(window.location.search).has("startAtRepair");
}
