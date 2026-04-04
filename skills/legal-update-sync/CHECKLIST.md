# Legal Update Checklist

Use this checklist whenever a task:

- edits `src/pages/privacy-policy.md` or `src/pages/terms-of-service.md`
- changes what data leaves the device
- changes what data is stored locally or remotely
- changes retention, deletion, or export / import behavior
- changes account, sign-in, subscription, AI-routing, waitlist, support, or
  legal-notice behavior
- changes any user-facing claim about privacy, safety, moderation, billing, or
  compliance

## Source of truth

- Website legal pages:
  - `src/pages/privacy-policy.md`
  - `src/pages/terms-of-service.md`
- Website legal manifest metadata:
  - `site.config.mjs`
- Mirrored app-repo legal copy:
  - `/Users/alekj/Documents/GitHub/closure-app/external/legal/privacy-policy.md`
  - `/Users/alekj/Documents/GitHub/closure-app/external/legal/terms-of-service.md`
  - `/Users/alekj/Documents/GitHub/closure-app/external/legal/legal-manifest.json`

Do not edit generated `dist/legal-manifest.json` directly. Update `site.config.mjs`
instead, then rebuild.

## Required workflow

1. Read `AGENTS.md` and `CLAUDE.md`.
2. Inspect the current website legal page and the mirrored `closure-app`
   version before editing.
3. Decide whether the change affects:
   - privacy only
   - terms only
   - both privacy and terms
4. Update the website legal page(s).
5. Keep the mirrored `closure-app/external/legal/` document(s) aligned.
6. Bump only the affected document's `version` and `effectiveDate`:
   - website source: `site.config.mjs`
   - app mirror: `/Users/alekj/Documents/GitHub/closure-app/external/legal/legal-manifest.json`
7. Leave the unaffected legal document version untouched.

## Blocking reminder rule

Do not silently finish a task that likely changes legal disclosures while
leaving the legal docs stale.

If the user did not explicitly ask for legal edits but the task changes data
collection, retention, deletion, account handling, subscription behavior, AI
processing, website waitlist/support handling, or other legal-facing behavior:

1. Ask a direct blocking question before finishing:
   `This change likely affects privacy or terms disclosures. Do you want me to update the legal docs now?`
2. In runtimes that support approval-gated shell or GUI commands, prefer
   requesting approval for a harmless reminder prompt so the user must
   acknowledge it. Example:
   `osascript -e 'display alert "Legal review needed" message "This task likely changed privacy, terms, retention, or account behavior. Confirm whether the legal docs should be updated now." as critical'`

## Validation

- Run `npm run check`
- Run `npm run build`
- Verify both `/privacy-policy/` and `/terms-of-service/` build and route
  correctly

## Publishing follow-up

After merged legal changes, the public website and app mirror still need the
normal publishing step:

- website repo build/deploy
- publish or copy the mirrored `closure-app/external/legal/` files to the
  hosted legal site as documented in
  `/Users/alekj/Documents/GitHub/closure-app/external/legal/PUBLISHING.md`
