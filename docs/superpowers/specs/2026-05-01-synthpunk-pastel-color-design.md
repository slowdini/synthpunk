# Synthpunk-Pastel Color Scheme Design

## Context

This document defines the color palette for the **synthpunk-pastel** variant of the Synthpunk color scheme. Synthpunk-pastel is one of two planned variants (the other being synthpunk-neon), designed around the aesthetic of soft pastel vaporwave — dreamy pinks, peaches, and lavenders with a warm, retro-futuristic feel.

### Design Philosophy

All colors are chosen to satisfy these principles:

- **Colorful is better than colorless:** 13 distinct accent colors provide rich differentiation for syntax highlighting and UI elements.
- **There should be balance:** Not too dull, not too bright. Colors are chosen for suitability under various light conditions and long coding sessions.
- **Harmony is superior to dissonance:** All colors share a unified pastel saturation level. Warm and cool halves complement each other through the pastel range.

## Variant Strategy

Synthpunk will have two variants: **synthpunk-pastel** and **synthpunk-neon**.

- **synthpunk-pastel** (this design): Soft, dreamy, warm/cool duality. Light mode is warm and sun-washed; dark mode is cool and nocturnal.
- **synthpunk-neon** (future): High-energy, electric, cyberpunk. Bold neon accents on deep backgrounds.

Each variant has **both a light and dark mode**. The two modes share a unified accent palette but express different moods through which colors take the "hero" roles.

## Unified Accent Palette (13 Colors)

Both light and dark modes share the same 13 accent colors. The difference is in which colors are emphasized:

| Color Name | Hex | RGB | Description |
|---|---|---|---|
| rosewater | #FFE8F0 | [255, 232, 240] | Soft blush pink for delicate accents |
| flamingo | #FF9BB6 | [255, 155, 182] | Warm pink for lively highlights |
| pink | #FF7DB0 | [255, 125, 176] | Vivid pink for strings, escape sequences |
| maroon | #D48BA0 | [212, 139, 160] | Muted mauve for parameters, operators |
| red | #FF5470 | [255, 84, 112] | Vibrant coral-red for errors, critical |
| peach | #FFA07A | [255, 160, 122] | Soft orange for types, constants |
| yellow | #E8A840 | [232, 168, 64] | Golden amber for attributes, classes |
| green | #7FD7B5 | [127, 215, 181] | Soft mint for success, strings |
| teal | #5ED4E0 | [94, 212, 224] | Retro cyan for keywords, info |
| sky | #7AC8FF | [122, 200, 255] | Bright sky blue for methods, variables |
| sapphire | #7AA8C0 | [122, 168, 192] | Muted blue for built-ins, types |
| blue | #8BA4FF | [139, 164, 255] | Soft periwinkle for functions, links |
| lavender | #C49BFF | [196, 155, 255] | Soft purple for functions, highlights |

### Design Notes

