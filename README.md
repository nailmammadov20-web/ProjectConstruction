# Constructivegroup.az

Corporate website for Constructivegroup.az — an international construction,
engineering and project management group. Built with Next.js 15 (App Router),
TypeScript, Tailwind CSS v4, shadcn/ui, Framer Motion, GSAP, Embla Carousel,
React Hook Form + Zod, full AZ / EN / RU internationalization via next-intl,
a PostgreSQL database (Prisma ORM), and a password-protected admin panel.

## Getting started

```bash
npm install
npm run db:push    # sync the Prisma schema to your database
npm run db:seed    # seed demo content + create the admin user
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public site
(redirects to `/en`, `/az`, or `/ru`) and
[http://localhost:3000/admin](http://localhost:3000/admin) for the admin
panel.

```bash
npm run build      # production build
npm run start      # serve the production build
npm run lint        # eslint
npm run db:studio  # Prisma Studio — browse/edit the DB directly
```

### Environment variables

Set these in `.env` (used by the Prisma CLI) **and** `.env.local` (used by
Next.js at runtime) — both are gitignored:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string (Neon, Supabase, Railway, RDS, etc.) |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Used once by `npm run db:seed` to create the initial admin login |
| `SESSION_SECRET` | Random secret (`openssl rand -hex 32`) used to sign admin session JWTs |

**Change the seeded admin password after first login** — it's whatever
`ADMIN_PASSWORD` was set to at seed time. There's no in-panel "change
password" flow yet; update it by re-hashing and updating the `AdminUser` row
(e.g. via `npm run db:studio`) or re-running the seed with a new
`ADMIN_PASSWORD` (the seed only creates the user if the email doesn't exist,
so delete the row first).

## Architecture

```
app/
  [locale]/              public site, locale-prefixed (/en, /az, /ru)
    layout.tsx             root layout: fonts, theme, navbar, footer, providers
    page.tsx                home
    about/ process/ quality-safety/ services/ projects/ news/ careers/
    contact/ privacy-policy/ cookies/ terms/
    services/[slug]/ projects/[slug]/ news/[slug]/
  admin/                  admin panel, NOT locale-prefixed, session-gated
    layout.tsx              its own root layout (html/body) — separate from the public site
    login/page.tsx           email + password login (Server Action)
    (dashboard)/layout.tsx   sidebar + topbar chrome, redirects to /login if unauthenticated
    (dashboard)/{entity}/    list + new/[id] edit pages per content type
    actions/                 Server Actions: create/update/delete per entity, auth
  actions/forms.ts        public-site Server Actions: contact form + job application submit
  sitemap.ts robots.ts manifest.ts

lib/
  repo/                   async DB read layer the public site renders from
                           (getServices, getProjects, getNewsArticles, getLeadershipTeam,
                           getCertificates, getPartners, getJobOpenings, + detail/related
                           lookups) — wrapped in React's cache() to dedupe per-request
  data/                   original static content, now used only as the seed source
                           (prisma/seed.ts) for services/projects/news/team/certificates/
                           partners/careers — offices and testimonials are NOT in the DB
                           and are still imported directly from here
  db.ts                   Prisma client singleton
  auth.ts                 admin session: bcrypt password check, JWT sign/verify, cookies
  admin-form-utils.ts     FormData → typed field parsing for admin Server Actions
  schemas.ts              Zod schemas for the public contact/application forms
  types.ts                shared content types + getLocalized() locale-fallback helper

components/
  admin/                  sidebar, topbar, page header, data table bits, form fields
                           (LocalizedTextField, ImageField, JsonField), delete/submit buttons
  layout/ home/ about/ quality/ projects/ careers/ contact/ news/   public site sections
  ui/                     shadcn/ui primitives (Base UI under the hood)
  seo/json-ld.tsx         Organization / Breadcrumb / Article / Project / Service schema

