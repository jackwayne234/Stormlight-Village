export function createWeatherAudio(getScene, audioManager) {
  let lastStrikeKey = "";
  let entranceThunderPlayed = false;

  function start() {
    try {
      audioManager.unlock();
      audioManager.play("weather.rain.loop").catch(() => {});
      playEntranceThunder();
    } catch {
      // Audio is nice to have; rendering should never depend on browser playback permission.
    }
  }

  function playEntranceThunder() {
    if (entranceThunderPlayed) {
      return;
    }

    entranceThunderPlayed = true;
    audioManager.play("weather.thunder.roll", {
      fallbackId: "weather.thunder.fallback",
      volume: 0.9
    }).catch(() => {});
  }

  function update(time) {
    if (!audioManager.isUnlocked()) {
      return;
    }

    const scene = getScene();
    const strike = scene.weather.lightning.activeStrike;
    if (!strike) {
      return;
    }

    const age = time - strike.startTime;
    const strikeKey = `${scene.id}:${strike.id}`;

    if (entranceThunderPlayed && !lastStrikeKey) {
      lastStrikeKey = strikeKey;
      return;
    }

    if (age > 0.32 && age < 0.55 && strikeKey !== lastStrikeKey) {
      lastStrikeKey = strikeKey;
      audioManager.play("weather.thunder.roll").catch(() => {});
    }
  }

  return {
    start,
    update
  };
}
