# Synthpunk VSCode Extension & Unified Theme Generator — Design Spec

**Date:** 2026-05-06  
**Status:** Draft  
**Author:** maxhaarhaus

---

## Overview

Add VSCode theme extension support for Synthpunk, and replace the current hand-maintained Zed themes + Python generation scripts with a unified TypeScript generator that derives all editor themes from the palette source of truth.

### Goals

- VSCode theme extension with 4 theme variants (Pastel Dark/Light, Neon Dark/Light)
- Single source of truth: palette JSON files → generated themes for all editors
- `ui-mapping.json` serves as both generator input and editor-agnostic design reference
- Existing Zed themes become generated output (not hand-maintained)
- Clean path to future marketplace publishing
- Python scripts replaced by TS generator

### Non-Goals

- Marketplace publishing in this scope (architecture must not block it)
- Icon theme support
- New palette variants or color changes

---

## Architecture

```
synthpunk/
├── palette/                              # SOURCE OF TRUTH (existing)
│   ├── base.json                           # Pastel light palette
│   ├── dark.json                           # Pastel dark palette
│   ├── neon-light.json                     # Neon light palette
│   ├── neon-dark.json                     # Neon dark palette
│   ├── semantic.json                      # Semantic role mappings (existing)
│   ├── syntax.json                        # Syntax token → color mappings (existing)
│   ├── ui-mapping.json                    # NEW: UI role → color mappings
│   └── scopes.json                         # NEW: TextMate scope → syntax role mappings
├── generator/                             # NEW: TS PACKAGE
│   ├── src/
│   │   ├── index.ts                        # CLI entry: generate --target vscode|zed|all
│   │   ├── palette.ts                      # Reads palette/*.json, resolves color names
│   │   ├── uiMapping.ts                    # Reads ui-mapping.json, resolves tokens
│   │   ├── syntaxMapping.ts               # Reads syntax.json, resolves tokens
│   │   ├── opacity.ts                      # Opacity rules per context
│   │   ├── targets/
│   │   │   ├── zed.ts                      # Produces Zed theme JSON
│   │   │   └── vscode.ts                   # Produces VSCode theme JSONs
│   │   └── types.ts                        # Shared types
│   ├── package.json
│   └── tsconfig.json
├── themes/
│   ├── zed/                               # OUTPUT (git-tracked, generated)
│   │   ├── extension.toml (hand-maintained)
│   │   ├── README.md (hand-maintained)
│   │   └── themes/
│   │       ├── synthpunk-pastel.json
│   │       └── synthpunk-neon.json
│   └── vscode/                            # OUTPUT (git-tracked, generated)
│       ├── package.json (hand-maintained extension manifest)
│       └── themes/
│           ├── synthpunk-pastel-dark.json
│           ├── synthpunk-pastel-light.json
│           ├── synthpunk-neon-dark.json
│           └── synthpunk-neon-light.json
├── schemas/                               # Existing JSON schemas
├── scripts/                               # TO BE DEPRECATED (replaced by generator/)
└── assets/                                # Existing preview images
```

---

## Section 1: `ui-mapping.json` — Editor-Agnostic Semantic Layer

A new file `palette/ui-mapping.json` that maps abstract UI roles to palette color names. This file is both a generator input and a design reference document.

### Design Decisions

- **Variant-agnostic**: The same mapping applies to all 4 theme variants. The palette file selected determines actual colors.
- **Opacity not included**: Each editor adapter handles opacity in its own format. Opacity rules are defined in `generator/src/opacity.ts`.

### Structure

