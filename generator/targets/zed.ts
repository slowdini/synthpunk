import { adjustBrightness, ensureContrast } from "../colorUtils";
import { resolveColor } from "../palette";
import type {
	FontStyleMapping,
	Palette,
	SyntaxMapping,
	UIMapping,
} from "../types";

interface ZedSyntaxToken {
	color: string;
	font_style: string | null;
	font_weight: number | null;
}

interface ZedPlayer {
	cursor: string;
	background: string;
	selection: string;
}

interface ZedStyle {
	[key: string]: string | null | Record<string, ZedSyntaxToken> | ZedPlayer[];
	syntax: Record<string, ZedSyntaxToken>;
	players: ZedPlayer[];
}

interface ZedThemeVariant {
	name: string;
	appearance: "dark" | "light";
	style: ZedStyle;
}

export interface ZedTheme {
	$schema: string;
	name: string;
	author: string;
	themes: ZedThemeVariant[];
}

function hex8(palette: Palette, colorName: string, alpha: number = 1): string {
	const color = resolveColor(palette, colorName);
	if (alpha >= 1) {
		return `#${color.hex}ff`;
	}
	const a = Math.round(alpha * 255)
		.toString(16)
		.padStart(2, "0")
		.toLowerCase();
	return `#${color.hex}${a}`;
}

function hex8rgb(rgb: [number, number, number], alpha: number = 1): string {
	const hex = rgb
		.map((c) =>
			Math.max(0, Math.min(255, Math.round(c)))
				.toString(16)
				.padStart(2, "0")
				.toUpperCase(),
		)
		.join("");
	if (alpha >= 1) {
		return `#${hex}ff`;
	}
	const a = Math.round(alpha * 255)
		.toString(16)
		.padStart(2, "0")
		.toLowerCase();
	return `#${hex}${a}`;
}

// Resolve a color and nudge it just enough to stay legible against the
// terminal background. No-op when it already clears the floor (dark themes).
function floor8(
	palette: Palette,
	colorName: string,
	bgRgb: [number, number, number],
	alpha: number = 1,
	minRatio = 3,
): string {
	const color = resolveColor(palette, colorName);
	const adjusted = ensureContrast(color.rgb, bgRgb, minRatio);
	return hex8rgb(adjusted, alpha);
}

// "Bright" = more emphasized than the base: lighter on a dark background,
// darker on a light one, then floored for legibility.
function bright8(
	palette: Palette,
	colorName: string,
	isDark: boolean,
	bgRgb: [number, number, number],
	factor: number = 0.2,
	alpha: number = 1,
): string {
	const color = resolveColor(palette, colorName);
	const emphasized = adjustBrightness(
		color.rgb,
		factor,
		isDark ? "lighten" : "dim",
	);
	const adjusted = ensureContrast(emphasized, bgRgb, 3);
	return hex8rgb(adjusted, alpha);
}

function dim8(
	palette: Palette,
	colorName: string,
	factor: number = 0.3,
	alpha: number = 1,
): string {
	const color = resolveColor(palette, colorName);
	const dimRgb = adjustBrightness(color.rgb, factor, "dim");
	return hex8rgb(dimRgb, alpha);
}

function syn(
	colorName: string,
	palette: Palette,
	fontStyle: string | null = null,
	fontWeight: number | null = null,
): ZedSyntaxToken {
	return {
		color: hex8(palette, colorName),
		font_style: fontStyle,
		font_weight: fontWeight,
	};
}

