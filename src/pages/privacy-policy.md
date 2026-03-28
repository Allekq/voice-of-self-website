---
layout: ../layouts/SiteLayout.astro
title: Privacy Policy | Voice of Self
description: Voice of Self privacy policy.
---

# Voice Of Self Privacy Policy

Effective Date: 2026-03-28  
Version: 1.1.1

Voice Of Self (also referred to in some parts of the product as "Closure") is
provided by Aleksander Jałtuszyk ("Developer", "we", "us", or "our").

Contact: alekgameshelp2@gmail.com

## 1. What this app is

Voice Of Self is a local-first voice journal and AI-assisted reflection app.
Most journal content stays on your device. Some features send data off-device
when you choose account, subscription, transcription, or AI-connected flows.

## 2. Data we process

### 2.1 Data stored on your device

The app can store the following locally on your device:

- Audio recordings
- Transcripts
- AI-generated reflections, summaries, notes, relics, and related metadata
- App settings and preferences
- Custom provider API keys you choose to store locally in the iOS Keychain
- Local export files you create

### 2.2 Account and sign-in data

If you create or use an account, we process:

- Your email address
- Your Firebase Authentication user ID
- Sign-in method data from email/password, Google Sign-In, or Sign in with Apple
- Limited profile data returned by the sign-in provider, such as your email

### 2.3 Subscription and backend usage data

If you use account mode or paid plans, we may process:

- Subscription and entitlement status managed through RevenueCat and Apple
- Customer and event records synced by the RevenueCat Firebase extension
- Numeric usage and accounting records tied to your account, such as token
  counts, total calls, and derived processing cost
- Manual entitlement overrides or extra usage grants if we apply them to your
  account

We do not store your transcript text or AI response content in those backend
usage/accounting records.

## 3. When data leaves your device

### 3.1 Account authentication

When you sign in, create an account, reset your password, or verify your
session, account data is sent to Firebase Authentication and the selected sign-
in provider.

### 3.2 Managed AI analysis

If you use account mode, transcript text needed for a managed AI request is sent
through our Firebase backend to the configured AI provider so the request can be
processed. Our backend is designed not to store transcript text or AI response
content for these requests as account records.

### 3.3 Live questions

If live questions are enabled, the app may automatically send a transcript
window or mid-recording transcript excerpt for question generation while a
recording session is still in progress. This can happen before you finish the
full recording because the feature is designed to respond in real time.

### 3.4 Custom AI providers

If you use your own API key and select a custom provider, transcript text is
sent directly from your device to that provider. We do not control how that
provider processes or retains your data.

### 3.5 Transcription

The app prefers on-device transcription when available. Depending on the iOS
capability and transcription path in use, audio may be processed by Apple
services.

### 3.6 Subscription, attestation, and access control

The app also sends limited data off-device for:

- RevenueCat subscription syncing
- Apple App Store billing flows
- Firebase App Check, App Attest, and DeviceCheck verification
- Backend authorization and access-control checks

### 3.7 Exports and imports

The current `.vos` export and import flow is local. We do not upload those
files to our servers. If you store or share an export through another app or
cloud service, that destination handles the file under its own policies.

## 4. How we use data

We use data to:

- Authenticate users and secure accounts
- Provide managed AI access and enforce account usage limits
- Sync subscription access and entitlement state
- Operate live questions and related AI-assisted features
- Provide support, safety, moderation, fraud/security, billing, account, and
  legal/policy communications to the registered email address

We do not sell personal data and we do not use your registered email address
for giveaway or other promotional marketing without a separate consent flow.

## 5. Third-party services

The app relies on third parties including:

- Firebase / Google for authentication, callable backend functions, and App Check
- RevenueCat for subscription state and purchase syncing
- Apple for Sign in with Apple, App Store billing, DeviceCheck / App Attest,
  and speech services that may be involved in transcription
- AI providers you select or the app uses for managed account-mode analysis

Their handling of data is governed by their own terms and privacy policies.

## 6. Security

We use commercially reasonable measures including:

- iOS file protection for local settings and app-managed files
- Local encrypted storage patterns used by the app database
- TLS for network transport
- Keychain storage for locally stored custom provider API keys
- Firebase App Check protections on backend callable traffic

No system can guarantee absolute security.

## 7. Retention

### 7.1 Local data

Your local journal data remains on your device until you delete it, remove the
app, or otherwise clear it yourself.

### 7.2 Recordings

Recordings may be retained locally for playback, transcript repair, or manual
re-transcription.

- If `Keep Recordings` is enabled, recordings may remain until you delete them.
- If `Keep Recordings` is disabled, recordings are intended to be cleaned up
  after they are no longer needed, generally around 24 hours later.

### 7.3 Backend data

Backend-linked account records may remain until you delete your account or we
remove them for support, moderation, or legal reasons.

## 8. In-app account deletion

The app includes an in-app delete-account flow. When completed, it is intended
to remove:

- Your Firebase Authentication account
- Your RevenueCat customer record associated with your app user ID
- Backend-linked account records such as `customers/{uid}`
- RevenueCat extension event records associated with your user
- Manual entitlement overrides
- Extra usage grants
- Usage records and usage-event records tied to your account
- User-owned Cloud Storage objects stored under the app's user prefix

Deleting your account does not remove journals, transcripts, or recordings that
already exist only on your device. Deleting your account also does not
automatically cancel an App Store subscription.

## 9. Your rights

Depending on where you live, you may have rights to access, correct, delete, or
object to certain personal-data processing. Since most journal content is stored
locally on your device, you already control much of that data directly. For
backend-linked account data requests, contact us at the email above.

## 10. Children

The app is not intended for children under 16, and we do not knowingly seek to
collect personal data from children under 16.

## 11. International transfers

Backend services may process data outside your country, including in the United
States or other regions used by Google, Apple, RevenueCat, or the selected AI
provider.

## 12. Changes to this policy

We may update this Privacy Policy. The current version and effective date are
published in the hosted legal manifest and surfaced in the app when a new
acceptance is required.
