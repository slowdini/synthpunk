import { describe, expect, test } from "bun:test";
import path from "node:path";
import { contrastRatio, hexToRgb } from "./colorUtils";
import {
	allowedMatrix,
	allowedTextColors,
	checkPairs,
	type LegibilityRules,
	loadLegibilityRules,
	paletteViolations,
	validateRules,
} from "./legibility";
import { loadPalette } from "./palette";
import type { Palette } from "./types";
import { VARIANTS } from "./types";

const PALETTE_DIR = path.resolve(import.meta.dir, "../palette");

function fixturePalette(name: string, colors: Record<string, string>): Palette {
	return {
		info: { name, description: "", version: "0" },
		colors: Object.fromEntries(
			Object.entries(colors).map(([key, hex]) => [
				key,
				{ hex, rgb: hexToRgb(hex), description: "" },
			]),
		),
	};
}

const RULES: LegibilityRules = {
	tiers: {
		body: { min: 4.5, description: "" },
		accent: { min: 3, description: "" },
		muted: { min: 2.5, description: "" },
	},
	text: { text: "body", yellow: "accent", gray: "muted" },
	surfaces: { base: ["body", "accent", "muted"], surface: ["body"] },
	fills: { colors: ["yellow"], text: ["text"], tier: "accent" },
};

// yellow fails accent on the light base; text fails as fill text in dark.
const LIGHT = fixturePalette("light", {
	base: "FFFFFF",
	surface: "DDDDDD",
	text: "000000",
	yellow: "E8C468",
	gray: "767676",
});
const DARK = fixturePalette("dark", {
	base: "000000",
	surface: "222222",
	text: "FFFFFF",
	yellow: "FFE4B5",
	gray: "767676",
});

describe("validateRules", () => {
	test("repo legibility rules are internally consistent", () => {
		expect(validateRules(loadLegibilityRules(PALETTE_DIR))).toEqual([]);
	});

	test("reports references to undefined tiers", () => {
		const rules: LegibilityRules = {
			...RULES,
			text: { ...RULES.text, gray: "faint" },
			surfaces: { base: ["body", "loud"] },
			fills: { ...RULES.fills, tier: "huge" },
		};
		expect(validateRules(rules)).toEqual([
			'text.gray uses undefined tier "faint"',
			'surfaces.base uses undefined tier "loud"',
			'fills.tier uses undefined tier "huge"',
		]);
	});
});

describe("allowedMatrix", () => {
	test("has one cell per surface and text color", () => {
		const cells = allowedMatrix(LIGHT, RULES);
		expect(cells).toHaveLength(2 * 3);
	});

	test("marks pass against the color's tier and whether the surface requires it", () => {
		const cells = allowedMatrix(LIGHT, RULES);
		const yellowOnBase = cells.find(
			(c) => c.surface === "base" && c.color === "yellow",
		);
		const grayOnSurface = cells.find(
			(c) => c.surface === "surface" && c.color === "gray",
		);
		expect(yellowOnBase).toMatchObject({
			tier: "accent",
			min: 3,
			pass: false,
			required: true,
		});
		expect(yellowOnBase?.ratio).toBeCloseTo(
			contrastRatio(hexToRgb("E8C468"), hexToRgb("FFFFFF")),
			6,
		);
		expect(grayOnSurface).toMatchObject({
			tier: "muted",
			pass: true,
			required: false,
		});
	});
});

describe("allowedTextColors", () => {
	test("allows a color on a surface only if it passes in every palette", () => {
		expect(allowedTextColors([LIGHT, DARK], RULES)).toEqual({
			base: ["text", "gray"],
			surface: ["text", "gray"],
		});
	});
});

describe("paletteViolations", () => {
	test("reports required text failures with a passing suggestion", () => {
		const violations = paletteViolations({ light: LIGHT }, RULES);
		const text = violations.filter((v) => v.kind === "text");
		expect(text).toHaveLength(1);
		const [v] = text;
		if (v.kind !== "text") throw new Error("unreachable");
		expect(v).toMatchObject({
			variant: "light",
			color: "yellow",
			tier: "accent",
			min: 3,
		});
		expect(v.failures.map((f) => f.surface)).toEqual(["base"]);
		expect(
			contrastRatio(hexToRgb(v.suggestion), hexToRgb("FFFFFF")),
		).toBeGreaterThanOrEqual(3);
	});

	test("reports fill text below the fill tier", () => {
		const violations = paletteViolations({ dark: DARK }, RULES);
		expect(violations.filter((v) => v.kind === "fill")).toEqual([
			{
				kind: "fill",
				variant: "dark",
				fill: "yellow",
				text: "text",
				ratio: contrastRatio(hexToRgb("FFFFFF"), hexToRgb("FFE4B5")),
				min: 3,
			},
		]);
	});

	test("reports rule colors missing from a palette", () => {
		const partial = fixturePalette("partial", {
			base: "FFFFFF",
			surface: "DDDDDD",
			text: "000000",
			yellow: "8A6A10",
		});
		expect(
			paletteViolations({ partial }, RULES).filter((v) => v.kind === "missing"),
		).toEqual([{ kind: "missing", variant: "partial", color: "gray" }]);
	});

	test("repo palettes meet every rule in every variant", () => {
		const palettes = Object.fromEntries(
			VARIANTS.map((v) => [v, loadPalette(PALETTE_DIR, v)]),
		);
		const violations = paletteViolations(
			palettes,
			loadLegibilityRules(PALETTE_DIR),
		);
		expect(violations).toEqual([]);
	});
});

describe("checkPairs", () => {
	test("returns no failures when every pair meets its tier", () => {
		expect(
			checkPairs(
				[{ label: "body", fg: "#000000", bg: "#FFFFFF", tier: "body" }],
				RULES,
			),
		).toEqual([]);
	});

	test("reports every failing pair, not just the first", () => {
		const failures = checkPairs(
			[
				{ label: "a", fg: "#E8C468", bg: "#FFFFFF", tier: "accent" },
				{ label: "b", fg: "#000000", bg: "#FFFFFF", tier: "body" },
				{ label: "c", fg: "#FFFFFF", bg: "#FFE4B5", tier: "body" },
				{ label: "d", fg: "#000000", bg: "#FFFFFF", tier: "loud" },
			],
			RULES,
		);
		expect(failures).toEqual([
			"a: #E8C468 on #FFFFFF is 1.68:1, below the accent minimum 3:1",
			"c: #FFFFFF on #FFE4B5 is 1.23:1, below the body minimum 4.5:1",
			'd: undefined tier "loud"',
		]);
	});

	test("rejects translucent colors instead of ignoring their alpha", () => {
		expect(
			checkPairs(
				[{ label: "sel", fg: "#000000", bg: "#5ED4E03D", tier: "body" }],
				RULES,
			),
		).toEqual([
			"sel: #5ED4E03D is not an opaque #RRGGBB color; composite it over its backdrop first",
		]);
	});
});
