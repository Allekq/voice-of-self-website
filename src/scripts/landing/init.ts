import { setupActiveSectionNav } from "./active-section-nav";
import { setupDesktopHowItWorks } from "./how-it-works/desktop-stepper";
import { setupMobileHowItWorks } from "./how-it-works/mobile-stepper";
import { setupNoiseDrift } from "./motion/apply-drift";
import { setupRevealOnScroll } from "./reveal-on-scroll";
import { setupStickyHeader } from "./sticky-header";

const boot = () => {
  setupStickyHeader();
  setupActiveSectionNav();
  setupNoiseDrift();
  setupDesktopHowItWorks();
  setupMobileHowItWorks();
  setupRevealOnScroll();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}
