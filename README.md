# Havillah Recruitment Agency — expanded website

This is the Havillah-branded Next.js 14 / React 18 / TypeScript website expanded using the supplied Ajira Majuu project as a feature reference. The original Havillah homepage, brand colors, supplied logo, imagery and existing sections have been preserved; additional pages and flows use the same navy/green visual system.

## Run locally

Requirements: Node.js 18+ and npm.

```bash
npm install
cp .env.example .env.local
# Edit .env.local and set the verified production domain and official WhatsApp number.
npm run dev
```

Open http://localhost:3000.

## Expanded functionality

- Existing homepage, brand palette, logo, destinations, service sections, map, social links, role catalogue and search filters retained.
- Dedicated searchable job directory at `/jobs` and individual detail pages at `/jobs/[slug]`.
- Detailed candidate application form at `/apply`, including personal details, destination and role preferences, experience, qualifications, language, availability, optional CV link, privacy consent and validation.
- Application form and employer talent request prepare a detailed WhatsApp message for the user to review and send. No false claim is made that an external message has already been sent or stored.
- Persistent responsive WhatsApp contact shortcut.
- Employer service page and structured talent request at `/employers/request-talent`.
- Standalone contact page with phone, email, WhatsApp, alternate phone and a note to verify the office location before visiting.
- How-it-works, candidate safety, privacy notice, terms, complaints/support and career guide pages.
- Category routes, custom 404, dynamic job metadata, generated `robots.txt` and `sitemap.xml`.
- Responsive page styling that extends the existing Havillah navy/green identity.

## Important production requirements

**Vacancies:** Several catalogue entries are illustrative sample data from the supplied source archives. They are clearly identified as unverified. Confirm availability, employer identity, salary, contract, requirements and dates before publishing any role as open. Do not use Google `JobPosting` structured data until the listing is a real, verified and available vacancy.

**Applications:** The candidate and employer forms use a WhatsApp handoff, not a database-backed submission API. The user must review and send the message in WhatsApp. File uploads are not silently collected; the candidate can optionally provide a CV link or ask the team for a secure submission method. For production-grade storage, document uploads, application statuses, email notifications and admin review, integrate a secured backend/database and verify all privacy and security controls.

**Contact details:** The WhatsApp shortcut defaults to the supplied Havillah primary phone number, `+254 754 426678`. Verify that this number is the agency's official WhatsApp account before deployment. The alternate phone, email, social links and map reference came from the supplied website project; confirm that each remains correct. The map references Bazaar Plaza, Moi Avenue, Nairobi, so confirm the actual office location before directing visitors there.

**Domain and SEO:** Set `NEXT_PUBLIC_SITE_URL` in `.env.local` to the agency's real canonical production domain. The default fallback is `https://example.com`, only a placeholder for local development. Verify the production domain, redirects, metadata, canonical URLs, robots and sitemap before launch. Search Console submission and indexing are not automatic ranking guarantees.

**Legal and privacy:** Privacy and terms pages are starter content, not legal advice. Review them against the agency's real data practices, retention, lawful basis, candidate rights and applicable Kenyan requirements before launch.

## Checks

Install dependencies and run:

```bash
npm run build
npm run start
```

The build could not be completed in the authoring environment because dependency installation timed out. Run the build in the deployment environment and resolve any environment-specific warnings before release.


## Consolidated project additions

This delivery keeps Havillah as the runnable root app and preserves the complete supplied supporting projects under `integrations/reference-projects/` rather than overwriting same-named files or mixing incompatible app roots.

- Added `/job-gallery`, a responsive gallery route using 183 imported job/category images.
- Imported project source trees and assets are preserved under `integrations/reference-projects/`.
- The unified image manifest is `data/combined-image-catalogue.json`.
- Design reference images are preserved in `public/images/design-inspiration/`.
- Project inventory: `[{"project": "nicksrecruitmentagency", "files_preserved": 189}, {"project": "mkconnections", "files_preserved": 235}, {"project": "ajiramajuu", "files_preserved": 202}]`.

**Integration note:** the supporting projects use overlapping but different app components, dependencies, routes, and backend assumptions. They are preserved in full so no source project is discarded; they are not all blindly mounted into the production homepage because doing so would create duplicate routes/components and potentially break the working Havillah app. Features requiring external credentials, a database, email provider, or verified live vacancy data still need configuration and testing. The existing Havillah brand palette remains the root design system.


## Consolidated project additions

- Added `/job-gallery`, a responsive gallery built from job and industry imagery across all supplied projects.
- Supporting project source/config/docs are preserved under `integrations/reference-projects/`; public binary images are consolidated under `public/images/combined-jobs/`.
- The image catalogue is `data/combined-image-catalogue.json`; design references are in `public/images/design-inspiration/`.
- Original uploaded ZIPs remain the complete source snapshots. This package keeps the root Havillah app coherent instead of merging conflicting app roots and package manifests into one broken Next.js application.
- Verify sample vacancies and contact details; the WhatsApp handoff is not database-backed application storage. Run the production build and end-to-end checks before deployment.
