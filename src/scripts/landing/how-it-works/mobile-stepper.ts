import { clamp, lerp } from "./shared";
import { getStableViewportHeight } from "../shared/stable-viewport";

interface MobileRootState {
  root: HTMLElement;
  cards: HTMLElement[];
  nodes: HTMLElement[];
  line: HTMLElement;
  fill: HTMLElement;
  progress: HTMLElement;
  lineStartY: number;
  currentProgress: number;
  targetProgress: number;
  currentY: number;
  targetY: number;
  initialized: boolean;
}

const setStrength = (card: HTMLElement, value: number) => {
  card.style.setProperty("--step-activity", value.toFixed(3));
};

const resolveContinuousProgress = (centers: Array<{ viewportY: number; rootY: number }>) => {
  if (centers.length <= 1) {
    return { progressUnit: 0, progressY: centers[0]?.rootY ?? 0 };
  }

  const targetY = getStableViewportHeight() / 2;
  const lastIndex = centers.length - 1;

  if (targetY <= centers[0].viewportY) {
    return { progressUnit: 0, progressY: centers[0].rootY };
  }

  if (targetY >= centers[lastIndex].viewportY) {
    return { progressUnit: lastIndex, progressY: centers[lastIndex].rootY };
  }

  for (let index = 0; index < lastIndex; index += 1) {
    const current = centers[index];
    const next = centers[index + 1];

    if (targetY >= current.viewportY && targetY <= next.viewportY) {
      const amount = clamp(
        (targetY - current.viewportY) / Math.max(next.viewportY - current.viewportY, 1),
        0,
        1,
      );

      return {
        progressUnit: index + amount,
        progressY: lerp(current.rootY, next.rootY, amount),
      };
    }
  }

  return { progressUnit: 0, progressY: centers[0].rootY };
};

const applyVisuals = (state: MobileRootState) => {
  state.fill.style.top = `${state.lineStartY}px`;
  state.fill.style.height = `${Math.max(state.currentY - state.lineStartY, 0)}px`;
  state.progress.style.top = `${state.currentY}px`;

  state.cards.forEach((card, index) => {
    const strength = Math.max(0, 1 - Math.abs(state.currentProgress - index));
    setStrength(card, strength);
  });
};

const syncRootTargets = (state: MobileRootState, immediate = false) => {
  if (state.root.offsetParent === null) {
    return;
  }

  const rootRect = state.root.getBoundingClientRect();
  const centers = state.nodes.map((node) => {
    const rect = node.getBoundingClientRect();
    const centerViewportY = rect.top + rect.height / 2;

    return {
      viewportY: centerViewportY,
      rootY: rect.top - rootRect.top + rect.height / 2,
    };
  });

  const firstY = centers[0]?.rootY ?? 0;
  const lastY = centers[centers.length - 1]?.rootY ?? firstY;
  const { progressUnit, progressY } = resolveContinuousProgress(centers);

  state.lineStartY = firstY;
  state.line.style.top = `${firstY}px`;
  state.line.style.height = `${Math.max(lastY - firstY, 0)}px`;
  state.targetProgress = progressUnit;
  state.targetY = progressY;

  if (!state.initialized || immediate) {
    state.currentProgress = progressUnit;
    state.currentY = progressY;
    state.initialized = true;
  }

  applyVisuals(state);
};

export const setupMobileHowItWorks = () => {
  const roots = Array.from(
    document.querySelectorAll<HTMLElement>("[data-step-showcase-mobile]"),
  );
  if (!roots.length) {
    return;
  }

  const states = roots
    .map((root) => {
      const cards = Array.from(
        root.querySelectorAll<HTMLElement>("[data-step-showcase-mobile-card]"),
      );
      const nodes = Array.from(
        root.querySelectorAll<HTMLElement>("[data-step-showcase-mobile-node]"),
      );
      const line = root.querySelector<HTMLElement>("[data-step-showcase-mobile-line]");
      const fill = root.querySelector<HTMLElement>("[data-step-showcase-mobile-fill]");
      const progress = root.querySelector<HTMLElement>("[data-step-showcase-mobile-progress]");

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
        lineStartY: 0,
        currentProgress: 0,
        targetProgress: 0,
        currentY: 0,
        targetY: 0,
        initialized: false,
      };
    })
    .filter((state): state is MobileRootState => state !== null);

  let syncFrameId = 0;
  let animationFrameId = 0;

  const animate = () => {
    let keepAnimating = false;

    states.forEach((state) => {
      const progressDelta = state.targetProgress - state.currentProgress;
      const yDelta = state.targetY - state.currentY;

      if (Math.abs(progressDelta) < 0.001) {
        state.currentProgress = state.targetProgress;
      } else {
        state.currentProgress = lerp(state.currentProgress, state.targetProgress, 0.18);
        keepAnimating = true;
      }

      if (Math.abs(yDelta) < 0.5) {
        state.currentY = state.targetY;
      } else {
        state.currentY = lerp(state.currentY, state.targetY, 0.2);
        keepAnimating = true;
      }

      applyVisuals(state);
    });

    animationFrameId = keepAnimating ? window.requestAnimationFrame(animate) : 0;
  };

  const ensureAnimation = () => {
    if (animationFrameId !== 0) {
      return;
    }

    animationFrameId = window.requestAnimationFrame(animate);
  };

  const runSync = (immediate = false) => {
    syncFrameId = 0;
    states.forEach((state) => syncRootTargets(state, immediate));
    ensureAnimation();
  };

  const schedule = () => {
    if (syncFrameId !== 0) {
      return;
    }

    syncFrameId = window.requestAnimationFrame(() => runSync(false));
  };

  runSync(true);
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  window.visualViewport?.addEventListener("resize", schedule);
};
