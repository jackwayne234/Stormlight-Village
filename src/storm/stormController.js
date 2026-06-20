export function createStormController(scene) {
  const minimumDelay = scene.weather.lightning.minimumDelay || 60;
  const maximumDelay = scene.weather.lightning.maximumDelay || 180;
  let nextStrikeAt = randomDelay(minimumDelay, maximumDelay);
  let strikeId = 0;

  function update(time) {
    if (time < nextStrikeAt) {
      return;
    }

    strikeId += 1;
    scene.weather.lightning.activeStrike = {
      id: strikeId,
      startTime: time,
      x: 620 + Math.random() * 560,
      fork: -0.35 + Math.random() * 0.7
    };
    nextStrikeAt = time + randomDelay(minimumDelay, maximumDelay);
  }

  return { update };
}

function randomDelay(minimum, maximum) {
  return minimum + Math.random() * (maximum - minimum);
}
