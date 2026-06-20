export const sceneSequence = {
  village: {
    nextScene: "glow-grove",
    page: "./index.html"
  },
  "glow-grove": {
    nextScene: "mossline-switchyard",
    page: "./glow-grove.html"
  },
  "mossline-switchyard": {
    nextScene: "stormedge-rise",
    page: "./mossline-switchyard.html"
  },
  "stormedge-rise": {
    nextScene: "beacon-hill",
    page: "./stormedge-rise.html"
  },
  "beacon-hill": {
    nextScene: null,
    page: "./beacon-hill.html"
  },
  "rainbarrel-row": {
    nextScene: null,
    page: "./rainbarrel-row.html"
  }
};

export function getScenePage(sceneId) {
  return sceneSequence[sceneId]?.page || "./index.html";
}
