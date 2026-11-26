# Vendored: makeColors

`make-colors.js` and `make-colors.d.ts` come unchanged from the
`plugin-authoring` skill bundled with Claude Code 2.1.331. That skill tells mod
authors to copy them into a mod and leave them as they are. Don't edit them.

The Claude target (`generator/targets/claude.ts`) calls `makeColors` at build
time, so the generated mod under `themes/claude/` ships only the resolved
palette, never this code.

The design system's token names change between Claude Code builds. When a new
build ships, copy both files again from that build's skill folder, run
`bun run build` and `bun test`, and update the version above.

`claude-code-shim.d.ts` declares the one type `make-colors.d.ts` imports from
the engine-only `claude-code` module, as an ambient module declaration.
