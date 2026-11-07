---
paths:
  - "payload.config.ts"
  - "src/payload.config.ts"
  - "next.config.*"
  - "src/app/**"
  - "src/cms/**"
  - "src/features/**/cms/**"
  - "src/shared/services/**"
  - "scripts/**/*.ts"
---

# Next.js + Payload CMS

Stack: Next.js (App Router), Payload CMS 3, PostgreSQL, React, Tailwind CSS v4, TypeScript strict, pnpm only. Hosted on
Vercel: Vercel Postgres for the database, Vercel Blob for media, also in local dev. Starter repo:
`https://github.com/Easy-Dev-Company/template-nextjs`. Its `docs/` folder is the detailed reference, this file is the
summary.

## src/ exceptions to FDD

Besides `features/` and `shared/`, `src/` may hold: `app/` (routes), `cms/` (Payload core config), `payload.config.ts`,
`payload-types.ts` (generated), `proxy.ts` (middleware).

## Routes

1. Two route groups: `src/app/(frontend)/` for the public site, `src/app/(payload)/` for the admin. Never edit generated
   files in `(payload)`.
2. Public routes are locale-prefixed: `/{locale}/...`. Locales live in `src/shared/helpers/i18n.ts`, redirects in
   `src/proxy.ts`.
3. Static pages use `generateStaticParams` and `dynamicParams = false`.
4. Every fixed page is listed in `staticPages` in `src/shared/helpers/static-pages.ts`. Sitemap, page metadata,
   hreflang, and revalidation read it. A new page is added there first.
5. `robots.ts`, `sitemap.ts`, `manifest.ts`, and `not-found.tsx` live in `src/app/` and call the shared SEO service.
6. The site icon is the Next.js file convention: `src/app/icon.svg`, plus `apple-icon.png` or `favicon.ico` when needed.
   No manual `<link rel="icon">`. The starter icon is a placeholder, replace it per project.

## Revalidation

1. Payload runs inside the Next.js server, so `afterChange` hooks in `src/cms/hooks/revalidate-page.ts` call
   `revalidatePath` directly. No `/api/revalidate` route and no revalidate secret.
2. A page global revalidates its own paths: `afterChange: [revalidateStaticPage("pageKey")]`. `site-settings`, `menu`,
   and `footer` use `revalidateAllPages`, which revalidates the whole layout.
3. A collection revalidates its list page and its detail path in `afterChange` and `afterDelete`.
4. `revalidatePath` throws outside Next.js. Scripts that write through the Local API (restore, seeds) pass
   `context: { disableRevalidate: true }`, and every hook returns early on it.

## CMS model

1. No generic `Pages` collection. Each fixed page is its own Payload global with `admin.group: "Pages"`. Use a
   collection only for page types with many instances (case studies, blog posts).
2. A page global has one `group` field per section, not a reorderable blocks array.
3. Each section's field config and its component live together in the owning feature: `features/hero/cms/` defines
   `HeroSectionField`, `features/hero/components/` renders `HeroSection`, both exported from the barrel.
4. The route fetches the global and renders each section directly with its group data as props. No block registry, no
   `blockType` switch.
5. Shared field groups (SEO) live in `src/cms/fields/`. Core collections and globals live in `src/cms/collections/` and
   `src/cms/globals/`.
6. Global data is fetched with a typed helper: `getGlobalConfig(locale, "site-settings")`.
7. Media relations are unwrapped with a helper (`resolveMedia`), never by hand.

## Shared services

- `shared/services/seo/`: page metadata, JSON-LD, robots, sitemap, manifest. Functions self-fetch what they need,
  callers pass only `locale` and the page data. The `seo` field group has `metaTitle`, `metaDescription`, `metaImage`.
  Robots is hardcoded to `index, follow`, there are no per-page noindex or nofollow fields.
- `shared/services/analytics/`: GA rendered once in the frontend layout, nothing when the env var is unset. It does not
  wait for cookie consent.
- `shared/services/content-dump/`: dump and restore of all CMS content, used by `pnpm dump` and `pnpm restore`.

## Payload gotchas

1. Run `pnpm generate:types` after every collection or global schema change. `payload-types.ts` is the source of truth
   for CMS types and is committed, so `pnpm typecheck` works on a fresh clone. Run `pnpm generate:importmap` after
   adding admin components.
2. The local `.env` database may be the production one. Run `pnpm dump` before any schema change.
3. Adding `required: true` to a field on a non-empty table makes the dev schema push TRUNCATE the table. Add the column
   as nullable, backfill, then set NOT NULL. Tell the user to answer "no" to the push data-loss prompt.
4. Keep frontend `locales` and Payload `cmsLocales` as separate constants. Narrowing the frontend list must never change
   the CMS localization schema.
5. Writing with `locale: "all"` silently drops data. Restore and seed scripts loop over real locale codes.
6. The dev server can block on an interactive schema push prompt in the user's terminal. If every request hangs after a
   schema change, ask the user to check their terminal.

## Env

Keep `.env.example` in sync with every variable the code reads. Required: `PAYLOAD_SECRET`, `POSTGRES_URL`,
`NEXT_PUBLIC_SERVER_URL`, `BLOB_READ_WRITE_TOKEN`. Optional: `NEXT_PUBLIC_GA_ID`,
`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_TELEMETRY_DISABLED`, plus form and email keys when the project has them.

## Commands

`pnpm dev`, `pnpm devsafe` (clears `.next`), `pnpm build`, `pnpm lint`, `pnpm typecheck`, `pnpm format`,
`pnpm generate:types`, `pnpm generate:importmap`, `pnpm dump`, `pnpm restore` (dry-run by default, `--apply` to write).
No Lighthouse script or dependency: run it from DevTools or with `npx lighthouse` when needed.

## Repo files

1. `.idea/` is ignored except `runConfigurations/`: `/.idea/*` and `!/.idea/runConfigurations` in `.gitignore`.
2. No GitHub workflows by default. Vercel deploys from git.
