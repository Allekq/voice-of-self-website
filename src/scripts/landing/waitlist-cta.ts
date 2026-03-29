const MOBILE_USER_AGENT_PATTERN =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

const shouldOpenDirectDraft = () =>
  window.matchMedia("(pointer: coarse)").matches || MOBILE_USER_AGENT_PATTERN.test(navigator.userAgent);

export const setupWaitlistCtas = () => {
  const buttons = document.querySelectorAll<HTMLAnchorElement>('[data-waitlist-cta="auto"]');

  if (!buttons.length) {
    return;
  }

  const directDraft = shouldOpenDirectDraft();

  buttons.forEach((button) => {
    const directHref = button.dataset.waitlistDirectHref;
    const fallbackHref = button.dataset.waitlistFallbackHref;

    if (!directHref || !fallbackHref) {
      return;
    }

    button.href = directDraft ? directHref : fallbackHref;
    button.dataset.waitlistMode = directDraft ? "direct" : "fallback";
  });
};
