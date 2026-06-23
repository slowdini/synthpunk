import { describe, expect, test } from "bun:test";
import {
	adjustBrightness,
	contrastRatio,
	ensureContrast,
	hexToRgb,
	hslToRgb,
	relativeLuminance,
	rgbToHex,
	rgbToHsl,
} from "./colorUtils";

describe("hexToRgb / rgbToHex", () => {
	test("converts hex to RGB", () => {
		expect(hexToRgb("FF5470")).toEqual([255, 84, 112]);
	});

	test("converts RGB to hex", () => {
		expect(rgbToHex(255, 84, 112)).toBe("FF5470");
	});

	test("roundtrip hex to rgb to hex", () => {
		expect(rgbToHex(...hexToRgb("7FD7B5"))).toBe("7FD7B5");
	});
});

describe("adjustBrightness", () => {
	test("lightens a dark color", () => {
		const result = adjustBrightness([255, 84, 112], 0.2, "lighten");
		expect(result[0]).toBeLessThanOrEqual(255);
		expect(result.every((c) => c >= 0 && c <= 255)).toBe(true);
	});

	test("dims a color", () => {
		const result = adjustBrightness([255, 84, 112], 0.3, "dim");
		expect(result[0]).toBeLessThan(255);
		expect(result[0]).toBeGreaterThan(0);
		expect(result.every((c) => c >= 0 && c <= 255)).toBe(true);
	});

	test("clamps values to 0-255 range", () => {
		const bright = adjustBrightness([10, 10, 10], 0.95, "lighten");
		expect(bright.every((c) => c <= 255)).toBe(true);
		const dark = adjustBrightness([240, 240, 240], 0.95, "dim");
		expect(dark.every((c) => c >= 0)).toBe(true);
	});
});

describe("rgbToHsl / hslToRgb", () => {
	test("roundtrip preserves values approximately", () => {
		const [h, s, l] = rgbToHsl(255, 84, 112);
		const [r, g, b] = hslToRgb(h, s, l);
		expect(r).toBeCloseTo(255, -1);
		expect(g).toBeCloseTo(84, -1);
		expect(b).toBeCloseTo(112, -1);
	});
});

describe("relativeLuminance", () => {
	test("black is 0, white is 1", () => {
		expect(relativeLuminance([0, 0, 0])).toBeCloseTo(0, 5);
		expect(relativeLuminance([255, 255, 255])).toBeCloseTo(1, 5);
	});

	test("a lighter color has higher luminance than a darker one", () => {
		expect(relativeLuminance([232, 196, 104])).toBeGreaterThan(
			relativeLuminance([46, 26, 36]),
		);
	});
});

describe("contrastRatio", () => {
	test("black on white is 21:1", () => {
		expect(contrastRatio([0, 0, 0], [255, 255, 255])).toBeCloseTo(21, 1);
	});

	test("is symmetric", () => {
		const a = contrastRatio([90, 192, 154], [255, 248, 245]);
		const b = contrastRatio([255, 248, 245], [90, 192, 154]);
		expect(a).toBeCloseTo(b, 6);
	});

	test("identical colors are 1:1", () => {
		expect(contrastRatio([120, 120, 120], [120, 120, 120])).toBeCloseTo(1, 6);
	});
});

describe("ensureContrast", () => {
	const LIGHT_BG: [number, number, number] = [255, 248, 245]; // #FFF8F5

	test("raises a failing color to at least the target ratio", () => {
		const yellow: [number, number, number] = [232, 196, 104]; // #E8C468, ~1.6:1 on light bg
		expect(contrastRatio(yellow, LIGHT_BG)).toBeLessThan(3);
		const fixed = ensureContrast(yellow, LIGHT_BG, 3);
		expect(contrastRatio(fixed, LIGHT_BG)).toBeGreaterThanOrEqual(3);
	});

	test("is a no-op when the color already meets the target", () => {
		const text: [number, number, number] = [46, 26, 36]; // #2E1A24, passes easily on light bg
		expect(contrastRatio(text, LIGHT_BG)).toBeGreaterThanOrEqual(3);
		expect(ensureContrast(text, LIGHT_BG, 3)).toEqual(text);
	});

	test("preserves hue while darkening against a light background", () => {
		const green: [number, number, number] = [90, 192, 154]; // #5AC09A
		const fixed = ensureContrast(green, LIGHT_BG, 3);
		const [hIn] = rgbToHsl(...green);
		const [hOut] = rgbToHsl(...fixed);
		expect(hOut).toBeCloseTo(hIn, 2);
		// darkened (moved away from the light background)
		expect(relativeLuminance(fixed)).toBeLessThan(relativeLuminance(green));
	});

	test("lightens against a dark background", () => {
		const DARK_BG: [number, number, number] = [30, 16, 40]; // #1E1028
		const dim: [number, number, number] = [60, 40, 70]; // low contrast on dark bg
		expect(contrastRatio(dim, DARK_BG)).toBeLessThan(3);
		const fixed = ensureContrast(dim, DARK_BG, 3);
		expect(contrastRatio(fixed, DARK_BG)).toBeGreaterThanOrEqual(3);
		expect(relativeLuminance(fixed)).toBeGreaterThan(relativeLuminance(dim));
	});

	test("minimal nudge: a color just under target ends up near the target, not maxed out", () => {
		const red: [number, number, number] = [255, 84, 112]; // #FF5470, ~2.85:1 on light bg
		const fixed = ensureContrast(red, LIGHT_BG, 3);
		const ratio = contrastRatio(fixed, LIGHT_BG);
		expect(ratio).toBeGreaterThanOrEqual(3);
		expect(ratio).toBeLessThan(4); // didn't slam to black
	});
});
