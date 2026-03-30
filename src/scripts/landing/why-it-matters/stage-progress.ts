import {
  whyItMattersAnxietyLabels,
  whyItMattersPreparedLabels,
  whyItMattersRelics,
  whyItMattersSolvedGoal,
} from "../../../components/landing/sections/why-it-matters/why-it-matters.data";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const normalize = (value: number, start: number, end: number) =>
  clamp((value - start) / Math.max(end - start, 0.001), 0, 1);

const getRelicSpan = (index: number) => {
  const current = whyItMattersRelics[index];
  const next = whyItMattersRelics[index + 1];

  if (!current) {
    return 0.18;
  }

  const span = next ? next.revealAt - current.revealAt : 1 - current.revealAt;
  return Math.max(span, 0.16);
};

const updateRelicCards = (stage: HTMLElement, progress: number) => {
  const cards = Array.from(stage.querySelectorAll<HTMLElement>("[data-why-relic]"));

  cards.forEach((card, index) => {
    const relic = whyItMattersRelics[index];

    if (!relic) {
      return;
    }

    const revealAt = relic.revealAt;
    const span = getRelicSpan(index);
    const title = normalize(progress, revealAt + span * 0.1, revealAt + span * 0.28);
    const softenAt = (whyItMattersRelics[index + 2]?.revealAt ?? 1.1) + 0.06;
    const pop = normalize(progress, revealAt - span * 0.12, revealAt + span * 0.16);
    const strike = normalize(progress, revealAt + span * 0.08, revealAt + span * 0.38);
    const growth = normalize(progress, revealAt + span * 0.22, revealAt + span * 0.58);
    const retire = normalize(progress, softenAt, softenAt + 0.18);
    const opacity = pop === 0 ? 0 : clamp(0.24 + pop * 0.76 - retire * 0.32, 0, 1);

    card.style.setProperty("--relic-pop", pop.toFixed(3));
    card.style.setProperty("--relic-title", title.toFixed(3));
    card.style.setProperty("--relic-strike", strike.toFixed(3));
    card.style.setProperty("--relic-growth", growth.toFixed(3));
    card.style.setProperty("--relic-retire", retire.toFixed(3));
    card.style.setProperty("--relic-opacity", opacity.toFixed(3));
  });
};

const updateStageMetrics = (stage: HTMLElement, progress: number) => {
  const solvedCount = whyItMattersRelics.filter((relic, index) => {
    const span = getRelicSpan(index);
    return progress >= relic.revealAt + span * 0.6;
  }).length;
  const anxietyBars = clamp(whyItMattersSolvedGoal - solvedCount, 1, whyItMattersSolvedGoal);
  const preparedBars = clamp(solvedCount, 0, whyItMattersSolvedGoal);
  const anxietyIndex = clamp(
    Math.round((solvedCount / Math.max(whyItMattersSolvedGoal, 1)) * (whyItMattersAnxietyLabels.length - 1)),
    0,
    whyItMattersAnxietyLabels.length - 1,
  );
  const preparedIndex = clamp(
    Math.round((preparedBars / Math.max(whyItMattersSolvedGoal, 1)) * (whyItMattersPreparedLabels.length - 1)),
    0,
    whyItMattersPreparedLabels.length - 1,
  );

  const solvedCountElement = stage.querySelector<HTMLElement>("[data-why-solved-count]");
  const anxietyLabelElement = stage.querySelector<HTMLElement>("[data-why-anxiety-label]");
  const preparedLabelElement = stage.querySelector<HTMLElement>("[data-why-prepared-label]");
  const anxietyBarElements = Array.from(stage.querySelectorAll<HTMLElement>("[data-why-anxiety-bar]"));
  const preparedBarElements = Array.from(stage.querySelectorAll<HTMLElement>("[data-why-prepared-bar]"));

  if (solvedCountElement) {
    solvedCountElement.textContent = String(solvedCount);
  }

  if (anxietyLabelElement) {
    anxietyLabelElement.textContent = whyItMattersAnxietyLabels[anxietyIndex];
  }

  if (preparedLabelElement) {
    preparedLabelElement.textContent = whyItMattersPreparedLabels[preparedIndex];
  }

  anxietyBarElements.forEach((bar, index) => {
    const isActive = index < anxietyBars;
    bar.classList.toggle("is-active", isActive);
    bar.style.setProperty("--signal-active", isActive ? "1" : "0");
  });

  preparedBarElements.forEach((bar, index) => {
    const isActive = index < preparedBars;
    bar.classList.toggle("is-active", isActive);
    bar.style.setProperty("--prepared-active", isActive ? "1" : "0");
  });
};

