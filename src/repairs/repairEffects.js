export function applyRepairEffect(scene) {
  const effect = scene.repairTarget?.completeEffect;

  if (effect === "village-lights-on") {
    if (scene.waterWheel) scene.waterWheel.damaged = false;
    scene.background.cottages.forEach((cottage) => {
      cottage.lit = true;
    });
    scene.background.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
  }

  if (effect === "grove-glow-bridge") {
    scene.props.glowPlants.forEach((plant) => {
      plant.active = true;
    });
    scene.background.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
    if (scene.bridge) scene.bridge.repaired = true;
  }

  if (effect === "switchyard-online") {
    scene.switchyard?.poles.forEach((pole) => {
      pole.lit = true;
    });
    scene.switchyard?.boxes.forEach((box) => {
      box.lit = true;
    });
    scene.background.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
  }

  if (effect === "storm-gauge-stable") {
    scene.weather.rain.alpha = Math.max(0.2, scene.weather.rain.alpha - 0.1);
    scene.weather.wind.leafCount = Math.max(8, scene.weather.wind.leafCount - 10);
    if (scene.ridge?.gauge) scene.ridge.gauge.lit = true;
    scene.background.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
  }

  if (effect === "beacon-on") {
    if (scene.beaconHill?.tower) scene.beaconHill.tower.lit = true;
    scene.background.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
  }

  if (effect === "rainbarrel-drain-clear") {
    if (scene.rainbarrelRow?.drain) scene.rainbarrelRow.drain.cleared = true;
    scene.rainbarrelRow?.channels.forEach((channel) => {
      channel.flow = true;
    });
    scene.rainbarrelRow?.barrels.forEach((barrel) => {
      barrel.overflow = false;
    });
    scene.rainbarrelRow?.gutters.forEach((gutter) => {
      gutter.drip = false;
    });
    scene.background.cottages.forEach((cottage) => {
      cottage.lit = true;
    });
    scene.background.lamps.forEach((lamp) => {
      lamp.lit = true;
    });
  }
}
