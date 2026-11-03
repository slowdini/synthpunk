import { describe, expect, test } from "bun:test";
import { hexToRgb } from "../generator/colorUtils";
import type { LegibilityRules } from "../generator/legibility";
import type { Palette } from "../generator/types";
import { renderSheet, type SheetVariant } from "./legibility-sheet";

function fixturePalette(colors: Record<string, string>): Palette {
	return {
		info: { name: "fixture", description: "", version: "0" },
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
	},
	text: { text: "body", yellow: "accent" },
	surfaces: { base: ["body", "accent"] },
	fills: { colors: ["yellow"], text: ["text"], tier: "accent" },
};

const PALETTE = fixturePalette({
	base: "FFFFFF",
	text: "000000",
	yellow: "E8C468",
});

const ANSI = [
	"#000000",
	"#CC0000",
	"#008800",
	"#B68A1C",
	"#0000CC",
	"#CC00CC",
	"#008888",
	"#666666",
];

function variant(overrides: Partial<SheetVariant> = {}): SheetVariant {
	return {
		name: "light",
		palette: PALETTE,
		wezterm: {
			colors: {
				foreground: "#000000",
				background: "#FFFFFF",
				ansi: ANSI,
				brights: ANSI,
			},
		},
		starship: {
			palettes: { synthpunk_light: { red: "#FF0000", crust: "#111111" } },
			os: { style: "bg:red fg:crust" },
		},
		vscodeColors: {
			"editor.background": "#FFFFFF",
			"editor.selectionBackground": "#E8C4683D",
		},
		...overrides,
	};
}

const SYNTAX = { keywords: { keyword: "yellow" } };

describe("renderSheet", () => {
	test("renders one section per variant", () => {
		const html = renderSheet({
			rules: RULES,
			syntax: SYNTAX,
			variants: [variant(), variant({ name: "dark" })],
		});
		expect(html).toContain('<section id="light"');
		expect(html).toContain('<section id="dark"');
	});

	test("marks a required pair that fails its tier", () => {
		const html = renderSheet({
			rules: RULES,
			syntax: SYNTAX,
			variants: [variant()],
		});
		expect(html).toMatch(
			/data-pair="yellow on base" data-status="fail"[\s\S]*?1\.68/,
		);
		expect(html).toMatch(/data-pair="text on base" data-status="pass"/);
	});

	test("shows a MISSING banner when the WezTerm scheme has no colors.ansi", () => {
		const html = renderSheet({
			rules: RULES,
			syntax: SYNTAX,
			variants: [
				variant({
					wezterm: {
						colors: {
							foreground: "#000000",
							background: "#FFFFFF",
							tab_bar: { new_tab: { ansi: ANSI, brights: ANSI } },
						},
					},
				}),
			],
		});
		expect(html).toContain("MISSING");
		expect(html).toContain("colors.ansi");
	});

	test("colors terminal output with the scheme's ANSI colors", () => {
		const html = renderSheet({
			rules: RULES,
			syntax: SYNTAX,
			variants: [variant()],
		});
		expect(html).toContain('<span style="color:#B68A1C">WARN</span>');
	});

	test("resolves Starship segment colors through the variant palette", () => {
		const html = renderSheet({
			rules: RULES,
			syntax: SYNTAX,
			variants: [variant()],
		});
		expect(html).toContain("background:#FF0000;color:#111111");
	});

	test("escapes HTML in sample code", () => {
		const html = renderSheet({
			rules: RULES,
			syntax: SYNTAX,
			variants: [variant()],
		});
		expect(html).toContain("Map&lt;string, Scheme&gt;");
		expect(html).not.toContain("Map<string, Scheme>");
	});
});
