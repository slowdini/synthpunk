# Neovim Theme Target Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Neovim Lua colorscheme generation to the synthpunk generator, producing a complete plugin from existing palette variants.

**Architecture:** A new target module `neovim.ts` generates per-variant palette data using existing `uiMapping`/`syntaxMapping`/`scopes`. A `stringifyNeovimThemeModule()` renders all variant data into a shared `lua/synthpunk/theme.lua`, and thin `colors/*.lua` wrappers require it by variant name. The generator wires Neovim output alongside VSCode/Zed/WezTerm/Starship in `index.ts`.

**Tech Stack:** TypeScript (Bun), Lua (Neovim API)

---

### File Map

| Action | Path | Purpose |
|---|---|---|
| Create | `generator/src/targets/neovim.ts` | Generator logic + Lua stringify |
| Create | `generator/src/targets/neovim.test.ts` | Tests |
| Modify | `generator/src/index.ts` | Wire Neovim into generateAll() |
| Generate | `themes/neovim/lua/synthpunk/theme.lua` | Shared runtime module |
| Generate | `themes/neovim/colors/synthpunk-*.lua` | Thin variant entrypoints |

---

### Task 1: Write the failing test

**Files:**
- Create: `generator/src/targets/neovim.test.ts`

- [ ] **Step 1: Create the test file with import and fixture loaders, plus the first test**

```ts
import { describe, expect, test } from "bun:test";
import { generateNeovimPalette, stringifyNeovimThemeModule, stringifyNeovimColorsFile } from "./neovim";
import { loadPalette } from "../palette";
import { loadUIMapping } from "../uiMapping";
import { loadSyntaxMapping, loadScopes, loadFontStyles } from "../syntaxMapping";
import type { VariantName } from "../types";
import path from "node:path";

const PROJECT_DIR = path.resolve(import.meta.dir, "../../..");
const PALETTE_DIR = path.join(PROJECT_DIR, "palette");

function loadFixtures(variant: VariantName) {
  const palette = loadPalette(PALETTE_DIR, variant);
  const uiMapping = loadUIMapping(PALETTE_DIR);
  const syntaxMapping = loadSyntaxMapping(PALETTE_DIR);
  const scopes = loadScopes(PALETTE_DIR);
  const fontStyles = loadFontStyles(PALETTE_DIR);
  return { palette, uiMapping, syntaxMapping, scopes, fontStyles };
}

describe("generateNeovimPalette", () => {
  test("pastel-dark palette has correct Normal fg/bg", () => {
    const { palette, uiMapping, syntaxMapping, scopes, fontStyles } = loadFixtures("pastel-dark");
    const result = generateNeovimPalette("pastel-dark", palette, uiMapping, syntaxMapping, scopes, fontStyles);

    expect(result.meta.name).toBe("synthpunk-pastel-dark");
    expect(result.meta.type).toBe("dark");
    expect(result.ui.Normal).toEqual({ fg: "#F0E0F0", bg: "#1E1028" });
  });

  test("pastel-light palette has correct Normal fg/bg", () => {
    const { palette, uiMapping, syntaxMapping, scopes, fontStyles } = loadFixtures("pastel-light");
    const result = generateNeovimPalette("pastel-light", palette, uiMapping, syntaxMapping, scopes, fontStyles);

    expect(result.meta.name).toBe("synthpunk-pastel-light");
    expect(result.meta.type).toBe("light");
    expect(result.ui.Normal).toEqual({ fg: "#2E1A24", bg: "#FFF8F5" });
  });

  test("terminal colors has 16 entries", () => {
    const { palette, uiMapping, syntaxMapping, scopes, fontStyles } = loadFixtures("pastel-dark");
    const result = generateNeovimPalette("pastel-dark", palette, uiMapping, syntaxMapping, scopes, fontStyles);

    expect(result.terminal).toHaveLength(16);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd generator && bun test targets/neovim.test.ts`
Expected: FAIL — `generateNeovimPalette is not exported`

- [ ] **Step 3: Commit**

```bash
git add generator/src/targets/neovim.test.ts
git commit -m "test(neovim): add failing tests for Neovim palette generator"
```

---

### Task 2: Implement `neovim.ts` — types and UI highlight groups

**Files:**
- Create: `generator/src/targets/neovim.ts`
- Modify: `generator/src/targets/neovim.test.ts` (unskip tests)

- [ ] **Step 1: Create `neovim.ts` with types, helpers, and UI group generation**

