export const sceneSequence = {
  village: {
    nextScene: "rainbarrel-row",
    page: "./index.html"
  },
  "rainbarrel-row": {
    nextScene: "glow-grove",
    page: "./rainbarrel-row.html"
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
  }
};

export function getScenePage(sceneId) {
  return sceneSequence[sceneId]?.page || "./index.html";
}
