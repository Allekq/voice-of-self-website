# Big Change Map

This file is the cross-repo checklist for public business/contact changes.

Use it when any of these change:

- support/contact email
- phone number
- mailing address
- legal/business name
- support URL
- privacy-policy URL
- website domain / site origin
- hosted legal-manifest URL

Latest Apple-side review in this file was verified against official Apple
developer help pages on 2026-04-10.

## Fast Rules

1. If contact details appear in legal text, update both the website legal pages
   and the mirrored app legal pages.
2. If legal text changes, bump only the affected document version/effective
   date:
   - website: `/Users/alekj/Documents/GitHub/voice-of-self-website/site.config.mjs`
   - app mirror: `/Users/alekj/Documents/GitHub/closure-app/external/legal/legal-manifest.json`
3. The website and iOS app do not share one source of truth for support email:
   - website owner: `/Users/alekj/Documents/GitHub/voice-of-self-website/src/config/site.ts`
   - app owner: `/Users/alekj/Documents/GitHub/closure-app/ios_app/Core/AppConstants.swift`
4. Phone number and mailing address are not centralized in code today. They are
   duplicated in legal markdown and Apple dashboard state.
5. If the public legal host moves, also update the app-side hosted manifest URL:
   - `/Users/alekj/Documents/GitHub/closure-app/ios_app/Core/Legal/TermsConfig.swift`

## Quick Matrix

| Change | Website repo | App repo | Apple / external |
| --- | --- | --- | --- |
| Support/contact email | `src/config/site.ts`, support page, waitlist fallback, structured data, legal docs | `AppConstants.supportEmail`, support composer flows, legal mirror | App Review contact email, DSA trader email if applicable, mailbox routing |
| Phone number | legal docs only today | legal docs only today | App Review contact phone, DSA trader phone if applicable, support page contact details |
| Mailing address | legal docs only today | legal docs only today | Apple Developer membership details, Agreements, Banking, Tax, DSA trader address if applicable |
| Legal/business name | `siteConfig.legalName`, footer text, structured data, legal docs | legal docs and any hosted-legal references | Apple Developer membership/legal entity, App Store copyright / seller-facing metadata, DSA trader identity if applicable |
| Support/privacy/legal URLs or domain | `site.config.mjs`, `src/config/site.ts`, discovery/SEO/legal links, hardcoded full URLs in legal docs | `TermsConfig.manifestURLString`, external legal URLs/manifest | Support URL, Privacy Policy URL, App Review contact page expectations, DSA page visibility |

## 1. When The Support Or Contact Email Changes

### Website repo

- `/Users/alekj/Documents/GitHub/voice-of-self-website/src/config/site.ts`
  - owns `contactEmail`, `waitlistEmail`, and `supportEmail`
  - regenerates mailto/Gmail links and support/waitlist draft text
- `/Users/alekj/Documents/GitHub/voice-of-self-website/src/pages/support.astro`
  - renders the support email and copy button UI
- `/Users/alekj/Documents/GitHub/voice-of-self-website/src/pages/how-to-join-wish-list.astro`
  - shows the waitlist email fallback
- `/Users/alekj/Documents/GitHub/voice-of-self-website/src/layouts/SiteLayout.astro`
  - emits structured data with `Organization.email` and support `ContactPoint.email`
- `/Users/alekj/Documents/GitHub/voice-of-self-website/src/pages/privacy-policy.md`
  - email appears in the contact sections and privacy-rights instructions
- `/Users/alekj/Documents/GitHub/voice-of-self-website/src/pages/terms-of-service.md`
  - email appears in the legal contact block
- `/Users/alekj/Documents/GitHub/voice-of-self-website/site.config.mjs`
  - bump legal versions/effective dates only if Privacy or Terms text changed

### App repo

- `/Users/alekj/Documents/GitHub/closure-app/ios_app/Core/AppConstants.swift`
  - owns `supportEmail` for the iOS app
- `/Users/alekj/Documents/GitHub/closure-app/ios_app/Systems/Utilities/SupportEmailComposer.swift`
  - builds all in-app `mailto:` links, fallback "contact manually" copy, and
    clipboard behavior
