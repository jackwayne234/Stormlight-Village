export function resetProgressIfRequested() {
  const params = new URLSearchParams(window.location.search);

  if (!params.has("resetProgress") && !shouldResetForFreshChapterStart(params)) {
    return;
  }

  Object.keys(localStorage)
    .filter((key) => key.startsWith("stormlight.repair.") || key === "stormlight.waterWheelRepaired")
    .forEach((key) => localStorage.removeItem(key));

  params.delete("resetProgress");
  const query = params.toString();
  const cleanedUrl = `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`;
  window.history.replaceState({}, "", cleanedUrl);
}

function shouldResetForFreshChapterStart(params) {
  return document.body.dataset.scene === "village" && !params.has("keepProgress");
}

export function applySavedProgress(scene) {
  const waterWheelRepaired = localStorage.getItem("stormlight.waterWheelRepaired") === "true";

  if (!waterWheelRepaired || !scene.waterWheel) {
    return;
  }

  scene.waterWheel.damaged = false;
  scene.background.cottages.forEach((cottage) => {
    cottage.lit = true;
  });
  scene.background.lamps.forEach((lamp) => {
    lamp.lit = true;
  });
}
