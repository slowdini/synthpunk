# Linting and Formatting Setup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Set up Bun as the root task runner, Husky for Git hooks, Biome for linting/formatting, and TypeScript for typechecking.

**Architecture:** A root `package.json` coordinates tasks. Husky intercepts commits to run `lint-staged`, which executes Biome only on modified files to keep commits fast. A full `check` script validates the entire project.

**Tech Stack:** Bun, Husky, Biome, TypeScript, lint-staged.

---

### Task 1: Initialize Root Project & Biome

**Files:**
- Create: `package.json`
- Create: `biome.json`

- [ ] **Step 1: Initialize package.json**

```bash
bun init -y
```

- [ ] **Step 2: Install Biome**

```bash
bun add --dev --exact @biomejs/biome
```

- [ ] **Step 3: Initialize Biome config**

```bash
bunx biome init
```

- [ ] **Step 4: Update package.json scripts for formatting**

Edit `package.json` to add the `format` script. Note: since `bun init` creates a default `package.json`, you will need to parse/edit it or use `npm pkg set`.

```bash
npm pkg set scripts.format="biome check --write"
```

- [ ] **Step 5: Verify Biome works**

```bash
bun run format
```
Expected: PASS (Biome should format default files or report no issues).

- [ ] **Step 6: Commit**

```bash
git add package.json bun.lockb biome.json
git commit -m "chore: init root project and biome"
```

---

### Task 2: Configure TypeScript Typechecking

**Files:**
- Create: `tsconfig.json`
- Modify: `package.json`

- [ ] **Step 1: Install TypeScript**

```bash
bun add --dev typescript
```

- [ ] **Step 2: Create root tsconfig.json**

Create `tsconfig.json` with the following content:

```json
{
  "compilerOptions": {
    "target": "es2022",
    "module": "esnext",
    "moduleResolution": "bundler",
    "strict": true,
    "skipLibCheck": true,
    "noEmit": true,
    "allowJs": true,
    "resolveJsonModule": true,
    "isolatedModules": true
  },
  "include": ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Update check script in package.json**

```bash
npm pkg set scripts.check="biome check && tsc --noEmit"
```

- [ ] **Step 4: Verify typecheck runs**

```bash
bun run check
```
Expected: PASS (or specific type errors if existing code has issues).

- [ ] **Step 5: Commit**

```bash
git add package.json bun.lockb tsconfig.json
git commit -m "chore: setup typescript for typechecking"
```

---

### Task 3: Setup Husky and Lint-Staged

**Files:**
- Modify: `package.json`
- Create: `.husky/pre-commit`

- [ ] **Step 1: Install Husky and lint-staged**

```bash
bun add --dev husky lint-staged
```

- [ ] **Step 2: Initialize Husky**

```bash
bunx husky init
```
This automatically updates `package.json` with a `prepare` script and creates the `.husky/` directory.

- [ ] **Step 3: Configure lint-staged in package.json**

Edit `package.json` manually or run:

```bash
npm pkg set "lint-staged.*.{js,ts,jsx,tsx,json}"="biome check --write --no-errors-on-unmatched"
```

- [ ] **Step 4: Configure pre-commit hook**

Overwrite the content of `.husky/pre-commit`:

```bash
echo 'bunx lint-staged' > .husky/pre-commit
```

- [ ] **Step 5: Verify hook setup**

```bash
git add package.json bun.lockb .husky/pre-commit
git commit -m "chore: setup husky and lint-staged"
```
Expected: The pre-commit hook should run lint-staged, and the commit should succeed.
