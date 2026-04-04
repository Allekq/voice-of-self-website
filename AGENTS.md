# Voice of Self Website Agent Guide

This repository is the public website for Closure / Voice of Self. It is the marketing, legal, and deployment surface for the product, not the main application codebase.

## Canonical Project Map

- Website repo: `/Users/alekj/Documents/GitHub/voice-of-self-website`
- Main app repo: `/Users/alekj/Documents/GitHub/closure-app`

If a task is about the actual app product, use the sibling `closure-app` repository above. Do not assume this website repo contains the full application.

## Broad Product Idea

Closure is a privacy-first iOS reflection app built with SwiftUI.

- Users speak naturally instead of writing structured notes.
- The app records and transcribes the reflection.
- AI turns that reflection into structured insight such as summaries, progress signals, open loops, and memory-like updates.
- User data is intended to stay local by default. The backend is mainly for access verification and optional AI routing, not long-term storage of raw audio or transcripts.

## How To Route Work

- Stay in this repo for landing page work, legal pages, GitHub Pages deployment, Astro config, and other static website tasks.
- Switch to `/Users/alekj/Documents/GitHub/closure-app` for iOS app behavior, onboarding, recording, transcription, AI analysis, subscriptions, backend logic, or product feature work.
- If a request could affect both repos, clarify which repo the user wants before making changes.

## Important Context

- There is a nested `voice-of-self-website` directory inside `closure-app`, but the canonical website workspace for this thread is the sibling repo at `/Users/alekj/Documents/GitHub/voice-of-self-website`.
- Another agent may be working on deployment or website implementation. Avoid unnecessary overlap and keep changes scoped.

## Website Architecture Expectations

- Keep `src/pages/index.astro` thin. It should compose the homepage, not own large blocks of page markup.
- Keep `src/layouts/SiteLayout.astro` as the shared shell for the homepage and legal pages.
- Keep homepage section order and tab ownership in `src/components/landing/orchestrator/HomePageOrchestrator.astro`.
- Put section-specific UI in `src/components/landing/sections/`.
- Put genuinely reusable landing primitives in `src/components/landing/ui/`.
- Put hero-only visuals in `src/components/landing/hero/`.
- Keep global site values in `src/config/site.ts`.
- Keep base-path-safe links and asset helpers in `src/lib/paths.ts`. Use `withBase()` for internal paths.
- Keep tokens in `src/styles/tokens.css`, shared landing styles in `src/styles/landing.css`, and app-wide/base/legal styling in `src/styles/global.css`.
- Keep repeated section content close to the owning section in colocated `*.data.ts` files. Do not create one giant homepage content registry.
- Name landing components by responsibility, not by vague buckets. If a file is desktop-only, mobile-only, or shared across layouts, say that explicitly in the filename, such as `DesktopShowcase`, `MobileShowcase`, or `SharedContent`. Avoid ambiguous names like `Copy`, `Stuff`, `Helpers`, or `Temp` unless the file is genuinely that generic.

## Code Cleanliness Rules

- Do not collapse the site back into giant HTML, CSS, or JS files.
- Do not introduce inline style clutter or repeated magic numbers when a token, config value, or local constant should own the value.
- Do not add backend, login, database, secret-dependent APIs, or fake waitlist submission flows. This repo is a public static site.
- Do not add a second competing design system. Extend the existing token layer instead.
- Reuse only what is truly reused. Avoid generic abstractions that make the page harder to read.
- If desktop and mobile interaction differ materially, split them into separate files and share the data/constants.
- Keep interactions progressively enhanced. The page should still render and navigate correctly without JavaScript.
- Keep marketing copy easy to locate. Global values belong in `site.ts`; section-specific copy belongs near the section that renders it.

## Motion And Interaction Rules

- Interactive elements should animate with shared motion tokens instead of ad hoc timing values.
- Motion should feel soft and premium, not flashy or game-like.
- Avoid snap changes where interpolation would make the experience clearer.
- Respect `prefers-reduced-motion` for animated enhancements.
- If a UI element changes state on hover, focus, open, close, or scroll, check whether it should animate as part of the shared motion language.

## Validation And Preview

- After meaningful website changes, run `npm run check` and `npm run build`.
- Use `run_site.py` for a one-click local preview, or `npm run dev` if you are working from the terminal.
- Manually sanity-check desktop, tablet, and phone layouts when changing structure, motion, spacing, or navigation.

## Legal Update Flow

- Treat privacy-policy and terms updates as one controlled cross-repo workflow, even when the public website is the user-facing source.
- If a task edits `src/pages/privacy-policy.md` or `src/pages/terms-of-service.md`, or changes data collection, retention, deletion, account handling, subscription/access, AI routing, waitlist/support handling, or other legal-facing product behavior, open `skills/legal-update-sync/CHECKLIST.md` before making edits or declaring the task done.
- Before changing legal text here, check `/Users/alekj/Documents/GitHub/closure-app/external/legal/` and its publishing docs so the website copy and the app repo's local legal representation stay aligned.
- When legal text changes, keep the mirrored document in `closure-app` updated too, bump only the affected document version and effective date in `site.config.mjs`, and keep `/Users/alekj/Documents/GitHub/closure-app/external/legal/legal-manifest.json` aligned.
- Do not edit generated `dist/legal-manifest.json` directly.
- If the task changes collected data, retention, deletion, account behavior, or other legal-facing product behavior, make sure the legal docs are updated as part of the same change.
- If a change likely affects legal disclosures but legal edits are out of scope, pause and ask the user whether the legal docs should be updated now. If the runtime supports approval-gated commands, use the reminder prompt described in `skills/legal-update-sync/CHECKLIST.md` so the user has to acknowledge the follow-up.

## Repo Skill Sources

- Repo-local skill/source guides live under `skills/`.
- Use `skills/landing-page-workflow/` for landing-page structure, motion, and modularity work.
- Use `skills/legal-update-sync/` for privacy-policy / terms coordination work.
- Use `skills/user-provided-images/` when a site change needs a new image asset and the user may want to create or provide the image directly.