```ts
import type { VariantName, Palette, UIMapping, SyntaxMapping, ScopeEntry, FontStyleMapping } from "../types";
import { VARIANT_DISPLAY_NAMES, VARIANT_TYPE } from "../types";
import { resolveColor, colorToHex } from "../palette";
import { resolveUIColor } from "../uiMapping";
import { resolveSyntaxColor } from "../syntaxMapping";

export interface NeovimHighlightGroup {
  fg?: string;
  bg?: string;
  sp?: string;
  blend?: number;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  undercurl?: boolean;
  strikethrough?: boolean;
  reverse?: boolean;
  link?: string;
}

export interface NeovimVariantPalette {
  meta: { name: string; variant: string; type: "dark" | "light" };
  ui: Record<string, NeovimHighlightGroup>;
  syntaxTreesitter: Record<string, NeovimHighlightGroup>;
  syntaxClassic: Record<string, NeovimHighlightGroup>;
  lspLinks: Record<string, string>;
  terminal: string[];
}

function uc(uiMapping: UIMapping, palette: Palette, group: string, key: string, alpha?: number): string {
  return resolveUIColor(uiMapping, palette, group, key, alpha);
}

function pc(palette: Palette, colorName: string, alpha?: number): string {
  const color = resolveColor(palette, colorName);
  return colorToHex(color, alpha);
}

function buildUIGroups(variant: VariantName, palette: Palette, uiMapping: UIMapping): Record<string, NeovimHighlightGroup> {
  const type = VARIANT_TYPE[variant];
  const isDark = type === "dark";

  return {
    Normal:              { fg: uc(uiMapping, palette, "editor", "foreground"), bg: uc(uiMapping, palette, "editor", "background") },
    NormalNC:            { fg: uc(uiMapping, palette, "text", "tertiary"), bg: uc(uiMapping, palette, "editor", "background") },
    NormalFloat:         { fg: uc(uiMapping, palette, "text", "primary"), bg: uc(uiMapping, palette, "background", "base") },
    StatusLine:          { fg: uc(uiMapping, palette, "text", "primary"), bg: uc(uiMapping, palette, "surface", "active") },
    StatusLineNC:        { fg: uc(uiMapping, palette, "text", "tertiary"), bg: uc(uiMapping, palette, "surface", "default") },
    TabLine:             { fg: uc(uiMapping, palette, "text", "tertiary"), bg: uc(uiMapping, palette, "background", "deepest") },
    TabLineFill:         { bg: uc(uiMapping, palette, "background", "deepest") },
    TabLineSel:          { fg: uc(uiMapping, palette, "text", "primary"), bg: uc(uiMapping, palette, "background", "base") },
    CursorLine:          { bg: uc(uiMapping, palette, "editor", "active_line_background") },
    CursorColumn:        { bg: uc(uiMapping, palette, "editor", "active_line_background") },
    LineNr:              { fg: uc(uiMapping, palette, "editor", "line_number"), bg: uc(uiMapping, palette, "editor", "background") },
    CursorLineNr:        { fg: uc(uiMapping, palette, "editor", "active_line_number") },
    SignColumn:          { bg: uc(uiMapping, palette, "editor", "background") },
    VertSplit:           { fg: uc(uiMapping, palette, "surface", "default") },
    WinSeparator:        { fg: uc(uiMapping, palette, "border", "default") },
    FloatBorder:         { fg: uc(uiMapping, palette, "border", "focused") },
    FloatTitle:          { fg: uc(uiMapping, palette, "text", "primary") },
    Pmenu:               { fg: uc(uiMapping, palette, "text", "primary"), bg: uc(uiMapping, palette, "surface", "default") },
    PmenuSel:            { fg: uc(uiMapping, palette, "text", "primary"), bg: uc(uiMapping, palette, "surface", "hover") },
    PmenuThumb:          { bg: uc(uiMapping, palette, "surface", "active") },
    PmenuSbar:           { bg: uc(uiMapping, palette, "surface", "default") },
    Visual:              { bg: uc(uiMapping, palette, "editor", "selection"), blend: 15 },
    Search:              { fg: uc(uiMapping, palette, "text", "on_accent"), bg: uc(uiMapping, palette, "editor", "find_match") },
    IncSearch:           { fg: uc(uiMapping, palette, "text", "on_accent"), bg: uc(uiMapping, palette, "editor", "find_active_match") },
    Folded:              { fg: uc(uiMapping, palette, "text", "tertiary"), bg: uc(uiMapping, palette, "surface", "default") },
    FoldColumn:          { fg: uc(uiMapping, palette, "text", "tertiary"), bg: uc(uiMapping, palette, "background", "base") },
    DiagnosticError:     { fg: uc(uiMapping, palette, "status", "error") },
    DiagnosticWarn:      { fg: uc(uiMapping, palette, "status", "warning") },
    DiagnosticInfo:      { fg: uc(uiMapping, palette, "status", "info") },
    DiagnosticHint:      { fg: uc(uiMapping, palette, "status", "success") },
    DiagnosticUnderlineError: { sp: uc(uiMapping, palette, "status", "error"), undercurl: true },
    DiagnosticUnderlineWarn:  { sp: uc(uiMapping, palette, "status", "warning"), undercurl: true },
    DiagnosticUnderlineInfo:  { sp: uc(uiMapping, palette, "status", "info"), undercurl: true },
    DiagnosticUnderlineHint:  { sp: uc(uiMapping, palette, "status", "success"), undercurl: true },
    ErrorMsg:            { fg: uc(uiMapping, palette, "status", "error") },
    WarningMsg:          { fg: uc(uiMapping, palette, "status", "warning") },
    MsgArea:             { fg: uc(uiMapping, palette, "text", "primary") },
    MsgSeparator:        { fg: uc(uiMapping, palette, "text", "tertiary") },
    MoreMsg:             { fg: uc(uiMapping, palette, "text", "accent") },
    ModeMsg:             { fg: uc(uiMapping, palette, "text", "primary"), bold: true },
    NonText:             { fg: uc(uiMapping, palette, "editor", "line_number") },
    Whitespace:          { fg: uc(uiMapping, palette, "editor", "line_number") },
    SpecialKey:          { fg: uc(uiMapping, palette, "editor", "line_number") },
    EndOfBuffer:         { fg: uc(uiMapping, palette, "editor", "background") },
    Directory:           { fg: uc(uiMapping, palette, "text", "accent") },
    MatchParen:          { fg: uc(uiMapping, palette, "editor", "find_active_match"), bold: true },
    ColorColumn:         { bg: uc(uiMapping, palette, "surface", "default") },
    Conceal:             { fg: uc(uiMapping, palette, "text", "tertiary"), bg: uc(uiMapping, palette, "editor", "background") },
    Cursor:              { fg: uc(uiMapping, palette, "text", "on_accent"), bg: uc(uiMapping, palette, "editor", "cursor") },
    lCursor:             { link: "Cursor" },
    CursorIM:            { link: "Cursor" },
    TermCursor:          { link: "Cursor" },
    TermCursorNC:        { bg: uc(uiMapping, palette, "editor", "cursor") },
    QuickFixLine:        { bg: uc(uiMapping, palette, "surface", "hover") },
    WildMenu:            { fg: uc(uiMapping, palette, "text", "primary"), bg: uc(uiMapping, palette, "surface", "hover") },
    Substitute:          { bg: uc(uiMapping, palette, "editor", "find_match") },
    SpellBad:            { sp: uc(uiMapping, palette, "status", "error"), undercurl: true },
    SpellCap:            { sp: uc(uiMapping, palette, "status", "warning"), undercurl: true },
    SpellLocal:          { sp: uc(uiMapping, palette, "status", "info"), undercurl: true },
    SpellRare:           { sp: uc(uiMapping, palette, "status", "success"), undercurl: true },
    Question:            { fg: uc(uiMapping, palette, "text", "accent") },
    Bold:                { bold: true },
    Italic:              { italic: true },
    Underlined:          { underline: true },
    DiffAdd:             { fg: uc(uiMapping, palette, "vcs", "added") },
    DiffChange:          { fg: uc(uiMapping, palette, "vcs", "modified") },
    DiffDelete:          { fg: uc(uiMapping, palette, "vcs", "deleted") },
    DiffText:            { fg: pc(palette, "lavender") },
  };
}
```

