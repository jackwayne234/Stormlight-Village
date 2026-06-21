import { config } from "./config.js";
import { drawCharacter } from "./entities/character.js";
import { drawRobot } from "./entities/robot.js";
import { drawWaterWheel } from "./entities/waterWheel.js";
import { drawBeaconHill } from "./sceneRenderers/beaconHillRenderer.js";
import { drawFootbridge } from "./sceneRenderers/bridgeRenderer.js";
import { drawRainbarrelRow } from "./sceneRenderers/rainbarrelRowRenderer.js";
import { drawStormRidge } from "./sceneRenderers/stormRidgeRenderer.js";
import { drawSwitchyard } from "./sceneRenderers/switchyardRenderer.js";
import {
  drawBrokenBranch,
  drawCottage,
  drawGlowPlant,
  drawLamp,
  drawRepairPart,
  drawTree
} from "./entities/props.js";

const { colors } = config;

export function renderScene(ctx, scene, time) {
  const { width, height } = config.canvas;
  const worldWidth = scene.world.width;
  const cameraX = scene.camera?.x || 0;
  ctx.clearRect(0, 0, width, height);

  drawSky(ctx, width, height);
  drawLightning(ctx, scene.weather.lightning, time, width, height, cameraX);
  drawRain(ctx, scene.weather.raindrops, time, width, height, scene.weather.rain);

  ctx.save();
  ctx.translate(-cameraX, 0);
  drawDistantHills(ctx, worldWidth, height);
  scene.background.trees.forEach((tree) => drawTree(ctx, tree, time));
  scene.background.cottages.forEach((cottage) => drawCottage(ctx, cottage, time));
  drawGround(ctx, worldWidth, height);
  drawPath(ctx, worldWidth, scene.background.lamps, time);
  drawStream(ctx, time);
  drawMist(ctx, scene.weather.mistBands, time, worldWidth);
  scene.weather.puddles.forEach((puddle) => drawPuddle(ctx, puddle, time));
  scene.background.lamps.forEach((lamp) => drawLamp(ctx, lamp, time));
  scene.props.brokenBranches.forEach((branch) => drawBrokenBranch(ctx, branch));
  scene.props.glowPlants.forEach((plant) => drawGlowPlant(ctx, plant, time));
  if (scene.bridge) {
    drawFootbridge(ctx, scene.bridge);
  }
  if (scene.switchyard) {
    drawSwitchyard(ctx, scene.switchyard, time);
  }
  if (scene.ridge) {
    drawStormRidge(ctx, scene.ridge, time);
  }
  if (scene.beaconHill) {
    drawBeaconHill(ctx, scene.beaconHill, time);
  }
  if (scene.rainbarrelRow) {
    drawRainbarrelRow(ctx, scene.rainbarrelRow, time);
  }
  if (scene.waterWheel) {
    drawWaterWheel(ctx, scene.waterWheel, time);
  }
  scene.props.repairParts.forEach((part) => drawRepairPart(ctx, part, time));
  drawLanternGlow(ctx, scene.lantern, time);
  drawCharacter(ctx, scene.character, time);
  drawRobot(ctx, scene.robot, time);
  drawWindLeaves(ctx, worldWidth, height, time, scene.weather.wind);
  drawForegroundLeaves(ctx, worldWidth, height, time);
  ctx.restore();
}

function getLightningIntensity(lightning, time) {
  const strike = lightning.activeStrike;

  if (!strike) {
    return { intensity: 0, strike: null };
  }

  const age = time - strike.startTime;
  const intensity =
    (age >= 0 && age < 0.08 ? 1 - age / 0.08 : 0) +
    (age >= 0.16 && age < 0.24 ? 0.68 * (1 - (age - 0.16) / 0.08) : 0) +
    (age >= 0.32 && age < 0.4 ? 0.36 * (1 - (age - 0.32) / 0.08) : 0);

  return { intensity, strike };
}

function drawLightning(ctx, lightning, time, width, height, cameraX) {
  const { intensity, strike } = getLightningIntensity(lightning, time);

  if (intensity <= 0) {
    return;
  }

  ctx.fillStyle = `rgba(226, 240, 230, ${0.24 * intensity})`;
  ctx.fillRect(0, 0, width, height);

  const strikeX = strike.x - cameraX;
  const skyGlow = ctx.createRadialGradient(strikeX, 80, 30, strikeX, 140, 470);
  skyGlow.addColorStop(0, `rgba(255, 245, 191, ${0.42 * intensity})`);
  skyGlow.addColorStop(1, "rgba(255, 245, 191, 0)");
  ctx.fillStyle = skyGlow;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = `rgba(255, 245, 191, ${0.82 * intensity})`;
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(strikeX, 0);
  ctx.lineTo(strikeX - 24, 68);
  ctx.lineTo(strikeX + 18, 112);
  ctx.lineTo(strikeX - 8, 178);
  ctx.stroke();

  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(strikeX + 18, 112);
  ctx.lineTo(strikeX + 56 + strike.fork * 40, 142);
  ctx.lineTo(strikeX + 28, 196);
  ctx.stroke();
}

