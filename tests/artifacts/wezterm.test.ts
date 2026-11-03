import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { VARIANT_DISPLAY_NAMES, VARIANTS } from "../../generator/types";

// These tests parse the committed scheme files the way WezTerm does, rather
// than inspecting the generator's in-memory object. CI's generator sync check
// guarantees the committed files equal `bun run build` output.

const REPO_ROOT = join(import.meta.dir, "../..");
const HEX_COLOR = /^#[0-9A-F]{6}$/i;

type Table = Record<string, unknown>;

function loadScheme(variant: string): Table {
	const filePath = join(
		REPO_ROOT,
		"themes",
		"wezterm",
		`synthpunk-${variant}.toml`,
	);
	return Bun.TOML.parse(readFileSync(filePath, "utf8")) as Table;
}

for (const variant of VARIANTS) {
	describe(`themes/wezterm/synthpunk-${variant}.toml`, () => {
		const scheme = loadScheme(variant);
		const colors = scheme.colors as Table;

		test("has only [colors] and [metadata] at the top level", () => {
			expect(Object.keys(scheme).sort()).toEqual(["colors", "metadata"]);
		});

		// WezTerm refuses to load a scheme without colors.ansi ("scheme is
		// missing ANSI colors").
		test("defines 8 ansi and 8 brights colors directly under [colors]", () => {
			for (const key of ["ansi", "brights"]) {
				const list = colors[key];
				expect(Array.isArray(list)).toBe(true);
				expect(list as string[]).toHaveLength(8);
				for (const color of list as string[]) {
					expect(color).toMatch(HEX_COLOR);
				}
			}
		});

		test("tab bar tab tables contain only bg_color and fg_color", () => {
			const tabBar = colors.tab_bar as Table;
			for (const tab of ["active_tab", "inactive_tab", "new_tab"]) {
				expect(Object.keys(tabBar[tab] as Table).sort()).toEqual([
					"bg_color",
					"fg_color",
				]);
			}
		});

		// WezTerm names a scheme from metadata.name, else the file stem. The
		// README tells users to set color_scheme to the display name.
		test("metadata.name is the display name used in the README", () => {
			expect((scheme.metadata as Table)?.name).toBe(
				VARIANT_DISPLAY_NAMES[variant],
			);
		});
	});
}
