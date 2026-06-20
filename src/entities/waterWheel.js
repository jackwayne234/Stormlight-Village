import { config } from "../config.js";

const { colors } = config;

export function drawWaterWheel(ctx, wheel, time) {
  ctx.save();
  ctx.translate(wheel.x, wheel.y);

  drawGeneratorHouse(ctx);
  drawWheel(ctx, wheel.radius, time, wheel.damaged);
  if (wheel.damaged) {
    drawDamage(ctx);
  }
  drawWater(ctx, time);

  ctx.restore();
}

function drawGeneratorHouse(ctx) {
  ctx.fillStyle = colors.wood;
  roundedRect(ctx, 56, -70, 150, 132, 10);
  ctx.fill();

  ctx.fillStyle = "#4a3629";
  ctx.beginPath();
  ctx.moveTo(44, -70);
  ctx.lineTo(132, -128);
  ctx.lineTo(222, -70);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "rgba(255, 216, 135, 0.34)";
  roundedRect(ctx, 104, -38, 48, 35, 8);
  ctx.fill();

  ctx.strokeStyle = colors.copper;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(164, -12);
  ctx.bezierCurveTo(205, -2, 224, 30, 246, 66);
  ctx.stroke();
}

function drawWheel(ctx, radius, time, damaged) {
  const wobble = Math.sin(time * 1.1) * 0.025;
  const spin = damaged ? 0 : time * 0.36;
  ctx.save();
  ctx.rotate(-0.18 + wobble + spin);

  ctx.strokeStyle = "#4b3326";
  ctx.lineWidth = 18;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = colors.brass;
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(0, 0, radius - 18, 0, Math.PI * 2);
  ctx.stroke();

  for (let i = 0; i < 12; i += 1) {
    const angle = (Math.PI * 2 * i) / 12;
    ctx.save();
    ctx.rotate(angle);
    ctx.strokeStyle = i === 3 ? "#2d2521" : "#5a3b2b";
    ctx.lineWidth = i === 3 ? 5 : 7;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(radius - 9, 0);
    ctx.stroke();

    ctx.fillStyle = "#6f5137";
    ctx.fillRect(radius - 18, -12, 34, 24);
    ctx.restore();
  }

  ctx.fillStyle = colors.copper;
  ctx.beginPath();
  ctx.arc(0, 0, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawDamage(ctx) {
  ctx.strokeStyle = "#21201d";
  ctx.lineWidth = 7;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-55, -52);
  ctx.lineTo(-28, -22);
  ctx.moveTo(-64, -18);
  ctx.lineTo(-30, -42);
  ctx.stroke();

  ctx.fillStyle = "rgba(255, 221, 120, 0.7)";
  ctx.beginPath();
  ctx.arc(78, 62, 9, 0, Math.PI * 2);
  ctx.fill();
}

function drawWater(ctx, time) {
  ctx.strokeStyle = "rgba(202, 232, 229, 0.7)";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  for (let i = 0; i < 5; i += 1) {
    ctx.beginPath();
    ctx.moveTo(-74 + i * 28, 96 + Math.sin(time * 2 + i) * 4);
    ctx.bezierCurveTo(-62 + i * 28, 108, -38 + i * 28, 84, -22 + i * 28, 98);
    ctx.stroke();
  }
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
