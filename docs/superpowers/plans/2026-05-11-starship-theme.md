# Starship Theme Target Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Starship as a theme generation target, producing a single TOML file with all 4 synthpunk variant palettes and powerline prompt module configs.

**Architecture:** New `generator/src/targets/starship.ts` generator reads all 4 palettes and produces a single `themes/starship/starship.toml` with format string, module configs, and four `[palettes.*]` sections. A manual TOML string builder (same pattern as wezterm.ts) serializes the output. `index.ts` wires up generation alongside existing targets.

**Tech Stack:** TypeScript, Bun test runner, existing palette/generator infrastructure

---

### Task 1: Create starship.ts generator and failing test

**Files:**
- Create: `generator/src/targets/starship.ts`
- Create: `generator/src/targets/starship.test.ts`

- [ ] **Step 1: Write failing tests for the Starship generator**

Create `generator/src/targets/starship.test.ts`:

```ts
import { describe, expect, test } from "bun:test";
import { generateStarshipToml } from "./starship";
import { loadPalette } from "../palette";
import type { VariantName } from "../types";
import path from "node:path";

const PROJECT_DIR = path.resolve(import.meta.dir, "../../..");
const PALETTE_DIR = path.join(PROJECT_DIR, "palette");

function loadAllPalettes(): Record<VariantName, ReturnType<typeof loadPalette>> {
  const variants: VariantName[] = ["pastel-dark", "pastel-light", "neon-dark", "neon-light"];
  const palettes = {} as Record<VariantName, ReturnType<typeof loadPalette>>;
  for (const v of variants) {
    palettes[v] = loadPalette(PALETTE_DIR, v);
  }
  return palettes;
}

describe("generateStarshipToml", () => {
  test("contains schema header", () => {
    const palettes = loadAllPalettes();
    const toml = generateStarshipToml(palettes);
    expect(toml).toContain('"$schema" = \'https://starship.rs/config-schema.json\'');
  });

  test("sets default palette to synthpunk_pastel_dark", () => {
    const palettes = loadAllPalettes();
    const toml = generateStarshipToml(palettes);
    expect(toml).toContain("palette = 'synthpunk_pastel_dark'");
  });

  test("contains format string with powerline segments", () => {
    const palettes = loadAllPalettes();
    const toml = generateStarshipToml(palettes);
    expect(toml).toContain("$os");
    expect(toml).toContain("$username");
    expect(toml).toContain("$directory");
    expect(toml).toContain("$git_branch");
    expect(toml).toContain("$git_status");
    expect(toml).toContain("$time");
    expect(toml).toContain("$character");
  });

  test("contains all 4 palette sections", () => {
    const palettes = loadAllPalettes();
    const toml = generateStarshipToml(palettes);
    expect(toml).toContain("[palettes.synthpunk_pastel_dark]");
    expect(toml).toContain("[palettes.synthpunk_pastel_light]");
    expect(toml).toContain("[palettes.synthpunk_neon_dark]");
    expect(toml).toContain("[palettes.synthpunk_neon_light]");
  });

  test("pastel-dark palette has correct hex values", () => {
    const palettes = loadAllPalettes();
    const toml = generateStarshipToml(palettes);
    const pdSection = toml.split("[palettes.synthpunk_pastel_dark]")[1].split("[palettes.")[0];
    expect(pdSection).toContain('red = "#FF5470"');
    expect(pdSection).toContain('text = "#F0E0F0"');
    expect(pdSection).toContain('base = "#1E1028"');
    expect(pdSection).toContain('crust = "#0D0612"');
    expect(pdSection).toContain('lavender = "#C49BFF"');
  });

  test("neon-dark palette has correct hex values", () => {
    const palettes = loadAllPalettes();
    const toml = generateStarshipToml(palettes);
    const ndSection = toml.split("[palettes.synthpunk_neon_dark]")[1].split("[palettes.")[0];
    expect(ndSection).toContain('red = "#FF3A50"');
    expect(ndSection).toContain('text = "#E8E0F0"');
    expect(ndSection).toContain('base = "#0F0620"');
  });

  test("each palette section has all 23 colors", () => {
    const palettes = loadAllPalettes();
    const toml = generateStarshipToml(palettes);
    const pdSection = toml.split("[palettes.synthpunk_pastel_dark]")[1].split("[palettes.")[0];
    const colorLines = pdSection.split("\n").filter((line: string) => line.match(/^\w/));
    expect(colorLines.length).toBe(23);
  });

  test("contains os module config", () => {
    const palettes = loadAllPalettes();
    const toml = generateStarshipToml(palettes);
    expect(toml).toContain("[os]");
    expect(toml).toContain("disabled = false");
    expect(toml).toContain('style = "bg:red fg:crust"');
  });

  test("contains username module config", () => {
    const palettes = loadAllPalettes();
    const toml = generateStarshipToml(palettes);
    expect(toml).toContain("[username]");
    expect(toml).toContain("show_always = true");
    expect(toml).toContain('style_user = "bg:red fg:crust"');
  });

  test("contains directory module config", () => {
    const palettes = loadAllPalettes();
    const toml = generateStarshipToml(palettes);
    expect(toml).toContain("[directory]");
    expect(toml).toContain('style = "bg:peach fg:crust"');
    expect(toml).toContain("truncation_length = 3");
  });

  test("contains git_branch and git_status module configs", () => {
    const palettes = loadAllPalettes();
    const toml = generateStarshipToml(palettes);
    expect(toml).toContain("[git_branch]");
    expect(toml).toContain('style = "bg:yellow"');
    expect(toml).toContain("[git_status]");
    expect(toml).toContain('style = "bg:yellow"');
  });

  test("contains language module configs", () => {
    const palettes = loadAllPalettes();
    const toml = generateStarshipToml(palettes);
    for (const lang of ["c", "rust", "golang", "nodejs", "bun", "php", "java", "kotlin", "haskell", "python"]) {
      expect(toml).toContain(`[${lang}]`);
    }
  });

  test("contains time module config", () => {
    const palettes = loadAllPalettes();
    const toml = generateStarshipToml(palettes);
    expect(toml).toContain("[time]");
    expect(toml).toContain("disabled = false");
    expect(toml).toContain('time_format = "%R"');
    expect(toml).toContain('style = "bg:lavender"');
  });

  test("contains character module config", () => {
    const palettes = loadAllPalettes();
    const toml = generateStarshipToml(palettes);
    expect(toml).toContain("[character]");
    expect(toml).toContain("disabled = false");
    expect(toml).toContain("success_symbol");
    expect(toml).toContain('fg:green');
    expect(toml).toContain('fg:red');
  });

  test("contains line_break config", () => {
    const palettes = loadAllPalettes();
    const toml = generateStarshipToml(palettes);
    expect(toml).toContain("[line_break]");
    expect(toml).toContain("disabled = true");
  });

  test("contains cmd_duration config", () => {
    const palettes = loadAllPalettes();
    const toml = generateStarshipToml(palettes);
    expect(toml).toContain("[cmd_duration]");
    expect(toml).toContain("show_milliseconds = true");
  });

  test("contains os.symbols", () => {
    const palettes = loadAllPalettes();
    const toml = generateStarshipToml(palettes);
    expect(toml).toContain("[os.symbols]");
    expect(toml).toContain("Macos");
  });

  test("contains directory.substitutions", () => {
    const palettes = loadAllPalettes();
    const toml = generateStarshipToml(palettes);
    expect(toml).toContain("[directory.substitutions]");
    expect(toml).toContain("Documents");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd /Users/maximilianhaarhaus/Projects/synthpunk/generator && bun test src/targets/starship.test.ts`
