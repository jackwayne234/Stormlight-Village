const DIRECTIONS = {
  up: { row: -1, col: 0, opposite: "down" },
  right: { row: 0, col: 1, opposite: "left" },
  down: { row: 1, col: 0, opposite: "up" },
  left: { row: 0, col: -1, opposite: "right" }
};

const TILE_CONNECTIONS = {
  start: ["right"],
  output: ["left"],
  blank: [],
  line: ["left", "right"],
  turn: ["right", "down"],
  tee: ["left", "right", "down"],
  cross: ["up", "right", "down", "left"]
};

const DEFAULT_THEME = {
  id: "lantern-circuit",
  title: "Lantern Circuit Repair",
  instructions: "Rotate the copper paths to carry light from the seed battery to the generator.",
  objective: "Route the glow.",
  completedLabel: "Circuit complete!",
  successMessage: "Generator linked. Water wheel ready.",
  conduitName: "copper paths",
  sideDetail: "village",
  colors: {
    panel: "#6f5137",
    panelDark: "#3e2d24",
    boardInset: "#4f382b",
    tileLit: "#49675b",
    conduit: "#c97945",
    conduitLit: "#ffe08a",
    node: "#d8aa57",
    glow: "#ffe08a",
    accent: "#8fd9f0"
  }
};

const PUZZLE_THEMES = {
  "lantern-circuit": DEFAULT_THEME,
  "water-routing": {
    ...DEFAULT_THEME,
    id: "water-routing",
    title: "Stormwater Routing",
    instructions: "Rotate the runoff channels to guide rainwater from the barrels into the storm drain.",
    objective: "Route the runoff.",
    completedLabel: "Drainage restored!",
    successMessage: "Runoff redirected. Drain is clear.",
    conduitName: "water channels",
    sideDetail: "rainbarrel",
    colors: {
      panel: "#536954",
      panelDark: "#243934",
      boardInset: "#324a45",
      tileLit: "#416b69",
      conduit: "#7ebebf",
      conduitLit: "#bdeee6",
      node: "#d8aa57",
      glow: "#bdeee6",
      accent: "#8fd9f0"
    }
  },
  "glow-bridge": {
    ...DEFAULT_THEME,
    id: "glow-bridge",
    title: "Glow Bridge Circuit",
    instructions: "Rotate the living paths to wake the bridge plants and relight the crossing.",
    objective: "Wake the bridge.",
    completedLabel: "Bridge awake!",
    successMessage: "Glow path linked. Bridge is awake.",
    sideDetail: "grove"
  },
  "junction-line": {
    ...DEFAULT_THEME,
    id: "junction-line",
    title: "Junction Line Repair",
    instructions: "Rotate the junction paths to reconnect the line through the switchyard.",
    objective: "Link the line.",
    completedLabel: "Line restored!",
    successMessage: "Junction linked. Current is steady.",
    sideDetail: "switchyard"
  },
  "storm-gauge": {
    ...DEFAULT_THEME,
    id: "storm-gauge",
    title: "Storm Gauge Calibration",
    instructions: "Rotate the signal paths to stabilize the gauge before the next wind surge.",
    objective: "Calibrate gauge.",
    completedLabel: "Gauge stable!",
    successMessage: "Gauge linked. Storm readings stable.",
    sideDetail: "gauge"
  },
  "beacon-signal": {
    ...DEFAULT_THEME,
    id: "beacon-signal",
    title: "Beacon Signal Tune",
    instructions: "Rotate the signal paths to carry light back up to the hill beacon.",
    objective: "Tune the beacon.",
    completedLabel: "Beacon tuned!",
    successMessage: "Signal linked. Beacon is shining.",
    sideDetail: "beacon"
  }
};

const PUZZLE_LAYOUTS = {
  "lantern-circuit": {
    selected: { row: 0, col: 1 },
    tiles: [
      [tile("start", 0, true), tile("line", 1), tile("output", 0, true)],
      [tile("blank", 0, true), tile("blank", 0, true), tile("blank", 0, true)],
      [tile("blank", 0, true), tile("blank", 0, true), tile("blank", 0, true)]
    ]
  },
  "glow-bridge": {
    selected: { row: 0, col: 1 },
    tiles: [
      [tile("start", 0, true), tile("tee", 2), tile("output", 0, true)],
      [tile("blank", 0, true), tile("line", 0), tile("blank", 0, true)],
      [tile("blank", 0, true), tile("turn", 1), tile("output", 0, true)]
    ]
  },
  "junction-line": {
    selected: { row: 0, col: 1 },
    tiles: [
      [tile("start", 0, true), tile("turn", 2), tile("blank", 0, true)],
      [tile("blank", 0, true), tile("turn", 1), tile("turn", 3)],
      [tile("blank", 0, true), tile("line", 0), tile("output", 1, true)]
    ]
  },
  "storm-gauge": {
    selected: { row: 0, col: 1 },
    tiles: [
      [tile("start", 0, true), tile("line", 1), tile("turn", 2)],
      [tile("blank", 0, true), tile("line", 0), tile("line", 0)],
      [tile("blank", 0, true), tile("blank", 0, true), tile("output", 1, true)]
    ]
  },
  "beacon-signal": {
    selected: { row: 0, col: 1 },
    tiles: [
      [tile("start", 0, true), tile("turn", 2), tile("blank", 0, true)],
      [tile("blank", 0, true), tile("line", 0), tile("blank", 0, true)],
      [tile("output", 2, true), tile("tee", 3), tile("output", 0, true)]
    ]
  },
  "water-routing": {
    selected: { row: 0, col: 1 },
    tiles: [
      [tile("start", 0, true), tile("turn", 2), tile("blank", 0, true)],
      [tile("output", 2, true), tile("tee", 3), tile("output", 0, true)],
      [tile("blank", 0, true), tile("blank", 0, true), tile("blank", 0, true)]
    ]
  }
};

