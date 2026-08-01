# WAVEBENDER — Voice FX Console

A browser-based voice changer with 24 effects, built as an installable Progressive Web App. Record your voice, transform it, and share or save the result — all processed locally, with nothing ever uploaded.

## Features

- **24 voice effects** across 6 color-coded categories: Pitch & Size, Speed, Character, Space & Ambience, Lo-Fi & Texture, and Novelty
- **Instant preview** — record once, tap any effect to hear it applied immediately
- **Share or save** — send results straight to Messages, Instagram, or any app that accepts audio, or export as a WAV file
- **Favorites** — star your go-to effects so they're easy to find again
- **Light / dark mode** toggle with a clean, glass-and-neon interface
- **Installable PWA** — adds to your phone's home screen and works offline
- **100% local processing** — built on the Web Audio API, no server, no accounts, no uploads

## Getting started

1. Clone or download this repository.
2. Push it to a GitHub repo and enable **Settings → Pages** (or host it on any static file server).
3. Open the live link on your phone in Chrome (Android) or Safari (iOS).
4. Tap **Install App** in the header, or use your browser's "Add to Home Screen" option.
5. Open the installed app, tap **Record**, and start experimenting with effects.

No build step, no dependencies, no installation required to run it — it's plain HTML, CSS, and JavaScript.

## Files

| File | Purpose |
|---|---|
| `voice-changer.html` | The app itself — UI, audio engine, and all 24 effects |
| `manifest.json` | PWA metadata (name, icons, theme colors, install behavior) |
| `service-worker.js` | Enables offline caching and installability |
| `icon-192.png` / `icon-512.png` | App icons used on the home screen and app switcher |

All five files must be hosted in the same folder for installation and offline mode to work correctly.

## Tech stack

Vanilla HTML, CSS, and JavaScript — no frameworks, no build tools, no external runtime dependencies. Effects are built with native Web Audio API nodes (filters, delays, convolution reverb, waveshaping, and ring modulation).

## Notes

- Microphone access requires the page to be served over HTTPS (or `localhost`) — it will not work opening the file directly from disk.
- If the app seems stuck on an old version after an update, clear the site's cache or reinstall it — the service worker updates automatically when online.

## License

Free to use, modify, and share.
