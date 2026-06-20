export function createWeatherAudio(scene, audioManager) {
  let lastStrikeKey = "";

  function setEnabled(enabled) {
    if (!enabled) {
      return;
    }

    audioManager.unlock();
    audioManager.play("weather.thunder.roll");
  }

  function update(time) {
    if (!audioManager.isUnlocked()) {
      return;
    }

    const strike = scene.weather.lightning.activeStrike;
    if (!strike) {
      return;
    }

    const age = time - strike.startTime;
    const strikeKey = String(strike.id);

    if (age > 0.55 && age < 0.7 && strikeKey !== lastStrikeKey) {
      lastStrikeKey = strikeKey;
      audioManager.play("weather.thunder.roll");
    }
  }

  return {
    setEnabled,
    update
  };
}
