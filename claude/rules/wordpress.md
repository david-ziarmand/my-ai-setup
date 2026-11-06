---
paths:
  - "**/wp-content/themes/**"
  - "app/**"
  - ".github/workflows/deploy.yml"
---

# WordPress

Stack: WordPress, custom theme, Tailwind CSS v4 CLI, Secure Custom Fields (SCF), LocalWP for local dev, manual FTP deploy from GitHub Actions. Starter repo: `template-wordpress`. Its `docs/` folder is the detailed reference, this file is the summary.

## Repo layout

- `app/public/`: WordPress root. Only the custom theme in `app/public/wp-content/themes/{theme}/` and `app/public/.htaccess` are tracked. Core, plugins, uploads, `wp-config.php` are gitignored.
- `app/setup/`: one-off SQL for a clean project. `app/sql/`, `conf/`, `logs/`: LocalWP, gitignored.
- `data/`: optional, only for stores with scripted catalog changes over REST.
- `.github/workflows/deploy.yml`: manual FTP deploy of `app/public/`, never touches `wp-content/uploads/`.
- `.idea/`: only `*.iml`, `modules.xml`, `vcs.xml`, `scopes/` are tracked.

## Theme

- `style.css`: metadata only, including `Requires Plugins: secure-custom-fields`.
- Core templates: `index.php`, `header.php`, `footer.php`, `functions.php`, `front-page.php`, `page.php`, `404.php`, `maintenance.php`.
- Custom page: `page-{slug}.php` calls `get_header()`, renders a feature page with `page()`, calls `get_footer()`.
- `assets/`: compiled CSS, `icons/`, `fonts/`, `images/`, `vendor/`. No PHP or JS source here.
- `src/features/{feature}/pages/{page}.php` and `src/features/{feature}/sections/{section}/` with `{section}.php`, optional `{section}.fields.php`, optional `{section}.js`, `seed-images/`.
- `src/shared/widgets/{atoms,molecules,organisms}/{widget}/`: same shape as a section.
- `src/shared/helpers/`, `src/shared/api/`, `src/shared/styles/theme.css` (Tailwind entry) and `src/shared/styles/fonts.css`.

## Render helpers

From `src/shared/helpers/import-functions.php`:

- `page($feature, $page, $args, $deps)`, `section($feature, $section, $args, $deps)`, `widget($widget, $args, $deps)`
- `$args` keys become PHP variables through `extract()`, so they must be camelCase, never kebab-case.
- `$deps` enqueues registered script handles. A sibling `{name}.js` is enqueued automatically, only when the part renders.
- `icon($name, $class)` inlines `assets/icons/{name}.svg`. Never paste raw `<svg>` into templates. Monochrome icons use `currentColor`, colored variants are separate SVG files with the color baked in.

## Editable content (SCF)

1. All content is edited in wp-admin under "Site Content", one subpage per site page, all stored in one global options store.
2. Fields are declared in code in `*.fields.php` returning `["name", "label", "order", "group", "fields"]`. `name` matches the section folder. Every SCF `key` is globally unique and starts with `field_`.
3. Templates read values with `theme_field($selector)` only, no second argument and no inline defaults.
4. Defaults: scalars use `default_value`, image, gallery, and repeater fields use `seed` (filenames from `seed-images/`). Seed once per environment from Tools, Seed content.
5. Subpages are curated in `theme_content_pages()` in `scf.php`. A section joins a subpage through its `group` key.

## Section template convention

1. All values are read and escaped in the top PHP block: `$title = esc_html(theme_field("hero_title"));`.
2. Repeaters are pre-processed there into clean escaped arrays.
3. Markup only prints bare `<?= $title ?>`. No `esc_*` calls inside HTML.

## PHP style

- Variables and functions camelCase, array keys kebab-case, except external contract keys (hooks, SCF field names, AJAX actions, request keys).
- Declare argument and return types where possible.
- Every PHP file starts with `defined("ABSPATH") || exit();`.

## Styling and tooling

Run from the theme folder: `npm run dev`, `npm run build`, `npm run format`, `npm run lint`. Output `assets/css/style.css` is generated, committed, never edited by hand, and enqueued with a `filemtime` version.

## Forms

`src/shared/api/forms.php` and `forms.js` handle every AJAX form: `[data-website-form]`, nonce, hidden empty honeypot input `website`, rate limit per IP, result in `[data-form-message]`. A part that needs it passes `"website-forms"` in `$deps`.

## Gotchas

1. New Tailwind classes in PHP have no effect until `npm run build`. Rebuild before reporting a change as done.
2. A brand-new SCF option field may return empty instead of its `default_value` until its admin tab is saved once.
3. LocalWP must be running for the DB and site to work. A stopped site still returns HTTP 200 with an error page. See the `localwp` skill for wp-cli access.
4. `wp_ajax_*` handlers always check the nonce, and admin actions also check `current_user_can()`.
