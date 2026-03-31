import { withBase } from "../../../../lib/paths";
import type { StepItem } from "../../types";

export const steps: StepItem[] = [
  {
    title: "Speak",
    description:
      "Record short voice reflections instead of writing. Just talk for a minute and let the app handle the rest.",
    imageSrc: withBase("/images/how-it-works/speak-voice-reflection.png"),
    imageAlt:
      "A softly lit person speaking into flowing ribbons of gold, blue, and coral light.",
    imageTone: "gold",
  },
  {
    title: "Notice patterns",
    description:
      "The app detects recurring worries and themes over time, showing you what your mind keeps returning to.",
    imageSrc: withBase("/images/how-it-works/notice-recurring-patterns.png"),
    imageAlt:
      "A figure surrounded by repeating rings of light that gather into a readable pattern.",
    imageTone: "blue",
  },
  {
    title: "See what changed",
    description:
      "When a worry fades or stops returning, the app surfaces it as a resolved worry, proof that you've moved forward.",
    imageSrc: withBase("/images/how-it-works/see-what-changed.png"),
    imageAlt:
      "A calm figure holding glowing relic-like shapes rising upward as markers of change.",
    imageTone: "coral",
  },
];
