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
}

export interface WhyItMattersBeat {
  eyebrow: string;
  title: string;
  body: string;
}

export const whyItMattersRelics: WhyItMattersRelic[] = [
  {
    accent: "coral",
    entryX: "-1rem",
    entryY: "0.56rem",
    growth: "It went better than I expected, and I can trust myself more under pressure now.",
    left: "4%",
    revealAt: 0.12,
    rotate: "-2.8deg",
    title: "Exam Felt Lighter",
    top: "4%",
    width: "clamp(13.9rem, 50%, 17.2rem)",
  },
  {
    accent: "gold",
    entryX: "0.9rem",
    entryY: "0.48rem",
    growth: "I did my first pull-up, and effort finally turned into something I can point to.",
    left: "42%",
    revealAt: 0.33,
    rotate: "2.3deg",
    title: "First Pull-Up",
    top: "0%",
    width: "clamp(13.75rem, 49%, 17rem)",
  },
  {
    accent: "blue",
    entryX: "-0.88rem",
    entryY: "0.74rem",
    growth: "I left the house, moved my body, and the work still held together when I came back.",
    left: "9%",
    revealAt: 0.52,
    rotate: "-1.8deg",
    title: "Work-Life Balance",
    top: "15%",
    width: "clamp(14rem, 51%, 17.35rem)",
  },
  {
    accent: "coral",
    entryX: "1rem",
    entryY: "0.76rem",
    growth: "I caught the spiral sooner and the whole day never tipped into panic.",
    left: "46%",
    revealAt: 0.7,
    rotate: "2.8deg",
    title: "Morning Started Softer",
    top: "9%",
    width: "clamp(13.65rem, 48%, 16.8rem)",
  },
  {
    accent: "gold",
    entryX: "-0.18rem",
    entryY: "0.9rem",
    growth: "I said what I actually needed, and the conversation got clearer instead of colder.",
    left: "23%",
    revealAt: 0.84,
    rotate: "-1.2deg",
    title: "Said What I Needed",
    top: "18%",
    width: "clamp(13.8rem, 50%, 17.05rem)",
  },
];

export const whyItMattersStoryBeats: WhyItMattersBeat[] = [
  {
    eyebrow: "Relic logic",
    title: "A relic appears when something actually changed.",
    body: "It is proof you can point to.",
  },
  {
    eyebrow: "Worry first",
    title: "A relic shows something that used to come up.",
    body: "And that it no longer does.",
  },
  {
    eyebrow: "Proof of change",
    title: "The relic shows what actually changed.",
    body: "Not just how you felt, but what happened.",
  },
  {
    eyebrow: "Durable record",
    title: "Over time, you see more of these.",
    body: "They show how things changed.",
  },
];

export const whyItMattersAnxietyLabels = [
  "Flooded and\nreactive",
  "Still on\nguard",
  "Starting to\nease",
  "Settling\nfaster",
  "Mostly\ncalm",
] as const;

export const whyItMattersPreparedLabels = [
  "Going in\nbraced",
  "Catching it\nsooner",
  "Knowing\nwhat helps",
  "Feeling\nsteadier",
  "Ready when\nneeded",
] as const;

export const whyItMattersSolvedGoal = whyItMattersRelics.length;
