import {
  whyItMattersAnxietyLabels,
  whyItMattersPreparedLabels,
  whyItMattersRelics,
  whyItMattersSolvedGoal,
} from "../../../components/landing/sections/why-it-matters/why-it-matters.data";
import {
  createCoarseViewportResizeGuard,
  getStableViewportHeight,
} from "../shared/stable-viewport";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const normalize = (value: number, start: number, end: number) =>
  clamp((value - start) / Math.max(end - start, 0.001), 0, 1);

type WhyNativeAnimation = Animation & {
  rangeEnd?: string;
  rangeStart?: string;
  timeline?: unknown;
};

type WhyTimelineInsets = {
  bottomInset: number;
  topInset: number;
};

type WhyStageContext = {
  root: HTMLElement;
  stage: HTMLElement;
  stageFrame: HTMLElement;
  visualTrack: HTMLElement;
  nativeAnimations: WhyNativeAnimation[];
};

const getViewTimelineCtor = () =>
  (window as Window & { ViewTimeline?: new (options?: Record<string, unknown>) => unknown }).ViewTimeline;

const supportsNativeWhyTimelines = () =>
  typeof window !== "undefined" &&
  typeof HTMLElement !== "undefined" &&
  typeof Element !== "undefined" &&
  typeof Element.prototype.animate === "function" &&
  typeof getViewTimelineCtor() === "function";

const isVisibleRoot = (element: HTMLElement) => {
  const styles = window.getComputedStyle(element);

  if (styles.display === "none" || styles.visibility === "hidden") {
    return false;
  }

  const rect = element.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
};

const getRelicSpan = (index: number) => {
  const current = whyItMattersRelics[index];
  const next = whyItMattersRelics[index + 1];

  if (!current) {
    return 0.18;
  }

  const span = next ? next.revealAt - current.revealAt : 1 - current.revealAt;
  return Math.max(span, 0.16);
};

const getDesktopInsets = (viewportHeight: number): WhyTimelineInsets => ({
  bottomInset: clamp(viewportHeight * 0.08, 28, 56),
  topInset: clamp(viewportHeight * 0.11, 48, 88),
});

const getHeaderSafeInset = () => {
  const headerRect = document.querySelector<HTMLElement>("[data-landing-header]")?.getBoundingClientRect();

  if (!headerRect) {
    return 0;
  }

  return headerRect.bottom + 16;
};

const getMobileInsets = (viewportHeight: number): WhyTimelineInsets => ({
  bottomInset: clamp(viewportHeight * 0.2, 96, 176),
  topInset: clamp(
    Math.max(
      getHeaderSafeInset(),
      viewportHeight * 0.18,
    ),
    112,
    240,
  ),
});

const syncDesktopTrackLayout = (root: HTMLElement, visualTrack: HTMLElement, stageFrame: HTMLElement) => {
  const isPhoneViewport = window.matchMedia("(max-width: 47.99rem)").matches;

  if (isPhoneViewport) {
    visualTrack.style.removeProperty("--why-desktop-track-min-height");
    return;
  }

  const viewportHeight = getStableViewportHeight();
  const copyHeight = root.querySelector<HTMLElement>(".why-showcase__copy")?.getBoundingClientRect().height ?? 0;
  const frameHeight = stageFrame.getBoundingClientRect().height;
  const desktopTrackSpan = clamp(viewportHeight * 0.18, 112, 220);
  const trackHeight = Math.max(copyHeight, frameHeight + desktopTrackSpan);

  visualTrack.style.setProperty("--why-desktop-track-min-height", `${trackHeight.toFixed(2)}px`);
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
    const growth = normalize(progress, revealAt + span * 0.22, revealAt + span * 0.58);
    const retire = normalize(progress, softenAt, softenAt + 0.18);
    const opacity = pop === 0 ? 0 : clamp(0.24 + pop * 0.76 - retire * 0.32, 0, 1);

    card.style.setProperty("--relic-pop", pop.toFixed(3));
    card.style.setProperty("--relic-title", title.toFixed(3));
    card.style.setProperty("--relic-growth", growth.toFixed(3));
    card.style.setProperty("--relic-retire", retire.toFixed(3));
    card.style.setProperty("--relic-opacity", opacity.toFixed(3));
  });
};

