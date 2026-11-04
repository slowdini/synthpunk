import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import path from "node:path";
import { parseStarshipPalette, starshipPreviewHtml } from "./starship-preview";

const ROOT = path.resolve(import.meta.dir, "../..");
const source = readFileSync(path.join(ROOT, "themes/starship/starship.toml"), "utf8");
const palette = parseStarshipPalette(source, "synthpunk_neon_dark");

describe("Starship interface preview", () => {
	test("loads the requested generated prompt palette", () => {
		expect(palette.red).toBe("#FF3A50");
		expect(palette.peach).toBe("#FF8040");
		expect(palette.ink).toBe("#060210");
		expect(palette.base).toBe("#0F0620");
	});

	test("renders the operating system, directory, Git, runtime, and time segments", () => {
		const html = starshipPreviewHtml(palette);

		expect(html).toContain("Starship");
		expect(html).toContain("synthpunk");
		expect(html).toContain("main");
		expect(html).toContain("bun");
		expect(html).toContain("14:32");
		expect(html).toContain("bun test");
		expect(html).toContain("target and preview checks passed");
		expect(html).not.toContain("732 assertions");
		expect(html).toContain("--terminal-bg:#0F0620");
		expect(html).toContain("--segment-red:#FF3A50");
		expect(html).toContain("--segment-peach:#FF8040");
		expect(html).toContain("--segment-lavender:#D040FF");
		expect(html).toContain("--segment-ink:#060210");
	});
});
