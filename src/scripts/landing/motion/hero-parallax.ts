const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const lerp = (start: number, end: number, amount: number) =>
  start + (end - start) * amount;

const parseNumber = (value: string | undefined, fallback: number) => {
  const parsed = Number.parseFloat(value ?? "");
  return Number.isFinite(parsed) ? parsed : fallback;
};

interface LayerState {
  depth: number;
  element: HTMLElement;
  rotateFactor: number;
  scrollDepth: number;
}

interface RootState {
  currentScroll: number;
  currentX: number;
  currentY: number;
  layers: LayerState[];
  root: HTMLElement;
  targetScroll: number;
  targetX: number;
  targetY: number;
}

const syncPointerTargets = (
  state: RootState,
  clientX: number,
  clientY: number,
  strength = 1,
) => {
  const rect = state.root.getBoundingClientRect();
  const localX = ((clientX - rect.left) / Math.max(rect.width, 1) - 0.5) * 2;
  const localY = ((clientY - rect.top) / Math.max(rect.height, 1) - 0.5) * 2;

  state.targetX = clamp(localX * strength, -1, 1);
  state.targetY = clamp(localY * strength, -1, 1);
};

export const setupHeroParallax = () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

  const states = Array.from(document.querySelectorAll<HTMLElement>("[data-hero-parallax-root]"))
    .map<RootState | null>((root) => {
      const layers = Array.from(
        root.querySelectorAll<HTMLElement>("[data-hero-parallax-layer]"),
      ).map<LayerState>((element) => ({
        element,
        depth: parseNumber(element.dataset.heroDepth, 1),
        scrollDepth: parseNumber(element.dataset.heroScrollDepth, 0.6),
        rotateFactor: parseNumber(element.dataset.heroRotateFactor, 3.4),
      }));

      if (!layers.length) {
        return null;
      }

      return {
        root,
        layers,
        currentX: 0,
        currentY: 0,
        targetX: 0,
        targetY: 0,
        currentScroll: 0,
        targetScroll: 0,
      };
    })
    .filter((state): state is RootState => state !== null);

  if (!states.length) {
    return;
  }

  let frameId = 0;

  const applyLayerMotion = (state: RootState) => {
    state.layers.forEach(({ element, depth, scrollDepth, rotateFactor }) => {
      const translateX = state.currentX * depth * 16;
      const translateY = state.currentY * depth * 12 - state.currentScroll * scrollDepth * 18;
      const rotateY = state.currentX * depth * rotateFactor;
      const rotateX = state.currentY * depth * rotateFactor * -0.72;

      element.style.setProperty("--hero-parallax-x", `${translateX.toFixed(2)}px`);
      element.style.setProperty("--hero-parallax-y", `${translateY.toFixed(2)}px`);
      element.style.setProperty("--hero-parallax-rotate-y", `${rotateY.toFixed(2)}deg`);
      element.style.setProperty("--hero-parallax-rotate-x", `${rotateX.toFixed(2)}deg`);
    });
  };

  const render = () => {
    let keepAnimating = false;

    states.forEach((state) => {
      state.currentX = lerp(state.currentX, state.targetX, 0.14);
      state.currentY = lerp(state.currentY, state.targetY, 0.14);
      state.currentScroll = lerp(state.currentScroll, state.targetScroll, 0.1);

      if (
        Math.abs(state.targetX - state.currentX) > 0.001 ||
        Math.abs(state.targetY - state.currentY) > 0.001 ||
        Math.abs(state.targetScroll - state.currentScroll) > 0.001
      ) {
        keepAnimating = true;
      }

      applyLayerMotion(state);
    });

    frameId = keepAnimating ? window.requestAnimationFrame(render) : 0;
  };

  const ensureAnimation = () => {
    if (frameId !== 0) {
      return;
    }

    frameId = window.requestAnimationFrame(render);
  };

  const syncScroll = () => {
    const viewportHeight = Math.max(window.innerHeight, 1);
    const viewportCenter = viewportHeight / 2;

    states.forEach((state) => {
      const rect = state.root.getBoundingClientRect();
      const rootCenter = rect.top + rect.height / 2;

      state.targetScroll = clamp((viewportCenter - rootCenter) / (viewportHeight * 0.62), -1, 1);
    });

    ensureAnimation();
  };

  states.forEach((state) => {
    state.root.addEventListener("pointermove", (event) => {
      const isDirectTouch = event.pointerType === "touch" || event.pointerType === "pen";

      if (!finePointerQuery.matches && !isDirectTouch) {
        return;
      }

      syncPointerTargets(state, event.clientX, event.clientY, isDirectTouch ? 0.62 : 1);
      ensureAnimation();
    });

    state.root.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "mouse" && !finePointerQuery.matches) {
        return;
      }

      syncPointerTargets(
        state,
        event.clientX,
        event.clientY,
        event.pointerType === "touch" || event.pointerType === "pen" ? 0.62 : 1,
      );
      ensureAnimation();
    });

    state.root.addEventListener("pointerleave", () => {
      state.targetX = 0;
      state.targetY = 0;
      ensureAnimation();
    });

    state.root.addEventListener("pointerup", () => {
      state.targetX = 0;
      state.targetY = 0;
      ensureAnimation();
    });

    state.root.addEventListener("pointercancel", () => {
      state.targetX = 0;
      state.targetY = 0;
      ensureAnimation();
    });
  });

  syncScroll();
  window.addEventListener("scroll", syncScroll, { passive: true });
  window.addEventListener("resize", syncScroll);
  window.addEventListener(
    "pagehide",
    () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
    },
    { once: true },
  );
};
