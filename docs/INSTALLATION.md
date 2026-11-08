# Installation & playing locally

[Back to the project](../README.md) · [Development guide](DEVELOPMENT.md)

## What you need

- Node.js and npm. The pinned Vite 5 toolchain requires Node.js 18+; use a supported Node.js LTS release for a new installation.
- Git, or a downloaded and extracted copy of the repository.
- A modern browser with JavaScript, browser storage and service workers enabled.

The game runs in your browser. No account, backend, audio-generation credentials or paid API is needed to play. Artwork and recorded audio are included, so allow time for the repository download and the first chapter load.

## Start the game

```sh
git clone https://github.com/keuperj/MonkeyBusiness.git
cd MonkeyBusiness
npm ci
npm run dev
```

Open the local address printed by Vite (normally `http://127.0.0.1:5173`). Choose **Enter Brindle Quay**, then **Start game**. Follow the chapter endings to continue through all five acts.

Do not open the HTML files directly with `file://`: module loading, asset downloads and service workers need a web server.

## Production build

```sh
npm run build
npm run preview
```

Open the preview address printed in the terminal. The build produces `dist/`, containing the game and its assets. Serve that directory over HTTPS; localhost is supported for local testing. Do not publish the source directory as if it were a built game.

For a host that serves the game from a subdirectory, supply its base path when building. For example:

```sh
npm run build -- --base=/MonkeyBusiness/
```

This is for a **playable game deployment**, not the separate promotional Pages site described in [PAGES.md](PAGES.md). Test chapter transitions, asset downloads and reloads on the actual deployment path before sharing it.

## Run permanently on Linux with systemd

This example serves the **built game**, starts automatically at boot and restarts after a server failure. It uses a dedicated, unprivileged Nginx process managed by `monkey-business.service`. Node.js is needed for building, not for serving the finished game. Do not run `npm run dev` or `npm run preview` as your production service.

The commands below assume a Debian/Ubuntu-style system with systemd, administrator access, **Nginx 1.19.5 or newer** at `/usr/sbin/nginx`, and MIME definitions at `/etc/nginx/mime.types`. Check with `nginx -v`: the unit uses `-e stderr`, introduced in 1.19.5, to avoid privileged startup-log paths. Use a supported distribution package meeting this requirement; older packages will reject that option. Other distributions may use different package commands and paths. The game is served at the site root, initially on **127.0.0.1:8080**; choose another unused port if necessary. This is separate from the promotional Pages site.

### 1. Build and copy only the production files

In your existing repository checkout, as your normal user:

```sh
npm ci
npm run build -- --base=/
```

For a public release, consider disabling debug starts **before building**; see the development guide’s debug switch section. On the host that will serve the game, install the web server and create a service account:

```sh
sudo apt-get update
sudo apt-get install nginx
sudo useradd --system --user-group --no-create-home \
  --home-dir /nonexistent --shell /usr/sbin/nologin monkey-business
sudo install -d -o root -g root -m 0755 /srv/monkey-business/site
sudo cp -R dist/. /srv/monkey-business/site/
sudo chown -R root:root /srv/monkey-business/site
sudo find /srv/monkey-business/site -type d -exec chmod 0755 {} +
sudo find /srv/monkey-business/site -type f -exec chmod 0644 {} +
```

Create the account only once. Run the copy command from the checkout containing `dist/` (or copy an equivalent build artifact from your build machine). Do not copy `.env`, the repository, or `node_modules` into the served directory. Files are root-owned and readable, but not writable, by the service account. Installing Nginx may also start the distribution’s default `nginx.service` on port 80; this example runs independently on port 8080. Do not disable an existing Nginx service used by other sites.

### 2. Configure the dedicated static server

Create `/etc/monkey-business-nginx.conf`:

```sh
sudo tee /etc/monkey-business-nginx.conf > /dev/null <<'EOF'
worker_processes 1;
pid /run/monkey-business/nginx.pid;
error_log stderr warn;

events {
    worker_connections 512;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    access_log /dev/stdout;
    sendfile on;
    server_tokens off;
    client_body_temp_path /run/monkey-business/client_temp;
    proxy_temp_path /run/monkey-business/proxy_temp;
    fastcgi_temp_path /run/monkey-business/fastcgi_temp;
    uwsgi_temp_path /run/monkey-business/uwsgi_temp;
    scgi_temp_path /run/monkey-business/scgi_temp;

    server {
        listen 127.0.0.1:8080;
        server_name localhost;
        root /srv/monkey-business/site;
        index index.html;

        # Revalidate HTML, manifests and service-worker files after updates.
        add_header Cache-Control "no-cache" always;
        add_header X-Content-Type-Options "nosniff" always;

        location / {
            try_files $uri $uri/ =404;
        }

        location ~ /\. {
            deny all;
        }
    }
}
EOF
```

This is a complete, independent Nginx configuration, not a snippet to paste into `/etc/nginx/nginx.conf`. It serves the real HTML entry points, including `/act2.html` through `/act5.html`; missing assets return 404 rather than an HTML fallback.

### 3. Create and enable the service

Create `/etc/systemd/system/monkey-business.service`:

