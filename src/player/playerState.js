import { config } from "../config.js";

export function createPlayer(scene) {
  return {
    x: scene.character.x,
    y: scene.character.y,
    speed: 205,
    facing: 1,
    moving: false,
    minX: 150,
    maxX: scene.world.width - 170
  };
}

export function updatePlayer(player, input, scene, deltaTime) {
  const direction = input.direction;

  player.moving = direction !== 0;

  if (direction !== 0) {
    player.facing = direction;
    player.x = clamp(player.x + direction * player.speed * deltaTime, player.minX, player.maxX);
  }

  scene.character.x = player.x;
  scene.character.y = player.y;
  scene.character.facing = player.facing;
  scene.character.walking = player.moving;

  scene.robot.x = player.x + 112;
  scene.robot.y = 420;

  scene.lantern.x = player.x + player.facing * 55;
  scene.lantern.y = player.y - 42;

  updateCamera(scene, player);
}

function updateCamera(scene, player) {
  const viewportWidth = config.canvas.width;
  const targetX = player.x - viewportWidth * 0.38;
  scene.camera.x = clamp(targetX, 0, scene.world.width - viewportWidth);
}

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}