- [ ] **Step 2: Remove the skipped markers from the neovim.test.ts file (tests are uncommented from Task 1)**

- [ ] **Step 3: Run tests to verify first three tests pass**

Run: `cd generator && bun test targets/neovim.test.ts`
Expected: 3 passing (normal fg/bg, normal fg/bg light, terminal 16 entries)

- [ ] **Step 4: Commit**

```bash
git add generator/src/targets/neovim.ts
git commit -m "feat(neovim): add types, helpers, and UI highlight group generation"
```

---

### Task 3: Implement syntax group generation

**Files:**
- Modify: `generator/src/targets/neovim.ts`
- Modify: `generator/src/targets/neovim.test.ts` (add syntax tests)

- [ ] **Step 1: Add the tree-sitter→classic scope mapping and syntax group builder to neovim.ts**

Append to `neovim.ts`:

```ts
const TS_TO_CLASSIC: Record<string, string> = {
  "comment": "Comment",
  "comment.block": "Comment",
  "comment.line": "Comment",
  "comment.line.double-slash": "Comment",
  "comment.line.number-sign": "Comment",
  "comment.triple-slash": "Comment",
  "string": "String",
  "string.quoted.double": "String",
  "string.quoted.single": "String",
  "string.quoted.triple": "String",
  "string.unquoted": "String",
  "string.regexp": "String",
  "constant.character.escape": "SpecialChar",
  "constant.character.escape.backslash": "SpecialChar",
  "constant.numeric": "Number",
  "constant.numeric.float": "Number",
  "constant.numeric.integer": "Number",
  "constant.numeric.hex": "Number",
  "constant.numeric.octal": "Number",
  "constant.numeric.binary": "Number",
  "constant.language.boolean": "Boolean",
  "constant.language.true": "Boolean",
  "constant.language.false": "Boolean",
  "constant": "Constant",
  "constant.language": "Constant",
  "constant.language.null": "Constant",
  "constant.language.undefined": "Constant",
  "constant.language.nan": "Constant",
  "keyword": "Keyword",
  "keyword.control": "Keyword",
  "keyword.control.import": "Keyword",
  "keyword.control.from": "Keyword",
  "keyword.control.export": "Keyword",
  "keyword.control.return": "Keyword",
  "keyword.control.flow": "Keyword",
  "keyword.control.conditional": "Keyword",
  "keyword.control.loop": "Keyword",
  "keyword.operator": "Operator",
  "keyword.operator.arithmetic": "Operator",
  "keyword.operator.assignment": "Operator",
  "keyword.operator.comparison": "Operator",
  "keyword.operator.logical": "Operator",
  "keyword.operator.new": "Operator",
  "keyword.operator.expression": "Operator",
  "storage.type": "Type",
  "storage.type.class": "Type",
  "storage.type.enum": "Type",
  "storage.type.interface": "Type",
  "storage.type.struct": "Type",
  "storage.type.function": "Type",
  "storage.type.method": "Type",
  "storage.modifier": "StorageClass",
  "storage.modifier.async": "StorageClass",
  "storage.modifier.const": "StorageClass",
  "storage.modifier.static": "StorageClass",
  "storage.modifier.abstract": "StorageClass",
  "storage.modifier.readonly": "StorageClass",
  "storage.modifier.mutable": "StorageClass",
  "storage.modifier.private": "StorageClass",
  "storage.modifier.public": "StorageClass",
  "storage.modifier.protected": "StorageClass",
  "entity.name.function": "Function",
  "entity.name.function.member": "Function",
  "entity.name.function.constructor": "Function",
  "entity.name.type.class": "Type",
  "entity.name.type": "Type",
  "entity.name.type.enum": "Type",
  "entity.name.type.interface": "Type",
  "entity.name.type.struct": "Type",
  "entity.name.type.alias": "Type",
  "entity.name.namespace": "Identifier",
  "entity.name.module": "Identifier",
  "entity.name.package": "Identifier",
  "entity.name.tag": "Tag",
  "entity.name.tag.html": "Tag",
  "entity.name.tag.xml": "Tag",
  "entity.name.tag.jsx": "Tag",
  "entity.other.attribute": "Identifier",
  "entity.other.attribute-name": "Identifier",
  "entity.other.attribute-name.html": "Identifier",
  "entity.other.attribute-name.xml": "Identifier",
  "entity.other.attribute-name.jsx": "Identifier",
  "entity.other.attribute-name.css": "Identifier",
  "entity.name.selector": "Structure",
  "variable": "Identifier",
  "variable.other": "Identifier",
  "variable.other.member": "Identifier",
  "variable.other.object": "Identifier",
  "variable.other.constant": "Identifier",
  "variable.parameter": "Identifier",
  "entity.name.variable.parameter": "Identifier",
  "variable.other.property": "Identifier",
  "entity.name.variable.member": "Identifier",
  "support.function": "Function",
  "support.type": "Type",
  "support.class": "Type",
  "meta.function-call": "Normal",
  "meta.method-call": "Normal",
  "meta.method": "Normal",
  "meta.var": "Normal",
  "meta.property": "Normal",
  "meta.attribute": "Normal",
  "meta.selector": "Normal",
  "meta.brace": "Normal",
  "meta.preprocessor": "PreProc",
  "meta.preprocessor.directive": "PreProc",
  "meta.deprecated": "Comment",
  "punctuation": "Delimiter",
  "punctuation.terminator": "Delimiter",
  "punctuation.separator": "Delimiter",
  "punctuation.separator.colon": "Delimiter",
  "punctuation.separator.comma": "Delimiter",
  "punctuation.separator.dot": "Delimiter",
  "punctuation.separator.arrow": "Delimiter",
  "punctuation.separator.key-value": "Delimiter",
  "punctuation.section": "Delimiter",
  "punctuation.section.brackets": "Delimiter",
  "punctuation.section.parens": "Delimiter",
  "punctuation.section.braces": "Delimiter",
  "punctuation.definition.brackets": "Delimiter",
  "punctuation.definition.parens": "Delimiter",
  "punctuation.definition.braces": "Delimiter",
  "keyword.control.directive": "PreProc",
  "keyword.control.preprocessor": "PreProc",
  "string.other.link": "Underlined",
  "markup.underline.link": "Underlined",
  "constant.other.reference.link": "Underlined",
  "markup.heading": "Title",
  "entity.name.section": "Title",
  "heading": "Title",
  "markup.bold": "Bold",
  "markup.italic": "Italic",
  "markup.deleted": "Comment",
  "markup.strikethrough": "Comment",
  "invalid": "Error",
  "invalid.illegal": "Error",
  "invalid.deprecated": "Error",
  "decorator": "Identifier",
  "meta.decorator": "Identifier",
};

function resolveClassicGroup(scope: string): string | null {
  if (TS_TO_CLASSIC[scope]) return TS_TO_CLASSIC[scope];
  const parts = scope.split(".");
  for (let i = parts.length; i > 0; i--) {
    const key = parts.slice(0, i).join(".");
    if (TS_TO_CLASSIC[key]) return TS_TO_CLASSIC[key];
  }
  return null;
}

function buildSyntaxGroups(
  palette: Palette,
  syntaxMapping: SyntaxMapping,
  uiMapping: UIMapping,
  scopes: ScopeEntry[],
  fontStyles: Record<string, FontStyleMapping>,
): { treesitter: Record<string, NeovimHighlightGroup>; classic: Record<string, NeovimHighlightGroup> } {
  const treesitter: Record<string, NeovimHighlightGroup> = {};
  const classic: Record<string, NeovimHighlightGroup> = {};

  for (const entry of scopes) {
    const group: NeovimHighlightGroup = {};

    const parts = entry.syntaxRole.split(".");
    const syntaxGroup = (syntaxMapping as Record<string, Record<string, string>>)[parts[0]];
    if (syntaxGroup && syntaxGroup[parts[1]]) {
      group.fg = resolveSyntaxColor(syntaxMapping, palette, entry.syntaxRole);
    } else {
      group.fg = resolveUIColor(uiMapping, palette, parts[0], parts[1]);
    }

    const fontStyle = fontStyles[entry.syntaxRole];
    if (fontStyle) {
      if (fontStyle.fontStyle === "italic") group.italic = true;
      if (fontStyle.fontWeight === "bold") group.bold = true;
    }

    // Strikethrough for deprecated/markup.deleted
    if (entry.syntaxRole === "invalid.deprecated") {
      group.strikethrough = true;
    }

    for (const scope of entry.scope) {
      const tsGroup = `@${scope}`;
      treesitter[tsGroup] = group;

      const classicGroup = resolveClassicGroup(scope);
      if (classicGroup) {
        classic[classicGroup] = { ...group };
      }
    }
  }

  return { treesitter, classic };
}
```

