import { withBase } from "../lib/paths";
import {
  legalDocuments,
  siteDomain,
  siteOrigin,
} from "../../site.config.mjs";

const contactEmail = "alekgameshelp2@gmail.com";
const waitlistEmail = contactEmail;
const supportEmail = contactEmail;
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
const supportSubject = "Voice of Self support";
const supportDraftLines = [
  "Hi, I'm [your name].",
  "",
  "I need help with Voice of Self.",
  "",
  "What happened:",
  "[brief description]",
  "",
  "What I expected instead:",
  "[brief description]",
  "",
  "Device and iOS version (optional):",
  "[example: iPhone 15 Pro, iOS 18.4]",
  "",
];
const supportBody = supportDraftLines.join("\r\n");
const waitlistFormHref = "https://tally.so/r/VLYx7g";
const waitlistFormConfigured = !waitlistFormHref.includes("REPLACE_WITH_YOUR_TALLY_FORM_ID");

const buildMailtoHref = (email: string, subject: string, body: string) => {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

const buildGmailComposeHref = (email: string, subject: string, body: string) =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

const buildAbsoluteSiteHref = (path: string) => new URL(path, siteOrigin).toString();
const appleStandardEulaHref =
  "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/";

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
  legalName: "Aleksander Jałtuszyk",
  homeTitle: "Voice of Self",
  defaultDescription:
    "Voice of Self is a voice-first reflection app that helps you notice personal growth you would otherwise miss.",
  tagline: "See which worries used to control you — but no longer do.",
  origin: siteOrigin,
  domain: siteDomain,
  contactEmail,
  waitlistEmail,
  supportEmail,
  homeHref: withBase("/"),
  waitlistGuideHref: withBase("/how-to-join-wish-list/"),
  supportHref: withBase("/support/"),
  legalManifestHref: buildAbsoluteSiteHref("/legal-manifest.json"),
  waitlistFormHref,
  waitlistFormConfigured,
  waitlistMailtoHref: buildMailtoHref(waitlistEmail, waitlistSubject, waitlistBody),
  waitlistGmailHref: buildGmailComposeHref(waitlistEmail, waitlistSubject, waitlistBody),
  supportMailtoHref: buildMailtoHref(supportEmail, supportSubject, supportBody),
  supportGmailHref: buildGmailComposeHref(supportEmail, supportSubject, supportBody),
  waitlistDraft: {
    subject: waitlistSubject,
    body: waitlistBody,
    lines: waitlistDraftLines,
  },
  supportDraft: {
    subject: supportSubject,
    body: supportBody,
    lines: supportDraftLines,
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
    { label: "App Store Terms of Use", href: appleStandardEulaHref, external: true },
  ],
  footerText: `© ${new Date().getFullYear()} Aleksander Jałtuszyk. All rights reserved.`,
  socialProofLabel: "Voice-first reflection",
};

export type SiteConfig = typeof siteConfig;
