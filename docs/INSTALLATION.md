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

## Run with Docker (no local Node.js installation)

Install Docker Engine or Docker Desktop and Git first. The repository includes an Ubuntu 24.04-based multi-stage `Dockerfile`: it obtains the Node.js 22 toolchain, installs locked npm dependencies, builds the game, then copies the finished files into a fresh Ubuntu image with Nginx. Build tools are not retained in the runtime image. The initial build needs Internet access; artwork and audio are already in the repository, so no generation API credentials are needed.

### Build and start

```sh
git clone https://github.com/keuperj/MonkeyBusiness.git
cd MonkeyBusiness
docker build --pull -t monkey-business:local .
docker run -d --name monkey-business \
  --restart unless-stopped \
  --read-only --tmpfs /tmp:rw,noexec,nosuid,size=32m \
  --cap-drop ALL --security-opt no-new-privileges:true \
  -p 127.0.0.1:8080:8080 \
  monkey-business:local
```

Open `http://127.0.0.1:8080/` on the Docker host. To use another local port, change the mapping to, for example, `127.0.0.1:9090:8080`; keep the final container port at 8080. The image serves the game at the URL root, not under a subdirectory. It runs as non-root UID/GID 10001 and disables debug presets by default **inside the build**, without modifying your checkout.

Docker must be running. The restart policy restarts the container after Docker restarts unless you explicitly stopped it; configure Docker itself to start with your computer if required. No separate game systemd service is needed. The container health check reports HTTP availability; an unhealthy status alone does not automatically restart a still-running process.

### Public hosting

The command above deliberately binds to localhost only. For other players, put a trusted HTTPS reverse proxy in front of the container and forward the domain root to this backend. Do not expose plain HTTP on a public address: chapter caching/service workers need a secure browser context (localhost is the development exception).

A proxy running directly on the same host can use `http://127.0.0.1:8080`. A proxy in another container must reach the game over a shared Docker network; its own localhost is not the game container. Configure DNS, certificates and firewall rules for your hosting environment separately.

For development-only remote HTTPS access with a self-signed certificate and configurable host IP/port, see **Docker development/testing image with HTTPS** in [the development guide](DEVELOPMENT.md). Self-signed certificates are not a substitute for trusted public-hosting certificates.

### Status, logs and updates

```sh
docker ps --filter name=monkey-business
docker logs --tail 100 monkey-business
docker inspect --format '{{.State.Health.Status}}' monkey-business
docker stop monkey-business
docker start monkey-business
```

To update, select the desired repository revision (for example, `git pull --ff-only` on a clean tracking branch), rebuild, then replace the container:

```sh
docker build --pull -t monkey-business:local .
docker stop monkey-business
docker rm monkey-business
```

Run the same `docker run` command above to start the replacement. Build before stopping the old container so a build failure does not interrupt play. `--pull` checks base images; use `--no-cache` as well when intentionally refreshing cached OS-package installation layers. Keep a version-tagged older image if you need rollback. Replacements briefly interrupt requests; verify chapter downloads and act transitions afterwards.

Saves stay in each player's browser, not in a Docker volume. Keeping the same browser and site origin preserves access to those saves; changing scheme, hostname or port changes the origin. To uninstall, stop and remove the container, then optionally remove its image with `docker image rm monkey-business:local`.

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