<p align="center">
  <img src="assets/readme.png"
    alt="synthpunk — High-energy synthwave color schemes"
    width="845" />
</p>

# Synthpunk

High-energy synthwave-inspired color themes in two families — **Pastel** and **Neon** — each with dark and light variants. Every theme is generated from a single [palette source](palette/) for VS Code, Zed, Neovim, WezTerm, and Starship.

![Synthpunk — the same code across all four variants](assets/hero.png)

## Preview

Syntax highlighting in the **Neon Dark** variant (click any image for full size):

| React / TSX | Python | Rust |
| ----------- | ------ | ---- |
| <a href="assets/sample-react.png"><img src="assets/sample-react.png" alt="Synthpunk Neon Dark — React/TSX" width="260" /></a> | <a href="assets/sample-python.png"><img src="assets/sample-python.png" alt="Synthpunk Neon Dark — Python" width="260" /></a> | <a href="assets/sample-rust.png"><img src="assets/sample-rust.png" alt="Synthpunk Neon Dark — Rust" width="260" /></a> |

| C# | Markdown | |
| -- | -------- | - |
| <a href="assets/sample-csharp.png"><img src="assets/sample-csharp.png" alt="Synthpunk Neon Dark — C#" width="260" /></a> | <a href="assets/sample-markdown.png"><img src="assets/sample-markdown.png" alt="Synthpunk Neon Dark — Markdown" width="260" /></a> | |

The exact colors for every variant live in [`palette/`](palette/) — the source all themes are generated from. Preview images are produced by [`assets/generate/`](assets/generate/).

## Installation

The VS Code and Zed extensions are **not yet on their marketplaces** (listings are coming soon) — for now, install them as developer extensions from a clone of this repo. The WezTerm and Starship configs download directly from [GitHub releases](https://github.com/slowdini/synthpunk/releases).

For VS Code, Zed, and Neovim, start by cloning the repo:

```sh
git clone https://github.com/slowdini/synthpunk.git
```

### VS Code

1. Copy or symlink `themes/vscode/` into `~/.vscode/extensions/`
2. Restart VS Code
3. Run `Preferences: Color Theme` and pick a variant

See [`themes/vscode/README.md`](themes/vscode/README.md) for details.

### Zed

1. Open **Extensions** in Zed (or run `zed: extensions`)
2. Click **Install Dev Extension** (or run `zed: install dev extension`)
3. Select the `themes/zed/` directory
4. Pick a variant from the theme picker (`theme selector: toggle`)

See [`themes/zed/README.md`](themes/zed/README.md) for details.

### Neovim

Copy the colorscheme files from the clone into your Neovim config:

```sh
cp -r synthpunk/themes/neovim/colors synthpunk/themes/neovim/lua ~/.config/nvim/
```

Then load a variant:

```lua
vim.cmd("colorscheme synthpunk-pastel-dark")
```

Variants: `synthpunk-pastel-dark`, `synthpunk-pastel-light`, `synthpunk-neon-dark`, `synthpunk-neon-light`. See [`themes/neovim/README.md`](themes/neovim/README.md) for details.

### WezTerm

```sh
mkdir -p ~/.config/wezterm/colors
curl -fsSL https://github.com/slowdini/synthpunk/releases/latest/download/synthpunk-pastel-dark.toml -o ~/.config/wezterm/colors/synthpunk-pastel-dark.toml
```

Then set `config.color_scheme = 'Synthpunk Pastel Dark'` in your `wezterm.lua`. The other variants download the same way (`synthpunk-pastel-light.toml`, `synthpunk-neon-dark.toml`, `synthpunk-neon-light.toml`). See [`themes/wezterm/README.md`](themes/wezterm/README.md) for all variants.

### Starship

```sh
curl -fsSL https://github.com/slowdini/synthpunk/releases/latest/download/starship.toml -o ~/.config/starship.toml
```

The default variant is `synthpunk_pastel_dark`. To switch, change the `palette =` line to `synthpunk_pastel_light`, `synthpunk_neon_dark`, or `synthpunk_neon_light`. Icons require a [Nerd Font](https://www.nerdfonts.com/). See [`themes/starship/README.md`](themes/starship/README.md) for details.

## Development

```sh
bun install          # install dependencies
bun run build        # regenerate all theme artifacts from palette/
bun test             # run tests
bun run check        # lint + typecheck
bun run format       # auto-format
```

All theme files under `themes/` are generated from `palette/` by the generator. Never edit them directly — edit `palette/` and `generator/`, then run `bun run build`. To regenerate the preview images above, see [`assets/generate/`](assets/generate/).

## License

[MIT](LICENSE)