- [ ] **Step 2: Add the `generateNeovimPalette` export function**

```ts
export function generateNeovimPalette(
  variant: VariantName,
  palette: Palette,
  uiMapping: UIMapping,
  syntaxMapping: SyntaxMapping,
  scopes: ScopeEntry[],
  fontStyles: Record<string, FontStyleMapping>,
): NeovimVariantPalette {
  const name = VARIANT_DISPLAY_NAMES[variant];
  const type = VARIANT_TYPE[variant];
  const isDark = type === "dark";

  const syntaxGroups = buildSyntaxGroups(palette, syntaxMapping, uiMapping, scopes, fontStyles);
  const ui = buildUIGroups(variant, palette, uiMapping);

  // Terminal colors (ANSI 0-15)
  const terminal: string[] = [];
  if (isDark) {
    terminal.push(pc(palette, "crust"));          // 0 black
  } else {
    terminal.push(pc(palette, "text"));            // 0 black (light: use text)
  }
  terminal.push(uc(uiMapping, palette, "terminal", "red"));      // 1
  terminal.push(uc(uiMapping, palette, "terminal", "green"));    // 2
  terminal.push(uc(uiMapping, palette, "terminal", "yellow"));   // 3
  terminal.push(uc(uiMapping, palette, "terminal", "blue"));     // 4
  terminal.push(uc(uiMapping, palette, "terminal", "magenta"));  // 5
  terminal.push(uc(uiMapping, palette, "terminal", "cyan"));     // 6
  if (isDark) {
    terminal.push(uc(uiMapping, palette, "terminal", "white"));   // 7 white
  } else {
    terminal.push(pc(palette, "subtext1"));         // 7 white (light)
  }
  if (isDark) {
    terminal.push(uc(uiMapping, palette, "terminal", "bright_black"));   // 8
  } else {
    terminal.push(pc(palette, "subtext1"));           // 8 bright black (light)
  }
  terminal.push(uc(uiMapping, palette, "terminal", "bright_red"));     // 9
  terminal.push(uc(uiMapping, palette, "terminal", "bright_green"));   // 10
  terminal.push(uc(uiMapping, palette, "terminal", "bright_yellow"));  // 11
  terminal.push(uc(uiMapping, palette, "terminal", "bright_blue"));    // 12
  terminal.push(uc(uiMapping, palette, "terminal", "bright_magenta")); // 13
  terminal.push(uc(uiMapping, palette, "terminal", "bright_cyan"));    // 14
  terminal.push(uc(uiMapping, palette, "terminal", "bright_white"));   // 15

  const lspLinks: Record<string, string> = {
    "@lsp.type.class": "@type",
    "@lsp.type.comment": "@comment",
    "@lsp.type.decorator": "@attribute",
    "@lsp.type.enum": "@type",
    "@lsp.type.enumMember": "@constant",
    "@lsp.type.event": "@type",
    "@lsp.type.function": "@function",
    "@lsp.type.interface": "@type",
    "@lsp.type.keyword": "@keyword",
    "@lsp.type.macro": "@constant",
    "@lsp.type.method": "@function.method",
    "@lsp.type.namespace": "@namespace",
    "@lsp.type.number": "@number",
    "@lsp.type.operator": "@operator",
    "@lsp.type.parameter": "@variable.parameter",
    "@lsp.type.property": "@property",
    "@lsp.type.regexp": "@string",
    "@lsp.type.string": "@string",
    "@lsp.type.struct": "@type",
    "@lsp.type.type": "@type",
    "@lsp.type.typeParameter": "@type",
    "@lsp.type.variable": "@variable",
  };

  return {
    meta: { name, variant, type },
    ui,
    syntaxTreesitter: syntaxGroups.treesitter,
    syntaxClassic: syntaxGroups.classic,
    lspLinks,
    terminal,
  };
}
```