prisma/
  schema.prisma           Service, Project, NewsArticle, TeamMember, Certificate, Partner,
                           JobOpening, ContactSubmission, JobApplication, AdminUser
  seed.ts                 populates the DB from lib/data/*.ts + creates the admin user

i18n/                     next-intl routing, navigation, request config
messages/{en,az,ru}.json  UI copy (nav, forms, footer, section chrome)
middleware.ts             branches on path: /admin → session check; everything else → next-intl locale routing
```

### How content flows

The database is the source of truth for everything editable in the admin
panel (Projects, Services, News, Team, Certificates, Partners, Careers,
Contact messages, Job applications). Public pages are Server Components that
call `lib/repo/*.ts` functions directly — there's no internal API layer.
Client Components that need this data (nav mega-menu, search, filter grids,
carousels) receive it as props from their nearest Server Component ancestor
rather than fetching it themselves.

Editing content: **Admin Panel → edit/create/delete → `revalidatePath("/",
"layout")` → public pages re-render with fresh data** on next request. There
is currently no draft/preview state — saves go live immediately.

`Testimonial` and `Office` are **not** database-backed (not in scope per the
original build) — they're still plain arrays in `lib/data/team.ts`. Add them
to `prisma/schema.prisma` + a repo module + admin CRUD pages following the
same pattern as `Partner` (their closest analog) if you need to manage them
from the panel too.

### Admin panel content model

Long-form nested content (image galleries, description paragraphs, benefits,
FAQ, timeline milestones, article body) is edited as raw JSON in the admin
forms rather than bespoke per-field UI — the placeholder text in each field
shows the expected shape, which mirrors the TypeScript types in
`lib/types.ts` exactly. Core fields (title, slug, images, dates, feature
flags, category/sector) have dedicated inputs, including stacked EN/AZ/RU
inputs for every `LocalizedText` field.

### CMS-ready by design

Every content type is a typed interface in `lib/types.ts`. `LocalizedText =
{ en, az?, ru? }` fields use a `getLocalized(field, locale)` helper that
falls back to English when a translation is missing.

### Internationalization

UI chrome (navigation, buttons, forms, footer, cookie banner, homepage hero
and section titles) is fully translated in `messages/en.json`,
`messages/az.json`, and `messages/ru.json`. Seeded data-layer content has
titles/summaries/categories translated where they appear in cards across the
site; long-form body copy (service descriptions, project case-study
paragraphs, article bodies, FAQ answers) is English-only by default and
falls back automatically — fill in the `az`/`ru` keys on those JSON fields
(in the admin panel or directly in the DB) to complete full-content
localization.

### Known placeholders

- **Imagery**: every seeded photo is a deterministic `picsum.photos`
  placeholder (see `lib/images.ts`). Replace image URLs via the admin panel's
  image fields, or a CMS-driven pipeline; `next.config.ts` already
  allow-lists `picsum.photos` and `images.unsplash.com` in
  `images.remotePatterns` — add your real asset host(s) there too.
- **Hero video**: the homepage hero (`components/hero.tsx`) uses a still
  image with a Ken Burns zoom; swap the `<Image>` for a `<video>` element for
  real drone footage.
- **Résumé uploads**: the careers application form captures the selected
  file's *name* only (stored on `JobApplication.resumeFileName`) — it does
  not upload or store the file itself. Wire it to real object storage
  (S3, Vercel Blob, etc.) before relying on it operationally.
- **Map**: the contact page embeds a plain Google Maps iframe by city name —
  swap for exact coordinates or a Maps API key–based embed for pinpoint
  accuracy.
- **Single admin user**: auth is intentionally minimal (one email/password,
  no roles, no invite flow) per the build's scope. Extend `AdminUser` +
  `lib/auth.ts` if you need multiple admins or role-based permissions.

## Design system

- Palette: navy `#0F172A` / `#1E293B`, gold accent `#C59D5F`, background
  `#F8FAFC`, text `#111827` — defined as CSS variables in `app/globals.css`
  (`--color-navy-*`, `--color-gold-*`) plus shadcn's semantic tokens
  (`--primary`, `--card`, etc.), each with a dark-mode counterpart.
- Font: Plus Jakarta Sans (`next/font/google`), Latin + Cyrillic subsets.
- Motion: shared `Reveal` / `RevealGroup` / `RevealItem` primitives
  (`components/motion/reveal.tsx`) wrap Framer Motion's `whileInView` for
  consistent scroll reveals across the site.
