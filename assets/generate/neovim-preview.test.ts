import { describe, expect, test } from "bun:test";
import path from "node:path";
import { loadPalette } from "../../generator/palette";
import { loadFontStyles, loadScopes, loadSyntaxMapping } from "../../generator/syntaxMapping";
import { generateNeovimPalette } from "../../generator/targets/neovim";
import { loadUIMapping } from "../../generator/uiMapping";
import { neovimPreviewHtml, neovimThemeRegistration } from "./neovim-preview";

const PALETTE_DIR = path.resolve(import.meta.dir, "../../palette");
const theme = generateNeovimPalette(
	"neon-dark",
	loadPalette(PALETTE_DIR, "neon-dark"),
	loadUIMapping(PALETTE_DIR),
	loadSyntaxMapping(PALETTE_DIR),
	loadScopes(PALETTE_DIR),
	loadFontStyles(PALETTE_DIR),
);

describe("Neovim interface preview", () => {
	test("derives a Shiki theme from Neovim highlight groups", () => {
		const registration = neovimThemeRegistration(theme);

		expect(registration.name).toBe("Synthpunk Neovim Neon Dark");
		expect(registration.colors?.["editor.background"]).toBe(theme.ui.Normal.bg);
		expect(registration.tokenColors).toContainEqual({
			name: "Comment",
			scope: ["comment", "comment.block", "comment.line"],
			settings: { foreground: theme.syntaxClassic.Comment.fg, fontStyle: "italic" },
		});
		expect(registration.tokenColors).toContainEqual({
			name: "Function",
			scope: ["entity.name.function", "support.function"],
			settings: { foreground: theme.syntaxClassic.Function.fg, fontStyle: "" },
		});
		expect(registration.tokenColors).toContainEqual({
			name: "Property",
			scope: ["variable.other.property", "entity.name.variable.member", "meta.property"],
			settings: { foreground: theme.syntaxTreesitter["@variable.other.property"].fg, fontStyle: "" },
		});
		expect(registration.tokenColors).toContainEqual({
			name: "Namespace",
			scope: ["entity.name.namespace", "entity.name.module"],
			settings: { foreground: theme.syntaxTreesitter["@entity.name.namespace"].fg, fontStyle: "" },
		});
		expect(registration.tokenColors).toContainEqual({
			name: "Attribute",
			scope: ["entity.other.attribute", "entity.other.attribute-name", "meta.attribute", "decorator"],
			settings: { foreground: theme.syntaxTreesitter["@entity.other.attribute"].fg, fontStyle: "" },
		});
	});

	test("renders a terminal-hosted buffer with Neovim tabline, statusline, and command line", () => {
		const html = neovimPreviewHtml(theme, '<pre class="shiki"><code>themed code</code></pre>');

		expect(html).toContain("Neovim");
		expect(html).toContain("NORMAL");
		expect(html).toContain("lib.rs");
		expect(html).toContain("synthpunk-neon-dark");
		expect(html).toContain("themed code");
		expect(html).toContain(`--normal-bg:${theme.ui.Normal.bg}`);
		expect(html).toContain(`--status-bg:${theme.ui.StatusLine.bg}`);
		expect(html).toContain(`--line-number:${theme.ui.LineNr.fg}`);
		expect(html).toContain(`--cursor-line:${theme.ui.CursorLine.bg}`);
		expect(html).toContain(".neovim-status .push { margin-left: auto; margin-right: 18px; }");
	});
});
