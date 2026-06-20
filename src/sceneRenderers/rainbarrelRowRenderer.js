export function drawRainbarrelRow(ctx, row, time) {
  row.channels.forEach((channel) => drawRunoffChannel(ctx, channel, time));
  row.gutters.forEach((gutter) => drawGutter(ctx, gutter, time));
  row.barrels.forEach((barrel) => drawRainbarrel(ctx, barrel, time));
  drawStormDrain(ctx, row.drain, time);
}

function drawRunoffChannel(ctx, channel, time) {
  ctx.save();
  ctx.translate(channel.x, channel.y);

  ctx.strokeStyle = channel.flow ? "rgba(126, 190, 191, 0.74)" : "rgba(78, 105, 104, 0.48)";
  ctx.lineWidth = channel.flow ? 14 : 10;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-channel.width / 2, 0);
  ctx.bezierCurveTo(-channel.width / 5, -16, channel.width / 5, 18, channel.width / 2, -4);
  ctx.stroke();

  if (channel.flow) {
    ctx.strokeStyle = "rgba(238, 247, 221, 0.36)";
    ctx.lineWidth = 3;
    for (let i = 0; i < 3; i += 1) {
      const drift = ((time * 38 + i * 90) % channel.width) - channel.width / 2;
      ctx.beginPath();
      ctx.moveTo(drift - 36, Math.sin(time * 3 + i) * 3);
      ctx.lineTo(drift + 28, Math.cos(time * 2 + i) * 3);
      ctx.stroke();
    }
  }

  ctx.restore();
}

function drawGutter(ctx, gutter, time) {
  ctx.save();
  ctx.translate(gutter.x, gutter.y);

  ctx.strokeStyle = "#7a5a3b";
  ctx.lineWidth = 8;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-gutter.width / 2, 0);
  ctx.lineTo(gutter.width / 2, 0);
  ctx.stroke();

  ctx.strokeStyle = "#4f3a2d";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(gutter.width / 2 - 8, 2);
  ctx.lineTo(gutter.width / 2 - 8, 134);
  ctx.stroke();

  const shouldDrip = gutter.drip && Math.sin(time * 5 + gutter.x) > -0.2;
  if (shouldDrip) {
    ctx.fillStyle = "rgba(161, 214, 213, 0.76)";
    ctx.beginPath();
    ctx.ellipse(gutter.width / 2 - 8, 58 + (time * 45 + gutter.x) % 70, 4, 9, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function drawRainbarrel(ctx, barrel, time) {
  ctx.save();
  ctx.translate(barrel.x, barrel.y);

  ctx.fillStyle = "#6b4a32";
  ctx.fillRect(-31, -46, 62, 92);
  ctx.fillStyle = "#825d3a";
  ctx.beginPath();
  ctx.ellipse(0, -46, 31, 10, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(0, 46, 31, 10, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#3f2d25";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(-31, -18);
  ctx.lineTo(31, -18);
  ctx.moveTo(-31, 20);
  ctx.lineTo(31, 20);
  ctx.stroke();

  const water = barrel.overflow ? 0.82 + Math.sin(time * 4 + barrel.x) * 0.08 : 0.36;
  ctx.fillStyle = `rgba(126, 190, 191, ${water})`;
  ctx.beginPath();
  ctx.ellipse(0, -48, 25, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  if (barrel.overflow) {
    ctx.strokeStyle = "rgba(126, 190, 191, 0.62)";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(26, -42);
    ctx.bezierCurveTo(42, -14, 24, 16, 42, 44);
    ctx.stroke();
  }

  ctx.restore();
}

function drawStormDrain(ctx, drain, time) {
  ctx.save();
  ctx.translate(drain.x, drain.y);

  ctx.fillStyle = drain.cleared ? "#4f6258" : "#43372c";
  ctx.beginPath();
  ctx.ellipse(0, 0, 74, 28, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = drain.cleared ? "rgba(255, 224, 138, 0.58)" : "#2d251f";
  ctx.lineWidth = 6;
  for (let i = -3; i <= 3; i += 1) {
    ctx.beginPath();
    ctx.moveTo(i * 18, -20);
    ctx.lineTo(i * 18, 20);
    ctx.stroke();
  }

  if (!drain.cleared) {
    ctx.fillStyle = "#473426";
    ctx.beginPath();
    ctx.ellipse(-20, -4, 28, 10, -0.3, 0, Math.PI * 2);
    ctx.ellipse(24, 4, 22, 8, 0.2, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.strokeStyle = `rgba(126, 190, 191, ${0.5 + Math.sin(time * 4) * 0.1})`;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(-52, 4);
    ctx.bezierCurveTo(-18, 18, 22, -16, 54, 4);
    ctx.stroke();
  }

  ctx.restore();
}