const getSolvedProgress = (progress: number) =>
  whyItMattersRelics.reduce((total, relic, index) => {
    const span = getRelicSpan(index);

    return total + normalize(progress, relic.revealAt + span * 0.08, relic.revealAt + span * 0.74);
  }, 0);

const animateMetricValueChange = (element: HTMLElement) => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  element.getAnimations().forEach((animation) => animation.cancel());
  element.animate(
    [
      { opacity: 0.38, transform: "translate3d(0, 0.32rem, 0) scale(0.92)" },
      { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)" },
    ],
    {
      duration: 340,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    },
  );
};

const updateStageMetrics = (stage: HTMLElement, progress: number) => {
  const solvedCount = whyItMattersRelics.filter((relic, index) => {
    const span = getRelicSpan(index);
    return progress >= relic.revealAt + span * 0.6;
  }).length;
  const solvedProgress = clamp(getSolvedProgress(progress), 0, whyItMattersSolvedGoal);
  const anxietyLevel = clamp(whyItMattersSolvedGoal - solvedProgress, 0.12, whyItMattersSolvedGoal);
  const preparedLevel = clamp(solvedProgress, 0, whyItMattersSolvedGoal);
  const anxietyIndex = clamp(
    Math.round((solvedProgress / Math.max(whyItMattersSolvedGoal, 1)) * (whyItMattersAnxietyLabels.length - 1)),
    0,
    whyItMattersAnxietyLabels.length - 1,
  );
  const preparedIndex = clamp(
    Math.round((preparedLevel / Math.max(whyItMattersSolvedGoal, 1)) * (whyItMattersPreparedLabels.length - 1)),
    0,
    whyItMattersPreparedLabels.length - 1,
  );

  const solvedCountElement = stage.querySelector<HTMLElement>("[data-why-solved-count]");
  const anxietyLabelElement = stage.querySelector<HTMLElement>("[data-why-anxiety-label]");
  const preparedLabelElement = stage.querySelector<HTMLElement>("[data-why-prepared-label]");
  const anxietyBarElements = Array.from(stage.querySelectorAll<HTMLElement>("[data-why-anxiety-bar]"));
  const preparedBarElements = Array.from(stage.querySelectorAll<HTMLElement>("[data-why-prepared-bar]"));

  if (solvedCountElement) {
    const nextCount = String(solvedCount);

    if (solvedCountElement.textContent !== nextCount) {
      solvedCountElement.textContent = nextCount;
      animateMetricValueChange(solvedCountElement);
    }
  }

  if (anxietyLabelElement) {
    anxietyLabelElement.textContent = whyItMattersAnxietyLabels[anxietyIndex];
  }

  if (preparedLabelElement) {
    preparedLabelElement.textContent = whyItMattersPreparedLabels[preparedIndex];
  }

  anxietyBarElements.forEach((bar, index) => {
    const signalStrength = clamp(anxietyLevel - index, 0, 1);
    const isActive = signalStrength > 0.03;

    bar.classList.toggle("is-active", isActive);
    bar.style.setProperty("--signal-active", signalStrength.toFixed(3));
  });

  preparedBarElements.forEach((bar, index) => {
    const preparedStrength = clamp(preparedLevel - index, 0, 1);
    const isActive = preparedStrength > 0.03;

    bar.classList.toggle("is-active", isActive);
    bar.style.setProperty("--prepared-active", preparedStrength.toFixed(3));
  });
};

const getPanelTravel = (visualTrack: HTMLElement, stageFrame: HTMLElement) => {
  const visualHeight = visualTrack.getBoundingClientRect().height;
  const frameHeight = stageFrame.getBoundingClientRect().height;
  const isPhoneViewport = window.matchMedia("(max-width: 47.99rem)").matches;
  const frameTop = Number.parseFloat(window.getComputedStyle(stageFrame).top) || 0;
  return isPhoneViewport
    ? Math.max(visualHeight - frameHeight - frameTop, 0)
    : Math.max(visualHeight - frameHeight, 0);
};

