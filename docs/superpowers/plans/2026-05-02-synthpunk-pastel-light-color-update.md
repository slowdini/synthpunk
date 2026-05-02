# Synthpunk-Pastel Light Theme Color Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the approved light theme color update (revert yellow, deepen green and rosewater) to the palette files and Zed theme, while also reverting dark mode yellow to the original pale cream.

**Architecture:** Direct edits to three source files (`palette/base.json`, `palette/dark.json`, `themes/zed/themes/synthpunk-pastel.json`) followed by preview regeneration. The Zed theme uses hardcoded hex values, so a targeted Python script replaces all affected colors in both light and dark sections.

**Tech Stack:** JSON, Python 3 (with Pillow for preview generation), Zed theme JSON format

---

### Task 1: Update Light Mode Palette (base.json)

**Files:**
- Modify: `palette/base.json`

- [ ] **Step 1: Update yellow hex and rgb**

  In `palette/base.json`, replace the yellow color entry:

  ```json
  "yellow": { "hex": "E8C468", "rgb": [232, 196, 104], "description": "Soft cream-gold for attributes, classes" },
  ```

  Old value to replace:
  ```json
  "yellow": { "hex": "E8A840", "rgb": [232, 168, 64], "description": "Golden amber for attributes, classes" },
  ```

- [ ] **Step 2: Update green hex and rgb**

  In `palette/base.json`, replace the green color entry:

  ```json
  "green": { "hex": "5AC09A", "rgb": [90, 192, 154], "description": "Soft mint for success, strings" },
  ```

  Old value to replace:
  ```json
  "green": { "hex": "7FD7B5", "rgb": [127, 215, 181], "description": "Soft mint for success, strings" },
  ```

- [ ] **Step 3: Update rosewater hex and rgb**

  In `palette/base.json`, replace the rosewater color entry:

  ```json
  "rosewater": { "hex": "F8B0C8", "rgb": [248, 176, 200], "description": "Soft blush pink for delicate accents" },
  ```

  Old value to replace:
  ```json
  "rosewater": { "hex": "FFE8F0", "rgb": [255, 232, 240], "description": "Soft blush pink for delicate accents" },
  ```

- [ ] **Step 4: Verify base.json is valid JSON**

  Run: `python3 -c "import json; json.load(open('palette/base.json'))"`
  Expected: No output (success)

- [ ] **Step 5: Commit palette update**

  ```bash
  git add palette/base.json
  git commit -m "feat(palette): update light mode yellow, green, rosewater for readability"
  ```

---

### Task 2: Update Dark Mode Palette (dark.json)

**Files:**
- Modify: `palette/dark.json`

- [ ] **Step 1: Update dark mode yellow to original pale cream**

  In `palette/dark.json`, replace the yellow color entry:

  ```json
  "yellow": { "hex": "FFE4B5", "rgb": [255, 228, 181], "description": "Pale cream gold for attributes, classes" },
  ```

  Old value to replace:
  ```json
  "yellow": { "hex": "E8A840", "rgb": [232, 168, 64], "description": "Golden amber for attributes, classes" },
  ```

- [ ] **Step 2: Verify dark.json is valid JSON**

  Run: `python3 -c "import json; json.load(open('palette/dark.json'))"`
  Expected: No output (success)

- [ ] **Step 3: Commit dark palette update**

  ```bash
  git add palette/dark.json
  git commit -m "feat(palette): revert dark mode yellow to original pale cream"
  ```

---

### Task 3: Update Zed Theme File

**Files:**
- Modify: `themes/zed/themes/synthpunk-pastel.json`

The Zed theme contains hardcoded hex values. We will use a Python script to make all replacements in both the light and dark theme sections, including base colors and their ANSI bright/dim variants.