- `/Users/alekj/Documents/GitHub/closure-app/ios_app/Features/Settings/SettingsView.swift`
  - "Send Feedback" entry point uses the support composer
- `/Users/alekj/Documents/GitHub/closure-app/ios_app/Systems/Utilities/AppErrorPresentation.swift`
  - "Report Issue" action opens the support composer
- `/Users/alekj/Documents/GitHub/closure-app/ios_app/Features/Startup/UnmigratableStorageGateView.swift`
  - "Contact Developer" action opens the support composer
- `/Users/alekj/Documents/GitHub/closure-app/external/legal/privacy-policy.md`
  - email appears in the legal contact and privacy-rights language
- `/Users/alekj/Documents/GitHub/closure-app/external/legal/terms-of-service.md`
  - email appears in the legal contact block
- `/Users/alekj/Documents/GitHub/closure-app/external/legal/legal-manifest.json`
  - bump affected legal versions/effective dates if legal text changed

### Apple / external follow-through

- Update mailbox forwarding, autoresponders, filters, and any real helpdesk
  routing you use outside the repo.
- Review App Store Connect App Review contact email.
- If the app is distributed in the EU as a trader, review DSA trader email.
- Review the page behind the App Store Support URL so it still exposes working
  contact details.

### Important note

Today the website sets `waitlistEmail = contactEmail` and
`supportEmail = contactEmail` in `src/config/site.ts`. If you want waitlist and
support to diverge later, do that intentionally instead of assuming they are
independent already.

## 2. When The Phone Number Changes

### Website repo

- `/Users/alekj/Documents/GitHub/voice-of-self-website/src/pages/privacy-policy.md`
- `/Users/alekj/Documents/GitHub/voice-of-self-website/src/pages/terms-of-service.md`

The website does not currently centralize or render a phone number anywhere
else.

### App repo

- `/Users/alekj/Documents/GitHub/closure-app/external/legal/privacy-policy.md`
- `/Users/alekj/Documents/GitHub/closure-app/external/legal/terms-of-service.md`
- `/Users/alekj/Documents/GitHub/closure-app/external/legal/legal-manifest.json`
  - bump affected legal versions/effective dates if legal text changed

The iOS app does not currently have a phone-number constant or phone-number UI.

### Apple / external follow-through

- Update App Review contact phone number in App Store Connect.
- If applicable, update DSA trader phone number for the EU product page.
- If the support/contact page behind the App Store Support URL shows a phone
  number, update that page too.
- If the phone number is part of the Apple Developer membership contact details,
  review/update that Apple account state as well.

## 3. When The Mailing Address Changes

### Website repo

- `/Users/alekj/Documents/GitHub/voice-of-self-website/src/pages/privacy-policy.md`
- `/Users/alekj/Documents/GitHub/voice-of-self-website/src/pages/terms-of-service.md`
- `/Users/alekj/Documents/GitHub/voice-of-self-website/site.config.mjs`
  - bump affected legal versions/effective dates if legal text changed

There is no centralized mailing-address constant in the website repo today.

### App repo

- `/Users/alekj/Documents/GitHub/closure-app/external/legal/privacy-policy.md`
- `/Users/alekj/Documents/GitHub/closure-app/external/legal/terms-of-service.md`
- `/Users/alekj/Documents/GitHub/closure-app/external/legal/legal-manifest.json`
  - bump affected legal versions/effective dates if legal text changed

### Apple / external follow-through

- Review/update Apple Developer membership account information.
- Review Business > Agreements in App Store Connect.
- Review banking details if the account-holder address or bank-holder details
  changed.
- Review tax forms if the address is embedded in tax information Apple has on
  file.
- If applicable, update DSA trader address for the EU product page.
- Update any public support/contact page that shows the address.

### Important note

The address may need more than one Apple-side update because Apple treats legal
membership info, paid agreements, banking, tax, and DSA trader info as separate
surfaces.

## 4. When The Legal Or Business Name Changes

