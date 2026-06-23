import { describe, expect, test } from "bun:test";
import path from "node:path";
import { contrastRatio, hexToRgb } from "../colorUtils";
import { loadPalette } from "../palette";
import { loadFontStyles, loadSyntaxMapping } from "../syntaxMapping";
import { loadUIMapping } from "../uiMapping";
import { generateZedTheme } from "./zed";

const PROJECT_DIR = path.resolve(import.meta.dir, "../..");
const PALETTE_DIR = path.join(PROJECT_DIR, "palette");

const CHROMATIC_ANSI = ["red", "green", "yellow", "blue", "magenta", "cyan"];

// 8-digit "#RRGGBBaa" -> contrast against another 8-digit color (alpha ignored).
function contrastWithBg(color: string, background: string): number {
	return contrastRatio(hexToRgb(color), hexToRgb(background));
}

function buildPastelTheme() {
	const darkPalette = loadPalette(PALETTE_DIR, "pastel-dark");
	const lightPalette = loadPalette(PALETTE_DIR, "pastel-light");
	const uiMapping = loadUIMapping(PALETTE_DIR);
	const syntaxMapping = loadSyntaxMapping(PALETTE_DIR);
	const fontStyles = loadFontStyles(PALETTE_DIR);
	return generateZedTheme(
		"synthpunk-pastel",
		"Synthpunk Pastel",
		"Synthpunk",
		darkPalette,
		lightPalette,
		uiMapping,
		syntaxMapping,
		fontStyles,
	);
}

