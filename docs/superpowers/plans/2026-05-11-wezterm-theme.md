# WezTerm Theme Target Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add WezTerm as a theme generation target, producing TOML color scheme files for all 4 Synthpunk variants.

**Architecture:** New `palette/terminal-mapping.json` defines terminal-agnostic UI color roles. A new `generator/src/targets/wezterm.ts` generator reads palettes + terminal-mapping + ui-mapping to produce TOML output. The generator uses a manual TOML serializer since the structure is flat and simple. New `TerminalMapping` type added to types. `index.ts` updated to run WezTerm generation alongside VSCode/Zed.

**Tech Stack:** TypeScript, Bun test runner, existing palette/generator infrastructure

---

### Task 1: Add TerminalMapping type

**Files:**
- Modify: `generator/src/types.ts`

- [ ] **Step 1: Add TerminalMapping interface to types.ts**

Add the `TerminalMapping` type and related interfaces after the existing `UIMapping` interface (after line 49):

```ts
export interface TerminalTabBarTab {
  bg: string;
  fg: string;
}

export interface TerminalMapping {
  info: PaletteInfo;
  cursor: { bg: string; fg: string; border: string };
  selection: { fg: string; bg: string; bg_alpha: number };
  tab_bar: {
    background: string;
    active_tab: TerminalTabBarTab;
    inactive_tab: TerminalTabBarTab;
    new_tab: TerminalTabBarTab;
  };
  scrollbar: { thumb: string; thumb_hover: string };
  split: string;
  compose_cursor: string;
  quick_select: { label_bg: string; label_fg: string; match_bg: string; match_fg: string };
  copy_mode: { active_highlight_bg: string; active_highlight_fg: string; inactive_highlight_bg: string; inactive_highlight_fg: string };
}
```

- [ ] **Step 2: Run typecheck to verify**

