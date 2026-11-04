import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import path from "node:path";
import { PREVIEW_JOBS } from "../assets/generate/preview-manifest";

const ROOT = path.resolve(import.meta.dir, "..");
const readme = readFileSync(path.join(ROOT, "README.md"), "utf8");

describe("README image generation", () => {
	test("provides one root command that builds themes and regenerates assets", () => {
		const packageJson = JSON.parse(
			readFileSync(path.join(ROOT, "package.json"), "utf8"),
		);
		expect(packageJson.scripts.assets).toBe(
			"bun run build && bun install --cwd assets/generate --frozen-lockfile && bun run assets/generate/generate.ts",
		);
	});

	test("links every language preview in every variant and drops Markdown", () => {
		for (const { out, variant, language } of PREVIEW_JOBS) {
			const asset = `assets/${out}`;
			expect(readme).toContain(`href="${asset}"`);
			expect(readme).toContain(`src="${asset}"`);
			expect(readme).toContain(
				`alt="Synthpunk ${variant.label} — ${language.label}"`,
			);
		}
		expect(readme).not.toContain("assets/sample-markdown.png");
		expect(readme).not.toContain(
			"Syntax highlighting in the **Neon Dark** variant",
		);
	});

	test("labels all five synthetic tool previews as generated interfaces", () => {
		expect(readme).toContain("Generated interface previews in **Neon Dark**");
		for (const tool of ["VS Code", "Zed", "Neovim", "WezTerm", "Starship"]) {
			const key = tool.toLowerCase().replace(" ", "");
			expect(readme).toContain(`src="assets/tool-${key}.png"`);
			expect(readme).toContain(
				`alt="Synthpunk Neon Dark — generated ${tool} interface preview"`,
			);
		}
		expect(readme).toContain("generated theme colors for each supported tool");
	});
});
