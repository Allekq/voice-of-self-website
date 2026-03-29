import { withBase } from "../lib/paths";

const contactEmail = "alekgameshelp2@gmail.com";
const waitlistEmail = "waitlist@voiceofself.app";
const waitlistSubject = "Voice of Self waitlist";
const waitlistDraftLines = [
  "Hi Voice of Self team,",
  "",
  "I'm [your name], and I'd like to join the Voice of Self waitlist.",
  "",
  "What I'd love to use it for:",
  "[optional note]",
  "",
  "Anything else you'd like to share:",
  "[optional note]",
  "",
  "Thanks,",
  "[your name]",
];
const waitlistBody = waitlistDraftLines.join("\r\n");
const waitlistShareTips = [
  "Your name, or the name you'd like us to use.",
  "Why you're interested in Voice of Self or what you hope to use it for.",
  "Anything you'd especially like to test, plus your device or region if that's helpful.",
];

const buildMailtoHref = (email: string, subject: string, body: string) => {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

const buildGmailComposeHref = (email: string, subject: string, body: string) =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export const siteConfig = {
  name: "Voice of Self",
  legalName: "Voice Of Self",
  homeTitle: "Voice of Self",
  defaultDescription:
    "Voice of Self is a voice-first reflection app that helps you notice personal growth you would otherwise miss.",
  tagline: "See which worries used to control you — but no longer do.",
  contactEmail,
  waitlistEmail,
  homeHref: withBase("/"),
  waitlistGuideHref: withBase("/how-to-join-wish-list/"),
  waitlistMailtoHref: buildMailtoHref(waitlistEmail, waitlistSubject, waitlistBody),
  waitlistGmailHref: buildGmailComposeHref(waitlistEmail, waitlistSubject, waitlistBody),
  waitlistDraft: {
    subject: waitlistSubject,
    body: waitlistBody,
    lines: waitlistDraftLines,
    shareTips: waitlistShareTips,
  },
  ctas: {
    primary: "Join the waitlist",
    whyItMatters: "Why it matters",
    secondary: "See how it works",
    legalPrimary: "Privacy Policy",
    legalSecondary: "Terms of Service",
  },
  legalLinks: [
    { label: "Privacy Policy", href: withBase("/privacy-policy/") },
    { label: "Terms of Service", href: withBase("/terms-of-service/") },
  ],
  footerText: `© ${new Date().getFullYear()} Voice of Self. All rights reserved.`,
  socialProofLabel: "Voice-first reflection",
};

export type SiteConfig = typeof siteConfig;
