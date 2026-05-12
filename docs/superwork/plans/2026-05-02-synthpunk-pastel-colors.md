# Synthpunk-Pastel Color Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the synthpunk-pastel color scheme to all palette and theme files, replacing placeholder values with actual hex colors and generating preview assets.

**Architecture:** Palette JSON files (base.json, syntax.json, semantic.json) are the source of truth. Zed theme files are populated by mapping semantic roles to Zed-specific tokens. A Python script generates palette preview images.

**Tech Stack:** Python 3 with Pillow for image generation. JSON for all data files.

---

## File Structure

| File | Purpose |
|---|---|
| `palette/base.json` | Light mode palette — 13 accent colors + 10 neutral colors |
| `palette/dark.json` | Dark mode palette — 13 accent colors + 10 neutral colors |
| `palette/syntax.json` | Syntax highlighting color names (references palette colors) |
| `palette/semantic.json` | Semantic role mappings (references palette colors) |
| `themes/zed/light.json` | Zed light theme with all tokens mapped |
| `themes/zed/dark.json` | Zed dark theme with all tokens mapped |
| `scripts/generate-preview.py` | Generates palette preview PNG images |
| `assets/palette-preview-light.png` | Generated preview of light mode palette |
| `assets/palette-preview-dark.png` | Generated preview of dark mode palette |

---

## Color Reference

### Accent Colors (shared across modes)

| Name | Hex | RGB |
|---|---|---|
| rosewater | #FFE8F0 | [255, 232, 240] |
| flamingo | #FF9BB6 | [255, 155, 182] |
| pink | #FF7DB0 | [255, 125, 176] |
| maroon | #D48BA0 | [212, 139, 160] |
| red | #FF5470 | [255, 84, 112] |
| peach | #FFA07A | [255, 160, 122] |
| yellow | #E8A840 | [232, 168, 64] |
| green | #7FD7B5 | [127, 215, 181] |
| teal | #5ED4E0 | [94, 212, 224] |
| sky | #7AC8FF | [122, 200, 255] |
| sapphire | #7AA8C0 | [122, 168, 192] |
| blue | #8BA4FF | [139, 164, 255] |
| lavender | #C49BFF | [196, 155, 255] |

### Light Mode Neutrals

| Name | Hex | RGB |
|---|---|---|
| text | #2E1A24 | [46, 26, 36] |
| subtext1 | #6B4F5E | [107, 79, 94] |
| subtext0 | #997A8A | [153, 122, 138] |
| overlay | #C4A8B8 | [196, 168, 184] |
| surface2 | #D4B8C8 | [212, 184, 200] |
| surface1 | #E4CCD8 | [228, 204, 216] |
| surface0 | #F0DEE8 | [240, 222, 232] |
| base | #FFF8F5 | [255, 248, 245] |
| mantle | #FFF0EB | [255, 240, 235] |
| crust | #FFE8E0 | [255, 232, 224] |

### Dark Mode Neutrals

| Name | Hex | RGB |
|---|---|---|
| text | #F0E0F0 | [240, 224, 240] |
| subtext1 | #C8B0D8 | [200, 176, 216] |
| subtext0 | #A090B8 | [160, 144, 184] |
| overlay | #705880 | [112, 88, 128] |
| surface2 | #4A3860 | [74, 56, 96] |
| surface1 | #3A2850 | [58, 40, 80] |
| surface0 | #2E1E40 | [46, 30, 64] |
| base | #1E1028 | [30, 16, 40] |
| mantle | #160A20 | [22, 10, 32] |
| crust | #0D0612 | [13, 6, 18] |

---

### Task 1: Update palette/base.json with Light Mode Colors

**Files:**
- Modify: `palette/base.json`

**Context:** The existing base.json has placeholder values ("待定", [0,0,0]) for all colors. Replace with actual light mode values.

- [ ] **Step 1: Write the updated base.json**

```json
{
  "$schema": "../schemas/base.json",
  "info": {
    "name": "synthpunk-pastel-light",
    "description": "Synthpunk Pastel light mode palette — warm and dreamy vaporwave",
    "version": "0.1.0"
  },
  "colors": {
    "rosewater": { "hex": "FFE8F0", "rgb": [255, 232, 240], "description": "Soft blush pink for delicate accents" },
    "flamingo": { "hex": "FF9BB6", "rgb": [255, 155, 182], "description": "Warm pink for lively highlights" },
    "pink": { "hex": "FF7DB0", "rgb": [255, 125, 176], "description": "Vivid pink for strings, escape sequences" },
    "maroon": { "hex": "D48BA0", "rgb": [212, 139, 160], "description": "Muted mauve for parameters, operators" },
    "red": { "hex": "FF5470", "rgb": [255, 84, 112], "description": "Vibrant coral-red for errors, critical" },
    "peach": { "hex": "FFA07A", "rgb": [255, 160, 122], "description": "Soft orange for types, constants" },
    "yellow": { "hex": "E8A840", "rgb": [232, 168, 64], "description": "Golden amber for attributes, classes" },
    "green": { "hex": "7FD7B5", "rgb": [127, 215, 181], "description": "Soft mint for success, strings" },
    "teal": { "hex": "5ED4E0", "rgb": [94, 212, 224], "description": "Retro cyan for keywords, info" },
    "sky": { "hex": "7AC8FF", "rgb": [122, 200, 255], "description": "Bright sky blue for methods, variables" },
    "sapphire": { "hex": "7AA8C0", "rgb": [122, 168, 192], "description": "Muted blue for built-ins, types" },
    "blue": { "hex": "8BA4FF", "rgb": [139, 164, 255], "description": "Soft periwinkle for functions, links" },
    "lavender": { "hex": "C49BFF", "rgb": [196, 155, 255], "description": "Soft purple for functions, highlights" },
    "text": { "hex": "2E1A24", "rgb": [46, 26, 36], "description": "Primary text — deep warm brown" },
    "subtext1": { "hex": "6B4F5E", "rgb": [107, 79, 94], "description": "Secondary text" },
    "subtext0": { "hex": "997A8A", "rgb": [153, 122, 138], "description": "Tertiary text, placeholders" },
    "overlay": { "hex": "C4A8B8", "rgb": [196, 168, 184], "description": "Overlays, disabled states, comments" },
    "surface2": { "hex": "D4B8C8", "rgb": [212, 184, 200], "description": "Highest surface elevation" },
    "surface1": { "hex": "E4CCD8", "rgb": [228, 204, 216], "description": "Mid surface elevation" },
    "surface0": { "hex": "F0DEE8", "rgb": [240, 222, 232], "description": "Lowest surface elevation" },
    "base": { "hex": "FFF8F5", "rgb": [255, 248, 245], "description": "Primary background — warm white" },
    "mantle": { "hex": "FFF0EB", "rgb": [255, 240, 235], "description": "Slightly darker than base" },
    "crust": { "hex": "FFE8E0", "rgb": [255, 232, 224], "description": "Darkest background depth" }
  }
}
```

