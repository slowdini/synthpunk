# Linting, Formatting, and Typechecking Setup

## Architecture & Tools
- **Task Runner:** `bun` (will initialize a root `package.json`).
- **Linter/Formatter:** Biome (`@biomejs/biome`) to handle JavaScript, TypeScript, JSON, etc.
- **Typechecker:** TypeScript (`typescript`) running purely for checks (`tsc --noEmit`).
- **Git Hooks:** Husky (`husky`) for managing `pre-commit` hooks.
- **Staged Files:** `lint-staged` to run Biome only on modified files during commits.
- **Excluded:** Lua and TOML files will not be formatted automatically to avoid heavy single-purpose dependencies.

## Configuration & Data Flow
1. **`package.json` Scripts:** 
   - `check`: Runs Biome over the whole project and executes `tsc --noEmit`.
   - `format`: Runs Biome apply over the whole project.
   - `prepare`: Sets up Husky (runs automatically after `bun install`).
2. **`lint-staged` Configuration (in package.json):**
   - Targets `*.{js,ts,jsx,tsx,json}` (and other Biome-supported files).
   - Command: `biome check --write --no-errors-on-unmatched` (automatically resolves to the project's Biome).
3. **Husky Hook (`.husky/pre-commit`):**
   - Executes `bunx lint-staged`.
4. **TypeScript Config (`tsconfig.json`):**
   - A basic configuration at the root to enable `tsc` to discover and check files.
5. **Biome Config (`biome.json`):**
   - Default Biome configuration initialized via `biome init`.
