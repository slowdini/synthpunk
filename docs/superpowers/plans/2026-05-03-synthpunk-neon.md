# Synthpunk-Neon Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create the complete synthpunk-neon color scheme variant with dark (vaporwave neon) and light (holographic) modes, including palette definitions, Zed theme file, preview assets, and validation.

**Architecture:** Follow the existing project structure established by synthpunk-pastel. Create new palette JSON files for neon, generate the Zed theme via a color-substitution script from the pastel template, update preview/validation scripts to handle multiple variants, and generate preview images.

**Tech Stack:** JSON, Python 3, Pillow (for preview generation)

---

## File Structure

| File | Action | Purpose |
|---|---|---|
| `palette/neon-dark.json` | Create | Dark mode base palette (vaporwave neon) |
| `palette/neon-light.json` | Create | Light mode base palette (holographic) |
| `themes/zed/themes/synthpunk-neon.json` | Create | Zed theme with dark + light variants |
| `scripts/generate-neon-theme.py` | Create | Generates Zed theme from pastel template via color substitution |
| `scripts/generate-preview.py` | Modify | Add neon palette preview generation |
| `scripts/validate.py` | Modify | Add neon palette and theme validation |
| `assets/palette-preview-neon-dark.png` | Create | Preview image for neon dark |
| `assets/palette-preview-neon-light.png` | Create | Preview image for neon light |
| `themes/zed/README.md` | Modify | Document the neon theme variants |

---

### Task 1: Create Dark Mode Palette JSON

**Files:**
- Create: `palette/neon-dark.json`

- [ ] **Step 1: Write the dark mode palette file**

```json
{
  "$schema": "../schemas/base.json",
  "info": {
    "name": "synthpunk-neon-dark",
    "description": "Synthpunk Neon dark mode palette — vaporwave neon",
    "version": "0.1.0"
  },
  "colors": {
    "rosewater": { "hex": "FFB8E0", "rgb": [255, 184, 224], "description": "Soft neon pink for delicate accents" },
    "flamingo": { "hex": "FF5CA8", "rgb": [255, 92, 168], "description": "Hot pink for lively highlights" },
    "pink": { "hex": "FF2A8A", "rgb": [255, 42, 138], "description": "Electric magenta for strings, escape sequences" },
    "maroon": { "hex": "C04078", "rgb": [192, 64, 120], "description": "Deep magenta for parameters, operators" },
    "red": { "hex": "FF3A50", "rgb": [255, 58, 80], "description": "Neon red for errors, critical" },
    "peach": { "hex": "FF8040", "rgb": [255, 128, 64], "description": "Electric orange for types, constants" },
    "yellow": { "hex": "FFE040", "rgb": [255, 224, 64], "description": "Neon yellow-gold for attributes, classes" },
    "green": { "hex": "40FF80", "rgb": [64, 255, 128], "description": "Neon mint for success, strings" },
    "teal": { "hex": "00E8F0", "rgb": [0, 232, 240], "description": "Electric cyan for keywords, info" },
    "sky": { "hex": "40B0FF", "rgb": [64, 176, 255], "description": "Bright neon blue for methods, variables" },
    "sapphire": { "hex": "6080FF", "rgb": [96, 128, 255], "description": "Electric periwinkle for built-ins, types" },
    "blue": { "hex": "A060FF", "rgb": [160, 96, 255], "description": "Electric purple for functions, links" },
    "lavender": { "hex": "D040FF", "rgb": [208, 64, 255], "description": "Vivid neon purple for functions, highlights" },
    "text": { "hex": "E8E0F0", "rgb": [232, 224, 240], "description": "Primary text — soft lavender-white" },
    "subtext1": { "hex": "B8A8D0", "rgb": [184, 168, 208], "description": "Secondary text" },
    "subtext0": { "hex": "8878A0", "rgb": [136, 120, 160], "description": "Tertiary text, placeholders" },
    "overlay": { "hex": "503870", "rgb": [80, 56, 112], "description": "Overlays, disabled states, comments" },
    "surface2": { "hex": "301E50", "rgb": [48, 30, 80], "description": "Highest surface elevation" },
    "surface1": { "hex": "251540", "rgb": [37, 21, 64], "description": "Mid surface elevation" },
    "surface0": { "hex": "1A0D2E", "rgb": [26, 13, 46], "description": "Lowest surface elevation" },
    "base": { "hex": "0F0620", "rgb": [15, 6, 32], "description": "Primary background — deep purple-black" },
    "mantle": { "hex": "0A0418", "rgb": [10, 4, 24], "description": "Slightly darker than base" },
    "crust": { "hex": "060210", "rgb": [6, 2, 16], "description": "Darkest background depth" }
  }
}
```

