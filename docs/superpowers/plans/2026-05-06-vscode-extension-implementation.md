# Synthpunk VSCode Extension & Unified Theme Generator — Implementation Plan

**Date:** 2026-05-06
**Spec:** `docs/superpowers/specs/2026-05-06-vscode-extension-design.md`
**Runtime:** Bun 1.3.13

---

## Design Units

| Unit | Description | Dependencies |
|------|-------------|--------------|
| A. Generator core | Palette loader, color utilities, types | None |
| B. Mapping files | ui-mapping.json, scopes.json, font styles in syntax.json | None |
| C. VSCode target | Token mapping, theme JSON output, extension manifest | A + B |
| D. Zed target rewrite | Rewrite Zed output using generator | A + B |
| E. CLI + integration | CLI entry point, validation, wire everything up | A + C + D |
| F. Cleanup | Remove Python scripts, update gitignore | E |

---

## Task 1: Generator Core — Types & Palette Loader

**Files:**
- Create: `generator/src/types.ts`
- Create: `generator/src/palette.ts`
- Create: `generator/package.json`
- Create: `generator/tsconfig.json`
- Create: `generator/src/palette.test.ts`

- [ ] **Step 1: Create generator package scaffolding**

Create `generator/package.json`:

```json
{
  "name": "synthpunk-generator",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "bun run src/index.ts",
    "test": "bun test",
    "generate": "bun run src/index.ts"
  },
  "devDependencies": {
    "@types/bun": "latest"
  }
}
```

Create `generator/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "dist",
    "rootDir": "src",
    "declaration": true,
    "sourceMap": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}
```

- [ ] **Step 2: Create `generator/src/types.ts`**

```typescript
export interface PaletteColor {
  hex: string;
  rgb: [number, number, number];
  description: string;
}

export interface PaletteInfo {
  name: string;
  description: string;
  version: string;
}

export interface Palette {
  $schema?: string;
  info: PaletteInfo;
  colors: Record<string, PaletteColor>;
}

export type VariantName = "pastel-dark" | "pastel-light" | "neon-dark" | "neon-light";

export const VARIANT_DISPLAY_NAMES: Record<VariantName, string> = {
  "pastel-dark": "Synthpunk Pastel Dark",
  "pastel-light": "Synthpunk Pastel Light",
  "neon-dark": "Synthpunk Neon Dark",
  "neon-light": "Synthpunk Neon Light",
};

export const VARIANT_TYPE: Record<VariantName, "dark" | "light"> = {
  "pastel-dark": "dark",
  "pastel-light": "light",
  "neon-dark": "dark",
  "neon-light": "light",
};

export interface ResolvedColor {
  hex: string;
  rgb: [number, number, number];
}

export interface UIMapping {
  background: Record<string, string>;
  surface: Record<string, string>;
  text: Record<string, string>;
  border: Record<string, string>;
  editor: Record<string, string>;
  terminal: Record<string, string>;
  status: Record<string, string>;
  vcs: Record<string, string>;
}

export interface SyntaxMapping {
  info: PaletteInfo;
  keywords: Record<string, string>;
  storage: Record<string, string>;
  literals: Record<string, string>;
  comments: Record<string, string>;
  functions: Record<string, string>;
  variables: Record<string, string>;
  entities: Record<string, string>;
  support: Record<string, string>;
  invalid: Record<string, string>;
  emphasis?: Record<string, string>;
  fontStyles?: Record<string, FontStyleMapping>;
}

export interface ScopeEntry {
  name: string;
  scope: string[];
  syntaxRole: string;
}

export interface FontStyleMapping {
  fontStyle?: "italic" | "normal";
  fontWeight?: "bold" | "normal";
}
```

- [ ] **Step 3: Write failing test for palette loader**

Create `generator/src/palette.test.ts`:

