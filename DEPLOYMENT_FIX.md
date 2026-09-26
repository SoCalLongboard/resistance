# Deployment Incident: 404 on /resistance/ (2026-09-26)

## Symptom

The app was already built and deployed to the Hostinger VPS
(`apps.michaelnaumann.com`), and nginx already had a site config for it —
but `https://apps.michaelnaumann.com/resistance/` returned `404`.

## Investigation

Connected to the VPS (`mnaumann@85.31.232.133`) and checked the deployment
directly:

- The built files were present and correct at
  `/home/mnaumann/APPS/resistance/` (`index.html`, `favicon.svg`,
  `assets/index-*.js`, `assets/index-*.css`), matching this repo's `dist/`
  output with the correct `/resistance/...` asset paths from the
  `base: '/resistance/'` Vite config.
- `/etc/nginx/sites-available/resistance` existed and had a correct
  `location /resistance/ { alias ...; }` block.
- So the deployment itself was fine — the problem was purely nginx routing.

**Root cause:** Two separate nginx server blocks both declared
`listen 443 ssl; server_name apps.michaelnaumann.com;`:

- `sites-available/resistance` (the one with the needed `/resistance/`
  location)
- `sites-available/new-horizons-locator` (added later, for an unrelated
  app, with only a `location /new-horizons/` proxy block)

nginx does not merge `location` blocks across two server blocks that share
an identical `server_name` + port — it picks one (alphabetically,
`new-horizons-locator` sorted before `resistance` in `sites-enabled/`) and
ignores the other entirely. Confirmed empirically:

| Request | Before fix |
|---|---|
| `GET /new-horizons/` | `200` |
| `GET /resistance/` | `404` |
| `GET /some-random-path` | `404` (identical to `/resistance/` — proving the `resistance` server block was never even consulted) |

(Also noted, unrelated to this fix: a leftover Traefik container
(`traefik-3iqb-traefik-1`) is crash-looping because ports 80/443 are already
held by the system nginx. It's not part of the active routing for any site
on this box and was left alone.)

## Fix applied

1. Merged the `resistance` app's location block into
   `/etc/nginx/sites-available/new-horizons-locator` (the config block
   nginx was actually using for `apps.michaelnaumann.com:443`):

   ```nginx
   location /resistance/ {
       alias /home/mnaumann/APPS/resistance/;
       index index.html;
       try_files $uri $uri/ =404;
   }
   ```

2. Disabled the now-redundant site to prevent the conflict recurring:
   ```bash
   sudo rm /etc/nginx/sites-enabled/resistance
   ```
   (`sites-available/resistance` was left on disk for reference/rollback.)

3. Validated and reloaded:
   ```bash
   sudo nginx -t && sudo systemctl reload nginx
   ```

4. Verified:
   ```bash
   curl -sk -o /dev/null -w '%{http_code}\n' https://apps.michaelnaumann.com/resistance/                     # 200
   curl -sk -o /dev/null -w '%{http_code}\n' https://apps.michaelnaumann.com/resistance/favicon.svg           # 200
   curl -sk -o /dev/null -w '%{http_code}\n' https://apps.michaelnaumann.com/resistance/assets/index-BoW--rE2.js  # 200
   curl -sk -o /dev/null -w '%{http_code}\n' https://apps.michaelnaumann.com/new-horizons/                    # 200 (unaffected)
   ```

## Access notes

The `mnaumann` account on the VPS has no passwordless `sudo` by default.
To apply the fix, a temporary scoped `NOPASSWD` grant was added at
`/etc/sudoers.d/91-resistance-fix` (restricted to `nginx`,
`systemctl reload nginx`, and the specific `tee`/`rm` calls needed for this
change), then removed again after the fix was verified:

```bash
sudo rm /etc/sudoers.d/91-resistance-fix
```

## Outcome

`https://apps.michaelnaumann.com/resistance/` serves the app correctly. No
changes were needed in this repository — the build and deployed files were
already correct; the issue was entirely a server-side nginx configuration
conflict between two sites sharing the same `server_name`.