Run: `cd /Users/maximilianhaarhaus/Projects/synthpunk/generator && bunx tsc --noEmit`
Expected: No new errors (existing code doesn't use TerminalMapping yet)

- [ ] **Step 3: Commit**

```bash
git add generator/src/types.ts
git commit -m "feat(generator): add TerminalMapping type for terminal UI color roles"
```

---

### Task 2: Create terminal-mapping.json and its schema

**Files:**
- Create: `palette/terminal-mapping.json`
- Create: `schemas/terminal-mapping.json`

- [ ] **Step 1: Create the terminal-mapping.json palette file**

Create `palette/terminal-mapping.json`:

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

- [ ] **Step 2: Create the JSON schema for terminal-mapping**

Create `schemas/terminal-mapping.json`:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Terminal Mapping",
  "description": "Schema for terminal-agnostic UI role to palette color mappings",
  "type": "object",
  "required": ["info", "cursor", "selection", "tab_bar", "scrollbar", "split", "compose_cursor", "quick_select", "copy_mode"],
  "properties": {
    "info": {
      "type": "object",
      "required": ["name", "description", "version"],
      "properties": {
        "name": { "type": "string" },
        "description": { "type": "string" },
        "version": { "type": "string" }
      }
    },
    "cursor": {
      "type": "object",
      "required": ["bg", "fg", "border"],
      "properties": {
        "bg": { "type": "string" },
        "fg": { "type": "string" },
        "border": { "type": "string" }
      }
    },
    "selection": {
      "type": "object",
      "required": ["fg", "bg", "bg_alpha"],
      "properties": {
        "fg": { "type": "string" },
        "bg": { "type": "string" },
        "bg_alpha": { "type": "number", "minimum": 0, "maximum": 1 }
      }
    },
    "tab_bar": {
      "type": "object",
      "required": ["background", "active_tab", "inactive_tab", "new_tab"],
      "properties": {
        "background": { "type": "string" },
        "active_tab": {
          "type": "object",
          "required": ["bg", "fg"],
          "properties": { "bg": { "type": "string" }, "fg": { "type": "string" } }
        },
        "inactive_tab": {
          "type": "object",
          "required": ["bg", "fg"],
          "properties": { "bg": { "type": "string" }, "fg": { "type": "string" } }
        },
        "new_tab": {
          "type": "object",
          "required": ["bg", "fg"],
          "properties": { "bg": { "type": "string" }, "fg": { "type": "string" } }
        }
      }
    },
    "scrollbar": {
      "type": "object",
      "required": ["thumb", "thumb_hover"],
      "properties": {
        "thumb": { "type": "string" },
        "thumb_hover": { "type": "string" }
      }
    },
    "split": { "type": "string" },
    "compose_cursor": { "type": "string" },
    "quick_select": {
      "type": "object",
      "required": ["label_bg", "label_fg", "match_bg", "match_fg"],
      "properties": {
        "label_bg": { "type": "string" },
        "label_fg": { "type": "string" },
        "match_bg": { "type": "string" },
        "match_fg": { "type": "string" }
      }
    },
    "copy_mode": {
      "type": "object",
      "required": ["active_highlight_bg", "active_highlight_fg", "inactive_highlight_bg", "inactive_highlight_fg"],
      "properties": {
        "active_highlight_bg": { "type": "string" },
        "active_highlight_fg": { "type": "string" },
        "inactive_highlight_bg": { "type": "string" },
        "inactive_highlight_fg": { "type": "string" }
      }
    }
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add palette/terminal-mapping.json schemas/terminal-mapping.json
git commit -m "feat(palette): add terminal-mapping.json and schema for WezTerm target"
```

---

### Task 3: Create loadTerminalMapping function and failing test

**Files:**
- Create: `generator/src/terminalMapping.ts`
- Create: `generator/src/terminalMapping.test.ts`

- [ ] **Step 1: Write the failing test for loadTerminalMapping**

Create `generator/src/terminalMapping.test.ts`:

```ts
import { describe, expect, test } from "bun:test";
import { loadTerminalMapping } from "./terminalMapping";
import path from "node:path";

const PROJECT_DIR = path.resolve(import.meta.dir, "../..");
const PALETTE_DIR = path.join(PROJECT_DIR, "palette");

describe("loadTerminalMapping", () => {
  test("loads terminal mapping from palette directory", () => {
    const mapping = loadTerminalMapping(PALETTE_DIR);

    expect(mapping.info.name).toBe("synthpunk-terminal");
    expect(mapping.cursor.bg).toBe("lavender");
    expect(mapping.cursor.fg).toBe("base");
    expect(mapping.cursor.border).toBe("lavender");
    expect(mapping.selection.bg).toBe("teal");
    expect(mapping.selection.bg_alpha).toBeCloseTo(0.3);
    expect(mapping.tab_bar.background).toBe("mantle");
    expect(mapping.tab_bar.active_tab.bg).toBe("base");
    expect(mapping.tab_bar.active_tab.fg).toBe("text");
    expect(mapping.split).toBe("surface1");
    expect(mapping.compose_cursor).toBe("flamingo");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd /Users/maximilianhaarhaus/Projects/synthpunk/generator && bun test src/terminalMapping.test.ts`
Expected: FAIL with "Cannot find module './terminalMapping'"

- [ ] **Step 3: Implement loadTerminalMapping**

Create `generator/src/terminalMapping.ts`:

```ts
import fs from "node:fs";
import path from "node:path";
import type { TerminalMapping } from "./types";

export function loadTerminalMapping(paletteDir: string): TerminalMapping {
  const filePath = path.join(paletteDir, "terminal-mapping.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as TerminalMapping;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd /Users/maximilianhaarhaus/Projects/synthpunk/generator && bun test src/terminalMapping.test.ts`
Expected: PASS (1 test, all assertions pass)

- [ ] **Step 5: Commit**

```bash
git add generator/src/terminalMapping.ts generator/src/terminalMapping.test.ts
git commit -m "feat(generator): add loadTerminalMapping for terminal UI color roles"
```

---

### Task 4: Create WezTerm TOML serializer and failing test

**Files:**
- Create: `generator/src/targets/wezterm.ts`
- Create: `generator/src/targets/wezterm.test.ts`

- [ ] **Step 1: Write failing tests for the WezTerm generator**

Create `generator/src/targets/wezterm.test.ts`:

```ts
import { describe, expect, test } from "bun:test";
import { generateWeztermTheme, tomlStringify } from "./wezterm";
import { loadPalette } from "../palette";
import { loadUIMapping } from "../uiMapping";
import { loadTerminalMapping } from "../terminalMapping";
import type { VariantName } from "../types";
import path from "node:path";

const PROJECT_DIR = path.resolve(import.meta.dir, "../../..");
const PALETTE_DIR = path.join(PROJECT_DIR, "palette");

describe("generateWeztermTheme", () => {
  function loadFixtures(variant: VariantName) {
    const palette = loadPalette(PALETTE_DIR, variant);
    const uiMapping = loadUIMapping(PALETTE_DIR);
    const terminalMapping = loadTerminalMapping(PALETTE_DIR);
    return { palette, uiMapping, terminalMapping };
  }

  test("pastel-dark theme has correct foreground and background", () => {
    const { palette, uiMapping, terminalMapping } = loadFixtures("pastel-dark");
    const theme = generateWeztermTheme("pastel-dark", palette, uiMapping, terminalMapping);

    expect(theme.foreground).toBe("#F0E0F0");
    expect(theme.background).toBe("#1E1028");
  });

  test("pastel-light theme has correct foreground and background", () => {
    const { palette, uiMapping, terminalMapping } = loadFixtures("pastel-light");
    const theme = generateWeztermTheme("pastel-light", palette, uiMapping, terminalMapping);

    expect(theme.foreground).toBe("#2E1A24");
    expect(theme.background).toBe("#FFF8F5");
  });

  test("pastel-dark theme has correct cursor colors", () => {
    const { palette, uiMapping, terminalMapping } = loadFixtures("pastel-dark");
    const theme = generateWeztermTheme("pastel-dark", palette, uiMapping, terminalMapping);

    expect(theme.cursor_bg).toBe("#C49BFF");
    expect(theme.cursor_fg).toBe("#1E1028");
    expect(theme.cursor_border).toBe("#C49BFF");
  });

  test("pastel-dark theme has correct selection colors", () => {
    const { palette, uiMapping, terminalMapping } = loadFixtures("pastel-dark");
    const theme = generateWeztermTheme("pastel-dark", palette, uiMapping, terminalMapping);

    expect(theme.selection_fg).toBe("#F0E0F0");
    expect(theme.selection_bg).toMatch(/^rgba\(/); 
  });

  test("pastel-dark theme has correct tab bar colors", () => {
    const { palette, uiMapping, terminalMapping } = loadFixtures("pastel-dark");
    const theme = generateWeztermTheme("pastel-dark", palette, uiMapping, terminalMapping);

    expect(theme.tab_bar.background).toBe("#160A20");
    expect(theme.tab_bar.active_tab.bg_color).toBe("#1E1028");
    expect(theme.tab_bar.active_tab.fg_color).toBe("#F0E0F0");
    expect(theme.tab_bar.inactive_tab.bg_color).toBe("#160A20");
    expect(theme.tab_bar.inactive_tab.fg_color).toBe("#C8B0D8");
  });

  test("pastel-dark theme has correct ANSI colors", () => {
    const { palette, uiMapping, terminalMapping } = loadFixtures("pastel-dark");
    const theme = generateWeztermTheme("pastel-dark", palette, uiMapping, terminalMapping);

    expect(theme.ansi).toHaveLength(8);
    expect(theme.ansi[0]).toBe("#0D0612"); // crust (dark)
    expect(theme.ansi[1]).toBe("#FF5470"); // red
    expect(theme.ansi[2]).toBe("#7FD7B5"); // green
    expect(theme.ansi[3]).toBe("#FFE4B5"); // yellow
    expect(theme.ansi[4]).toBe("#8BA4FF"); // blue
    expect(theme.ansi[5]).toBe("#FF7DB0"); // pink (magenta)
    expect(theme.ansi[6]).toBe("#5ED4E0"); // teal (cyan)
    expect(theme.ansi[7]).toBe("#C8B0D8"); // subtext1 (white, dark)
  });

  test("pastel-light theme has correct ANSI colors", () => {
    const { palette, uiMapping, terminalMapping } = loadFixtures("pastel-light");
    const theme = generateWeztermTheme("pastel-light", palette, uiMapping, terminalMapping);

    expect(theme.ansi).toHaveLength(8);
    expect(theme.ansi[0]).toBe("#2E1A24"); // text (light: black → text)
    expect(theme.ansi[7]).toBe("#997A8A"); // subtext0 (light: white → subtext0)
  });

  test("pastel-dark theme brights are brighter than ANSI base", () => {
    const { palette, uiMapping, terminalMapping } = loadFixtures("pastel-dark");
    const theme = generateWeztermTheme("pastel-dark", palette, uiMapping, terminalMapping);

    expect(theme.brights).toHaveLength(8);
    expect(theme.brights[0]).toBe("#A090B8"); // subtext0 (bright black, dark)
    expect(theme.brights[7]).toBe("#F0E0F0"); // text (bright white)
  });

  test("pastel-light theme brights are brighter than ANSI base", () => {
    const { palette, uiMapping, terminalMapping } = loadFixtures("pastel-light");
    const theme = generateWeztermTheme("pastel-light", palette, uiMapping, terminalMapping);

    expect(theme.brights).toHaveLength(8);
    expect(theme.brights[0]).toBe("#6B4F5E"); // subtext1 (bright black, light)
    expect(theme.brights[7]).toBe("#2E1A24"); // text (bright white)
  });

  test("scrollbar and split colors are set", () => {
    const { palette, uiMapping, terminalMapping } = loadFixtures("pastel-dark");
    const theme = generateWeztermTheme("pastel-dark", palette, uiMapping, terminalMapping);

    expect(theme.scrollbar_thumb).toBe("#C8B0D8");
    expect(theme.split).toBe("#3A2850");
  });
});

describe("tomlStringify", () => {
  test("produces valid TOML with all required sections", () => {
    const { palette, uiMapping, terminalMapping } = loadFixtures("pastel-dark");
    const theme = generateWeztermTheme("pastel-dark", palette, uiMapping, terminalMapping);
    const toml = tomlStringify("Synthpunk Pastel Dark", theme);

    expect(toml).toContain("[colors]");
    expect(toml).toContain("foreground = \"#F0E0F0\"");
    expect(toml).toContain("background = \"#1E1028\"");
    expect(toml).toContain("cursor_bg = \"#C49BFF\"");
    expect(toml).toContain("[colors.tab_bar]");
    expect(toml).toContain("[colors.tab_bar.active_tab]");
    expect(toml).toContain("[colors.tab_bar.inactive_tab]");
    expect(toml).toContain("ansi = [");
    expect(toml).toContain("brights = [");
  });

  test("TOML output starts with comment header", () => {
    const { palette, uiMapping, terminalMapping } = loadFixtures("pastel-dark");
    const theme = generateWeztermTheme("pastel-dark", palette, uiMapping, terminalMapping);
    const toml = tomlStringify("Synthpunk Pastel Dark", theme);

    expect(toml.startsWith("# Synthpunk Pastel Dark")).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd /Users/maximilianhaarhaus/Projects/synthpunk/generator && bun test src/targets/wezterm.test.ts`
Expected: FAIL with "Cannot find module './wezterm'"

- [ ] **Step 3: Implement the WezTerm generator**

Create `generator/src/targets/wezterm.ts`:

```ts
import type { VariantName, Palette, UIMapping, TerminalMapping } from "../types";
import { VARIANT_TYPE } from "../types";
import { resolveColor, colorToHex } from "../palette";
import { adjustBrightness } from "../colorUtils";

interface WeztermTab {
  bg_color: string;
  fg_color: string;
}

interface WeztermTabBar {
  background: string;
  active_tab: WeztermTab;
  inactive_tab: WeztermTab;
  new_tab: WeztermTab;
}

interface WeztermTheme {
  foreground: string;
  background: string;
  cursor_bg: string;
  cursor_fg: string;
  cursor_border: string;
  selection_fg: string;
  selection_bg: string;
  scrollbar_thumb: string;
  split: string;
  compose_cursor: string;
  tab_bar: WeztermTabBar;
  ansi: string[];
  brights: string[];
}

function hex(palette: Palette, colorName: string): string {
  const color = resolveColor(palette, colorName);
  return colorToHex(color);
}

function hexWithAlpha(palette: Palette, colorName: string, alpha: number): string {
  const color = resolveColor(palette, colorName);
  return colorToHex(color, alpha);
}

function brightHex(palette: Palette, colorName: string, factor: number = 0.2): string {
  const color = resolveColor(palette, colorName);
  const brightRgb = adjustBrightness(color.rgb, factor, "lighten");
  return `#${brightRgb.map(c => Math.max(0, Math.min(255, Math.round(c))).toString(16).padStart(2, "0").toUpperCase()).join("")}`;
}

function buildAnsiColors(palette: Palette, isDark: boolean, uiMapping: UIMapping): string[] {
  const t = uiMapping.terminal;
  const ansi0 = isDark ? hex(palette, "crust") : hex(palette, t.black);
  const ansi7 = isDark ? hex(palette, t.white) : hex(palette, t.white);

  return [
    ansi0,
    hex(palette, t.red),
    hex(palette, t.green),
    hex(palette, t.yellow),
    hex(palette, t.blue),
    hex(palette, t.magenta),
    hex(palette, t.cyan),
    ansi7,
  ];
}

function buildBrightColors(palette: Palette, isDark: boolean, uiMapping: UIMapping): string[] {
  const t = uiMapping.terminal;
  const bright0 = isDark ? hex(palette, "subtext0") : hex(palette, "subtext1");
  const bright7 = hex(palette, t.bright_white);

  return [
    bright0,
    brightHex(palette, t.red),
    brightHex(palette, t.green),
    brightHex(palette, t.yellow),
    brightHex(palette, t.blue),
    brightHex(palette, t.magenta),
    brightHex(palette, t.cyan),
    bright7,
  ];
}

export function generateWeztermTheme(
  variant: VariantName,
  palette: Palette,
  uiMapping: UIMapping,
  terminalMapping: TerminalMapping,
): WeztermTheme {
  const isDark = VARIANT_TYPE[variant] === "dark";
  const tm = terminalMapping;

  const selectionBg = isDark
    ? `rgba(${resolveColor(palette, tm.selection.bg).rgb.join(", ")}, ${tm.selection.bg_alpha})`
    : `rgba(${resolveColor(palette, tm.selection.bg).rgb.join(", ")}, ${tm.selection.bg_alpha})`;

  return {
    foreground: hex(palette, "text"),
    background: hex(palette, "base"),
    cursor_bg: hex(palette, tm.cursor.bg),
    cursor_fg: hex(palette, tm.cursor.fg),
    cursor_border: hex(palette, tm.cursor.border),
    selection_fg: hex(palette, tm.selection.fg),
    selection_bg: selectionBg,
    scrollbar_thumb: hex(palette, tm.scrollbar.thumb),
    split: hex(palette, tm.split),
    compose_cursor: hex(palette, tm.compose_cursor),
    tab_bar: {
      background: hex(palette, tm.tab_bar.background),
      active_tab: {
        bg_color: hex(palette, tm.tab_bar.active_tab.bg),
        fg_color: hex(palette, tm.tab_bar.active_tab.fg),
      },
      inactive_tab: {
        bg_color: hex(palette, tm.tab_bar.inactive_tab.bg),
        fg_color: hex(palette, tm.tab_bar.inactive_tab.fg),
      },
      new_tab: {
        bg_color: hex(palette, tm.tab_bar.new_tab.bg),
        fg_color: hex(palette, tm.tab_bar.new_tab.fg),
      },
    },
    ansi: buildAnsiColors(palette, isDark, uiMapping),
    brights: buildBrightColors(palette, isDark, uiMapping),
  };
}

export function tomlStringify(name: string, theme: WeztermTheme): string {
  const lines: string[] = [];

  lines.push(`# ${name}`);
  lines.push("");

  lines.push("[colors]");
  lines.push(`foreground = "${theme.foreground}"`);
  lines.push(`background = "${theme.background}"`);
  lines.push(`cursor_bg = "${theme.cursor_bg}"`);
  lines.push(`cursor_fg = "${theme.cursor_fg}"`);
  lines.push(`cursor_border = "${theme.cursor_border}"`);
  lines.push(`selection_fg = "${theme.selection_fg}"`);
  lines.push(`selection_bg = "${theme.selection_bg}"`);
  lines.push(`scrollbar_thumb = "${theme.scrollbar_thumb}"`);
  lines.push(`split = "${theme.split}"`);
  lines.push(`compose_cursor = "${theme.compose_cursor}"`);
  lines.push("");

  lines.push("[colors.tab_bar]");
  lines.push(`background = "${theme.tab_bar.background}"`);
  lines.push("");

  lines.push("[colors.tab_bar.active_tab]");
  lines.push(`bg_color = "${theme.tab_bar.active_tab.bg_color}"`);
  lines.push(`fg_color = "${theme.tab_bar.active_tab.fg_color}"`);
  lines.push("");

  lines.push("[colors.tab_bar.inactive_tab]");
  lines.push(`bg_color = "${theme.tab_bar.inactive_tab.bg_color}"`);
  lines.push(`fg_color = "${theme.tab_bar.inactive_tab.fg_color}"`);
  lines.push("");

  lines.push("[colors.tab_bar.new_tab]");
  lines.push(`bg_color = "${theme.tab_bar.new_tab.bg_color}"`);
  lines.push(`fg_color = "${theme.tab_bar.new_tab.fg_color}"`);
  lines.push("");

  const ansiStr = theme.ansi.map(c => `"${c}"`).join(", ");
  lines.push(`ansi = [${ansiStr}]`);
  lines.push("");

  const brightsStr = theme.brights.map(c => `"${c}"`).join(", ");
  lines.push(`brights = [${brightsStr}]`);
  lines.push("");

  return lines.join("\n");
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd /Users/maximilianhaarhaus/Projects/synthpunk/generator && bun test src/targets/wezterm.test.ts`
Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
git add generator/src/targets/wezterm.ts generator/src/targets/wezterm.test.ts
git commit -m "feat(generator): add WezTerm TOML theme generator with tests"
```

---

### Task 5: Wire up WezTerm generation in index.ts

**Files:**
- Modify: `generator/src/index.ts`

- [ ] **Step 1: Add WezTerm import and generation logic to index.ts**

Add the import for the new modules at the top of `generator/src/index.ts`, and add the WezTerm generation block after the Zed generation block. The new import and generation code:

Add these imports after the existing imports (after line 7):

```ts
import { generateWeztermTheme, tomlStringify } from "./targets/wezterm";
import { loadTerminalMapping } from "./terminalMapping";
```

Add `WEZTERM_DIR` constant after `VSCODE_DIR` (after line 13):

```ts
const WEZTERM_DIR = path.join(PROJECT_DIR, "themes", "wezterm");
```

Add `VARIANT_WEZTERM_FILE` after `VARIANT_VSCODE_FILE` (after line 22):

```ts
const VARIANT_WEZTERM_FILE: Record<VariantName, string> = {
  "pastel-dark": "synthpunk-pastel-dark.toml",
  "pastel-light": "synthpunk-pastel-light.toml",
  "neon-dark": "synthpunk-neon-dark.toml",
  "neon-light": "synthpunk-neon-light.toml",
};
```

Add this block after the Zed generation block, inside `generateAll()`, after the line `console.log(\`Generated ${neonZedPath}\`)` and before the closing `}` of `generateAll()`:

```ts
  // Generate WezTerm themes
  const terminalMapping = loadTerminalMapping(PALETTE_DIR);
  ensureDir(WEZTERM_DIR);
  for (const variant of VARIANTS) {
    const palette = loadPalette(PALETTE_DIR, variant);
    const weztermTheme = generateWeztermTheme(variant, palette, uiMapping, terminalMapping);
    const toml = tomlStringify(VARIANT_DISPLAY_NAMES[variant], weztermTheme);
    const fileName = VARIANT_WEZTERM_FILE[variant];
    const filePath = path.join(WEZTERM_DIR, fileName);
    fs.writeFileSync(filePath, toml);
    console.log(`Generated ${filePath}`);
  }
```

- [ ] **Step 2: Run the generator to produce output files**

Run: `cd /Users/maximilianhaarhaus/Projects/synthpunk/generator && bun run src/index.ts`
Expected: Output shows "Generated" lines for all 4 WezTerm variants, alongside existing VSCode/Zed output

- [ ] **Step 3: Verify the generated TOML files exist and look correct**

Run: `ls /Users/maximilianhaarhaus/Projects/synthpunk/themes/wezterm/`
Expected: 4 .toml files listed

Then inspect one: `cat /Users/maximilianhaarhaus/Projects/synthpunk/themes/wezterm/synthpunk-pastel-dark.toml`
Expected: Valid TOML with all color sections present

- [ ] **Step 4: Run all tests to verify nothing is broken**

Run: `cd /Users/maximilianhaarhaus/Projects/synthpunk/generator && bun test`
Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
git add generator/src/index.ts themes/wezterm/
git commit -m "feat(generator): wire up WezTerm theme generation for all 4 variants"
```

---

### Task 6: Add .gitignore entries and README for themes/wezterm

**Files:**
- Modify: `.gitignore` (if generated files are ignored — check first)
- Create: `themes/wezterm/README.md`

- [ ] **Step 1: Check gitignore status**

Run: `cat /Users/maximilianhaarhaus/Projects/synthpunk/.gitignore`
If the generated theme files in `themes/` are already tracked/gitignored as appropriate, note it. The other theme dirs (vscode, zed) have their generated files committed, so WezTerm should follow the same pattern.

- [ ] **Step 2: Create README for the WezTerm themes directory**

Create `themes/wezterm/README.md`:

```md
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

Run from the project root:

```sh
cd generator && bun run src/index.ts
```
```

- [ ] **Step 3: Commit**

```bash
git add themes/wezterm/README.md
git commit -m "docs: add README for WezTerm themes"
```

---

### Task 7: Run full validation

**Files:**
- No file changes

- [ ] **Step 1: Run all generator tests**

Run: `cd /Users/maximilianhaarhaus/Projects/synthpunk/generator && bun test`
Expected: All tests pass (including wezterm.test.ts, terminalMapping.test.ts, and existing tests)

- [ ] **Step 2: Run TypeScript type check**

Run: `cd /Users/maximilianhaarhaus/Projects/synthpunk/generator && bunx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Re-generate all themes and verify WezTerm output**

Run: `cd /Users/maximilianhaarhaus/Projects/synthpunk/generator && bun run src/index.ts`
Then verify each file exists and contains expected content:

```bash
ls -la /Users/maximilianhaarhaus/Projects/synthpunk/themes/wezterm/
```

Expected: 4 `.toml` files + 1 `README.md`

- [ ] **Step 4: Verify TOML validity (manual spot check)**

```bash
head -20 /Users/maximilianhaarhaus/Projects/synthpunk/themes/wezterm/synthpunk-pastel-dark.toml
```

Expected: Starts with `# Synthpunk Pastel Dark`, contains `[colors]`, `[colors.tab_bar]`, `ansi = [`, `brights = [` sections

- [ ] **Step 5: Verify all 4 variants contain correct colors**

```bash
grep "foreground" /Users/maximilianhaarhaus/Projects/synthpunk/themes/wezterm/synthpunk-*.toml
```

Expected:
- pastel-dark: `#F0E0F0`
- pastel-light: `#2E1A24`
- neon-dark: `#E8E0F0`
- neon-light: `#2A1A30`