- [ ] **Step 1: Create replacement script**

  Create `scripts/apply-color-update.py`:

  ```python
  #!/usr/bin/env python3
  """Apply the approved color update to the Zed theme file."""
  
  import json
  import sys
  from pathlib import Path
  
  def replace_in_string(s, old, new):
      """Replace all occurrences of old hex (with any alpha suffix) with new."""
      return s.replace(old, new)
  
  def main():
      project_dir = Path(__file__).parent.parent
      theme_path = project_dir / "themes" / "zed" / "themes" / "synthpunk-pastel.json"
      
      with open(theme_path) as f:
          content = f.read()
      
      # Light mode replacements
      content = replace_in_string(content, "#E8A840", "#E8C468")  # yellow
      content = replace_in_string(content, "#F0C060", "#F0DC88")  # bright yellow (derived)
      content = replace_in_string(content, "#A88030", "#A89C58")  # dim yellow (derived)
      content = replace_in_string(content, "#7FD7B5", "#5AC09A")  # green
      content = replace_in_string(content, "#9DE5C8", "#78CEAD")  # bright green (derived)
      content = replace_in_string(content, "#5A9A80", "#358365")  # dim green (derived)
      content = replace_in_string(content, "#FFE8F0", "#F8B0C8")  # rosewater
      
      # Dark mode replacements (must happen AFTER light mode #E8A840 is already changed)
      # So we target the dark-specific patterns that still have the old value
      # Actually, since we replaced all #E8A840 above, dark mode yellow is now #E8C468.
      # We need to change dark mode yellow to #FFE4B5. But #E8C468 also appears in light mode.
      # We handle this by splitting the content at the light/dark boundary.
      
      # Find the split between light and dark themes
      dark_marker = '"name": "Synthpunk Pastel Dark"'
      if dark_marker not in content:
          print("ERROR: Could not find dark theme marker")
          sys.exit(1)
      
      split_idx = content.index(dark_marker)
      light_section = content[:split_idx]
      dark_section = content[split_idx:]
      
      # Dark section: change the yellow that came from #E8A840 (now #E8C468 after light replacement)
      # back to the original pale cream #FFE4B5, plus its ANSI variants
      dark_section = dark_section.replace("#E8C468", "#FFE4B5")  # yellow base
      dark_section = dark_section.replace("#F0DC88", "#FFFCD5")  # bright yellow (derived)
      dark_section = dark_section.replace("#A89C58", "#BFBCA5")  # dim yellow (derived)
      
      # Note: dark mode green (#7FD7B5) is NOT changed, but since we replaced #7FD7B5
      # globally above, dark mode green is now #5AC09A. We need to revert dark mode green.
      dark_section = dark_section.replace("#5AC09A", "#7FD7B5")
      dark_section = dark_section.replace("#78CEAD", "#9DE5C8")
      dark_section = dark_section.replace("#358365", "#5A9A80")
      
      # Note: dark mode rosewater (#FFE8F0) is NOT changed. Since we replaced #FFE8F0
      # globally above, dark mode rosewater is now #F8B0C8. We need to revert it.
      # However, #FFE8F0 doesn't appear in dark mode. Let's check... 
      # Actually, #FFE8F0 was rosewater and it only appears in palette/base.json, not in zed theme.
      # But to be safe, if it does appear in dark mode, we revert it.
      # Since we did a global replace of #FFE8F0 -> #F8B0C8, and dark mode shouldn't have rosewater,
      # we don't need to do anything unless it appears. Let's be safe and revert if present.
      dark_section = dark_section.replace("#F8B0C8", "#FFE8F0")
      
      content = light_section + dark_section
      
      with open(theme_path, "w") as f:
          f.write(content)
      
      print(f"Updated {theme_path}")
  
  if __name__ == "__main__":
      main()
  ```

- [ ] **Step 2: Run the replacement script**

  Run: `python3 scripts/apply-color-update.py`
  Expected: `Updated /Users/maxhaarhaus/personal/synthpunk/themes/zed/themes/synthpunk-pastel.json`

- [ ] **Step 3: Verify theme JSON is valid**

  Run: `python3 -c "import json; json.load(open('themes/zed/themes/synthpunk-pastel.json'))"`
  Expected: No output (success)

- [ ] **Step 4: Spot-check key colors in the theme**

  Run:
  ```bash
  grep -n "E8C468" themes/zed/themes/synthpunk-pastel.json | head -5
  grep -n "5AC09A" themes/zed/themes/synthpunk-pastel.json | head -5
  grep -n "F8B0C8" themes/zed/themes/synthpunk-pastel.json | head -5
  grep -n "FFE4B5" themes/zed/themes/synthpunk-pastel.json | head -5
  ```
  Expected: Each command returns multiple lines showing the colors are present in the theme.

  Also verify dark mode green was NOT changed:
  ```bash
  grep -n "7FD7B5" themes/zed/themes/synthpunk-pastel.json | head -3
  ```
  Expected: Lines found in the dark theme section (after line 408).

