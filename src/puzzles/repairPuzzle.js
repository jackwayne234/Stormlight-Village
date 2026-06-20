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
  turn: ["right", "down"]
};

export function createRepairPuzzle() {
  return {
    rows: 3,
    cols: 3,
    selected: { row: 0, col: 1 },
    completed: false,
    tiles: [
      [
        tile("start", 0, true),
        tile("turn", 2),
        tile("blank", 0, true)
      ],
      [
        tile("blank", 0, true),
        tile("line", 0),
        tile("blank", 0, true)
      ],
      [
        tile("blank", 0, true),
        tile("turn", 1),
        tile("output", 0, true)
      ]
    ],
    connected: new Set()
  };
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
  puzzle.completed = connected.has(tileKey(2, 2));
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
