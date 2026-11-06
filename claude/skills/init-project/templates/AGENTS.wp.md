# AGENTS.md

Guidance for AI agents in this repo. Single source of truth: `CLAUDE.md` and `GEMINI.md` only import this file. Global rules (code style, WordPress, WooCommerce) are loaded from `~/.claude/rules/`.

## What this is

{One or two sentences: the site, the client, landing / multi-page / store.}

WordPress theme + Tailwind CSS v4 + SCF. Local dev via LocalWP. Deploy via manual FTP GitHub Action.

Theme: `app/public/wp-content/themes/{theme-name}/`.

## Docs

| Doc | Covers |
|---|---|
| [architecture.md](docs/architecture.md) | Repo layout, theme structure |
| [basic-utilities.md](docs/basic-utilities.md) | PHP helpers, forms |
| [website-content.md](docs/website-content.md) | Editable content (SCF fields, seeding) |
| [tooling-and-styling.md](docs/tooling-and-styling.md) | Tailwind, icons, lint and format |

## Cheat sheet

- Build styles from the theme folder: `npm run dev`, `npm run build`
- Render: `page()`, `section()`, `widget()`, `icon()`
- Read content: `theme_field("name")`
- No automated tests, verify in LocalWP and the browser

## Project specifics

{Deviations from the global rules, hosting limits, required plugins beyond SCF, anything an agent must know that is not in docs. Delete this section if empty.}