- [ ] **Step 2: Validate JSON syntax**

Run: `python3 -c "import json; json.load(open('palette/base.json'))"`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add palette/base.json
git commit -m "feat(palette): add synthpunk-pastel light mode colors"
```

---

### Task 2: Create palette/dark.json with Dark Mode Colors

**Files:**
- Create: `palette/dark.json`

**Context:** Dark mode shares the same 13 accent colors but has different neutral colors (cool-tinted purples instead of warm-tinted roses).

- [ ] **Step 1: Write dark.json**

```json
{
  "$schema": "../schemas/base.json",
  "info": {
    "name": "synthpunk-pastel-dark",
    "description": "Synthpunk Pastel dark mode palette — cool and nocturnal vaporwave",
    "version": "0.1.0"
  },
  "colors": {
    "rosewater": { "hex": "FFE8F0", "rgb": [255, 232, 240], "description": "Soft blush pink for delicate accents" },
    "flamingo": { "hex": "FF9BB6", "rgb": [255, 155, 182], "description": "Warm pink for lively highlights" },
    "pink": { "hex": "FF7DB0", "rgb": [255, 125, 176], "description": "Vivid pink for strings, escape sequences" },
    "maroon": { "hex": "D48BA0", "rgb": [212, 139, 160], "description": "Muted mauve for parameters, operators" },
    "red": { "hex": "FF5470", "rgb": [255, 84, 112], "description": "Vibrant coral-red for errors, critical" },
    "peach": { "hex": "FFA07A", "rgb": [255, 160, 122], "description": "Soft orange for types, constants" },
    "yellow": { "hex": "E8A840", "rgb": [232, 168, 64], "description": "Golden amber for attributes, classes" },
    "green": { "hex": "7FD7B5", "rgb": [127, 215, 181], "description": "Soft mint for success, strings" },
    "teal": { "hex": "5ED4E0", "rgb": [94, 212, 224], "description": "Retro cyan for keywords, info" },
    "sky": { "hex": "7AC8FF", "rgb": [122, 200, 255], "description": "Bright sky blue for methods, variables" },
    "sapphire": { "hex": "7AA8C0", "rgb": [122, 168, 192], "description": "Muted blue for built-ins, types" },
    "blue": { "hex": "8BA4FF", "rgb": [139, 164, 255], "description": "Soft periwinkle for functions, links" },
    "lavender": { "hex": "C49BFF", "rgb": [196, 155, 255], "description": "Soft purple for functions, highlights" },
    "text": { "hex": "F0E0F0", "rgb": [240, 224, 240], "description": "Primary text — soft lavender-white" },
    "subtext1": { "hex": "C8B0D8", "rgb": [200, 176, 216], "description": "Secondary text" },
    "subtext0": { "hex": "A090B8", "rgb": [160, 144, 184], "description": "Tertiary text, placeholders" },
    "overlay": { "hex": "705880", "rgb": [112, 88, 128], "description": "Overlays, disabled states, comments" },
    "surface2": { "hex": "4A3860", "rgb": [74, 56, 96], "description": "Highest surface elevation" },
    "surface1": { "hex": "3A2850", "rgb": [58, 40, 80], "description": "Mid surface elevation" },
    "surface0": { "hex": "2E1E40", "rgb": [46, 30, 64], "description": "Lowest surface elevation" },
    "base": { "hex": "1E1028", "rgb": [30, 16, 40], "description": "Primary background — deep purple-black" },
    "mantle": { "hex": "160A20", "rgb": [22, 10, 32], "description": "Slightly darker than base" },
    "crust": { "hex": "0D0612", "rgb": [13, 6, 18], "description": "Darkest background depth" }
  }
}
```

- [ ] **Step 2: Validate JSON syntax**

Run: `python3 -c "import json; json.load(open('palette/dark.json'))"`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add palette/dark.json
git commit -m "feat(palette): add synthpunk-pastel dark mode colors"
```

---

### Task 3: Update palette/syntax.json

**Files:**
- Modify: `palette/syntax.json`

**Context:** Update syntax mappings to be comprehensive and match our design spec. Color names reference palette/base.json colors.

- [ ] **Step 1: Write updated syntax.json**

```json
{
  "$schema": "../schemas/syntax.json",
  "info": {
    "name": "synthpunk-syntax",
    "description": "Language-agnostic syntax highlighting mappings for synthpunk-pastel",
    "version": "0.1.0"
  },
  "keywords": {
    "keyword": "flamingo",
    "control": "flamingo",
    "operator": "maroon"
  },
  "storage": {
    "type": "peach",
    "modifier": "lavender",
    "class": "yellow"
  },
  "literals": {
    "string": "green",
    "number": "peach",
    "boolean": "peach",
    "constant": "peach"
  },
  "comments": {
    "line": "overlay",
    "block": "overlay"
  },
  "functions": {
    "function": "blue",
    "method": "sky",
    "parameter": "maroon"
  },
  "variables": {
    "variable": "text",
    "property": "teal",
    "attribute": "sapphire"
  },
  "entities": {
    "namespace": "flamingo",
    "tag": "green",
    "attribute": "yellow"
  },
  "support": {
    "type": "sky",
    "class": "blue",
    "function": "sapphire"
  },
  "invalid": {
    "illegal": "red",
    "deprecated": "red"
  }
}
```

- [ ] **Step 2: Validate JSON syntax**