```typescript
import { describe, expect, test } from "bun:test";
import { loadPalette, resolveColor, colorToHex } from "./palette";
import type { VariantName } from "./types";
import path from "node:path";

const PROJECT_DIR = path.resolve(import.meta.dir, "../..");
const PALETTE_DIR = path.join(PROJECT_DIR, "palette");

describe("loadPalette", () => {
  test("loads pastel-dark palette", () => {
    const palette = loadPalette(PALETTE_DIR, "pastel-dark");
    expect(palette.info.name).toBe("synthpunk-pastel-dark");
    expect(palette.colors).toBeDefined();
    expect(Object.keys(palette.colors).length).toBeGreaterThan(0);
  });

  test("loads neon-light palette", () => {
    const palette = loadPalette(PALETTE_DIR, "neon-light");
    expect(palette.info.name).toBe("synthpunk-neon-light");
    expect(palette.colors.rosewater.hex).toBe("E8A0C0");
  });

  test("throws on missing palette file", () => {
    expect(() => loadPalette(PALETTE_DIR, "nonexistent" as VariantName)).toThrow();
  });
});

describe("resolveColor", () => {
  test("resolves a named color from palette", () => {
    const palette = loadPalette(PALETTE_DIR, "pastel-dark");
    const color = resolveColor(palette, "red");
    expect(color.hex).toBe("FF5470");
    expect(color.rgb).toEqual([255, 84, 112]);
  });

  test("throws on unknown color name", () => {
    const palette = loadPalette(PALETTE_DIR, "pastel-dark");
    expect(() => resolveColor(palette, "nonexistent")).toThrow();
  });
});

describe("colorToHex", () => {
  test("formats hex without alpha", () => {
    const color = { hex: "FF5470", rgb: [255, 84, 112] as [number, number, number] };
    expect(colorToHex(color)).toBe("#FF5470");
  });

  test("formats hex with alpha", () => {
    const color = { hex: "FF5470", rgb: [255, 84, 112] as [number, number, number] };
    expect(colorToHex(color, 0.2)).toBe("#FF547033");
  });

  test("formats hex with alpha=1 as no alpha", () => {
    const color = { hex: "FF5470", rgb: [255, 84, 112] as [number, number, number] };
    expect(colorToHex(color, 1)).toBe("#FF5470");
  });
});
```

- [ ] **Step 4: Run test to verify it fails**

Run: `cd generator && bun test`
Expected: FAIL (module `./palette` does not exist)

- [ ] **Step 5: Create `generator/src/palette.ts`**

