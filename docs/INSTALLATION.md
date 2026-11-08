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