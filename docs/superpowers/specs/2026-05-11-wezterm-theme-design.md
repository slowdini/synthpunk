# WezTerm Theme Target Design

## Overview

Add WezTerm as a new theme target for the Synthpunk color scheme generator. This will be the first terminal emulator theme, producing TOML color scheme files that users install into `~/.config/wezterm/colors/`.

## Motivation

Synthpunk currently generates themes for VSCode and Zed. WezTerm is a popular, GPU-accelerated terminal emulator with a growing user base. Adding it as a target expands the theme's reach and establishes the terminal theme generation pattern for future terminal targets (Alacritty, Kitty, etc.).

## Approach

**Approach 3: Generator target + separate `palette/terminal-mapping.json`**

Create a new `terminal-mapping.json` palette file for terminal-UI role mappings (cursor, selection, tab bar, scrollbar, etc.), keeping concerns separate from the editor-focused `ui-mapping.json`. This makes the terminal mapping reusable for future terminal emulator targets.

## New Files

### `palette/terminal-mapping.json`

Terminal-agnostic UI role → palette color name mappings:

```json
{
  "$schema": "../schemas/terminal-mapping.json",
  "info": {
    "name": "synthpunk-terminal",
    "description": "Terminal-agnostic UI role to palette color mappings",
    "version": "0.1.0"
  },
  "cursor": {
    "bg": "lavender",
    "fg": "base",
    "border": "lavender"
  },
  "selection": {
    "fg": "text",
    "bg": "teal",
    "bg_alpha": 0.3
  },
  "tab_bar": {
    "background": "mantle",
    "active_tab": {
      "bg": "base",
      "fg": "text"
    },
    "inactive_tab": {
      "bg": "mantle",
      "fg": "subtext1"
    },
    "new_tab": {
      "bg": "mantle",
      "fg": "subtext1"
    }
  },
  "scrollbar": {
    "thumb": "subtext1",
    "thumb_hover": "subtext0"
  },
  "split": "surface1",
  "compose_cursor": "flamingo",
  "quick_select": {
    "label_bg": "peach",
    "label_fg": "base",
    "match_bg": "teal",
    "match_fg": "base"
  },
  "copy_mode": {
    "active_highlight_bg": "teal",
    "active_highlight_fg": "base",
    "inactive_highlight_bg": "overlay",
    "inactive_highlight_fg": "text"
  }
}
```

### `schemas/terminal-mapping.json`

JSON schema validating the terminal mapping structure.

### `generator/src/targets/wezterm.ts`

WezTerm TOML generator. Main export:

```ts
function generateWeztermTheme(
  variant: VariantName,
  palette: Palette,
  terminalMapping: TerminalMapping,
  uiMapping: UIMapping,
): Record<string, unknown>
```

Produces a plain object that gets serialized to TOML.

### `generator/src/targets/wezterm.test.ts`

Unit tests for the WezTerm generator.

### `themes/wezterm/` (output directory)

Generated TOML files:
- `synthpunk-pastel-dark.toml`
- `synthpunk-pastel-light.toml`
- `synthpunk-neon-dark.toml`
- `synthpunk-neon-light.toml`

## Modified Files

### `generator/src/types.ts`

Add `TerminalMapping` type alongside existing types.

### `generator/src/uiMapping.ts` (or new `terminalMapping.ts`)

Add `loadTerminalMapping()` function to read `palette/terminal-mapping.json`.

### `generator/src/index.ts`

Add WezTerm generation loop alongside existing VSCode and Zed generation. For each of the 4 variants, load the palette, generate the theme object, serialize to TOML, and write to `themes/wezterm/`.

### `generator/package.json`

Add a TOML serialization dependency (e.g., `smol-toml` or manual string builder).

## WezTerm TOML Output Format

Each TOML file will contain:

```toml
# synthpunk-pastel-dark.toml
[colors]
foreground = "#F0E0F0"
background = "#1E1028"
cursor_bg = "#C49BFF"
cursor_fg = "#1E1028"
cursor_border = "#C49BFF"
selection_fg = "#F0E0F0"
selection_bg = "#5ED4E0"
scrollbar_thumb = "#C8B0D8"
split = "#3A2850"
compose_cursor = "#FF9BB6"

[colors.tab_bar]
background = "#160A20"

[colors.tab_bar.active_tab]
bg_color = "#1E1028"
fg_color = "#F0E0F0"

[colors.tab_bar.inactive_tab]
bg_color = "#160A20"
fg_color = "#C8B0D8"

[colors.tab_bar.new_tab]
bg_color = "#160A20"
fg_color = "#C8B0D8"

ansi = ["#0D0612", "#FF5470", "#7FD7B5", "#FFE4B5", "#8BA4FF", "#FF7DB0", "#5ED4E0", "#C8B0D8"]
brights = ["#A090B8", "#FF5470", "#7FD7B5", "#FFE4B5", "#8BA4FF", "#FF7DB0", "#5ED4E0", "#F0E0F0"]
```

### Color Mappings

**Core terminal colors** (from `terminal-mapping.json`):
| WezTerm field | Source |
|---------------|--------|
| foreground | palette `text` |
| background | palette `base` |
| cursor_bg | terminal-mapping `cursor.bg` → palette `lavender` |
| cursor_fg | terminal-mapping `cursor.fg` → palette `base` |
| cursor_border | terminal-mapping `cursor.border` → palette `lavender` |
| selection_fg | palette `text` |
| selection_bg | terminal-mapping `selection.bg` → palette `teal` with `selection.bg_alpha` alpha value (e.g., `rgba()` format) |
| scrollbar_thumb | terminal-mapping `scrollbar.thumb` → palette `subtext1` |
| split | terminal-mapping `split` → palette `surface1` |
| compose_cursor | terminal-mapping `compose_cursor` → palette `flamingo` |

**Tab bar colors** (from `terminal-mapping.json`):
| WezTerm field | Source |
|---------------|--------|
| tab_bar.background | terminal-mapping `tab_bar.background` → palette `mantle` |
| active_tab.bg_color | terminal-mapping `tab_bar.active_tab.bg` → palette `base` |
| active_tab.fg_color | terminal-mapping `tab_bar.active_tab.fg` → palette `text` |
| inactive_tab.bg_color | terminal-mapping `tab_bar.inactive_tab.bg` → palette `mantle` |
| inactive_tab.fg_color | terminal-mapping `tab_bar.inactive_tab.fg` → palette `subtext1` |
| new_tab.bg_color | terminal-mapping `tab_bar.new_tab.bg` → palette `mantle` |
| new_tab.fg_color | terminal-mapping `tab_bar.new_tab.fg` → palette `subtext1` |

**ANSI color mapping** (from existing `ui-mapping.json` terminal section):
| Index | ANSI Name | Dark Palette | Light Palette |
|-------|-----------|--------------|---------------|
| 0 | black | crust | text |
| 1 | red | red | red |
| 2 | green | green | green |
| 3 | yellow | yellow | yellow |
| 4 | blue | blue | blue |
| 5 | magenta | pink | pink |
| 6 | cyan | teal | teal |
| 7 | white | subtext1 | subtext0 |

For brights, the same palette colors are used with `adjustBrightness(0.2, "lighten")` applied. The exception is `brights[0]` which uses `subtext0` for dark and `subtext1` for light, and `brights[7]` which uses `text` for both.

## TOML Serialization

WezTerm expects a TOML file with the structure shown above. Since the project uses Bun, we have two options:

1. **Use a library** (e.g., `smol-toml`) — handles edge cases, proper escaping
2. **Manual string builder** — no dependencies, TOML structure is flat/simple enough

Given the simple, flat structure of WezTerm color schemes (no deeply nested tables, no special characters in values), a manual string builder is sufficient and avoids adding a dependency. This is the recommended approach.

## Testing Strategy

- Unit tests in `wezterm.test.ts` verifying:
  - All required TOML fields are present for each variant
  - ANSI colors resolve to correct hex values
  - Bright colors are lighter than their base counterparts
  - Dark/light variants handle `ansi[0]` differently (crust vs text)
  - TOML output is valid and parseable
  - Tab bar colors are properly resolved

## Installation Instructions (for users)

Users install by:
1. Copying the `.toml` file to `~/.config/wezterm/colors/`
2. Setting `config.color_scheme = 'synthpunk-pastel-dark'` in their `wezterm.lua`

No build step or plugin installation required. We should include a README in the `themes/wezterm/` directory with these instructions.