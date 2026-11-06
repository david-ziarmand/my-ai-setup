---
name: seo
description: SEO for a website - audit, title tags, meta descriptions, heading structure, meta robots, canonical, hreflang, Open Graph, structured data (JSON-LD, schema.org). Use when the user mentions SEO, "SEO audit", "title", "meta description", "H1", "headings", "noindex", "canonical", "hreflang", "Open Graph", "og:image", "social preview", "schema", "structured data", "rich results", "not ranking", or "not showing up in Google".
---

# SEO

Router skill. Pick the reference for the task and read only that file. Several files can apply to one task, e.g. a new
page needs title, description, headings, Open Graph, and schema.

| Task                                                                        | File                                                          |
|-----------------------------------------------------------------------------|---------------------------------------------------------------|
| Full or partial SEO audit, ranking or indexing problems, technical SEO      | [seo-audit.md](references/seo-audit.md)                       |
| Multi-language or multi-region site, hreflang and locale issues in an audit | [international-seo.md](references/international-seo.md)       |
| Checking content for AI writing patterns during an audit                    | [ai-writing-detection.md](references/ai-writing-detection.md) |
| `<title>` tag                                                               | [title-tag.md](references/title-tag.md)                       |
| Meta description                                                            | [meta-description.md](references/meta-description.md)         |
| H1 to H6 structure                                                          | [heading-structure.md](references/heading-structure.md)       |
| Meta robots, canonical, hreflang, viewport, charset                         | [page-metadata.md](references/page-metadata.md)               |
| Open Graph and social previews                                              | [open-graph.md](references/open-graph.md)                     |
| JSON-LD structured data                                                     | [schema-markup.md](references/schema-markup.md)               |
| Search Console: push pages that already rank onto page one, launch new pages | [google-search-console-ranking.md](references/google-search-console-ranking.md) |
| Local business: Google Business Profile, map pack, reviews, location pages  | [google-business-profile-seo.md](references/google-business-profile-seo.md) |

## Notes on the references

1. They are based on third-party texts, see [SOURCES.md](SOURCES.md).
2. `ai-writing-detection.md` keeps em dashes on purpose: they are examples of patterns to avoid.
3. Output still follows `~/.claude/rules/writing-style.md`, whatever tone the references use.

## Where SEO lives in our stacks

- WordPress: `src/shared/helpers/seo.php` (title, description, canonical, robots, OG), `seo-schema.php` (JSON-LD),
  `seo-fields.php` and each feature's `sections/seo/seo.fields.php` (editable fields), `llms.php`.
- Next.js + Payload: `src/shared/services/seo/` (metadata, json-ld, robots, sitemap), shared `seo` field group in
  `src/cms/fields/seo.ts`.

Change SEO through these, never with ad hoc tags in templates or pages.
