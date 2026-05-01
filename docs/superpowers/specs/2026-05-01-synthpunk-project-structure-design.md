# Synthpunk Color Scheme — Project Structure Design

## Context

Creating a general-purpose color scheme inspired by catppuccin's organizational model. The first application will be a Zed editor theme extension, with long-term goals of supporting terminal themes, code editor themes, and full UI themes.

## Structure

```
synthpunk/
├── palette/                 # Core color definitions
│   ├── base.json            # Raw color values (hex/rgb)
│   ├── semantic.json        # Semantic mappings (text, surface, accent, etc.)
│   └── syntax.json          # Syntax highlighting mappings
├── themes/
│   ├── zed/                 # First target: Zed extension
│   │   ├── light.json        # Light theme variant
│   │   └── dark.json        # Dark theme variant
│   └── README.md            # How to add new theme targets
├── assets/                  # Visual references, swatches
└── docs/                    # Usage guidelines, design decisions
```

## Palette Layer

### base.json
Raw color definitions. Each color has:
- `name`: identifier (e.g., "rosewater", "surface0")
- `hex`: hex value
- `rgb`: rgb tuple
- Optional: `hsl`, `description`

### semantic.json
Maps base colors to semantic roles:
- `background`: base, mantle, crust (hierarchy)
- `surface`: surface0, surface1, surface2 (elevation)
- `overlay`: overlay0, overlay1, overlay2 (modals, tooltips)
- `text`: text, subtext0, subtext1 (typography hierarchy)
- `accent`: primary accent colors
- `status`: success, warning, error, info
- `syntax`: semantic roles for code highlighting

### syntax.json
Language-agnostic syntax color mappings:
- `keyword`, `string`, `number`, `comment`, `function`, `variable`, etc.

## Theme Layer

Themes map semantic roles to application-specific tokens.

### Zed Theme Format
Each theme file follows Zed's ThemeFamily schema with:
- `name`: theme family name
- `author`: author info
- `themes[]`: array of theme objects containing:
  - `name`: variant name (e.g., "Synthpunk Light")
  - `appearance`: "light" or "dark"
  - `style`: object mapping Zed tokens to colors

## Build Process

Palette JSON files are source of truth. Theme files are generated (or manually maintained) by mapping semantic roles to application tokens.

## Status

- [x] Structure approved
- [ ] Color scheme design (followup)
- [ ] Zed extension implementation
- [ ] Additional theme targets