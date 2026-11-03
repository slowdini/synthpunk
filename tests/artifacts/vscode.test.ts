import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { LegibilityPair } from "../../generator/legibility";
import { VARIANT_TYPE, VARIANTS } from "../../generator/types";
import {
	ansiTier,
	expectLegible,
	flatten,
	palette,
	REPO_ROOT,
	RULES,
	textPair,
} from "./pairs";

// Text colors and the background each renders on, by VS Code color key.
const UI_PAIRS: [fg: string, bg: string][] = [
	["foreground", "sideBar.background"],
	["disabledForeground", "sideBar.background"],
	["errorForeground", "sideBar.background"],
	["editor.foreground", "editor.background"],
	["editorLineNumber.foreground", "editorGutter.background"],
	["editorLineNumber.activeForeground", "editorGutter.background"],
	["activityBar.foreground", "activityBar.background"],
	["activityBar.inactiveForeground", "activityBar.background"],
	["sideBar.foreground", "sideBar.background"],
	["sideBarSectionHeader.foreground", "sideBarSectionHeader.background"],
	["tab.activeForeground", "tab.activeBackground"],
	["tab.inactiveForeground", "tab.inactiveBackground"],
	["titleBar.activeForeground", "titleBar.activeBackground"],
	["titleBar.inactiveForeground", "titleBar.inactiveBackground"],
	["statusBar.foreground", "statusBar.background"],
	["panelTitle.activeForeground", "panel.background"],
	["panelTitle.inactiveForeground", "panel.background"],
	["terminal.foreground", "terminal.background"],
	["input.foreground", "input.background"],
	["input.placeholderForeground", "input.background"],
	["textLink.foreground", "editor.background"],
	["textLink.activeForeground", "editor.background"],
	...[1, 2, 3, 4, 5, 6].map((n): [string, string] => [
		`editorBracketHighlight.foreground${n}`,
		"editor.background",
	]),
];

// Text drawn on an accent fill, held to the fill tier.
const FILL_PAIRS: [fg: string, bg: string][] = [
	["activityBarBadge.foreground", "activityBarBadge.background"],
	["badge.foreground", "badge.background"],
	["button.foreground", "button.background"],
];

// Foreground keys that color something other than text.
const EXEMPT = new Set([
	"editorCursor.foreground", // the caret
	"editorWhitespace.foreground", // whitespace markers
	"editorError.foreground", // squiggle underlines
	"editorWarning.foreground",
	"editorInfo.foreground",
	"editorHint.foreground",
]);

// Editor backgrounds that syntax tokens are read on, drawn over the editor.
const TOKEN_BACKDROPS = [
	"editor.lineHighlightBackground",
	"editor.selectionBackground",
	"editor.inactiveSelectionBackground",
	"editor.findMatchBackground",
	"editor.findMatchHighlightBackground",
	"editor.wordHighlightBackground",
	"editor.wordHighlightStrongBackground",
];

const ANSI = [
	"Black",
	"Red",
	"Green",
	"Yellow",
	"Blue",
	"Magenta",
	"Cyan",
	"White",
];

interface VSCodeTheme {
	colors: Record<string, string>;
	tokenColors: { settings: { foreground?: string } }[];
}

for (const variant of VARIANTS) {
	describe(`themes/vscode/themes/synthpunk-${variant}-color-theme.json`, () => {
		const theme = JSON.parse(
			readFileSync(
				join(
					REPO_ROOT,
					"themes",
					"vscode",
					"themes",
					`synthpunk-${variant}-color-theme.json`,
				),
				"utf8",
			),
		) as VSCodeTheme;
		const c = theme.colors;
		const pal = palette(variant);
		const color = (key: string): string => {
			if (!c[key]) throw new Error(`theme has no "${key}"`);
			return c[key];
		};

		test("every foreground key is checked or exempt", () => {
			const checked = new Set([...UI_PAIRS, ...FILL_PAIRS].map(([fg]) => fg));
			const unchecked = Object.keys(c).filter(
				(key) =>
					/(^|\.)\w*[fF]oreground\d*$/.test(key) &&
					!key.startsWith("terminal.ansi") &&
					!checked.has(key) &&
					!EXEMPT.has(key),
			);
			expect(unchecked).toEqual([]);
		});

		test("UI text meets the legibility rules", () => {
			expectLegible([
				...UI_PAIRS.map(([fg, bg]) =>
					textPair(`${fg} on ${bg}`, color(fg), color(bg), pal),
				),
				...FILL_PAIRS.map(([fg, bg]) =>
					textPair(
						`${fg} on ${bg}`,
						color(fg),
						color(bg),
						pal,
						RULES.fills.tier,
					),
				),
			]);
		});

		test("syntax tokens meet the legibility rules on editor backgrounds", () => {
			const editorBg = color("editor.background");
			const backdrops: [string, string][] = [
				["editor.background", editorBg],
				...TOKEN_BACKDROPS.map((key): [string, string] => [
					key,
					flatten(color(key), editorBg),
				]),
			];
			const tokens = [
				...new Set(
					theme.tokenColors.flatMap((t) =>
						t.settings.foreground ? [t.settings.foreground] : [],
					),
				),
			];
			const pairs: LegibilityPair[] = tokens.flatMap((fg) =>
				backdrops.map(([key, bg]) =>
					textPair(`token ${fg} on ${key}`, fg, bg, pal),
				),
			);
			expectLegible(pairs);
		});

		test("terminal ANSI colors meet the legibility rules", () => {
			const bg = color("terminal.background");
			const names = [...ANSI, ...ANSI.map((n) => `Bright${n}`)];
			expectLegible(
				names.flatMap((name, i) => {
					const tier = ansiTier(i, VARIANT_TYPE[variant] === "dark");
					const key = `terminal.ansi${name}`;
					return tier ? [textPair(key, color(key), bg, pal, tier)] : [];
				}),
			);
		});
	});
}