Expected: FAIL with "Cannot find module './starship'"

- [ ] **Step 3: Implement the Starship generator**

Create `generator/src/targets/starship.ts`:

```ts
import type { VariantName, Palette } from "../types";
import { loadPalette } from "../palette";

const FORMAT = `\
[\\[](red)\
$os\
$username\
[\\]](bg:peach fg:red)\
$directory\
[\\]](bg:yellow fg:peach)\
$git_branch\
$git_status\
[\\]](fg:yellow bg:green)\
$c\
$rust\
$golang\
$nodejs\
$bun\
$php\
$java\
$kotlin\
$haskell\
$python\
[\\]](fg:green bg:sapphire)\
$conda\
$docker_context\
[\\]](fg:sapphire bg:lavender)\
$time\
[\\]](fg:lavender)\
$cmd_duration\
$line_break\
$character`;

const OS_SYMBOLS: Record<string, string> = {
  Windows: "",
  Ubuntu: "󰕈",
  SUSE: "",
  Raspbian: "󰐿",
  Mint: "󰣭",
  Macos: "󰀵",
  Manjaro: "",
  Linux: "󰌽",
  Gentoo: "󰣨",
  Fedora: "󰣛",
  Alpine: "",
  Amazon: "",
  Android: "",
  AOSC: "",
  Arch: "󰣇",
  Artix: "󰣇",
  CentOS: "",
  Debian: "󰣚",
  Redhat: "󱄛",
  RedHatEnterprise: "󱄛",
};

const DIR_SUBSTITUTIONS: Record<string, string> = {
  Documents: "󰈙 ",
  Downloads: " ",
  Music: "󰝚 ",
  Pictures: " ",
  Developer: "󰲋 ",
};

const LANGUAGE_MODULES = ["c", "rust", "golang", "nodejs", "bun", "php", "java", "kotlin", "haskell", "python"] as const;

const LANGUAGE_SYMBOLS: Record<string, string> = {
  c: " ",
  rust: "",
  golang: "",
  nodejs: "",
  bun: "",
  php: "",
  java: " ",
  kotlin: "",
  haskell: "",
  python: "",
};

function paletteSection(name: string, palette: Palette): string {
  const lines = [`[palettes.${name}]`];
  for (const [colorName, color] of Object.entries(palette.colors)) {
    lines.push(`${colorName} = "#${color.hex}"`);
  }
  return lines.join("\n");
}

function tomlKeyValue(key: string, value: string): string {
  return `${key} = ${value}`;
}

function tomlString(value: string): string {
  return `'${value}'`;
}

function tomlQuotedString(value: string): string {
  return `"${value}"`;
}

export function generateStarshipToml(palettes: Record<VariantName, Palette>): string {
  const sections: string[] = [];

  sections.push(`"$schema" = 'https://starship.rs/config-schema.json'`);
  sections.push("");
  sections.push("format = '''");
  sections.push(FORMAT);
  sections.push("'''");
  sections.push("");
  sections.push("palette = 'synthpunk_pastel_dark'");
  sections.push("");

  sections.push("[os]");
  sections.push("disabled = false");
  sections.push(tomlKeyValue("style", tomlQuotedString("bg:red fg:crust")));
  sections.push("");

  sections.push("[os.symbols]");
  for (const [osName, symbol] of Object.entries(OS_SYMBOLS)) {
    sections.push(`${osName} = "${symbol}"`);
  }
  sections.push("");

  sections.push("[username]");
  sections.push("show_always = true");
  sections.push(tomlKeyValue("style_user", tomlQuotedString("bg:red fg:crust")));
  sections.push(tomlKeyValue("style_root", tomlQuotedString("bg:red fg:crust")));
  sections.push(tomlKeyValue("format", tomlQuotedString("[ $user]($style)")));
  sections.push("");

  sections.push("[directory]");
  sections.push(tomlKeyValue("style", tomlQuotedString("bg:peach fg:crust")));
  sections.push(tomlKeyValue("format", tomlQuotedString("[ $path ]($style)")));
  sections.push("truncation_length = 3");
  sections.push(tomlKeyValue("truncation_symbol", tomlQuotedString(".../")));
  sections.push("");

  sections.push("[directory.substitutions]");
  for (const [dirName, icon] of Object.entries(DIR_SUBSTITUTIONS)) {
    sections.push(`${dirName} = "${icon}"`);
  }
  sections.push("");

  sections.push("[git_branch]");
  sections.push(tomlKeyValue("symbol", tomlQuotedString("")));
  sections.push(tomlKeyValue("style", tomlQuotedString("bg:yellow")));
  sections.push(tomlKeyValue("format", tomlQuotedString("[[ $symbol $branch ](fg:crust bg:yellow)]($style)")));
  sections.push("");

  sections.push("[git_status]");
  sections.push(tomlKeyValue("style", tomlQuotedString("bg:yellow")));
  sections.push(tomlKeyValue("format", tomlQuotedString("[[($all_status$ahead_behind )](fg:crust bg:yellow)]($style)]")));
  sections.push("");

  for (const lang of LANGUAGE_MODULES) {
    const symbol = LANGUAGE_SYMBOLS[lang];
    sections.push(`[${lang}]`);
    sections.push(tomlKeyValue("symbol", tomlQuotedString(`${symbol}`)));
    sections.push(tomlKeyValue("style", tomlQuotedString("bg:green")));
    sections.push(tomlKeyValue("format", tomlQuotedString(`[[ $symbol( $version) ](fg:crust bg:green)]($style)`)));
    sections.push("");
  }

  sections.push("[docker_context]");
  sections.push(tomlKeyValue("symbol", tomlQuotedString(""));
  sections.push(tomlKeyValue("style", tomlQuotedString("bg:sapphire")));
  sections.push(tomlKeyValue("format", tomlQuotedString("[[ $symbol( $context) ](fg:crust bg:sapphire)]($style)")));
  sections.push("");

  sections.push("[conda]");
  sections.push(tomlKeyValue("symbol", tomlQuotedString("  ")));
  sections.push(tomlKeyValue("style", tomlQuotedString("fg:crust bg:sapphire")));
  sections.push(tomlKeyValue("format", tomlQuotedString("[$symbol$environment ]($style)")));
  sections.push("ignore_base = false");
  sections.push("");

  sections.push("[time]");
  sections.push("disabled = false");
  sections.push(tomlKeyValue("time_format", tomlQuotedString("%R")));
  sections.push(tomlKeyValue("style", tomlQuotedString("bg:lavender")));
  sections.push(tomlKeyValue("format", tomlQuotedString("[[  $time ](fg:crust bg:lavender)]($style)")));
  sections.push("");

  sections.push("[line_break]");
  sections.push("disabled = true");
  sections.push("");

  sections.push("[character]");
  sections.push("disabled = false");
  sections.push(tomlKeyValue("success_symbol", tomlQuotedString("[>](bold fg:green)")));
  sections.push(tomlKeyValue("error_symbol", tomlQuotedString("[>](bold fg:red)")));
  sections.push(tomlKeyValue("vimcmd_symbol", tomlQuotedString("[<](bold fg:green)")));
  sections.push(tomlKeyValue("vimcmd_replace_one_symbol", tomlQuotedString("[<](bold fg:lavender)")));
  sections.push(tomlKeyValue("vimcmd_replace_symbol", tomlQuotedString("[<](bold fg:lavender)")));
  sections.push(tomlKeyValue("vimcmd_visual_symbol", tomlQuotedString("[<](bold fg:yellow)")));
  sections.push("");

  sections.push("[cmd_duration]");
  sections.push("show_milliseconds = true");
  sections.push(tomlKeyValue("format", tomlQuotedString(" in $duration ")));
  sections.push(tomlKeyValue("style", tomlQuotedString("bg:lavender")));
  sections.push("disabled = false");
  sections.push("show_notifications = true");
  sections.push("min_time_to_notify = 45000");
  sections.push("");

  sections.push(paletteSection("synthpunk_pastel_dark", palettes["pastel-dark"]));
  sections.push("");

  sections.push(paletteSection("synthpunk_pastel_light", palettes["pastel-light"]));
  sections.push("");

  sections.push(paletteSection("synthpunk_neon_dark", palettes["neon-dark"]));
  sections.push("");

  sections.push(paletteSection("synthpunk_neon_light", palettes["neon-light"]));
  sections.push("");

  return sections.join("\n");
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd /Users/maximilianhaarhaus/Projects/synthpunk/generator && bun test src/targets/starship.test.ts`
Expected: All tests PASS