Run: `python3 -c "import json; json.load(open('palette/syntax.json'))"`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add palette/syntax.json
git commit -m "feat(palette): update syntax highlighting mappings"
```

---

### Task 4: Update palette/semantic.json

**Files:**
- Modify: `palette/semantic.json`

**Context:** Update semantic mappings to match the design spec. The semantic file references color names, not specific values.

- [ ] **Step 1: Write updated semantic.json**

```json
{
  "$schema": "../schemas/semantic.json",
  "info": {
    "name": "synthpunk-semantic",
    "description": "Semantic role mappings for Synthpunk color palette",
    "version": "0.1.0"
  },
  "background": {
    "base": "base",
    "mantle": "mantle",
    "crust": "crust"
  },
  "surface": {
    "surface0": "surface0",
    "surface1": "surface1",
    "surface2": "surface2"
  },
  "overlay": {
    "overlay0": "overlay",
    "overlay1": "overlay",
    "overlay2": "overlay"
  },
  "text": {
    "primary": "text",
    "subtext1": "subtext1",
    "subtext0": "subtext0"
  },
  "accent": {
    "default": "pink",
    "hover": "flamingo"
  },
  "status": {
    "success": "green",
    "warning": "yellow",
    "error": "red",
    "info": "blue"
  },
  "border": {
    "default": "surface0",
    "focused": "lavender",
    "selected": "pink",
    "disabled": "overlay"
  }
}
```

- [ ] **Step 2: Validate JSON syntax**

Run: `python3 -c "import json; json.load(open('palette/semantic.json'))"`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add palette/semantic.json
git commit -m "feat(palette): update semantic role mappings"
```

---

### Task 5: Create Zed Light Theme

**Files:**
- Modify: `themes/zed/light.json`

**Context:** Populate the Zed light theme file with all tokens mapped to synthpunk-pastel light mode colors. The Zed theme format uses 8-digit hex (with alpha channel).

- [ ] **Step 1: Write the light theme**

