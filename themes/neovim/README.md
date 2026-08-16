# Synthpunk for Neovim

A Neovim colorscheme generated from the [Synthpunk](https://github.com/slowdini/synthpunk) palette.

## Variants

- `synthpunk-pastel-dark` — Pastel dark mode (cool, nocturnal vaporwave)
- `synthpunk-pastel-light` — Pastel light mode (warm, dreamy vaporwave)
- `synthpunk-neon-dark` — Neon dark mode (vivid vaporwave neon)
- `synthpunk-neon-light` — Neon light mode (bright vaporwave neon)

## Installation

### From this repository

The colorscheme files are plain Lua — no plugin manager required:

```bash
git clone https://github.com/slowdini/synthpunk /tmp/synthpunk
cp -r /tmp/synthpunk/themes/neovim/colors /tmp/synthpunk/themes/neovim/lua ~/.config/nvim/
```

Then in your Neovim config:

```lua
vim.cmd("colorscheme synthpunk-pastel-dark")
```

### Lazy.nvim

The standalone [`slowdini/synthpunk.nvim`](https://github.com/slowdini/synthpunk.nvim) mirror is not published yet — until it is, use the manual install above.

## Requirements

- Neovim >= 0.8 (for `vim.api.nvim_set_hl`)
- `termguicolors` enabled (set automatically)