- [ ] **Step 3: Add syntax tests to `neovim.test.ts`**

Add to the `describe("generateNeovimPalette", () => {` block:

```ts
  test("pastel-dark has @comment with correct fg and italic", () => {
    const { palette, uiMapping, syntaxMapping, scopes, fontStyles } = loadFixtures("pastel-dark");
    const result = generateNeovimPalette("pastel-dark", palette, uiMapping, syntaxMapping, scopes, fontStyles);

    expect(result.syntaxTreesitter["@comment"]).toBeDefined();
    expect(result.syntaxTreesitter["@comment"].fg).toBe("#705880");
    expect(result.syntaxTreesitter["@comment"].italic).toBe(true);
  });

  test("pastel-dark has matching Comment classic group", () => {
    const { palette, uiMapping, syntaxMapping, scopes, fontStyles } = loadFixtures("pastel-dark");
    const result = generateNeovimPalette("pastel-dark", palette, uiMapping, syntaxMapping, scopes, fontStyles);

    expect(result.syntaxClassic.Comment).toBeDefined();
    expect(result.syntaxClassic.Comment.fg).toBe("#705880");
    expect(result.syntaxClassic.Comment.italic).toBe(true);
  });

  test("pastel-dark has @string with correct fg", () => {
    const { palette, uiMapping, syntaxMapping, scopes, fontStyles } = loadFixtures("pastel-dark");
    const result = generateNeovimPalette("pastel-dark", palette, uiMapping, syntaxMapping, scopes, fontStyles);

    expect(result.syntaxTreesitter["@string"]).toBeDefined();
    expect(result.syntaxTreesitter["@string"].fg).toBe("#7FD7B5");
  });

  test("pastel-dark has @keyword with correct fg", () => {
    const { palette, uiMapping, syntaxMapping, scopes, fontStyles } = loadFixtures("pastel-dark");
    const result = generateNeovimPalette("pastel-dark", palette, uiMapping, syntaxMapping, scopes, fontStyles);

    expect(result.syntaxTreesitter["@keyword"]).toBeDefined();
    expect(result.syntaxTreesitter["@keyword"].fg).toBe("#FF9BB6");
  });

  test("pastel-dark has @function with correct fg", () => {
    const { palette, uiMapping, syntaxMapping, scopes, fontStyles } = loadFixtures("pastel-dark");
    const result = generateNeovimPalette("pastel-dark", palette, uiMapping, syntaxMapping, scopes, fontStyles);

    expect(result.syntaxTreesitter["@function"]).toBeDefined();
    expect(result.syntaxTreesitter["@function"].fg).toBe("#8BA4FF");
  });

  test("neon-dark has @keyword with correct fg", () => {
    const { palette, uiMapping, syntaxMapping, scopes, fontStyles } = loadFixtures("neon-dark");
    const result = generateNeovimPalette("neon-dark", palette, uiMapping, syntaxMapping, scopes, fontStyles);

    expect(result.syntaxTreesitter["@keyword"]).toBeDefined();
    expect(result.syntaxTreesitter["@keyword"].fg).toBe("#FF5CA8");
  });

  test("all four variants generate without throwing", () => {
    const variants: VariantName[] = ["pastel-dark", "pastel-light", "neon-dark", "neon-light"];
    for (const v of variants) {
      const { palette, uiMapping, syntaxMapping, scopes, fontStyles } = loadFixtures(v);
      expect(() => generateNeovimPalette(v, palette, uiMapping, syntaxMapping, scopes, fontStyles)).not.toThrow();
    }
  });
```