function buildUIStyle(
	palette: Palette,
	isDark: boolean,
): Record<string, string | null> {
	const s = (colorName: string, alpha?: number) =>
		hex8(palette, colorName, alpha);
	// Terminal background is the editor background; floor chromatic ANSI text
	// against it so it stays legible (no-op on dark themes).
	const bgRgb = resolveColor(palette, "base").rgb;

	const result: Record<string, string | null> = {
		border: s("surface1"),
		"border.variant": s("surface0"),
		"border.focused": s("lavender"),
		"border.selected": isDark ? s("teal", 0.2) : s("pink", 0.2),
		"border.transparent": "#00000000",
		"border.disabled": s("surface0"),
		"elevated_surface.background": s("mantle"),
		"surface.background": s("mantle"),
		background: s("base"),
		"element.background": s("mantle"),
		"element.hover": s("surface0"),
		"element.active": s("surface1"),
		"element.selected": s("surface1"),
		"element.disabled": s("surface0"),
		"drop_target.background": s("overlay", 0.5),
		"ghost_element.background": "#00000000",
		"ghost_element.hover": s("surface0"),
		"ghost_element.active": s("surface1"),
		"ghost_element.selected": s("surface1"),
		"ghost_element.disabled": s("surface0"),
		text: s("text"),
		"text.muted": s("subtext1"),
		"text.placeholder": s("subtext0"),
		"text.disabled": s("subtext0"),
		"text.accent": isDark ? s("teal") : s("pink"),
		icon: s("text"),
		"icon.muted": s("subtext1"),
		"icon.disabled": s("subtext0"),
		"icon.placeholder": s("subtext1"),
		"icon.accent": isDark ? s("teal") : s("pink"),
		"status_bar.background": s("base"),
		"title_bar.background": s("base"),
		"title_bar.inactive_background": s("mantle"),
		"toolbar.background": s("base"),
		"tab_bar.background": s("mantle"),
		"tab.inactive_background": s("mantle"),
		"tab.active_background": s("base"),
		"search.match_background": isDark ? s("flamingo", 0.2) : s("teal", 0.2),
		"search.active_match_background": s("red", 0.2),
		"panel.background": s("mantle"),
		"panel.focused_border": null,
		"pane.focused_border": null,
		"scrollbar.thumb.background": s("subtext1", 0.3),
		"scrollbar.thumb.hover_background": s("subtext0"),
		"scrollbar.thumb.border": s("subtext0"),
		"scrollbar.track.background": "#00000000",
		"scrollbar.track.border": s("surface0"),
		"editor.foreground": s("text"),
		"editor.background": s("base"),
		"editor.gutter.background": s("base"),
		"editor.subheader.background": s("mantle"),
		"editor.active_line.background": s("surface0", 0.75),
		"editor.highlighted_line.background": s("mantle"),
		"editor.line_number": s("overlay"),
		"editor.active_line_number": isDark ? s("teal") : s("flamingo"),
		"editor.hover_line_number": s("subtext1"),
		"editor.invisible": s("overlay"),
		"editor.wrap_guide": s("text", 0.05),
		"editor.active_wrap_guide": s("text", 0.1),
		"editor.document_highlight.read_background": isDark
			? s("flamingo", 0.1)
			: s("teal", 0.1),
		"editor.document_highlight.write_background": s("overlay", 0.4),
		"terminal.background": s("base"),
		"terminal.foreground": s("text"),
		"terminal.bright_foreground": s("text"),
		"terminal.dim_foreground": s("subtext0"),
		"terminal.ansi.black": isDark ? s("crust") : s("text"),
		"terminal.ansi.bright_black": isDark ? s("subtext0") : s("subtext1"),
		"terminal.ansi.dim_black": isDark
			? dim8(palette, "text", 0.3)
			: dim8(palette, "text", 0.3),
		"terminal.ansi.red": floor8(palette, "red", bgRgb),
		"terminal.ansi.bright_red": bright8(palette, "red", isDark, bgRgb),
		"terminal.ansi.dim_red": dim8(palette, "red"),
		"terminal.ansi.green": floor8(palette, "green", bgRgb),
		"terminal.ansi.bright_green": bright8(palette, "green", isDark, bgRgb),
		"terminal.ansi.dim_green": dim8(palette, "green"),
		"terminal.ansi.yellow": floor8(palette, "yellow", bgRgb),
		"terminal.ansi.bright_yellow": bright8(palette, "yellow", isDark, bgRgb),
		"terminal.ansi.dim_yellow": dim8(palette, "yellow"),
		"terminal.ansi.blue": floor8(palette, "blue", bgRgb),
		"terminal.ansi.bright_blue": bright8(palette, "blue", isDark, bgRgb),
		"terminal.ansi.dim_blue": dim8(palette, "blue"),
		"terminal.ansi.magenta": floor8(palette, "pink", bgRgb),
		"terminal.ansi.bright_magenta": bright8(palette, "pink", isDark, bgRgb),
		"terminal.ansi.dim_magenta": dim8(palette, "pink"),
		"terminal.ansi.cyan": floor8(palette, "teal", bgRgb),
		"terminal.ansi.bright_cyan": bright8(palette, "teal", isDark, bgRgb),
		"terminal.ansi.dim_cyan": dim8(palette, "teal"),
		"terminal.ansi.white": isDark ? s("subtext1") : s("subtext0"),
		"terminal.ansi.bright_white": s("text"),
		"terminal.ansi.dim_white": dim8(palette, "overlay"),
		"link_text.hover": isDark ? s("sky") : s("blue"),
		"version_control.added": s("green"),
		"version_control.modified": s("yellow"),
		"version_control.word_added": s("green", 0.35),
		"version_control.word_deleted": s("red", 0.8),
		"version_control.deleted": s("red"),
		"version_control.conflict_marker.ours": s("green", 0.15),
		"version_control.conflict_marker.theirs": s("blue", 0.15),
		conflict: s("yellow"),
		"conflict.background": s("yellow", 0.1),
		"conflict.border": s("yellow", 0.2),
		created: s("green"),
		"created.background": s("green", 0.1),
		"created.border": s("green", 0.2),
		deleted: s("red"),
		"deleted.background": s("red", 0.1),
		"deleted.border": s("red", 0.2),
		error: s("red"),
		"error.background": s("red", 0.1),
		"error.border": s("red", 0.2),
		hidden: s("subtext0"),
		"hidden.background": s("subtext0", 0.1),
		"hidden.border": s("subtext0", 0.2),
		hint: s("sapphire"),
		"hint.background": s("sapphire", 0.1),
		"hint.border": s("sapphire", 0.2),
		ignored: s("subtext0"),
		"ignored.background": s("subtext0", 0.1),
		"ignored.border": s("subtext0", 0.2),
		info: s("blue"),
		"info.background": s("blue", 0.1),
		"info.border": s("blue", 0.2),
		modified: s("yellow"),
		"modified.background": s("yellow", 0.1),
		"modified.border": s("yellow", 0.2),
		predictive: s("subtext0"),
		"predictive.background": s("subtext0", 0.1),
		"predictive.border": s("subtext0", 0.2),
		renamed: s("blue"),
		"renamed.background": s("blue", 0.1),
		"renamed.border": s("blue", 0.2),
		success: s("green"),
		"success.background": s("green", 0.1),
		"success.border": s("green", 0.2),
		unreachable: s("subtext1"),
		"unreachable.background": s("subtext1", 0.1),
		"unreachable.border": s("subtext1", 0.2),
		warning: s("yellow"),
		"warning.background": s("yellow", 0.1),
		"warning.border": s("yellow", 0.2),
	};

	return result;
}

