import { describe, expect, test } from "bun:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { loadClaudeMapping } from "../claudeMapping";
import {
	composite,
	contrastRatio,
	hexToRgb,
	relativeLuminance,
	rgbToHex,
} from "../colorUtils";
import { loadPalette } from "../palette";
import type { ClaudeMapping, VariantName } from "../types";
import { VARIANTS } from "../types";
import { checkColors } from "../vendor/make-colors.js";
import {
	CLAUDE_LOOKS,
	claudeMarketplaceManifest,
	claudePluginManifest,
	desktopAnchorHexes,
	generateCliTheme,
	generateDesktopLook,
	REGISTER_TEST_MODULE,
	stringifyLooksModule,
} from "./claude";

const PROJECT_DIR = path.resolve(import.meta.dir, "../..");
const PALETTE_DIR = path.join(PROJECT_DIR, "palette");
const mapping = loadClaudeMapping(PALETTE_DIR);
const palette = (variant: VariantName) => loadPalette(PALETTE_DIR, variant);

const ratio = (a: string, b: string) => contrastRatio(hexToRgb(a), hexToRgb(b));

describe("desktopAnchorHexes", () => {
	test("resolves each anchor to its palette hex, lowercase", () => {
		const anchors = desktopAnchorHexes(mapping, palette("pastel-dark"), "dark");
		expect(anchors["surface-0"]).toBe("#1e1028");
		expect(anchors["text-primary"]).toBe("#f0e0f0");
	});

	test("leaves out an anchor the mapping leaves out", () => {
		const anchors = desktopAnchorHexes(
			mapping,
			palette("pastel-light"),
			"light",
		);
		expect(anchors["surface-3"]).toBeUndefined();
	});

	for (const look of CLAUDE_LOOKS) {
		for (const mode of ["dark", "light"] as const) {
			const variant = look.variants[mode];

			test(`${variant}: surfaces never get darker from surface-0 up`, () => {
				const anchors = desktopAnchorHexes(mapping, palette(variant), mode);
				const surfaces = (
					["surface-0", "surface-1", "surface-2", "surface-3"] as const
				)
					.map((name) => anchors[name])
					.filter((hex): hex is `#${string}` => hex !== undefined)
					.map((hex) => relativeLuminance(hexToRgb(hex)));
				const sorted = [...surfaces].sort((a, b) => a - b);
				expect(surfaces).toEqual(sorted);
			});

			test(`${variant}: every text anchor reads at 4.5:1 on every surface`, () => {
				const anchors = desktopAnchorHexes(mapping, palette(variant), mode);
				const surfaces = Object.entries(anchors).filter(([name]) =>
					name.startsWith("surface-"),
				);
				const texts = Object.entries(anchors).filter(([name]) =>
					name.startsWith("text-"),
				);
				const failures = texts.flatMap(([text, fg]) =>
					surfaces
						.filter(([, bg]) => ratio(fg, bg) < 4.5)
						.map(
							([surface, bg]) =>
								`${text} on ${surface}: ${ratio(fg, bg).toFixed(2)}`,
						),
				);
				expect(failures).toEqual([]);
			});
		}
	}
});

describe("generateDesktopLook", () => {
	const pastel = generateDesktopLook(
		"Synthpunk Pastel",
		palette("pastel-dark"),
		palette("pastel-light"),
		mapping,
	);

	test("names the look and fills both modes", () => {
		expect(pastel.v).toBe(1);
		expect(pastel.label).toBe("Synthpunk Pastel");
		expect(Object.keys(pastel.inputs.dark ?? {}).length).toBeGreaterThan(50);
		expect(Object.keys(pastel.inputs.light ?? {}).length).toBeGreaterThan(50);
	});

	test("gives the Desktop app nothing it refuses to paint", () => {
		const unpainted = checkColors(pastel).filter((line) =>
			line.startsWith("Desktop won't paint"),
		);
		expect(unpainted).toEqual([]);
	});

	test("throws on a mapping the Desktop app would refuse to paint", () => {
		const unreadable: ClaudeMapping = structuredClone(mapping);
		unreadable.desktop.anchors.dark["text-primary"] = "surface0";
		unreadable.desktop.anchors.dark["text-secondary"] = "surface0";
		unreadable.desktop.anchors.dark["text-muted"] = "surface0";
		expect(() =>
			generateDesktopLook(
				"Unreadable",
				palette("pastel-dark"),
				palette("pastel-light"),
				unreadable,
			),
		).toThrow();
	});
});

