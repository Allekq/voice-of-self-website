# Voice of Self Website Claude Guide

This repository is the public static website for Voice of Self. It is not the main app codebase.

If the task is about the real iOS app, recording, AI analysis, subscriptions, onboarding, or backend behavior, stop and switch to:

- `/Users/alekj/Documents/GitHub/closure-app`

## Non-Negotiable Rules

- Do not turn this repo back into giant HTML, giant CSS, or giant JS files.
- Do not dump section markup into `src/pages/index.astro`.
- Do not hardcode repeated sizes, spacing, colors, radii, or motion values when tokens should own them.
- Do not add backend flows, auth, databases, hidden API dependencies, or fake form systems. This site is public and static.
- Do not introduce a second styling system or random one-off patterns when the current token system can be extended cleanly.
- Do not create a giant catch-all content/config file for the whole homepage.

## Required File Ownership

- `src/pages/index.astro`
  Composition only.
- `src/layouts/SiteLayout.astro`
  Shared shell only.
- `src/components/landing/orchestrator/HomePageOrchestrator.astro`
  Source of truth for homepage section/tab order.
- `src/components/landing/sections/`
  Section-owned UI.
- `src/components/landing/ui/`
  Shared reusable primitives only.
- `src/components/landing/hero/`
  Hero-only visuals.
- `src/config/site.ts`
  Global site identity, shared CTA labels, emails, metadata, links.
- `src/lib/paths.ts`
  Base-path-safe internal links via `withBase()`.
- `src/styles/tokens.css`
  Canonical design tokens.
- `src/styles/landing.css`
  Shared landing-page styles and motion.
- `src/styles/global.css`
  Base/global/legal-page styles.

## Modularity Playbook

- Before creating a new file, check whether there is already a good owner for the change.
- Before editing a large file, ask whether the change belongs in a smaller child component or colocated data file.
- Abstract only after real reuse. Do not create clever generic wrappers for one use case.
- If desktop and mobile layouts differ in a meaningful way, split them into dedicated files and share data/constants instead of branching deeply inside one tangled component.
- Keep repeated section data in colocated `*.data.ts` files next to the section that owns it.
- Keep globally editable values in `src/config/site.ts`.
- Keep motion timing and visual rhythm in tokens, not scattered literals.

## Cleanliness Standard

- Prefer small dedicated components over long mixed-responsibility files.
- Prefer clear names over smart names.
- Prefer local section ownership over central dumping grounds.
- Prefer one obvious source of truth for navigation, section order, and shared labels.
- Prefer editing an existing reusable primitive over duplicating almost-the-same markup.

If a change makes the code harder to find, harder to rename, or harder to reuse, it is not clean enough.

## Motion Standard

- Anything interactive should be checked for motion polish: hover, focus, expand/collapse, progress movement, active navigation, and section reveal.
- Motion must use the shared token timings and easing values.
- Motion should feel calm, premium, and intentional.
- Respect `prefers-reduced-motion`.
- Avoid teleporting state changes where a smooth transition would communicate the UI better.

## Static-Site Constraints

- Waitlist/contact behavior must stay email-based unless explicitly changed by the user.
- Internal links and routes must stay compatible with GitHub Pages base paths. Use `withBase()` for internal URLs when needed.
- Do not add secrets to this repo.
- Keep public email addresses easy to swap in `src/config/site.ts`.

## Legal Workflow

- If privacy-policy or terms text changes here, check `/Users/alekj/Documents/GitHub/closure-app/external/legal/` and keep the mirrored legal representation aligned.
- If data collection, deletion, retention, account, or subscription behavior changes, legal text likely needs updating in the same task.

## Validation Checklist

Run these after meaningful site changes:

- `npm run check`
- `npm run build`

For local preview:

- Run `run_site.py` for the easiest browser-based preview.

## Repo Skill Sources

If you need repeatable workflow guidance, see:

- `skills/landing-page-workflow/SKILL.md`
- `skills/legal-update-sync/SKILL.md`
