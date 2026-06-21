# Preview image generator

Generates the marketing images used by the top-level [`README.md`](../../README.md):

| Output (`assets/`)   | What it is                                                        |
| -------------------- | ----------------------------------------------------------------- |
| `icon.png`           | Angular-synthwave neon icon (1024×1024)                           |
| `hero.png`           | The same snippet rendered across all four variants (2×2 grid)     |
| `sample-react.png`   | React/TSX preview, Neon Dark                                       |
| `sample-python.png`  | Python preview, Neon Dark                                          |
| `sample-rust.png`    | Rust preview, Neon Dark                                            |
| `sample-csharp.png`  | C# preview, Neon Dark                                              |
| `sample-markdown.png`| Markdown preview, Neon Dark                                        |

Highlighting is done with [shiki](https://shiki.style) loaded with the repo's own
generated VS Code themes (`themes/vscode/themes/*.json`), so the colors match the
editor exactly. The highlighted HTML is screenshotted with the system Chrome via
`puppeteer-core`.

## Regenerate

Run after changing palette colors (and rebuilding the VS Code themes with
`bun run build` from the repo root):

```sh
cd assets/generate
bun install
bun run generate          # or: bun run generate.ts
```

Requires a Chromium-based browser. The script auto-detects Google Chrome, Chromium,
and Edge in the usual macOS/Linux locations; set `CHROME_PATH` to override:

```sh
CHROME_PATH="/path/to/chrome" bun run generate
```

The code shown in each image lives in [`snippets/`](snippets/) — edit those files to
change the sample code. This directory is excluded from the repo's `tsc`/biome checks
(see `tsconfig.json` and `biome.json`); its `node_modules/` is git-ignored.
