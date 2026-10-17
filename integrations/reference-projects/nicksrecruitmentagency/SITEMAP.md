# Sitemap — Nicks Recruitment Agency

130+ live routes: static page templates plus pages generated from
`lib/data.ts` / `lib/page-content.ts`. Add a row to either file
to add a real page — nothing here is hand-duplicated. Portal/dashboard
routes have been removed; the site is public-facing only.

## Static pages (32)
```
/                                  Home
/about                             About index
/about/[slug] x11                  story, mission-vision, ceo-message,
                                    why-choose-us, timeline, licenses,
                                    certifications, partners,
                                    anti-trafficking-policy,
                                    equal-opportunity-policy, careers
/services                          Services index
/services/[slug] x9                see Services list below
/jobs                              All jobs (filterable)
/jobs/[id] x6                      sample listings
/job-categories                    Categories index
/job-categories/[slug] x21         see Job Categories list below
/training-school                   Training school home
/training-school/courses           Courses index
/training-school/courses/[slug] x22   see Courses list below
/training-school/equipment         Equipment & facilities
/medical-laboratory                Medical lab home
/medical-laboratory/[slug] x3      required-tests, faqs, preparation
/countries                         Countries index
/countries/[slug] x5                uae, qatar, oman, saudi-arabia, kuwait
/employers                         Employers index
/employers/[slug] x5               hire-workers, recruitment-process,
                                    industries-served, candidate-database,
                                    request-staff
/success-stories
/blog
/news
/faqs
/testimonials
/gallery
/videos
/downloads
/career-guidance
/events
/privacy-policy
/contact
/apply-now
/track-application
/book-medical
/book-training
/resources
/resources/[slug] x20              visa-guide, passport-guide,
                                    cv-writing-tips, interview-preparation,
                                    salary-expectations, contract-review-guide,
                                    pre-departure-checklist, life-in-uae,
                                    life-in-qatar, life-in-saudi-arabia,
                                    worker-rights, avoiding-recruitment-scams,
                                    remittance-guide, family-support-guide,
                                    returning-home-guide, domestic-worker-guide,
                                    construction-worker-guide,
                                    healthcare-worker-guide,
                                    hospitality-worker-guide,
                                    diaspora-community
/terms-of-service
/cookie-policy
/accessibility-statement
/security
```

## Services (9) — `lib/data.ts` → `services`
Overseas Recruitment · Executive Recruitment · Domestic Recruitment ·
Temporary Staffing · Permanent Staffing · Talent Outsourcing ·
HR Consultancy · Visa Processing · Documentation · Airport Assistance
(10 listed — Documentation and Airport Assistance both included)

## Job Categories (21) — `lib/data.ts` → `jobCategories`
Construction, Hospitality & Hotels, Restaurants & Waitstaff, Domestic
Workers, Caregivers & Nannies, Drivers, Security Guards, Factory
Workers, Warehouse Workers, Cleaners, Kitchen Helpers, Baristas,
Electricians, Plumbers, HVAC Technicians, Mechanics, Welders,
Engineers, Agriculture, Retail, Healthcare Support

## Training Courses (22) — `lib/data.ts` → `courses`
Housekeeping, Hotel Services, Cleaning Equipment, Industrial Cleaning,
Caregiver, Nursing Assistant, Construction Safety, Scaffolding,
Welding, Forklift Awareness, Customer Service, Arabic Basics, English
Communication, Food Handling, Kitchen Assistant, Laundry Operations,
Security Guard, Warehouse Operations, Retail Assistant, Office
Etiquette, Interview Preparation, Cultural Orientation for Gulf
Countries

## Countries (5) — `lib/data.ts` → `countries`
UAE, Qatar, Oman, Saudi Arabia, Kuwait — each with salary range,
currency, climate, working hours, common roles, required documents

## Navigation structure
The header mega-menu (`components/SiteHeader.tsx`) mirrors your
original nav exactly: About / Services / Jobs / Training School /
Medical Lab / For Employers / Resources, plus Blog and Contact in the
top bar, and Track Application / Resources / Contact in the utility
bar above the main nav. A light/dark theme toggle sits next to search.

## How to extend
- New service → add a row to `services` in `lib/data.ts`
- New country → add a row to `countries`
- New job listing → add a row to `jobs`
- New course → add a row to `courses`
- New simple info page (about/medical/employer subpage) → add a row
  to the matching array in `lib/page-content.ts`

Each of these automatically becomes a real page via `generateStaticParams`
in the matching `[slug]/page.tsx` — no new files needed for routine
content updates.
