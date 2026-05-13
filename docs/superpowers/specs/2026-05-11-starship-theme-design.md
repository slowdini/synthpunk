# Starship Theme Target Design

## Overview

Add Starship as a new theme target for the Synthpunk color scheme generator. Produces a single TOML file containing all 4 variant palettes and powerline-style prompt module configurations, modeled after the catppuccin-powerline preset.

## Motivation

Starship is a popular cross-shell prompt customizer. The catppuccin project already provides a well-regarded starship preset that uses Starship's native palette system to let users switch between color variants with a single `palette = '...'` line. By generating a similar file from our palette system, we get automatic sync with the project's color definitions and support for all 4 synthpunk variants.

## Approach

**Approach 1: Generator target**

Add `starship` as a generator target alongside vscode/zed/wezterm. The generator reads all 4 palettes and produces a single `themes/starship/starship.toml` with:
- A format string defining the powerline layout
- Module configs with bg/fg references to palette color names
- Four `[palettes.*]` sections with resolved hex values

Module layout/color assignments are defined in the generator code — no separate mapping file needed since they're visual layout decisions, not reusable mappings.

## Output File

**Path:** `themes/starship/starship.toml`

A single TOML file containing:
- `$schema` header
- `format` string defining the powerline layout
- `palette = 'synthpunk_pastel_dark'` (default)
- Module configs (os, username, directory, git_branch, git_status, language modules, conda, docker_context, time, line_break, character, cmd_duration)
- Four `[palettes.*]` sections with all hex values

Users install by copying the file to `~/.config/starship.toml` (or importing it) and switch variants by changing the `palette` line.

## Format String & Powerline Layout

```
[▌](red)\
$os\
$username\
[](bg:peach fg:red)\
$directory\
[](bg:yellow fg:peach)\
$git_branch\
$git_status\
[](fg:yellow bg:green)\
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
[](fg:green bg:sapphire)\
$conda\
$docker_context\
[](fg:sapphire bg:lavender)\
$time\
[▐](fg:lavender)\
$cmd_duration\
$line_break\
$character
```

Segments flow: os+username → directory → git → languages → conda/docker → time, with powerline transition characters between each.

## Module Configurations

| Module | `bg` | `fg` | Notes |
|--------|------|------|-------|
| `os` | `red` | `crust` | Disabled by default, enabled with Nerd Font symbols |
| `username` | `red` | `crust` | `show_always = true` |
| `directory` | `peach` | `crust` | `truncation_length = 3`, substitutions for Documents/Downloads/Music/Pictures/Developer |
| `git_branch` | `yellow` | `crust` | Symbol =  |
| `git_status` | `yellow` | `crust` | Shares segment with git_branch |
| `c`, `rust`, `golang`, `nodejs`, `bun`, `php`, `java`, `kotlin`, `haskell`, `python` | `green` | `crust` | All language modules on green |
| `conda` | `sapphire` | `crust` | `ignore_base = false` |
| `docker_context` | `sapphire` | `crust` | |
| `time` | `lavender` | `crust` | `disabled = false`, `time_format = "%R"` |
| `line_break` | — | — | `disabled = true` |
| `character` success | — | `green` (bold) | |
| `character` error | — | `red` (bold) | |
| `character` vimcmd | — | `green` (bold) | |
| `character` vimcmd_replace_one | — | `lavender` (bold) | |
| `character` vimcmd_replace | — | `lavender` (bold) | |
| `character` vimcmd_visual | — | `yellow` (bold) | |
| `cmd_duration` | — | `style = "bg:lavender"` | `show_milliseconds = true`, `min_time_to_notify = 45000` |

### OS Symbols

The same Nerd Font symbol map as catppuccin-powerline:

```
Windows = "", Ubuntu = "󰕈", SUSE = "", Raspbian = "󰐿",
Mint = "󰣭", Macos = "󰀵", Manjaro = "", Linux = "󰌽",
Gentoo = "󰣨", Fedora = "󰣛", Alpine = "", Amazon = "",
Android = "", AOSC = "", Arch = "󰣇", Artix = "󰣇",
CentOS = "", Debian = "󰣚", Redhat = "󱄛", RedHatEnterprise = "󱄛"
```

### Directory Substitutions

```
"Documents" = "󰈙 ", "Downloads" = " ", "Music" = "󰝚 ",
"Pictures" = " ", "Developer" = "󰲋 "
```

## Palette Sections

Four palette sections, each containing all 26 color names with their hex values:

- `[palettes.synthpunk_pastel_dark]` — values from `palette/dark.json`
- `[palettes.synthpunk_pastel_light]` — values from `palette/base.json`
- `[palettes.synthpunk_neon_dark]` — values from `palette/neon-dark.json`
- `[palettes.synthpunk_neon_light]` — values from `palette/neon-light.json`

Color names (23 total): rosewater, flamingo, pink, maroon, red, peach, yellow, green, teal, sky, sapphire, blue, lavender, text, subtext1, subtext0, overlay, surface2, surface1, surface0, base, mantle, crust.

Note: The catppuccin preset includes `overlay2` and `overlay1` which are not in the synthpunk palette. The synthpunk palette has a single `overlay` color. The generator will only include colors that exist in the palette.

## New Files

### `generator/src/targets/starship.ts`

Starship TOML generator. Main exports:

```ts
function generateStarshipToml(
  palettes: Record<VariantName, Palette>,
): string
```

Produces the complete TOML file content as a string. Uses a manual string builder (same pattern as wezterm.ts) since the structure is flat.

### `generator/src/targets/starship.test.ts`

Unit tests verifying:
- All 4 palette sections are present with correct hex values
- Format string contains expected powerline segments
- Module configs reference correct palette color names
- Output is valid TOML (parseable structure)
- Default palette is `synthpunk_pastel_dark`
- Palette color count matches palette definition (23 colors)

### `themes/starship/` (output directory)

Generated output:
- `starship.toml`

### `themes/starship/README.md`

Installation instructions for users.

## Modified Files

### `generator/src/index.ts`

Add Starship generation block. Load all 4 palettes, call `generateStarshipToml()`, write to `themes/starship/starship.toml`.

## Implementation Notes

- The generator hardcodes the format string and module configs rather than using a mapping file, because these are visual layout decisions specific to starship's powerline style
- Palette hex values are resolved at generation time — the TOML contains literal hex colors, not references to palette names (except in `bg:`/`fg:` style strings which use Starship's palette reference syntax)
- The `overlay` field in synthpunk maps to two catppuccin colors (`overlay2` maps to `overlay`, `overlay1` maps to `overlay`) — but since we're generating our own palette with our own names, we simply include what we have

## Installation Instructions (for users)

Users install by:
1. Copying `starship.toml` to `~/.config/starship.toml` (replacing or merging with existing config)
2. To switch variants, change the `palette` line to one of: `synthpunk_pastel_dark`, `synthpunk_pastel_light`, `synthpunk_neon_dark`, `synthpunk_neon_light`

A README in `themes/starship/` will include these instructions.