describe("generateZedTheme", () => {
	test("produces two theme variants (dark and light)", () => {
		const darkPalette = loadPalette(PALETTE_DIR, "pastel-dark");
		const lightPalette = loadPalette(PALETTE_DIR, "pastel-light");
		const uiMapping = loadUIMapping(PALETTE_DIR);
		const syntaxMapping = loadSyntaxMapping(PALETTE_DIR);
		const fontStyles = loadFontStyles(PALETTE_DIR);

		const theme = generateZedTheme(
			"synthpunk-pastel",
			"Synthpunk Pastel",
			"Synthpunk",
			darkPalette,
			lightPalette,
			uiMapping,
			syntaxMapping,
			fontStyles,
		);

		expect(theme.name).toBe("Synthpunk Pastel");
		expect(theme.themes).toHaveLength(2);
		expect(theme.themes[0].name).toBe("Synthpunk Pastel Dark");
		expect(theme.themes[0].appearance).toBe("dark");
		expect(theme.themes[1].name).toBe("Synthpunk Pastel Light");
		expect(theme.themes[1].appearance).toBe("light");
	});

	test("dark theme has correct background colors", () => {
		const darkPalette = loadPalette(PALETTE_DIR, "pastel-dark");
		const lightPalette = loadPalette(PALETTE_DIR, "pastel-light");
		const uiMapping = loadUIMapping(PALETTE_DIR);
		const syntaxMapping = loadSyntaxMapping(PALETTE_DIR);
		const fontStyles = loadFontStyles(PALETTE_DIR);

		const theme = generateZedTheme(
			"synthpunk-pastel",
			"Synthpunk Pastel",
			"Synthpunk",
			darkPalette,
			lightPalette,
			uiMapping,
			syntaxMapping,
			fontStyles,
		);

		const darkStyle = theme.themes[0].style;
		expect(darkStyle.background).toBe("#1E1028ff");
		expect(darkStyle["editor.background"]).toBe("#1E1028ff");
		expect(darkStyle["editor.foreground"]).toBe("#F0E0F0ff");
	});

	test("has syntax colors", () => {
		const darkPalette = loadPalette(PALETTE_DIR, "pastel-dark");
		const lightPalette = loadPalette(PALETTE_DIR, "pastel-light");
		const uiMapping = loadUIMapping(PALETTE_DIR);
		const syntaxMapping = loadSyntaxMapping(PALETTE_DIR);
		const fontStyles = loadFontStyles(PALETTE_DIR);

		const theme = generateZedTheme(
			"synthpunk-pastel",
			"Synthpunk Pastel",
			"Synthpunk",
			darkPalette,
			lightPalette,
			uiMapping,
			syntaxMapping,
			fontStyles,
		);

		const syntax = theme.themes[0].style.syntax as Record<
			string,
			{ color: string }
		>;
		expect(syntax.keyword.color).toBe("#5ED4E0ff");
		expect(syntax.string.color).toBe("#7FD7B5ff");
		expect(syntax.comment.color).toBe("#705880ff");
	});

	test("has players array with 8 entries", () => {
		const darkPalette = loadPalette(PALETTE_DIR, "pastel-dark");
		const lightPalette = loadPalette(PALETTE_DIR, "pastel-light");
		const uiMapping = loadUIMapping(PALETTE_DIR);
		const syntaxMapping = loadSyntaxMapping(PALETTE_DIR);
		const fontStyles = loadFontStyles(PALETTE_DIR);

		const theme = generateZedTheme(
			"synthpunk-pastel",
			"Synthpunk Pastel",
			"Synthpunk",
			darkPalette,
			lightPalette,
			uiMapping,
			syntaxMapping,
			fontStyles,
		);

		expect(theme.themes[0].style.players).toHaveLength(8);
		expect(theme.themes[0].style.players[0].cursor).toBe("#5ED4E0ff");
	});

	test("light theme has correct background colors", () => {
		const darkPalette = loadPalette(PALETTE_DIR, "pastel-dark");
		const lightPalette = loadPalette(PALETTE_DIR, "pastel-light");
		const uiMapping = loadUIMapping(PALETTE_DIR);
		const syntaxMapping = loadSyntaxMapping(PALETTE_DIR);
		const fontStyles = loadFontStyles(PALETTE_DIR);

		const theme = generateZedTheme(
			"synthpunk-pastel",
			"Synthpunk Pastel",
			"Synthpunk",
			darkPalette,
			lightPalette,
			uiMapping,
			syntaxMapping,
			fontStyles,
		);

		const lightStyle = theme.themes[1].style;
		expect(lightStyle.background).toBe("#FFF8F5ff");
		expect(lightStyle["editor.background"]).toBe("#FFF8F5ff");
		expect(lightStyle["editor.foreground"]).toBe("#2E1A24ff");
	});

	test("light theme syntax has different keyword color from dark", () => {
		const darkPalette = loadPalette(PALETTE_DIR, "pastel-dark");
		const lightPalette = loadPalette(PALETTE_DIR, "pastel-light");
		const uiMapping = loadUIMapping(PALETTE_DIR);
		const syntaxMapping = loadSyntaxMapping(PALETTE_DIR);
		const fontStyles = loadFontStyles(PALETTE_DIR);

		const theme = generateZedTheme(
			"synthpunk-pastel",
			"Synthpunk Pastel",
			"Synthpunk",
			darkPalette,
			lightPalette,
			uiMapping,
			syntaxMapping,
			fontStyles,
		);

		const darkSyntax = theme.themes[0].style.syntax as Record<
			string,
			{ color: string }
		>;
		const lightSyntax = theme.themes[1].style.syntax as Record<
			string,
			{ color: string }
		>;
		expect(darkSyntax.keyword.color).toBe("#5ED4E0ff");
		expect(lightSyntax.keyword.color).toBe("#FF9BB6ff");
	});

	test("dark theme terminal colors have correct format", () => {
		const darkPalette = loadPalette(PALETTE_DIR, "pastel-dark");
		const lightPalette = loadPalette(PALETTE_DIR, "pastel-light");
		const uiMapping = loadUIMapping(PALETTE_DIR);
		const syntaxMapping = loadSyntaxMapping(PALETTE_DIR);
		const fontStyles = loadFontStyles(PALETTE_DIR);

		const theme = generateZedTheme(
			"synthpunk-pastel",
			"Synthpunk Pastel",
			"Synthpunk",
			darkPalette,
			lightPalette,
			uiMapping,
			syntaxMapping,
			fontStyles,
		);

		const style = theme.themes[0].style;
		expect(style["terminal.ansi.black"]).toBe("#0D0612ff");
		expect(style["terminal.ansi.red"]).toBe("#FF5470ff");
	});

	test("light theme chromatic terminal colors meet 3:1 contrast on background", () => {
		const style = buildPastelTheme().themes[1].style; // light variant
		const bg = style["terminal.background"] as string;

		for (const name of CHROMATIC_ANSI) {
			expect(
				contrastWithBg(style[`terminal.ansi.${name}`] as string, bg),
			).toBeGreaterThanOrEqual(3);
			expect(
				contrastWithBg(style[`terminal.ansi.bright_${name}`] as string, bg),
			).toBeGreaterThanOrEqual(3);
		}
	});

	test("schema and author are set correctly", () => {
		const darkPalette = loadPalette(PALETTE_DIR, "pastel-dark");
		const lightPalette = loadPalette(PALETTE_DIR, "pastel-light");
		const uiMapping = loadUIMapping(PALETTE_DIR);
		const syntaxMapping = loadSyntaxMapping(PALETTE_DIR);
		const fontStyles = loadFontStyles(PALETTE_DIR);

		const theme = generateZedTheme(
			"synthpunk-pastel",
			"Synthpunk Pastel",
			"Synthpunk",
			darkPalette,
			lightPalette,
			uiMapping,
			syntaxMapping,
			fontStyles,
		);

		expect(theme.$schema).toBe("https://zed.dev/schema/themes/v0.2.0.json");
		expect(theme.author).toBe("Synthpunk");
	});
});
