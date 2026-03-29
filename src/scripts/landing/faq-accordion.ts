interface FaqState {
  details: HTMLDetailsElement;
  summary: HTMLElement;
  content: HTMLElement;
  animation: Animation | null;
}

const FAQ_TIMING = {
  duration: 340,
  easing: "cubic-bezier(0.22, 1, 0.36, 1)",
};

const setOpenStyles = (content: HTMLElement) => {
  content.style.height = "auto";
  content.style.opacity = "1";
  content.style.transform = "translateY(0) scaleY(1)";
};

const setClosedStyles = (content: HTMLElement) => {
  content.style.height = "0px";
  content.style.opacity = "0";
  content.style.transform = "translateY(-0.35rem) scaleY(0.985)";
};

const cancelAnimation = (state: FaqState) => {
  state.animation?.cancel();
  state.animation = null;
};

const animateOpen = (state: FaqState) => {
  const { details, content } = state;

  cancelAnimation(state);
  details.open = true;

  const startHeight = content.getBoundingClientRect().height;
  const endHeight = content.scrollHeight;

  state.animation = content.animate(
    [
      {
        height: `${startHeight}px`,
        opacity: Number.parseFloat(getComputedStyle(content).opacity || "0").toString(),
        transform: getComputedStyle(content).transform === "none"
          ? "translateY(-0.35rem) scaleY(0.985)"
          : getComputedStyle(content).transform,
      },
      {
        height: `${endHeight}px`,
        opacity: "1",
        transform: "translateY(0) scaleY(1)",
      },
    ],
    FAQ_TIMING,
  );

  content.style.height = `${endHeight}px`;
  content.style.opacity = "1";
  content.style.transform = "translateY(0) scaleY(1)";

  state.animation.onfinish = () => {
    setOpenStyles(content);
    state.animation = null;
  };
};

const animateClose = (state: FaqState) => {
  const { details, content } = state;

  cancelAnimation(state);

  const startHeight = content.getBoundingClientRect().height || content.scrollHeight;

  state.animation = content.animate(
    [
      {
        height: `${startHeight}px`,
        opacity: Number.parseFloat(getComputedStyle(content).opacity || "1").toString(),
        transform: getComputedStyle(content).transform === "none"
          ? "translateY(0) scaleY(1)"
          : getComputedStyle(content).transform,
      },
      {
        height: "0px",
        opacity: "0",
        transform: "translateY(-0.35rem) scaleY(0.985)",
      },
    ],
    FAQ_TIMING,
  );

  setClosedStyles(content);

  state.animation.onfinish = () => {
    details.open = false;
    state.animation = null;
  };
};

export const setupFaqAccordion = () => {
  if (!("animate" in HTMLElement.prototype)) {
    return;
  }

  const states: FaqState[] = Array.from(
    document.querySelectorAll<HTMLDetailsElement>("[data-faq-item]"),
  ).flatMap((details) => {
      const summary = details.querySelector<HTMLElement>("[data-faq-trigger]");
      const content = details.querySelector<HTMLElement>("[data-faq-content]");

      if (!summary || !content) {
        return [];
      }

      return [
        {
          details,
          summary,
          content,
          animation: null,
        },
      ];
    });

  if (!states.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  states.forEach((state) => {
    state.details.classList.add("is-enhanced");

    if (state.details.open) {
      setOpenStyles(state.content);
    } else {
      setClosedStyles(state.content);
    }

    state.summary.addEventListener("click", (event) => {
      event.preventDefault();

      if (state.details.open) {
        animateClose(state);
        return;
      }

      animateOpen(state);
    });
  });
};