- [ ] **Step 2: Validate JSON syntax**

Run: `python3 -m json.tool palette/neon-dark.json > /dev/null`
Expected: No output (valid JSON)

- [ ] **Step 3: Commit**

```bash
git add palette/neon-dark.json
git commit -m "feat(palette): add synthpunk-neon dark mode base palette"
```

---

### Task 2: Create Light Mode Palette JSON

**Files:**
- Create: `palette/neon-light.json`

- [ ] **Step 1: Write the light mode palette file**

```json
{
  "$schema": "../schemas/base.json",
  "info": {
    "name": "synthpunk-neon-light",
    "description": "Synthpunk Neon light mode palette — holographic iridescence",
    "version": "0.1.0"
  },
  "colors": {
    "rosewater": { "hex": "E8A0C0", "rgb": [232, 160, 192], "description": "Pearlescent pink for delicate accents" },
    "flamingo": { "hex": "E06098", "rgb": [224, 96, 152], "description": "Holographic pink for lively highlights" },
    "pink": { "hex": "D04080", "rgb": [208, 64, 128], "description": "Prism magenta for strings, escape sequences" },
    "maroon": { "hex": "B04068", "rgb": [176, 64, 104], "description": "Deep rose for parameters, operators" },
    "red": { "hex": "E04058", "rgb": [224, 64, 88], "description": "Coral-red for errors, critical" },
    "peach": { "hex": "E88050", "rgb": [232, 128, 80], "description": "Opalescent orange for types, constants" },
    "yellow": { "hex": "D8B030", "rgb": [216, 176, 48], "description": "Golden iridescence for attributes, classes" },
    "green": { "hex": "40C080", "rgb": [64, 192, 128], "description": "Iridescent mint for success, strings" },
    "teal": { "hex": "30C0C8", "rgb": [48, 192, 200], "description": "Opalescent cyan for keywords, info" },
    "sky": { "hex": "4098D8", "rgb": [64, 152, 216], "description": "Prismatic blue for methods, variables" },
    "sapphire": { "hex": "6070C8", "rgb": [96, 112, 200], "description": "Iridescent periwinkle for built-ins, types" },
    "blue": { "hex": "8050C8", "rgb": [128, 80, 200], "description": "Prismatic purple for functions, links" },
    "lavender": { "hex": "B050D0", "rgb": [176, 80, 208], "description": "Opalescent violet for functions, highlights" },
    "text": { "hex": "2A1A30", "rgb": [42, 26, 48], "description": "Primary text — deep purple-brown" },
    "subtext1": { "hex": "6B5A78", "rgb": [107, 90, 120], "description": "Secondary text" },
    "subtext0": { "hex": "A898B0", "rgb": [168, 152, 176], "description": "Tertiary text, placeholders" },
    "overlay": { "hex": "C0A8C8", "rgb": [192, 168, 200], "description": "Overlays, disabled states, comments" },
    "surface2": { "hex": "E0C8E8", "rgb": [224, 200, 232], "description": "Highest surface elevation" },
    "surface1": { "hex": "E8D8F0", "rgb": [232, 216, 240], "description": "Mid surface elevation" },
    "surface0": { "hex": "F0E8F5", "rgb": [240, 232, 245], "description": "Lowest surface elevation" },
    "base": { "hex": "FAF6FA", "rgb": [250, 246, 250], "description": "Primary background — pearlescent white" },
    "mantle": { "hex": "F5F0F5", "rgb": [245, 240, 245], "description": "Slightly darker than base" },
    "crust": { "hex": "F0E8F0", "rgb": [240, 232, 240], "description": "Darkest background depth" }
  }
}
```

- [ ] **Step 2: Validate JSON syntax**

Run: `python3 -m json.tool palette/neon-light.json > /dev/null`
Expected: No output (valid JSON)

- [ ] **Step 3: Commit**

```bash
git add palette/neon-light.json
git commit -m "feat(palette): add synthpunk-neon light mode base palette"
```

---

### Task 3: Create Theme Generation Script

**Files:**
- Create: `scripts/generate-neon-theme.py`

- [ ] **Step 1: Write the generation script**