- [ ] **Step 4: Run tests**

Run: `cd generator && bun test targets/neovim.test.ts`
Expected: All tests pass

- [ ] **Step 5: Commit**

```bash
git add generator/src/targets/neovim.ts generator/src/targets/neovim.test.ts
git commit -m "feat(neovim): add syntax group generation with tree-sitter and classic fallback"
```

---

### Task 4: Implement Lua stringify functions

**Files:**
- Modify: `generator/src/targets/neovim.ts`
- Modify: `generator/src/targets/neovim.test.ts` (add stringify tests)

- [ ] **Step 1: Add `stringifyNeovimLuaValue` helper and `stringifyNeovimThemeModule` to neovim.ts**

Append to `neovim.ts`:

```ts
function stringifyNeovimLuaValue(value: unknown, indent: number = 0): string {
  const pad = "  ".repeat(indent);
  const padInner = "  ".repeat(indent + 1);

  if (value === null || value === undefined) return "nil";
  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "number") return String(value);
  if (typeof value === "string") {
    if (value.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/)) return value;
    return `"${value}"`;
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return "{}";
    const items = value.map(v => `${padInner}${stringifyNeovimLuaValue(v, indent + 1)}`).join(",\n");
    return `{\n${items}\n${pad}}`;
  }
  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return "{}";
    const items = entries.map(([k, v]) => {
      const key = k.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/) ? k : `["${k}"]`;
      return `${padInner}${key} = ${stringifyNeovimLuaValue(v, indent + 1)}`;
    }).join(",\n");
    return `{\n${items}\n${pad}}`;
  }
  return "nil";
}

function stringifyNeovimVariantPalette(p: NeovimVariantPalette): string {
  return stringifyNeovimLuaValue({
    meta: p.meta,
    ui: p.ui,
    syntaxTreesitter: p.syntaxTreesitter,
    syntaxClassic: p.syntaxClassic,
    lspLinks: p.lspLinks,
    terminal: p.terminal,
  });
}

export function stringifyNeovimThemeModule(
  pastelDark: NeovimVariantPalette,
  pastelLight: NeovimVariantPalette,
  neonDark: NeovimVariantPalette,
  neonLight: NeovimVariantPalette,
): string {
  const lines: string[] = [];

  lines.push("-- Synthpunk Neovim theme — generated; do not edit");
  lines.push("");
  lines.push("local M = {}");
  lines.push("");
  lines.push("local variants = {");
  lines.push(`  ["pastel-dark"] = ${stringifyNeovimVariantPalette(pastelDark)},`);
  lines.push(`  ["pastel-light"] = ${stringifyNeovimVariantPalette(pastelLight)},`);
  lines.push(`  ["neon-dark"] = ${stringifyNeovimVariantPalette(neonDark)},`);
  lines.push(`  ["neon-light"] = ${stringifyNeovimVariantPalette(neonLight)},`);
  lines.push("}");
  lines.push("");
  lines.push("local function hl(group, opts)");
  lines.push("  if opts.link then");
  lines.push('    vim.api.nvim_set_hl(0, group, { link = opts.link })');
  lines.push("    return");
  lines.push("  end");
  lines.push("  local ok, result = pcall(vim.api.nvim_set_hl, 0, group, opts)");
  lines.push("  if not ok then");
  lines.push('    vim.api.nvim_set_hl(0, group, { fg = opts.fg, bg = opts.bg })');
  lines.push("  end");
  lines.push("end");
  lines.push("");
  lines.push("function M.apply(variant)");
  lines.push("  local palette = variants[variant]");
  lines.push("  if not palette then");
  lines.push('    vim.notify("synthpunk: unknown variant \\"" .. variant .. "\\"", vim.log.levels.ERROR)');
  lines.push("    return");
  lines.push("  end");
  lines.push("");
  lines.push('  vim.o.termguicolors = true');
  lines.push('  vim.o.background = palette.meta.type');
  lines.push("");
  lines.push("  for group, opts in pairs(palette.ui) do hl(group, opts) end");
  lines.push("  for group, opts in pairs(palette.syntaxTreesitter) do hl(group, opts) end");
  lines.push("  for group, opts in pairs(palette.syntaxClassic) do hl(group, opts) end");
  lines.push("  for from, to in pairs(palette.lspLinks) do hl(from, { link = to }) end");
  lines.push("");
  lines.push("  for i, color in ipairs(palette.terminal) do");
  lines.push('    vim.g["terminal_color_" .. (i - 1)] = color');
  lines.push("  end");
  lines.push("end");
  lines.push("");
  lines.push("return M");
  lines.push("");

  return lines.join("\n");
}
```

