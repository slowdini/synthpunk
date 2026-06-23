import { describe, expect, test } from "bun:test";
import path from "node:path";
import { contrastRatio, hexToRgb } from "../colorUtils";
import { loadPalette } from "../palette";
import {
	loadFontStyles,
	loadScopes,
	loadSyntaxMapping,
} from "../syntaxMapping";
import type { VariantName } from "../types";
import { loadUIMapping } from "../uiMapping";
import { generateVSCodeTheme } from "./vscode";

const PROJECT_DIR = path.resolve(import.meta.dir, "../..");
const PALETTE_DIR = path.join(PROJECT_DIR, "palette");

const CHROMATIC_ANSI = ["Red", "Green", "Yellow", "Blue", "Magenta", "Cyan"];

function buildTheme(variant: VariantName) {
	const palette = loadPalette(PALETTE_DIR, variant);
	const uiMapping = loadUIMapping(PALETTE_DIR);
	const syntaxMapping = loadSyntaxMapping(PALETTE_DIR);
	const scopes = loadScopes(PALETTE_DIR);
	const fontStyles = loadFontStyles(PALETTE_DIR);
	return generateVSCodeTheme(
		variant,
		palette,
		uiMapping,
		syntaxMapping,
		scopes,
		fontStyles,
	);
}

function contrastWithBg(color: string, background: string): number {
	return contrastRatio(hexToRgb(color), hexToRgb(background));
}

describe("generateVSCodeTheme", () => {
	test("produces a valid dark theme structure", () => {
		const variant: VariantName = "pastel-dark";
		const palette = loadPalette(PALETTE_DIR, variant);
		const uiMapping = loadUIMapping(PALETTE_DIR);
		const syntaxMapping = loadSyntaxMapping(PALETTE_DIR);
		const scopes = loadScopes(PALETTE_DIR);
		const fontStyles = loadFontStyles(PALETTE_DIR);

		const theme = generateVSCodeTheme(
			variant,
			palette,
			uiMapping,
			syntaxMapping,
			scopes,
			fontStyles,
		);

		expect(theme.name).toBe("Synthpunk Pastel Dark");
		expect(theme.type).toBe("dark");
		expect(theme.colors).toBeDefined();
		expect(theme.colors["editor.background"]).toBe("#1E1028");
		expect(theme.colors["editor.foreground"]).toBe("#F0E0F0");
		expect(theme.tokenColors).toBeDefined();
		expect(theme.tokenColors.length).toBeGreaterThan(0);
		expect(theme.tokenColors[0]).toHaveProperty("name");
		expect(theme.tokenColors[0]).toHaveProperty("scope");
		expect(theme.tokenColors[0]).toHaveProperty("settings");
	});

	test("produces a valid light theme structure", () => {
		const variant: VariantName = "pastel-light";
		const palette = loadPalette(PALETTE_DIR, variant);
		const uiMapping = loadUIMapping(PALETTE_DIR);
		const syntaxMapping = loadSyntaxMapping(PALETTE_DIR);
		const scopes = loadScopes(PALETTE_DIR);
		const fontStyles = loadFontStyles(PALETTE_DIR);

		const theme = generateVSCodeTheme(
			variant,
			palette,
			uiMapping,
			syntaxMapping,
			scopes,
			fontStyles,
		);

		expect(theme.name).toBe("Synthpunk Pastel Light");
		expect(theme.type).toBe("light");
		expect(theme.colors["editor.background"]).toBe("#FFF8F5");
	});

	for (const variant of ["pastel-light", "neon-light"] as VariantName[]) {
		test(`${variant} terminal ANSI colors meet 3:1 contrast on background`, () => {
			const theme = buildTheme(variant);
			const bg = theme.colors["terminal.background"];

			for (const name of CHROMATIC_ANSI) {
				expect(
					contrastWithBg(theme.colors[`terminal.ansi${name}`], bg),
				).toBeGreaterThanOrEqual(3);
				expect(
					contrastWithBg(theme.colors[`terminal.ansiBright${name}`], bg),
				).toBeGreaterThanOrEqual(3);
			}
		});
	}

	test("dark terminal ANSI colors are unchanged by the contrast floor", () => {
		const theme = buildTheme("pastel-dark");
		// Already legible on the dark background — palette values preserved.
		expect(theme.colors["terminal.ansiGreen"]).toBe("#7FD7B5");
		expect(theme.colors["terminal.ansiYellow"]).toBe("#FFE4B5");
		expect(theme.colors["terminal.ansiCyan"]).toBe("#5ED4E0");
	});
});
