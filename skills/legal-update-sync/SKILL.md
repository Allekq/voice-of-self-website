name: legal-update-sync
description: Use when editing website legal pages or when a product or website change could affect privacy-policy or terms disclosures, so the website and mirrored app legal copy stay aligned.
---

# Legal Update Sync

Use this skill when changing legal text or any product or website behavior that
could affect privacy, retention, deletion, account, subscription, AI, waitlist,
support, or other legal-facing claims.

## Required reads

- `AGENTS.md`
- `CLAUDE.md`
- `skills/legal-update-sync/CHECKLIST.md`

`CHECKLIST.md` is the canonical workflow and reminder source for this skill.

## Core rule

Do not finish a task that likely changed legal disclosures while leaving the
legal docs stale. Follow the checklist, keep the mirrored `closure-app` copy
aligned, and use the checklist's blocking-question / reminder rule when legal
follow-up is required.
