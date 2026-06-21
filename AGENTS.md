# AGENTS.md

## Project structure

Synthpunk is a synthwave-inspired color scheme that ships as themes for multiple tools. All theme artifacts are generated from a single palette source.

- `palette/` — source-of-truth color palette data (the only place to edit colors)
- `generator/` — TypeScript theme-generation engine (run via `bun run build`)
- `themes/` — generated artifacts, one subdirectory per target:
  - `vscode/` — VS Code extension package
  - `zed/` — Zed extension package
  - `neovim/` — Neovim colorscheme (Lua)
  - `wezterm/` — WezTerm color scheme files (TOML)
  - `starship/` — Starship prompt config (TOML)
- `scripts/` — release tooling (version bumping)
- `tests/` — cross-target tests (version lockstep)
- `assets/` — preview images for the README
- `schemas/` — JSON schemas for palette files

## Commands

```sh
bun install          # install dependencies
bun run build        # regenerate all theme artifacts from palette/
bun test             # run all tests
bun run check        # biome lint/format + tsc typecheck
bun run format       # auto-format with biome
```

## Key rules

- **Never edit `themes/**` directly.** These files are generated. Edit `palette/` and `generator/`, then run `bun run build`. CI enforces that committed artifacts match generator output.
- **Version lockstep.** The version in `package.json`, `themes/vscode/package.json`, and `themes/zed/extension.toml` must always match. Use `bun scripts/bump-version.ts <version>` to bump all at once. The lockstep is enforced by `tests/lockstep.test.ts`.

## Commit conventions

Use Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`.

## Release process

See [`RELEASE.md`](RELEASE.md) for the full release operations guide. The short version:

1. Feature PRs merge into `dev` after CI passes.
2. Trigger the "Release PR" workflow with the next version — it bumps manifests and opens a `dev → main` PR.
3. Merge the release PR into `main` — this auto-tags, creates the GitHub release, and publishes to all configured channels.
4. Merge `main` back into `dev`.
