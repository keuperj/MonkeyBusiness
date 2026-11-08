# Development guide

[Project overview](../README.md) · [Installation](INSTALLATION.md) · [GitHub Pages styling](PAGES.md)

## Setup & commands

Follow the installation guide, then use the repository root as your working directory:

```sh
npm ci
npm run dev
npm run build
npx playwright install chromium
npm test
```

`npm run build` checks TypeScript and bundles every HTML entry with Vite. Both `predev` and `prebuild` run `scripts/chapter-assets.mjs` to regenerate chapter asset manifests. No generation API key is needed for normal development or testing.

Playwright starts the development server automatically and runs one worker. To use an existing Chromium installation:

```sh
CHROMIUM_PATH=/usr/bin/chromium-browser npm test
```

Set that path to the executable on your own machine. Useful focused checks:

```sh
npx playwright test tests/chapter.spec.ts tests/act2.spec.ts tests/act5.spec.ts
npx playwright test tests/room-geometry.spec.ts tests/hotspot-audit.spec.ts
git diff --check
```

Tests can write screenshots and reports under `test-results/`; subsequent runs may clear them. Preserve audit captures before another suite. Full playbook tests may update tracked walkthrough material: review the working tree before committing.

## Docker development/testing image with HTTPS

The separate `Dockerfile.dev` extends the Ubuntu-based game image with OpenSSL and a startup script that creates a self-signed certificate **inside the running container**, not during image construction. It serves a built snapshot with debug presets enabled; it is **not** a Vite hot-reload environment. Rebuild after editing source, or use `npm run dev` for live development.

### Build both stages

From the repository root, with Docker running:

```sh
docker build --pull --build-arg DEBUG_ENABLED=true -t monkey-business:dev-base .
docker build -f Dockerfile.dev -t monkey-business:dev .
```

`Dockerfile.dev` defaults to the local `monkey-business:dev-base` image. To use a different tag, pass `--build-arg GAME_IMAGE=your-tag`. Debug availability is determined by that base image; using the production base leaves it disabled. No Node.js or OpenSSL installation is needed on the host.

### Configure host address, port and certificate identity

These are separate settings:

| Setting | Meaning |
| --- | --- |
| `BIND_IP` in the host shell | Local host interface to which Docker publishes the port. Use `127.0.0.1` for local access, a host-owned LAN/public IPv4 address for a specific interface, or `0.0.0.0` for all host IPv4 interfaces. |
| `PUBLIC_PORT` in the host shell | Host TCP port, for example 8443 or 9443. The internal HTTPS port stays 8443. |
| `TLS_SAN` container environment | Certificate subject alternative names for the actual hostname/IP typed in the browser. Use `DNS:name` and/or `IP:address`, comma-separated. Do not include a URL scheme or port. |

Local-only example:

```sh
BIND_IP=127.0.0.1
PUBLIC_PORT=8443
TLS_SAN='DNS:localhost,IP:127.0.0.1'
docker volume create monkey-business-dev-certs
docker run -d --name monkey-business-dev \
  --restart unless-stopped \
  --read-only --tmpfs /tmp:rw,noexec,nosuid,size=32m \
  --cap-drop ALL --security-opt no-new-privileges:true \
  -p "${BIND_IP}:${PUBLIC_PORT}:8443" \
  -e "TLS_SAN=${TLS_SAN}" \
  -v monkey-business-dev-certs:/certs \
  monkey-business:dev
```

Visit `https://localhost:8443/` for those values. For a remote test, set `BIND_IP` to an interface on your server (or `0.0.0.0`), choose `PUBLIC_PORT`, and set `TLS_SAN` to the real address testers will use **before** running the command. For example, a DNS name belongs in `DNS:game-test.example.com`, whereas an IP literal belongs in `IP:192.168.1.50`; replace these examples with your actual addresses. A public IP supplied by NAT may not be an interface owned by the host: bind a local interface and configure router forwarding separately. Binding a port does not configure DNS, firewalls or NAT. An existing container must be recreated to change its published address, port or environment.

**Security:** debug presets and game assets are accessible to anyone who can reach this endpoint; there is no authentication. Prefer local/LAN-only access or restrict firewall rules to testers. Docker-published ports can bypass expected host firewall paths; review the Docker firewall documentation before public exposure. Never publish this development setup as the public production service.

### Certificate trust, persistence and renewal