```json
{
  "$schema": "https://zed.dev/schema/themes/v0.2.0.json",
  "name": "Synthpunk Pastel",
  "author": "Synthpunk",
  "themes": [
    {
      "name": "Synthpunk Pastel Light",
      "appearance": "light",
      "style": {
        "border": "#E4CCD8ff",
        "border.variant": "#F0DEE8ff",
        "border.focused": "#C49BFFff",
        "border.selected": "#FF7DB033",
        "border.transparent": "#00000000",
        "border.disabled": "#F0DEE8ff",
        "elevated_surface.background": "#FFF0EBff",
        "surface.background": "#FFF0EBff",
        "background": "#FFF8F5ff",
        "element.background": "#FFF0EBff",
        "element.hover": "#F0DEE8ff",
        "element.active": "#E4CCD8ff",
        "element.selected": "#E4CCD8ff",
        "element.disabled": "#F0DEE8ff",
        "drop_target.background": "#C4A8B880",
        "ghost_element.background": "#00000000",
        "ghost_element.hover": "#F0DEE8ff",
        "ghost_element.active": "#E4CCD8ff",
        "ghost_element.selected": "#E4CCD8ff",
        "ghost_element.disabled": "#F0DEE8ff",
        "text": "#2E1A24ff",
        "text.muted": "#6B4F5Eff",
        "text.placeholder": "#997A8Aff",
        "text.disabled": "#997A8Aff",
        "text.accent": "#FF7DB0ff",
        "icon": "#2E1A24ff",
        "icon.muted": "#6B4F5Eff",
        "icon.disabled": "#997A8Aff",
        "icon.placeholder": "#6B4F5Eff",
        "icon.accent": "#FF7DB0ff",
        "status_bar.background": "#FFF8F5ff",
        "title_bar.background": "#FFF8F5ff",
        "title_bar.inactive_background": "#FFF0EBff",
        "toolbar.background": "#FFF8F5ff",
        "tab_bar.background": "#FFF0EBff",
        "tab.inactive_background": "#FFF0EBff",
        "tab.active_background": "#FFF8F5ff",
        "search.match_background": "#5ED4E033",
        "search.active_match_background": "#FF547033",
        "panel.background": "#FFF0EBff",
        "panel.focused_border": null,
        "pane.focused_border": null,
        "scrollbar.thumb.background": "#6B4F5E4c",
        "scrollbar.thumb.hover_background": "#997A8Aff",
        "scrollbar.thumb.border": "#997A8Aff",
        "scrollbar.track.background": "#00000000",
        "scrollbar.track.border": "#F0DEE8ff",
        "editor.foreground": "#2E1A24ff",
        "editor.background": "#FFF8F5ff",
        "editor.gutter.background": "#FFF8F5ff",
        "editor.subheader.background": "#FFF0EBff",
        "editor.active_line.background": "#F0DEE8bf",
        "editor.highlighted_line.background": "#FFF0EBff",
        "editor.line_number": "#C4A8B8",
        "editor.active_line_number": "#FF9BB6",
        "editor.hover_line_number": "#6B4F5E",
        "editor.invisible": "#C4A8B8",
        "editor.wrap_guide": "#2E1A240d",
        "editor.active_wrap_guide": "#2E1A241a",
        "editor.document_highlight.read_background": "#5ED4E01a",
        "editor.document_highlight.write_background": "#C4A8B866",
        "terminal.background": "#FFF8F5ff",
        "terminal.foreground": "#2E1A24ff",
        "terminal.bright_foreground": "#2E1A24ff",
        "terminal.dim_foreground": "#997A8Aff",
        "terminal.ansi.black": "#2E1A24ff",
        "terminal.ansi.bright_black": "#6B4F5Eff",
        "terminal.ansi.dim_black": "#4A3540ff",
        "terminal.ansi.red": "#FF5470ff",
        "terminal.ansi.bright_red": "#FF7080ff",
        "terminal.ansi.dim_red": "#B83C50ff",
        "terminal.ansi.green": "#7FD7B5ff",
        "terminal.ansi.bright_green": "#9DE5C8ff",
        "terminal.ansi.dim_green": "#5A9A80ff",
        "terminal.ansi.yellow": "#E8A840ff",
        "terminal.ansi.bright_yellow": "#F0C060ff",
        "terminal.ansi.dim_yellow": "#A88030ff",
        "terminal.ansi.blue": "#8BA4FFff",
        "terminal.ansi.bright_blue": "#A8BCFFff",
        "terminal.ansi.dim_blue": "#6270B0ff",
        "terminal.ansi.magenta": "#FF7DB0ff",
        "terminal.ansi.bright_magenta": "#FF9BC8ff",
        "terminal.ansi.dim_magenta": "#B86080ff",
        "terminal.ansi.cyan": "#5ED4E0ff",
        "terminal.ansi.bright_cyan": "#7EE0EAff",
        "terminal.ansi.dim_cyan": "#4298A0ff",
        "terminal.ansi.white": "#997A8Aff",
        "terminal.ansi.bright_white": "#2E1A24ff",
        "terminal.ansi.dim_white": "#705860ff",
        "link_text.hover": "#8BA4FFff",
        "version_control.added": "#7FD7B5ff",
        "version_control.modified": "#E8A840ff",
        "version_control.word_added": "#7FD7B559",
        "version_control.word_deleted": "#FF5470CC",
        "version_control.deleted": "#FF5470ff",
        "conflict": "#E8A840ff",
        "conflict.background": "#E8A8401a",
        "conflict.border": "#E8A84033",
        "created": "#7FD7B5ff",
        "created.background": "#7FD7B51a",
        "created.border": "#7FD7B533",
        "deleted": "#FF5470ff",
        "deleted.background": "#FF54701a",
        "deleted.border": "#FF547033",
        "error": "#FF5470ff",
        "error.background": "#FF54701a",
        "error.border": "#FF547033",
        "hidden": "#997A8Aff",
        "hidden.background": "#997A8A1a",
        "hidden.border": "#997A8A33",
        "hint": "#7AA8C0ff",
        "hint.background": "#7AA8C01a",
        "hint.border": "#7AA8C033",
        "ignored": "#997A8Aff",
        "ignored.background": "#997A8A1a",
        "ignored.border": "#997A8A33",
        "info": "#8BA4FFff",
        "info.background": "#8BA4FF1a",
        "info.border": "#8BA4FF33",
        "modified": "#E8A840ff",
        "modified.background": "#E8A8401a",
        "modified.border": "#E8A84033",
        "predictive": "#997A8Aff",
        "predictive.background": "#997A8A1a",
        "predictive.border": "#997A8A33",
        "renamed": "#8BA4FFff",
        "renamed.background": "#8BA4FF1a",
        "renamed.border": "#8BA4FF33",
        "success": "#7FD7B5ff",
        "success.background": "#7FD7B51a",
        "success.border": "#7FD7B533",
        "unreachable": "#6B4F5Eff",
        "unreachable.background": "#6B4F5E1a",
        "unreachable.border": "#6B4F5E33",
        "warning": "#E8A840ff",
        "warning.background": "#E8A8401a",
        "warning.border": "#E8A84033",
        "players": [
          {
            "cursor": "#FF9BB6ff",
            "background": "#FF9BB6ff",
            "selection": "#FF9BB63d"
          },
          {
            "cursor": "#5ED4E0ff",
            "background": "#5ED4E0ff",
            "selection": "#5ED4E03d"
          },
          {
            "cursor": "#8BA4FFff",
            "background": "#8BA4FFff",
            "selection": "#8BA4FF3d"
          },
          {
            "cursor": "#C49BFFff",
            "background": "#C49BFFff",
            "selection": "#C49BFF3d"
          },
          {
            "cursor": "#7FD7B5ff",
            "background": "#7FD7B5ff",
            "selection": "#7FD7B53d"
          },
          {
            "cursor": "#FF5470ff",
            "background": "#FF5470ff",
            "selection": "#FF54703d"
          },
          {
            "cursor": "#E8A840ff",
            "background": "#E8A840ff",
            "selection": "#E8A8403d"
          },
          {
            "cursor": "#FFA07Aff",
            "background": "#FFA07Aff",
            "selection": "#FFA07A3d"
          }
        ],
        "syntax": {
          "attribute": {
            "color": "#E8A840ff",
            "font_style": null,
            "font_weight": null
          },
          "boolean": {
            "color": "#FFA07Aff",
            "font_style": null,
            "font_weight": null
          },
          "comment": {
            "color": "#C4A8B8ff",
            "font_style": null,
            "font_weight": null
          },
          "comment.doc": {
            "color": "#997A8Aff",
            "font_style": null,
            "font_weight": null
          },
          "constant": {
            "color": "#FFA07Aff",
            "font_style": null,
            "font_weight": null
          },
          "constructor": {
            "color": "#8BA4FFff",
            "font_style": null,
            "font_weight": null
          },
          "embedded": {
            "color": "#2E1A24ff",
            "font_style": null,
            "font_weight": null
          },
          "emphasis": {
            "color": "#8BA4FFff",
            "font_style": null,
            "font_weight": null
          },
          "emphasis.strong": {
            "color": "#E8A840ff",
            "font_style": null,
            "font_weight": 700
          },
          "enum": {
            "color": "#5ED4E0ff",
            "font_style": null,
            "font_weight": null
          },
          "function": {
            "color": "#8BA4FFff",
            "font_style": null,
            "font_weight": null
          },
          "hint": {
            "color": "#7AA8C0ff",
            "font_style": null,
            "font_weight": null
          },
          "keyword": {
            "color": "#FF9BB6ff",
            "font_style": null,
            "font_weight": null
          },
          "label": {
            "color": "#8BA4FFff",
            "font_style": null,
            "font_weight": null
          },
          "link_text": {
            "color": "#8BA4FFff",
            "font_style": "italic",
            "font_weight": null
          },
          "link_uri": {
            "color": "#7AC8FFff",
            "font_style": null,
            "font_weight": null
          },
          "namespace": {
            "color": "#FF9BB6ff",
            "font_style": null,
            "font_weight": null
          },
          "number": {
            "color": "#FFA07Aff",
            "font_style": null,
            "font_weight": null
          },
          "operator": {
            "color": "#D48BA0ff",
            "font_style": null,
            "font_weight": null
          },
          "predictive": {
            "color": "#997A8Aff",
            "font_style": "italic",
            "font_weight": null
          },
          "preproc": {
            "color": "#FF9BB6ff",
            "font_style": null,
            "font_weight": null
          },
          "primary": {
            "color": "#2E1A24ff",
            "font_style": null,
            "font_weight": null
          },
          "property": {
            "color": "#5ED4E0ff",
            "font_style": null,
            "font_weight": null
          },
          "punctuation": {
            "color": "#2E1A24ff",
            "font_style": null,
            "font_weight": null
          },
          "punctuation.bracket": {
            "color": "#6B4F5Eff",
            "font_style": null,
            "font_weight": null
          },
          "punctuation.delimiter": {
            "color": "#6B4F5Eff",
            "font_style": null,
            "font_weight": null
          },
          "punctuation.list_marker": {
            "color": "#FF5470ff",
            "font_style": null,
            "font_weight": null
          },
          "punctuation.markup": {
            "color": "#FF5470ff",
            "font_style": null,
            "font_weight": null
          },
          "punctuation.special": {
            "color": "#FF7DB0ff",
            "font_style": null,
            "font_weight": null
          },
          "selector": {
            "color": "#E8A840ff",
            "font_style": null,
            "font_weight": null
          },
          "selector.pseudo": {
            "color": "#8BA4FFff",
            "font_style": null,
            "font_weight": null
          },
          "string": {
            "color": "#7FD7B5ff",
            "font_style": null,
            "font_weight": null
          },
          "string.escape": {
            "color": "#FF7DB0ff",
            "font_style": null,
            "font_weight": null
          },
          "string.regex": {
            "color": "#FFA07Aff",
            "font_style": null,
            "font_weight": null
          },
          "string.special": {
            "color": "#FFA07Aff",
            "font_style": null,
            "font_weight": null
          },
          "string.special.symbol": {
            "color": "#FFA07Aff",
            "font_style": null,
            "font_weight": null
          },
          "tag": {
            "color": "#7FD7B5ff",
            "font_style": null,
            "font_weight": null
          },
          "text.literal": {
            "color": "#7FD7B5ff",
            "font_style": null,
            "font_weight": null
          },
          "title": {
            "color": "#FF5470ff",
            "font_style": null,
            "font_weight": 400
          },
          "type": {
            "color": "#5ED4E0ff",
            "font_style": null,
            "font_weight": null
          },
          "variable": {
            "color": "#2E1A24ff",
            "font_style": null,
            "font_weight": null
          },
          "variable.special": {
            "color": "#FFA07Aff",
            "font_style": null,
            "font_weight": null
          },
          "variant": {
            "color": "#8BA4FFff",
            "font_style": null,
            "font_weight": null
          }
        }
      }
    }
  ]
}
```

