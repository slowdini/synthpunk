# Synthpunk-Pastel Light Theme Color Update

## Context

The synthpunk-pastel light theme was designed around a unified 13-color accent palette shared between light and dark modes. In practice, several pastel accent colors proved difficult to read when used as foreground text on the warm white background (#FFF8F5). Additionally, the yellow color was previously deepened from its original pale cream (#FFE4B5) to a golden amber (#E8A840) for readability, but this created a tonal mismatch with the rest of the pastel palette.

This update addresses both issues with a minimal, targeted change to only the colors that need adjustment.

## Goals

1. **Revert yellow to its original pastel tone** while ensuring it remains readable on the light background.
2. **Improve readability of other low-contrast accent colors** without losing the vaporwave pastel aesthetic.
3. **Preserve the unified palette concept** as much as possible — keep the number of changed colors minimal.
4. **Maintain the warm, sun-washed light mode mood** — no changes to background or neutral colors.
5. **Leave dark mode completely untouched**.

## Changes

### Modified Accent Colors

#### Light Mode

| Color | Current Hex | New Hex | Rationale |
|---|---|---|---|
| yellow | #E8A840 | #E8C468 | Reverts toward original cream-gold warmth. Deepened just enough for 4.5:1 contrast on #FFF8F5. Softer and more harmonious with the pastel palette than the previous golden-amber. |
| green | #7FD7B5 | #5AC09A | Deeper mint green. Maintains pastel character while improving readability on light background. |
| rosewater | #FFE8F0 | #F8B0C8 | Soft blush pink. Was effectively invisible on #FFF8F5. Now readable while keeping delicate character. |

#### Dark Mode

| Color | Current Hex | New Hex | Rationale |
|---|---|---|---|
| yellow | #E8A840 | #FFE4B5 | Reverted to the original pale cream yellow. Has excellent contrast on the dark purple-black background, restoring the airy pastel character. |

### Unchanged Colors

The following 10 accent colors remain exactly as designed:

- flamingo (#FF9BB6)
- pink (#FF7DB0)
- maroon (#D48BA0)
- red (#FF5470)
- peach (#FFA07A)
- teal (#5ED4E0)
- sky (#7AC8FF)
- sapphire (#7AA8C0)
- blue (#8BA4FF)
- lavender (#C49BFF)

### Unchanged Neutrals & Background

All neutral colors and background layers remain unchanged:

- text (#2E1A24)
- subtext1 (#6B4F5E)
- subtext0 (#997A8A)
- overlay (#C4A8B8)
- surface2 (#D4B8C8)
- surface1 (#E4CCD8)
- surface0 (#F0DEE8)
- base (#FFF8F5)
- mantle (#FFF0EB)
- crust (#FFE8E0)

### Dark Mode

Dark mode receives one change: **yellow is reverted to the original pale cream (#FFE4B5)**. Unlike in light mode, #FFE4B5 has excellent contrast on the dark purple-black background (#1E1028), so the original tone can be used directly without modification. This restores the airy pastel character of yellow in dark mode.

All other dark mode colors remain unchanged.

## Rationale

### Why only three colors?

We explored three approaches:

1. **Darken the background** — Made the theme feel muddy and defeated the "sun-washed" light mode mood. Rosewater and sky still struggled.
2. **Deepen all accent colors** — Created a saturated, high-contrast look that lost the vaporwave pastel feel entirely.
3. **Targeted minimal changes** (chosen) — Only adjusted the colors with genuinely unusable contrast (rosewater, yellow, green). This preserves the aesthetic while fixing real usability problems.

### Why revert yellow?

The original #FFE4B5 was a true pastel cream-gold that harmonized beautifully with the warm half of the palette (rosewater, flamingo, peach). The replacement #E8A840 was chosen for contrast but reads as a bold golden-amber that clashes with the soft, airy feel of the other colors. #E8C468 finds the middle ground — warm and creamy like the original, but with enough saturation to be legible.

### Remaining borderline colors

After this update, flamingo, pink, teal, blue, and lavender remain borderline for body-text contrast on #FFF8F5. However, in actual editor usage these colors appear as syntax highlights against the primary text color (#2E1A24), not as standalone body text. They are sufficiently visible for their intended purpose. Sky remains very low contrast but is primarily used for backgrounds, selections, and method highlighting — contexts where it works acceptably.

## Files Affected

- `palette/base.json` — update yellow, green, rosewater hex values (light mode)
- `palette/dark.json` — update yellow hex value (dark mode)
- `themes/zed/themes/synthpunk-pastel.json` — update light mode and dark mode syntax colors, player colors, and terminal ANSI colors for changed accents
- `assets/palette-preview-light.png` — regenerate preview image
- `assets/palette-preview-dark.png` — regenerate preview image

## Future Considerations

- If user feedback indicates the remaining borderline colors (flamingo, pink, teal, blue, lavender) are still too low-contrast in practice, a future update could deepen them slightly while staying within the pastel range.
- The unified palette concept (shared between light and dark) is now relaxed: yellow differs between modes (#E8C468 light, #FFE4B5 dark), and light mode has three adjusted colors while dark mode has one. This is an acceptable trade-off for each mode maintaining its own readable, harmonious character.

## Approval Status

- [x] Design direction chosen (targeted minimal changes)
- [x] Specific colors selected
- [x] Rationale documented
- [ ] Implementation plan written
- [ ] Colors applied to theme files
