export function drawBeaconHill(ctx, beaconHill, time) {
  drawBeaconCables(ctx, beaconHill.cables);
  beaconHill.flags.forEach((flag) => drawSignalFlag(ctx, flag, time));
  drawSignalTower(ctx, beaconHill.tower, time);
  drawBeaconShed(ctx, beaconHill.shed, time);
}

function drawBeaconCables(ctx, cables) {
  ctx.strokeStyle = "rgba(199, 121, 69, 0.68)";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  cables.forEach((cable) => {
    ctx.beginPath();
    ctx.moveTo(cable.fromX, cable.fromY);
    ctx.bezierCurveTo(cable.fromX + 160, cable.fromY + 58, cable.toX - 160, cable.toY + 58, cable.toX, cable.toY);
    ctx.stroke();
  });
}

function drawSignalFlag(ctx, flag, time) {
  ctx.save();
  ctx.translate(flag.x, flag.y);

  ctx.strokeStyle = "#4a3629";
  ctx.lineWidth = 8;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(0, 160);
  ctx.lineTo(0, 0);
  ctx.stroke();

  ctx.fillStyle = flag.color;
  ctx.beginPath();
  ctx.moveTo(4, 12);
  ctx.bezierCurveTo(46, -4 + Math.sin(time * 5 + flag.x) * 7, 72, 34, 112, 16);
  ctx.lineTo(112, 58);
  ctx.bezierCurveTo(70, 78 + Math.sin(time * 5 + flag.x) * 7, 44, 38, 4, 54);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

function drawSignalTower(ctx, tower, time) {
  ctx.save();
  ctx.translate(tower.x, tower.y);

  ctx.strokeStyle = "#4b3326";
  ctx.lineWidth = 12;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-92, 112);
  ctx.lineTo(-38, -132);
  ctx.moveTo(92, 112);
  ctx.lineTo(38, -132);
  ctx.moveTo(-70, 28);
  ctx.lineTo(70, 28);
  ctx.moveTo(-50, -58);
  ctx.lineTo(50, -58);
  ctx.stroke();

  ctx.strokeStyle = "#7a5a3b";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(-78, 78);
  ctx.lineTo(62, -96);
  ctx.moveTo(78, 78);
  ctx.lineTo(-62, -96);
  ctx.stroke();

  ctx.fillStyle = "#5e4330";
  ctx.fillRect(-60, -174, 120, 58);
  ctx.strokeStyle = "#d8aa57";
  ctx.lineWidth = 5;
  ctx.strokeRect(-48, -164, 96, 38);

  const glow = tower.lit ? 0.62 + Math.sin(time * 3.5) * 0.11 : 0.22;
  const beam = ctx.createRadialGradient(0, -144, 12, 0, -144, 180);
  beam.addColorStop(0, `rgba(255, 224, 138, ${0.36 * glow})`);
  beam.addColorStop(1, "rgba(255, 224, 138, 0)");
  ctx.fillStyle = beam;
  ctx.beginPath();
  ctx.arc(0, -144, 180, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = `rgba(255, 224, 138, ${glow})`;
  ctx.beginPath();
  ctx.arc(0, -144, 22, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawBeaconShed(ctx, shed, time) {
  ctx.save();
  ctx.translate(shed.x, shed.y);
  ctx.scale(0.74, 0.74);

  ctx.fillStyle = "#6c4f36";
  ctx.fillRect(-78, 22, 156, 104);

  ctx.fillStyle = "#3f2d25";
  ctx.beginPath();
  ctx.moveTo(-94, 22);
  ctx.lineTo(0, -46);
  ctx.lineTo(94, 22);
  ctx.closePath();
  ctx.fill();

  const glow = shed.lit ? 0.64 + Math.sin(time * 4) * 0.08 : 0.24;
  ctx.fillStyle = `rgba(255, 224, 138, ${glow})`;
  ctx.fillRect(-48, 54, 34, 30);
  ctx.fillRect(18, 54, 34, 30);

  ctx.fillStyle = "#3e2d24";
  ctx.fillRect(-13, 78, 30, 48);

  ctx.restore();
}
