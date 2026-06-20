export function createStormController(scene) {
  const entryDelay = scene.weather.lightning.entryDelay ?? 0.42;
  let nextStrikeAt = entryDelay;
  let strikeId = 0;
  let entranceStrikePlayed = false;

  function update(time) {
    if (entranceStrikePlayed || time < nextStrikeAt) {
      return;
    }

    entranceStrikePlayed = true;
    strikeId += 1;
    scene.weather.lightning.activeStrike = {
      id: strikeId,
      startTime: time,
      x: 620 + Math.random() * 560,
      fork: -0.35 + Math.random() * 0.7
    };
    nextStrikeAt = Number.POSITIVE_INFINITY;
  }

  return { update };
}
