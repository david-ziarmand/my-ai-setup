---
name: woocommerce-data
description: Scripted WooCommerce catalog work over the REST API and WP-CLI - imports from supplier files or feeds, bulk product fixes, price updates, variations, images, pushing data to production. Use for any task that changes many products at once or touches production catalog data.
---

# WooCommerce data

Catalog changes at scale go through scripts in `data/` (repo root, separate from the theme). Shared helpers live in `data/scripts/lib/wc-api.ts`. The starter is in `https://github.com/Easy-Dev-Company/template-wordpress` under `data/` and `docs/data-pipeline.md`.

## Before any work

1. Ask where the change goes: LocalWP only, or production too. Never assume production.
2. LocalWP and production catalogs drift apart. Before planning a production fix from local data, read the production state over the REST API (read-only) and compare. Never assume a bug count found locally transfers.
3. Back up first: `wp db export` locally, a REST dump of affected products for production.

## Credentials (`data/.env`)

Gitignored. `data/.env.example` lists the variables. Two separate credential types:

1. WooCommerce REST keys (`WOOCOMMERCE_CONSUMER_KEY`, `_SECRET`): only `/wp-json/wc/v3/...` (products, variations, categories, attributes, orders).
2. WordPress Application Password (`WORDPRESS_USERNAME`, `WORDPRESS_APPLICATION_PASSWORD`): everything the user account can do, including `/wp/v2/media`. Needed for any image upload.

A 401 on one namespace usually means the script uses the wrong credential type.

## Production writes

1. Scripts are dry-run by default and write only with `--live`.
2. Run the dry-run, show the summary (how many products created, updated, skipped), and wait for explicit confirmation before `--live`. Every live run needs its own confirmation.
3. There is no SSH or FTP file access, only REST. An existing attachment cannot be renamed. To replace an image, upload a new one with `uploadMedia()` and repoint the product `images` at the new id.
4. Auto mode blocks production scripts even after the user says yes in chat. The working way: with the user's OK, add an exact allow rule to `.claude/settings.local.json`, e.g. `Bash(IMPORT_CSV=output/file.csv npx tsx scripts/push-to-production.ts*)`. Run `cd data` as a separate call, no `cd &&`, no pipes, so the command matches the rule verbatim. Remove the rule afterwards.

## Identifiers

1. SKU, slug, and image filenames are ASCII only. Always `transliterate()` before `slugify()`, since `slugify()` keeps Cyrillic letters.
2. Validate the generated CSV or payload: fail if any SKU, slug, or filename has a non-ASCII character. Do not rely on noticing it by eye.
3. Watch for homoglyphs: a Cyrillic letter typed instead of its Latin twin survives transliteration. Check with the `HOMOGLYPHS` map or an ASCII-only check.
4. Resolve name collisions with a meaningful Latin prefix (category such as `dyvan-`, `lizhko-`), never by concatenating raw source text.
5. Sanitize source image filenames to ASCII before copying or uploading.

## Variations and attributes

1. Size, fabric, color are global attributes (`pa_size`, `pa_fabric`, `pa_color`) used for variations, never baked into the product name or SKU.
2. Colors come from the actual gallery photos, not from description text (description colors are often trim or frame colors).
3. Adding a color creates a full set of variations crossed with the other attributes, at the same price.
4. Set each color variation's `image_id` to its real gallery photo, so the swatch click moves the gallery to it.
5. A new color term needs a hex entry in the theme color map, otherwise it falls back to the default.
6. Renaming a parent product resyncs variation titles automatically on save.

## WooCommerce CSV importer

`import-local.php` with `update_existing: true` only updates. Rows with new SKUs are skipped. To add new products or variations, run a second pass with `IMPORT_UPDATE_EXISTING=0`.

## SCF content between environments

`dump-scf-content.php` and `push-scf-content.php` copy "Site Content" texts through WP-CLI. Images and relations are skipped because attachment ids differ. The push has no dry-run: review the JSON and get confirmation before pushing to production.

## Report

After a run: counts (created, updated, skipped, failed), list of failures with SKU, and what is left to do. Document any new script and its flags in `docs/data-pipeline.md`.