The entrypoint generates an RSA-2048, SHA-256 certificate valid for 30 days, with the configured SANs. Private keys are created at runtime with restrictive permissions and are never baked into an image. The named volume keeps the certificate/key across container replacements. Do not commit, publish or share the private key. If using a bind mount instead, its directory must be writable by UID/GID 10001; the named-volume example handles initial ownership automatically.

**Browsers do not automatically trust self-signed certificates.** A warning is expected. Clicking through a warning may still leave service workers unavailable, so the game's chapter-loading flow can fail. For full testing, verify the certificate fingerprint and explicitly trust the certificate in the test browser/OS using that platform's certificate-management procedure. Do not disable certificate checking globally.

```sh
docker logs --tail 100 monkey-business-dev
docker exec monkey-business-dev openssl x509 -in /certs/server.crt \
  -noout -fingerprint -sha256 -dates -ext subjectAltName
docker cp monkey-business-dev:/certs/server.crt ./monkey-business-dev.crt
```

Only the public certificate is exported. Keep it outside version control and remove its trust entry when testing ends. The certificate is reused while its SANs match and it has more than one day left; a startup regenerates it when those conditions fail. A long-running container does not renew automatically: restart before expiry, and re-export/re-trust the new certificate after rotation. Changing SANs also requires trusting the newly generated certificate. For ordinary public hosting, use a certificate from a trusted CA instead.

The HTTPS health check uses `curl --insecure` **only inside the container** to test availability with its self-signed certificate; a healthy result does not prove that a browser trusts it.

### Updates and cleanup

Rebuild both images after changes, then stop/remove/recreate `monkey-business-dev` using the same volume and desired port mapping. The volume preserves certificate identity when SANs and validity still match. Browser saves remain browser-local and tied to the origin.

```sh
docker stop monkey-business-dev
docker rm monkey-business-dev
# Optional: permanently discard this development certificate and private key.
docker volume rm monkey-business-dev-certs
```

The runtime serves HTTPS only on 8443; the HTTP port metadata inherited from the base image does not start an HTTP listener. Source, npm dependencies and developer secrets are not served. The root `.dockerignore` excludes `.env*`, private-key/certificate files, local build output, walkthroughs and test captures from the build context. Release and development images are built for the active Docker platform; publishing multi-architecture images is a separate release task.

After building the production and development images, run the opt-in smoke test:

```sh
python3 scripts/test-docker.py monkey-business:local monkey-business:dev
```

It checks all act pages, an asset, HTTP/HTTPS health checks, non-root execution, debug settings, certificate SANs, private-key permissions, persistence and rotation. It creates temporary loopback-bound containers and a certificate volume and cleans them up afterwards. It does not configure browser trust or prove public network reachability.

References:

```text
https://docs.docker.com/engine/network/port-publishing/
https://docs.docker.com/engine/network/packet-filtering-firewalls/
https://docs.docker.com/build/building/multi-stage/
https://docs.openssl.org/master/man1/openssl-req/
```

## Architecture

| Area | Files / purpose |
| --- | --- |
| Entry points | `index.html`, `act2.html` through `act5.html`; isolated prototypes at `tavern-test.html` and `bridge.html` |
| Opening & introductions | `src/front.ts`, `src/front.css`, `src/intro-lines.json`, `src/act-arrival.ts`, `src/act-arrivals.json` |
| Act I | `src/chapter.ts`, `src/chapter-state.ts`, `src/chapter-scene.ts`, `src/chapter-lines.json`, `src/duel.json` |
| Later chapters | `src/act2-*` through `src/act5-*`: state, room data, rendering, dialogue and puzzles |
| Movement & clicks | `src/walkable-floor.ts`, `src/actor-layout.ts`, `src/scene-hotspots.ts`, `src/map-routes.ts` |
| Shared interface | `src/chapter.css`, `src/control-icons.ts`, `src/control-icons.css` |
| Artwork & audio | `public/assets/`, `public/audio/`; provenance in `ASSETS.md` and audio manifests |
| Debug starts | `public/debug-start.json`: configurable act/room progression presets and enable switch |
| Regression tests | `tests/`: browser playthroughs, saves, geometry, interactions, endings and playbooks |

Use the start menu's **Debug start** selector for targeted development. Debug presets are test progression, not a substitute for a normal-controls playthrough.

## Enable or disable start-page debug entries

