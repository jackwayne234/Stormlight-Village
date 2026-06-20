export function drawSwitchyard(ctx, switchyard, time) {
  drawCopperLines(ctx, switchyard.poles);
  switchyard.poles.forEach((pole) => drawSwitchPole(ctx, pole, time));
  switchyard.boxes.forEach((box) => drawJunctionBox(ctx, box, time));
  drawLockedGate(ctx, switchyard.gate, time);
}

function drawCopperLines(ctx, poles) {
  ctx.strokeStyle = "rgba(199, 121, 69, 0.74)";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  for (let i = 0; i < poles.length - 1; i += 1) {
    const start = poles[i];
    const end = poles[i + 1];
    ctx.beginPath();
    ctx.moveTo(start.x, start.y - start.height + 34);
    ctx.bezierCurveTo(start.x + 120, start.y - start.height + 58, end.x - 120, end.y - end.height + 62, end.x, end.y - end.height + 36);
    ctx.stroke();
  }
}

function drawSwitchPole(ctx, pole, time) {
  ctx.save();
  ctx.translate(pole.x, pole.y);

  ctx.strokeStyle = "#3f2d25";
  ctx.lineWidth = 16;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(0, 90);
  ctx.lineTo(0, -pole.height);
  ctx.stroke();

  ctx.strokeStyle = "#6d5136";
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(-48, -pole.height + 42);
  ctx.lineTo(48, -pole.height + 42);
  ctx.stroke();

  ctx.fillStyle = "#7d5b3e";
  ctx.fillRect(-28, -38, 56, 70);

  ctx.strokeStyle = "#d8aa57";
  ctx.lineWidth = 4;
  ctx.strokeRect(-21, -30, 42, 54);

  const glow = pole.lit ? 0.65 + Math.sin(time * 4) * 0.09 : 0.2;
  ctx.fillStyle = `rgba(255, 224, 138, ${glow})`;
  ctx.beginPath();
  ctx.arc(0, -2, 12, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#2d2a21";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(-11, -14);
  ctx.lineTo(13, 14);
  ctx.stroke();

  ctx.restore();
}

function drawJunctionBox(ctx, box, time) {
  ctx.save();
  ctx.translate(box.x, box.y);

  ctx.fillStyle = "#5e4330";
  ctx.fillRect(-54, -38, 108, 76);
  ctx.strokeStyle = "#d8aa57";
  ctx.lineWidth = 5;
  ctx.strokeRect(-44, -28, 88, 56);

  ctx.strokeStyle = "#c97945";
  ctx.lineWidth = 6;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-30, -4);
  ctx.lineTo(30, -4);
  ctx.moveTo(-10, -20);
  ctx.lineTo(10, 20);
  ctx.stroke();

  if (box.lit) {
    ctx.fillStyle = `rgba(255, 224, 138, ${0.5 + Math.sin(time * 5) * 0.08})`;
    ctx.beginPath();
    ctx.arc(0, -4, 16, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function drawLockedGate(ctx, gate, time) {
  ctx.save();
  ctx.translate(gate.x, gate.y);

  ctx.fillStyle = "#493428";
  for (let i = 0; i < 6; i += 1) {
    ctx.fillRect(-80 + i * 32, 0, 18, 116);
  }

  ctx.strokeStyle = "#765739";
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(-96, 34);
  ctx.lineTo(96, 34);
  ctx.moveTo(-96, 78);
  ctx.lineTo(96, 78);
  ctx.stroke();

  ctx.fillStyle = "#d8aa57";
  ctx.beginPath();
  ctx.arc(0, 58, 18 + Math.sin(time * 4) * 1.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#3e2d24";
  ctx.fillRect(-8, 55, 16, 28);

  ctx.restore();
}
