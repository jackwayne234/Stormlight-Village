export function createSceneTransition() {
  const overlay = document.createElement("div");
  overlay.className = "scene-transition";
  overlay.hidden = true;
  overlay.innerHTML = `
    <div class="scene-transition-panel" aria-live="polite">
      <p class="scene-transition-eyebrow"></p>
      <h2></h2>
      <p class="scene-transition-description"></p>
    </div>
  `;

  document.querySelector(".app-shell").append(overlay);

  const eyebrow = overlay.querySelector(".scene-transition-eyebrow");
  const title = overlay.querySelector("h2");
  const description = overlay.querySelector(".scene-transition-description");
  let active = false;
  let swapTimer = 0;
  let completeTimer = 0;

  function play({ panel, onSwap, onComplete }) {
    clear();
    active = true;
    eyebrow.textContent = panel.eyebrow;
    title.textContent = panel.title;
    description.textContent = panel.description;
    overlay.hidden = false;
    overlay.classList.remove("scene-transition-leaving");
    overlay.classList.add("scene-transition-active");

    swapTimer = window.setTimeout(() => {
      onSwap();
      overlay.classList.add("scene-transition-leaving");
    }, 690);

    completeTimer = window.setTimeout(() => {
      overlay.hidden = true;
      overlay.classList.remove("scene-transition-active", "scene-transition-leaving");
      active = false;
      onComplete();
    }, 1480);
  }

  function clear() {
    window.clearTimeout(swapTimer);
    window.clearTimeout(completeTimer);
  }

  function destroy() {
    clear();
    overlay.remove();
  }

  return {
    destroy,
    get active() {
      return active;
    },
    play
  };
}
