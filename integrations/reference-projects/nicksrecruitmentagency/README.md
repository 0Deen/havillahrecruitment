# Nicks Recruitment Agency — Next.js Recruitment Site

A Next.js 14 (App Router) site for a Gulf overseas-recruitment agency:
recruitment services, job board, training school, medical laboratory,
country guides, a resource/guide library, and a conversational site
assistant.

## Running it locally

This project was generated as source files only — it has **not** been
built or run, because the environment that generated it has no network
access to install packages. You'll need Node.js 18+ installed locally:

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## What's real vs. what's a shell

**Fully built:**
- Full design system (Tailwind tokens, type, color), including a real
  light/dark mode toggle (see `components/ThemeToggle.tsx`)
- Homepage with all requested sections and real animation (Framer Motion,
  a GSAP scroll-drawn "flight path" process timeline, a Three.js hero globe)
- 130+ live, statically-generated routes: services, countries, job
  categories, training courses, individual job listings, about/medical/
  employer subpages, and a resources/guides library — all driven from
  `lib/data.ts` and `lib/page-content.ts`, so adding a row adds a real page
- Job board with working client-side filters (country, category, urgent,
  search)
- Site search — `/api/search` + `lib/search.ts` index every page,
  service, country, job, course, FAQ, and resource guide; the header's
  ⌘K palette and `/search` page both call it
- A conversational chatbot (`components/Chatbot.tsx` + `/api/chatbot` +
  `lib/chatbot.ts`) — it introduces itself, asks the visitor's name and
  what they're looking for, asks one relevant follow-up, then answers
  freely from the site's own content. State is kept server-side per
  session in `lib/conversation-store.ts`.
- Application/booking/contact forms (client-side only — see below)

**Shells that need a real backend to function** (this is unavoidable —
no static site can do these without a server):
- **Forms** (apply, book medical, book training, contact, track
  application) — currently show a success state on submit but don't
  send anywhere. Wire them to an API route + database, or a service
  like Formspree/Resend for a fast first version.
- **Chatbot → real LLM** — the chatbot currently answers from a
  deterministic keyword-matcher over the site's own content (see the
  comment at the top of `lib/chatbot.ts`). Swapping in a real model
  later is a one-function change in `app/api/chatbot/route.ts`; the
  guardrails and guided-conversation flow are provider-agnostic.
- **Multi-language (EN/AR/FR/SW)** — `next-intl` is included as a
  dependency; translation files and the locale-routing setup still
  need to be added.
- **Real video backgrounds** — the hero currently uses a layered
  gradient as a placeholder; drop an .mp4 into `public/videos/` and
  swap the `<div>` for a `<video>` tag in `components/Hero.tsx`.

## Structure

```
app/                  # routes (App Router)
  services/[slug]/    # 9 services, data-driven
  countries/[slug]/   # 5 countries, data-driven
  job-categories/[slug]/
  jobs/, jobs/[id]/
  training-school/courses/[slug]/
  about/[slug]/, medical-laboratory/[slug]/, employers/[slug]/
  resources/, resources/[slug]/   # visa/CV/contract/life-abroad guides
  terms-of-service/, cookie-policy/, accessibility-statement/, security/
components/           # Hero, nav, footer, section components, ThemeToggle
lib/data.ts           # services, countries, jobs, courses, stats — edit this to add pages
lib/page-content.ts   # simple informational pages (about/medical/employer/resources)
lib/chatbot.ts         # chatbot knowledge base + guided-conversation engine
lib/search.ts          # site search index
```

## Design direction

Navy (`#0B1F3A`) + gold (`#C9971E`) — aviation/trust plus a Gulf-gold
accent, deliberately avoiding the generic "cream + terracotta" or
"dark + neon" AI-site defaults. Display type is Fraunces (serif,
institutional weight), body is Inter. The signature visual is the
process timeline on the homepage: the recruitment journey is drawn
literally as a flight path that fills in as you scroll, because the
process actually is a route (registration → arrival), not a metaphor
borrowed from somewhere else. Dark mode uses a deep navy surface rather
than a simple color inversion.

## Not included (couldn't be, from this environment)

- Any actual npm install / build / live preview (no network access
  in this sandbox) — run `npm install && npm run build` locally to
  verify before deploying
- Connecting real MCP servers, shadcn CLI, or 21st.dev — these need
  live network access and your own accounts/keys
- A real backend, database, or auth system

