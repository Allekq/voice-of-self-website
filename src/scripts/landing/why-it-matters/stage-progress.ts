const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const updateStageProgress = (stage: HTMLElement) => {
  const rect = stage.getBoundingClientRect();
  const viewportHeight = window.innerHeight || 1;
  const start = viewportHeight * 0.9;
  const end = viewportHeight * 0.18;
  const progress = clamp((start - rect.top) / Math.max(start - end, 1), 0, 1);

  stage.style.setProperty("--why-progress", progress.toFixed(3));
  stage.classList.toggle("is-stage-active", progress > 0.08);
};

export const setupWhyItMattersStage = () => {
  const stages = Array.from(document.querySelectorAll<HTMLElement>("[data-why-stage]"));

  if (!stages.length) {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    stages.forEach((stage) => {
      stage.style.setProperty("--why-progress", "0.82");
      stage.classList.add("is-stage-active");
    });

    return;
  }

  let frameId = 0;

  const render = () => {
    frameId = 0;
    stages.forEach(updateStageProgress);
  };

  const requestRender = () => {
    if (frameId !== 0) {
      return;
    }

    frameId = window.requestAnimationFrame(render);
  };

  requestRender();

  window.addEventListener("scroll", requestRender, { passive: true });
  window.addEventListener("resize", requestRender);
};
