# Chapter downloads

Starting or loading Act I opens an illustrated loading screen before the intro or gameplay. The existing original cover illustration supplies the background. The progress bar measures completed asset bytes, not an artificial timer. Four concurrent downloads limit connection contention. Failed downloads keep completed files and offer Retry; the game is not entered with an incomplete cache.

`npm run dev` and `npm run build` generate `public/chapter-assets.json` from the current artwork and audio. Entries include byte sizes and SHA-256 revisions. Regenerate with `node scripts/chapter-assets.mjs` after changing assets while a development server is already running. Current assets all belong to Act I; when adding chapters, split this list by chapter and pass the appropriate manifest to the loading flow.

Files are saved in browser Cache Storage. Matching revisions are reused; changed assets are downloaded again. The same-origin service worker serves cached art and audio, including audio byte-range requests. Phaser initializes only after the cache is complete. JavaScript, styles and story JSON are loaded by the application bundle before the loading screen is shown.

Deployment requires HTTPS (localhost works for development), service workers and browser storage. Browser cache eviction or clearing site data causes a new download. Storage failures are reported on the loading screen. This is asset precaching, not a promise that the application can be opened offline: the HTML/application shell and manifest still need a connection on a new visit. Existing offline play can use the downloaded chapter assets.
