interface FaqState {
  details: HTMLDetailsElement;
  summary: HTMLElement;
  content: HTMLElement;
  transitionEndHandler: ((event: TransitionEvent) => void) | null;
}

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

const clearTransitionHandler = (state: FaqState) => {
  if (!state.transitionEndHandler) {
    return;
  }

  state.content.removeEventListener("transitionend", state.transitionEndHandler);
  state.transitionEndHandler = null;
};

const animateOpen = (state: FaqState) => {
  const { details, content } = state;

  clearTransitionHandler(state);
  details.open = true;

  const endHeight = content.scrollHeight;

  setClosedStyles(content);
  void content.offsetHeight;

  state.transitionEndHandler = (event: TransitionEvent) => {
    if (event.target !== content || event.propertyName !== "height") {
      return;
    }

    clearTransitionHandler(state);
    setOpenStyles(content);
  };

  content.addEventListener("transitionend", state.transitionEndHandler);

  requestAnimationFrame(() => {
    content.style.height = `${endHeight}px`;
    content.style.opacity = "1";
    content.style.transform = "translateY(0) scaleY(1)";
  });
};

const animateClose = (state: FaqState) => {
  const { details, content } = state;

  clearTransitionHandler(state);

  const startHeight = content.getBoundingClientRect().height || content.scrollHeight;

  content.style.height = `${startHeight}px`;
  content.style.opacity = "1";
  content.style.transform = "translateY(0) scaleY(1)";
  void content.offsetHeight;

  state.transitionEndHandler = (event: TransitionEvent) => {
    if (event.target !== content || event.propertyName !== "height") {
      return;
    }

    clearTransitionHandler(state);
    details.open = false;
    setClosedStyles(content);
  };

  content.addEventListener("transitionend", state.transitionEndHandler);

  requestAnimationFrame(() => {
    setClosedStyles(content);
  });
};

export const setupFaqAccordion = () => {
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
        transitionEndHandler: null,
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
