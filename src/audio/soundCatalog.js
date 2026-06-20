export const soundCatalog = {
  "weather.rain.loop": {
    generated: "steadyRainLoop",
    bus: "ambience",
    volume: 0.46
  },
  "weather.thunder.roll": {
    files: ["./assets/audio/weather/rolling-thunder-pixabay.mp3"],
    bus: "weather",
    volume: 0.9,
    cooldown: 8,
    restart: false
  },
  "weather.thunder.fallback": {
    generated: "lowThunder",
    bus: "weather",
    volume: 0.42,
    cooldown: 8
  },
  "weather.transition.thunder": {
    generated: "lowThunder",
    bus: "weather",
    volume: 0.46,
    cooldown: 1.4
  },
  "ui.scan.chirp": {
    generated: "robotChirp",
    bus: "robot",
    volume: 0.34,
    cooldown: 0.35
  },
  "ui.repair.success": {
    generated: "successChime",
    bus: "machines",
    volume: 0.58,
    cooldown: 0.8
  },
  "ui.puzzle.rotate": {
    generated: "tileClick",
    bus: "ui",
    volume: 0.26,
    cooldown: 0.04
  }
};

export const busDefaults = {
  master: 1,
  ambience: 0.8,
  weather: 1,
  ui: 0.75,
  character: 0.85,
  robot: 0.75,
  collectibles: 0.8,
  machines: 0.85,
  music: 0.65
};
