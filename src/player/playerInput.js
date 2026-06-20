export function createPlayerInput() {
  const keys = new Set();

  function handleKeyDown(event) {
    const key = normalizeKey(event.key);
    if (!key) {
      return;
    }

    keys.add(key);
    event.preventDefault();
  }

  function handleKeyUp(event) {
    const key = normalizeKey(event.key);
    if (!key) {
      return;
    }

    keys.delete(key);
    event.preventDefault();
  }

  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);

  return {
    get direction() {
      const left = keys.has("left");
      const right = keys.has("right");

      if (left === right) {
        return 0;
      }

      return left ? -1 : 1;
    }
  };
}

function normalizeKey(key) {
  const value = key.toLowerCase();

  if (value === "arrowleft" || value === "a") {
    return "left";
  }

  if (value === "arrowright" || value === "d") {
    return "right";
  }

  return null;
}