```sh
sudo tee /etc/systemd/system/monkey-business.service > /dev/null <<'EOF'
[Unit]
Description=Monkey Buisness static game server
After=network.target

[Service]
Type=simple
User=monkey-business
Group=monkey-business
RuntimeDirectory=monkey-business
RuntimeDirectoryMode=0750
ExecStartPre=/usr/sbin/nginx -t -q -e stderr -p /run/monkey-business/ -c /etc/monkey-business-nginx.conf
ExecStart=/usr/sbin/nginx -e stderr -p /run/monkey-business/ -c /etc/monkey-business-nginx.conf -g "daemon off;"
Restart=on-failure
RestartSec=5s
KillSignal=SIGQUIT
TimeoutStopSec=30s
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/run/monkey-business
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
EOF

sudo systemd-analyze verify /etc/systemd/system/monkey-business.service
sudo systemctl daemon-reload
sudo systemctl enable --now monkey-business.service
sudo systemctl status monkey-business.service --no-pager
curl -I http://127.0.0.1:8080/
```

Systemd creates the writable runtime directory, runs the configuration check as the service account, and keeps Nginx in the foreground. The served files and system configuration remain read-only to the process. `enable --now` both starts the service immediately and enables startup at subsequent boots; it does not require a terminal to remain open.

Open `http://127.0.0.1:8080/` **on the same machine**. After a reboot, check `systemctl is-active monkey-business.service` and `systemctl is-enabled monkey-business.service`.

### 4. Remote access requires HTTPS

Do not simply expose port 8080 over HTTP for other players: the game’s service-worker/cache flow requires a secure context, with localhost as the development exception. Keep the backend bound to loopback and have an HTTPS reverse proxy on the same host forward your game domain’s root path to `http://127.0.0.1:8080`.

For example, in an **existing, correctly configured TLS Nginx server block** for your domain, the proxy location is:

```nginx
location / {
    proxy_pass http://127.0.0.1:8080;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```

This location is not a complete TLS setup: configure DNS, a valid certificate, HTTPS listening and firewall access for your host separately. Keep port 8080 private. If the TLS proxy is the distribution’s Nginx instance, validate with `sudo nginx -t` before `sudo systemctl reload nginx`. Check the game’s chapter downloads, audio, saves and act transitions through the final HTTPS address. Hosting below a URL prefix requires a matching build base and proxy mapping; the example above intentionally uses the domain root.

### Logs, updates and removal

```sh
# Recent logs, or follow new messages (Ctrl+C stops following, not the server).
sudo journalctl -u monkey-business.service -n 100 --no-pager
sudo journalctl -u monkey-business.service -f

# Stop or restart explicitly.
sudo systemctl stop monkey-business.service
sudo systemctl restart monkey-business.service
```

For an update, build a fresh `dist/` as your normal user first. Then schedule a brief maintenance window, stop the service, copy the new build and restart:

```sh
sudo systemctl stop monkey-business.service
sudo cp -R dist/. /srv/monkey-business/site/
sudo chown -R root:root /srv/monkey-business/site
sudo find /srv/monkey-business/site -type d -exec chmod 0755 {} +
sudo find /srv/monkey-business/site -type f -exec chmod 0644 {} +
sudo systemctl start monkey-business.service
curl -I http://127.0.0.1:8080/
```

This conservative copy retains old files, including hashed assets that an open browser tab may still request. It does not remove obsolete files; prune them separately only after reviewing what is safe to remove. Keep a backup of the previous build if rollback is needed. Browser saves remain client-side; changing the site origin will make existing saves unavailable at the new address.

After changing the unit file, run `sudo systemctl daemon-reload` and restart the service. After changing its Nginx configuration, restart it; `ExecStartPre` validates the configuration before startup. If repeated failures hit systemd’s start limit, fix the error shown in the journal, then run `sudo systemctl reset-failed monkey-business.service` followed by `sudo systemctl start monkey-business.service`.

To remove automatic startup and the custom service:

```sh
sudo systemctl disable --now monkey-business.service
sudo rm /etc/systemd/system/monkey-business.service
sudo systemctl daemon-reload
```

The served files, service account and `/etc/monkey-business-nginx.conf` are intentionally retained; remove them separately only if no longer needed. Remove any dedicated proxy route as well. Do not uninstall or stop shared Nginx infrastructure used by other sites.

Reference documentation:

```text
https://vite.dev/guide/static-deploy
https://nginx.org/en/docs/switches.html
https://www.freedesktop.org/software/systemd/man/latest/systemd.service.html
https://www.freedesktop.org/software/systemd/man/latest/systemd.exec.html
```

## Saves, sound & controls

- Click the floor to walk. Select an action, then a person or object; select a pocket item to use it.
- Open **Map** to travel and **Notebook** to review clues. **H** reveals hotspots.
- Use the expandable scene-object list as an alternative to canvas clicks.
- Autosaves and the separate manual save live in browser storage. Changing browser, profile, hostname or port does not transfer them. Clearing site data can delete progress.
- Sound can be muted. Subtitles remain available; reduced-motion preferences are respected.

## Troubleshooting

| Symptom | Try this |
| --- | --- |
| Assets stop downloading | Check the connection, then use **Retry**. Allow browser storage and service workers. |
| No sound | Interact with the page and check its sound toggle and browser audio permissions. |
| A saved game seems missing | Return to the same browser profile and exact site address used to play. |
| Blank page after deploying | Verify the Vite base path, HTTPS, and that the complete `dist/` directory was uploaded. |
| Old assets after development changes | Restart the dev server to regenerate manifests; see the development guide. Avoid clearing site data unless saves may be discarded. |

Chapter artwork/audio are cached for reuse. This is not a guarantee that a fresh visit will work offline: the application shell and manifests still need to load.