```python
#!/usr/bin/env python3
"""Generate synthpunk-neon Zed theme from the pastel template via color substitution."""

import json
import os
import re


# Map pastel dark hex (6 chars, no #) → neon dark hex (6 chars, no #)
DARK_MAP = {
    "3A2850": "251540",  # surface1
    "2E1E40": "1A0D2E",  # surface0
    "C49BFF": "D040FF",  # lavender
    "5ED4E0": "00E8F0",  # teal
    "160A20": "0A0418",  # mantle
    "1E1028": "0F0620",  # base
    "F0E0F0": "E8E0F0",  # text
    "C8B0D8": "B8A8D0",  # subtext1
    "A090B8": "8878A0",  # subtext0
    "705880": "503870",  # overlay
    "FF9BB6": "FF5CA8",  # flamingo
    "FF5470": "FF3A50",  # red
    "0D0612": "060210",  # crust
    "FF7080": "FF5868",  # bright red
    "B83C50": "B02838",  # dim red
    "7FD7B5": "40FF80",  # green
    "9DE5C8": "60FFA0",  # bright green
    "5A9A80": "2DB860",  # dim green
    "FFE4B5": "FFE040",  # yellow
    "FFFCD5": "FFF868",  # bright yellow
    "BFBCA5": "B8A830",  # dim yellow
    "8BA4FF": "A060FF",  # blue
    "A8BCFF": "B880FF",  # bright blue
    "6270B0": "7040B0",  # dim blue
    "FF7DB0": "FF2A8A",  # pink
    "FF9BC8": "FF4AA0",  # bright magenta
    "B86080": "B01E60",  # dim magenta
    "7EE0EA": "20F0F8",  # bright cyan
    "4298A0": "00A0A8",  # dim cyan
    "9078A0": "705880",  # dim white
    "7AC8FF": "40B0FF",  # sky
    "7AA8C0": "6080FF",  # sapphire
    "FFA07A": "FF8040",  # peach
}

# Map pastel light hex (6 chars, no #) → neon light hex (6 chars, no #)
LIGHT_MAP = {
    "E4CCD8": "E0C8E8",  # surface2
    "F0DEE8": "F0E8F5",  # surface0
    "C49BFF": "B050D0",  # lavender
    "FF7DB0": "D04080",  # pink
    "FFF0EB": "F5F0F5",  # mantle
    "FFF8F5": "FAF6FA",  # base
    "2E1A24": "2A1A30",  # text
    "6B4F5E": "6B5A78",  # subtext1
    "997A8A": "A898B0",  # subtext0
    "C4A8B8": "C0A8C8",  # overlay
    "FF9BB6": "E06098",  # flamingo
    "FF5470": "E04058",  # red
    "FFE8E0": "F0E8F0",  # crust
    "FF7080": "E85870",  # bright red
    "B83C50": "A03048",  # dim red
    "5AC09A": "40C080",  # green
    "78CEAD": "60D098",  # bright green
    "358365": "2D9060",  # dim green
    "E8C468": "D8B030",  # yellow
    "F0DC88": "E8C850",  # bright yellow
    "A89C58": "988828",  # dim yellow
    "8BA4FF": "8050C8",  # blue
    "A8BCFF": "9870D8",  # bright blue
    "6270B0": "5040A0",  # dim blue
    "FF7DB0": "D04080",  # pink
    "FF9BC8": "E06098",  # bright magenta
    "B86080": "A04060",  # dim magenta
    "5ED4E0": "30C0C8",  # teal
    "7EE0EA": "50D0D8",  # bright cyan
    "4298A0": "208088",  # dim cyan
    "705860": "604858",  # dim white
    "7AC8FF": "4098D8",  # sky
    "7AA8C0": "6070C8",  # sapphire
    "FFA07A": "E88050",  # peach
}


def substitute_colors(theme_str, color_map):
    """Substitute 6-char hex colors in 8-char Zed color strings, preserving alpha."""
    def replacer(match):
        hex6 = match.group(1)
        alpha = match.group(2)
        new_hex6 = color_map.get(hex6, hex6)
        return f"#{new_hex6}{alpha}"
    return re.sub(r'#([0-9A-Fa-f]{6})([0-9A-Fa-f]{2})', replacer, theme_str)


def main():
    project_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    pastel_path = os.path.join(project_dir, "themes", "zed", "themes", "synthpunk-pastel.json")
    output_path = os.path.join(project_dir, "themes", "zed", "themes", "synthpunk-neon.json")

    with open(pastel_path) as f:
        theme_data = json.load(f)

    # Update metadata
    theme_data["name"] = "Synthpunk Neon"
    theme_data["author"] = "Synthpunk"

    # Update variant names
    theme_data["themes"][0]["name"] = "Synthpunk Neon Dark"
    theme_data["themes"][1]["name"] = "Synthpunk Neon Light"

    # Convert to string for substitution
    theme_str = json.dumps(theme_data, indent=2)

    # Split into dark and light sections for targeted substitution
    # Find the split point between dark and light variants
    dark_end_marker = '"name": "Synthpunk Neon Light"'
    parts = theme_str.split(dark_end_marker)

    if len(parts) != 2:
        raise RuntimeError("Could not split theme into dark/light variants")

    dark_part = substitute_colors(parts[0], DARK_MAP)
    light_part = substitute_colors(dark_end_marker + parts[1], LIGHT_MAP)

    result = dark_part + light_part

    with open(output_path, "w") as f:
        f.write(result)

    print(f"Generated {output_path}")


if __name__ == "__main__":
    main()
```