- [ ] **Step 2: Add `stringifyNeovimColorsFile`**

```ts
export function stringifyNeovimColorsFile(variant: VariantName): string {
  const lines: string[] = [];
  lines.push("-- Synthpunk Neovim colorscheme — generated; do not edit");
  lines.push(`vim.g.colors_name = "synthpunk-${variant}"`);
  lines.push(`require("synthpunk.theme").apply("${variant}")`);
  lines.push("");
  return lines.join("\n");
}
```

- [ ] **Step 3: Add stringify tests to `neovim.test.ts`**

```ts
describe("stringifyNeovimThemeModule", () => {
  function loadPal(v: VariantName) {
    const { palette, uiMapping, syntaxMapping, scopes, fontStyles } = loadFixtures(v);
    return generateNeovimPalette(v, palette, uiMapping, syntaxMapping, scopes, fontStyles);
  }

  test("produces valid Lua with all required sections", () => {
    const output = stringifyNeovimThemeModule(
      loadPal("pastel-dark"),
      loadPal("pastel-light"),
      loadPal("neon-dark"),
      loadPal("neon-light"),
    );

    expect(output).toContain('["pastel-dark"]');
    expect(output).toContain('["pastel-light"]');
    expect(output).toContain('["neon-dark"]');
    expect(output).toContain('["neon-light"]');
    expect(output).toContain("function M.apply(variant)");
    expect(output).toContain("termguicolors");
    expect(output).toContain("palette.ui");
    expect(output).toContain("palette.syntaxTreesitter");
    expect(output).toContain("palette.syntaxClassic");
    expect(output).toContain("palette.lspLinks");
    expect(output).toContain("palette.terminal");
  });

  test("contains pastel-dark Normal colors", () => {
    const output = stringifyNeovimThemeModule(
      loadPal("pastel-dark"),
      loadPal("pastel-light"),
      loadPal("neon-dark"),
      loadPal("neon-light"),
    );

    expect(output).toContain('"#F0E0F0"');
    expect(output).toContain('"#1E1028"');
  });
});

describe("stringifyNeovimColorsFile", () => {
  test("produces thin require-based file", () => {
    const output = stringifyNeovimColorsFile("pastel-dark");

    expect(output).toContain('vim.g.colors_name = "synthpunk-pastel-dark"');
    expect(output).toContain('require("synthpunk.theme").apply("pastel-dark")');
  });
});
```

- [ ] **Step 4: Run tests**

Run: `cd generator && bun test targets/neovim.test.ts`
Expected: All tests pass

- [ ] **Step 5: Commit**

```bash
git add generator/src/targets/neovim.ts generator/src/targets/neovim.test.ts
git commit -m "feat(neovim): add Lua stringify for theme module and colors files"
```

