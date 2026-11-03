import { describe, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { LegibilityPair } from "../../generator/legibility";
import type { VariantName } from "../../generator/types";
import {
	ansiTier,
	expectLegible,
	flatten,
	palette,
	REPO_ROOT,
	textPair,
} from "./pairs";

// Text and icon colors drawn on general UI backgrounds.
const TEXT_KEYS = [
	"text",
	"text.muted",
	"text.placeholder",
	"text.disabled",
	"text.accent",
	"icon",
	"icon.muted",
	"icon.disabled",
	"icon.placeholder",
	"icon.accent",
	"link_text.hover",
];

// Status colors: file names in the project panel, diagnostics, git state.
const STATUS_KEYS = [
	"conflict",
	"created",
	"deleted",
	"error",
	"hidden",
	"hint",
	"ignored",
	"info",
	"modified",
	"predictive",
	"renamed",
	"success",
	"unreachable",
	"warning",
];

const VCS_KEYS = [
	"version_control.added",
	"version_control.modified",
	"version_control.deleted",
];

const UI_BACKGROUNDS = [
	"background",
	"surface.background",
	"elevated_surface.background",
	"panel.background",
	"tab_bar.background",
	"tab.active_background",
	"tab.inactive_background",
	"status_bar.background",
	"title_bar.background",
	"title_bar.inactive_background",
	"toolbar.background",
	"editor.background",
	"element.background",
	"element.hover",
	"element.selected",
	"ghost_element.hover",
	"ghost_element.selected",
];

// Translucent editor backgrounds that code is read on.
const EDITOR_OVERLAYS = [
	"editor.active_line.background",
	"search.match_background",
	"search.active_match_background",
	"editor.document_highlight.read_background",
	"editor.document_highlight.write_background",
];

const ANSI = [
	"black",
	"red",
	"green",
	"yellow",
	"blue",
	"magenta",
	"cyan",
	"white",
];

interface ZedTheme {
	name: string;
	appearance: "dark" | "light";
	style: Record<string, unknown> & {
		syntax: Record<string, { color?: string }>;
		players: { selection: string }[];
	};
}

for (const family of ["pastel", "neon"]) {
	const file = join(
		REPO_ROOT,
		"themes",
		"zed",
		"themes",
		`synthpunk-${family}.json`,
	);
	const themes = (
		JSON.parse(readFileSync(file, "utf8")) as { themes: ZedTheme[] }
	).themes;

	for (const theme of themes) {
		const variant = `${family}-${theme.appearance}` as VariantName;
		const isDark = theme.appearance === "dark";

		describe(`themes/zed/themes/synthpunk-${family}.json: ${theme.name}`, () => {
			const s = theme.style;
			const pal = palette(variant);
			const color = (key: string): string => {
				const value = s[key];
				if (typeof value !== "string") throw new Error(`theme has no "${key}"`);
				return value;
			};
			const editorBg = color("editor.background");

			test("UI text, icon, and status colors meet the legibility rules", () => {
				const pairs: LegibilityPair[] = [];
				for (const bg of UI_BACKGROUNDS) {
					for (const fg of [...TEXT_KEYS, ...STATUS_KEYS, ...VCS_KEYS]) {
						pairs.push(textPair(`${fg} on ${bg}`, color(fg), color(bg), pal));
					}
				}
				// Each status color on its own tint, drawn over the panel.
				for (const key of STATUS_KEYS) {
					const tint = flatten(
						color(`${key}.background`),
						color("panel.background"),
					);
					pairs.push(
						textPair(`${key} on ${key}.background`, color(key), tint, pal),
					);
				}
				expectLegible(pairs);
			});

			test("editor text and line numbers meet the legibility rules", () => {
				const activeLine = flatten(
					color("editor.active_line.background"),
					editorBg,
				);
				const gutter = color("editor.gutter.background");
				expectLegible([
					textPair(
						"editor.foreground",
						color("editor.foreground"),
						editorBg,
						pal,
					),
					...[
						"editor.line_number",
						"editor.active_line_number",
						"editor.hover_line_number",
					].flatMap((key) => [
						textPair(`${key} on gutter`, color(key), gutter, pal),
						textPair(`${key} on active line`, color(key), activeLine, pal),
					]),
					...["version_control.word_added", "version_control.word_deleted"].map(
						(key) =>
							textPair(
								`editor.foreground on ${key}`,
								color("editor.foreground"),
								flatten(color(key), editorBg),
								pal,
							),
					),
				]);
			});

			test("syntax colors meet the legibility rules on editor backgrounds", () => {
				const backdrops: [string, string][] = [
					["editor.background", editorBg],
					...EDITOR_OVERLAYS.map((key): [string, string] => [
						key,
						flatten(color(key), editorBg),
					]),
					["selection", flatten(s.players[0].selection, editorBg)],
				];
				const pairs = Object.entries(s.syntax).flatMap(([name, style]) =>
					style.color
						? backdrops.map(([bgName, bg]) =>
								textPair(
									`syntax.${name} on ${bgName}`,
									style.color as string,
									bg,
									pal,
								),
							)
						: [],
				);
				expectLegible(pairs);
			});

			test("terminal colors meet the legibility rules", () => {
				const bg = color("terminal.background");
				const names = [...ANSI, ...ANSI.map((n) => `bright_${n}`)];
				const pairs = [
					textPair(
						"terminal.foreground",
						color("terminal.foreground"),
						bg,
						pal,
					),
					textPair(
						"terminal.bright_foreground",
						color("terminal.bright_foreground"),
						bg,
						pal,
					),
					textPair(
						"terminal.dim_foreground",
						color("terminal.dim_foreground"),
						bg,
						pal,
						"muted",
					),
					...names.flatMap((name, i) => {
						const tier = ansiTier(i, isDark);
						const key = `terminal.ansi.${name}`;
						return tier ? [textPair(key, color(key), bg, pal, tier)] : [];
					}),
					// Dim colors are deliberately faint; hold them to the muted tier.
					...ANSI.flatMap((name, i) => {
						if (ansiTier(i, isDark) === null) return [];
						const key = `terminal.ansi.dim_${name}`;
						return [textPair(key, color(key), bg, pal, "muted")];
					}),
				];
				expectLegible(pairs);
			});
		});
	}
}
