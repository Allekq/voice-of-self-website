const resetSurfaceDepth = (element: HTMLElement) => {
  element.classList.remove("is-depth-active");
  element.style.setProperty("--surface-shift-x", "0px");
  element.style.setProperty("--surface-shift-y", "0px");
  element.style.setProperty("--surface-rotate-x", "0deg");
  element.style.setProperty("--surface-rotate-y", "0deg");
  element.style.setProperty("--surface-glow-x", "50%");
  element.style.setProperty("--surface-glow-y", "22%");
};

const applySurfaceDepth = (
  element: HTMLElement,
  clientX: number,
  clientY: number,
  strength = 1,
) => {
  const rect = element.getBoundingClientRect();
  const percentX = (clientX - rect.left) / Math.max(rect.width, 1);
  const percentY = (clientY - rect.top) / Math.max(rect.height, 1);
  const centeredX = (percentX - 0.5) * 2;
  const centeredY = (percentY - 0.5) * 2;

  element.classList.add("is-depth-active");
  element.style.setProperty("--surface-shift-x", `${(centeredX * 5 * strength).toFixed(2)}px`);
  element.style.setProperty("--surface-shift-y", `${(centeredY * 3 * strength).toFixed(2)}px`);
  element.style.setProperty(
    "--surface-rotate-x",
    `${(-centeredY * 5.5 * strength).toFixed(2)}deg`,
  );
  element.style.setProperty(
    "--surface-rotate-y",
    `${(centeredX * 6.2 * strength).toFixed(2)}deg`,
  );
  element.style.setProperty("--surface-glow-x", `${(percentX * 100).toFixed(2)}%`);
  element.style.setProperty("--surface-glow-y", `${(percentY * 100).toFixed(2)}%`);
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

  surfaces.forEach((surface) => {
    resetSurfaceDepth(surface);

    surface.addEventListener("pointermove", (event) => {
      const isDirectTouch = event.pointerType === "touch" || event.pointerType === "pen";

      if (!finePointerQuery.matches && !isDirectTouch) {
        return;
      }

      applySurfaceDepth(surface, event.clientX, event.clientY, isDirectTouch ? 0.62 : 1);
    });

    surface.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "mouse" && !finePointerQuery.matches) {
        return;
      }

      applySurfaceDepth(
        surface,
        event.clientX,
        event.clientY,
        event.pointerType === "touch" || event.pointerType === "pen" ? 0.62 : 1,
      );
    });

    surface.addEventListener("pointerleave", () => {
      resetSurfaceDepth(surface);
    });

    surface.addEventListener("pointerup", () => {
      resetSurfaceDepth(surface);
    });

    surface.addEventListener("pointercancel", () => {
      resetSurfaceDepth(surface);
    });
  });

  window.addEventListener("blur", () => {
    surfaces.forEach((surface) => resetSurfaceDepth(surface));
  });
};
