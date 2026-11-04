<p align="center">
  <img src="assets/readme.png"
    alt="synthpunk — High-energy synthwave color schemes"
    width="845" />
</p>

# Synthpunk

High-energy synthwave-inspired color themes in two families — **Pastel** and **Neon** — each with dark and light variants. Every theme is generated from a single [palette source](palette/) for VS Code, Zed, Neovim, WezTerm, and Starship.

![Synthpunk — the same code across all four variants](assets/hero.png)

## Preview

Syntax highlighting across all four variants (click any image for full size):

### Pastel Dark

| React / TSX | Python | Rust | C# |
| ----------- | ------ | ---- | -- |
| <a href="assets/sample-react-pastel-dark.png"><img src="assets/sample-react-pastel-dark.png" alt="Synthpunk Pastel Dark — React / TSX" width="200" /></a> | <a href="assets/sample-python-pastel-dark.png"><img src="assets/sample-python-pastel-dark.png" alt="Synthpunk Pastel Dark — Python" width="200" /></a> | <a href="assets/sample-rust-pastel-dark.png"><img src="assets/sample-rust-pastel-dark.png" alt="Synthpunk Pastel Dark — Rust" width="200" /></a> | <a href="assets/sample-csharp-pastel-dark.png"><img src="assets/sample-csharp-pastel-dark.png" alt="Synthpunk Pastel Dark — C#" width="200" /></a> |

### Pastel Light

| React / TSX | Python | Rust | C# |
| ----------- | ------ | ---- | -- |
| <a href="assets/sample-react-pastel-light.png"><img src="assets/sample-react-pastel-light.png" alt="Synthpunk Pastel Light — React / TSX" width="200" /></a> | <a href="assets/sample-python-pastel-light.png"><img src="assets/sample-python-pastel-light.png" alt="Synthpunk Pastel Light — Python" width="200" /></a> | <a href="assets/sample-rust-pastel-light.png"><img src="assets/sample-rust-pastel-light.png" alt="Synthpunk Pastel Light — Rust" width="200" /></a> | <a href="assets/sample-csharp-pastel-light.png"><img src="assets/sample-csharp-pastel-light.png" alt="Synthpunk Pastel Light — C#" width="200" /></a> |

### Neon Dark

| React / TSX | Python | Rust | C# |
| ----------- | ------ | ---- | -- |
| <a href="assets/sample-react-neon-dark.png"><img src="assets/sample-react-neon-dark.png" alt="Synthpunk Neon Dark — React / TSX" width="200" /></a> | <a href="assets/sample-python-neon-dark.png"><img src="assets/sample-python-neon-dark.png" alt="Synthpunk Neon Dark — Python" width="200" /></a> | <a href="assets/sample-rust-neon-dark.png"><img src="assets/sample-rust-neon-dark.png" alt="Synthpunk Neon Dark — Rust" width="200" /></a> | <a href="assets/sample-csharp-neon-dark.png"><img src="assets/sample-csharp-neon-dark.png" alt="Synthpunk Neon Dark — C#" width="200" /></a> |

### Neon Light

| React / TSX | Python | Rust | C# |
| ----------- | ------ | ---- | -- |
| <a href="assets/sample-react-neon-light.png"><img src="assets/sample-react-neon-light.png" alt="Synthpunk Neon Light — React / TSX" width="200" /></a> | <a href="assets/sample-python-neon-light.png"><img src="assets/sample-python-neon-light.png" alt="Synthpunk Neon Light — Python" width="200" /></a> | <a href="assets/sample-rust-neon-light.png"><img src="assets/sample-rust-neon-light.png" alt="Synthpunk Neon Light — Rust" width="200" /></a> | <a href="assets/sample-csharp-neon-light.png"><img src="assets/sample-csharp-neon-light.png" alt="Synthpunk Neon Light — C#" width="200" /></a> |

The exact colors for every variant live in [`palette/`](palette/) — the source all themes are generated from. Preview images are produced by [`assets/generate/`](assets/generate/).

## In action

Generated interface previews in **Neon Dark**. These illustrations use generated theme colors for each supported tool; they are not screenshots.

<table>
  <tr><th>VS Code</th><th>Zed</th></tr>
  <tr>
    <td><a href="assets/tool-vscode.png"><img src="assets/tool-vscode.png" alt="Synthpunk Neon Dark — generated VS Code interface preview" width="420" /></a></td>
    <td><a href="assets/tool-zed.png"><img src="assets/tool-zed.png" alt="Synthpunk Neon Dark — generated Zed interface preview" width="420" /></a></td>
  </tr>
  <tr><th>Neovim</th><th>WezTerm</th></tr>
  <tr>
    <td><a href="assets/tool-neovim.png"><img src="assets/tool-neovim.png" alt="Synthpunk Neon Dark — generated Neovim interface preview" width="420" /></a></td>
    <td><a href="assets/tool-wezterm.png"><img src="assets/tool-wezterm.png" alt="Synthpunk Neon Dark — generated WezTerm interface preview" width="420" /></a></td>
  </tr>
  <tr><th colspan="2">Starship</th></tr>
  <tr><td colspan="2" align="center"><a href="assets/tool-starship.png"><img src="assets/tool-starship.png" alt="Synthpunk Neon Dark — generated Starship interface preview" width="840" /></a></td></tr>
</table>

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
bun run assets       # rebuild themes and README images (requires Chrome/Chromium)
bun test             # run tests
bun run check        # lint + typecheck
bun run format       # auto-format
```

All theme files under `themes/` are generated from `palette/` by the generator. Never edit them directly — edit `palette/` and `generator/`, then run `bun run build`. To rebuild the themes and README images in one step, run `bun run assets`. See [`assets/generate/`](assets/generate/) for browser requirements and rendering details.

## License

[MIT](LICENSE)
