import { describe, expect, test } from "bun:test";
import path from "node:path";
import { colorToHex, loadPalette, resolveColor } from "./palette";
import type { VariantName } from "./types";

const PROJECT_DIR = path.resolve(import.meta.dir, "../");
const PALETTE_DIR = path.join(PROJECT_DIR, "palette");

describe("loadPalette", () => {
	test("loads pastel-dark palette", () => {
		const palette = loadPalette(PALETTE_DIR, "pastel-dark");
		expect(palette.info.name).toBe("synthpunk-pastel-dark");
		expect(palette.colors).toBeDefined();
		expect(Object.keys(palette.colors).length).toBeGreaterThan(0);
	});

	test("loads neon-light palette", () => {
		const palette = loadPalette(PALETTE_DIR, "neon-light");
		expect(palette.info.name).toBe("synthpunk-neon-light");
		expect(palette.colors.rosewater.hex).toBe("E8A0C0");
	});

	test("throws on missing palette file", () => {
		expect(() =>
			loadPalette(PALETTE_DIR, "nonexistent" as VariantName),
		).toThrow();
	});
});

describe("resolveColor", () => {
	test("resolves a named color from palette", () => {
		const palette = loadPalette(PALETTE_DIR, "pastel-dark");
		const color = resolveColor(palette, "red");
		expect(color.hex).toBe("FF5470");
		expect(color.rgb).toEqual([255, 84, 112]);
	});

	test("throws on unknown color name", () => {
		const palette = loadPalette(PALETTE_DIR, "pastel-dark");
		expect(() => resolveColor(palette, "nonexistent")).toThrow();
	});
});

describe("colorToHex", () => {
	test("formats hex without alpha", () => {
		const color = {
			hex: "FF5470",
			rgb: [255, 84, 112] as [number, number, number],
		};
		expect(colorToHex(color)).toBe("#FF5470");
	});

	test("formats hex with alpha", () => {
		const color = {
			hex: "FF5470",
			rgb: [255, 84, 112] as [number, number, number],
		};
		expect(colorToHex(color, 0.2)).toBe("#FF547033");
	});

	test("formats hex with alpha=1 as no alpha", () => {
		const color = {
			hex: "FF5470",
			rgb: [255, 84, 112] as [number, number, number],
		};
		expect(colorToHex(color, 1)).toBe("#FF5470");
	});
});
