export const soundCatalog = {
  "weather.thunder.roll": {
    files: ["./assets/audio/weather/rolling-thunder-pixabay.mp3"],
    bus: "weather",
    volume: 0.72,
    cooldown: 8,
    restart: false
  },
  "weather.thunder.fallback": {
    generated: "lowThunder",
    bus: "weather",
    volume: 0.24,
    cooldown: 8
  }
};

export const busDefaults = {
  master: 1,
  ambience: 0.8,
  weather: 0.85,
  ui: 0.75,
  character: 0.85,
  robot: 0.75,
  collectibles: 0.8,
  machines: 0.85,
  music: 0.65
};
