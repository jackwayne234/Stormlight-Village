import { config } from "../config.js";

export function createBaseScene() {
  const { width, height } = config.canvas;
  const worldWidth = 2200;

  return {
    title: config.title,
    world: { width: worldWidth, height },
    camera: { x: 0, width, height },
    weather: {
      lightning: {
        activeStrike: null
      },
      puddles: [
        { x: 110, y: 650, width: 170, height: 22 },
        { x: 440, y: 674, width: 220, height: 18 },
        { x: 890, y: 652, width: 160, height: 16 }
      ],
      mistBands: [
        { x: 90, y: 450, width: 300, speed: 8 },
        { x: 570, y: 394, width: 360, speed: 12 },
        { x: 920, y: 486, width: 270, speed: 10 }
      ],
      raindrops: Array.from({ length: 42 }, (_, index) => ({
        x: (index * 97) % width,
        y: 60 + ((index * 53) % 410),
        length: 12 + (index % 5) * 3,
        speed: 36 + (index % 7) * 8
      }))
    },
    background: {
      trees: [],
      cottages: [],
      lamps: []
    },
    props: {
      brokenBranches: [],
      glowPlants: [],
      repairParts: []
    },
    character: {
      x: 365,
      y: 562,
      variant: "apprentice",
      facing: 1
    },
    robot: {
      x: 484,
      y: 420
    },
    lantern: {
      x: 420,
      y: 520,
      radius: 150
    }
  };
}