- [ ] **Step 2: Run the script to generate the theme**

Run: `python3 scripts/generate-neon-theme.py`
Expected: `Generated /Users/maxhaarhaus/personal/synthpunk/themes/zed/themes/synthpunk-neon.json`

- [ ] **Step 3: Verify the generated theme has correct variant names**

Run: `python3 -c "import json; d=json.load(open('themes/zed/themes/synthpunk-neon.json')); print(d['name']); print([t['name'] for t in d['themes']])"`
Expected: `Synthpunk Neon` and `['Synthpunk Neon Dark', 'Synthpunk Neon Light']`

- [ ] **Step 4: Commit**

```bash
git add scripts/generate-neon-theme.py themes/zed/themes/synthpunk-neon.json
git commit -m "feat(zed): add synthpunk-neon theme generation script and generated theme"
```

---

### Task 4: Update Preview Generation Script

**Files:**
- Modify: `scripts/generate-preview.py`

- [ ] **Step 1: Update the script to handle multiple variants**

Replace the `main()` function in `scripts/generate-preview.py` with:

```python
def generate_variant_preview(palette_path, output_path, title):
    """Generate a preview for a single palette variant."""
    palette = load_palette(palette_path)
    generate_preview(palette, output_path, title)


def main():
    project_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    assets_dir = os.path.join(project_dir, "assets")
    os.makedirs(assets_dir, exist_ok=True)

    # Pastel previews
    generate_variant_preview(
        os.path.join(project_dir, "palette", "base.json"),
        os.path.join(assets_dir, "palette-preview-light.png"),
        "Synthpunk Pastel — Light Mode"
    )
    generate_variant_preview(
        os.path.join(project_dir, "palette", "dark.json"),
        os.path.join(assets_dir, "palette-preview-dark.png"),
        "Synthpunk Pastel — Dark Mode"
    )

    # Neon previews
    generate_variant_preview(
        os.path.join(project_dir, "palette", "neon-light.json"),
        os.path.join(assets_dir, "palette-preview-neon-light.png"),
        "Synthpunk Neon — Light Mode"
    )
    generate_variant_preview(
        os.path.join(project_dir, "palette", "neon-dark.json"),
        os.path.join(assets_dir, "palette-preview-neon-dark.png"),
        "Synthpunk Neon — Dark Mode"
    )


if __name__ == "__main__":
    main()
```

- [ ] **Step 2: Run the updated script**

Run: `python3 scripts/generate-preview.py`
Expected: Four "Saved ..." messages for pastel light, pastel dark, neon light, and neon dark.

- [ ] **Step 3: Verify preview images exist**

Run: `ls -la assets/palette-preview-*.png`
Expected: Four PNG files including the two new neon previews.

- [ ] **Step 4: Commit**

```bash
git add scripts/generate-preview.py assets/palette-preview-neon-light.png assets/palette-preview-neon-dark.png
git commit -m "feat(assets): generate synthpunk-neon palette previews"
```

---

### Task 5: Update Validation Script

**Files:**
- Modify: `scripts/validate.py`

- [ ] **Step 1: Add neon palette and theme validation to main()**

Replace the `main()` function in `scripts/validate.py` with:

```python
def main():
    project_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    results = []
    # Pastel palettes
    results.append(validate_palette(os.path.join(project_dir, "palette", "base.json"), "base.json (pastel light)"))
    results.append(validate_palette(os.path.join(project_dir, "palette", "dark.json"), "dark.json (pastel dark)"))
    # Neon palettes
    results.append(validate_palette(os.path.join(project_dir, "palette", "neon-light.json"), "neon-light.json"))
    results.append(validate_palette(os.path.join(project_dir, "palette", "neon-dark.json"), "neon-dark.json"))
    # Zed themes
    results.append(validate_zed_theme(os.path.join(project_dir, "themes", "zed", "themes", "synthpunk-pastel.json"), "Zed synthpunk-pastel theme"))
    results.append(validate_zed_theme(os.path.join(project_dir, "themes", "zed", "themes", "synthpunk-neon.json"), "Zed synthpunk-neon theme"))

    print("\n" + "="*50)
    if all(results):
        print("All validations passed!")
    else:
        print("Some validations failed. Please fix the errors above.")
```

