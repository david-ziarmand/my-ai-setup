---
name: copywriting
description: Write, edit, and humanize website text - new copy for pages and sections (headlines, hero, CTAs, value proposition, product and service descriptions), editing and proofreading existing copy, refreshing outdated content, removing AI-sounding patterns. Use when the user says "write copy", "rewrite this", "improve this text", "edit", "proofread", "tighten this", "sounds like AI", "make it sound human", "напиши текст", "перепиши" or "відредагуй".
---

# Copywriting

Router skill for any website text. Pick the reference for the task and read only what it needs.

| Task                                                                                | File                                          |
|-------------------------------------------------------------------------------------|-----------------------------------------------|
| New copy from scratch, or a full rewrite: page, section, headline, CTA, description | [copywriting.md](references/copywriting.md)   |
| Improve existing copy, proofread, tighten, fix one line                             | [copy-editing.md](references/copy-editing.md) |
| Final pass on any text to remove AI writing patterns                                | [humanizer.md](references/humanizer.md)       |

Supporting files, opened from the ones above when they point to them:

- [ai-tells.md](references/ai-tells.md): banned patterns with rewrites and the self-check
- [copy-frameworks.md](references/copy-frameworks.md): headline formulas, section types, page templates
- [natural-transitions.md](references/natural-transitions.md): transition phrases
- [checklist.md](references/checklist.md): full QA checklist for edits
- [content-refresh.md](references/content-refresh.md): refreshing outdated pages
- [plain-english-alternatives.md](references/plain-english-alternatives.md): simpler word choices

## Workflow

1. New text: `copywriting.md`, then `humanizer.md` as the last pass.
2. Existing text: `copy-editing.md`, then `humanizer.md` if it still reads as AI.
3. Messages to a client are not website copy. Use the `client-message` skill.

## Notes on the references

1. They are adapted third-party texts, see [LICENSE.txt](LICENSE.txt) for sources, licenses, and what was changed.
2. Examples are in English, the patterns apply to any language. Write in the site's language.
3. Output follows `~/.claude/rules/writing-style.md`: no em or en dashes anywhere.

## Before writing

1. Use real facts from the project `AGENTS.md`, `docs/`, the brief, or the user. Never invent numbers, clients, reviews,
   or results. Leave a clear placeholder instead.
2. Fit the design: respect the text length and structure of the approved layout.
3. Website texts go into CMS defaults, not markup: `default_value` or `seed` in `*.fields.php` in WordPress, the Payload
   global or seed data in Next.js.
