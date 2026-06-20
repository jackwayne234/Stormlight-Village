import { config } from "../config.js";

const { colors } = config;

export function drawCharacter(ctx, character, time) {
  const bob = Math.sin(time * 2.2) * 2;
  const x = character.x;
  const y = character.y + bob;

  ctx.save();
  ctx.translate(x, y);
  ctx.scale(character.facing || 1, 1);

  drawShadow(ctx);
  drawLegs(ctx, character.walking, time);
  drawBody(ctx);
  drawHead(ctx);
  drawToolKit(ctx);
  drawLantern(ctx, time);

  ctx.restore();
}

function drawShadow(ctx) {
  ctx.fillStyle = "rgba(22, 27, 24, 0.28)";
  ctx.beginPath();
  ctx.ellipse(0, 86, 52, 12, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawLegs(ctx, walking, time) {
  const step = walking ? Math.sin(time * 10) * 8 : 0;
  ctx.strokeStyle = "#273138";
  ctx.lineWidth = 12;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-16, 36);
  ctx.lineTo(-24 - step, 72);
  ctx.moveTo(15, 36);
  ctx.lineTo(24 + step, 72);
  ctx.stroke();

  ctx.strokeStyle = "#56422e";
  ctx.lineWidth = 9;
  ctx.beginPath();
  ctx.moveTo(-24, 72);
  ctx.lineTo(-42 - step, 74);
  ctx.moveTo(24, 72);
  ctx.lineTo(42 + step, 74);
  ctx.stroke();
}

function drawBody(ctx) {
  ctx.fillStyle = colors.characterBlue;
  roundedRect(ctx, -32, -34, 64, 82, 18);
  ctx.fill();

  ctx.fillStyle = "#d9b16b";
  roundedRect(ctx, -25, -24, 50, 66, 12);
  ctx.fill();

  ctx.strokeStyle = "#38505c";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-26, -20);
  ctx.lineTo(24, 38);
  ctx.moveTo(26, -20);
  ctx.lineTo(-24, 38);
  ctx.stroke();

  ctx.strokeStyle = "#2f3f48";
  ctx.lineWidth = 9;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-30, -14);
  ctx.lineTo(-56, 18);
  ctx.moveTo(30, -12);
  ctx.lineTo(56, 8);
  ctx.stroke();
}

function drawHead(ctx) {
  ctx.fillStyle = "#dca56f";
  ctx.beginPath();
  ctx.ellipse(0, -68, 28, 30, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = colors.characterCap;
  ctx.beginPath();
  ctx.ellipse(0, -94, 31, 14, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(-27, -94, 54, 18);

  ctx.fillStyle = "#334750";
  ctx.beginPath();
  ctx.ellipse(27, -88, 24, 8, 0.12, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#f2d9a2";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.ellipse(0, -70, 30, 14, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = "#243035";
  ctx.beginPath();
  ctx.arc(-9, -68, 3, 0, Math.PI * 2);
  ctx.arc(10, -68, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#7b4d39";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(2, -58, 9, 0.15, Math.PI - 0.15);
  ctx.stroke();
}

function drawToolKit(ctx) {
  ctx.fillStyle = "#62412c";
  roundedRect(ctx, -52, 24, 28, 24, 6);
  ctx.fill();

  ctx.strokeStyle = colors.brass;
  ctx.lineWidth = 3;
  ctx.strokeRect(-47, 29, 18, 12);
}

function drawLantern(ctx, time) {
  const glow = 0.72 + Math.sin(time * 3) * 0.1;

  ctx.strokeStyle = colors.brass;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(55, 8);
  ctx.lineTo(74, 34);
  ctx.stroke();

  ctx.fillStyle = colors.brass;
  roundedRect(ctx, 60, 28, 32, 42, 8);
  ctx.fill();

  ctx.fillStyle = `rgba(255, 231, 150, ${glow})`;
  roundedRect(ctx, 67, 36, 18, 24, 5);
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