- [ ] **Step 5: Fix any test failures by adjusting implementation or test expectations**

If any tests fail, inspect the actual output of `generateStarshipToml`, identify mismatches, and fix either the implementation or the test expectations accordingly.

- [ ] **Step 6: Commit**

```bash
git add generator/src/targets/starship.ts generator/src/targets/starship.test.ts
git commit -m "feat(generator): add Starship theme generator with tests"
```

---

### Task 2: Wire up Starship generation in index.ts

**Files:**
- Modify: `generator/src/index.ts`

- [ ] **Step 1: Add Starship import and generation logic to index.ts**

Add this import after the existing imports (after line 9):

```ts
import { generateStarshipToml } from "./targets/starship";
```

Add this constant after `VARIANT_WEZTERM_FILE` (after line 32):

```ts
const STARSHIP_DIR = path.join(PROJECT_DIR, "themes", "starship");
```

Add this block after the WezTerm generation block, inside `generateAll()`, after the closing `}` of the WezTerm loop (after line 105):

```ts
  // Generate Starship theme
  const starshipPalettes: Record<VariantName, Palette> = {} as Record<VariantName, Palette>;
  for (const variant of VARIANTS) {
    starshipPalettes[variant] = loadPalette(PALETTE_DIR, variant);
  }
  const starshipToml = generateStarshipToml(starshipPalettes);
  ensureDir(STARSHIP_DIR);
  const starshipPath = path.join(STARSHIP_DIR, "starship.toml");
  fs.writeFileSync(starshipPath, starshipToml);
  console.log(`Generated ${starshipPath}`);
```

