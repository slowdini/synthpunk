import { describe, expect, test } from "bun:test";
import { createHighlighter } from "shiki";
import { targetShikiTheme } from "./shiki-theme";

describe("target Shiki themes", () => {
	test("applies target token colors to real syntax highlighting", async () => {
		const theme = targetShikiTheme("Target Test", "#0F0620", "#E8E0F0", {
			comment: "#6D4D99",
			keyword: "#00E8F0",
			string: "#40FF80",
			number: "#FF8040",
			boolean: "#FF8040",
			constant: "#FF8040",
			operator: "#C04078",
			function: "#D040FF",
			type: "#00E8F0",
			variable: "#E8E0F0",
			property: "#00E8F0",
			namespace: "#FF5CA8",
			attribute: "#FFE040",
			tag: "#40FF80",
		});
		const highlighter = await createHighlighter({ themes: [theme], langs: ["rust"] });

		const html = highlighter.codeToHtml("/// comment\npub struct Palette {}", {
			lang: "rust",
			theme: theme.name,
		});

		expect(html).toContain('style="color:#6D4D99;font-style:italic">/// comment</span>');
		expect(html).toContain('style="color:#00E8F0">pub</span>');
		expect(html).toContain('style="color:#00E8F0"> struct</span>');
	});
});
