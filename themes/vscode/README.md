# Synthpunk — VSCode Theme Extension

High-energy synthwave-inspired color themes for VSCode.

## Theme Families

### Synthpunk Pastel

- **Synthpunk Pastel Dark** — Deep purple synthwave aesthetic
- **Synthpunk Pastel Light** — Warm peachy/pink light variant

### Synthpunk Neon

- **Synthpunk Neon Dark** — Electric vaporwave neon on deep purple-black
- **Synthpunk Neon Light** — Experimental holographic iridescence

## Local Development

To test this extension locally in VSCode:

1. Copy or symlink this directory to `~/.vscode/extensions/synthpunk-0.1.0`
2. Restart VSCode
3. Select your preferred theme from the Command Palette: `Preferences: Color Theme`

## Theme Generation

Themes are generated from palette source files. Do not edit theme files directly — run:

```bash
cd generator && bun run src/index.ts
```