---
paths:
  - "**/wp-content/themes/**/woocommerce/**"
  - "**/wp-content/themes/**/src/features/shop/**"
  - "**/wp-content/themes/**/src/shared/helpers/woocommerce.php"
  - "data/**"
---

# WooCommerce

Applies only to WordPress sites that are stores. Base rules are in `wordpress.md`.

## Setup

1. Add `"woocommerce/woocommerce.php" => "WooCommerce"` to `get_required_plugins()` in `src/shared/helpers/dependencies.php`.
2. Run `app/setup/woocommerce-pages.sql` once on a new site. Cart and Checkout page bodies must contain only the WooCommerce shortcode, otherwise saved page content overrides the theme templates.

## Theme structure

1. All store pages (catalog, product, cart, checkout) are one `shop` feature: `src/features/shop/pages/` and `src/features/shop/sections/`.
2. Top-level WooCommerce templates stay in the theme `woocommerce/` folder: `archive-product.php`, `single-product.php`, `content-product.php`. They only render `shop` parts: `page("shop", "catalog")`, `page("shop", "product")`, `section("shop", "product-card")`.
3. Templates loaded through `wc_get_template()` are overridden in `src/features/shop/woocommerce/{wc path}`, e.g. `cart/cart.php`, `checkout/form-checkout.php`. `woocommerce_locate_template` in `src/shared/helpers/woocommerce.php` resolves them.
4. `src/shared/helpers/woocommerce.php` also turns off WooCommerce styles, add-to-cart notices, WC Admin, and extra order meta boxes. The theme owns all store UI.
5. Store page links use `get_store_page_url($page)`, never hardcoded URLs.

## Catalog data

1. When the agent changes products at scale (imports, bulk fixes, price updates), it uses scripts in `data/scripts/`, never manual edits in production. The client and the user edit products in wp-admin as usual. Use the `woocommerce-data` skill.
2. Machine-facing identifiers (SKU, slug, image filename) are ASCII only.
3. LocalWP and production catalogs drift apart. Check the production state before planning a fix based on local data.
