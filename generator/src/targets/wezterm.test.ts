import { describe, expect, test } from "bun:test";
import path from "node:path";
import { loadPalette } from "../palette";
import { loadTerminalMapping } from "../terminalMapping";
import type { VariantName } from "../types";
import { loadUIMapping } from "../uiMapping";
import { generateWeztermTheme, tomlStringify } from "./wezterm";

const PROJECT_DIR = path.resolve(import.meta.dir, "../../..");
const PALETTE_DIR = path.join(PROJECT_DIR, "palette");

function loadFixtures(variant: VariantName) {
	const palette = loadPalette(PALETTE_DIR, variant);
	const uiMapping = loadUIMapping(PALETTE_DIR);
	const terminalMapping = loadTerminalMapping(PALETTE_DIR);
	return { palette, uiMapping, terminalMapping };
}

describe("generateWeztermTheme", () => {
	test("pastel-dark theme has correct foreground and background", () => {
		const { palette, uiMapping, terminalMapping } = loadFixtures("pastel-dark");
		const theme = generateWeztermTheme(
			"pastel-dark",
			palette,
			uiMapping,
			terminalMapping,
		);

		expect(theme.foreground).toBe("#F0E0F0");
		expect(theme.background).toBe("#1E1028");
	});

	test("pastel-light theme has correct foreground and background", () => {
		const { palette, uiMapping, terminalMapping } =
			loadFixtures("pastel-light");
		const theme = generateWeztermTheme(
			"pastel-light",
			palette,
			uiMapping,
			terminalMapping,
		);

		expect(theme.foreground).toBe("#2E1A24");
		expect(theme.background).toBe("#FFF8F5");
	});

	test("pastel-dark theme has correct cursor colors", () => {
		const { palette, uiMapping, terminalMapping } = loadFixtures("pastel-dark");
		const theme = generateWeztermTheme(
			"pastel-dark",
			palette,
			uiMapping,
			terminalMapping,
		);

		expect(theme.cursor_bg).toBe("#C49BFF");
		expect(theme.cursor_fg).toBe("#1E1028");
		expect(theme.cursor_border).toBe("#C49BFF");
	});

	test("pastel-dark theme has correct selection colors", () => {
		const { palette, uiMapping, terminalMapping } = loadFixtures("pastel-dark");
		const theme = generateWeztermTheme(
			"pastel-dark",
			palette,
			uiMapping,
			terminalMapping,
		);

		expect(theme.selection_fg).toBe("#F0E0F0");
		expect(theme.selection_bg).toMatch(/^rgba\(/);
		expect(theme.selection_bg).toContain("0.3");
	});

	test("pastel-dark theme has correct tab bar colors", () => {
		const { palette, uiMapping, terminalMapping } = loadFixtures("pastel-dark");
		const theme = generateWeztermTheme(
			"pastel-dark",
			palette,
			uiMapping,
			terminalMapping,
		);

		expect(theme.tab_bar.background).toBe("#160A20");
		expect(theme.tab_bar.active_tab.bg_color).toBe("#1E1028");
		expect(theme.tab_bar.active_tab.fg_color).toBe("#F0E0F0");
		expect(theme.tab_bar.inactive_tab.bg_color).toBe("#160A20");
		expect(theme.tab_bar.inactive_tab.fg_color).toBe("#C8B0D8");
	});

	test("pastel-dark theme has correct ANSI colors", () => {
		const { palette, uiMapping, terminalMapping } = loadFixtures("pastel-dark");
		const theme = generateWeztermTheme(
			"pastel-dark",
			palette,
			uiMapping,
			terminalMapping,
		);

		expect(theme.ansi).toHaveLength(8);
		expect(theme.ansi[0]).toBe("#0D0612"); // crust (dark)
		expect(theme.ansi[1]).toBe("#FF5470"); // red
		expect(theme.ansi[2]).toBe("#7FD7B5"); // green
		expect(theme.ansi[3]).toBe("#FFE4B5"); // yellow
		expect(theme.ansi[4]).toBe("#8BA4FF"); // blue
		expect(theme.ansi[5]).toBe("#FF7DB0"); // pink (magenta)
		expect(theme.ansi[6]).toBe("#5ED4E0"); // teal (cyan)
		expect(theme.ansi[7]).toBe("#C8B0D8"); // subtext1 (white, dark)
	});

	test("pastel-light theme has correct ANSI colors", () => {
		const { palette, uiMapping, terminalMapping } =
			loadFixtures("pastel-light");
		const theme = generateWeztermTheme(
			"pastel-light",
			palette,
			uiMapping,
			terminalMapping,
		);

		expect(theme.ansi).toHaveLength(8);
		expect(theme.ansi[0]).toBe("#2E1A24"); // text (light: black → text)
		expect(theme.ansi[7]).toBe("#6B4F5E"); // subtext1 (light: white → subtext1)
	});

	test("pastel-dark theme brights have correct format", () => {
		const { palette, uiMapping, terminalMapping } = loadFixtures("pastel-dark");
		const theme = generateWeztermTheme(
			"pastel-dark",
			palette,
			uiMapping,
			terminalMapping,
		);

		expect(theme.brights).toHaveLength(8);
		expect(theme.brights[0]).toBe("#A090B8"); // subtext0 (bright black, dark)
		expect(theme.brights[7]).toBe("#F0E0F0"); // text (bright white)
	});

	test("pastel-light theme brights have correct format", () => {
		const { palette, uiMapping, terminalMapping } =
			loadFixtures("pastel-light");
		const theme = generateWeztermTheme(
			"pastel-light",
			palette,
			uiMapping,
			terminalMapping,
		);

		expect(theme.brights).toHaveLength(8);
		expect(theme.brights[0]).toBe("#6B4F5E"); // subtext1 (bright black, light)
		expect(theme.brights[7]).toBe("#2E1A24"); // text (bright white)
	});

	test("scrollbar and split colors are set", () => {
		const { palette, uiMapping, terminalMapping } = loadFixtures("pastel-dark");
		const theme = generateWeztermTheme(
			"pastel-dark",
			palette,
			uiMapping,
			terminalMapping,
		);

		expect(theme.scrollbar_thumb).toBe("#C8B0D8"); // subtext1
		expect(theme.split).toBe("#3A2850"); // surface1
	});
});

describe("tomlStringify", () => {
	test("produces valid TOML with all required sections", () => {
		const { palette, uiMapping, terminalMapping } = loadFixtures("pastel-dark");
		const theme = generateWeztermTheme(
			"pastel-dark",
			palette,
			uiMapping,
			terminalMapping,
		);
		const toml = tomlStringify("Synthpunk Pastel Dark", theme);

		expect(toml).toContain("[colors]");
		expect(toml).toContain('foreground = "#F0E0F0"');
		expect(toml).toContain('background = "#1E1028"');
		expect(toml).toContain('cursor_bg = "#C49BFF"');
		expect(toml).toContain("[colors.tab_bar]");
		expect(toml).toContain("[colors.tab_bar.active_tab]");
		expect(toml).toContain("[colors.tab_bar.inactive_tab]");
		expect(toml).toContain("[colors.tab_bar.new_tab]");
		expect(toml).toContain("ansi = [");
		expect(toml).toContain("brights = [");
	});

	test("TOML output starts with comment header", () => {
		const { palette, uiMapping, terminalMapping } = loadFixtures("pastel-dark");
		const theme = generateWeztermTheme(
			"pastel-dark",
			palette,
			uiMapping,
			terminalMapping,
		);
		const toml = tomlStringify("Synthpunk Pastel Dark", theme);

		expect(toml.startsWith("# Synthpunk Pastel Dark")).toBe(true);
	});
});