describe("generateCliTheme", () => {
	test("pastel-dark names the variant and builds on the dark base", () => {
		const theme = generateCliTheme(
			"pastel-dark",
			palette("pastel-dark"),
			mapping,
		);
		expect(theme.name).toBe("Synthpunk Pastel Dark");
		expect(theme.base).toBe("dark");
		expect(theme.overrides.claude).toBe("#FF7DB0");
		expect(theme.overrides.text).toBe("#F0E0F0");
	});

	test("light variants build on the light base", () => {
		expect(
			generateCliTheme("neon-light", palette("neon-light"), mapping).base,
		).toBe("light");
	});

	test("blends a diff background over base into an opaque color", () => {
		const pal = palette("pastel-dark");
		const theme = generateCliTheme("pastel-dark", pal, mapping);
		const expected = `#${rgbToHex(
			...composite(pal.colors.green.rgb, 0.25, pal.colors.base.rgb),
		)}`;
		expect(theme.overrides.diffAdded).toBe(expected);
	});

	test.each(VARIANTS)("%s: every override is an opaque #RRGGBB", (variant) => {
		const theme = generateCliTheme(variant, palette(variant), mapping);
		const bad = Object.entries(theme.overrides).filter(
			([, value]) => !/^#[0-9A-F]{6}$/.test(value),
		);
		expect(bad).toEqual([]);
		expect(Object.keys(theme.overrides).sort()).toEqual(
			Object.keys(mapping.cli).sort(),
		);
	});
});

describe("claudePluginManifest", () => {
	test("carries the version and a Pastel/Neon picker defaulting to Pastel", () => {
		const manifest = claudePluginManifest("1.2.3");
		expect(manifest.name).toBe("synthpunk");
		expect(manifest.version).toBe("1.2.3");
		expect(manifest.userConfig.variant.type).toBe("string");
		expect(manifest.userConfig.variant.options).toEqual(
			CLAUDE_LOOKS.map((look) => look.key),
		);
		expect(manifest.userConfig.variant.default).toBe("pastel");
	});

	test("credits the repository's owner", () => {
		expect(claudePluginManifest("1.2.3").author).toEqual({
			name: "slowdini",
			url: "https://github.com/slowdini",
		});
	});
});

describe("claudeMarketplaceManifest", () => {
	test("describes the marketplace and lists the plugin at its folder", () => {
		const marketplace = claudeMarketplaceManifest("./themes/claude");
		expect(marketplace.description.length).toBeGreaterThan(0);
		expect(marketplace.owner).toEqual(claudePluginManifest("").author);
		expect(marketplace.plugins).toEqual([
			expect.objectContaining({ name: "synthpunk", source: "./themes/claude" }),
		]);
	});
});

describe("stringifyLooksModule", () => {
	test("writes a module whose LOOKS export holds each look", async () => {
		const looks = Object.fromEntries(
			CLAUDE_LOOKS.map((look) => [
				look.key,
				generateDesktopLook(
					look.label,
					palette(look.variants.dark),
					palette(look.variants.light),
					mapping,
				),
			]),
		);
		const dir = fs.mkdtempSync(path.join(os.tmpdir(), "synthpunk-looks-"));
		const file = path.join(dir, "looks.ts");
		fs.writeFileSync(file, stringifyLooksModule(looks));
		try {
			const mod = await import(file);
			expect(mod.LOOKS).toEqual(looks);
		} finally {
			fs.rmSync(dir, { recursive: true, force: true });
		}
	});
});

describe("REGISTER_TEST_MODULE", () => {
	test("checks every look the option offers", () => {
		expect(REGISTER_TEST_MODULE).toContain("Object.keys(LOOKS)");
		expect(REGISTER_TEST_MODULE).toContain('from "claude-code/testing"');
	});
});
