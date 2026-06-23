import { adjustBrightness, ensureContrast, rgbToHex } from "../colorUtils";
import { OPACITY_RULES } from "../opacity";
import { colorToHex, resolveColor } from "../palette";
import { resolveSyntaxColor } from "../syntaxMapping";
import type {
	FontStyleMapping,
	Palette,
	ScopeEntry,
	SyntaxMapping,
	UIMapping,
	VariantName,
} from "../types";
import { VARIANT_DISPLAY_NAMES, VARIANT_TYPE } from "../types";
import { resolveUIColor } from "../uiMapping";

export interface VSCodeTokenColorSetting {
	foreground?: string;
	fontStyle?: string;
	fontWeight?: string;
}

export interface VSCodeTokenColor {
	name: string;
	scope: string | string[];
	settings: VSCodeTokenColorSetting;
}

export interface VSCodeTheme {
	name: string;
	type: "dark" | "light";
	colors: Record<string, string>;
	tokenColors: VSCodeTokenColor[];
}

function uc(
	uiMapping: UIMapping,
	palette: Palette,
	group: string,
	key: string,
	alpha?: number,
): string {
	return resolveUIColor(uiMapping, palette, group, key, alpha);
}

function pc(palette: Palette, colorName: string, alpha?: number): string {
	const color = resolveColor(palette, colorName);
	return colorToHex(color, alpha);
}

// Resolve a color and nudge it just enough to stay legible against the
// terminal background. No-op when it already clears the floor (dark themes).
function floor(
	palette: Palette,
	colorName: string,
	bgRgb: [number, number, number],
	minRatio = 3,
): string {
	const color = resolveColor(palette, colorName);
	const adjusted = ensureContrast(color.rgb, bgRgb, minRatio);
	return `#${rgbToHex(...adjusted)}`;
}

// "Bright" = more emphasized than the base: lighter on a dark background,
// darker on a light one, then floored for legibility.
function bright(
	palette: Palette,
	colorName: string,
	isDark: boolean,
	bgRgb: [number, number, number],
): string {
	const color = resolveColor(palette, colorName);
	const emphasized = adjustBrightness(
		color.rgb,
		0.2,
		isDark ? "lighten" : "dim",
	);
	const adjusted = ensureContrast(emphasized, bgRgb, 3);
	return `#${rgbToHex(...adjusted)}`;
}

