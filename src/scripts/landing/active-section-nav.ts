const getScrollPosition = () => window.scrollY + 180;

export const setupActiveSectionNav = () => {
  const roots = document.querySelectorAll<HTMLElement>("[data-nav-root]");

  roots.forEach((root) => {
    const pills = Array.from(root.querySelectorAll<HTMLElement>("[data-nav-pill]"));
    const highlight = root.querySelector<HTMLElement>("[data-nav-highlight]");

    if (!pills.length || !highlight) {
      return;
    }

    const setActive = (pill: HTMLElement | undefined) => {
      if (!pill) {
        return;
      }

      pills.forEach((item) => item.classList.toggle("is-active", item === pill));

      highlight.style.width = `${pill.offsetWidth}px`;
      highlight.style.transform = `translateX(${pill.offsetLeft}px)`;
    };

    const syncFromScroll = () => {
      const scrollY = getScrollPosition();
      let active = pills[0];

      pills.forEach((pill) => {
        const sectionId = pill.dataset.sectionId;
        const section = sectionId ? document.getElementById(sectionId) : null;

        if (section && section.offsetTop <= scrollY) {
          active = pill;
        }
      });

      setActive(active);
    };

    pills.forEach((pill) => {
      pill.addEventListener("click", () => setActive(pill));
    });

    syncFromScroll();
    window.addEventListener("resize", syncFromScroll);
    window.addEventListener("scroll", syncFromScroll, { passive: true });
  });
};
