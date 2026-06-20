import { createBaseScene } from "./baseScene.js";

export function createBeaconHillScene() {
  const scene = createBaseScene();

  scene.title = "Beacon Hill Signal Tower";
  scene.world.width = 2100;
  scene.character.x = 310;
  scene.robot.x = 422;
  scene.lantern.x = 365;
  scene.weather.rain = {
    alpha: 0.28,
    lineWidth: 2.25,
    wind: 22
  };
  scene.weather.wind = {
    strength: 1.45,
    leafCount: 18
  };
  scene.weather.lightning.minimumDelay = 55;
  scene.weather.lightning.maximumDelay = 150;
  scene.beaconHill = {
    tower: { x: 1240, y: 522, lit: true },
    shed: { x: 1640, y: 444, lit: true },
    flags: [
      { x: 870, y: 382, color: "#d8aa57" },
      { x: 1330, y: 268, color: "#c97945" },
      { x: 1815, y: 386, color: "#8fd9f0" }
    ],
    cables: [
      { fromX: 560, fromY: 388, toX: 1240, toY: 250 },
      { fromX: 1240, fromY: 250, toX: 1760, toY: 405 }
    ]
  };

  scene.background.trees = [
    { x: 90, y: 304, scale: 0.94 },
    { x: 295, y: 284, scale: 1.1 },
    { x: 650, y: 324, scale: 0.78 },
    { x: 1010, y: 306, scale: 0.9 },
    { x: 1510, y: 318, scale: 0.82 },
    { x: 1940, y: 292, scale: 1.0 }
  ];
  scene.background.cottages = [];
  scene.background.lamps = [
    { x: 430, y: 534, lit: true },
    { x: 965, y: 526, lit: true },
    { x: 1810, y: 532, lit: false }
  ];
  scene.weather.puddles = [
    { x: 140, y: 660, width: 180, height: 18 },
    { x: 620, y: 672, width: 210, height: 18 },
    { x: 990, y: 652, width: 240, height: 19 },
    { x: 1480, y: 675, width: 210, height: 18 },
    { x: 1885, y: 650, width: 190, height: 18 }
  ];
  scene.weather.mistBands = [
    { x: 160, y: 410, width: 360, speed: 14 },
    { x: 760, y: 382, width: 430, speed: 16 },
    { x: 1380, y: 462, width: 400, speed: 15 }
  ];
  scene.weather.raindrops = Array.from({ length: 62 }, (_, index) => ({
    x: (index * 89) % 1280,
    y: 40 + ((index * 51) % 470),
    length: 16 + (index % 6) * 4,
    speed: 54 + (index % 8) * 9
  }));
  scene.props.brokenBranches = [
    { x: 530, y: 622, rotation: -0.26 },
    { x: 920, y: 638, rotation: 0.18 },
    { x: 1710, y: 624, rotation: -0.18 }
  ];
  scene.props.glowPlants = [
    { x: 420, y: 610, active: true },
    { x: 750, y: 626, active: true },
    { x: 1085, y: 610, active: false },
    { x: 1540, y: 628, active: true }
  ];
  scene.props.repairParts = [
    { x: 1030, y: 578, type: "gear" },
    { x: 1710, y: 584, type: "coil" }
  ];
  scene.repairTarget = {
    id: "beacon-tower",
    x: 1240,
    radius: 250,
    prompt: "Beacon signal is weak.",
    guidance: "The beacon signal is weak. We're close.",
    puzzleTheme: "beacon-signal",
    completeEffect: "beacon-on",
    completeMessage: "Beacon restored. First chapter repairs complete.",
    reactions: [
      { text: "The beacon is shining!", x: 1240, y: 352 },
      { text: "Signal restored. Chapter complete.", x: "robot", y: "robotTop", kind: "robot" }
    ],
    nextScene: null
  };

  return scene;
}
