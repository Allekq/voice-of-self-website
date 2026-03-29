import { clamp, lerp } from "./shared";

interface MobileRootState {
  root: HTMLElement;
  cards: HTMLElement[];
  nodes: HTMLElement[];
  line: HTMLElement;
  fill: HTMLElement;
  progress: HTMLElement;
}

const setStrength = (card: HTMLElement, value: number) => {
  card.style.setProperty("--step-activity", value.toFixed(3));
};

const resolveContinuousProgress = (centers: Array<{ viewportY: number; rootY: number }>) => {
  if (centers.length <= 1) {
    return { progressUnit: 0, progressY: centers[0]?.rootY ?? 0 };
  }

  const targetY = window.innerHeight / 2;
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

const syncRoot = (state: MobileRootState) => {
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

  state.line.style.top = `${firstY}px`;
  state.line.style.height = `${Math.max(lastY - firstY, 0)}px`;
  state.fill.style.top = `${firstY}px`;
  state.fill.style.height = `${Math.max(progressY - firstY, 0)}px`;
  state.progress.style.top = `${progressY}px`;

  state.cards.forEach((card, index) => {
    const strength = Math.max(0, 1 - Math.abs(progressUnit - index));
    setStrength(card, strength);
  });
};

export const setupMobileHowItWorks = () => {
  const roots = Array.from(document.querySelectorAll<HTMLElement>("[data-steps-mobile]"));
  if (!roots.length) {
    return;
  }

  const states = roots
    .map((root) => {
      const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-mobile-step]"));
      const nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-mobile-step-node]"));
      const line = root.querySelector<HTMLElement>("[data-mobile-line]");
      const fill = root.querySelector<HTMLElement>("[data-mobile-fill]");
      const progress = root.querySelector<HTMLElement>("[data-mobile-progress]");

      if (!cards.length || cards.length !== nodes.length || !line || !fill || !progress) {
        return null;
      }

      return { root, cards, nodes, line, fill, progress };
    })
    .filter((state): state is MobileRootState => state !== null);

  let isTicking = false;

  const runSync = () => {
    isTicking = false;
    states.forEach(syncRoot);
  };

  const schedule = () => {
    if (isTicking) {
      return;
    }

    isTicking = true;
    window.requestAnimationFrame(runSync);
  };

  schedule();
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
};