---

### Task 5: Wire Neovim target into `index.ts`

**Files:**
- Modify: `generator/src/index.ts`

- [ ] **Step 1: Add Neovim imports and directory constant to `index.ts`**

```ts
import { generateNeovimPalette, stringifyNeovimThemeModule, stringifyNeovimColorsFile } from "./targets/neovim";

const NEOVIM_DIR = path.join(PROJECT_DIR, "themes", "neovim");
const NEOVIM_COLORS_DIR = path.join(NEOVIM_DIR, "colors");
const NEOVIM_LUA_DIR = path.join(NEOVIM_DIR, "lua", "synthpunk");
```

- [ ] **Step 2: Add Neovim generation block to `generateAll()`**

Insert after the Starship block (before the closing brace of `generateAll`):

```ts
  // Generate Neovim themes
  ensureDir(NEOVIM_COLORS_DIR);
  ensureDir(NEOVIM_LUA_DIR);

  // Build all variant palettes
  const neovimPalettes: Record<VariantName, ReturnType<typeof generateNeovimPalette>> = {} as Record<VariantName, ReturnType<typeof generateNeovimPalette>>;
  for (const variant of VARIANTS) {
    const palette = loadPalette(PALETTE_DIR, variant);
    neovimPalettes[variant] = generateNeovimPalette(variant, palette, uiMapping, syntaxMapping, scopes, fontStyles);
  }

  // Write shared theme.lua
  const themeModuleLua = stringifyNeovimThemeModule(
    neovimPalettes["pastel-dark"],
    neovimPalettes["pastel-light"],
    neovimPalettes["neon-dark"],
    neovimPalettes["neon-light"],
  );
  const themeModulePath = path.join(NEOVIM_LUA_DIR, "theme.lua");
  fs.writeFileSync(themeModulePath, themeModuleLua);
  console.log(`Generated ${themeModulePath}`);

  // Write per-variant colors files
  const NEOVIM_COLORS_FILE: Record<VariantName, string> = {
    "pastel-dark": "synthpunk-pastel-dark.lua",
    "pastel-light": "synthpunk-pastel-light.lua",
    "neon-dark": "synthpunk-neon-dark.lua",
    "neon-light": "synthpunk-neon-light.lua",
  };
  for (const variant of VARIANTS) {
    const lua = stringifyNeovimColorsFile(variant);
    const filePath = path.join(NEOVIM_COLORS_DIR, NEOVIM_COLORS_FILE[variant]);
    fs.writeFileSync(filePath, lua);
    console.log(`Generated ${filePath}`);
  }
```

- [ ] **Step 3: Run the full generator to verify**

Run: `cd generator && bun run src/index.ts`
Expected: Output shows "Generated" for all 4 colors files + theme.lua, no errors.

- [ ] **Step 4: Run full test suite**

Run: `cd generator && bun test`
Expected: All tests pass (neovim + existing wezterm + vscode + zed + starship)

- [ ] **Step 5: Commit**

```bash
git add generator/src/index.ts
git commit -m "feat(neovim): wire Neovim target into generateAll"
```

---

### Task 6: Verify generated output

**Files:**
- None modified — verify generated output only

- [ ] **Step 1: Check generated file structure**

Run: `ls -la themes/neovim/colors/ && ls -la themes/neovim/lua/synthpunk/`
Expected: 4 colors files + 1 theme.lua

- [ ] **Step 2: Check a colors file is thin**

Run: `cat themes/neovim/colors/synthpunk-pastel-dark.lua`
Expected: 4 lines (comment, colors_name, require, blank line)

- [ ] **Step 3: Check theme.lua has expected content**

Run: `head -20 themes/neovim/lua/synthpunk/theme.lua`
Expected: Starts with `-- Synthpunk Neovim theme`, `local M = {}`, `local variants = {`

- [ ] **Step 4: Commit generated output**

```bash
git add themes/neovim/
git commit -m "feat(neovim): add generated colorscheme plugin"
```

---

### Task 7: Add README

**Files:**
- Create: `themes/neovim/README.md`

- [ ] **Step 1: Create themes/neovim/README.md**

```markdown
# Synthpunk for Neovim

A Neovim colorscheme generated from the [Synthpunk](https://github.com/anomalyco/synthpunk) palette.

## Variants

- `synthpunk-pastel-dark` — Pastel dark mode (cool, nocturnal vaporwave)
- `synthpunk-pastel-light` — Pastel light mode (warm, dreamy vaporwave)
- `synthpunk-neon-dark` — Neon dark mode (vivid vaporwave neon)
- `synthpunk-neon-light` — Neon light mode (bright vaporwave neon)

## Installation

### Manual (no plugin manager)

```bash
git clone https://github.com/anomalyco/synthpunk /tmp/synthpunk
cp -r /tmp/synthpunk/themes/neovim/* ~/.config/nvim/
```

Then in your Neovim config:

```lua
vim.cmd("colorscheme synthpunk-pastel-dark")
```

### Lazy.nvim

```lua
{
  "anomalyco/synthpunk",
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
```

- [ ] **Step 2: Commit**

```bash
git add themes/neovim/README.md
git commit -m "docs(neovim): add README"
```