Edit the top-level `enabled` field in `public/debug-start.json`:

- `"enabled": false` — hides **Debug · choose act and room** from the game’s start menu and disables direct `?debug=...` preset launches across all acts.
- `"enabled": true` — shows the selector and enables the configured presets again.

Change only this boolean; keep the existing `presets` array intact. Use the JSON booleans `true` / `false`, not quoted strings. The repository currently enables debug starts for development.

**Local development:** save the file and reload the page. The configuration is fetched at runtime with `cache: 'no-store'`; restarting Vite is not required. An already-open menu must be reloaded to pick up the change.

**Published game:** set `enabled` to `false` before running `npm run build`, then deploy the updated `dist/` output. The deployed configuration is `dist/debug-start.json`; changing the source file alone does not update an existing deployment. This option affects the game’s start menu, not the separate promotional `docs/index.html` page.

Disabling debug starts does not delete saves or remove normal **Start game**, **Load game**, or progress-based **Continue Act** buttons. Launching an enabled debug preset replaces that act’s autosave while keeping manual saves. The switch is a presentation/development setting, not a security boundary or a way to restrict access to shipped game content.

Re-enable debug starts before running tests or screenshot captures that use presets, including geometry/hotspot audits and promotional captures. Focused checks for the switch:

```sh
npx playwright test tests/debug-start.spec.ts tests/act2.spec.ts -g "disabled"
```

## Changing rooms or puzzles

1. Read the relevant act's room plan and implementation notes in this directory.
2. Update state validation, room data, scene rendering and puzzle interactions together. Preserve save compatibility or explicitly implement migration.
3. Keep floor polygons, actor placement and clickable bounds consistent with the rendered artwork. Sprite-bound hotspots should use the shared helper.
4. Test normal progression, reloads, alternate order and relevant debug states. Inspect screenshots: passing geometry tests alone do not establish visual alignment.
5. Run the build and focused regressions; review generated manifests and the git diff.

Static illustrated character poses use tweens and procedural animation; they are not frame-by-frame walking sprite sheets. Keep reduced-motion behavior, keyboard/touch alternatives, subtitles and sound controls intact.

## Artwork & audio generation

Existing assets are shipped with the project. Consult [asset provenance](../ASSETS.md) and the act-specific artwork notes before replacing them.

Optional audio regeneration uses the existing ElevenLabs scripts:

```sh
cp .env.example .env
npm run audio:plan
npm run audio:generate
```

Set `ELEVENLABS_API_KEY` only in the ignored `.env` file. Generation can incur provider charges; inspect the plan before generating. Never commit secrets or place them in browser code. Later acts use `scripts/generate-act2-audio.mjs` through `scripts/generate-act5-audio.mjs`; inspect the relevant script before running it. Provenance is recorded under `public/audio/`, while source manifests map speech to the shipped clips. Normal playback does not contact the generation API.

After editing assets while the server is running, regenerate chapter manifests:

```sh
node scripts/chapter-assets.mjs
```

## Promotional screenshots

The README and Pages site share clean, unannotated screenshots captured from gameplay. Regenerate intentionally:

```sh
CAPTURE_PROMO=1 npx playwright test tests/promotion.spec.ts
```

This writes tracked JPEGs in `docs/assets/screenshots/`. The test is skipped during normal runs so `npm test` does not silently replace promotional images. Review all three images before committing; debug presets are used to reach the pictured scenes without including walkthrough annotations.

## Further reading

- [Story plan](STORY_PLAN.md) and [map navigation](MAP_NAVIGATION.md)
- [Room headers](ROOM_HEADERS.md), [UI artwork](UI_ARTWORK.md), [chapter caching](CHAPTER_CACHE.md)
- [Room geometry audit](ROOM_GEOMETRY_AUDIT.md) and [hotspot audit](HOTSPOT_AUDIT.md)
- [Act II](ACT_2_IMPLEMENTATION.md), [Act III](ACT_3_IMPLEMENTATION.md), [Act IV](ACT_4_IMPLEMENTATION.md), [Act V](ACT_5_IMPLEMENTATION.md) implementation notes
- [Act V room plan](ACT_5_ROOM_PLAN.md) and [ending playbook](../playbook/Act-V/PLAYBOOK.md) (spoilers)

Some older planning documents describe earlier milestones; use current source and regression tests to confirm implemented behavior.