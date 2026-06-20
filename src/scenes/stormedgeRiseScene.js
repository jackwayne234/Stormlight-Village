import { createBaseScene } from "./baseScene.js";

export function createStormedgeRiseScene() {
  const scene = createBaseScene();

  scene.title = "Stormedge Rise";
  scene.world.width = 2050;
  scene.character.x = 315;
  scene.robot.x = 427;
  scene.lantern.x = 370;
  scene.weather.rain = {
    alpha: 0.34,
    lineWidth: 2.5,
    wind: 28
  };
  scene.weather.wind = {
    strength: 1.8,
    leafCount: 26
  };
  scene.weather.lightning.minimumDelay = 42;
  scene.weather.lightning.maximumDelay = 110;
  scene.ridge = {
    gauge: { x: 1115, y: 508 },
    posts: [
      { x: 560, y: 522, lean: -0.16 },
      { x: 1440, y: 530, lean: 0.14 }
    ]
  };

  scene.background.trees = [
    { x: 95, y: 315, scale: 0.9 },
    { x: 345, y: 286, scale: 1.04 },
    { x: 720, y: 330, scale: 0.78 },
    { x: 1035, y: 292, scale: 1.0 },
    { x: 1360, y: 318, scale: 0.86 },
    { x: 1740, y: 280, scale: 1.08 }
  ];
  scene.background.cottages = [
    { x: 1680, y: 438, scale: 0.62, lit: true }
  ];
  scene.background.lamps = [
    { x: 410, y: 538, lit: true },
    { x: 925, y: 536, lit: false },
    { x: 1535, y: 532, lit: true }
  ];
  scene.weather.puddles = [
    { x: 180, y: 660, width: 220, height: 21 },
    { x: 590, y: 674, width: 190, height: 18 },
    { x: 970, y: 650, width: 260, height: 20 },
    { x: 1420, y: 668, width: 240, height: 19 },
    { x: 1805, y: 654, width: 180, height: 18 }
  ];
  scene.weather.mistBands = [
    { x: 140, y: 416, width: 420, speed: 16 },
    { x: 690, y: 374, width: 460, speed: 18 },
    { x: 1300, y: 455, width: 390, speed: 17 }
  ];
  scene.weather.raindrops = Array.from({ length: 78 }, (_, index) => ({
    x: (index * 83) % 1280,
    y: 35 + ((index * 47) % 470),
    length: 18 + (index % 6) * 4,
    speed: 62 + (index % 8) * 11
  }));
  scene.props.brokenBranches = [
    { x: 505, y: 622, rotation: -0.38 },
    { x: 810, y: 638, rotation: 0.2 },
    { x: 1320, y: 626, rotation: -0.28 },
    { x: 1700, y: 618, rotation: 0.18 }
  ];
  scene.props.glowPlants = [
    { x: 420, y: 610, active: true },
    { x: 760, y: 626, active: false },
    { x: 1185, y: 610, active: true },
    { x: 1510, y: 628, active: true }
  ];
  scene.props.repairParts = [
    { x: 1115, y: 572, type: "coil" },
    { x: 1565, y: 585, type: "gear" }
  ];
  scene.repairTarget = {
    id: "storm-gauge",
    x: 1115,
    radius: 230,
    prompt: "Storm gauge is unstable.",
    guidance: "Wind is rising. The storm gauge needs calibration.",
    puzzleTheme: "storm-gauge",
    completeEffect: "storm-gauge-stable",
    completeMessage: "Storm gauge stabilized. Climbing to Beacon Hill...",
    reactions: [
      { text: "The gauge is holding!", x: 1115, y: 408 },
      { text: "Storm data stabilized.", x: "robot", y: "robotTop", kind: "robot" }
    ],
    nextScene: "beacon-hill"
  };

  return scene;
}
