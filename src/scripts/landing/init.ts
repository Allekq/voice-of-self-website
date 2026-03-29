import { setupActiveSectionNav } from "./active-section-nav";
import { setupFaqAccordion } from "./faq-accordion";
import { setupDesktopHowItWorks } from "./how-it-works/desktop-stepper";
import { setupMobileHowItWorks } from "./how-it-works/mobile-stepper";
import { setupNoiseDrift } from "./motion/apply-drift";
import { setupHeroParallax } from "./motion/hero-parallax";
import { setupSurfaceDepth } from "./motion/surface-depth";
import { setupRevealOnScroll } from "./reveal-on-scroll";
import { setupStickyHeader } from "./sticky-header";
import { setupWaitlistCtas } from "./waitlist-cta";
import { setupWhyItMattersStage } from "./why-it-matters/stage-progress";

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
  safeSetup("hero-parallax", setupHeroParallax);
  safeSetup("surface-depth", setupSurfaceDepth);
  safeSetup("desktop-stepper", setupDesktopHowItWorks);
  safeSetup("mobile-stepper", setupMobileHowItWorks);
  safeSetup("why-it-matters-stage", setupWhyItMattersStage);
  safeSetup("waitlist-cta", setupWaitlistCtas);
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}
