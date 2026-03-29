import { setupActiveSectionNav } from "./active-section-nav";
import { setupFaqAccordion } from "./faq-accordion";
import { setupDesktopHowItWorks } from "./how-it-works/desktop-stepper";
import { setupMobileHowItWorks } from "./how-it-works/mobile-stepper";
import { setupNoiseDrift } from "./motion/apply-drift";
import { setupRevealOnScroll } from "./reveal-on-scroll";
import { setupStickyHeader } from "./sticky-header";

const safeSetup = (label: string, setup: () => void) => {
  try {
    setup();
  } catch (error) {
    console.error(`[landing] ${label} failed`, error);
  }
};

const boot = () => {
  safeSetup("reveal-on-scroll", setupRevealOnScroll);
  safeSetup("sticky-header", setupStickyHeader);
  safeSetup("active-section-nav", setupActiveSectionNav);
  safeSetup("faq-accordion", setupFaqAccordion);
  safeSetup("noise-drift", setupNoiseDrift);
  safeSetup("desktop-stepper", setupDesktopHowItWorks);
  safeSetup("mobile-stepper", setupMobileHowItWorks);
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}
