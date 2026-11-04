# Preview image generator

Generates the marketing images used by the top-level [`README.md`](../../README.md):

| Output (`assets/`) | What it is |
| ------------------ | ---------- |
| `icon.png` | Optional angular-synthwave neon icon render (720×720) |
| `hero.png` | The same snippet rendered across all four variants (2×2 grid) |
| `sample-{language}-{variant}.png` | Sixteen previews: React/TSX, Python, Rust, and C# in each variant |
| `tool-vscode.png` | Synthetic VS Code interface preview, Neon Dark |
| `tool-zed.png` | Synthetic Zed interface preview, Neon Dark |
| `tool-neovim.png` | Synthetic Neovim interface preview, Neon Dark |
| `tool-wezterm.png` | Synthetic WezTerm interface preview, Neon Dark |
| `tool-starship.png` | Synthetic Starship interface preview, Neon Dark |

The language keys are `react`, `python`, `rust`, and `csharp`. Variant keys are
`pastel-dark`, `pastel-light`, `neon-dark`, and `neon-light`. For example,
`sample-react-pastel-dark.png` is the React/TSX sample in Pastel Dark.

Highlighting uses [Shiki](https://shiki.style). Each tool preview reads the colors
from its own target:

- VS Code uses the generated `themes/vscode/themes/*.json` themes.
- Zed uses the UI and syntax colors in `themes/zed/themes/synthpunk-neon.json`.
- Neovim uses the highlight groups returned by the existing Neovim target generator.
- WezTerm uses `themes/wezterm/synthpunk-neon-dark.toml`, including its tab bar,
  cursor, selection, and ANSI colors.
- Starship uses `themes/starship/starship.toml` and its `synthpunk_neon_dark` palette.

HTML is rendered by a Chromium-based browser through `puppeteer-core`. The tool
previews are generated illustrations, not screenshots.

## Regenerate

From the repository root, run:

```sh
bun install --frozen-lockfile
bun run assets
```

The `assets` command rebuilds all theme targets, installs this directory's locked
dependencies, and regenerates the hero, language previews, and tool previews. Branding
is unchanged by default; pass `--icon` to explicitly regenerate the icon as well. The
command is separate from `bun run build` so normal theme builds do not require a
browser.

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
[`preview-manifest.ts`](preview-manifest.ts). Synthetic interface renderers live in
[`tool-previews.ts`](tool-previews.ts) and the target-specific `zed-preview.ts`,
`neovim-preview.ts`, and `starship-preview.ts` modules.

This directory has its own dependency lockfile and is excluded from the root
TypeScript/biome checks. Its manifest and template tests run with the root `bun test`
command.
