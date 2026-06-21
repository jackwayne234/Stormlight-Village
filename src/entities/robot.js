import { config } from "../config.js";

const { colors } = config;
const robotSprite = createSpriteImage("assets/sprites/characters/robot/robot-cover-idle-trimmed.png");
const SPRITE_HEIGHT = 96;

export function drawRobot(ctx, robot, time) {
  const hover = Math.sin(time * 2.6) * 8;
  const blink = Math.sin(time * 4.5) > 0.92;
  const x = robot.x;
  const y = robot.y + hover;

  ctx.save();
  ctx.translate(x, y);

  drawGlow(ctx, time);
  if (robotSprite?.complete && robotSprite.naturalWidth > 0) {
    drawSpriteRobot(ctx, robotSprite);
  } else {
    drawBody(ctx);
    drawFace(ctx, blink);
    drawAntenna(ctx, time);
    drawTinyArms(ctx, time);
  }

  ctx.restore();
}

function createSpriteImage(src) {
  if (typeof Image === "undefined") {
    return null;
  }

  const image = new Image();
  image.src = src;
  return image;
}

function drawSpriteRobot(ctx, sprite) {
  const aspect = sprite.naturalWidth / sprite.naturalHeight;
  const width = SPRITE_HEIGHT * aspect;

  ctx.drawImage(sprite, -width * 0.5, -SPRITE_HEIGHT * 0.5, width, SPRITE_HEIGHT);
}

function drawGlow(ctx, time) {
  const pulse = 0.22 + Math.sin(time * 3) * 0.04;
  const gradient = ctx.createRadialGradient(0, 0, 12, 0, 0, 70);
  gradient.addColorStop(0, `rgba(143, 217, 240, ${pulse})`);
  gradient.addColorStop(1, "rgba(143, 217, 240, 0)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(0, 0, 70, 0, Math.PI * 2);
  ctx.fill();
}

function drawBody(ctx) {
  ctx.fillStyle = colors.robotBody;
  roundedRect(ctx, -38, -28, 76, 58, 22);
  ctx.fill();

  ctx.strokeStyle = "#7b9696";
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.fillStyle = "#eef8f3";
  roundedRect(ctx, -25, -17, 50, 30, 10);
  ctx.fill();
}

function drawFace(ctx, blink) {
  ctx.fillStyle = "#293b40";
  roundedRect(ctx, -20, -12, 40, 21, 8);
  ctx.fill();

  ctx.fillStyle = colors.robotBlue;
  if (blink) {
    ctx.fillRect(-13, -2, 26, 3);
  } else {
    ctx.beginPath();
    ctx.arc(-10, -2, 4, 0, Math.PI * 2);
    ctx.arc(10, -2, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = colors.robotBlue;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 5, 8, 0.2, Math.PI - 0.2);
    ctx.stroke();
  }
}

function drawAntenna(ctx, time) {
  ctx.strokeStyle = "#7b9696";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(0, -30);
  ctx.lineTo(Math.sin(time * 2) * 5, -51);
  ctx.stroke();

  ctx.fillStyle = colors.robotBlue;
  ctx.beginPath();
  ctx.arc(Math.sin(time * 2) * 5, -55, 6, 0, Math.PI * 2);
  ctx.fill();
}

function drawTinyArms(ctx, time) {
  ctx.strokeStyle = "#9ab0ad";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-38, -2);
  ctx.lineTo(-54, 8 + Math.sin(time * 3) * 4);
  ctx.moveTo(38, -2);
  ctx.lineTo(54, -12 + Math.sin(time * 3 + 1) * 4);
  ctx.stroke();
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
