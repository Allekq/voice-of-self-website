const MOBILE_USER_AGENT_PATTERN =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

const shouldPreferEmailApp = () =>
  window.matchMedia("(pointer: coarse)").matches || MOBILE_USER_AGENT_PATTERN.test(navigator.userAgent);

export const setupWaitlistCtas = () => {
  const buttons = document.querySelectorAll<HTMLAnchorElement>('[data-waitlist-cta="auto"]');

  if (!buttons.length) {
    return;
  }

  const preferEmailApp = shouldPreferEmailApp();

  buttons.forEach((button) => {
    const mobileHref = button.dataset.waitlistMobileHref;
    const desktopHref = button.dataset.waitlistDesktopHref;

    if (!mobileHref || !desktopHref) {
      return;
    }

    button.href = preferEmailApp ? mobileHref : desktopHref;
    button.dataset.waitlistMode = preferEmailApp ? "email-app" : "gmail-browser";
  });
};
