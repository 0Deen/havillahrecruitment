# Ajira Majuu — SEO & Search Console Deployment

This project now includes a crawlable SEO architecture built around real pages and real vacancy records.

## What is included

- `app/robots.ts`:
  - Allows normal crawling.
  - Blocks `/api/`.
  - Publishes `https://ajiramajuu.com/sitemap.xml`.
  - Publishes the site host.
- `app/sitemap.ts`:
  - Includes only routes that exist in the application.
  - Includes active job detail pages.
  - Includes destination pages.
  - Includes the dedicated recruitment/search-intent pages.
  - Uses `lastModified` dates rather than changing every URL on every build.
- Individual job pages:
  - Canonical URLs.
  - Job-specific metadata.
  - `JobPosting` JSON-LD only where the listing has enough supplied detail to support it.
  - Direct application route.
- Organization/WebSite JSON-LD in the root layout.
- Dedicated pages for:
  - Jobs in Kenya
  - Overseas jobs
  - Gulf jobs
  - Recruitment agency in Kenya
  - Recruitment agencies in Kenya
  - Overseas recruitment agency Kenya
  - Gulf recruitment agency
  - Private employment agency Kenya
  - Jobs for Kenyans abroad
  - Ajira na Kazi Kenya
  - Qatar jobs
  - Kuwait jobs
  - Saudi Arabia jobs
  - UAE jobs
  - Bahrain jobs
  - Oman jobs

## Important deployment steps

1. Set `NEXT_PUBLIC_SITE_URL=https://ajiramajuu.com` in production.
2. Deploy the application.
3. Open:
   - `https://ajiramajuu.com/robots.txt`
   - `https://ajiramajuu.com/sitemap.xml`
4. In Google Search Console, add/verify `ajiramajuu.com`.
5. Submit `sitemap.xml`.
6. Use URL Inspection on:
   - `/`
   - `/jobs`
   - `/jobs/elderly-caregiver-qatar`
   - `/jobs/female-driver-qatar`
   - `/jobs/female-barista-kuwait`
   - `/gulf-jobs`
   - `/recruitment-agency-kenya`
7. Use the live test and request indexing for important new pages where appropriate.

## Job maintenance

When a vacancy closes:

- Change its status from `active` to `filled` or `paused`.
- If it has `JobPosting` structured data, add an accurate `validThrough` date when known, or remove the structured-data eligibility when the listing is no longer an open job.
- Remove closed job pages from the active sitemap by changing their status.
- Keep the public page useful or return a proper 404/410 when the job should disappear completely.

## Do not do

- Do not create fake jobs just to rank.
- Do not invent salaries, employers, reviews, ratings, licences, visa promises or government approvals.
- Do not create hundreds of near-identical city/country pages with only keywords changed.
- Do not put `JobPosting` structured data on job-listing/search pages.
- Do not claim that Ajira Majuu is Google's #1 or Kenya's officially "best" agency unless there is independently verifiable evidence for that claim.

The goal is to make Ajira Majuu highly discoverable for relevant Kenyan employment searches while keeping every indexed page useful, accurate and technically crawlable.

## Email + image update (October 2026)

- Inquiry/lead notifications and full applications are configured to notify `deen@ajiramajuu.com`.
- Resend remains server-side only. Set `RESEND_API_KEY` in the deployment platform; never place the key in a client component, public environment variable, Git repository, or source file.
- Set `RESEND_FROM_EMAIL` to a sender on a domain verified in Resend (for example `notifications@ajiramajuu.com`).
- The the two Kuwait image assets were intentionally removed and all code references now point to the same basenames with `.png` extensions so PNG files can be added manually:
  - `public/images/countries/kuwaitcity.png`
  - `public/images/countries/kuwait.png`
- No other image format was intentionally removed.
