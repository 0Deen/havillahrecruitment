# MK Connection Limited — Unified International Opportunities Website

A single Next.js project combining the strongest pieces from the uploaded overseas-recruitment builds into one MK Connection Limited website.

## What is combined

- MK Connection Limited branding using the supplied blue/white logo artwork.
- Sticky desktop navigation with an Explore menu covering the full site.
- Mobile-first bottom navigation with Home, Jobs, Destinations, Apply and a More drawer.
- No login, registration, dashboard or authentication flow.
- Job search and filtering across destination and category.
- Job detail pages and quick-apply flow.
- Six Gulf destination pages with destination imagery.
- Visual job-category showcase using the supplied job artwork.
- Recruitment journey / how-it-works content.
- Safety and scam-awareness content.
- Employer recruitment section.
- Gallery, success stories, resources, FAQs, responsibilities and careers pages.
- Contact page with Ambank House, Utalii St, Nairobi location and embedded Google Map.
- WhatsApp/contact CTAs and floating actions.
- Mobile chat assistant UI and optional API route hooks.
- Newsletter, job-alert and enquiry UI.
- Existing gallery and content assets carried over from the uploaded projects.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Build

```bash
npm run build
npm start
```

## Notes

The project is intentionally frontend-first and contains no authentication. Existing API routes from the source projects are retained as optional integration points for MongoDB/OpenAI-backed forms and chat; the website itself does not require a user account.

Business contact details are centralized in `lib/site-config.ts` so they can be changed in one place.