```json
{
  "$schema": "../schemas/ui-mapping.json",
  "info": {
    "name": "synthpunk-ui-mapping",
    "description": "Editor-agnostic UI role → palette color mappings",
    "version": "0.1.0"
  },
  "background": {
    "base": "base",
    "elevated": "mantle",
    "deepest": "crust"
  },
  "surface": {
    "default": "surface0",
    "hover": "surface1",
    "active": "surface2"
  },
  "text": {
    "primary": "text",
    "secondary": "subtext1",
    "tertiary": "subtext0",
    "accent": "teal",
    "on_accent": "base"
  },
  "border": {
    "default": "surface1",
    "focused": "lavender",
    "selected": "teal",
    "disabled": "surface0"
  },
  "editor": {
    "background": "base",
    "foreground": "text",
    "line_number": "overlay",
    "active_line_number": "teal",
    "active_line_background": "surface0",
    "selection": "teal",
    "cursor": "lavender",
    "find_match": "flamingo",
    "find_active_match": "red"
  },
  "terminal": {
    "black": "text",
    "red": "red",
    "green": "green",
    "yellow": "yellow",
    "blue": "blue",
    "magenta": "pink",
    "cyan": "teal",
    "white": "subtext1",
    "bright_black": "subtext0",
    "bright_red": "red",
    "bright_green": "green",
    "bright_yellow": "yellow",
    "bright_blue": "blue",
    "bright_magenta": "pink",
    "bright_cyan": "teal",
    "bright_white": "text"
  },
  "status": {
    "error": "red",
    "warning": "yellow",
    "success": "green",
    "info": "blue"
  },
  "vcs": {
    "added": "green",
    "modified": "yellow",
    "deleted": "red"
  }
}
```

### New Schema

A new `schemas/ui-mapping.json` will validate this file's structure.

---

## Section 2: Generator Architecture

### TypeScript Package (`generator/`)

The generator reads palette files and mapping files, then produces theme JSON for each target editor.

#### Module Responsibilities

| Module | Purpose |
|--------|---------|
| `palette.ts` | Loads all 4 palette JSON files, provides `resolveColor(variant, colorName) → hex` |
| `uiMapping.ts` | Loads `ui-mapping.json`, resolves UI semantic tokens to palette color names |
| `syntaxMapping.ts` | Loads `syntax.json`, resolves syntax semantic tokens |
| `opacity.ts` | Defines opacity rules per context (e.g., `selection: 0.33`, `hover: 0.75`) |
| `targets/zed.ts` | Maps semantic tokens → Zed's theme JSON format |
| `targets/vscode.ts` | Maps semantic tokens → VSCode's theme JSON format |
| `types.ts` | Shared TypeScript interfaces |
| `index.ts` | CLI entry point with `--target` flag |

#### CLI Usage

```bash
npx generate                # generate all targets
npx generate --target vscode # generate only VSCode themes
npx generate --target zed    # generate only Zed themes
```

#### Generation Flow

```
palette/*.json + palette/ui-mapping.json + palette/syntax.json + palette/scopes.json
                                        ↓
                                  generator/src/
                                        ↓
                    ┌───────────────────────────────────┐
                    │                                   │
              targets/zed.ts                    targets/vscode.ts
                    │                                   │
                    ↓                                   ↓
          themes/zed/themes/                    themes/vscode/themes/
          synthpunk-pastel.json               synthpunk-pastel-dark.json
          synthpunk-neon.json                  synthpunk-pastel-light.json
                                               synthpunk-neon-dark.json
                                               synthpunk-neon-light.json
```

#### Validation

The generator validates at build time:
- All color names in mapping files exist in the selected palette
- All scopes in `scopes.json` reference valid `syntaxRole` paths
- No unmapped Zed/VSCode tokens that would produce empty values
- Hex/RGB consistency in palette files (replaces `scripts/validate.py`)

---

## Section 3: VSCode Extension & Token Mapping

### Extension Manifest (`themes/vscode/package.json`)

```json
{
  "name": "synthpunk",
  "displayName": "Synthpunk",
  "publisher": "synthpunk",
  "version": "0.1.0",
  "engines": { "vscode": "^1.80.0" },
  "categories": ["Themes"],
  "contributes": {
    "themes": [
      { "label": "Synthpunk Pastel Dark", "uiTheme": "vs-dark", "path": "./themes/synthpunk-pastel-dark.json" },
      { "label": "Synthpunk Pastel Light", "uiTheme": "vs", "path": "./themes/synthpunk-pastel-light.json" },
      { "label": "Synthpunk Neon Dark", "uiTheme": "vs-dark", "path": "./themes/synthpunk-neon-dark.json" },
      { "label": "Synthpunk Neon Light", "uiTheme": "vs", "path": "./themes/synthpunk-neon-light.json" }
    ]
  }
}
```

