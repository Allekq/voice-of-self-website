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

## Legal Update Flow

- Treat privacy-policy and terms updates as one controlled cross-repo workflow, even when the public website is the user-facing source.
- Before changing legal text here, check `/Users/alekj/Documents/GitHub/closure-app/external/legal/` and its publishing docs so the website copy and the app repo's local legal representation stay aligned.
- When legal text changes, keep the mirrored document in `closure-app` updated too, and bump only the affected document version in the corresponding `legal-manifest.json`.
- If the task changes collected data, retention, deletion, account behavior, or other legal-facing product behavior, make sure the legal docs are updated as part of the same change.
