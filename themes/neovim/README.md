# Synthpunk for Neovim

A Neovim colorscheme generated from the [Synthpunk](https://github.com/slowdini/synthpunk) palette.

## Variants

- `synthpunk-pastel-dark` — Pastel dark mode (cool, nocturnal vaporwave)
- `synthpunk-pastel-light` — Pastel light mode (warm, dreamy vaporwave)
- `synthpunk-neon-dark` — Neon dark mode (vivid vaporwave neon)
- `synthpunk-neon-light` — Neon light mode (bright vaporwave neon)

## Installation

### Manual (no plugin manager)

```bash
git clone https://github.com/slowdini/synthpunk /tmp/synthpunk
cp -r /tmp/synthpunk/themes/neovim/* ~/.config/nvim/
```

Then in your Neovim config:

```lua
vim.cmd("colorscheme synthpunk-pastel-dark")
```

### Lazy.nvim

```lua
{
  "slowdini/synthpunk",
  dir = "~/path/to/synthpunk/themes/neovim",
  lazy = false,
  priority = 1000,
  config = function()
    vim.cmd("colorscheme synthpunk-pastel-dark")
  end,
}
```

## Requirements

- Neovim >= 0.8 (for `vim.api.nvim_set_hl`)
- `termguicolors` enabled (set automatically)
