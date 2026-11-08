# Preview image generator

Generates the marketing images used by the top-level [`README.md`](../../README.md):

| Output (`assets/`) | What it is |
| ------------------ | ---------- |
| `icon.png` | Optional angular-synthwave neon icon render (720×720) |
| `hero.png` | The same snippet rendered across all four variants (2×2 grid) |
| `sample-{language}-{variant}.png` | Sixteen previews: React/TSX, Python, Rust, and C# in each variant |

The language keys are `react`, `python`, `rust`, and `csharp`. Variant keys are
`pastel-dark`, `pastel-light`, `neon-dark`, and `neon-light`. For example,
`sample-react-pastel-dark.png` is the React/TSX sample in Pastel Dark.

Highlighting uses [Shiki](https://shiki.style) with the generated
`themes/vscode/themes/*.json` themes, so the colors match what VS Code renders. HTML
is rendered by a Chromium-based browser through `puppeteer-core`.

The `vscode-*.png` and `zed-*.png` images in the README's "In action" section are
real screenshots and are not produced by this script.

## Regenerate

From the repository root, run:

```sh
bun install --frozen-lockfile
bun run assets
```

The `assets` command rebuilds all theme targets, installs this directory's locked
dependencies, and regenerates the hero and language previews. Branding is unchanged
by default; pass `--icon` to explicitly regenerate the icon as well. The command is
separate from `bun run build` so normal theme builds do not require a browser.

```sh
bun run assets -- --icon
```

The script auto-detects Google Chrome, Chromium, and Edge in the usual macOS/Linux
locations. Set `CHROME_PATH` when the browser is elsewhere or when using Chrome for
Testing / `chrome-headless-shell`:

```sh
CHROME_PATH="/path/to/chrome" bun run assets
```

Rendering uses a fixed viewport and 2× device scale. Typography uses Cascadia Code
when installed, with system monospace fallbacks; use the same browser and fonts when
reproducing the committed images. The code shown in each image lives in
[`snippets/`](snippets/). Preview inventory and naming live in
[`preview-manifest.ts`](preview-manifest.ts).

This directory has its own dependency lockfile and is excluded from the root
TypeScript/biome checks. Its manifest and option tests run with the root `bun test`
command.