const updateStageFrame = (visualTrack: HTMLElement, stageFrame: HTMLElement, progress: number) => {
  const visualHeight = visualTrack.getBoundingClientRect().height;
  const frameHeight = stageFrame.getBoundingClientRect().height;
  const travel = Math.max(visualHeight - frameHeight, 0);

  stageFrame.style.setProperty("--why-panel-travel", `${travel.toFixed(2)}px`);
  stageFrame.style.setProperty("--why-panel-progress", progress.toFixed(3));
};

const getRootProgress = (root: HTMLElement) => {
  const rect = root.getBoundingClientRect();
  const viewportHeight = window.innerHeight || 1;
  const topInset = clamp(viewportHeight * 0.11, 48, 88);
  const bottomInset = clamp(viewportHeight * 0.08, 28, 56);
  const endTop = viewportHeight - bottomInset - rect.height;
  const travel = Math.max(topInset - endTop, viewportHeight * 0.58);

  return clamp((topInset - rect.top) / Math.max(travel, 1), 0, 1);
};

const getMobileProgress = (visualTrack: HTMLElement, stageFrame: HTMLElement) => {
  const rect = visualTrack.getBoundingClientRect();
  const viewportHeight = window.innerHeight || 1;
  const frameHeight = stageFrame.getBoundingClientRect().height;
  const topInset = clamp(viewportHeight * 0.12, 68, 104);
  const travel = Math.max(
    rect.height - Math.min(frameHeight, viewportHeight * 0.7),
    viewportHeight * 0.82,
  );

  return clamp((topInset - rect.top) / Math.max(travel, 1), 0, 1);
};

const updateStageProgress = (
  root: HTMLElement,
  stage: HTMLElement,
  stageFrame: HTMLElement,
  visualTrack: HTMLElement,
  reducedMotion = false,
) => {
  const isPhoneViewport = window.matchMedia("(max-width: 47.99rem)").matches;
  const progress = reducedMotion
    ? 0.92
    : isPhoneViewport
      ? getMobileProgress(visualTrack, stageFrame)
      : getRootProgress(root);

  stage.style.setProperty("--why-progress", progress.toFixed(3));
  stage.classList.toggle("is-stage-active", progress > 0.04);

  updateStageFrame(visualTrack, stageFrame, progress);
  updateRelicCards(stage, progress);
  updateStageMetrics(stage, progress);
};

export const setupWhyItMattersStage = () => {
  const roots = Array.from(document.querySelectorAll<HTMLElement>("[data-why-progress-root]"));

  const stageContexts = roots
    .map((root) => {
      const stage = root.querySelector<HTMLElement>("[data-why-stage]");
      const stageFrame = root.querySelector<HTMLElement>("[data-why-stage-frame]");
      const visualTrack = root.querySelector<HTMLElement>("[data-why-visual-track]");

      if (!stage || !stageFrame || !visualTrack) {
        return null;
      }

      return { root, stage, stageFrame, visualTrack };
    })
    .filter(
      (
        context,
      ): context is {
        root: HTMLElement;
        stage: HTMLElement;
        stageFrame: HTMLElement;
        visualTrack: HTMLElement;
      } => context !== null,
    );

  if (!stageContexts.length) {
    return;
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion) {
    stageContexts.forEach(({ root, stage, stageFrame, visualTrack }) =>
      updateStageProgress(root, stage, stageFrame, visualTrack, true),
    );
    return;
  }

  let frameId = 0;

  const render = () => {
    frameId = 0;
    stageContexts.forEach(({ root, stage, stageFrame, visualTrack }) =>
      updateStageProgress(root, stage, stageFrame, visualTrack),
    );
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
