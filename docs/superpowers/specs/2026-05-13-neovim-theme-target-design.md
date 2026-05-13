# Neovim Theme Target Design

**Date:** 2026-05-13
**Status:** draft

## Overview

Add Neovim as a target platform to the synthpunk theme generator. Generates a full Neovim Lua plugin from the existing palette variants (pastel-dark, pastel-light, neon-dark, neon-light) with both tree-sitter and classic regex highlight groups.

## Plugin Structure (output in `themes/neovim/`)

```
themes/neovim/
├── colors/
│   ├── synthpunk-pastel-dark.lua
│   ├── synthpunk-pastel-light.lua
│   ├── synthpunk-neon-dark.lua
│   └── synthpunk-neon-light.lua
├── lua/
│   └── synthpunk/
│       └── theme.lua         # applies highlight groups from a palette table
├── README.md
└── LICENSE
```

### Runtime Behavior

- Each `colors/synthpunk-*.lua` is thin (~20 lines), setting `vim.g.colors_name` and calling `require("synthpunk.theme").apply(palette_table, config)`.
- `lua/synthpunk/theme.lua` contains the highlight group logic shared across all variants.
- Users can `:colorscheme synthpunk-pastel-dark` directly — works out of the box with no extra config.
- No plugin manager required; just needs to be on `runtimepath`.

## Highlight Group Mapping

### UI Groups (from `uiMapping`)

| Neovim Group | Source |
|---|---|
| `Normal` | `editor.foreground` (fg), `editor.background` (bg) |
| `NormalNC`, `NormalFloat` | Same as Normal but dimmed fg |
| `StatusLine` | `surface.active` bg, `text.primary` fg |
| `StatusLineNC` | `surface.default` bg, `text.tertiary` fg |
| `TabLine`, `TabLineFill` | `background.deepest` (crust) |
| `TabLineSel` | `background.base` |
| `CursorLine` | `editor.active_line_background` |
| `LineNr` | `editor.line_number` |
| `CursorLineNr` | `editor.active_line_number` |
| `VertSplit` | `surface.default` fg |
| `Pmenu`, `PmenuSel`, `PmenuThumb` | surface hierarchy |
| `Visual` | `editor.selection` (alpha-blended) |
| `Search`, `IncSearch` | `editor.find_match`, `editor.find_active_match` |
| `Folded`, `FoldColumn` | `surface.default` |
| `DiagnosticError/Warn/Info/Hint` | `status.error/warning/info/success` |
| `DiagnosticUnderlineError`, etc. | undercurl with status colors |
| `ErrorMsg`, `WarningMsg` | `status.error`, `status.warning` |
| `MsgArea`, `MsgSeparator` | `text.tertiary` |
| `NonText`, `Whitespace`, `SpecialKey` | subdued overlay tones |
| `Directory` | `text.accent` |
| `MatchParen` | `editor.find_active_match` |
| `ColorColumn` | `surface.default` |
| `SignColumn` | matches `LineNr` bg |
| `WinSeparator` | `border.default` |
| `FloatBorder` | `border.focused` |
| `FloatTitle` | `text.primary` |
| `DiffAdd/Change/Delete/Text` | `vcs.added/modified/deleted` |

### Syntax Groups (from `syntax.json` + `scopes.json`)

Both tree-sitter and classic groups are set, driven from the same mapping data.

**Tree-sitter:** `@comment`, `@string`, `@keyword`, `@function`, `@function.method`, `@variable`, `@variable.parameter`, `@variable.member`, `@type`, `@constant`, `@number`, `@boolean`, `@operator`, `@attribute`, `@namespace`, `@tag`, `@tag.attribute`, `@punctuation`, `@constructor`, `@label`, `@property`, `@text.emphasis`, `@text.strong`, etc.

**Classic:** `Comment`, `String`, `Keyword`, `Function`, `Identifier`, `Type`, `Constant`, `Number`, `Boolean`, `Operator`, `PreProc`, `Special`, `Statement`, `StorageClass`, `Structure`, `Typedef`, `Tag`, `Label`, `Italic`, `Bold`, etc.

Font styles (`italic`, `bold`) from `fontStyles` are applied to both tree-sitter and classic groups.

### LSP Semantic Token Links

Standard links set via `vim.api.nvim_set_hl(0, "@lsp.type.class", { link = "@type" })`, etc. — around 20 standard links.

### Terminal Colors

Set `g:terminal_color_0` through `g:terminal_color_15` from `uiMapping.terminal` colors.

## Generator Architecture

### New File: `generator/src/targets/neovim.ts`

Exports:

```ts
interface NeovimHighlightGroup {
  fg?: string;
  bg?: string;
  sp?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  undercurl?: boolean;
  strikethrough?: boolean;
  link?: string;
  blend?: number;
}

interface NeovimPaletteTable {
  meta: { name: string; variant: string; type: "dark" | "light" };
  colors: Record<string, string>;  // palette color names → hex
  ui: Record<string, NeovimHighlightGroup>;
  syntaxTreesitter: Record<string, NeovimHighlightGroup>;
  syntaxClassic: Record<string, NeovimHighlightGroup>;
  lspLinks: Record<string, string>;  // group → link target
  terminal: string[];  // 16 hex colors
}

function generateNeovimPalette(
  variant: VariantName,
  palette: Palette,
  uiMapping: UIMapping,
  syntaxMapping: SyntaxMapping,
  scopes: ScopeEntry[],
  fontStyles: Record<string, FontStyleMapping>,
): NeovimPaletteTable

function stringifyNeovimTheme(paletteTable: NeovimPaletteTable): string
function stringifyNeovimColorFile(variant: VariantName): string  // thin colors/*.lua
function stringifyNeovimThemeModule(): string  // lua/synthpunk/theme.lua
```

### Changes to `generator/src/index.ts`

- Add `NEOVIM_DIR` constant pointing to `themes/neovim`
- Write `lua/synthpunk/theme.lua` (shared module, written once)
- For each variant: generate palette table, write `colors/synthpunk-{variant}.lua`
- Add Neovim to the `generateAll()` flow

## Testing

### New File: `generator/src/targets/neovim.test.ts`

Tests:
1. All 4 variants generate without throwing
2. Correct `Normal` fg/bg for each variant
3. Correct `CursorLine` bg for pastel-dark
4. Terminal colors array has 16 entries
5. Syntax tree-sitter groups are populated (`@comment`, `@string`, `@keyword`, etc.)
6. Classic groups are populated (`Comment`, `String`, `Keyword`, etc.)
7. `stringifyNeovimTheme` produces valid Lua (starts with `return {`, has `meta`, `ui`, `syntaxTreesitter`, `syntaxClassic`, `terminal`)
8. `stringifyNeovimColorFile` produces thin require-based file
9. Font styles (italic comments, bold emphasis) are carried through

## Edge Cases

- **Float groups**: `NormalFloat`, `FloatBorder`, `FloatTitle` get proper contrast against `base`
- **WinSeparator vs VertSplit**: Neovim 0.10+ uses `WinSeparator`, older uses `VertSplit` — set both
- **Undercurl sp**: Diagnostic underlines use `sp` (special color) for the underline color, not `fg`
- **Alpha blending**: `Visual` uses `vim.api.nvim_set_hl` blend parameter instead of manually blending hex
- **Terminal in light mode**: Light variant terminal colors use appropriate dark-on-light color for ANSI black/white

## Non-Goals

- No `setup()` function with user config merging — generated files are ready-to-use
- No LSP semantic token configuration beyond standard links
- No auto-detection of background (user sets `background=dark` or `background=light` as usual)
- No integration with plugin managers beyond being on `runtimepath`
