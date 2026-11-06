# Project docs

How agent instructions and docs are organized inside a project.

## Agent files

1. `AGENTS.md` is the single source of truth for all AI agents. `CLAUDE.md` and `GEMINI.md` contain only one line: `@AGENTS.md`.
2. `AGENTS.md` stays short: what the project is, stack, commands, a table of `docs/` files, and project-specific deviations from the global rules.
3. Do not copy global rules (code style, writing style, agent behavior) into `AGENTS.md`. They are loaded from `~/.claude/rules/`.
4. Do not list things that can be read from the code and go stale: current features, file trees, component tables. Point to the folder instead.

## docs/

1. `docs/` holds the detailed reference for the project: architecture, helpers, content, styling, deployment, data scripts.
2. Few files, each covering one area. Merge small related topics into one file.
3. When a change affects what a doc describes, update the doc in the same task.

## plans/

1. Each nontrivial task (more than one file, or with open decisions) gets a plan before code: `plans/{NN}-{short-slug}.md`, numbered in creation order.
2. `plans/00-INDEX.md` lists all plans in a table: number, plan, priority, status. Check it before planning work that may already have a plan.
3. Ground each plan in the real codebase (file paths, patterns to reuse) and list open decisions for the user.
4. When a plan ships, delete its file and its row in the index.

## Where knowledge goes

1. Project facts useful to anyone working on the repo (hosting limits, API credential scopes, known gotchas, data rules) go to `docs/`, so they travel with git.
2. Rules that apply to every project go to the global rules in `~/.claude/rules/`, not to project docs or memory.
3. Memory is only for personal context that fits neither place.
4. `README.md` is for humans: what the project is and how to run it.
