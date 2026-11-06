---
paths:
  - "src/**/*.{ts,tsx}"
  - "**/wp-content/themes/**"
---

# Feature-Driven Development architecture

Used in every project, both Next.js and WordPress. Stack details live in `nextjs-payload.md` and `wordpress.md`.

## Principles

1. All code lives in `src/`, which holds only two layers: `features/` and `shared/`. Stack exceptions are listed in the stack rules.
2. Colocation: everything for one section (markup, script, CMS field definitions, seed images) lives in one folder.
3. Content in code, values in the DB: CMS fields are declared next to the section that renders them. Templates and components hold no inline content.
4. Features are isolated. A feature never imports from another feature, only from `shared/`. If two features need the same thing, move it to `shared/`.

## features/

One folder per page or logical module: `src/features/{feature-name}/`. Each feature exposes only what is used outside through its barrel.

Common subfolders, created only when needed:

- `pages/` or `screens/`: page templates of the feature
- `sections/` (WP) or `components/` (Next): page sections and components
- `cms/` (Next) or `*.fields.php` next to a section (WP): CMS field definitions
- `api/`: API hooks, server actions, fetchers, form handlers
- `hooks/`, `stores/`, `utils/`, `lib/`, `modals/`, `cards/`, `constants/`, `types/`

If a folder would hold only 1 or 2 files, use a barrel file instead. Ask the user before creating non-standard folders or nested grouping.

## shared/

Reusable code, importable from any feature.

- `services/`: reusable features with the same structure as a feature, e.g. `services/seo`, `services/content-dump`
- `components/` (Next) or `widgets/` (WP): global UI in Atomic Design
  - `atoms/`: smallest pieces (button, input, icon, typography)
  - `molecules/`: a few atoms combined (search field, card)
  - `organisms/`: self-contained blocks (menu, footer, modal)
  - `templates/`: recurring page templates (Next only, rare)
- `helpers/`: global reusable functions, no markup
- `api/` (WP): shared API utilities such as forms
- `styles/`: Tailwind entry and other global CSS
- Rare, ask first: `constants/`, `configs/`, `types/`, `libs/`

## Page-level decoration

Decoration that belongs to a page, not to one section (background glow, page wrappers), is added in the page or route file. It never goes inside a reusable section and never into the root layout.
