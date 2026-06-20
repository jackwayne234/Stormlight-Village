import { config } from "../config.js";

const { colors } = config;

export function drawTree(ctx, tree, time) {
  ctx.save();
  ctx.translate(tree.x, tree.y);
  ctx.scale(tree.scale, tree.scale);

  ctx.fillStyle = colors.bark;
  ctx.beginPath();
  ctx.moveTo(-18, 230);
  ctx.bezierCurveTo(-8, 135, -4, 70, 6, 0);
  ctx.bezierCurveTo(24, 74, 28, 142, 20, 230);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "#2d2724";
  ctx.lineWidth = 10;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(4, 92);
  ctx.lineTo(-46, 48);
  ctx.moveTo(8, 116);
  ctx.lineTo(58, 68);
  ctx.stroke();

  drawLeafCluster(ctx, -42, 34, 64, time);
  drawLeafCluster(ctx, 35, 48, 70, time + 1);
  drawLeafCluster(ctx, 0, 0, 82, time + 2);

  ctx.restore();
}

export function drawCottage(ctx, cottage, time) {
  ctx.save();
  ctx.translate(cottage.x, cottage.y);
  ctx.scale(cottage.scale, cottage.scale);

  ctx.fillStyle = "#6c543b";
  roundedRect(ctx, -70, -58, 140, 106, 10);
  ctx.fill();

  ctx.fillStyle = "#46352b";
  ctx.beginPath();
  ctx.moveTo(-86, -58);
  ctx.lineTo(0, -120);
  ctx.lineTo(86, -58);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = cottage.lit ? `rgba(255, 216, 135, ${0.55 + Math.sin(time * 4) * 0.07})` : "rgba(142, 154, 132, 0.4)";
  roundedRect(ctx, -45, -26, 34, 32, 5);
  ctx.fill();
  roundedRect(ctx, 20, -24, 34, 30, 5);
  ctx.fill();

  ctx.fillStyle = "#3f2e25";
  roundedRect(ctx, -12, 7, 30, 42, 7);
  ctx.fill();

  ctx.restore();
}

export function drawLamp(ctx, lamp, time) {
  ctx.save();
  ctx.translate(lamp.x, lamp.y);

  ctx.strokeStyle = "#3f342b";
  ctx.lineWidth = 7;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(0, 90);
  ctx.lineTo(0, 10);
  ctx.quadraticCurveTo(0, -18, 28, -18);
  ctx.stroke();

  ctx.fillStyle = "#5f4832";
  ctx.beginPath();
  ctx.arc(30, -17, 14, 0, Math.PI * 2);
  ctx.fill();

  const alpha = lamp.lit ? 0.68 + Math.sin(time * 5) * 0.08 : 0.22;
  ctx.fillStyle = `rgba(255, 216, 135, ${alpha})`;
  ctx.beginPath();
  ctx.arc(30, -17, 9, 0, Math.PI * 2);
  ctx.fill();

  if (lamp.lit) {
    const gradient = ctx.createRadialGradient(30, -17, 6, 30, -17, 62);
    gradient.addColorStop(0, "rgba(255, 216, 135, 0.28)");
    gradient.addColorStop(1, "rgba(255, 216, 135, 0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(30, -17, 62, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

export function drawBrokenBranch(ctx, branch) {
  ctx.save();
  ctx.translate(branch.x, branch.y);
  ctx.rotate(branch.rotation);

  ctx.strokeStyle = "#473426";
  ctx.lineWidth = 10;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-42, 0);
  ctx.lineTo(44, 0);
  ctx.moveTo(2, -2);
  ctx.lineTo(24, -28);
  ctx.moveTo(-14, 1);
  ctx.lineTo(-34, -20);
  ctx.stroke();

  ctx.restore();
}

export function drawGlowPlant(ctx, plant, time) {
  ctx.save();
  ctx.translate(plant.x, plant.y);

  ctx.strokeStyle = colors.leafDark;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(0, 28);
  ctx.quadraticCurveTo(-10, 0, -24, -18);
  ctx.moveTo(0, 28);
  ctx.quadraticCurveTo(8, 2, 28, -12);
  ctx.stroke();

  ctx.fillStyle = colors.leaf;
  ctx.beginPath();
  ctx.ellipse(-27, -21, 16, 8, -0.4, 0, Math.PI * 2);
  ctx.ellipse(31, -14, 16, 8, 0.45, 0, Math.PI * 2);
  ctx.fill();

  const glow = plant.active ? 0.65 + Math.sin(time * 3) * 0.12 : 0.22;
  ctx.fillStyle = `rgba(255, 229, 141, ${glow})`;
  ctx.beginPath();
  ctx.arc(0, -22, plant.active ? 11 : 7, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

export function drawRepairPart(ctx, part, time) {
  ctx.save();
  ctx.translate(part.x, part.y + Math.sin(time * 2 + part.x) * 3);

  if (part.type === "gear") {
    drawGear(ctx);
  } else if (part.type === "coil") {
    drawCoil(ctx);
  } else {
    drawSeedBattery(ctx, time);
  }

  ctx.restore();
}

function drawGear(ctx) {
  ctx.fillStyle = colors.brass;
  ctx.beginPath();
  for (let i = 0; i < 16; i += 1) {
    const radius = i % 2 === 0 ? 20 : 15;
    const angle = (Math.PI * 2 * i) / 16;
    ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
  }
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#55402f";
  ctx.beginPath();
  ctx.arc(0, 0, 7, 0, Math.PI * 2);
  ctx.fill();
}

function drawCoil(ctx) {
  ctx.strokeStyle = colors.copper;
  ctx.lineWidth = 6;
  ctx.lineCap = "round";
  ctx.beginPath();
  for (let i = 0; i < 5; i += 1) {
    ctx.moveTo(-22 + i * 11, -14);
    ctx.quadraticCurveTo(-17 + i * 11, 0, -22 + i * 11, 14);
  }
  ctx.stroke();
}

function drawSeedBattery(ctx, time) {
  ctx.fillStyle = "#426d4d";
  roundedRect(ctx, -16, -24, 32, 48, 14);
  ctx.fill();

  ctx.fillStyle = `rgba(255, 230, 140, ${0.76 + Math.sin(time * 3) * 0.1})`;
  ctx.beginPath();
  ctx.ellipse(0, -2, 11, 20, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawLeafCluster(ctx, x, y, radius, time) {
  ctx.fillStyle = colors.leafDark;
  ctx.beginPath();
  ctx.ellipse(x, y, radius, radius * 0.76, Math.sin(time) * 0.04, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = colors.leaf;
  ctx.beginPath();
  ctx.ellipse(x + 14, y - 8, radius * 0.7, radius * 0.5, Math.cos(time) * 0.05, 0, Math.PI * 2);
  ctx.fill();
}

function roundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}