### Website repo

- `/Users/alekj/Documents/GitHub/voice-of-self-website/src/config/site.ts`
  - `legalName`
  - `footerText`
- `/Users/alekj/Documents/GitHub/voice-of-self-website/src/layouts/SiteLayout.astro`
  - structured data publishes `legalName`
- `/Users/alekj/Documents/GitHub/voice-of-self-website/src/components/landing/sections/SiteFooter.astro`
  - renders footer text from `siteConfig.footerText`
- `/Users/alekj/Documents/GitHub/voice-of-self-website/src/pages/privacy-policy.md`
- `/Users/alekj/Documents/GitHub/voice-of-self-website/src/pages/terms-of-service.md`
- `/Users/alekj/Documents/GitHub/voice-of-self-website/site.config.mjs`
  - bump affected legal versions/effective dates if legal text changed

### App repo

- `/Users/alekj/Documents/GitHub/closure-app/external/legal/privacy-policy.md`
- `/Users/alekj/Documents/GitHub/closure-app/external/legal/terms-of-service.md`
- `/Users/alekj/Documents/GitHub/closure-app/external/legal/legal-manifest.json`
  - bump affected legal versions/effective dates if legal text changed

### Apple / external follow-through

- Review/update Apple Developer membership legal entity details.
- Review Agreements if the legal entity or contracting party changed.
- Review DSA trader identity if applicable.
- Review App Store copyright / seller-facing metadata if it uses the old name.

## 5. When The Support URL, Privacy-Policy URL, Domain, Or Legal Host Changes

### Website repo

- `/Users/alekj/Documents/GitHub/voice-of-self-website/site.config.mjs`
  - `siteOrigin`
  - `siteDomain`
  - legal document paths and version metadata
- `/Users/alekj/Documents/GitHub/voice-of-self-website/src/config/site.ts`
  - builds `legalManifestHref`, absolute URLs, support/legal links, and
    structured-data URLs
- `/Users/alekj/Documents/GitHub/voice-of-self-website/src/lib/discovery.ts`
  - sitemap, `llms.txt`, `robots.txt`, and discovery outputs depend on these
    routes
- `/Users/alekj/Documents/GitHub/voice-of-self-website/src/layouts/SiteLayout.astro`
  - canonical URLs, structured data, and organization/site IDs derive from
    origin/support links
- `/Users/alekj/Documents/GitHub/voice-of-self-website/src/pages/privacy-policy.md`
  - contains full public URLs
- `/Users/alekj/Documents/GitHub/voice-of-self-website/src/pages/terms-of-service.md`
  - contains full public URLs

### App repo

- `/Users/alekj/Documents/GitHub/closure-app/ios_app/Core/Legal/TermsConfig.swift`
  - the app-side hosted legal-manifest URL
- `/Users/alekj/Documents/GitHub/closure-app/external/legal/legal-manifest.json`
  - hosted document URLs
- `/Users/alekj/Documents/GitHub/closure-app/external/legal/privacy-policy.md`
  - hardcoded full public URLs
- `/Users/alekj/Documents/GitHub/closure-app/external/legal/terms-of-service.md`
  - hardcoded full public URLs
- `/Users/alekj/Documents/GitHub/closure-app/external/legal/PUBLISHING.md`
  - hosted legal-site expectations
- `/Users/alekj/Documents/GitHub/closure-app/docs/legal-documents.md`
  - legal publishing workflow notes

### Apple / external follow-through

- Update App Store Connect Support URL if the public support page URL changed.
- Update App Store Connect Privacy Policy URL if the public privacy-policy URL
  changed.
- Review DSA trader page visibility if the host/domain changed.
- Review any public helpdesk or inbox tooling that relies on the old domain.

## 6. App Store Connect And Apple Checklist

Use this section for dashboard follow-through. Items are marked as:

- `explicit`: directly documented by Apple
- `inferred`: operational follow-through that is not stored in this repo

### Email change

- `explicit`: App Review contact email
- `explicit`: DSA trader email if applicable
- `explicit`: the page behind the Support URL must still expose working contact
  information