const updateStageFrame = (visualTrack: HTMLElement, stageFrame: HTMLElement, progress: number) => {
  const travel = getPanelTravel(visualTrack, stageFrame);

  stageFrame.style.setProperty("--why-panel-travel", `${travel.toFixed(2)}px`);
  stageFrame.style.setProperty("--why-panel-progress", progress.toFixed(3));
};

const getFrameTranslateY = (stageFrame: HTMLElement) => {
  const transform = window.getComputedStyle(stageFrame).transform;

  if (!transform || transform === "none") {
    return 0;
  }

  try {
    return new DOMMatrixReadOnly(transform).m42;
  } catch {
    return 0;
  }
};

const getRootProgress = (root: HTMLElement) => {
  const rect = root.getBoundingClientRect();
  const viewportHeight = getStableViewportHeight();
  const { topInset, bottomInset } = getDesktopInsets(viewportHeight);
  const endTop = viewportHeight - bottomInset - rect.height;
  const travel = Math.max(topInset - endTop, viewportHeight * 0.58);

  return clamp((topInset - rect.top) / Math.max(travel, 1), 0, 1);
};

const syncMobileStickyLayout = (visualTrack: HTMLElement, stageFrame: HTMLElement) => {
  const isPhoneViewport = window.matchMedia("(max-width: 47.99rem)").matches;

  if (!isPhoneViewport) {
    stageFrame.style.removeProperty("--why-mobile-sticky-top");
    visualTrack.style.removeProperty("--why-mobile-panel-height");
    visualTrack.style.removeProperty("--why-mobile-track-span");
    return;
  }

  const viewportHeight = getStableViewportHeight();
  const { bottomInset, topInset } = getMobileInsets(viewportHeight);
  const frameHeight = stageFrame.getBoundingClientRect().height;
  const stickyTop = clamp(viewportHeight - bottomInset - frameHeight, topInset, viewportHeight - frameHeight);
  const trackSpan = clamp(viewportHeight * 0.72, 240, 440);

  stageFrame.style.setProperty("--why-mobile-sticky-top", `${stickyTop.toFixed(2)}px`);
  visualTrack.style.setProperty("--why-mobile-panel-height", `${frameHeight.toFixed(2)}px`);
  visualTrack.style.setProperty("--why-mobile-track-span", `${trackSpan.toFixed(2)}px`);
};

const getMobileProgress = (visualTrack: HTMLElement, stageFrame: HTMLElement) => {
  const rect = visualTrack.getBoundingClientRect();
  const viewportHeight = getStableViewportHeight();
  const { bottomInset, topInset } = getMobileInsets(viewportHeight);
  const frameHeight = stageFrame.getBoundingClientRect().height;
  const stickyTop = clamp(viewportHeight - bottomInset - frameHeight, topInset, viewportHeight - frameHeight);
  const startTop = stickyTop;
  const travel = Math.max(rect.height - frameHeight, 1);

  return clamp((startTop - rect.top) / travel, 0, 1);
};

const updateStageProgress = (
  root: HTMLElement,
  stage: HTMLElement,
  stageFrame: HTMLElement,
  visualTrack: HTMLElement,
  reducedMotion = false,
) => {
  const isPhoneViewport = window.matchMedia("(max-width: 47.99rem)").matches;
  syncDesktopTrackLayout(root, visualTrack, stageFrame);
  syncMobileStickyLayout(visualTrack, stageFrame);

  const fallbackProgress = isPhoneViewport ? getMobileProgress(visualTrack, stageFrame) : getRootProgress(root);
  const nativeTravel = getPanelTravel(visualTrack, stageFrame);
  const nativeProgress =
    nativeTravel > 0 ? clamp(getFrameTranslateY(stageFrame) / nativeTravel, 0, 1) : fallbackProgress;
  const progress = reducedMotion
    ? 0.92
    : isPhoneViewport
      ? fallbackProgress
      : supportsNativeWhyTimelines()
        ? nativeProgress
        : fallbackProgress;

  stage.style.setProperty("--why-progress", progress.toFixed(3));
  stage.classList.toggle("is-stage-active", progress > 0.04);

  updateStageFrame(visualTrack, stageFrame, progress);
  updateRelicCards(stage, progress);
  updateStageMetrics(stage, progress);
};