```typescript
import type { Palette, VariantName, ResolvedColor } from "./types";
import fs from "node:fs";
import path from "node:path";

const VARIANT_PALETTE_FILE: Record<VariantName, string> = {
  "pastel-dark": "dark.json",
  "pastel-light": "base.json",
  "neon-dark": "neon-dark.json",
  "neon-light": "neon-light.json",
};

export function loadPalette(paletteDir: string, variant: VariantName): Palette {
  const fileName = VARIANT_PALETTE_FILE[variant];
  const filePath = path.join(paletteDir, fileName);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Palette;
}

export function resolveColor(palette: Palette, colorName: string): ResolvedColor {
  const entry = palette.colors[colorName];
  if (!entry) {
    throw new Error(`Unknown color name: "${colorName}" in palette "${palette.info.name}"`);
  }
  return {
    hex: entry.hex,
    rgb: entry.rgb,
  };
}

export function colorToHex(color: ResolvedColor, alpha?: number): string {
  if (alpha === undefined || alpha === 1) {
    return `#${color.hex}`;
  }
  const a = Math.round(alpha * 255).toString(16).padStart(2, "0").toUpperCase();
  return `#${color.hex}${a}`;
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `cd generator && bun test`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add generator/package.json generator/tsconfig.json generator/src/types.ts generator/src/palette.ts generator/src/palette.test.ts
git commit -m "feat(generator): add types and palette loader"
```

---

## Task 2: Generator Core — Color Utilities

**Files:**
- Create: `generator/src/colorUtils.ts`
- Create: `generator/src/colorUtils.test.ts`

- [ ] **Step 1: Write failing tests for color utilities**

Create `generator/src/colorUtils.test.ts`:

```typescript
import { describe, expect, test } from "bun:test";
import { adjustBrightness, hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from "./colorUtils";

describe("hexToRgb / rgbToHex", () => {
  test("converts hex to RGB", () => {
    expect(hexToRgb("FF5470")).toEqual([255, 84, 112]);
  });

  test("converts RGB to hex", () => {
    expect(rgbToHex(255, 84, 112)).toBe("FF5470");
  });

  test("roundtrip hex to rgb to hex", () => {
    expect(rgbToHex(...hexToRgb("7FD7B5"))).toBe("7FD7B5");
  });
});

describe("adjustBrightness", () => {
  test("lightens a dark color", () => {
    const result = adjustBrightness([255, 84, 112], 0.2, "lighten");
    expect(result[0]).toBeLessThanOrEqual(255);
    expect(result.every(c => c >= 0 && c <= 255)).toBe(true);
  });

  test("dims a color", () => {
    const result = adjustBrightness([255, 84, 112], 0.3, "dim");
    expect(result[0]).toBeLessThan(255);
    expect(result[0]).toBeGreaterThan(0);
    expect(result.every(c => c >= 0 && c <= 255)).toBe(true);
  });

  test("clamps values to 0-255 range", () => {
    const bright = adjustBrightness([10, 10, 10], 0.95, "lighten");
    expect(bright.every(c => c <= 255)).toBe(true);
    const dark = adjustBrightness([240, 240, 240], 0.95, "dim");
    expect(dark.every(c => c >= 0)).toBe(true);
  });
});

describe("rgbToHsl / hslToRgb", () => {
  test("roundtrip preserves values approximately", () => {
    const [h, s, l] = rgbToHsl(255, 84, 112);
    const [r, g, b] = hslToRgb(h, s, l);
    expect(r).toBeCloseTo(255, -1);
    expect(g).toBeCloseTo(84, -1);
    expect(b).toBeCloseTo(112, -1);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd generator && bun test`
Expected: FAIL

- [ ] **Step 3: Create `generator/src/colorUtils.ts`**

```typescript
export function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ];
}

export function rgbToHex(r: number, g: number, b: number): string {
  return [r, g, b].map(c => Math.max(0, Math.min(255, Math.round(c))).toString(16).padStart(2, "0").toUpperCase()).join("");
}

export function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h: number;
  switch (max) {
    case rn: h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6; break;
    case gn: h = ((bn - rn) / d + 2) / 6; break;
    default: h = ((rn - gn) / d + 4) / 6; break;
  }
  return [h, s, l];
}

export function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  if (s === 0) {
    const v = Math.round(l * 255);
    return [v, v, v];
  }
  const hue2rgb = (p: number, q: number, t: number) => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return [
    Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    Math.round(hue2rgb(p, q, h) * 255),
    Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  ];
}

export type BrightnessDirection = "lighten" | "dim";

export function adjustBrightness(
  rgb: [number, number, number],
  factor: number,
  direction: BrightnessDirection,
): [number, number, number] {
  const [h, s, l] = rgbToHsl(...rgb);
  let newL: number;
  if (direction === "lighten") {
    newL = l + (1 - l) * factor;
  } else {
    newL = l * (1 - factor);
  }
  return hslToRgb(h, s, newL).map(c => Math.max(0, Math.min(255, c))) as [number, number, number];
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd generator && bun test`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add generator/src/colorUtils.ts generator/src/colorUtils.test.ts
git commit -m "feat(generator): add color utilities with brightness adjustment"
```

---

## Task 3: Mapping Files — ui-mapping.json & scopes.json

**Files:**
- Create: `palette/ui-mapping.json`
- Create: `palette/scopes.json`
- Create: `schemas/ui-mapping.json`
- Modify: `palette/syntax.json` (add emphasis and fontStyles)
- Modify: `schemas/syntax.json` (add emphasis and fontStyles)

- [ ] **Step 1: Create `schemas/ui-mapping.json`**

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "title": "Synthpunk UI Mapping Schema",
  "required": ["info", "background", "surface", "text", "border", "editor", "terminal", "status", "vcs"],
  "properties": {
    "info": {
      "type": "object",
      "properties": {
        "name": { "type": "string" },
        "description": { "type": "string" },
        "version": { "type": "string" }
      }
    },
    "background": { "type": "object", "additionalProperties": { "type": "string" } },
    "surface": { "type": "object", "additionalProperties": { "type": "string" } },
    "text": { "type": "object", "additionalProperties": { "type": "string" } },
    "border": { "type": "object", "additionalProperties": { "type": "string" } },
    "editor": { "type": "object", "additionalProperties": { "type": "string" } },
    "terminal": { "type": "object", "additionalProperties": { "type": "string" } },
    "status": { "type": "object", "additionalProperties": { "type": "string" } },
    "vcs": { "type": "object", "additionalProperties": { "type": "string" } }
  }
}
```

- [ ] **Step 2: Create `palette/ui-mapping.json`**

```json
{
  "$schema": "../schemas/ui-mapping.json",
  "info": {
    "name": "synthpunk-ui-mapping",
    "description": "Editor-agnostic UI role to palette color mappings",
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

- [ ] **Step 3: Create `palette/scopes.json`**

(Create as shown in the plan — full TextMate scope mapping file, ~33 entries)

- [ ] **Step 4: Update `palette/syntax.json` to add emphasis and fontStyles**

Add `emphasis` and `fontStyles` sections as described in the plan.

- [ ] **Step 5: Update `schemas/syntax.json` to allow emphasis and fontStyles**

As shown in the plan.

- [ ] **Step 6: Commit**

```bash
git add palette/ui-mapping.json palette/scopes.json schemas/ui-mapping.json palette/syntax.json schemas/syntax.json
git commit -m "feat(palette): add ui-mapping, scopes, and font styles"
```

---

## Task 4: Generator Core — Mapping Loaders & Opacity

**Files:**
- Create: `generator/src/uiMapping.ts`
- Create: `generator/src/syntaxMapping.ts`
- Create: `generator/src/opacity.ts`
- Create: `generator/src/mappings.test.ts`

- [ ] **Step 1: Write failing tests for mapping loaders**

(Create `generator/src/mappings.test.ts` as shown in the plan)

- [ ] **Step 2: Run test to verify it fails**

- [ ] **Step 3: Create `generator/src/uiMapping.ts`**

(As shown in the plan)

- [ ] **Step 4: Create `generator/src/syntaxMapping.ts`**

(As shown in the plan)

- [ ] **Step 5: Create `generator/src/opacity.ts`**

(As shown in the plan)

- [ ] **Step 6: Run test to verify it passes**

- [ ] **Step 7: Commit**

```bash
git add generator/src/uiMapping.ts generator/src/syntaxMapping.ts generator/src/opacity.ts generator/src/mappings.test.ts
git commit -m "feat(generator): add mapping loaders and opacity rules"
```

---

## Task 5: VSCode Target

**Files:**
- Create: `generator/src/targets/vscode.ts`
- Create: `generator/src/targets/vscode.test.ts`

- [ ] **Step 1: Write failing test for VSCode target**

(Create `generator/src/targets/vscode.test.ts` as shown in the plan)

- [ ] **Step 2: Run test to verify it fails**

- [ ] **Step 3: Create `generator/src/targets/vscode.ts`**

(Full implementation as shown in the plan — maps ui-mapping to ~80 VSCode color keys and scopes to tokenColors)

- [ ] **Step 4: Run test to verify it passes**

- [ ] **Step 5: Commit**

```bash
git add generator/src/targets/vscode.ts generator/src/targets/vscode.test.ts
git commit -m "feat(generator): add VSCode theme target"
```

---

## Task 6: Zed Target Rewrite

**Files:**
- Create: `generator/src/targets/zed.ts`
- Create: `generator/src/targets/zed.test.ts`

- [ ] **Step 1: Write failing test for Zed target**

(Create `generator/src/targets/zed.test.ts` as shown in the plan)

- [ ] **Step 2: Run test to verify it fails**

- [ ] **Step 3: Create `generator/src/targets/zed.ts`**

(Full implementation mapping to Zed's theme format as shown in the plan)

- [ ] **Step 4: Run test to verify it passes**

- [ ] **Step 5: Commit**

```bash
git add generator/src/targets/zed.ts generator/src/targets/zed.test.ts
git commit -m "feat(generator): add Zed theme target"
```

---

## Task 7: CLI Entry Point & VSCode Extension Manifest

**Files:**
- Create: `generator/src/index.ts`
- Create: `themes/vscode/package.json`

- [ ] **Step 1: Create VSCode extension manifest**

(Create `themes/vscode/package.json` as shown in the plan)

- [ ] **Step 2: Create `generator/src/index.ts`**

(CLI entry point as shown in the plan — generates all theme files)

- [ ] **Step 3: Run the generator**

Run: `cd generator && bun run src/index.ts`
Expected: Generates theme files in `themes/vscode/themes/` and regenerates `themes/zed/themes/`

- [ ] **Step 4: Verify output exists**

```bash
ls themes/vscode/themes/ && ls themes/zed/themes/
```

- [ ] **Step 5: Commit**

```bash
git add generator/src/index.ts themes/vscode/package.json themes/vscode/themes/ themes/zed/themes/
git commit -m "feat(generator): add CLI entry point and VSCode extension manifest"
```

---

## Task 8: Validation & Cleanup

**Files:**
- Create: `generator/src/validate.ts`
- Delete: `scripts/generate-neon-theme.py`
- Delete: `scripts/validate.py`
- Create: `themes/vscode/README.md`

- [ ] **Step 1: Create `generator/src/validate.ts`**

(Validation script as shown in the plan)

- [ ] **Step 2: Run validation**

Run: `cd generator && bun run src/validate.ts`
Expected: All validations pass

- [ ] **Step 3: Remove old Python scripts**

```bash
rm scripts/generate-neon-theme.py scripts/validate.py
```

- [ ] **Step 4: Create `themes/vscode/README.md`**

(Local dev instructions as shown in the plan)

- [ ] **Step 5: Commit**

```bash
git add generator/src/validate.ts themes/vscode/README.md && git rm scripts/generate-neon-theme.py scripts/validate.py
git commit -m "feat(generator): add validation, remove Python scripts, add VSCode README"
```

---

## Task 9: Visual Verification & Final Polish

- [ ] **Step 1: Generate all themes**

Run: `cd generator && bun run src/index.ts`

- [ ] **Step 2: Verify VSCode themes are valid JSON**

```bash
for f in themes/vscode/themes/*.json; do echo "Checking $f"; node -e "JSON.parse(require('fs').readFileSync('$f'))" && echo "  OK" || echo "  FAILED"; done
```

- [ ] **Step 3: Verify Zed themes are valid JSON**

```bash
for f in themes/zed/themes/*.json; do echo "Checking $f"; node -e "JSON.parse(require('fs').readFileSync('$f'))" && echo "  OK" || echo "  FAILED"; done
```

- [ ] **Step 4: Install VSCode extension locally for visual testing**

```bash
ln -s "$(pwd)/themes/vscode" ~/.vscode/extensions/synthpunk-0.1.0
```

Restart VSCode, select a Synthpunk theme, verify visual appearance.

- [ ] **Step 5: Final commit**

```bash
git add -A && git commit -m "feat(vscode): visual verification and final polish"
```