- [ ] **Step 2: Validate JSON syntax**

Run: `python3 -c "import json; json.load(open('themes/zed/light.json'))"`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add themes/zed/light.json
git commit -m "feat(zed): add synthpunk-pastel light theme"
```

---

### Task 6: Create Zed Dark Theme

**Files:**
- Modify: `themes/zed/dark.json`

**Context:** Populate the Zed dark theme file. Same structure as light but with dark mode neutral colors and cool hero accents.

- [ ] **Step 1: Write the dark theme**

```json
{
  "$schema": "https://zed.dev/schema/themes/v0.2.0.json",
  "name": "Synthpunk Pastel",
  "author": "Synthpunk",
  "themes": [
    {
      "name": "Synthpunk Pastel Dark",
      "appearance": "dark",
      "style": {
        "border": "#3A2850ff",
        "border.variant": "#2E1E40ff",
        "border.focused": "#C49BFFff",
        "border.selected": "#5ED4E033",
        "border.transparent": "#00000000",
        "border.disabled": "#2E1E40ff",
        "elevated_surface.background": "#160A20ff",
        "surface.background": "#160A20ff",
        "background": "#1E1028ff",
        "element.background": "#160A20ff",
        "element.hover": "#2E1E40ff",
        "element.active": "#3A2850ff",
        "element.selected": "#3A2850ff",
        "element.disabled": "#2E1E40ff",
        "drop_target.background": "#70588080",
        "ghost_element.background": "#00000000",
        "ghost_element.hover": "#2E1E40ff",
        "ghost_element.active": "#3A2850ff",
        "ghost_element.selected": "#3A2850ff",
        "ghost_element.disabled": "#2E1E40ff",
        "text": "#F0E0F0ff",
        "text.muted": "#C8B0D8ff",
        "text.placeholder": "#A090B8ff",
        "text.disabled": "#A090B8ff",
        "text.accent": "#5ED4E0ff",
        "icon": "#F0E0F0ff",
        "icon.muted": "#C8B0D8ff",
        "icon.disabled": "#A090B8ff",
        "icon.placeholder": "#C8B0D8ff",
        "icon.accent": "#5ED4E0ff",
        "status_bar.background": "#1E1028ff",
        "title_bar.background": "#1E1028ff",
        "title_bar.inactive_background": "#160A20ff",
        "toolbar.background": "#1E1028ff",
        "tab_bar.background": "#160A20ff",
        "tab.inactive_background": "#160A20ff",
        "tab.active_background": "#1E1028ff",
        "search.match_background": "#FF9BB633",
        "search.active_match_background": "#FF547033",
        "panel.background": "#160A20ff",
        "panel.focused_border": null,
        "pane.focused_border": null,
        "scrollbar.thumb.background": "#C8B0D84c",
        "scrollbar.thumb.hover_background": "#A090B8ff",
        "scrollbar.thumb.border": "#A090B8ff",
        "scrollbar.track.background": "#00000000",
        "scrollbar.track.border": "#2E1E40ff",
        "editor.foreground": "#F0E0F0ff",
        "editor.background": "#1E1028ff",
        "editor.gutter.background": "#1E1028ff",
        "editor.subheader.background": "#160A20ff",
        "editor.active_line.background": "#2E1E40bf",
        "editor.highlighted_line.background": "#160A20ff",
        "editor.line_number": "#705880",
        "editor.active_line_number": "#5ED4E0",
        "editor.hover_line_number": "#C8B0D8",
        "editor.invisible": "#705880",
        "editor.wrap_guide": "#F0E0F00d",
        "editor.active_wrap_guide": "#F0E0F01a",
        "editor.document_highlight.read_background": "#FF9BB61a",
        "editor.document_highlight.write_background": "#70588066",
        "terminal.background": "#1E1028ff",
        "terminal.foreground": "#F0E0F0ff",
        "terminal.bright_foreground": "#F0E0F0ff",
        "terminal.dim_foreground": "#A090B8ff",
        "terminal.ansi.black": "#0D0612ff",
        "terminal.ansi.bright_black": "#A090B8ff",
        "terminal.ansi.dim_black": "#2E1E40ff",
        "terminal.ansi.red": "#FF5470ff",
        "terminal.ansi.bright_red": "#FF7080ff",
        "terminal.ansi.dim_red": "#B83C50ff",
        "terminal.ansi.green": "#7FD7B5ff",
        "terminal.ansi.bright_green": "#9DE5C8ff",
        "terminal.ansi.dim_green": "#5A9A80ff",
        "terminal.ansi.yellow": "#E8A840ff",
        "terminal.ansi.bright_yellow": "#F0C060ff",
        "terminal.ansi.dim_yellow": "#A88030ff",
        "terminal.ansi.blue": "#8BA4FFff",
        "terminal.ansi.bright_blue": "#A8BCFFff",
        "terminal.ansi.dim_blue": "#6270B0ff",
        "terminal.ansi.magenta": "#FF7DB0ff",
        "terminal.ansi.bright_magenta": "#FF9BC8ff",
        "terminal.ansi.dim_magenta": "#B86080ff",
        "terminal.ansi.cyan": "#5ED4E0ff",
        "terminal.ansi.bright_cyan": "#7EE0EAff",
        "terminal.ansi.dim_cyan": "#4298A0ff",
        "terminal.ansi.white": "#C8B0D8ff",
        "terminal.ansi.bright_white": "#F0E0F0ff",
        "terminal.ansi.dim_white": "#9078A0ff",
        "link_text.hover": "#7AC8FFff",
        "version_control.added": "#7FD7B5ff",
        "version_control.modified": "#E8A840ff",
        "version_control.word_added": "#7FD7B559",
        "version_control.word_deleted": "#FF5470CC",
        "version_control.deleted": "#FF5470ff",
        "conflict": "#E8A840ff",
        "conflict.background": "#E8A8401a",
        "conflict.border": "#E8A84033",
        "created": "#7FD7B5ff",
        "created.background": "#7FD7B51a",
        "created.border": "#7FD7B533",
        "deleted": "#FF5470ff",
        "deleted.background": "#FF54701a",
        "deleted.border": "#FF547033",
        "error": "#FF5470ff",
        "error.background": "#FF54701a",
        "error.border": "#FF547033",
        "hidden": "#A090B8ff",
        "hidden.background": "#A090B81a",
        "hidden.border": "#A090B833",
        "hint": "#7AA8C0ff",
        "hint.background": "#7AA8C01a",
        "hint.border": "#7AA8C033",
        "ignored": "#A090B8ff",
        "ignored.background": "#A090B81a",
        "ignored.border": "#A090B833",
        "info": "#8BA4FFff",
        "info.background": "#8BA4FF1a",
        "info.border": "#8BA4FF33",
        "modified": "#E8A840ff",
        "modified.background": "#E8A8401a",
        "modified.border": "#E8A84033",
        "predictive": "#A090B8ff",
        "predictive.background": "#A090B81a",
        "predictive.border": "#A090B833",
        "renamed": "#8BA4FFff",
        "renamed.background": "#8BA4FF1a",
        "renamed.border": "#8BA4FF33",
        "success": "#7FD7B5ff",
        "success.background": "#7FD7B51a",
        "success.border": "#7FD7B533",
        "unreachable": "#C8B0D8ff",
        "unreachable.background": "#C8B0D81a",
        "unreachable.border": "#C8B0D833",
        "warning": "#E8A840ff",
        "warning.background": "#E8A8401a",
        "warning.border": "#E8A84033",
        "players": [
          {
            "cursor": "#5ED4E0ff",
            "background": "#5ED4E0ff",
            "selection": "#5ED4E03d"
          },
          {
            "cursor": "#FF9BB6ff",
            "background": "#FF9BB6ff",
            "selection": "#FF9BB63d"
          },
          {
            "cursor": "#7AC8FFff",
            "background": "#7AC8FFff",
            "selection": "#7AC8FF3d"
          },
          {
            "cursor": "#C49BFFff",
            "background": "#C49BFFff",
            "selection": "#C49BFF3d"
          },
          {
            "cursor": "#7FD7B5ff",
            "background": "#7FD7B5ff",
            "selection": "#7FD7B53d"
          },
          {
            "cursor": "#FF5470ff",
            "background": "#FF5470ff",
            "selection": "#FF54703d"
          },
          {
            "cursor": "#E8A840ff",
            "background": "#E8A840ff",
            "selection": "#E8A8403d"
          },
          {
            "cursor": "#FFA07Aff",
            "background": "#FFA07Aff",
            "selection": "#FFA07A3d"
          }
        ],
        "syntax": {
          "attribute": {
            "color": "#E8A840ff",
            "font_style": null,
            "font_weight": null
          },
          "boolean": {
            "color": "#FFA07Aff",
            "font_style": null,
            "font_weight": null
          },
          "comment": {
            "color": "#705880ff",
            "font_style": null,
            "font_weight": null
          },
          "comment.doc": {
            "color": "#A090B8ff",
            "font_style": null,
            "font_weight": null
          },
          "constant": {
            "color": "#FFA07Aff",
            "font_style": null,
            "font_weight": null
          },
          "constructor": {
            "color": "#C49BFFff",
            "font_style": null,
            "font_weight": null
          },
          "embedded": {
            "color": "#F0E0F0ff",
            "font_style": null,
            "font_weight": null
          },
          "emphasis": {
            "color": "#C49BFFff",
            "font_style": null,
            "font_weight": null
          },
          "emphasis.strong": {
            "color": "#E8A840ff",
            "font_style": null,
            "font_weight": 700
          },
          "enum": {
            "color": "#5ED4E0ff",
            "font_style": null,
            "font_weight": null
          },
          "function": {
            "color": "#C49BFFff",
            "font_style": null,
            "font_weight": null
          },
          "hint": {
            "color": "#7AA8C0ff",
            "font_style": null,
            "font_weight": null
          },
          "keyword": {
            "color": "#5ED4E0ff",
            "font_style": null,
            "font_weight": null
          },
          "label": {
            "color": "#C49BFFff",
            "font_style": null,
            "font_weight": null
          },
          "link_text": {
            "color": "#C49BFFff",
            "font_style": "italic",
            "font_weight": null
          },
          "link_uri": {
            "color": "#7AC8FFff",
            "font_style": null,
            "font_weight": null
          },
          "namespace": {
            "color": "#FF9BB6ff",
            "font_style": null,
            "font_weight": null
          },
          "number": {
            "color": "#FFA07Aff",
            "font_style": null,
            "font_weight": null
          },
          "operator": {
            "color": "#D48BA0ff",
            "font_style": null,
            "font_weight": null
          },
          "predictive": {
            "color": "#A090B8ff",
            "font_style": "italic",
            "font_weight": null
          },
          "preproc": {
            "color": "#5ED4E0ff",
            "font_style": null,
            "font_weight": null
          },
          "primary": {
            "color": "#F0E0F0ff",
            "font_style": null,
            "font_weight": null
          },
          "property": {
            "color": "#7AC8FFff",
            "font_style": null,
            "font_weight": null
          },
          "punctuation": {
            "color": "#F0E0F0ff",
            "font_style": null,
            "font_weight": null
          },
          "punctuation.bracket": {
            "color": "#C8B0D8ff",
            "font_style": null,
            "font_weight": null
          },
          "punctuation.delimiter": {
            "color": "#C8B0D8ff",
            "font_style": null,
            "font_weight": null
          },
          "punctuation.list_marker": {
            "color": "#FF5470ff",
            "font_style": null,
            "font_weight": null
          },
          "punctuation.markup": {
            "color": "#FF5470ff",
            "font_style": null,
            "font_weight": null
          },
          "punctuation.special": {
            "color": "#FF7DB0ff",
            "font_style": null,
            "font_weight": null
          },
          "selector": {
            "color": "#E8A840ff",
            "font_style": null,
            "font_weight": null
          },
          "selector.pseudo": {
            "color": "#C49BFFff",
            "font_style": null,
            "font_weight": null
          },
          "string": {
            "color": "#7FD7B5ff",
            "font_style": null,
            "font_weight": null
          },
          "string.escape": {
            "color": "#FF7DB0ff",
            "font_style": null,
            "font_weight": null
          },
          "string.regex": {
            "color": "#FFA07Aff",
            "font_style": null,
            "font_weight": null
          },
          "string.special": {
            "color": "#FFA07Aff",
            "font_style": null,
            "font_weight": null
          },
          "string.special.symbol": {
            "color": "#FFA07Aff",
            "font_style": null,
            "font_weight": null
          },
          "tag": {
            "color": "#7FD7B5ff",
            "font_style": null,
            "font_weight": null
          },
          "text.literal": {
            "color": "#7FD7B5ff",
            "font_style": null,
            "font_weight": null
          },
          "title": {
            "color": "#FF5470ff",
            "font_style": null,
            "font_weight": 400
          },
          "type": {
            "color": "#5ED4E0ff",
            "font_style": null,
            "font_weight": null
          },
          "variable": {
            "color": "#F0E0F0ff",
            "font_style": null,
            "font_weight": null
          },
          "variable.special": {
            "color": "#FFA07Aff",
            "font_style": null,
            "font_weight": null
          },
          "variant": {
            "color": "#C49BFFff",
            "font_style": null,
            "font_weight": null
          }
        }
      }
    }
  ]
}
```

- [ ] **Step 2: Validate JSON syntax**

Run: `python3 -c "import json; json.load(open('themes/zed/dark.json'))"`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add themes/zed/dark.json
git commit -m "feat(zed): add synthpunk-pastel dark theme"
```

