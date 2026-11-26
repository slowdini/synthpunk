import { describe, expect, test } from "bun:test";
import path from "node:path";
import { claudeMappingColorNames, loadClaudeMapping } from "./claudeMapping";
import { loadPalette } from "./palette";
import { VARIANTS } from "./types";

const PROJECT_DIR = path.resolve(import.meta.dir, "../");
const PALETTE_DIR = path.join(PROJECT_DIR, "palette");

describe("loadClaudeMapping", () => {
	test("loads claude-mapping.json", () => {
		const mapping = loadClaudeMapping(PALETTE_DIR);
		expect(mapping.info.name).toBe("synthpunk-claude");
		expect(mapping.desktop.roles.accent).toBe("teal");
		expect(mapping.desktop.anchors.dark["surface-0"]).toBe("base");
		expect(mapping.desktop.anchors.light["surface-0"]).toBe("crust");
		expect(mapping.cli.claude).toBe("pink");
		expect(mapping.cli.diffAdded).toEqual({ color: "green", alpha: 0.25 });
	});

	test("leaves light surface-3 out, since it must equal surface-2", () => {
		const mapping = loadClaudeMapping(PALETTE_DIR);
		expect(mapping.desktop.anchors.light["surface-3"]).toBeUndefined();
	});
});

describe("claudeMappingColorNames", () => {
	test("lists every palette name the mapping uses, once", () => {
		const names = claudeMappingColorNames(loadClaudeMapping(PALETTE_DIR));
		expect(names).toContain("teal");
		expect(names).toContain("green");
		expect(new Set(names).size).toBe(names.length);
	});

	test.each(VARIANTS)("every name exists in the %s palette", (variant) => {
		const palette = loadPalette(PALETTE_DIR, variant);
		const names = claudeMappingColorNames(loadClaudeMapping(PALETTE_DIR));
		const missing = names.filter((name) => !(name in palette.colors));
		expect(missing).toEqual([]);
	});
});
