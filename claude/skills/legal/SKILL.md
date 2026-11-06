---
name: legal
description: Legal pages for a website - privacy policy, terms of service or terms and conditions, public offer, cookie policy, refund or return policy, shipping or delivery policy, legal footer. Use when the user mentions "privacy policy", "terms", "cookie policy", "GDPR", "cookie banner", "refund policy", "return policy", "shipping policy", "delivery", "legal pages", "публічна оферта", or "політика конфіденційності".
---

# Legal pages

Router skill. Pick the reference for the task and read only that file. Start with `legal-page-generator.md` when the
task covers several legal pages or the product category and jurisdiction are not clear yet.

| Task                                                                                            | File                                                                          |
|-------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| Which legal pages a site needs, product category, jurisdiction, indexing, platform requirements | [legal-page-generator.md](references/legal-page-generator.md)                 |
| Privacy Policy                                                                                  | [privacy-page-generator.md](references/privacy-page-generator.md)             |
| Terms of Service, terms and conditions, public offer                                            | [terms-page-generator.md](references/terms-page-generator.md)                 |
| Cookie Policy, cookie table, consent banner                                                     | [cookie-policy-page-generator.md](references/cookie-policy-page-generator.md) |
| Refund, return, cancellation, withdrawal                                                        | [refund-page-generator.md](references/refund-page-generator.md)               |
| Shipping and delivery                                                                           | [shipping-page-generator.md](references/shipping-page-generator.md)           |

## Notes on the references

1. They are based on third-party texts, see [SOURCES.md](SOURCES.md).
2. Output still follows `~/.claude/rules/writing-style.md`, whatever tone the references use.

## Before writing

1. Use only real facts: company or sole proprietor name, registration details, address, contacts, cookies the site
   actually sets, real delivery and return terms. Read them from the project, the brief, or ask. Never invent them,
   leave a clear placeholder instead.
2. The text is a draft, not legal advice. Tell the user the client should review it.
3. Write in the site's language. Ukrainian stores usually publish terms as "Публічна оферта" with the seller details
   there.

## Where legal pages live in our stacks

- WordPress: `THEME_POLICIES` in `src/shared/helpers/policies.php` maps slug to key. Texts are seeded from
  `src/features/policies/seed/{key}.html` and rendered by `page-policy.php` with a table of contents from the `<h2>`
  headings. Write the page as HTML with `<h2>` sections.
- Next.js + Payload: the `legal-pages` feature with its CMS config.
- Cookie consent: in WordPress GA loads only after consent (`THEME_COOKIE_CONSENT`). In Next.js check whether the
  analytics service waits for consent: in `easy-dev-website` it does not, GA renders as soon as its env var is set.
  The cookie table must match what the site really sets.