---

### Task 7: Create Palette Preview Generator

**Files:**
- Create: `scripts/generate-preview.py`
- Create: `assets/` directory if needed

**Context:** Generate PNG images showing the complete light and dark palettes for documentation and visual reference.

- [ ] **Step 1: Create the generator script**

```python
#!/usr/bin/env python3
"""Generate palette preview images for synthpunk-pastel."""

import json
import os
from PIL import Image, ImageDraw, ImageFont


def load_palette(path):
    with open(path) as f:
        data = json.load(f)
    return data["colors"]


def hex_to_rgb(hex_color):
    hex_color = hex_color.lstrip("#")
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))


def get_text_color(bg_rgb):
    """Return white or black text depending on background brightness."""
    brightness = (bg_rgb[0] * 299 + bg_rgb[1] * 587 + bg_rgb[2] * 114) / 1000
    return (255, 255, 255) if brightness < 128 else (46, 26, 36)


def generate_preview(palette, output_path, title):
    """Generate a palette preview image."""
    # Layout constants
    swatch_size = 120
    text_height = 40
    gap = 8
    cols = 7
    
    accent_names = [
        "rosewater", "flamingo", "pink", "maroon", "red", "peach", "yellow",
        "green", "teal", "sky", "sapphire", "blue", "lavender"
    ]
    neutral_names = [
        "text", "subtext1", "subtext0", "overlay",
        "surface2", "surface1", "surface0",
        "base", "mantle", "crust"
    ]
    
    accent_count = len(accent_names)
    neutral_count = len(neutral_names)
    
    accent_rows = (accent_count + cols - 1) // cols
    neutral_rows = (neutral_count + cols - 1) // cols
    total_rows = accent_rows + neutral_rows + 1  # +1 for title spacing
    
    width = cols * (swatch_size + gap) + gap
    height = total_rows * (swatch_size + text_height + gap) + gap + 60  # extra for title
    
    img = Image.new("RGB", (width, height), (250, 250, 250))
    draw = ImageDraw.Draw(img)
    
    # Try to load a font, fallback to default
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 14)
        title_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 20)
    except:
        font = ImageFont.load_default()
        title_font = font
    
    # Draw title
    draw.text((gap, 20), title, fill=(46, 26, 36), font=title_font)
    
    y_offset = 60
    
    # Draw accent colors
    for i, name in enumerate(accent_names):
        col = i % cols
        row = i // cols
        x = gap + col * (swatch_size + gap)
        y = y_offset + row * (swatch_size + text_height + gap)
        
        color_data = palette.get(name, {"hex": "000000"})
        rgb = hex_to_rgb(color_data["hex"])
        
        draw.rectangle([x, y, x + swatch_size, y + swatch_size], fill=rgb, outline=(200, 200, 200))
        
        text_color = get_text_color(rgb)
        draw.text((x + 8, y + 8), name, fill=text_color, font=font)
        draw.text((x + 8, y + 28), f"#{color_data['hex']}", fill=text_color, font=font)
    
    y_offset += accent_rows * (swatch_size + text_height + gap) + 30
    
    # Draw neutral colors
    for i, name in enumerate(neutral_names):
        col = i % cols
        row = i // cols
        x = gap + col * (swatch_size + gap)
        y = y_offset + row * (swatch_size + text_height + gap)
        
        color_data = palette.get(name, {"hex": "000000"})
        rgb = hex_to_rgb(color_data["hex"])
        
        draw.rectangle([x, y, x + swatch_size, y + swatch_size], fill=rgb, outline=(200, 200, 200))
        
        text_color = get_text_color(rgb)
        draw.text((x + 8, y + 8), name, fill=text_color, font=font)
        draw.text((x + 8, y + 28), f"#{color_data['hex']}", fill=text_color, font=font)
    
    img.save(output_path)
    print(f"Saved {output_path}")


def main():
    project_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    assets_dir = os.path.join(project_dir, "assets")
    os.makedirs(assets_dir, exist_ok=True)
    
    light_palette = load_palette(os.path.join(project_dir, "palette", "base.json"))
    dark_palette = load_palette(os.path.join(project_dir, "palette", "dark.json"))
    
    generate_preview(light_palette, os.path.join(assets_dir, "palette-preview-light.png"), "Synthpunk Pastel — Light Mode")
    generate_preview(dark_palette, os.path.join(assets_dir, "palette-preview-dark.png"), "Synthpunk Pastel — Dark Mode")


if __name__ == "__main__":
    main()
```