export function generateVSCodeTheme(
	variant: VariantName,
	palette: Palette,
	uiMapping: UIMapping,
	syntaxMapping: SyntaxMapping,
	scopes: ScopeEntry[],
	fontStyles: Record<string, FontStyleMapping>,
): VSCodeTheme {
	const name = VARIANT_DISPLAY_NAMES[variant];
	const type = VARIANT_TYPE[variant];
	const isDark = type === "dark";

	const colors: Record<string, string> = {};

	colors.focusBorder = pc(palette, "lavender");
	colors.foreground = uc(uiMapping, palette, "text", "primary");
	colors.disabledForeground = uc(uiMapping, palette, "text", "tertiary");
	colors["selection.background"] = uc(
		uiMapping,
		palette,
		"editor",
		"selection",
		OPACITY_RULES.selection,
	);
	colors.errorForeground = uc(uiMapping, palette, "status", "error");

	colors["editor.background"] = uc(uiMapping, palette, "editor", "background");
	colors["editor.foreground"] = uc(uiMapping, palette, "editor", "foreground");
	colors["editorLineNumber.foreground"] = uc(
		uiMapping,
		palette,
		"editor",
		"line_number",
	);
	colors["editorLineNumber.activeForeground"] = uc(
		uiMapping,
		palette,
		"editor",
		"active_line_number",
	);
	colors["editor.lineHighlightBackground"] = uc(
		uiMapping,
		palette,
		"editor",
		"active_line_background",
		OPACITY_RULES.active_line,
	);
	colors["editor.selectionBackground"] = uc(
		uiMapping,
		palette,
		"editor",
		"selection",
		OPACITY_RULES.selection,
	);
	colors["editor.inactiveSelectionBackground"] = uc(
		uiMapping,
		palette,
		"editor",
		"selection",
		OPACITY_RULES.inactive_selection,
	);
	colors["editorCursor.foreground"] = uc(
		uiMapping,
		palette,
		"editor",
		"cursor",
	);
	colors["editor.findMatchBackground"] = uc(
		uiMapping,
		palette,
		"editor",
		"find_match",
		OPACITY_RULES.search_match,
	);
	colors["editor.findMatchHighlightBackground"] = uc(
		uiMapping,
		palette,
		"editor",
		"find_match",
		OPACITY_RULES.search_match_border,
	);
	colors["editor.findMatchBorder"] = uc(
		uiMapping,
		palette,
		"editor",
		"find_active_match",
	);
	colors["editor.wordHighlightBackground"] = pc(
		palette,
		"lavender",
		0x1a / 255,
	);
	colors["editor.wordHighlightStrongBackground"] = uc(
		uiMapping,
		palette,
		"editor",
		"selection",
		OPACITY_RULES.word_highlight_write,
	);

	colors["merge.currentHeaderBackground"] = uc(
		uiMapping,
		palette,
		"vcs",
		"added",
		0.3,
	);
	colors["merge.currentContentBackground"] = uc(
		uiMapping,
		palette,
		"vcs",
		"added",
		0.15,
	);
	colors["merge.incomingHeaderBackground"] = pc(palette, "blue", 0.3);
	colors["merge.incomingContentBackground"] = pc(palette, "blue", 0.15);
	colors["merge.commonHeaderBackground"] = pc(palette, "subtext0", 0.3);
	colors["merge.commonContentBackground"] = pc(palette, "subtext0", 0.15);

	colors["editorGutter.background"] = uc(
		uiMapping,
		palette,
		"editor",
		"background",
	);
	colors["editorGutter.modifiedBackground"] = uc(
		uiMapping,
		palette,
		"vcs",
		"modified",
		0x80 / 255,
	);
	colors["editorGutter.addedBackground"] = uc(
		uiMapping,
		palette,
		"vcs",
		"added",
		0x80 / 255,
	);
	colors["editorGutter.deletedBackground"] = uc(
		uiMapping,
		palette,
		"vcs",
		"deleted",
		0x80 / 255,
	);

	colors["editorWhitespace.foreground"] = uc(
		uiMapping,
		palette,
		"text",
		"tertiary",
		0x40 / 255,
	);
	colors["editorIndentGuide.background1"] = uc(
		uiMapping,
		palette,
		"border",
		"default",
		0x50 / 255,
	);
	colors["editorIndentGuide.activeBackground1"] = uc(
		uiMapping,
		palette,
		"text",
		"tertiary",
		0x80 / 255,
	);

	colors["editorError.foreground"] = uc(uiMapping, palette, "status", "error");
	colors["editorWarning.foreground"] = uc(
		uiMapping,
		palette,
		"status",
		"warning",
	);
	colors["editorInfo.foreground"] = uc(uiMapping, palette, "status", "info");
	colors["editorHint.foreground"] = pc(palette, "sapphire");

	colors["activityBar.background"] = uc(
		uiMapping,
		palette,
		"background",
		"elevated",
	);
	colors["activityBar.foreground"] = uc(
		uiMapping,
		palette,
		"text",
		"secondary",
	);
	colors["activityBar.inactiveForeground"] = uc(
		uiMapping,
		palette,
		"text",
		"tertiary",
	);
	colors["activityBar.border"] = uc(uiMapping, palette, "border", "default");
	colors["activityBarBadge.background"] = uc(
		uiMapping,
		palette,
		"editor",
		"cursor",
	);
	colors["activityBarBadge.foreground"] = uc(
		uiMapping,
		palette,
		"text",
		"on_accent",
	);

	colors["sideBar.background"] = uc(
		uiMapping,
		palette,
		"background",
		"elevated",
	);
	colors["sideBar.foreground"] = uc(uiMapping, palette, "text", "primary");
	colors["sideBar.border"] = uc(uiMapping, palette, "border", "default");
	colors["sideBarSectionHeader.background"] = uc(
		uiMapping,
		palette,
		"surface",
		"active",
	);
	colors["sideBarSectionHeader.foreground"] = uc(
		uiMapping,
		palette,
		"text",
		"secondary",
	);

	colors["tab.activeBackground"] = uc(
		uiMapping,
		palette,
		"editor",
		"background",
	);
	colors["tab.inactiveBackground"] = uc(
		uiMapping,
		palette,
		"background",
		"elevated",
	);
	colors["tab.activeForeground"] = uc(uiMapping, palette, "text", "primary");
	colors["tab.inactiveForeground"] = uc(uiMapping, palette, "text", "tertiary");
	colors["tab.border"] = uc(uiMapping, palette, "border", "default");
	colors["tab.activeBorderTop"] = uc(uiMapping, palette, "border", "focused");
	colors["editorGroupHeader.tabsBackground"] = uc(
		uiMapping,
		palette,
		"background",
		"elevated",
	);
	colors["editorGroupHeader.tabsBorder"] = uc(
		uiMapping,
		palette,
		"border",
		"default",
	);

	colors["titleBar.activeBackground"] = uc(
		uiMapping,
		palette,
		"background",
		"elevated",
	);
	colors["titleBar.activeForeground"] = uc(
		uiMapping,
		palette,
		"text",
		"primary",
	);
	colors["titleBar.inactiveBackground"] = uc(
		uiMapping,
		palette,
		"background",
		"deepest",
	);
	colors["titleBar.inactiveForeground"] = uc(
		uiMapping,
		palette,
		"text",
		"tertiary",
	);
	colors["titleBar.border"] = uc(uiMapping, palette, "border", "default");

	colors["statusBar.background"] = uc(
		uiMapping,
		palette,
		"background",
		"deepest",
	);
	colors["statusBar.foreground"] = uc(uiMapping, palette, "text", "secondary");

	colors["panel.background"] = uc(uiMapping, palette, "background", "elevated");
	colors["panel.border"] = uc(uiMapping, palette, "border", "default");
	colors["panelTitle.activeForeground"] = uc(
		uiMapping,
		palette,
		"text",
		"primary",
	);
	colors["panelTitle.inactiveForeground"] = uc(
		uiMapping,
		palette,
		"text",
		"tertiary",
	);

	colors["scrollbarSlider.background"] = uc(
		uiMapping,
		palette,
		"text",
		"tertiary",
		0x4c / 255,
	);
	colors["scrollbarSlider.hoverBackground"] = uc(
		uiMapping,
		palette,
		"text",
		"tertiary",
		0x80 / 255,
	);
	colors["scrollbarSlider.activeBackground"] = uc(
		uiMapping,
		palette,
		"text",
		"secondary",
		0xb0 / 255,
	);

	colors["terminal.background"] = uc(
		uiMapping,
		palette,
		"editor",
		"background",
	);
	colors["terminal.foreground"] = uc(uiMapping, palette, "text", "primary");

	// Terminal background matches the editor background; floor chromatic ANSI
	// text colors against it so they stay legible (no-op on dark themes).
	const terminalBgRgb = resolveColor(palette, "base").rgb;
	const ansiFloor = (colorName: string) =>
		floor(palette, colorName, terminalBgRgb);
	const ansiBright = (colorName: string) =>
		bright(palette, colorName, isDark, terminalBgRgb);

	if (isDark) {
		colors["terminal.ansiBlack"] = pc(palette, "crust");
	} else {
		colors["terminal.ansiBlack"] = pc(palette, "text");
	}
	colors["terminal.ansiRed"] = ansiFloor(uiMapping.terminal.red);
	colors["terminal.ansiGreen"] = ansiFloor(uiMapping.terminal.green);
	colors["terminal.ansiYellow"] = ansiFloor(uiMapping.terminal.yellow);
	colors["terminal.ansiBlue"] = ansiFloor(uiMapping.terminal.blue);
	colors["terminal.ansiMagenta"] = ansiFloor(uiMapping.terminal.magenta);
	colors["terminal.ansiCyan"] = ansiFloor(uiMapping.terminal.cyan);
	colors["terminal.ansiWhite"] = uc(uiMapping, palette, "terminal", "white");
	colors["terminal.ansiBrightBlack"] = uc(
		uiMapping,
		palette,
		"terminal",
		"bright_black",
	);
	colors["terminal.ansiBrightRed"] = ansiBright(uiMapping.terminal.red);
	colors["terminal.ansiBrightGreen"] = ansiBright(uiMapping.terminal.green);
	colors["terminal.ansiBrightYellow"] = ansiBright(uiMapping.terminal.yellow);
	colors["terminal.ansiBrightBlue"] = ansiBright(uiMapping.terminal.blue);
	colors["terminal.ansiBrightMagenta"] = ansiBright(uiMapping.terminal.magenta);
	colors["terminal.ansiBrightCyan"] = ansiBright(uiMapping.terminal.cyan);
	// Structural "white" slot — stays light (no contrast floor / direction flip).
	colors["terminal.ansiBrightWhite"] = `#${rgbToHex(
		...adjustBrightness(
			resolveColor(palette, uiMapping.terminal.white).rgb,
			0.2,
			"lighten",
		),
	)}`;

	colors["input.background"] = uc(uiMapping, palette, "surface", "default");
	colors["input.foreground"] = uc(uiMapping, palette, "text", "primary");
	colors["input.border"] = uc(uiMapping, palette, "border", "default");
	colors["input.placeholderForeground"] = uc(
		uiMapping,
		palette,
		"text",
		"tertiary",
	);

	colors["button.background"] = uc(uiMapping, palette, "editor", "cursor");
	colors["button.foreground"] = uc(uiMapping, palette, "text", "on_accent");
	colors["button.hoverBackground"] = pc(palette, "lavender", 0xdd / 255);

	colors["badge.foreground"] = uc(uiMapping, palette, "text", "on_accent");
	colors["badge.background"] = uc(uiMapping, palette, "editor", "cursor");

	colors["progressBar.background"] = uc(uiMapping, palette, "editor", "cursor");

	colors["textLink.foreground"] = pc(palette, "sky");
	colors["textLink.activeForeground"] = pc(palette, "sky");

	colors["minimap.findMatchHighlight"] = uc(
		uiMapping,
		palette,
		"editor",
		"find_match",
	);
	colors["minimap.selectionHighlight"] = uc(
		uiMapping,
		palette,
		"editor",
		"selection",
		OPACITY_RULES.selection,
	);

	colors["editorBracketHighlight.foreground1"] = pc(palette, "lavender");
	colors["editorBracketHighlight.foreground2"] = pc(palette, "teal");
	colors["editorBracketHighlight.foreground3"] = pc(palette, "flamingo");
	colors["editorBracketHighlight.foreground4"] = pc(palette, "sky");
	colors["editorBracketHighlight.foreground5"] = pc(palette, "peach");
	colors["editorBracketHighlight.foreground6"] = pc(palette, "green");

	const tokenColors: VSCodeTokenColor[] = scopes.map((entry) => {
		const settings: VSCodeTokenColorSetting = {};

		const parts = entry.syntaxRole.split(".");
		const syntaxGroup = (
			syntaxMapping as unknown as Record<string, Record<string, string>>
		)[parts[0]];
		if (syntaxGroup?.[parts[1]]) {
			settings.foreground = resolveSyntaxColor(
				syntaxMapping,
				palette,
				entry.syntaxRole,
			);
		} else {
			settings.foreground = resolveUIColor(
				uiMapping,
				palette,
				parts[0],
				parts[1],
			);
		}

		const fontStyle = fontStyles[entry.syntaxRole];
		if (fontStyle) {
			if (fontStyle.fontStyle) settings.fontStyle = fontStyle.fontStyle;
			if (fontStyle.fontWeight) settings.fontWeight = fontStyle.fontWeight;
		}

		return {
			name: entry.name,
			scope: entry.scope,
			settings,
		};
	});

	return { name, type, colors, tokenColors };
}
