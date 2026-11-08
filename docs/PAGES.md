# GitHub Pages & visual identity

[Project overview](../README.md) · [Installation](INSTALLATION.md) · [Development](DEVELOPMENT.md)

## Prepared site

`docs/index.html` is a standalone, responsive promotional page sharing the README’s logo and three gameplay screenshots. It includes a compact top-left logo with navigation to its right, a decorative serif motto beneath the menu, scene-art feature cards and a 12-second looping GIF trailer. The small `assets/trailer.js` script supplies pause/replay controls; no framework, external fonts or site build step is needed. Publishing this documentation folder does **not** publish a playable game.

Guide links open Markdown on GitHub using `HEAD`, without assuming a default branch name. Images and CSS use relative paths for repository-subdirectory hosting. `docs/.nojekyll` keeps the site as plain HTML/CSS.

## Preview

From the repository root:

```sh
python3 -m http.server 8000 --directory docs --bind 127.0.0.1
```

Open `http://127.0.0.1:8000/`. Alternatively, with Vite running, preview `/docs/index.html`.

## Publish

1. Commit and push the documentation and assets.
2. In **Settings → Pages**, select **Deploy from a branch**.
3. Select the branch containing these files and the **/docs** folder, then save.
4. Wait for deployment and use the address reported by GitHub. Check images, guide links and mobile layout there.

No repository setting has been changed locally. If Pages already serves a playable game, do not replace its publishing source blindly: integrate the landing page into that deployment or host the two separately. For a playable deployment, build Vite with the correct base path and publish `dist/`, as described in the installation guide. Only add a “Play online” link after verifying a live game URL.

## Style kit

| Element | Source / purpose |
| --- | --- |
| Logo | `docs/assets/game-logo.jpg`: resized from `public/assets/game-logo.png`, retaining original spelling |
| Favicon | `docs/assets/favicon.svg`: original compass motif in the site palette |
| Theme | `docs/assets/site.css`, separate from gameplay CSS |
| Screenshots | `docs/assets/screenshots/{map,sword-fight,puzzle}.jpg` |
| Harbour / deep water | `--harbour: #102c30`, `--deep-water: #08191d` |
| Brass / parchment | `--brass: #e7bd70`, `--parchment: #f3e3c2` |
| Teal / ink / rope | `--teal: #23545a`, `--ink: #302419`, `--rope: #967343` |
| Typography | Georgia/system serif headings; system sans-serif body |
| Components | `.masthead`, `.masthead-motto`, `.button`, `.card`, `.eyebrow`, `.gallery`, `.invitation` |

Restrained brass borders, dark harbour panels, parchment-colored lettering and illustrated cards echo the game without placing prose over busy artwork. A shared `--content-width: 960px` track aligns the trailer and screenshot edges; the logo is capped at 140px and shrinks on narrow screens. The motto uses an italic Palatino/Georgia serif stack with a brass flourish. The page has a skip link, semantic sections, visible keyboard focus, image alternatives, narrow-screen layout and reduced-motion handling. GitHub’s README renderer does not use this custom CSS.

The logo derivative does not replace the original game asset; existing provenance applies. Keep promotional images honest: use the opt-in screenshot test in the development guide rather than presenting mockups as gameplay.

## Validate

### Regenerate artwork and trailer

```sh
python scripts/generate-site-art.py
```

Requires Pillow, already used by the repository’s map-composition workflow. Set `SITE_FONT` to an installed TrueType serif font if the default Linux DejaVu Serif path is unavailable. The script crops navigation icons from the shipped pirate UI atlas, derives feature art from the promotional screenshots, and builds `docs/assets/trailer.gif` and `trailer-poster.jpg`. Regenerate the promotional screenshots first if gameplay art changes. Crops are based on their 1440px capture layout.

The trailer is a stylized montage of actual game captures with camera moves, titles and crossfades—not a live gameplay recording. The GIF loops; **Pause trailer** replaces it with a still, and **Replay trailer** restarts it. Reduced-motion users receive the still through a `picture` media source, including without JavaScript. Navigation wraps to the right of the smaller logo on narrow screens, and the motto remains visible beneath it. Decorative icons keep visible text labels for accessibility.

### Checks

```sh
npx playwright test tests/pages.spec.ts
npm run build
git diff --check
```

Tests check image loading, desktop/mobile layout, keyboard access and reduced motion. Live GitHub deployment remains a separate check requiring repository access.

Official deployment references:

```text
https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
https://vite.dev/guide/static-deploy
```