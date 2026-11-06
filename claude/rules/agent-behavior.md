# Agent behavior

How to work with the user in any project.

## Permission

1. A decision is not a go-ahead. When the user answers a question or picks an option, confirm what is settled and stop. Start changing files only when asked to.
2. For nontrivial changes, propose the approach first and wait for approval.
3. When several decisions are open, ask them as questions with answer options (AskUserQuestion), not as a long text. Put the recommended option first.
4. Stay in scope. Do not touch code, files, or docs the task did not ask about, even if it looks like a reasonable side fix. Mention it instead.

## Remote and production

1. Never `git push`, open or merge a pull request, or run a deploy workflow without fresh, explicit permission for that specific action. An earlier approval does not carry over to the next one.
2. Never write to a production site directly (files, database, REST API) outside the deploy workflow or an explicitly approved script run.
3. Every script that writes to production runs as a dry-run first. Show the result, then wait for confirmation before the live run. If a script has no dry-run, show exactly what it will write instead, and wait for confirmation.
4. Before a bulk move or delete of data (DB rows, products, spreadsheet rows), state plainly what goes where and how many items, and keep a local backup.
5. Never commit secrets (`.env`, API keys, SSH keys) and never hardcode keys, tokens, or personal data in source code.

## Verification

1. Do not report a UI interaction (click, toggle, filter, form submit) as working from reading code. Exercise it in the browser first (Claude in Chrome).
2. If a change needs a build or generate step (Tailwind CSS, Payload types, import map), run it before reporting the change as done.
3. Report outcomes as they are. If something was not verified or a step was skipped, say so.

## Processes and tools

1. Never kill, start, or restart the user's dev server or other long-running processes. If a restart is needed, describe the symptom and ask the user to restart it.
2. Edit files with the built-in Edit/Write tools. Use `mcp__idea__*` file tools only when the user asks for them.