function drawSky(ctx, width, height) {
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, colors.skyTop);
  gradient.addColorStop(0.48, colors.skyMid);
  gradient.addColorStop(0.82, colors.skyLow);
  gradient.addColorStop(1, "#465244");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "rgba(255, 232, 166, 0.25)";
  ctx.beginPath();
  ctx.ellipse(870, 168, 115, 48, -0.18, 0, Math.PI * 2);
  ctx.fill();
}

function drawDistantHills(ctx, width, height) {
  ctx.fillStyle = colors.hillFar;
  ctx.beginPath();
  ctx.moveTo(0, 430);
  ctx.bezierCurveTo(165, 308, 320, 362, 470, 302);
  ctx.bezierCurveTo(650, 232, 790, 342, 935, 292);
  ctx.bezierCurveTo(1080, 242, 1190, 330, width, 285);
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = colors.hillNear;
  ctx.beginPath();
  ctx.moveTo(0, 512);
  ctx.bezierCurveTo(170, 388, 330, 474, 492, 394);
  ctx.bezierCurveTo(690, 298, 848, 438, 1018, 368);
  ctx.bezierCurveTo(1130, 322, 1215, 386, width, 352);
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.closePath();
  ctx.fill();
}

function drawGround(ctx, width, height) {
  ctx.fillStyle = colors.groundDark;
  ctx.fillRect(0, 586, width, height - 586);

  ctx.fillStyle = colors.ground;
  ctx.beginPath();
  ctx.moveTo(0, 580);
  ctx.bezierCurveTo(180, 552, 255, 602, 415, 578);
  ctx.bezierCurveTo(610, 548, 730, 612, 918, 572);
  ctx.bezierCurveTo(1078, 538, 1180, 580, 1280, 548);
  ctx.bezierCurveTo(1455, 520, 1620, 590, 1800, 555);
  ctx.bezierCurveTo(1970, 522, 2105, 565, width, 542);
  ctx.lineTo(width, 720);
  ctx.lineTo(0, 720);
  ctx.closePath();
  ctx.fill();
}

function drawPath(ctx, width, lamps = [], time = 0) {
  const pathGradient = ctx.createLinearGradient(0, 560, 0, 720);
  pathGradient.addColorStop(0, colors.path);
  pathGradient.addColorStop(0.55, "#6c6654");
  pathGradient.addColorStop(1, "#3f4539");
  ctx.fillStyle = pathGradient;
  ctx.beginPath();
  ctx.moveTo(0, 676);
  ctx.bezierCurveTo(220, 626, 380, 650, 565, 632);
  ctx.bezierCurveTo(745, 614, 885, 638, 1045, 604);
  ctx.bezierCurveTo(1155, 582, 1230, 578, 1280, 560);
  ctx.bezierCurveTo(1510, 534, 1710, 642, 1940, 598);
  ctx.bezierCurveTo(2060, 576, 2140, 586, width, 562);
  ctx.lineTo(width, 720);
  ctx.lineTo(0, 720);
  ctx.closePath();
  ctx.fill();

  drawWetStoneSegments(ctx, width, time);
  drawPathLampReflections(ctx, lamps, time);

  ctx.strokeStyle = "rgba(231, 219, 176, 0.26)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(130, 668);
  ctx.bezierCurveTo(340, 638, 505, 658, 716, 632);
  ctx.bezierCurveTo(970, 602, 1190, 620, 1440, 584);
  ctx.bezierCurveTo(1640, 558, 1840, 626, 2075, 584);
  ctx.stroke();
}