- **yellow (#E8A840)** was intentionally deepened from a very pale cream (#FFE4B5) to a richer golden-amber to ensure readability on light backgrounds while maintaining the pastel aesthetic.
- All colors were sourced or derived from the inspiration images (`pastel-horizon`, `vaporsthetic`, `outrunner`, `neon-pulse`, `our-wicked-sweet-star-cruiser`).
- The palette is organized into a **warm half** (rosewater through yellow) and a **cool half** (green through lavender), enabling the warm/cool mood split between modes.

## Light Mode — Warm & Dreamy

### Mood

Light mode evokes a sun-washed, dreamy vaporwave afternoon. The primary accents are warm — pinks, peaches, roses. Cool colors play supporting roles.

### Hero Accents (Light Mode)

| Role | Color | Usage |
|---|---|---|
| Keywords | flamingo | `import`, `const`, `return` |
| Types/Classes | peach | `React`, `App`, class names |
| Strings | pink | `'react'`, `"hello"` |
| Functions | lavender | `function`, method calls |
| Methods | sky | `.map()`, `.filter()` |

### Neutral Colors (Warm-Tinted)

| Name | Hex | RGB | Description |
|---|---|---|---|
| text | #2E1A24 | [46, 26, 36] | Primary text — deep warm brown |
| subtext1 | #6B4F5E | [107, 79, 94] | Secondary text |
| subtext0 | #997A8A | [153, 122, 138] | Tertiary text, placeholders |
| overlay | #C4A8B8 | [196, 168, 184] | Overlays, disabled states |
| surface2 | #D4B8C8 | [212, 184, 200] | Highest surface elevation |
| surface1 | #E4CCD8 | [228, 204, 216] | Mid surface elevation |
| surface0 | #F0DEE8 | [240, 222, 232] | Lowest surface elevation |
| base | #FFF8F5 | [255, 248, 245] | Primary background — warm white |
| mantle | #FFF0EB | [255, 240, 235] | Slightly darker than base |
| crust | #FFE8E0 | [255, 232, 224] | Darkest background depth |

### Light Mode Design Rationale

- **Neutrals are warm-tinted** (rose/mauve undertones) to harmonize with the warm accent palette.
- **base (#FFF8F5)** is a very warm white — not pure white, but tinted slightly peachy-rose to reduce eye strain and create a cohesive feel.
- Contrast ratios between text (#2E1A24) and base (#FFF8F5) are comfortable for long reading sessions.

## Dark Mode — Cool & Nocturnal

### Mood

Dark mode evokes a midnight vaporwave skyline. The primary accents are cool — teals, blues, purples. Warm colors play supporting roles.

### Hero Accents (Dark Mode)

| Role | Color | Usage |
|---|---|---|
| Keywords | teal | `import`, `const`, `return` |
| Variables | sky | `count`, `name` |
| Functions | lavender | `function`, method calls |
| Highlights | flamingo | Search matches, selections |
| Numbers | peach | `42`, `3.14` |

### Neutral Colors (Cool-Tinted)

| Name | Hex | RGB | Description |
|---|---|---|---|
| text | #F0E0F0 | [240, 224, 240] | Primary text — soft lavender-white |
| subtext1 | #C8B0D8 | [200, 176, 216] | Secondary text |
| subtext0 | #A090B8 | [160, 144, 184] | Tertiary text, placeholders |
| overlay | #705880 | [112, 88, 128] | Overlays, disabled states |
| surface2 | #4A3860 | [74, 56, 96] | Highest surface elevation |
| surface1 | #3A2850 | [58, 40, 80] | Mid surface elevation |
| surface0 | #2E1E40 | [46, 30, 64] | Lowest surface elevation |
| base | #1E1028 | [30, 16, 40] | Primary background — deep purple-black |
| mantle | #160A20 | [22, 10, 32] | Slightly darker than base |
| crust | #0D0612 | [13, 6, 18] | Darkest background depth |

### Dark Mode Design Rationale

- **Neutrals are cool-tinted** (purple/lavender undertones) to harmonize with the cool accent palette.
- **base (#1E1028)** is a deep purple-black — not pure black, but tinted to create depth and reduce the harshness of high-contrast dark themes.
- The progression from crust → mantle → base → surface0 → surface1 → surface2 creates a natural elevation hierarchy for UI surfaces.

## Syntax Highlighting Mappings

Syntax highlighting colors vary between light and dark modes to support the warm/cool mood split. The colors come from the same unified palette; only the assignments change.

### Language Defaults — Light Mode

| Syntax Element | Color | Notes |
|---|---|---|
| Keywords | flamingo | `import`, `const`, `return` |
| Strings | green | `'hello'`, `"world"` |
| Symbols, Atoms | red | `true`, `false`, `nil` |
| Escape Sequences, Regex | pink | `\n`, `/pattern/` |
| Comments | overlay | `// line comment` |
| Constants, Numbers | peach | `42`, `3.14`, `PI` |
| Operators | maroon | `+`, `-`, `=>` |
| Braces, Delimiters | overlay | `{`, `}`, `(`, `)` |
| Methods, Functions | blue | `functionName()` |
| Parameters | maroon | function arguments |
| Builtins | red | built-in functions |
| Classes, Types | yellow | `class`, `interface`, `type` |
| Enum Variants | teal | enum values |
| Properties | blue | JSON keys, object properties |
| Attributes | yellow | HTML attributes, XML attrs |
| Macros | rosewater | preprocessor macros |

### Language Defaults — Dark Mode

| Syntax Element | Color | Notes |
|---|---|---|
| Keywords | teal | `import`, `const`, `return` |
| Strings | green | `'hello'`, `"world"` |
| Symbols, Atoms | red | `true`, `false`, `nil` |
| Escape Sequences, Regex | pink | `\n`, `/pattern/` |
| Comments | overlay | `// line comment` |
| Constants, Numbers | peach | `42`, `3.14`, `PI` |
| Operators | maroon | `+`, `-`, `=>` |
| Braces, Delimiters | overlay | `{`, `}`, `(`, `)` |
| Methods, Functions | lavender | `functionName()` |
| Parameters | sky | function arguments |
| Builtins | red | built-in functions |
| Classes, Types | yellow | `class`, `interface`, `type` |
| Enum Variants | teal | enum values |
| Properties | blue | JSON keys, object properties |
| Attributes | yellow | HTML attributes, XML attrs |
| Macros | rosewater | preprocessor macros |

### General Editor Elements

| Element | Color | Notes |
|---|---|---|
| Cursor | rosewater | |
| Cursor Line | text @ 10% opacity | |
| Line Numbers | overlay | |
| Active Line Number | lavender | |
| Links | blue → lavender → sky | normal → followed → hover |
| Search BG | teal | |
| Active Search BG | red | |
| Errors | red | |
| Warnings | yellow / peach | |
| Information | teal | |

### Rainbow Highlights

For bracket pair coloring, headings, etc.:

1. red → 2. peach → 3. yellow → 4. green → 5. sapphire → 6. lavender

## Semantic Mappings

| Semantic Role | Light Mode | Dark Mode |
|---|---|---|
| background.base | base (#FFF8F5) | base (#1E1028) |
| background.mantle | mantle (#FFF0EB) | mantle (#160A20) |
| background.crust | crust (#FFE8E0) | crust (#0D0612) |
| surface.surface0 | surface0 (#F0DEE8) | surface0 (#2E1E40) |
| surface.surface1 | surface1 (#E4CCD8) | surface1 (#3A2850) |
| surface.surface2 | surface2 (#D4B8C8) | surface2 (#4A3860) |
| text.primary | text (#2E1A24) | text (#F0E0F0) |
| text.subtext1 | subtext1 (#6B4F5E) | subtext1 (#C8B0D8) |
| text.subtext0 | subtext0 (#997A8A) | subtext0 (#A090B8) |
| accent.default | pink (light) / teal (dark) | Primary accent color |
| accent.hover | flamingo (light) / sky (dark) | Hover state |
| status.success | green | |
| status.warning | yellow | |
| status.error | red | |
| status.info | blue | |
| border.default | surface0 | |
| border.focused | accent | |
| border.selected | accent | |
| border.disabled | overlay | |

## Inspiration Sources

Colors were drawn from these Lospec palette images:

- **pastel-horizon** — warm pinks, peaches, soft lavenders
- **pastel-horizon-plus** — expanded warm range, creamy yellows
- **vaporsthetic** — vivid pinks, purples, peachy-golds
- **outrunner** — deep purples, teals, cyans
- **neon-pulse** — electric pinks, cyans, deep purples
- **our-wicked-sweet-star-cruiser** — muted teals, blues, purples
- **dialup-sunset** — soft roses, mauves

## Relationship to Catppuccin

The organizational structure (base → semantic → syntax → theme layers) follows Catppuccin's model. However, the color choices are distinct:

- **Pastel saturation:** Synthpunk-pastel colors are generally softer and more pastel than Catppuccin's richer tones.
- **Warm/cool duality:** The light/dark mode relationship is designed around a mood shift (warm vs. cool) rather than just an inversion.
- **Custom yellow:** The golden-amber yellow (#E8A840) is unique to this palette, chosen for readability on light backgrounds.

## Future Work

- **synthpunk-neon variant:** High-energy dark theme with electric accents. Will reuse the organizational structure but with a completely different color family.
- **ANSI colors:** Define 16 ANSI colors for terminal themes, following Catppuccin's generation formulas.
- **Additional theme targets:** Zed, VS Code, terminal, etc.

## Approval Status

- [x] Color palette chosen
- [x] Light mode neutrals defined
- [x] Dark mode neutrals defined
- [x] Syntax highlighting mappings defined
- [x] Semantic mappings defined
- [x] Design philosophy validated
- [ ] Implementation plan written
- [ ] Colors applied to theme files