Note: The palettes for starship are loaded separately because the starship generator needs all 4 palettes at once (unlike vscode/zed/wezterm which process one variant at a time).

- [ ] **Step 2: Run the generator to produce output files**

Run: `cd /Users/maximilianhaarhaus/Projects/synthpunk/generator && bun run src/index.ts`
Expected: Output includes "Generated .../themes/starship/starship.toml" alongside existing targets

- [ ] **Step 3: Verify the generated starship.toml exists and looks correct**

Run: `ls /Users/maximilianhaarhaus/Projects/synthpunk/themes/starship/`
Expected: `starship.toml` listed

Then inspect: `head -20 /Users/maximilianhaarhaus/Projects/synthpunk/themes/starship/starship.toml`
Expected: Starts with `$schema` header, contains `format` and `palette` lines

Verify palette sections exist: `grep "\[palettes\." /Users/maximilianhaarhaus/Projects/synthpunk/themes/starship/starship.toml`
Expected: All 4 palette section headers

- [ ] **Step 4: Run all tests to verify nothing is broken**

Run: `cd /Users/maximilianhaarhaus/Projects/synthpunk/generator && bun test`
Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
git add generator/src/index.ts themes/starship/
git commit -m "feat(generator): wire up Starship theme generation"
```

---

### Task 3: Add README for themes/starship

**Files:**
- Create: `themes/starship/README.md`

- [ ] **Step 1: Create README for the Starship themes directory**

Create `themes/starship/README.md`:

```md
# Synthpunk Starship Theme

