export function drawStormRidge(ctx, ridge, time) {
  ridge.posts.forEach((post) => drawWindPost(ctx, post, time));
  drawStormGauge(ctx, ridge.gauge, time);
}

function drawWindPost(ctx, post, time) {
  ctx.save();
  ctx.translate(post.x, post.y);
  ctx.rotate(post.lean + Math.sin(time * 2.5 + post.x) * 0.015);

  ctx.strokeStyle = "#473426";
  ctx.lineWidth = 14;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(0, 90);
  ctx.lineTo(0, -110);
  ctx.stroke();

  ctx.strokeStyle = "#6d5136";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(-46, -75);
  ctx.lineTo(46, -75);
  ctx.stroke();

  ctx.strokeStyle = "rgba(199, 121, 69, 0.7)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-45, -72);
  ctx.bezierCurveTo(10, -58, 54, -92, 110, -72);
  ctx.stroke();

  ctx.restore();
}

function drawStormGauge(ctx, gauge, time) {
  ctx.save();
  ctx.translate(gauge.x, gauge.y);

  ctx.fillStyle = "#5e4330";
  ctx.fillRect(-62, -78, 124, 116);
  ctx.strokeStyle = "#d8aa57";
  ctx.lineWidth = 5;
  ctx.strokeRect(-50, -66, 100, 92);

  ctx.fillStyle = "rgba(255, 224, 138, 0.2)";
  ctx.beginPath();
  ctx.arc(0, -20, 33, Math.PI, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#f0d28f";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(0, -20, 33, Math.PI, Math.PI * 2);
  ctx.stroke();

  const needleAngle = -0.25 + Math.sin(time * 4) * 0.25;
  ctx.strokeStyle = "#c97945";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(0, -20);
  ctx.lineTo(Math.cos(needleAngle) * 34, -20 + Math.sin(needleAngle) * 34);
  ctx.stroke();

  ctx.fillStyle = "#d8aa57";
  ctx.beginPath();
  ctx.arc(0, -20, 7, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#3e2d24";
  ctx.lineWidth = 8;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-42, 45);
  ctx.lineTo(-72, 84);
  ctx.moveTo(42, 45);
  ctx.lineTo(72, 84);
  ctx.stroke();

  ctx.restore();
}
