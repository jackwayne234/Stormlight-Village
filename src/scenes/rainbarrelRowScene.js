import { createBaseScene } from "./baseScene.js";

export function createRainbarrelRowScene() {
  const scene = createBaseScene();

  scene.title = "Rainbarrel Row";
  scene.world.width = 2050;
  scene.character.x = 300;
  scene.robot.x = 412;
  scene.lantern.x = 355;
  scene.weather.rain = {
    alpha: 0.3,
    lineWidth: 2.2,
    wind: 18
  };
  scene.weather.wind = {
    strength: 1.25,
    leafCount: 18
  };
  scene.rainbarrelRow = {
    drain: { x: 1110, y: 622, cleared: false },
    channels: [
      { x: 550, y: 644, width: 410, flow: false },
      { x: 1030, y: 632, width: 500, flow: false },
      { x: 1540, y: 650, width: 360, flow: false }
    ],
    barrels: [
      { x: 520, y: 542, overflow: true },
      { x: 825, y: 548, overflow: true },
      { x: 1395, y: 546, overflow: true },
      { x: 1710, y: 552, overflow: true }
    ],
    gutters: [
      { x: 430, y: 363, width: 260, drip: true },
      { x: 760, y: 385, width: 230, drip: true },
      { x: 1345, y: 378, width: 260, drip: true },
      { x: 1645, y: 392, width: 230, drip: true }
    ]
  };

  scene.background.trees = [
    { x: 80, y: 306, scale: 0.95 },
    { x: 250, y: 286, scale: 1.08 },
    { x: 635, y: 324, scale: 0.82 },
    { x: 1110, y: 296, scale: 0.98 },
    { x: 1485, y: 318, scale: 0.86 },
    { x: 1930, y: 292, scale: 1.02 }
  ];
  scene.background.cottages = [
    { x: 445, y: 430, scale: 0.78, lit: false },
    { x: 770, y: 452, scale: 0.68, lit: true },
    { x: 1370, y: 444, scale: 0.76, lit: false },
    { x: 1665, y: 462, scale: 0.66, lit: false }
  ];
  scene.background.lamps = [
    { x: 305, y: 534, lit: true },
    { x: 1010, y: 536, lit: false },
    { x: 1265, y: 528, lit: false },
    { x: 1870, y: 532, lit: true }
  ];
  scene.weather.puddles = [
    { x: 190, y: 664, width: 220, height: 19 },
    { x: 690, y: 675, width: 260, height: 19 },
    { x: 1120, y: 650, width: 280, height: 21 },
    { x: 1540, y: 672, width: 230, height: 18 },
    { x: 1890, y: 654, width: 170, height: 17 }
  ];
  scene.weather.mistBands = [
    { x: 130, y: 426, width: 360, speed: 12 },
    { x: 720, y: 392, width: 420, speed: 13 },
    { x: 1360, y: 462, width: 360, speed: 12 }
  ];
  scene.weather.raindrops = Array.from({ length: 72 }, (_, index) => ({
    x: (index * 87) % 1280,
    y: 34 + ((index * 49) % 470),
    length: 17 + (index % 6) * 4,
    speed: 58 + (index % 8) * 10
  }));
  scene.props.brokenBranches = [
    { x: 610, y: 620, rotation: -0.18 },
    { x: 995, y: 636, rotation: 0.22 },
    { x: 1510, y: 626, rotation: -0.2 }
  ];
  scene.props.glowPlants = [
    { x: 365, y: 610, active: true },
    { x: 710, y: 628, active: false },
    { x: 1175, y: 612, active: true },
    { x: 1610, y: 628, active: false }
  ];
  scene.props.repairParts = [
    { x: 1110, y: 584, type: "coil" },
    { x: 1430, y: 586, type: "gear" }
  ];
  scene.repairTarget = {
    id: "rainbarrel-drain",
    x: 1110,
    radius: 240,
    prompt: "Storm drain is clogged.",
    guidance: "Runoff is pooling near the cottages. The drain needs clearing.",
    puzzleTheme: "water-routing",
    completeEffect: "rainbarrel-drain-clear",
    completeMessage: "Stormwater redirected. Chapter repairs complete.",
    continueMessage: "Stormwater redirected. Press Space to enjoy the view.",
    reactions: [
      { text: "No more water at the door!", x: 740, y: 318 },
      { text: "The barrels are behaving again!", x: 1540, y: 326 },
      { text: "Runoff channel restored.", x: "robot", y: "robotTop", kind: "robot" }
    ],
    nextScene: null
  };

  return scene;
}
