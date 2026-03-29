export interface WhyItMattersRelic {
  accent: "gold" | "coral" | "blue";
  entryX: string;
  entryY: string;
  growth: string;
  left: string;
  revealAt: number;
  rotate: string;
  title: string;
  top: string;
  width: string;
  worry: string;
}

export interface WhyItMattersBeat {
  eyebrow: string;
  title: string;
  body: string;
}

export const whyItMattersRelics: WhyItMattersRelic[] = [
  {
    accent: "coral",
    entryX: "-1.2rem",
    entryY: "0.72rem",
    growth: "I stayed in the room and let the moment stay human instead of catastrophic.",
    left: "4%",
    revealAt: 0.12,
    rotate: "-3.2deg",
    title: "Dinner Stayed Warm",
    top: "10%",
    width: "clamp(13rem, 48%, 16.25rem)",
    worry: "One awkward moment ruins the whole night.",
  },
  {
    accent: "gold",
    entryX: "1rem",
    entryY: "0.56rem",
    growth: "I carried the responsibility without turning it into proof that I was failing everyone.",
    left: "40%",
    revealAt: 0.31,
    rotate: "2.5deg",
    title: "Held My Ground",
    top: "6%",
    width: "clamp(12.75rem, 46%, 15.85rem)",
    worry: "Any delay means I disappointed someone beyond repair.",
  },
  {
    accent: "blue",
    entryX: "-0.95rem",
    entryY: "0.9rem",
    growth: "I stayed present long enough for the conversation to become connection instead of panic.",
    left: "10%",
    revealAt: 0.48,
    rotate: "-2deg",
    title: "Talked It Through",
    top: "28%",
    width: "clamp(13rem, 47%, 16rem)",
    worry: "Every hard talk means I should withdraw before it gets worse.",
  },
  {
    accent: "coral",
    entryX: "1.1rem",
    entryY: "0.82rem",
    growth: "I noticed the spiral early enough to soften before it took over the morning.",
    left: "45%",
    revealAt: 0.68,
    rotate: "3deg",
    title: "Morning Started Softer",
    top: "24%",
    width: "clamp(12.85rem, 45%, 15.65rem)",
    worry: "I need to brace now because something bad is probably coming.",
  },
  {
    accent: "gold",
    entryX: "-0.2rem",
    entryY: "1rem",
    growth: "I asked for support before collapse, which meant the fear never ran the whole day.",
    left: "21%",
    revealAt: 0.84,
    rotate: "-1.4deg",
    title: "Reached Out Earlier",
    top: "42%",
    width: "clamp(13.1rem, 49%, 16.2rem)",
    worry: "Needing help means I already failed.",
  },
];

export const whyItMattersStoryBeats: WhyItMattersBeat[] = [
  {
    eyebrow: "Stage 01",
    title: "The fear shows up first, before you fully understand the pattern.",
    body: "Voice reflections catch the repeated shape of it before it can keep masquerading as a one-off bad day.",
  },
  {
    eyebrow: "Stage 02",
    title: "Then the old fear gets stamped over by something you can now do differently.",
    body: "That is when growth stops sounding abstract and starts living right next to the exact thing that used to pull you under.",
  },
  {
    eyebrow: "Stage 03",
    title: "As new relics arrive, older ones lose priority instead of demanding the whole screen.",
    body: "You can still read them, but they no longer get to feel like the most current version of you.",
  },
  {
    eyebrow: "Stage 04",
    title: "By the time you reach now, the evidence feels accumulated instead of flattering.",
    body: "That is the difference between hoping you are changing and actually being able to see that you already have.",
  },
];

export const whyItMattersAnxietyLabels = [
  "Flooded",
  "On edge",
  "Loosening",
  "Settling",
  "Quiet",
] as const;

export const whyItMattersPreparedLabels = [
  "Bracing",
  "Catching it",
  "More ready",
  "Steady",
  "Prepared",
] as const;

export const whyItMattersSolvedGoal = whyItMattersRelics.length;