### Workbench Colors

The VSCode target maps `ui-mapping.json` semantic tokens to ~80-100 of the most visually impactful VSCode `colors` keys. Unmapped tokens fall back to VSCode defaults.

Source mapping in `targets/vscode.ts`:

```typescript
const vsCodeUIColors: Record<string, string> = {
  "editor.background":               "editor.background",
  "editor.foreground":               "editor.foreground",
  "editorLineNumber.foreground":      "editor.line_number",
  "editorLineNumber.activeForeground": "editor.active_line_number",
  "editor.lineHighlightBackground":   "editor.active_line_background",
  "editor.selectionBackground":        "editor.selection",
  "activityBar.background":           "background.elevated",
  "sideBar.background":              "background.elevated",
  "errorForeground":                  "status.error",
  // ... ~80-100 tokens
};
```

### Syntax Colors (`tokenColors`)

A new file `palette/scopes.json` maps TextMate scopes to our semantic syntax roles:

```json
[
  {
    "name": "Comment",
    "scope": ["comment", "comment.block", "comment.line", "comment.line.double-slash"],
    "syntaxRole": "comments.line"
  },
  {
    "name": "Keyword",
    "scope": ["keyword", "keyword.control", "keyword.operator"],
    "syntaxRole": "keywords.keyword"
  },
  {
    "name": "String",
    "scope": ["string", "string.quoted", "string.unquoted"],
    "syntaxRole": "literals.string"
  }
]
```

The generator resolves `syntaxRole` → palette color name → hex value and produces the `tokenColors` array with `settings: { foreground }` entries.

### Font Styling

A lightweight font style mapping (minimal — most tokens get no font styling):

```json
{
  "emphasis.strong": { "fontWeight": "bold" },
  "comment": { "fontStyle": "italic" },
  "predictive": { "fontStyle": "italic" }
}
```

These could live in `syntax.json` or as a separate small mapping.

### VSCode Theme Output Format

Each generated file:

```json
{
  "name": "Synthpunk Pastel Dark",
  "type": "dark",
  "colors": { "editor.background": "#1E1028", ... },
  "tokenColors": [
    { "name": "Comment", "scope": ["comment", ...], "settings": { "foreground": "#705880" } },
    ...
  ]
}
```

Where `type` is `"dark"` or `"light"` based on variant.

---

## Migration Plan

### What Gets Created
- `palette/ui-mapping.json` — editor-agnostic UI mapping
- `palette/scopes.json` — TextMate scope mapping
- `generator/` — TypeScript generator package
- `themes/vscode/` — VSCode extension directory

### What Gets Replaced
- `scripts/generate-neon-theme.py` → `generator` (TS)
- `scripts/validate.py` → `generator` validation
- `scripts/generate-preview.py` → stays (separate concern, no theme generation overlap)
- `themes/zed/themes/synthpunk-pastel.json` → becomes generated output
- `themes/zed/themes/synthpunk-neon.json` → becomes generated output

### What Stays the Same
- `palette/*.json` — source of truth, unchanged
- `themes/zed/extension.toml` — hand-maintained Zed manifest
- `themes/zed/README.md` — hand-maintained
- `schemas/*.json` — existing schemas stay, new `schemas/ui-mapping.json` added

### Local Testing
- VSCode: symlink or copy `themes/vscode/` into `~/.vscode/extensions/` for local dev
- Zed: use existing "Install Dev Extension" workflow pointing to `themes/zed/`
- Generator: run `npx generate` before testing to regenerate themes

---

## Future Considerations

- Marketplace publishing: extension manifest is already structured for `vsce` packaging
- New editor targets: add a `targets/<editor>.ts` module + mapping implementation
- New color variants: add a new palette file, themes regenerate automatically
- Preview images: `generate-preview.py` could be ported to TS or kept as-is