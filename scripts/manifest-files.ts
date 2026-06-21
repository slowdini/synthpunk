// Single source of truth for the manifests kept in version lockstep.
// Consumed by scripts/bump-version.ts (to rewrite each version) and by
// tests/lockstep.test.ts (to assert each matches package.json).
// Paths are relative to the repository root.
export const VERSION_LOCKED_MANIFESTS = [
	"package.json",
	"themes/vscode/package.json",
	"themes/zed/extension.toml",
] as const;
