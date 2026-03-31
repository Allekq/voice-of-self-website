const WOMAN_STATE = "woman";
const MAN_STATE = "man";
const AUTO_SWAP_MS = 8000;

const getCurrentState = (root: HTMLElement) =>
  root.dataset.reflectionStoryState === MAN_STATE ? MAN_STATE : WOMAN_STATE;

const getNextLabel = (state: string) =>
  state === WOMAN_STATE
    ? "Show the masculine reflection story"
    : "Show the feminine reflection story";

export const setupReflectionStoryToggle = () => {
  const roots = document.querySelectorAll<HTMLElement>("[data-reflection-story-root]");

  if (!roots.length) {
    return;
  }

  roots.forEach((root) => {
    if (root.dataset.reflectionStoryBound === "true") {
      return;
    }

    const toggle = root.querySelector<HTMLButtonElement>("[data-reflection-story-toggle]");

    if (!toggle) {
      return;
    }

    let swapTimer = 0;

    const syncLabel = () => {
      toggle.setAttribute("aria-label", getNextLabel(getCurrentState(root)));
    };

    const flipState = () => {
      root.dataset.reflectionStoryState =
        getCurrentState(root) === WOMAN_STATE ? MAN_STATE : WOMAN_STATE;
      syncLabel();
    };

    const scheduleNextSwap = () => {
      window.clearTimeout(swapTimer);

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      swapTimer = window.setTimeout(() => {
        flipState();
        scheduleNextSwap();
      }, AUTO_SWAP_MS);
    };

    root.dataset.reflectionStoryMode = "controlled";
    root.dataset.reflectionStoryState = getCurrentState(root);
    syncLabel();
    scheduleNextSwap();

    toggle.addEventListener("click", () => {
      flipState();
      scheduleNextSwap();
    });

    root.dataset.reflectionStoryBound = "true";
  });
};
