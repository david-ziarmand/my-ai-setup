---
name: wp-security-audit
description: Security audit of a WordPress theme before a release or deploy. Use when the user asks for a security audit, security review, "перевір безпеку", or before the production deploy of a WordPress or WooCommerce site.
---

# WordPress security audit

Read-only audit of the custom theme and `data/` scripts. Report findings, do not fix anything until the user picks what to fix.

## Checklist

### AJAX and REST handlers

1. Every `wp_ajax_*` and `wp_ajax_nopriv_*` handler calls `check_ajax_referer()` with its own nonce.
2. Every handler that changes data (orders, products, settings, users) checks `current_user_can()` with a fitting capability. Logged in is not enough: customers are logged in too.
3. `register_rest_route()` always has a real `permission_callback`, never `__return_true` for write routes.
4. Request params are validated and bounds-checked before use (array index, IDs, enums).

### Secrets and personal data

1. No API keys, tokens, passwords, or JWTs in theme PHP or JS. The theme ships to the public web root over FTP, so anything in it is public.
2. No real personal data (names, emails, phones, addresses) in templates, form `value` attributes, or seed files.
3. `.env`, SSH keys, DB dumps, and `data/` outputs are gitignored.

### Output

1. Every dynamic value in markup is escaped with the right function: `esc_html`, `esc_attr`, `esc_url`, `wp_kses_post`.
2. Admin-entered values are escaped too (PDF invoices, emails, order screens).

### Forms and uploads

1. Public forms have a nonce, a honeypot, and a per-IP rate limit.
2. Uploads check type and size, and uploaded files are deleted after use when they are not needed.
3. User-generated content (reviews, comments) is not auto-published without moderation.

### JavaScript

1. `fetch` helpers check `res.ok` before calling `.json()` and show a friendly error.
2. No secrets in localized script data (`wp_localize_script`, `wp_add_inline_script`).

### Config

1. `style.css` declares `Requires Plugins` for every hard dependency.
2. Debug output is off in production: no `var_dump`, `print_r`, `error_log` with personal data.
3. `maintenance.php` and the 503 guard let only administrators through.

## Report

Group findings as Critical, Medium, Low. For each: file and line, what is wrong, what an attacker or a user could do, and the suggested fix. Then ask which ones to fix.
