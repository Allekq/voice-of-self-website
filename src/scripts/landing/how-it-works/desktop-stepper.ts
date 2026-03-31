import { createCoarseViewportResizeGuard } from "../shared/stable-viewport";

import { clamp, lerp } from "./shared";

interface DesktopRootState {
  root: HTMLElement;
  cards: HTMLElement[];
  nodes: HTMLElement[];
  line: HTMLElement;
  fill: HTMLElement;
  progress: HTMLElement;
  centers: number[];
  currentProgress: number;
  targetProgress: number;
}

const setStrength = (card: HTMLElement, value: number) => {
  card.style.setProperty("--step-activity", value.toFixed(3));
};

const computeCenters = (root: HTMLElement, nodes: HTMLElement[]) => {
  const rootRect = root.getBoundingClientRect();

  return nodes.map((node) => {
    const rect = node.getBoundingClientRect();
    return rect.left - rootRect.left + rect.width / 2;
  });
};

const applyProgress = (state: DesktopRootState, progressUnit: number) => {
  const lastIndex = Math.max(state.centers.length - 1, 1);
  const boundedProgress = clamp(progressUnit, 0, lastIndex);
  const firstCenter = state.centers[0] ?? 0;
  const lastCenter = state.centers[state.centers.length - 1] ?? firstCenter;
  const ratio = lastIndex === 0 ? 0 : boundedProgress / lastIndex;
  const progressX = lerp(firstCenter, lastCenter, ratio);

  state.currentProgress = boundedProgress;
  state.line.style.left = `${firstCenter}px`;
  state.line.style.width = `${Math.max(lastCenter - firstCenter, 0)}px`;
  state.fill.style.left = `${firstCenter}px`;
  state.fill.style.width = `${Math.max(progressX - firstCenter, 0)}px`;
  state.progress.style.left = `${progressX}px`;

  state.cards.forEach((card, index) => {
    const strength = Math.max(0, 1 - Math.abs(boundedProgress - index));
    setStrength(card, strength);
  });
};

const createState = (root: HTMLElement): DesktopRootState | null => {
  const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-step-showcase-desktop-card]"));
  const nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-step-showcase-desktop-node]"));
  const line = root.querySelector<HTMLElement>("[data-step-showcase-desktop-line]");
  const fill = root.querySelector<HTMLElement>("[data-step-showcase-desktop-fill]");
  const progress = root.querySelector<HTMLElement>("[data-step-showcase-desktop-progress]");

  if (!cards.length || cards.length !== nodes.length || !line || !fill || !progress) {
    return null;
  }

  return {
    root,
    cards,
    nodes,
    line,
    fill,
    progress,
    centers: [],
    currentProgress: 0,
    targetProgress: 0,
  };
};

export const setupDesktopHowItWorks = () => {
  const roots = Array.from(
    document.querySelectorAll<HTMLElement>("[data-step-showcase-desktop]"),
  );
  if (!roots.length) {
    return;
  }

  const states = roots
    .map((root) => createState(root))
    .filter((state): state is DesktopRootState => state !== null);

  let frameId = 0;
  const ignoreResize = createCoarseViewportResizeGuard();

  const tick = () => {
    let keepAnimating = false;

    states.forEach((state) => {
      const delta = state.targetProgress - state.currentProgress;

      if (Math.abs(delta) < 0.001) {
        state.currentProgress = state.targetProgress;
      } else {
        state.currentProgress = lerp(state.currentProgress, state.targetProgress, 0.18);
        keepAnimating = true;
      }

      applyProgress(state, state.currentProgress);
    });

    frameId = keepAnimating ? window.requestAnimationFrame(tick) : 0;
  };

  const ensureAnimation = () => {
    if (frameId !== 0) {
      return;
    }

    frameId = window.requestAnimationFrame(tick);
  };

  const syncGeometry = () => {
    states.forEach((state) => {
      if (state.root.offsetParent === null) {
        return;
      }

      state.centers = computeCenters(state.root, state.nodes);
      applyProgress(state, state.currentProgress);
    });
  };

  syncGeometry();

  states.forEach((state) => {
    state.root.addEventListener("pointermove", (event) => {
      if (!window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 62rem)").matches) {
        return;
      }

      const rootRect = state.root.getBoundingClientRect();
      const firstCenter = state.centers[0] ?? 0;
      const lastCenter = state.centers[state.centers.length - 1] ?? firstCenter;
      const localX = clamp(event.clientX - rootRect.left, firstCenter, lastCenter);
      const width = Math.max(lastCenter - firstCenter, 1);
      const ratio = (localX - firstCenter) / width;
      const maxIndex = Math.max(state.centers.length - 1, 1);

      state.targetProgress = ratio * maxIndex;
      ensureAnimation();
    });

    state.root.addEventListener("pointerleave", () => {
      state.targetProgress = 0;
      ensureAnimation();
    });
  });

  window.addEventListener("resize", () => {
    if (ignoreResize()) {
      return;
    }

    syncGeometry();
  });
};
