import { createBeaconHillScene } from "./beaconHillScene.js";
import { createGlowGroveScene } from "./glowGroveScene.js";
import { createMosslineSwitchyardScene } from "./mosslineSwitchyardScene.js";
import { createRainbarrelRowScene } from "./rainbarrelRowScene.js";
import { createStormedgeRiseScene } from "./stormedgeRiseScene.js";
import { createVillageScene } from "./villageScene.js";

export function createScene(sceneId = "village") {
  if (sceneId === "glow-grove") {
    return createGlowGroveScene();
  }

  if (sceneId === "mossline-switchyard") {
    return createMosslineSwitchyardScene();
  }

  if (sceneId === "stormedge-rise") {
    return createStormedgeRiseScene();
  }

  if (sceneId === "beacon-hill") {
    return createBeaconHillScene();
  }

  if (sceneId === "rainbarrel-row") {
    return createRainbarrelRowScene();
  }

  return createVillageScene();
}
