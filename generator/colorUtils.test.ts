import { describe, expect, test } from "bun:test";
import {
	adjustBrightness,
	hexToRgb,
	hslToRgb,
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
