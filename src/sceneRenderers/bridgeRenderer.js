export function drawFootbridge(ctx, bridge) {
  ctx.save();
  ctx.translate(bridge.x, bridge.y);

  ctx.strokeStyle = "#4a3629";
  ctx.lineWidth = 9;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-bridge.width / 2, 12);
  ctx.quadraticCurveTo(0, -26, bridge.width / 2, 12);
  ctx.moveTo(-bridge.width / 2, 36);
  ctx.quadraticCurveTo(0, -2, bridge.width / 2, 36);
  ctx.stroke();

  for (let i = -5; i <= 5; i += 1) {
    const x = (bridge.width / 12) * i;
    ctx.fillStyle = i === 2 ? "#5c3d2b" : "#7a5a3b";
    ctx.save();
    ctx.translate(x, 18 - Math.abs(i) * 2);
    ctx.rotate(i * 0.02);
    ctx.fillRect(-14, -18, 28, 56);
    ctx.restore();
  }

  ctx.strokeStyle = "rgba(255, 224, 138, 0.26)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-bridge.width / 2 + 25, -5);
  ctx.quadraticCurveTo(0, -44, bridge.width / 2 - 25, -5);
  ctx.stroke();

  ctx.restore();
}