const clearNativeStageAnimations = (context: WhyStageContext) => {
  context.nativeAnimations.forEach((animation) => animation.cancel());
  context.nativeAnimations = [];
};

const setupNativeStageAnimations = (context: WhyStageContext) => {
  clearNativeStageAnimations(context);

  if (!supportsNativeWhyTimelines()) {
    return;
  }

  const viewportHeight = getStableViewportHeight();
  const isPhoneViewport = window.matchMedia("(max-width: 47.99rem)").matches;

  if (isPhoneViewport) {
    return;
  }

  syncDesktopTrackLayout(context.root, context.visualTrack, context.stageFrame);

  const subject = isPhoneViewport ? context.visualTrack : context.root;
  const { topInset, bottomInset } = isPhoneViewport
    ? getMobileInsets(viewportHeight)
    : getDesktopInsets(viewportHeight);
  const ViewTimelineCtor = getViewTimelineCtor();

  if (!ViewTimelineCtor) {
    return;
  }

  const timeline = new ViewTimelineCtor({
    axis: "block",
    inset: `${topInset}px ${bottomInset}px`,
    subject,
  });

  const animateWithTimeline = (
    element: Element,
    keyframes: Keyframe[] | PropertyIndexedKeyframes,
    rangeStart = "contain 0%",
    rangeEnd = "contain 100%",
  ) => {
    const animation = element.animate(keyframes, {
      fill: "both",
      easing: "linear",
      rangeEnd,
      rangeStart,
      timeline,
    } as KeyframeAnimationOptions & { rangeEnd: string; rangeStart: string; timeline: unknown }) as WhyNativeAnimation;

    context.nativeAnimations.push(animation);
  };

  animateWithTimeline(context.stageFrame, [
    { transform: "translate3d(0, 0, 0)" },
    { transform: `translate3d(0, ${getPanelTravel(context.visualTrack, context.stageFrame).toFixed(2)}px, 0)` },
  ]);

};

export const setupWhyItMattersStage = () => {
  const roots = Array.from(document.querySelectorAll<HTMLElement>("[data-why-progress-root]"));

  const stageContexts = roots
    .map<WhyStageContext | null>((root) => {
      const stage = root.querySelector<HTMLElement>("[data-why-stage]");
      const stageFrame = root.querySelector<HTMLElement>("[data-why-stage-frame]");
      const visualTrack = root.querySelector<HTMLElement>("[data-why-visual-track]");

      if (!stage || !stageFrame || !visualTrack) {
        return null;
      }

      return {
        root,
        stage,
        stageFrame,
        visualTrack,
        nativeAnimations: [] as WhyNativeAnimation[],
      };
    })
    .filter((context): context is WhyStageContext => context !== null);

  if (!stageContexts.length) {
    return;
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ignoreResize = createCoarseViewportResizeGuard();

  if (reducedMotion) {
    stageContexts.forEach(({ root, stage, stageFrame, visualTrack }) => {
      if (!isVisibleRoot(root)) {
        return;
      }

      updateStageProgress(root, stage, stageFrame, visualTrack, true);
    });
    return;
  }

  stageContexts.forEach((context) => {
    if (!isVisibleRoot(context.root)) {
      return;
    }

    setupNativeStageAnimations(context);
  });

  let frameId = 0;

  const render = () => {
    frameId = 0;

    stageContexts.forEach(({ root, stage, stageFrame, visualTrack }) => {
      if (!isVisibleRoot(root)) {
        return;
      }

      updateStageProgress(root, stage, stageFrame, visualTrack);
    });
  };

  const requestRender = () => {
    if (frameId !== 0) {
      return;
    }

    frameId = window.requestAnimationFrame(render);
  };

  requestRender();

  window.addEventListener("scroll", requestRender, { passive: true });
  const handleResize = () => {
    stageContexts.forEach((context) => {
      if (!isVisibleRoot(context.root)) {
        clearNativeStageAnimations(context);
        return;
      }

      setupNativeStageAnimations(context);
    });

    requestRender();
  };

  window.addEventListener("resize", () => {
    if (ignoreResize()) {
      return;
    }

    handleResize();
  });
};