- [ ] **Step 5: Clean up the script**

  ```bash
  rm scripts/apply-color-update.py
  ```

- [ ] **Step 6: Commit theme update**

  ```bash
  git add themes/zed/themes/synthpunk-pastel.json
  git commit -m "feat(zed): apply light theme color update to syntax and UI colors"
  ```

---

### Task 4: Regenerate Palette Preview Images

**Files:**
- Modify: `assets/palette-preview-light.png`
- Modify: `assets/palette-preview-dark.png`

- [ ] **Step 1: Ensure Pillow is available**

  Run: `python3 -c "from PIL import Image, ImageDraw, ImageFont; print('Pillow OK')"`
  Expected: `Pillow OK`

  If missing: `pip3 install Pillow`

- [ ] **Step 2: Regenerate previews**

  Run: `python3 scripts/generate-preview.py`
  Expected:
  ```
  Saved /Users/maxhaarhaus/personal/synthpunk/assets/palette-preview-light.png
  Saved /Users/maxhaarhaus/personal/synthpunk/assets/palette-preview-dark.png
  ```

- [ ] **Step 3: Visually inspect the generated images**

  Open `assets/palette-preview-light.png` and `assets/palette-preview-dark.png`.
  
  Verify:
  - Light mode: yellow swatch shows #E8C468, green shows #5AC09A, rosewater shows #F8B0C8
  - Dark mode: yellow swatch shows #FFE4B5
  - All other colors match the previous previews

- [ ] **Step 4: Commit preview updates**

  ```bash
  git add assets/palette-preview-light.png assets/palette-preview-dark.png
  git commit -m "assets: regenerate palette previews with updated colors"
  ```

---

### Task 5: Validate and Final Commit

**Files:**
- Read: `scripts/validate.py` (to understand what it checks)

- [ ] **Step 1: Run palette validation**

  Run: `python3 scripts/validate.py`
  Expected: Script exits with code 0 (no errors)

  If errors: fix the underlying issue before proceeding.

- [ ] **Step 2: Review all changes**

  Run: `git diff --stat`
  Expected: 4 files changed:
  - `palette/base.json`
  - `palette/dark.json`
  - `themes/zed/themes/synthpunk-pastel.json`
  - `assets/palette-preview-light.png`
  - `assets/palette-preview-dark.png`

- [ ] **Step 3: Final verification — no stray old colors in light theme**

  Run:
  ```bash
  grep "#E8A840" themes/zed/themes/synthpunk-pastel.json || echo "No old yellow found — good"
  grep "#7FD7B5" themes/zed/themes/synthpunk-pastel.json | head -1
  ```
  
  Expected:
  - First command: `No old yellow found — good`
  - Second command: Should show dark mode lines only (verify it's in the dark section, not light)

- [ ] **Step 4: Done — no additional commit needed**

  All changes are already committed in Tasks 1-4.

---

## Self-Review Checklist

### 1. Spec Coverage
- [x] Revert light mode yellow to softer tone (#E8C468) → Task 1, Step 1
- [x] Deepen light mode green (#5AC09A) → Task 1, Step 2
- [x] Deepen light mode rosewater (#F8B0C8) → Task 1, Step 3
- [x] Revert dark mode yellow to original pale cream (#FFE4B5) → Task 2
- [x] Update Zed theme light mode syntax/UI colors → Task 3
- [x] Update Zed theme dark mode yellow → Task 3
- [x] Regenerate preview images → Task 4
- [x] Leave all other colors unchanged → Verified by script logic and spot-checks

### 2. Placeholder Scan
- [x] No "TBD", "TODO", or vague steps
- [x] All code blocks contain complete, runnable code
- [x] All file paths are exact
- [x] Expected outputs are specified for every command

### 3. Type Consistency
- [x] Color hex values match the approved spec exactly
- [x] RGB arrays match the hex values
- [x] ANSI derived colors are calculated consistently
- [x] File paths match the actual project structure