- `inferred`: mailbox routing, aliases, autoresponders, helpdesk destinations

### Phone change

- `explicit`: App Review contact phone number
- `explicit`: DSA trader phone number if applicable
- `explicit`: support page contact information if that page shows the phone
  number

### Mailing-address change

- `explicit`: Apple Developer membership account information
- `explicit`: Agreements review in App Store Connect
- `explicit`: Banking review if holder/address details changed
- `explicit`: Tax review if Apple has address-bearing tax forms on file
- `explicit`: DSA trader address if applicable

### URL/domain change

- `explicit`: Support URL
- `explicit`: Privacy Policy URL
- `explicit`: DSA trader product-page visibility if applicable
- `inferred`: any external helpdesk/docs/ops systems that hardcode the old
  public host

### Roles to expect

- Account Holder:
  - membership/account updates
  - agreement acceptance
  - approval of some banking changes
- Admin / Finance:
  - tax and banking work
- App Manager / Marketing:
  - app metadata, app information, and other store-facing fields

## 7. Official Apple Sources

These are the primary sources to re-check if Apple changes the workflow:

- Updating account information:
  https://developer.apple.com/help/account/membership/updating-your-account-information/
- Platform version information (App Review contact info and Support URL):
  https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information
- App information (Privacy Policy URL and DSA overview):
  https://developer.apple.com/help/app-store-connect/reference/app-information/app-information/
- Manage EU Digital Services Act trader requirements:
  https://developer.apple.com/help/app-store-connect/manage-compliance-information/manage-european-union-digital-services-act-trader-requirements/
- Sign and update agreements:
  https://developer.apple.com/help/app-store-connect/manage-agreements/sign-and-update-agreements/
- Enter banking information:
  https://developer.apple.com/help/app-store-connect/manage-banking-information/enter-banking-information
- Provide tax information:
  https://developer.apple.com/help/app-store-connect/manage-tax-information/provide-tax-information/
- Role permissions:
  https://developer.apple.com/help/app-store-connect/reference/account-management/role-permissions

## 8. Validation Sweep

### Website repo

1. Run `npm run check`.
2. Run `npm run build`.
3. Verify generated outputs if legal text or URLs changed:
   - `/Users/alekj/Documents/GitHub/voice-of-self-website/dist/legal-manifest.json`
   - `/Users/alekj/Documents/GitHub/voice-of-self-website/dist/privacy-policy/index.html`
   - `/Users/alekj/Documents/GitHub/voice-of-self-website/dist/terms-of-service/index.html`

### Cross-repo search sweep

Run a repo-wide search for the old value after editing both repos. Typical
examples:

- old email address
- old phone number
- old mailing address
- old domain or support/legal URL
- old legal/business name

### App repo

If you changed the in-app support email or legal-host configuration, do at
least one app-side sanity check:

- confirm `/Users/alekj/Documents/GitHub/closure-app/ios_app/Core/AppConstants.swift`
  and `/Users/alekj/Documents/GitHub/closure-app/ios_app/Systems/Utilities/SupportEmailComposer.swift`
  agree
- if legal-manifest behavior changed, review:
  - `/Users/alekj/Documents/GitHub/closure-app/tests/ios_app_tests/LegalManifestServiceTests.swift`
  - `/Users/alekj/Documents/GitHub/closure-app/tests/ios_app_tests/LegalManagerTests.swift`

## 9. Related Internal Docs

- `/Users/alekj/Documents/GitHub/voice-of-self-website/skills/legal-update-sync/CHECKLIST.md`
- `/Users/alekj/Documents/GitHub/voice-of-self-website/skills/legal-update-sync/SKILL.md`
- `/Users/alekj/Documents/GitHub/voice-of-self-website/RELEASE.md`
- `/Users/alekj/Documents/GitHub/closure-app/docs/legal-documents.md`
- `/Users/alekj/Documents/GitHub/closure-app/external/legal/PUBLISHING.md`
- `/Users/alekj/Documents/GitHub/closure-app/docs/environment-system.md`
