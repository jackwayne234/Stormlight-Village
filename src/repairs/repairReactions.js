export function createRepairReactions(scene) {
  const target = scene.repairTarget;
  const reactions = target?.reactions || [
    {
      text: target?.completeMessage || "Repair complete.",
      x: target?.x || scene.character.x,
      y: 430
    }
  ];

  return reactions.map((reaction) => ({
    kind: reaction.kind || "villager",
    text: reaction.text,
    worldX: resolveReactionCoordinate(reaction.x, scene),
    worldY: resolveReactionCoordinate(reaction.y, scene)
  }));
}

function resolveReactionCoordinate(value, scene) {
  if (value === "robot") {
    return scene.robot.x;
  }

  if (value === "robotTop") {
    return scene.robot.y - 82;
  }

  return value;
}
