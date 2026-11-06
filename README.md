# My AI setup

Global knowledge base for Claude Code: rules, skills, settings, and a status line. Everything in `claude/` is installed
into `~/.claude/`, so it works in every project. Project-specific knowledge stays in each project (`AGENTS.md`, `docs/`,
`plans/`), created with the `init-project` skill.

Works on Windows (Git Bash), macOS, and Linux. Needs `bash`, `git`, and `node` (for the status line).

## Install

```bash
git clone https://github.com/david-ziarmand/my-ai-setup.git
cd my-ai-setup
./install.sh           # dry run: shows what would change
./install.sh --apply   # installs into ~/.claude
```

Then restart Claude Code.

- Every replaced file is backed up to `~/.claude/my-ai-setup-backups/{date-time}/`.
- Only files from this repo are touched. Other skills and settings folders in `~/.claude/` stay as they are.
- A rule or skill removed from the repo is removed from `~/.claude/` on the next `--apply`, also with a backup.
- `CLAUDE_CONFIG_DIR` installs into another folder instead of `~/.claude`.
- If `./install.sh` says `Permission denied`, run `chmod +x install.sh` once.

## Update

```bash
git pull
./install.sh --apply
```

Edit files here, in the repo, not in `~/.claude/`: the next install overwrites them.

## What is inside

| Path                   | What it is                                                                              |
|------------------------|-----------------------------------------------------------------------------------------|
| `claude/CLAUDE.md`     | Global context loaded in every session                                                  |
| `claude/settings.json` | Claude Code settings. `{{CLAUDE_HOME}}` is replaced on install                          |
| `claude/statusline.js` | Status line: model and effort, session and weekly limits, context tokens                |
| `claude/rules/`        | Rules, loaded automatically. Some always, stack rules only for matching files (`paths`) |
| `claude/skills/`       | Skills, loaded when a task needs them                                                   |
| `install.sh`           | Installer                                                                               |

### Rules

| Rule                  | Loads                     | About                                                               |
|-----------------------|---------------------------|---------------------------------------------------------------------|
| `writing-style.md`    | always                    | No dashes, straight quotes, plain language, which language for what |
| `agent-behavior.md`   | always                    | Permissions, push and production, verification, dev server          |
| `project-docs.md`     | always                    | `AGENTS.md`, `docs/`, `plans/`, where knowledge goes                |
| `code-style.md`       | always                    | Naming, comments, TypeScript, imports, barrels, Prettier            |
| `fdd-architecture.md` | TS and theme files        | Feature-Driven Development for both stacks                          |
| `nextjs-payload.md`   | Next.js and Payload files | Routes, CMS model, Payload gotchas                                  |
| `wordpress.md`        | theme and `app/` files    | Theme structure, helpers, SCF, gotchas                              |
| `woocommerce.md`      | store files and `data/`   | Shop feature, WooCommerce templates, catalog data                   |

### Skills

| Skill               | Use for                                                            |
|---------------------|--------------------------------------------------------------------|
| `init-project`      | Set up `AGENTS.md`, `docs/`, `plans/` in a new or existing project |
| `localwp`           | wp-cli, local DB, and Mailpit for LocalWP sites                    |
| `woocommerce-data`  | Scripted catalog imports and fixes, production pushes              |
| `wp-security-audit` | Security review of a WordPress theme before release                |
| `client-message`    | Messages and reports for clients                                   |
| `copywriting`       | Writing, editing, and humanizing website text                      |
| `seo`               | SEO audit, titles, meta, headings, Open Graph, schema              |
| `legal`             | Privacy, terms, cookie, refund, and shipping pages                 |

`copywriting`, `seo`, and `legal` are based on open source skills. See `SOURCES.md` in each skill folder.
