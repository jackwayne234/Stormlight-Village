import { createBaseScene } from "./baseScene.js";

export function createGlowGroveScene() {
  const scene = createBaseScene();

  scene.title = "Glowfen Grove";
  scene.world.width = 1900;
  scene.character.x = 320;
  scene.robot.x = 432;
  scene.lantern.x = 375;
  scene.bridge = { x: 850, y: 604, width: 420 };
  scene.background.trees = [
    { x: 70, y: 300, scale: 1.06 },
    { x: 300, y: 260, scale: 1.16 },
    { x: 640, y: 310, scale: 0.86 },
    { x: 1060, y: 272, scale: 1.12 },
    { x: 1350, y: 328, scale: 0.84 },
    { x: 1665, y: 280, scale: 1.05 }
  ];
  scene.background.cottages = [
    { x: 1450, y: 430, scale: 0.72, lit: false }
  ];
  scene.background.lamps = [
    { x: 220, y: 528, lit: true },
    { x: 715, y: 532, lit: false },
    { x: 1220, y: 522, lit: false },
    { x: 1690, y: 535, lit: true }
  ];
  scene.weather.puddles = [
    { x: 160, y: 656, width: 210, height: 20 },
    { x: 560, y: 668, width: 170, height: 16 },
    { x: 1180, y: 652, width: 240, height: 20 },
    { x: 1580, y: 675, width: 190, height: 18 }
  ];
  scene.weather.mistBands = [
    { x: 110, y: 448, width: 360, speed: 9 },
    { x: 720, y: 406, width: 380, speed: 11 },
    { x: 1280, y: 470, width: 330, speed: 10 }
  ];
  scene.props.brokenBranches = [
    { x: 475, y: 625, rotation: -0.16 },
    { x: 1110, y: 632, rotation: 0.2 },
    { x: 1510, y: 618, rotation: -0.24 }
  ];
  scene.props.glowPlants = [
    { x: 405, y: 608, active: true },
    { x: 540, y: 626, active: true },
    { x: 790, y: 606, active: false },
    { x: 1040, y: 612, active: true },
    { x: 1330, y: 622, active: true },
    { x: 1615, y: 604, active: false }
  ];
  scene.props.repairParts = [
    { x: 860, y: 584, type: "gear" },
    { x: 1260, y: 586, type: "seed" }
  ];
  scene.repairTarget = {
    id: "glow-plant-bridge",
    x: 850,
    radius: 230,
    prompt: "Glow plant bridge is asleep.",
    guidance: "The bridge plants are dim. Their circuit might be asleep.",
    completeEffect: "grove-glow-bridge",
    completeMessage: "Glow bridge awake. Continuing toward Mossline Switchyard...",
    reactions: [
      { text: "The path is glowing again!", x: 850, y: 492 },
      { text: "Bridge network restored.", x: "robot", y: "robotTop", kind: "robot" }
    ],
    nextScene: "mossline-switchyard"
  };

  return scene;
}
