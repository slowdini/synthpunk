# Synthpunk-Neon Color Scheme Design

## Context

This document defines the color palette for the **synthpunk-neon** variant of the Synthpunk color scheme. Synthpunk-neon is the second of two planned variants (alongside synthpunk-pastel), designed around the aesthetic of high-energy vaporwave neon — electric pinks, hot cyans, and vivid purples on deep backgrounds, with an experimental holographic light mode.

### Design Philosophy

All colors are chosen to satisfy these principles:

- **Colorful is better than colorless:** 13 distinct accent colors provide rich differentiation for syntax highlighting and UI elements.
- **There should be balance:** Not too dull, not too bright. Dark mode colors are electric but not blinding; light mode colors are vivid but readable.
- **Harmony is superior to dissonance:** Dark mode colors share a unified neon saturation level. Light mode colors share an iridescent, pearlescent quality.
- **Divergent palettes are okay:** Light and dark modes use different accent palettes because their aesthetics (holographic vs vaporwave neon) are fundamentally different. A small shared core ensures consistency for status/error states.

## Variant Strategy

Synthpunk has two variants: **synthpunk-pastel** and **synthpunk-neon**.

- **synthpunk-pastel** (completed): Soft, dreamy, warm/cool duality. Light mode is warm and sun-washed; dark mode is cool and nocturnal.
- **synthpunk-neon** (this design): High-energy, electric, cyberpunk. Dark mode is bold vaporwave neon; light mode is experimental holographic iridescence.

Each variant has **both a light and dark mode**. Unlike the pastel variant, synthpunk-neon uses **divergent accent palettes** for light and dark modes because the aesthetic goals are distinct. A shared core of 4 status colors ensures consistency where it matters.

## Dark Mode — Vaporwave Neon

### Mood

Dark mode evokes a midnight vaporwave skyline — hot pinks, electric cyans, and vivid purples glowing against a deep purple-black void. The energy is high, the contrast is bold, and every accent color feels like a neon tube humming in the dark.

### Dark Mode Accent Palette (13 Colors)

| Color Name | Hex | RGB | Description |
|---|---|---|---|
| rosewater | #FFB8E0 | [255, 184, 224] | Soft neon pink for delicate accents |
| flamingo | #FF5CA8 | [255, 92, 168] | Hot pink for lively highlights |
| pink | #FF2A8A | [255, 42, 138] | Electric magenta for strings, escape sequences |
| maroon | #C04078 | [192, 64, 120] | Deep magenta for parameters, operators |
| red | #FF3A50 | [255, 58, 80] | Neon red for errors, critical |
| peach | #FF8040 | [255, 128, 64] | Electric orange for types, constants |
| yellow | #FFE040 | [255, 224, 64] | Neon yellow-gold for attributes, classes |
| green | #40FF80 | [64, 255, 128] | Neon mint for success, strings |
| teal | #00E8F0 | [0, 232, 240] | Electric cyan for keywords, info |
| sky | #40B0FF | [64, 176, 255] | Bright neon blue for methods, variables |
| sapphire | #6080FF | [96, 128, 255] | Electric periwinkle for built-ins, types |
| blue | #A060FF | [160, 96, 255] | Electric purple for functions, links |
| lavender | #D040FF | [208, 64, 255] | Vivid neon purple for functions, highlights |

### Dark Mode Neutral Colors (Cool-Tinted)

| Name | Hex | RGB | Description |
|---|---|---|---|
| text | #E8E0F0 | [232, 224, 240] | Primary text — soft lavender-white |
| subtext1 | #B8A8D0 | [184, 168, 208] | Secondary text |
| subtext0 | #8878A0 | [136, 120, 160] | Tertiary text, placeholders |
| overlay | #503870 | [80, 56, 112] | Overlays, disabled states, comments |
| surface2 | #301E50 | [48, 30, 80] | Highest surface elevation |
| surface1 | #251540 | [37, 21, 64] | Mid surface elevation |
| surface0 | #1A0D2E | [26, 13, 46] | Lowest surface elevation |
| base | #0F0620 | [15, 6, 32] | Primary background — deep purple-black |
| mantle | #0A0418 | [10, 4, 24] | Slightly darker than base |
| crust | #060210 | [6, 2, 16] | Darkest background depth |

### Dark Mode Design Rationale