Auto-generated Starship prompt theme for all 4 Synthpunk variants.

## Installation

1. Copy `starship.toml` to `~/.config/starship.toml` (or merge it with your existing config)
2. The default variant is `synthpunk_pastel_dark`. To switch variants, change the `palette` line to one of:

   - `synthpunk_pastel_dark`
   - `synthpunk_pastel_light`
   - `synthpunk_neon_dark`
   - `synthpunk_neon_light`

## Prerequisites

A [Nerd Font](https://www.nerdfonts.com/) must be installed and enabled in your terminal for the icons to display correctly.

## Regenerating

Run from the project root:

```sh
cd generator && bun run src/index.ts
```
```

- [ ] **Step 2: Commit**

```bash
git add themes/starship/README.md
git commit -m "docs: add README for Starship themes"
```

---

### Task 4: Run full validation

**Files:**
- No file changes

- [ ] **Step 1: Run all generator tests**

Run: `cd /Users/maximilianhaarhaus/Projects/synthpunk/generator && bun test`
Expected: All tests pass (including starship.test.ts and existing tests)

- [ ] **Step 2: Run TypeScript type check**

Run: `cd /Users/maximilianhaarhaus/Projects/synthpunk/generator && bunx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Re-generate all themes and verify Starship output**

Run: `cd /Users/maximilianhaarhaus/Projects/synthpunk/generator && bun run src/index.ts`

Verify starship.toml exists and has expected content:

```bash
ls -la /Users/maximilianhaarhaus/Projects/synthpunk/themes/starship/
```

Expected: `starship.toml` and `README.md`

- [ ] **Step 4: Spot-check starship.toml content**

```bash
head -10 /Users/maximilianhaarhaus/Projects/synthpunk/themes/starship/starship.toml
```

Expected: `$schema`, `format`, and `palette` lines at the top

```bash
grep "foreground\|red\|crust\|lavender" /Users/maximilianhaarhaus/Projects/synthpunk/themes/starship/starship.toml | head -10
```

Expected: Palette hex values for pastel-dark, pastel-light, neon-dark, neon-light variants

- [ ] **Step 5: Verify existing targets still generate correctly**

```bash
ls /Users/maximilianhaarhaus/Projects/synthpunk/themes/wezterm/
ls /Users/maximilianhaarhaus/Projects/synthpunk/themes/vscode/themes/
ls /Users/maximilianhaarhaus/Projects/synthpunk/themes/zed/themes/
```

Expected: All existing theme files present and unchanged