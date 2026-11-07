---
name: init-project
description: Set up Claude knowledge for a project. Detects the stack (WordPress or Next.js + Payload), creates AGENTS.md, CLAUDE.md, GEMINI.md, plans/ and docs/ from templates, and checks base configs. Use when the user says "init project", "init claude", "налаштуй проєкт", or opens a new or existing repo that has no AGENTS.md yet.
---

# Init project

Prepares a repo so that only project knowledge lives in it. Global rules come from `~/.claude/rules/` and are never copied into the project.

## 1. Detect the stack

- WordPress: `app/public/wp-content/` exists, or a theme `style.css` with `Theme Name:`.
- Next.js + Payload: `package.json` has `next` and `payload`.
- Empty folder: ask which stack, then point the user to the starter repo:
  - WordPress: `https://github.com/Easy-Dev-Company/template-wordpress`. Order matters: create an empty folder, create the LocalWP site in it, click Trust on the SSL certificate, set wp-admin language to English, then merge the template files in.
  - Next.js: `https://github.com/Easy-Dev-Company/template-nextjs`.
- Anything else: ask the user before going further.

## 2. Read what exists

Read existing `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `README.md`, `docs/`, `plans/`, `.gitignore`, and lint configs. Never overwrite an existing file. If it exists, propose a merge and show what changes.

## 3. Create agent files

1. `AGENTS.md` from `templates/AGENTS.wp.md` or `templates/AGENTS.next.md`. Fill in the real project name, what the site is, theme path or app paths, and commands. Remove template lines that do not apply. For a WooCommerce store keep the `@~/.claude/rules/woocommerce.md` import line, for any other site delete it.
2. `CLAUDE.md` and `GEMINI.md`, each with a single line: `@AGENTS.md`.
3. `plans/00-INDEX.md` from `templates/plans-index.md`.
4. `docs/`: if the project was not made from the starter template, copy the docs from it. If it was, update them to the project: remove what the project dropped, add what it adds. List every doc in the `AGENTS.md` docs table.

If the project already has a long `CLAUDE.md` that repeats global rules, propose moving project-specific parts to `AGENTS.md` and `docs/`, and dropping the rest. Do it only after the user agrees.

## 4. Check base configs

- Next.js: `.prettierrc.json`, `.prettierignore`, `eslint.config.mjs` exist. Missing ones come from `templates/next/`. Existing ones are left as they are.
- WordPress: theme has `package.json`, `.prettierrc.json`, `eslint.config.mjs`, `style.css` with `Requires Plugins`.
- `.gitignore` covers `.env`, secrets, build output, and `.idea/` except shared files. Next.js keeps only `.idea/runConfigurations/`, WordPress keeps the files listed in the `wordpress` rule.
- Next.js: no leftover template pieces. The placeholder `src/app/icon.svg` is replaced with the project icon, the `hero` example with real sections, and there are no GitHub workflows the project does not use.
- `.env.example` exists when the code reads env vars.
- A page container utility exists: max width for the design width (usually 1440px), equal side gutters on wide screens.

## 5. Report

List created files, proposed merges, and missing pieces. Do not commit. Committing and pushing need the user's explicit go-ahead.
