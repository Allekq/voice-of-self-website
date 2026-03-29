const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export const setupStickyHeader = () => {
  const header = document.querySelector<HTMLElement>("[data-landing-header]");

  if (!header) {
    return;
  }

  let frameId = 0;

  const sync = () => {
    const progress = clamp(window.scrollY / 140, 0, 1);

    header.classList.toggle("is-scrolled", progress > 0.14);
    header.style.setProperty("--header-scroll-progress", progress.toFixed(3));
    frameId = 0;
  };

  const requestSync = () => {
    if (frameId !== 0) {
      return;
    }

    frameId = window.requestAnimationFrame(sync);
  };

  sync();
  window.addEventListener("scroll", requestSync, { passive: true });
  window.addEventListener("resize", requestSync);
};
