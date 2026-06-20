import { createBaseScene } from "./baseScene.js";

export function createVillageScene() {
  const scene = createBaseScene();

  scene.title = "Stormlight Village";
  scene.world.width = 2200;
  scene.background.trees = [
    { x: 80, y: 290, scale: 1.15 },
    { x: 215, y: 270, scale: 0.95 },
    { x: 1000, y: 265, scale: 1.05 },
    { x: 1135, y: 315, scale: 0.82 },
    { x: 1430, y: 286, scale: 1.08 },
    { x: 1685, y: 326, scale: 0.82 },
    { x: 1960, y: 276, scale: 1.02 }
  ];
  scene.background.cottages = [
    { x: 735, y: 402, scale: 0.86, lit: false },
    { x: 1015, y: 428, scale: 0.7, lit: true },
    { x: 1565, y: 418, scale: 0.76, lit: false },
    { x: 1905, y: 430, scale: 0.68, lit: false }
  ];
  scene.background.lamps = [
    { x: 394, y: 502, lit: false },
    { x: 958, y: 512, lit: true },
    { x: 1152, y: 535, lit: false },
    { x: 1488, y: 526, lit: false },
    { x: 1815, y: 532, lit: false },
    { x: 2075, y: 518, lit: false }
  ];
  scene.props.brokenBranches = [
    { x: 325, y: 619, rotation: -0.25 },
    { x: 1084, y: 633, rotation: 0.18 },
    { x: 1518, y: 638, rotation: -0.1 },
    { x: 1865, y: 622, rotation: 0.22 }
  ];
  scene.props.glowPlants = [
    { x: 524, y: 603, active: true },
    { x: 617, y: 625, active: false },
    { x: 861, y: 604, active: true },
    { x: 1390, y: 608, active: true },
    { x: 1760, y: 620, active: false }
  ];
  scene.props.repairParts = [
    { x: 676, y: 590, type: "gear" },
    { x: 1008, y: 584, type: "coil" },
    { x: 1118, y: 573, type: "seed" },
    { x: 1640, y: 590, type: "gear" }
  ];
  scene.waterWheel = {
    x: 840,
    y: 456,
    radius: 92,
    damaged: true
  };
  scene.repairTarget = {
    id: "water-wheel",
    x: 840,
    radius: 230,
    prompt: "Water wheel generator offline.",
    guidance: "Power is down near the water wheel. Let's inspect it.",
    completeEffect: "village-lights-on",
    completeMessage: "Water wheel restored. Opening the path to Glowfen Grove...",
    reactions: [
      { text: "Yay, the lights are back on!", x: 735, y: 292 },
      { text: "Thank you!", x: 1565, y: 310 },
      { text: "We can see again!", x: 1905, y: 326 },
      { text: "Power restored. Nice work.", x: "robot", y: "robotTop", kind: "robot" }
    ],
    nextScene: "glow-grove"
  };

  return scene;
}
