---
paths:
  - "src/**/*.{ts,tsx}"
  - "next.config.*"
  - "scripts/**/*.ts"
---

# Next.js + Payload CMS

Stack: Next.js (App Router), Payload CMS 3, PostgreSQL, React, Tailwind CSS v4, TypeScript strict, pnpm only. Starter repo: `Easy-Dev-Company/template-nextjs`. Reference project until the starter is filled: `easy-dev-website`.

## src/ exceptions to FDD

Besides `features/` and `shared/`, `src/` may hold: `app/` (routes), `cms/` (Payload core config), `payload.config.ts`, `payload-types.ts` (generated), `proxy.ts` (middleware).

## Routes

1. Two route groups: `src/app/(frontend)/` for the public site, `src/app/(payload)/` for the admin. Never edit generated files in `(payload)`.
2. Public routes are locale-prefixed: `/{locale}/...`. Locales live in `src/shared/helpers/i18n.ts`, redirects in `src/proxy.ts`.
3. Static pages use `generateStaticParams` and `dynamicParams = false`. Content updates trigger on-demand revalidation from Payload `afterChange` hooks.
4. `robots.ts`, `sitemap.ts`, and `not-found.tsx` live in `src/app/` and call the shared SEO service.

## CMS model

1. No generic `Pages` collection. Each fixed page is its own Payload global with `admin.group: "Pages"`. Use a collection only for page types with many instances (case studies, blog posts).
2. A page global has one `group` field per section, not a reorderable blocks array.
3. Each section's field config and its component live together in the owning feature: `features/hero/cms/` defines `HeroSectionField`, `features/hero/components/` renders `HeroSection`, both exported from the barrel.
4. The route fetches the global and renders each section directly with its group data as props. No block registry, no `blockType` switch.
5. Shared field groups (SEO) live in `src/cms/fields/`. Core collections and globals live in `src/cms/collections/` and `src/cms/globals/`.
6. Global data is fetched with a typed helper: `getGlobalConfig(locale, "site-settings")`.
7. Media relations are unwrapped with a helper (`resolveMedia`), never by hand.

## Shared services

- `shared/services/seo/`: page metadata, JSON-LD, robots, sitemap. Functions self-fetch what they need, callers pass only `locale` and the page data.
- `shared/services/analytics/`: GA rendered once in the frontend layout, nothing when the env var is unset.
- `shared/services/content-dump/`: dump and restore of all CMS content, used by `pnpm dump` and `pnpm restore`.

## Payload gotchas

1. Run `pnpm generate:types` after every collection or global schema change. `payload-types.ts` is the source of truth for CMS types. Run `pnpm generate:importmap` after adding admin components.
2. The local `.env` database may be the production one. Run `pnpm dump` before any schema change.
3. Adding `required: true` to a field on a non-empty table makes the dev schema push TRUNCATE the table. Add the column as nullable, backfill, then set NOT NULL. Tell the user to answer "no" to the push data-loss prompt.
4. Keep frontend `locales` and Payload `cmsLocales` as separate constants. Narrowing the frontend list must never change the CMS localization schema.
5. Writing with `locale: "all"` silently drops data. Restore and seed scripts loop over real locale codes.
6. The dev server can block on an interactive schema push prompt in the user's terminal. If every request hangs after a schema change, ask the user to check their terminal.

## Env

Keep `.env.example` in sync with every variable the code reads. Typical set: `PAYLOAD_SECRET`, `POSTGRES_URL`, `NEXT_PUBLIC_SERVER_URL`, `REVALIDATE_SECRET`, `BLOB_READ_WRITE_TOKEN`, plus optional form, email, and analytics keys.

## Commands

`pnpm dev`, `pnpm devsafe` (clears `.next`), `pnpm build`, `pnpm lint`, `pnpm typecheck`, `pnpm format`, `pnpm generate:types`, `pnpm dump`, `pnpm restore` (dry-run by default, `--apply` to write).
