---
name: landing-page-workflow
description: Use when changing the Voice of Self landing page, section structure, responsive layouts, design-token-driven styling, or interaction polish in this static Astro website repo.
---

# Landing Page Workflow

Use this skill when working on homepage sections, shared landing UI, responsive splits, or motion polish.

## Core workflow

1. Read `AGENTS.md` and `CLAUDE.md` first.
2. Keep `src/pages/index.astro` thin and preserve `src/components/landing/orchestrator/HomePageOrchestrator.astro` as the source of truth for section order.
3. Put section-owned markup in `src/components/landing/sections/`.
4. Put true shared primitives in `src/components/landing/ui/`.
5. Keep global values in `src/config/site.ts`.
6. Use `src/styles/tokens.css` for repeated spacing, sizes, colors, radii, shadows, and motion.
7. Use `src/styles/landing.css` for shared landing behavior and styles; avoid scattered inline literals.
8. If desktop and mobile diverge materially, split them into separate files and share the data/constants.
9. Keep repeated section data near the owning section in colocated `*.data.ts` files.
10. Preserve static-site constraints: no backend, no auth, no secret-dependent waitlist flow.

## Validation

- Run `npm run check`.
- Run `npm run build`.
- Preview with `run_site.py` or `npm run dev`.

## Quality bar

- No giant mixed-responsibility files.
- No duplicated near-identical sections when a small reusable primitive would help.
- No generic abstraction for a single use case.
- Interactions should use the shared motion language and respect reduced motion.
