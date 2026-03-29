# Voice of Self Website

Public marketing and legal site for:

- landing page
- privacy policy
- terms of service
- `legal-manifest.json`

## Branches

- `main`: published branch
- `dev`: working branch

## Local commands

```bash
npm install
npm run dev
npm run build
```

## Domain config

The production origin is centralized in:

- `site.config.mjs`
- `ios_app/Core/Legal/TermsConfig.swift` in the sibling `closure-app` repo

The expected production URL is:

- `https://voiceofself.life/`