- **Neutrals are cool-tinted** (purple undertones) to let the neon accents pop. The deep purple-black base (#0F0620) provides depth without the harshness of pure black.
- **Accent colors are highly saturated and bright** — they must glow against the dark background. Each color was chosen for maximum perceived brightness at its hue.
- **The warm half** (rosewater through yellow) provides pinks, oranges, and golds. **The cool half** (green through lavender) provides cyans, blues, and purples.

## Light Mode — Holographic

### Mood

Light mode evokes light refracting through a prism — pearlescent whites, opalescent pinks, shifting teals and purples on a pale, iridescent background. The energy is ethereal and experimental, like staring at a hologram in daylight.

### Light Mode Accent Palette (13 Colors)

| Color Name | Hex | RGB | Description |
|---|---|---|---|
| rosewater | #E8A0C0 | [232, 160, 192] | Pearlescent pink for delicate accents |
| flamingo | #E06098 | [224, 96, 152] | Holographic pink for lively highlights |
| pink | #D04080 | [208, 64, 128] | Prism magenta for strings, escape sequences |
| maroon | #B04068 | [176, 64, 104] | Deep rose for parameters, operators |
| red | #E04058 | [224, 64, 88] | Coral-red for errors, critical |
| peach | #E88050 | [232, 128, 80] | Opalescent orange for types, constants |
| yellow | #D8B030 | [216, 176, 48] | Golden iridescence for attributes, classes |
| green | #40C080 | [64, 192, 128] | Iridescent mint for success, strings |
| teal | #30C0C8 | [48, 192, 200] | Opalescent cyan for keywords, info |
| sky | #4098D8 | [64, 152, 216] | Prismatic blue for methods, variables |
| sapphire | #6070C8 | [96, 112, 200] | Iridescent periwinkle for built-ins, types |
| blue | #8050C8 | [128, 80, 200] | Prismatic purple for functions, links |
| lavender | #B050D0 | [176, 80, 208] | Opalescent violet for functions, highlights |

### Light Mode Neutral Colors (Pearlescent)

| Name | Hex | RGB | Description |
|---|---|---|---|
| text | #2A1A30 | [42, 26, 48] | Primary text — deep purple-brown |
| subtext1 | #6B5A78 | [107, 90, 120] | Secondary text |
| subtext0 | #A898B0 | [168, 152, 176] | Tertiary text, placeholders |
| overlay | #C0A8C8 | [192, 168, 200] | Overlays, disabled states, comments |
| surface2 | #E0C8E8 | [224, 200, 232] | Highest surface elevation |
| surface1 | #E8D8F0 | [232, 216, 240] | Mid surface elevation |
| surface0 | #F0E8F5 | [240, 232, 245] | Lowest surface elevation |
| base | #FAF6FA | [250, 246, 250] | Primary background — pearlescent white |
| mantle | #F5F0F5 | [245, 240, 245] | Slightly darker than base |
| crust | #F0E8F0 | [240, 232, 240] | Darkest background depth |

### Light Mode Design Rationale

- **Neutrals are pearlescent** — the background has a subtle lavender/pink undertone to create an iridescent, holographic feel rather than a plain white.
- **Accent colors are vivid but slightly muted** compared to dark mode — they must be readable on a light background without being overwhelming.
- **The palette evokes light refraction** — colors are chosen to suggest the spectrum you'd see through a prism, with pink → purple → blue → cyan → green → yellow → orange as a natural progression.
- **base (#FAF6FA)** is a very pale pearlescent white — warm enough to feel holographic, light enough for readability.

## Shared Core Colors

These 4 colors are consistent across both light and dark modes to ensure status/error states are instantly recognizable when switching:

| Role | Dark Mode | Light Mode | Purpose |
|---|---|---|---|
| status.error | red (#FF3A50) | red (#E04058) | Errors, critical diagnostics |
| status.warning | yellow (#FFE040) | yellow (#D8B030) | Warnings, cautions |
| status.success | green (#40FF80) | green (#40C080) | Success, confirmations |
| status.info | sky (#40B0FF) | sky (#4098D8) | Information, hints |

## Syntax Highlighting Mappings

Syntax highlighting colors vary between light and dark modes, drawing from each mode's distinct accent palette. The roles are the same; only the color values change.

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
| Parameters | pink | function arguments |
| Builtins | red | built-in functions |
| Classes, Types | peach | `class`, `interface`, `type` |
| Enum Variants | teal | enum values |
| Properties | blue | JSON keys, object properties |
| Attributes | yellow | HTML attributes, XML attrs |
| Macros | rosewater | preprocessor macros |

### Language Defaults — Light Mode

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
| Parameters | pink | function arguments |
| Builtins | red | built-in functions |
| Classes, Types | peach | `class`, `interface`, `type` |
| Enum Variants | teal | enum values |
| Properties | blue | JSON keys, object properties |
| Attributes | yellow | HTML attributes, XML attrs |
| Macros | rosewater | preprocessor macros |

### General Editor Elements

| Element | Dark Mode | Light Mode | Notes |
|---|---|---|---|
| Cursor | rosewater | rosewater | |
| Cursor Line | text @ 10% | text @ 10% | |
| Line Numbers | overlay | overlay | |
| Active Line Number | lavender | lavender | |
| Links | sky → lavender → teal | sky → lavender → teal | normal → followed → hover |
| Search BG | teal | teal | |
| Active Search BG | red | red | |
| Errors | red | red | |
| Warnings | yellow | yellow | |
| Information | blue | blue | |

### Rainbow Highlights

For bracket pair coloring, headings, etc.:

1. red → 2. peach → 3. yellow → 4. green → 5. sapphire → 6. lavender

## Semantic Mappings

| Semantic Role | Dark Mode | Light Mode |
|---|---|---|
| background.base | base (#0F0620) | base (#FAF6FA) |
| background.mantle | mantle (#0A0418) | mantle (#F5F0F5) |
| background.crust | crust (#060210) | crust (#F0E8F0) |
| surface.surface0 | surface0 (#1A0D2E) | surface0 (#F0E8F5) |
| surface.surface1 | surface1 (#251540) | surface1 (#E8D8F0) |
| surface.surface2 | surface2 (#301E50) | surface2 (#E0C8E8) |
| text.primary | text (#E8E0F0) | text (#2A1A30) |
| text.subtext1 | subtext1 (#B8A8D0) | subtext1 (#6B5A78) |
| text.subtext0 | subtext0 (#8878A0) | subtext0 (#A898B0) |
| accent.default | teal | teal |
| accent.hover | lavender | lavender |
| status.success | green | green |
| status.warning | yellow | yellow |
| status.error | red | red |
| status.info | blue | blue |
| border.default | surface0 | surface0 |
| border.focused | lavender | lavender |
| border.selected | pink | pink |
| border.disabled | overlay | overlay |

## Advanced Features

### Gradient Effects (Where Supported)

In editors that support CSS gradients or advanced theming (VS Code, potentially Zed), the holographic light mode can use subtle gradient effects:

- **Selection background:** A soft linear gradient from teal → lavender
- **Active line highlight:** A very subtle iridescent shimmer
- **Status bar / title bar:** A faint pearlescent gradient
- **Search match background:** A soft glow effect around matches

In editors with only solid color support, the evocative static palette alone conveys the holographic aesthetic.

## Inspiration Sources

Colors were drawn from these Lospec palette images:

- **neon-pulse** — electric pinks, cyans, deep purples
- **outrunner** — deep purples, teals, cyans
- **vaporsthetic** — vivid pinks, purples, peachy-golds
- **our-wicked-sweet-star-cruiser** — muted teals, blues, purples

## Relationship to Synthpunk-Pastel

The organizational structure (base → semantic → syntax → theme layers) follows the same model as synthpunk-pastel. However, the color choices are distinct:

- **Neon saturation:** Synthpunk-neon colors are highly saturated and bright, designed to glow on dark backgrounds.
- **Divergent palettes:** Light and dark modes use completely different accent palettes, unlike pastel's unified palette.
- **Experimental light mode:** The holographic light mode is a deliberate aesthetic departure from conventional light themes.

## Future Work

- **ANSI colors:** Define 16 ANSI colors for terminal themes for both dark and light modes.
- **Zed theme implementation:** Create synthpunk-neon.json with both dark and light variants.
- **VS Code theme:** Port the color scheme to VS Code, leveraging gradient effects where supported.
- **Additional theme targets:** Terminal, Neovim, etc.

## Approval Status

- [x] Color palette chosen (dark mode)
- [x] Color palette chosen (light mode)
- [x] Light mode neutrals defined
- [x] Dark mode neutrals defined
- [x] Syntax highlighting mappings defined
- [x] Semantic mappings defined
- [x] Shared core colors defined
- [x] Design philosophy validated
- [ ] Implementation plan written
- [ ] Colors applied to theme files