export function createRepairPuzzle(themeId = "lantern-circuit") {
  const layout = createPuzzleLayout(themeId);

  return {
    rows: layout.tiles.length,
    cols: layout.tiles[0].length,
    theme: createPuzzleTheme(themeId),
    selected: { ...layout.selected },
    completed: false,
    tiles: cloneTiles(layout.tiles),
    connected: new Set()
  };
}

function createPuzzleTheme(themeId) {
  const theme = PUZZLE_THEMES[themeId] || DEFAULT_THEME;

  return {
    ...theme,
    colors: {
      ...DEFAULT_THEME.colors,
      ...theme.colors
    }
  };
}

function createPuzzleLayout(themeId) {
  return PUZZLE_LAYOUTS[themeId] || PUZZLE_LAYOUTS[DEFAULT_THEME.id];
}

function cloneTiles(rows) {
  return rows.map((row) => row.map((source) => ({ ...source })));
}

export function moveSelection(puzzle, rowDelta, colDelta) {
  puzzle.selected.row = wrap(puzzle.selected.row + rowDelta, puzzle.rows);
  puzzle.selected.col = wrap(puzzle.selected.col + colDelta, puzzle.cols);
}

export function selectTile(puzzle, row, col) {
  puzzle.selected.row = clamp(row, 0, puzzle.rows - 1);
  puzzle.selected.col = clamp(col, 0, puzzle.cols - 1);
}

export function rotateSelectedTile(puzzle) {
  const selectedTile = getTile(puzzle, puzzle.selected.row, puzzle.selected.col);
  if (!selectedTile || selectedTile.locked) {
    return false;
  }

  selectedTile.rotation = (selectedTile.rotation + 1) % 4;
  updateConnections(puzzle);
  return true;
}

export function rotateTileAt(puzzle, row, col) {
  selectTile(puzzle, row, col);
  return rotateSelectedTile(puzzle);
}

export function updateConnections(puzzle) {
  const connected = new Set();
  const queue = [{ row: 0, col: 0 }];

  while (queue.length) {
    const current = queue.shift();
    const key = tileKey(current.row, current.col);
    if (connected.has(key)) {
      continue;
    }

    connected.add(key);
    const currentTile = getTile(puzzle, current.row, current.col);
    const exits = getConnections(currentTile);

    exits.forEach((direction) => {
      const movement = DIRECTIONS[direction];
      const next = {
        row: current.row + movement.row,
        col: current.col + movement.col
      };
      const nextTile = getTile(puzzle, next.row, next.col);

      if (!nextTile) {
        return;
      }

      const nextConnections = getConnections(nextTile);
      if (nextConnections.includes(movement.opposite)) {
        queue.push(next);
      }
    });
  }

  puzzle.connected = connected;
  puzzle.completed = getOutputKeys(puzzle).every((key) => connected.has(key));
  return puzzle.completed;
}

export function getConnections(tile) {
  const baseConnections = TILE_CONNECTIONS[tile.type] || [];
  return baseConnections.map((direction) => rotateDirection(direction, tile.rotation));
}

export function getTile(puzzle, row, col) {
  if (row < 0 || row >= puzzle.rows || col < 0 || col >= puzzle.cols) {
    return null;
  }

  return puzzle.tiles[row][col];
}

export function tileKey(row, col) {
  return `${row},${col}`;
}

function tile(type, rotation = 0, locked = false) {
  return { type, rotation, locked };
}

function getOutputKeys(puzzle) {
  const outputs = [];

  for (let row = 0; row < puzzle.rows; row += 1) {
    for (let col = 0; col < puzzle.cols; col += 1) {
      if (getTile(puzzle, row, col)?.type === "output") {
        outputs.push(tileKey(row, col));
      }
    }
  }

  return outputs;
}

function rotateDirection(direction, rotation) {
  const order = ["up", "right", "down", "left"];
  const index = order.indexOf(direction);
  return order[(index + rotation) % order.length];
}

function wrap(value, size) {
  return (value + size) % size;
}

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}