function buildSyntax(
	palette: Palette,
	isDark: boolean,
	fontStyles: Record<string, FontStyleMapping>,
): Record<string, ZedSyntaxToken> {
	const syntax: Record<string, ZedSyntaxToken> = {};

	syntax.attribute = syn("yellow", palette);
	syntax.boolean = syn("peach", palette);
	syntax.comment = syn("overlay", palette);
	syntax["comment.doc"] = syn("subtext0", palette);
	syntax.constant = syn("peach", palette);
	syntax.embedded = syn("text", palette);
	syntax.string = syn("green", palette);
	syntax["string.escape"] = syn("pink", palette);
	syntax["string.regex"] = syn("peach", palette);
	syntax["string.special"] = syn("peach", palette);
	syntax["string.special.symbol"] = syn("peach", palette);
	syntax.tag = syn("green", palette);
	syntax["text.literal"] = syn("green", palette);
	syntax.number = syn("peach", palette);
	syntax.operator = syn("maroon", palette);
	syntax.namespace = syn("flamingo", palette);
	syntax.title = syn("red", palette, null, 400);
	syntax.variable = syn("text", palette);
	syntax["variable.special"] = syn("peach", palette);
	syntax.type = syn("teal", palette);
	syntax.selector = syn("yellow", palette);
	syntax["selector.pseudo"] = isDark
		? syn("lavender", palette)
		: syn("blue", palette);
	syntax.enum = syn("teal", palette);
	syntax.link_uri = syn("sky", palette);
	syntax["punctuation.special"] = syn("pink", palette);
	syntax["punctuation.list_marker"] = syn("red", palette);
	syntax["punctuation.markup"] = syn("red", palette);
	syntax.primary = syn("text", palette);
	syntax.predictive = syn("subtext0", palette, "italic", null);

	// Dark/light divergent mappings
	syntax.keyword = isDark ? syn("teal", palette) : syn("flamingo", palette);
	syntax.preproc = isDark ? syn("teal", palette) : syn("flamingo", palette);
	syntax.property = isDark ? syn("sky", palette) : syn("teal", palette);
	// biome-ignore lint/complexity/useLiteralKeys: typescript conflicts
	syntax["constructor"] = isDark
		? syn("lavender", palette)
		: syn("blue", palette);
	syntax.function = isDark ? syn("lavender", palette) : syn("blue", palette);
	syntax.emphasis = isDark ? syn("lavender", palette) : syn("blue", palette);
	syntax.label = isDark ? syn("lavender", palette) : syn("blue", palette);
	syntax.link_text = isDark
		? syn("lavender", palette, "italic", null)
		: syn("blue", palette, "italic", null);
	syntax.variant = isDark ? syn("lavender", palette) : syn("blue", palette);
	syntax.hint = syn("sapphire", palette);
	syntax["emphasis.strong"] = syn("yellow", palette, null, 700);

	syntax.punctuation = syn("text", palette);
	syntax["punctuation.bracket"] = syn("subtext1", palette);
	syntax["punctuation.delimiter"] = syn("subtext1", palette);

	const commentLineStyle = fontStyles["comments.line"];
	if (commentLineStyle?.fontStyle === "italic") {
		syntax.comment.font_style = "italic";
		syntax["comment.doc"].font_style = "italic";
	}

	return syntax;
}

