import { getScenePanel } from "../game/sceneSequence.js";

export function updateScenePanel(sceneId) {
  const panel = getScenePanel(sceneId);
  const shell = document.querySelector(".app-shell");
  const scenePanel = document.querySelector(".scene-panel");

  document.title = panel.documentTitle;
  shell?.setAttribute("aria-label", panel.ariaLabel);

  if (!scenePanel) {
    return;
  }

  const eyebrow = scenePanel.querySelector(".eyebrow");
  const title = scenePanel.querySelector("h1");
  const description = scenePanel.querySelector("p:not(.eyebrow)");

  if (eyebrow) eyebrow.textContent = panel.eyebrow;
  if (title) title.textContent = panel.title;
  if (description) description.textContent = panel.description;
}
