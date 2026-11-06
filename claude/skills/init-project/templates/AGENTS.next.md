# AGENTS.md

Guidance for AI agents in this repo. Single source of truth: `CLAUDE.md` and `GEMINI.md` only import this file. Global rules (code style, FDD, Next.js + Payload) are loaded from `~/.claude/rules/`.

## What this is

{One or two sentences: the site, the client, which pages.}

Next.js (App Router) + Payload CMS 3 + PostgreSQL + Tailwind CSS v4. pnpm only. Hosted on {Vercel / other}.

## Commands

```bash
pnpm dev                 # dev server
pnpm devsafe             # clear .next, then dev
pnpm build
pnpm lint
pnpm typecheck
pnpm format
pnpm generate:types      # after any collection or global schema change
pnpm generate:importmap  # after adding admin components
pnpm dump                # dump all CMS content to data/
pnpm restore             # dry-run by default, --apply to write
```

## Docs

| Doc | Covers |
|---|---|
| {docs/file.md} | {what it covers} |

## Project specifics

{Locales, page globals, env vars beyond the standard set, which database the local .env points to, anything an agent must know that is not in the global rules. Delete this section if empty.}