function buildPlayers(palette: Palette): ZedPlayer[] {
	const playerColors = [
		"teal",
		"flamingo",
		"sky",
		"lavender",
		"green",
		"red",
		"yellow",
		"peach",
	];
	return playerColors.map((colorName) => ({
		cursor: hex8(palette, colorName),
		background: hex8(palette, colorName),
		selection: hex8(palette, colorName, 0.24),
	}));
}

function buildZedStyle(
	palette: Palette,
	isDark: boolean,
	_uiMapping: UIMapping,
	_syntaxMapping: SyntaxMapping,
	fontStyles: Record<string, FontStyleMapping>,
): ZedStyle {
	const uiProps = buildUIStyle(palette, isDark);
	const syntax = buildSyntax(palette, isDark, fontStyles);
	const players = buildPlayers(palette);

	return {
		...uiProps,
		syntax,
		players,
	} as ZedStyle;
}

export function generateZedTheme(
	_id: string,
	displayName: string,
	author: string,
	darkPalette: Palette,
	lightPalette: Palette,
	uiMapping: UIMapping,
	syntaxMapping: SyntaxMapping,
	fontStyles: Record<string, FontStyleMapping>,
): ZedTheme {
	const darkStyle = buildZedStyle(
		darkPalette,
		true,
		uiMapping,
		syntaxMapping,
		fontStyles,
	);
	const lightStyle = buildZedStyle(
		lightPalette,
		false,
		uiMapping,
		syntaxMapping,
		fontStyles,
	);

	return {
		$schema: "https://zed.dev/schema/themes/v0.2.0.json",
		name: displayName,
		author,
		themes: [
			{
				name: `${displayName} Dark`,
				appearance: "dark",
				style: darkStyle,
			},
			{
				name: `${displayName} Light`,
				appearance: "light",
				style: lightStyle,
			},
		],
	};
}
