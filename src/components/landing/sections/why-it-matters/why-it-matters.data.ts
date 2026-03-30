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
    entryX: "-1rem",
    entryY: "0.56rem",
    growth: "It went better than I expected, and I can trust myself more under pressure now.",
    left: "4%",
    revealAt: 0.12,
    rotate: "-2.8deg",
    title: "Exam Felt Lighter",
    top: "4%",
    width: "clamp(13.9rem, 50%, 17.2rem)",
    worry: "I was sure I would freeze and prove I was not ready.",
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
    worry: "I kept treating strength like proof that I was behind.",
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
    worry: "If I stop working for a moment, everything will fall behind.",
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
    worry: "I wake up braced because something bad is probably about to happen.",
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
    worry: "If I say what I need, I will make the conversation worse and regret it all night.",
  },
];

export const whyItMattersStoryBeats: WhyItMattersBeat[] = [
  {
    eyebrow: "Relic logic",
    title: "A relic is awarded when your reflection shows something actually improved or was followed through on.",
    body: "It is not a compliment. It is the app's durable record that a meaningful shift happened in real life.",
  },
  {
    eyebrow: "Worry first",
    title: "The old worry appears first so you can see exactly what the growth is answering.",
    body: "That keeps the breakthrough grounded in context instead of floating around like generic motivation.",
  },
  {
    eyebrow: "Proof of change",
    title: "Then the relic stamps in the step that really happened: passed exam, first pull-up, work-life balance.",
    body: "The point is visible follow-through, not just describing how you wish you felt.",
  },
  {
    eyebrow: "Durable record",
    title: "Over time the relics become a readable archive of meaningful growth you would have missed otherwise.",
    body: "That is what makes quiet progress believable: you can see where you were, what shifted, and what stayed true after the moment passed.",
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
