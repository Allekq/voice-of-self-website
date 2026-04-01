export const setupRevealOnScroll = () => {
  const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

  if (!items.length) {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const isPhoneViewport = window.matchMedia("(max-width: 47.99rem)").matches;

  const createRevealObserver = (options: IntersectionObserverInit) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, options);

    return observer;
  };

  const defaultObserver = createRevealObserver(
    isPhoneViewport
      ? {
          threshold: 0.03,
          rootMargin: "0px 0px -6% 0px",
        }
      : {
          threshold: 0.18,
          rootMargin: "0px 0px -40px 0px",
        },
  );
  const earlyObserver = createRevealObserver(
    isPhoneViewport
      ? {
          threshold: 0,
          rootMargin: "0px 0px -2% 0px",
        }
      : {
          threshold: 0.08,
          rootMargin: "0px 0px 48px 0px",
        },
  );

  items.forEach((item) => {
    const observer = item.hasAttribute("data-reveal-early") ? earlyObserver : defaultObserver;
    observer.observe(item);
  });
};
