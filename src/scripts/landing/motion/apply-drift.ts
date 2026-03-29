import { createNoiseDrift } from "./noise-drift";

const parseNumber = (value: string | undefined, fallback: number) => {
  const parsed = Number.parseFloat(value ?? "");
  return Number.isFinite(parsed) ? parsed : fallback;
};

interface DriftState {
  element: HTMLElement;
  sample: ReturnType<typeof createNoiseDrift>;
}

export const setupNoiseDrift = () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-noise-drift]"));
  if (!elements.length) {
    return;
  }

  const states: DriftState[] = elements.map((element) => {
    const seed = parseNumber(element.dataset.driftSeed, 1);
    const amplitudeX = parseNumber(element.dataset.driftAmplitudeX, 8);
    const amplitudeY = parseNumber(element.dataset.driftAmplitudeY, 8);
    const speed = parseNumber(element.dataset.driftSpeed, 0.6);

    return {
      element,
      sample: createNoiseDrift({ seed, amplitudeX, amplitudeY, speed }),
    };
  });

  let frameId = 0;

  const render = (timeMs: number) => {
    states.forEach(({ element, sample }) => {
      const { x, y } = sample(timeMs);
      element.style.setProperty("--drift-x", `${x.toFixed(2)}px`);
      element.style.setProperty("--drift-y", `${y.toFixed(2)}px`);
    });

    frameId = window.requestAnimationFrame(render);
  };

  frameId = window.requestAnimationFrame(render);

  window.addEventListener(
    "pagehide",
    () => {
      window.cancelAnimationFrame(frameId);
    },
    { once: true },
  );
};
