import { withBase } from "../lib/paths";
import {
  legalDocuments,
  siteDomain,
  siteOrigin,
} from "../../site.config.mjs";

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

const buildAbsoluteSiteHref = (path: string) => new URL(path, siteOrigin).toString();

export const legalManifest = {
  privacy: {
    version: legalDocuments.privacy.version,
    effectiveDate: legalDocuments.privacy.effectiveDate,
    url: buildAbsoluteSiteHref(legalDocuments.privacy.path),
  },
  terms: {
    version: legalDocuments.terms.version,
    effectiveDate: legalDocuments.terms.effectiveDate,
    url: buildAbsoluteSiteHref(legalDocuments.terms.path),
  },
} as const;

export const siteConfig = {
  name: "Voice of Self",
  legalName: "Voice Of Self",
  homeTitle: "Voice of Self",
  defaultDescription:
    "Voice of Self is a voice-first reflection app that helps you notice personal growth you would otherwise miss.",
  tagline: "See which worries used to control you — but no longer do.",
  origin: siteOrigin,
  domain: siteDomain,
  contactEmail,
  waitlistEmail,
  homeHref: withBase("/"),
  waitlistGuideHref: withBase("/how-to-join-wish-list/"),
  legalManifestHref: buildAbsoluteSiteHref("/legal-manifest.json"),
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
    { label: "Privacy Policy", href: withBase(legalDocuments.privacy.path) },
    { label: "Terms of Service", href: withBase(legalDocuments.terms.path) },
  ],
  footerText: `© ${new Date().getFullYear()} Voice of Self. All rights reserved.`,
  socialProofLabel: "Voice-first reflection",
};

export type SiteConfig = typeof siteConfig;
