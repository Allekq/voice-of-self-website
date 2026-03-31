import { createCoarseViewportResizeGuard } from "./shared/stable-viewport";

const getScrollPosition = () => window.scrollY + 180;

export const setupActiveSectionNav = () => {
  const roots = document.querySelectorAll<HTMLElement>("[data-nav-root]");

  roots.forEach((root) => {
    const pills = Array.from(root.querySelectorAll<HTMLElement>("[data-nav-pill]"));
    const highlight = root.querySelector<HTMLElement>("[data-nav-highlight]");

    if (!pills.length || !highlight) {
      return;
    }

    let activePill: HTMLElement | null = null;
    let frameId = 0;
    let shouldForceSync = false;
    const ignoreResize = createCoarseViewportResizeGuard();

    const setActive = (pill: HTMLElement | undefined, force = false) => {
      if (!pill) {
        return;
      }

      if (!force && activePill === pill) {
        return;
      }

      activePill = pill;
      pills.forEach((item) => item.classList.toggle("is-active", item === pill));

      highlight.style.width = `${pill.offsetWidth}px`;
      highlight.style.transform = `translateX(${pill.offsetLeft}px)`;
    };

    const syncFromScroll = (force = false) => {
      const scrollY = getScrollPosition();
      let active = pills[0];

      pills.forEach((pill) => {
        const sectionId = pill.dataset.sectionId;
        const section = sectionId ? document.getElementById(sectionId) : null;

        if (section && section.offsetTop <= scrollY) {
          active = pill;
        }
      });

      setActive(active, force);
      frameId = 0;
      shouldForceSync = false;
    };

    const requestSync = (force = false) => {
      shouldForceSync ||= force;

      if (frameId !== 0) {
        return;
      }

      frameId = window.requestAnimationFrame(() => syncFromScroll(shouldForceSync));
    };

    pills.forEach((pill) => {
      pill.addEventListener("click", () => setActive(pill));
    });

    syncFromScroll(true);
    window.addEventListener("resize", () => {
      if (ignoreResize()) {
        return;
      }

      requestSync(true);
    });
    window.addEventListener("scroll", () => requestSync(), { passive: true });
  });
};
