export const sceneSequence = {
  village: {
    nextScene: "glow-grove",
    page: "./index.html",
    panel: {
      documentTitle: "Stormlight Village",
      ariaLabel: "Stormlight Village visual mockup",
      eyebrow: "Chunk 05 Visual Mockup",
      title: "Stormlight Village",
      description:
        "After the storm, a young civil engineer and their floating AI companion inspect the damaged water wheel generator."
    }
  },
  "glow-grove": {
    nextScene: "mossline-switchyard",
    page: "./glow-grove.html",
    panel: {
      documentTitle: "Stormlight Village - Glowfen Grove",
      ariaLabel: "Glowfen Grove walk-around scene",
      eyebrow: "Scene 02 Walk Test",
      title: "Glowfen Grove",
      description: "A quiet wetland path beyond the village, where lantern plants glow around a small storm-bent bridge."
    }
  },
  "mossline-switchyard": {
    nextScene: "stormedge-rise",
    page: "./mossline-switchyard.html",
    panel: {
      documentTitle: "Stormlight Village - Mossline Switchyard",
      ariaLabel: "Mossline Switchyard walk-around scene",
      eyebrow: "Scene 03 Walk Test",
      title: "Mossline Switchyard",
      description: "An old forest maintenance line where storm-soaked switch posts and copper junction boxes wait to be repaired."
    }
  },
  "stormedge-rise": {
    nextScene: "beacon-hill",
    page: "./stormedge-rise.html",
    panel: {
      documentTitle: "Stormlight Village - Stormedge Rise",
      ariaLabel: "Stormedge Rise walk-around scene",
      eyebrow: "Scene 04 Walk Test",
      title: "Stormedge Rise",
      description: "A wind-battered ridge where the little engineer has stepped closer to the storm still rolling over the hills."
    }
  },
  "beacon-hill": {
    nextScene: "rainbarrel-row",
    page: "./beacon-hill.html",
    panel: {
      documentTitle: "Stormlight Village - Beacon Hill Signal Tower",
      ariaLabel: "Beacon Hill Signal Tower walk-around scene",
      eyebrow: "Scene 05 Walk Test",
      title: "Beacon Hill",
      description: "A storm-watch signal tower stands above the trees, its warm beacon waiting to guide the village through rough weather."
    }
  },
  "rainbarrel-row": {
    nextScene: null,
    page: "./rainbarrel-row.html",
    panel: {
      documentTitle: "Stormlight Village - Rainbarrel Row",
      ariaLabel: "Rainbarrel Row walk-around scene",
      eyebrow: "Scene 06 Walk Test",
      title: "Rainbarrel Row",
      description: "Cottage gutters spill into overflowing barrels while a clogged storm drain sends rainwater across the lane."
    }
  }
};

export function getScenePage(sceneId) {
  return sceneSequence[sceneId]?.page || "./index.html";
}

export function getScenePanel(sceneId) {
  return sceneSequence[sceneId]?.panel || sceneSequence.village.panel;
}
