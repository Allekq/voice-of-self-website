let stableCoarseViewportHeight = 0;
let stableCoarseViewportWidth = 0;
const coarseViewportResetThreshold = 80;

const getViewportWidth = () => {
  const visualViewportWidth = window.visualViewport?.width ?? 0;
  const innerWidth = window.innerWidth || 0;
  const clientWidth = document.documentElement.clientWidth || 0;

  return Math.max(visualViewportWidth, innerWidth, clientWidth, 1);
};

const getViewportHeight = () => {
  const visualViewportHeight = window.visualViewport?.height ?? 0;
  const innerHeight = window.innerHeight || 0;
  const clientHeight = document.documentElement.clientHeight || 0;

  return Math.max(visualViewportHeight, innerHeight, clientHeight, 1);
};

const usesDynamicBrowserChrome = () =>
  window.matchMedia("(hover: none) and (pointer: coarse)").matches;

export const getStableViewportHeight = () => {
  const viewportHeight = getViewportHeight();

  if (!usesDynamicBrowserChrome()) {
    return viewportHeight;
  }

  const viewportWidth = getViewportWidth();
  const widthShift = Math.abs(viewportWidth - stableCoarseViewportWidth);

  // iOS browser chrome can shrink the visual viewport as the address bar reappears.
  // Keep the tallest recent height for coarse-pointer devices so scroll-linked
  // progress stays stable when the user reverses direction.
  if (!stableCoarseViewportHeight || widthShift > coarseViewportResetThreshold) {
    stableCoarseViewportHeight = viewportHeight;
    stableCoarseViewportWidth = viewportWidth;
    return viewportHeight;
  }

  if (viewportHeight > stableCoarseViewportHeight) {
    stableCoarseViewportHeight = viewportHeight;
  }

  return stableCoarseViewportHeight;
};
