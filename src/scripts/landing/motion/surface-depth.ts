const resetSurfaceDepth = (element: HTMLElement) => {
  element.style.setProperty("--surface-shift-x", "0px");
  element.style.setProperty("--surface-shift-y", "0px");
  element.style.setProperty("--surface-rotate-x", "0deg");
  element.style.setProperty("--surface-rotate-y", "0deg");
  element.style.setProperty("--surface-glow-x", "50%");
  element.style.setProperty("--surface-glow-y", "22%");
  element.style.setProperty("--surface-glow-opacity", "0");
};

interface SurfaceState {
  currentGlowX: number;
  currentGlowY: number;
  currentStrength: number;
  currentX: number;
  currentY: number;
  element: HTMLElement;
  targetGlowX: number;
  targetGlowY: number;
  targetStrength: number;
  targetX: number;
  targetY: number;
  touchIdentifier: number | null;
}

interface SurfacePoint {
  centeredX: number;
  centeredY: number;
  percentX: number;
  percentY: number;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const lerp = (start: number, end: number, amount: number) =>
  start + (end - start) * amount;

const getSurfacePoint = (state: SurfaceState, clientX: number, clientY: number): SurfacePoint => {
  const rect = state.element.getBoundingClientRect();
  const percentX = clamp((clientX - rect.left) / Math.max(rect.width, 1), 0, 1);
  const percentY = clamp((clientY - rect.top) / Math.max(rect.height, 1), 0, 1);

  return {
    centeredX: (percentX - 0.5) * 2,
    centeredY: (percentY - 0.5) * 2,
    percentX,
    percentY,
  };
};

const syncSurfaceGlow = (state: SurfaceState, point: SurfacePoint) => {
  state.currentGlowX = point.percentX;
  state.currentGlowY = point.percentY;
  state.targetGlowX = point.percentX;
  state.targetGlowY = point.percentY;
};

const updateSurfaceTarget = (
  state: SurfaceState,
  clientX: number,
  clientY: number,
  strength = 1,
  syncGlow = false,
) => {
  const point = getSurfacePoint(state, clientX, clientY);

  if (syncGlow) {
    syncSurfaceGlow(state, point);
  }

  state.targetX = point.centeredX;
  state.targetY = point.centeredY;
  state.targetGlowX = point.percentX;
  state.targetGlowY = point.percentY;
  state.targetStrength = strength;
};

const resetSurfaceTarget = (state: SurfaceState) => {
  state.targetX = 0;
  state.targetY = 0;
  state.targetGlowX = state.currentGlowX;
  state.targetGlowY = state.currentGlowY;
  state.targetStrength = 0;
};

const renderSurfaceState = (state: SurfaceState) => {
  state.currentX = lerp(state.currentX, state.targetX, 0.18);
  state.currentY = lerp(state.currentY, state.targetY, 0.18);
  state.currentGlowX = lerp(state.currentGlowX, state.targetGlowX, 0.18);
  state.currentGlowY = lerp(state.currentGlowY, state.targetGlowY, 0.18);
  state.currentStrength = lerp(state.currentStrength, state.targetStrength, 0.16);

  state.element.classList.toggle("is-depth-active", state.currentStrength > 0.045);
  state.element.style.setProperty(
    "--surface-shift-x",
    `${(state.currentX * 5 * state.currentStrength).toFixed(2)}px`,
  );
  state.element.style.setProperty(
    "--surface-shift-y",
    `${(state.currentY * 3 * state.currentStrength).toFixed(2)}px`,
  );
  state.element.style.setProperty(
    "--surface-rotate-x",
    `${(-state.currentY * 5.5 * state.currentStrength).toFixed(2)}deg`,
  );
  state.element.style.setProperty(
    "--surface-rotate-y",
    `${(state.currentX * 6.2 * state.currentStrength).toFixed(2)}deg`,
  );
  state.element.style.setProperty("--surface-glow-x", `${(state.currentGlowX * 100).toFixed(2)}%`);
  state.element.style.setProperty("--surface-glow-y", `${(state.currentGlowY * 100).toFixed(2)}%`);
  state.element.style.setProperty(
    "--surface-glow-opacity",
    Math.min(1, state.currentStrength * 1.1).toFixed(3),
  );
};

export const setupSurfaceDepth = () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
  const surfaces = Array.from(document.querySelectorAll<HTMLElement>("[data-surface-depth]"));

