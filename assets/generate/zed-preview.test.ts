import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import path from "node:path";
import { parseZedTheme, zedPreviewHtml, zedThemeRegistration } from "./zed-preview";

const ROOT = path.resolve(import.meta.dir, "../..");
const source = readFileSync(path.join(ROOT, "themes/zed/themes/synthpunk-neon.json"), "utf8");
const style = parseZedTheme(source, "Synthpunk Neon Dark");

describe("Zed interface preview", () => {
	test("loads the requested variant and derives a Shiki theme from Zed syntax colors", () => {
		const theme = zedThemeRegistration(style);

		expect(theme.name).toBe("Synthpunk Zed Neon Dark");
		expect(theme.colors?.["editor.background"]).toBe("#0F0620");
		expect(theme.tokenColors).toContainEqual({
			name: "Comment",
			scope: ["comment", "comment.block", "comment.line"],
			settings: { foreground: "#6D4D99", fontStyle: "italic" },
		});
		expect(theme.tokenColors).toContainEqual({
			name: "Keyword",
			scope: ["keyword", "storage.modifier"],
			settings: { foreground: "#00E8F0", fontStyle: "" },
		});
	});

	test("renders recognizable Zed chrome with target UI colors", () => {
		const html = zedPreviewHtml(style, '<pre class="shiki"><code>themed code</code></pre>');

		expect(html).toContain("Zed");
		expect(html).toContain("lib.rs");
		expect(html).toContain("Project");
		expect(html).toContain("Rust");
		expect(html).toContain("themed code");
		expect(html).toContain("--editor-bg:#0F0620");
		expect(html).toContain("--panel-bg:#0A0418");
		expect(html).toContain("--status-bg:#0F0620");
		expect(html).toContain("--line-number:#6D4D99");
		expect(html).toContain("--active-line:#1A0D2Ebf");
	});
});
