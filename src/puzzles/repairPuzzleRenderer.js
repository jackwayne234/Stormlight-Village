import { getConnections, getTile, tileKey } from "./repairPuzzle.js";

const colors = {
  backgroundTop: "#23383d",
  backgroundBottom: "#152327",
  panel: "#6f5137",
  panelDark: "#3e2d24",
  brass: "#d8aa57",
  brassDark: "#8e6539",
  copper: "#c97945",
  copperDim: "#684935",
  wood: "#7d5d3f",
  tile: "#2f3e3f",
  tileLit: "#49675b",
  text: "#f8ebcc",
  glow: "#ffe08a",
  robotBlue: "#8fd9f0"
};

export function createRepairPuzzleRenderer(canvas, puzzle) {
  const context = canvas.getContext("2d");
  const layout = {
    boardX: 282,
    boardY: 182,
    tileSize: 118,
    gap: 12
  };

  function resizeForDisplay() {
    const ratio = window.devicePixelRatio || 1;
    canvas.width = Math.floor(960 * ratio);
    canvas.height = Math.floor(680 * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function render(time) {
    drawBackground(context, time);
    drawPanel(context);
    drawBoard(context, puzzle, layout, time);
    drawSideDetails(context, puzzle, time);
    drawStatus(context, puzzle, time);
  }

  function tileAtPoint(x, y) {
    for (let row = 0; row < puzzle.rows; row += 1) {
      for (let col = 0; col < puzzle.cols; col += 1) {
        const rect = tileRect(layout, row, col);
        if (x >= rect.x && x <= rect.x + rect.size && y >= rect.y && y <= rect.y + rect.size) {
          return { row, col };
        }
      }
    }
    return null;
  }

  return {
    render,
    resizeForDisplay,
    tileAtPoint
  };
}

function drawBackground(ctx, time) {
  const gradient = ctx.createLinearGradient(0, 0, 0, 680);
  gradient.addColorStop(0, colors.backgroundTop);
  gradient.addColorStop(1, colors.backgroundBottom);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 960, 680);

  ctx.fillStyle = "rgba(205, 230, 218, 0.11)";
  for (let i = 0; i < 4; i += 1) {
    ctx.beginPath();
    ctx.ellipse((i * 250 + time * 18) % 1120 - 80, 150 + i * 70, 190, 18, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawPanel(ctx) {
  drawRoundedRect(ctx, 116, 88, 728, 500, 16, colors.panelDark);
  drawRoundedRect(ctx, 138, 112, 684, 456, 14, colors.panel);
  drawRoundedRect(ctx, 162, 138, 636, 404, 12, "#4f382b");

  ctx.strokeStyle = colors.brass;
  ctx.lineWidth = 6;
  ctx.strokeRect(172, 148, 616, 384);

  ctx.fillStyle = "rgba(255, 224, 138, 0.08)";
  ctx.fillRect(178, 154, 604, 372);

  ctx.fillStyle = colors.text;
  ctx.font = "800 30px system-ui, sans-serif";
  ctx.fillText("Lantern Circuit Repair", 178, 72);

  ctx.font = "600 16px system-ui, sans-serif";
  ctx.fillStyle = "rgba(248, 235, 204, 0.75)";
  ctx.fillText("Rotate the copper paths to carry light from the seed battery to the generator.", 178, 604);
}

function drawBoard(ctx, puzzle, layout, time) {
  for (let row = 0; row < puzzle.rows; row += 1) {
    for (let col = 0; col < puzzle.cols; col += 1) {
      drawTile(ctx, puzzle, layout, row, col, time);
    }
  }
}

function drawTile(ctx, puzzle, layout, row, col, time) {
  const rect = tileRect(layout, row, col);
  const currentTile = getTile(puzzle, row, col);
  const connected = puzzle.connected.has(tileKey(row, col));
  const selected = puzzle.selected.row === row && puzzle.selected.col === col;

  drawRoundedRect(ctx, rect.x, rect.y, rect.size, rect.size, 10, connected ? colors.tileLit : colors.tile);

  ctx.strokeStyle = selected ? colors.glow : "rgba(255, 224, 138, 0.25)";
  ctx.lineWidth = selected ? 5 : 2;
  ctx.strokeRect(rect.x + 5, rect.y + 5, rect.size - 10, rect.size - 10);

  if (selected) {
    const pulse = 0.22 + Math.sin(time * 5) * 0.08;
    ctx.fillStyle = `rgba(255, 224, 138, ${pulse})`;
    ctx.fillRect(rect.x + 5, rect.y + 5, rect.size - 10, rect.size - 10);
  }

  drawTileContents(ctx, currentTile, rect, connected, time);
}

function drawTileContents(ctx, tile, rect, connected, time) {
  const centerX = rect.x + rect.size / 2;
  const centerY = rect.y + rect.size / 2;
  const connections = getConnections(tile);
  const lineColor = connected ? colors.glow : colors.copper;

  if (tile.type === "blank") {
    ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
    ctx.beginPath();
    ctx.arc(centerX, centerY, 10, 0, Math.PI * 2);
    ctx.fill();
    return;
  }

  if (tile.type === "start") {
    drawSeedBattery(ctx, centerX, centerY, time);
  } else if (tile.type === "output") {
    drawGeneratorSocket(ctx, centerX, centerY, connected, time);
  }

  ctx.strokeStyle = lineColor;
  ctx.lineWidth = connected ? 16 : 13;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  connections.forEach((direction) => {
    ctx.moveTo(centerX, centerY);
    if (direction === "up") ctx.lineTo(centerX, rect.y + 22);
    if (direction === "right") ctx.lineTo(rect.x + rect.size - 22, centerY);
    if (direction === "down") ctx.lineTo(centerX, rect.y + rect.size - 22);
    if (direction === "left") ctx.lineTo(rect.x + 22, centerY);
  });
  ctx.stroke();

  ctx.fillStyle = connected ? colors.glow : colors.brass;
  ctx.beginPath();
  ctx.arc(centerX, centerY, 17, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = colors.panelDark;
  ctx.beginPath();
  ctx.arc(centerX, centerY, 7, 0, Math.PI * 2);
  ctx.fill();
}

function drawSideDetails(ctx, puzzle, time) {
  const glow = 0.5 + Math.sin(time * 3) * 0.14;
  const robotY = 255 + Math.sin(time * 2.4) * 8;

  ctx.fillStyle = `rgba(143, 217, 240, ${0.2 + glow * 0.12})`;
  ctx.beginPath();
  ctx.arc(204, robotY, 64, 0, Math.PI * 2);
  ctx.fill();

  drawRoundedRect(ctx, 166, robotY - 25, 76, 54, 20, "#d8e2de");
  drawRoundedRect(ctx, 181, robotY - 14, 46, 25, 9, "#293b40");
  ctx.fillStyle = colors.robotBlue;
  ctx.beginPath();
  ctx.arc(194, robotY - 2, 4, 0, Math.PI * 2);
  ctx.arc(214, robotY - 2, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = colors.text;
  ctx.font = "800 17px system-ui, sans-serif";
  ctx.fillText(puzzle.completed ? "Circuit complete!" : "Route the glow.", 104, 374);

  ctx.fillStyle = "rgba(248, 235, 204, 0.72)";
  ctx.font = "600 14px system-ui, sans-serif";
  ctx.fillText("Arrow keys move", 104, 404);
  ctx.fillText("Space or E rotates", 104, 426);
  ctx.fillText("Click tiles too", 104, 448);

  drawVillageHouse(ctx, 804, 176, puzzle.completed, time);
  drawGear(ctx, 812, 282, time);
  drawCopperCoil(ctx, 814, 374);
}

function drawStatus(ctx, puzzle, time) {
  if (!puzzle.completed) {
    return;
  }

  const alpha = 0.74 + Math.sin(time * 5) * 0.08;
  ctx.fillStyle = `rgba(255, 224, 138, ${alpha})`;
  drawRoundedRect(ctx, 267, 524, 426, 54, 10, `rgba(255, 224, 138, ${alpha})`);
  ctx.fillStyle = "#2d2a21";
  ctx.font = "900 22px system-ui, sans-serif";
  ctx.fillText("Generator linked. Water wheel ready.", 302, 559);
}

function drawVillageHouse(ctx, x, y, lit, time) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(0.72, 0.72);

  const windowGlow = lit ? 0.72 + Math.sin(time * 5) * 0.08 : 0.22;

  ctx.fillStyle = "#6c4f36";
  drawRoundedRect(ctx, -54, 14, 108, 82, 8, "#6c4f36");

  ctx.fillStyle = "#3f2d25";
  ctx.beginPath();
  ctx.moveTo(-66, 14);
  ctx.lineTo(0, -34);
  ctx.lineTo(66, 14);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = `rgba(255, 224, 138, ${windowGlow})`;
  drawRoundedRect(ctx, -34, 38, 24, 25, 5, `rgba(255, 224, 138, ${windowGlow})`);
  drawRoundedRect(ctx, 13, 38, 24, 25, 5, `rgba(255, 224, 138, ${windowGlow})`);

  if (lit) {
    const glow = ctx.createRadialGradient(0, 50, 8, 0, 50, 90);
    glow.addColorStop(0, "rgba(255, 224, 138, 0.26)");
    glow.addColorStop(1, "rgba(255, 224, 138, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(0, 50, 90, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function drawSeedBattery(ctx, x, y, time) {
  drawRoundedRect(ctx, x - 24, y - 36, 48, 72, 18, "#426d4d");
  ctx.fillStyle = `rgba(255, 230, 140, ${0.76 + Math.sin(time * 3) * 0.1})`;
  ctx.beginPath();
  ctx.ellipse(x, y, 15, 28, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawGeneratorSocket(ctx, x, y, connected, time) {
  drawGear(ctx, x, y, time);
  if (connected) {
    ctx.fillStyle = "rgba(255, 224, 138, 0.34)";
    ctx.beginPath();
    ctx.arc(x, y, 42 + Math.sin(time * 5) * 4, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawGear(ctx, x, y, time) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(time * 0.4);
  ctx.fillStyle = colors.brass;
  ctx.beginPath();
  for (let i = 0; i < 16; i += 1) {
    const radius = i % 2 === 0 ? 29 : 22;
    const angle = (Math.PI * 2 * i) / 16;
    ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
  }
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = colors.panelDark;
  ctx.beginPath();
  ctx.arc(0, 0, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawCopperCoil(ctx, x, y) {
  ctx.strokeStyle = colors.copper;
  ctx.lineWidth = 8;
  ctx.lineCap = "round";
  ctx.beginPath();
  for (let i = 0; i < 5; i += 1) {
    ctx.moveTo(x - 35 + i * 17, y - 24);
    ctx.quadraticCurveTo(x - 27 + i * 17, y, x - 35 + i * 17, y + 24);
  }
  ctx.stroke();
}

function tileRect(layout, row, col) {
  return {
    x: layout.boardX + col * (layout.tileSize + layout.gap),
    y: layout.boardY + row * (layout.tileSize + layout.gap),
    size: layout.tileSize
  };
}

function drawRoundedRect(ctx, x, y, width, height, radius, fillStyle) {
  ctx.fillStyle = fillStyle;
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
  ctx.fill();
}
