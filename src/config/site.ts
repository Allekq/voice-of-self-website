import { withBase } from "../lib/paths";

const contactEmail = "alekgameshelp2@gmail.com";
const waitlistEmail = contactEmail;
const waitlistSubject = "Voice of Self waitlist";
const waitlistDraftLines = [
  "Hi, I'm [your name].",
  "",
  "I'd like to join the Voice of Self waitlist.",
  "",
  "Anything else you'd like to share:",
  "",
];
const waitlistBody = waitlistDraftLines.join("\r\n");

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
