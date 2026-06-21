# Synthpunk WezTerm Themes

Auto-generated WezTerm color scheme files for all 4 Synthpunk variants.

## Installation

1. Copy the desired `.toml` file(s) to `~/.config/wezterm/colors/`
2. In your `wezterm.lua`, set the color scheme:

```lua
local wezterm = require 'wezterm'
local config = {}

config.color_scheme = 'Synthpunk Pastel Dark'

return config
```

Available color schemes:

- `Synthpunk Pastel Dark` (synthpunk-pastel-dark.toml)
- `Synthpunk Pastel Light` (synthpunk-pastel-light.toml)
- `Synthpunk Neon Dark` (synthpunk-neon-dark.toml)
- `Synthpunk Neon Light` (synthpunk-neon-light.toml)

## Regenerating

Run `bun run build` from the repo root.