---
name: change-impact-map
description: Use when changing public business identity or support-contact details such as support email, phone number, mailing address, legal name, support URL, privacy-policy URL, website domain, or hosted legal-manifest URL. Read BIG.md for the exact website repo, closure-app repo, and App Store Connect touchpoints.
---

# Change Impact Map

Use this skill when a task changes any public-facing business/contact value that
can appear in the website, legal docs, iOS app support flows, or App Store
Connect.

## Required read

- `BIG.md`

## Workflow

1. Identify which value changed:
   - support/contact email
   - phone number
   - mailing address
   - legal/business name
   - support URL / privacy-policy URL / legal host URL
2. Read the matching section in `BIG.md`.
3. Update both repos where needed:
   - website repo: `/Users/alekj/Documents/GitHub/voice-of-self-website`
   - app repo: `/Users/alekj/Documents/GitHub/closure-app`
4. If legal text changes, also follow:
   - `/Users/alekj/Documents/GitHub/voice-of-self-website/skills/legal-update-sync/CHECKLIST.md`
5. Review the Apple/App Store Connect follow-through items in `BIG.md`.
6. Run the validation sweep listed in `BIG.md` before finishing.

## Core rule

Do not treat email, phone, address, legal-name, or public-URL changes as
single-file edits. The website and the app do not share one source of truth for
these values, so cross-repo and Apple-side follow-through is usually required.
