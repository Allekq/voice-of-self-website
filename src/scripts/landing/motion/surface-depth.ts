const resetSurfaceDepth = (element: HTMLElement) => {
  element.classList.remove("is-depth-active");
  element.style.setProperty("--surface-shift-x", "0px");
  element.style.setProperty("--surface-shift-y", "0px");
  element.style.setProperty("--surface-rotate-x", "0deg");
  element.style.setProperty("--surface-rotate-y", "0deg");
  element.style.setProperty("--surface-glow-x", "50%");
  element.style.setProperty("--surface-glow-y", "22%");
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
      if (!finePointerQuery.matches) {
        return;
      }

      const rect = surface.getBoundingClientRect();
      const percentX = (event.clientX - rect.left) / Math.max(rect.width, 1);
      const percentY = (event.clientY - rect.top) / Math.max(rect.height, 1);
      const centeredX = (percentX - 0.5) * 2;
      const centeredY = (percentY - 0.5) * 2;

      surface.classList.add("is-depth-active");
      surface.style.setProperty("--surface-shift-x", `${(centeredX * 5).toFixed(2)}px`);
      surface.style.setProperty("--surface-shift-y", `${(centeredY * 3).toFixed(2)}px`);
      surface.style.setProperty("--surface-rotate-x", `${(-centeredY * 5.5).toFixed(2)}deg`);
      surface.style.setProperty("--surface-rotate-y", `${(centeredX * 6.2).toFixed(2)}deg`);
      surface.style.setProperty("--surface-glow-x", `${(percentX * 100).toFixed(2)}%`);
      surface.style.setProperty("--surface-glow-y", `${(percentY * 100).toFixed(2)}%`);
    });

    surface.addEventListener("pointerleave", () => {
      resetSurfaceDepth(surface);
    });
  });

  window.addEventListener("blur", () => {
    surfaces.forEach((surface) => resetSurfaceDepth(surface));
  });
};
