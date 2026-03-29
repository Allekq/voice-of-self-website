export const setupStickyHeader = () => {
  const header = document.querySelector<HTMLElement>("[data-landing-header]");

  if (!header) {
    return;
  }

  const sync = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 20);
  };

  sync();
  window.addEventListener("scroll", sync, { passive: true });
};