- [ ] **Step 2: Run validation**

Run: `python3 scripts/validate.py`
Expected: All 6 validations pass.

- [ ] **Step 3: Commit**

```bash
git add scripts/validate.py
git commit -m "chore(scripts): update validation to include synthpunk-neon"
```

---

### Task 6: Update Zed README

**Files:**
- Modify: `themes/zed/README.md`

- [ ] **Step 1: Update README to document neon variant**

Replace the entire file with:

```markdown
# Synthpunk — Zed Theme Extension

High-energy synthwave-inspired color themes for Zed.

## Theme Families

### Synthpunk Pastel

- **Synthpunk Pastel Dark** — Deep purple synthwave aesthetic
- **Synthpunk Pastel Light** — Warm peachy/pink light variant

### Synthpunk Neon

- **Synthpunk Neon Dark** — Electric vaporwave neon on deep purple-black
- **Synthpunk Neon Light** — Experimental holographic iridescence

## Local Development

To test this extension locally in Zed:

1. Open Zed
2. Go to **Extensions** (or run `zed: extensions`)
3. Click **Install Dev Extension** (or run `zed: install dev extension`)
4. Select this directory (`themes/zed/`)
5. Select your preferred theme variant from the theme picker
```

- [ ] **Step 2: Commit**

```bash
git add themes/zed/README.md
git commit -m "docs(zed): update README to include synthpunk-neon variants"
```

---

### Task 7: Final Validation and Review

- [ ] **Step 1: Run full validation suite**

Run: `python3 scripts/validate.py`
Expected: All 6 validations pass with OK status.

- [ ] **Step 2: Verify generated theme file structure**

Run: `python3 -c "import json; d=json.load(open('themes/zed/themes/synthpunk-neon.json')); print('Themes:', len(d['themes'])); print('Dark keys:', len(d['themes'][0]['style'])); print('Light keys:', len(d['themes'][1]['style']))"`
Expected: `Themes: 2`, Dark keys ~100, Light keys ~100.

- [ ] **Step 3: Visual spot-check of key colors**

Run:
```bash
python3 -c "
import json
d=json.load(open('themes/zed/themes/synthpunk-neon.json'))
dark = d['themes'][0]['style']
light = d['themes'][1]['style']
print('Dark bg:', dark['background'])
print('Dark text:', dark['editor.foreground'])
print('Dark keyword:', dark['syntax']['keyword']['color'])
print('Light bg:', light['background'])
print('Light text:', light['editor.foreground'])
print('Light keyword:', light['syntax']['keyword']['color'])
"
```
Expected:
- Dark bg: `#0F0620ff`
- Dark text: `#E8E0F0ff`
- Dark keyword: `#00E8F0ff`
- Light bg: `#FAF6FAff`
- Light text: `#2A1A30ff`
- Light keyword: `#30C0C8ff`

- [ ] **Step 4: Commit any final changes**

```bash
git commit -m "feat: complete synthpunk-neon variant implementation" || echo "Nothing to commit"
```

---

## Self-Review

### 1. Spec Coverage

| Spec Section | Implementing Task |
|---|---|
| Dark mode accent palette (13 colors) | Task 1 |
| Dark mode neutral colors | Task 1 |
| Light mode accent palette (13 colors) | Task 2 |
| Light mode neutral colors | Task 2 |
| Shared core colors | Implicit in palette + theme generation |
| Syntax highlighting mappings | Task 3 (via generation script from pastel template) |
| Semantic mappings | Task 3 (via generation script from pastel template) |
| General editor elements | Task 3 (via generation script from pastel template) |
| Zed theme file | Task 3 |
| Preview assets | Task 4 |
| Validation | Task 5 |

### 2. Placeholder Scan

- No "TBD", "TODO", or "implement later" found.
- No vague "add appropriate error handling" or "write tests" without specifics.
- All steps show exact commands and expected output.
- All file modifications include the exact code to write.

### 3. Type Consistency

- Palette JSON structure matches existing `base.json` / `dark.json` schema.
- Theme generation script produces output in identical format to `synthpunk-pastel.json`.
- Preview and validation script modifications extend existing behavior without changing signatures.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-03-synthpunk-neon.md`.

Two execution options:

**1. Subagent-Driven (recommended)** — Dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints for review.

Which approach would you prefer?