- [ ] **Step 2: Run the generator**

Run: `python3 scripts/generate-preview.py`
Expected: 
```
Saved /Users/maxhaarhaus/personal/synthpunk/assets/palette-preview-light.png
Saved /Users/maxhaarhaus/personal/synthpunk/assets/palette-preview-dark.png
```

- [ ] **Step 3: Verify images were created**

Run: `ls -la assets/palette-preview-*.png`
Expected: Two PNG files exist with non-zero size

- [ ] **Step 4: Commit**

```bash
git add scripts/generate-preview.py assets/
git commit -m "feat(assets): add palette preview generator and images"
```

---

### Task 8: Validation & Final Checks

**Files:**
- All palette and theme files

**Context:** Run a validation script to ensure all colors are valid hex, JSON is well-formed, and there are no obvious issues.

- [ ] **Step 1: Create validation script**

```python
#!/usr/bin/env python3
"""Validate synthpunk palette files."""

import json
import os
import re


def validate_hex(hex_str):
    return re.match(r"^[0-9A-Fa-f]{6}$", hex_str) is not None


def validate_palette(path, name):
    print(f"\nValidating {name}...")
    with open(path) as f:
        data = json.load(f)
    
    colors = data.get("colors", {})
    errors = []
    
    for color_name, color_data in colors.items():
        hex_val = color_data.get("hex", "")
        rgb = color_data.get("rgb", [])
        
        if not validate_hex(hex_val):
            errors.append(f"  Invalid hex for {color_name}: {hex_val}")
        
        if len(rgb) != 3 or not all(isinstance(v, int) and 0 <= v <= 255 for v in rgb):
            errors.append(f"  Invalid RGB for {color_name}: {rgb}")
        
        # Verify hex matches rgb
        expected_hex = f"{rgb[0]:02x}{rgb[1]:02x}{rgb[2]:02x}".upper()
        if hex_val.upper() != expected_hex:
            errors.append(f"  Hex/RGB mismatch for {color_name}: hex={hex_val}, rgb={rgb}")
    
    if errors:
        print(f"  FAILED with {len(errors)} errors:")
        for e in errors:
            print(e)
        return False
    else:
        print(f"  OK — {len(colors)} colors validated")
        return True


def validate_zed_theme(path, name):
    print(f"\nValidating {name}...")
    with open(path) as f:
        data = json.load(f)
    
    themes = data.get("themes", [])
    errors = []
    
    for theme in themes:
        style = theme.get("style", {})
        for key, value in style.items():
            if key == "syntax":
                for syntax_key, syntax_value in value.items():
                    color = syntax_value.get("color", "")
                    if color and not re.match(r"^#[0-9A-Fa-f]{8}$", color):
                        errors.append(f"  Invalid color in syntax.{syntax_key}: {color}")
            elif key == "players":
                continue
            elif value and not re.match(r"^#[0-9A-Fa-f]{8}$", str(value)):
                errors.append(f"  Invalid color in {key}: {value}")
    
    if errors:
        print(f"  FAILED with {len(errors)} errors:")
        for e in errors:
            print(e)
        return False
    else:
        print(f"  OK")
        return True


def main():
    project_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    
    results = []
    results.append(validate_palette(os.path.join(project_dir, "palette", "base.json"), "base.json (light)"))
    results.append(validate_palette(os.path.join(project_dir, "palette", "dark.json"), "dark.json"))
    results.append(validate_zed_theme(os.path.join(project_dir, "themes", "zed", "light.json"), "Zed light theme"))
    results.append(validate_zed_theme(os.path.join(project_dir, "themes", "zed", "dark.json"), "Zed dark theme"))
    
    print("\n" + "="*50)
    if all(results):
        print("All validations passed!")
    else:
        print("Some validations failed. Please fix the errors above.")


if __name__ == "__main__":
    main()
```

- [ ] **Step 2: Run validation**

Run: `python3 scripts/validate.py`
Expected: "All validations passed!"

- [ ] **Step 3: Check for schema compliance**

Run: `python3 -c "
import json
for f in ['palette/base.json', 'palette/dark.json', 'palette/syntax.json', 'palette/semantic.json']:
    data = json.load(open(f))
    print(f'{f}: OK')
"`
Expected: All files report OK

- [ ] **Step 4: Final commit**

```bash
git add scripts/validate.py
git commit -m "chore(scripts): add palette validation script"
```

---

## Self-Review Checklist

**Spec coverage:**
- [x] 13 accent colors defined — Tasks 1-2
- [x] Light mode neutrals — Task 1
- [x] Dark mode neutrals — Task 2
- [x] Syntax highlighting mappings — Tasks 3, 5-6
- [x] Semantic mappings — Task 4
- [x] Zed theme files — Tasks 5-6
- [x] Preview images — Task 7
- [x] Validation — Task 8

**Placeholder scan:** No TBD/TODO/fill-in-details found.

**Type consistency:** All hex values are 6-character uppercase. Zed theme uses 8-character hex with alpha. Color names in syntax.json and semantic.json match keys in base.json/dark.json.
