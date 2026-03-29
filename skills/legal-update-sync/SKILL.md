---
name: legal-update-sync
description: Use when updating privacy-policy or terms content for the Voice of Self website so the public website copy stays aligned with the mirrored legal representation in the main app repository.
---

# Legal Update Sync

Use this skill when changing legal text or any product behavior that affects legal claims.

## Core workflow

1. Read `AGENTS.md` and `CLAUDE.md` first.
2. Treat website legal changes as a cross-repo update, not a website-only edit.
3. Check the mirrored legal source in `/Users/alekj/Documents/GitHub/closure-app/external/legal/`.
4. Keep the website copy and the app repo's local legal representation aligned.
5. If the change affects only one legal document, bump only the affected document version in the corresponding `legal-manifest.json`.
6. If the task changes collected data, retention, deletion, account handling, or subscription/access behavior, ensure legal text is updated as part of the same task.

## Validation

- Run `npm run check`.
- Run `npm run build`.
- Verify both `/privacy-policy/` and `/terms-of-service/` still build and route correctly.

## Quality bar

- Do not make silent legal-only edits without checking the mirrored app-repo representation.
- Do not leave the website and app legal copies out of sync.