function drawWetStoneSegments(ctx, width, time) {
  ctx.save();
  ctx.globalCompositeOperation = "screen";

  for (let x = 120; x < width; x += 165) {
    const y = 654 - Math.sin(x * 0.012) * 18;
    const shimmer = 0.11 + Math.sin(time * 2.2 + x) * 0.025;
    ctx.strokeStyle = `rgba(236, 229, 190, ${shimmer})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(x, y, 58, 12, -0.1 + Math.sin(x) * 0.04, 0.1, Math.PI - 0.1);
    ctx.stroke();

    ctx.strokeStyle = "rgba(32, 39, 34, 0.22)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x - 74, y + 19);
    ctx.bezierCurveTo(x - 34, y + 6, x + 22, y + 25, x + 76, y + 8);
    ctx.stroke();
  }

  ctx.restore();
}

function drawPathLampReflections(ctx, lamps, time) {
  ctx.save();
  ctx.globalCompositeOperation = "screen";

  lamps
    .filter((lamp) => lamp.lit)
    .forEach((lamp) => {
      const flicker = 0.88 + Math.sin(time * 4.2 + lamp.x * 0.01) * 0.12;
      const reflection = ctx.createRadialGradient(lamp.x + 30, 650, 4, lamp.x + 30, 650, 150);
      reflection.addColorStop(0, `rgba(255, 214, 132, ${0.2 * flicker})`);
      reflection.addColorStop(0.45, `rgba(255, 188, 91, ${0.11 * flicker})`);
      reflection.addColorStop(1, "rgba(255, 188, 91, 0)");
      ctx.fillStyle = reflection;
      ctx.beginPath();
      ctx.ellipse(lamp.x + 34, 650, 96, 20, -0.08, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = `rgba(255, 232, 166, ${0.22 * flicker})`;
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      for (let i = 0; i < 3; i += 1) {
        const y = 636 + i * 14 + Math.sin(time * 2.5 + i + lamp.x) * 2;
        ctx.beginPath();
        ctx.moveTo(lamp.x - 52 + i * 12, y);
        ctx.bezierCurveTo(lamp.x - 12, y - 6, lamp.x + 52, y + 5, lamp.x + 92, y - 3);
        ctx.stroke();
      }
    });

  ctx.restore();
}

function drawStream(ctx, time) {
  ctx.fillStyle = "rgba(63, 116, 128, 0.78)";
  ctx.beginPath();
  ctx.moveTo(760, 622);
  ctx.bezierCurveTo(810, 600, 900, 608, 970, 584);
  ctx.lineTo(1028, 720);
  ctx.lineTo(812, 720);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "rgba(206, 238, 229, 0.34)";
  ctx.lineWidth = 3;
  for (let i = 0; i < 4; i += 1) {
    const y = 632 + i * 22 + Math.sin(time * 1.6 + i) * 3;
    ctx.beginPath();
    ctx.moveTo(805, y);
    ctx.bezierCurveTo(865, y - 12, 925, y + 8, 992, y - 8);
    ctx.stroke();
  }
}

function drawRain(ctx, drops, time, width, height, rain = {}) {
  const alpha = rain.alpha ?? 0.18;
  const wind = rain.wind ?? 10;
  ctx.strokeStyle = `rgba(206, 229, 226, ${alpha})`;
  ctx.lineWidth = rain.lineWidth ?? 2;
  drops.forEach((drop) => {
    const y = (drop.y + time * drop.speed) % height;
    const x = (drop.x + time * wind) % width;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 6 - wind * 0.18, y + drop.length);
    ctx.stroke();
  });
}

function drawWindLeaves(ctx, width, height, time, wind = {}) {
  const count = wind.leafCount || 0;
  const strength = wind.strength || 1;

  if (!count) {
    return;
  }

  ctx.fillStyle = "rgba(124, 154, 91, 0.48)";
  for (let i = 0; i < count; i += 1) {
    const x = (i * 173 + time * 120 * strength) % (width + 120) - 60;
    const y = 90 + ((i * 59 + Math.sin(time * 2 + i) * 24) % (height - 190));
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(-0.45 + Math.sin(time * 5 + i) * 0.3);
    ctx.beginPath();
    ctx.ellipse(0, 0, 18, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function drawMist(ctx, bands, time, width) {
  ctx.fillStyle = "rgba(222, 235, 221, 0.16)";
  bands.forEach((band, index) => {
    const drift = (band.x + time * band.speed) % (width + band.width) - band.width;
    ctx.beginPath();
    ctx.ellipse(drift, band.y + Math.sin(time + index) * 3, band.width, 22, 0, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawPuddle(ctx, puddle, time) {
  ctx.fillStyle = "rgba(127, 173, 173, 0.42)";
  ctx.beginPath();
  ctx.ellipse(puddle.x, puddle.y, puddle.width / 2, puddle.height / 2, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(240, 236, 205, 0.22)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(puddle.x + Math.sin(time) * 4, puddle.y, puddle.width / 3, puddle.height / 3, 0, 0, Math.PI * 2);
  ctx.stroke();
}

function drawLanternGlow(ctx, lantern, time) {
  const pulse = 1 + Math.sin(time * 2.4) * 0.08;
  const gradient = ctx.createRadialGradient(lantern.x, lantern.y, 18, lantern.x, lantern.y, lantern.radius * pulse);
  gradient.addColorStop(0, "rgba(255, 232, 151, 0.46)");
  gradient.addColorStop(0.35, "rgba(255, 218, 125, 0.2)");
  gradient.addColorStop(1, "rgba(255, 218, 125, 0)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(lantern.x, lantern.y, lantern.radius * pulse, 0, Math.PI * 2);
  ctx.fill();
}

function drawForegroundLeaves(ctx, width, height, time) {
  ctx.fillStyle = "rgba(28, 51, 39, 0.58)";
  for (let i = 0; i < 12; i += 1) {
    const x = (i * 132 + Math.sin(time * 0.7 + i) * 7) % width;
    const y = height - 62 + Math.sin(i) * 18;
    ctx.beginPath();
    ctx.ellipse(x, y, 34, 9, Math.sin(i) * 0.8, 0, Math.PI * 2);
    ctx.fill();
  }
}