  if (!surfaces.length) {
    return;
  }

  const states: SurfaceState[] = surfaces.map((element) => ({
    element,
    currentX: 0,
    currentY: 0,
    targetX: 0,
    targetY: 0,
    currentGlowX: 0.5,
    currentGlowY: 0.22,
    targetGlowX: 0.5,
    targetGlowY: 0.22,
    currentStrength: 0,
    targetStrength: 0,
    touchIdentifier: null,
  }));

  states.forEach(({ element }) => {
    resetSurfaceDepth(element);
  });

  let frameId = 0;

  const render = () => {
    let keepAnimating = false;

    states.forEach((state) => {
      renderSurfaceState(state);

      if (
        Math.abs(state.targetX - state.currentX) > 0.001 ||
        Math.abs(state.targetY - state.currentY) > 0.001 ||
        Math.abs(state.targetGlowX - state.currentGlowX) > 0.001 ||
        Math.abs(state.targetGlowY - state.currentGlowY) > 0.001 ||
        Math.abs(state.targetStrength - state.currentStrength) > 0.001
      ) {
        keepAnimating = true;
      }
    });

    frameId = keepAnimating ? window.requestAnimationFrame(render) : 0;
  };

  const ensureAnimation = () => {
    if (frameId !== 0) {
      return;
    }

    frameId = window.requestAnimationFrame(render);
  };

  states.forEach((state) => {
    state.element.addEventListener("pointerenter", (event) => {
      if (event.pointerType !== "mouse" || !finePointerQuery.matches) {
        return;
      }

      updateSurfaceTarget(state, event.clientX, event.clientY, 1, true);
      ensureAnimation();
    });

    state.element.addEventListener("pointermove", (event) => {
      if (event.pointerType !== "mouse" || !finePointerQuery.matches) {
        return;
      }

      updateSurfaceTarget(state, event.clientX, event.clientY);
      ensureAnimation();
    });

    state.element.addEventListener("pointerleave", (event) => {
      if (event.pointerType === "mouse" && finePointerQuery.matches) {
        updateSurfaceTarget(state, event.clientX, event.clientY, state.targetStrength, true);
      }

      resetSurfaceTarget(state);
      ensureAnimation();
    });

    state.element.addEventListener(
      "touchstart",
      (event) => {
        if (state.touchIdentifier !== null) {
          return;
        }

        const touch = event.changedTouches[0];

        if (!touch) {
          return;
        }

        state.touchIdentifier = touch.identifier;
        updateSurfaceTarget(state, touch.clientX, touch.clientY, 0.38, true);
        ensureAnimation();
      },
      { passive: true },
    );

    state.element.addEventListener(
      "touchmove",
      (event) => {
        if (state.touchIdentifier === null) {
          return;
        }

        const touch = Array.from(event.touches).find(
          ({ identifier }) => identifier === state.touchIdentifier,
        );

        if (!touch) {
          return;
        }

        updateSurfaceTarget(state, touch.clientX, touch.clientY, 0.38);
        ensureAnimation();
      },
      { passive: true },
    );

    const finishTouch = (touchList: TouchList) => {
      if (state.touchIdentifier === null) {
        return;
      }

      const touch = Array.from(touchList).find(({ identifier }) => identifier === state.touchIdentifier);

      if (!touch) {
        return;
      }

      updateSurfaceTarget(state, touch.clientX, touch.clientY, state.targetStrength, true);
      state.touchIdentifier = null;
      resetSurfaceTarget(state);
      ensureAnimation();
    };

    state.element.addEventListener(
      "touchend",
      (event) => {
        finishTouch(event.changedTouches);
      },
      { passive: true },
    );

    state.element.addEventListener(
      "touchcancel",
      (event) => {
        finishTouch(event.changedTouches);
      },
      { passive: true },
    );
  });

  window.addEventListener("blur", () => {
    states.forEach((state) => {
      state.touchIdentifier = null;
      resetSurfaceTarget(state);
    });
    ensureAnimation();
  });

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
