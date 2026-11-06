---
name: localwp
description: Work with a LocalWP WordPress site from the terminal - find the site, check it is running, run wp-cli, reach the database, read captured emails in Mailpit. Use when a task needs wp-cli, SQL against the local DB, checking wp_mail, or when the local site does not respond.
---

# LocalWP

LocalWP puts no `php`, `wp`, or `mysql` on PATH. Everything below is found through its data folder, called `{local}` below. Its location depends on the OS: find the `Local` folder in the user's app data or config directory that contains `sites.json`.

| OS | `{local}` | Status |
|---|---|---|
| Windows | `%APPDATA%\Local` (`C:\Users\{user}\AppData\Roaming\Local`) | verified on a real setup |
| macOS | `~/Library/Application Support/Local` | from the LocalWP forum, not verified here |
| Linux | `~/.config/Local` | from the LocalWP forum, sources disagree, check that `sites.json` exists there |

## 1. Find the site

`{local}/sites.json` maps site id to config. Match the project by `path` (the project root). Useful fields:

- `id`: also the run dir name, `{local}/run/{id}/`
- `domain`: e.g. `my-site.local`
- `services.php.version`, `services.mysql.version`, and their `ports`
- `services.mailpit.ports.WEB`: Mailpit web UI port
- `mysql`: database `local`, user `root`, password `root`

## 2. Check it is running

`{local}/site-statuses.json` holds `"{id}": "running"` or `"halted"`.

- The DB and site work only while the site is started in the LocalWP app. Starting and stopping is done by the user, never by the agent.
- A halted site still answers `http://{domain}/` with HTTP 200 and a router error page. Never treat a 200 as proof that the site works, check the status file or the page content.

## 3. Run wp-cli

1. PHP binary `{php}`: inside `{local}/lightning-services/php-{version}+{n}/bin/`, where `{version}` comes from `sites.json`. The platform subfolder and file name differ per OS, so find the `php` executable in that folder.
2. wp-cli: use `wp-cli.phar` in the project root (gitignored). If missing, download it once:
   `curl -L -o wp-cli.phar https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar`
3. Always pass the site's rendered `php.ini` so `localhost` reaches the LocalWP MySQL:

```bash
"{php}" -c "{local}/run/{id}/conf/php/php.ini" wp-cli.phar --path="{project}/app/public" option get siteurl
```

Example, Windows only (verified on a real setup):

- `{local}`: `%APPDATA%\Local`, i.e. `C:\Users\{user}\AppData\Roaming\Local`
- `{php}`: `{local}\lightning-services\php-8.2.35+0\bin\win64\php.exe`
- `{project}`: e.g. `D:\Projects\my-site`

```bash
"$APPDATA/Local/lightning-services/php-8.2.35+0/bin/win64/php.exe" \
  -c "$APPDATA/Local/run/{id}/conf/php/php.ini" \
  wp-cli.phar --path="D:/Projects/my-site/app/public" option get siteurl
```

4. Keep `DB_HOST=localhost` as in `wp-config.php`. Do not force `127.0.0.1:{port}`, MySQL may not listen on TCP from outside.
5. Write commands (`post update`, `option update`, `db query` with UPDATE or DELETE) follow the same rules as any data change: say what changes first, back up with `wp db export` for bulk changes.

## 4. Emails

LocalWP captures all outgoing mail in Mailpit. Open `http://localhost:{mailpit WEB port}` to check WooCommerce emails and form submissions sent through `wp_mail`.

## 5. New site from a template

1. User creates an empty folder and a LocalWP site pointing at it, then trusts the SSL certificate in LocalWP.
2. Set the wp-admin language to English.
3. Merge the template repo files into the folder without overwriting LocalWP files.
4. Install and activate Secure Custom Fields, run `app/setup/cleanup.sql`, build styles, seed content from Tools, Seed content.
