import { ensureContrast, rgbToHex } from "../colorUtils";
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
import { VARIANT_TYPE } from "../types";
import { resolveUIColor } from "../uiMapping";

export interface NeovimHighlightGroup {
	fg?: string;
	bg?: string;
	sp?: string;
	blend?: number;
	bold?: boolean;
	italic?: boolean;
	underline?: boolean;
	undercurl?: boolean;
	strikethrough?: boolean;
	reverse?: boolean;
	link?: string;
}

export interface NeovimVariantPalette {
	meta: { name: string; variant: string; type: "dark" | "light" };
	ui: Record<string, NeovimHighlightGroup>;
	syntaxTreesitter: Record<string, NeovimHighlightGroup>;
	syntaxClassic: Record<string, NeovimHighlightGroup>;
	lspLinks: Record<string, string>;
	terminal: string[];
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
function floorPc(
	palette: Palette,
	colorName: string,
	bgRgb: [number, number, number],
	minRatio = 3,
): string {
	const color = resolveColor(palette, colorName);
	const adjusted = ensureContrast(color.rgb, bgRgb, minRatio);
	return `#${rgbToHex(...adjusted)}`;
}

const TS_TO_CLASSIC: Record<string, string> = {
	comment: "Comment",
	"comment.block": "Comment",
	"comment.line": "Comment",
	"comment.line.double-slash": "Comment",
	"comment.line.number-sign": "Comment",
	"comment.triple-slash": "Comment",
	string: "String",
	"string.quoted.double": "String",
	"string.quoted.single": "String",
	"string.quoted.triple": "String",
	"string.unquoted": "String",
	"string.regexp": "String",
	"constant.character.escape": "SpecialChar",
	"constant.character.escape.backslash": "SpecialChar",
	"constant.numeric": "Number",
	"constant.numeric.float": "Number",
	"constant.numeric.integer": "Number",
	"constant.numeric.hex": "Number",
	"constant.numeric.octal": "Number",
	"constant.numeric.binary": "Number",
	"constant.language.boolean": "Boolean",
	"constant.language.true": "Boolean",
	"constant.language.false": "Boolean",
	constant: "Constant",
	"constant.language": "Constant",
	"constant.language.null": "Constant",
	"constant.language.undefined": "Constant",
	"constant.language.nan": "Constant",
	keyword: "Keyword",
	"keyword.control": "Keyword",
	"keyword.control.import": "Keyword",
	"keyword.control.from": "Keyword",
	"keyword.control.export": "Keyword",
	"keyword.control.return": "Keyword",
	"keyword.control.flow": "Keyword",
	"keyword.control.conditional": "Keyword",
	"keyword.control.loop": "Keyword",
	"keyword.operator": "Operator",
	"keyword.operator.arithmetic": "Operator",
	"keyword.operator.assignment": "Operator",
	"keyword.operator.comparison": "Operator",
	"keyword.operator.logical": "Operator",
	"keyword.operator.new": "Operator",
	"keyword.operator.expression": "Operator",
	"storage.type": "Type",
	"storage.type.class": "Type",
	"storage.type.enum": "Type",
	"storage.type.interface": "Type",
	"storage.type.struct": "Type",
	"storage.type.function": "Type",
	"storage.type.method": "Type",
	"storage.modifier": "StorageClass",
	"storage.modifier.async": "StorageClass",
	"storage.modifier.const": "StorageClass",
	"storage.modifier.static": "StorageClass",
	"storage.modifier.abstract": "StorageClass",
	"storage.modifier.readonly": "StorageClass",
	"storage.modifier.mutable": "StorageClass",
	"storage.modifier.private": "StorageClass",
	"storage.modifier.public": "StorageClass",
	"storage.modifier.protected": "StorageClass",
	"entity.name.function": "Function",
	"entity.name.function.member": "Function",
	"entity.name.function.constructor": "Function",
	"entity.name.type.class": "Type",
	"entity.name.type": "Type",
	"entity.name.type.enum": "Type",
	"entity.name.type.interface": "Type",
	"entity.name.type.struct": "Type",
	"entity.name.type.alias": "Type",
	"entity.name.namespace": "Identifier",
	"entity.name.module": "Identifier",
	"entity.name.package": "Identifier",
	"entity.name.tag": "Tag",
	"entity.name.tag.html": "Tag",
	"entity.name.tag.xml": "Tag",
	"entity.name.tag.jsx": "Tag",
	"entity.other.attribute": "Identifier",
	"entity.other.attribute-name": "Identifier",
	"entity.other.attribute-name.html": "Identifier",
	"entity.other.attribute-name.xml": "Identifier",
	"entity.other.attribute-name.jsx": "Identifier",
	"entity.other.attribute-name.css": "Identifier",
	"entity.name.selector": "Structure",
	variable: "Identifier",
	"variable.other": "Identifier",
	"variable.other.member": "Identifier",
	"variable.other.object": "Identifier",
	"variable.other.constant": "Identifier",
	"variable.parameter": "Identifier",
	"entity.name.variable.parameter": "Identifier",
	"variable.other.property": "Identifier",
	"entity.name.variable.member": "Identifier",
	"support.function": "Function",
	"support.type": "Type",
	"support.class": "Type",
	"meta.function-call": "Normal",
	"meta.method-call": "Normal",
	"meta.method": "Normal",
	"meta.var": "Normal",
	"meta.property": "Normal",
	"meta.attribute": "Normal",
	"meta.selector": "Normal",
	"meta.brace": "Normal",
	"meta.preprocessor": "PreProc",
	"meta.preprocessor.directive": "PreProc",
	"meta.deprecated": "Comment",
	punctuation: "Delimiter",
	"punctuation.terminator": "Delimiter",
	"punctuation.separator": "Delimiter",
	"punctuation.separator.colon": "Delimiter",
	"punctuation.separator.comma": "Delimiter",
	"punctuation.separator.dot": "Delimiter",
	"punctuation.separator.arrow": "Delimiter",
	"punctuation.separator.key-value": "Delimiter",
	"punctuation.section": "Delimiter",
	"punctuation.section.brackets": "Delimiter",
	"punctuation.section.parens": "Delimiter",
	"punctuation.section.braces": "Delimiter",
	"punctuation.definition.brackets": "Delimiter",
	"punctuation.definition.parens": "Delimiter",
	"punctuation.definition.braces": "Delimiter",
	"keyword.control.directive": "PreProc",
	"keyword.control.preprocessor": "PreProc",
	"string.other.link": "Underlined",
	"markup.underline.link": "Underlined",
	"constant.other.reference.link": "Underlined",
	"markup.heading": "Title",
	"entity.name.section": "Title",
	heading: "Title",
	"markup.bold": "Bold",
	"markup.italic": "Italic",
	"markup.deleted": "Comment",
	"markup.strikethrough": "Comment",
	invalid: "Error",
	"invalid.illegal": "Error",
	"invalid.deprecated": "Error",
	decorator: "Identifier",
	"meta.decorator": "Identifier",
};

function resolveClassicGroup(scope: string): string | null {
	if (TS_TO_CLASSIC[scope]) return TS_TO_CLASSIC[scope];
	const parts = scope.split(".");
	for (let i = parts.length; i > 0; i--) {
		const key = parts.slice(0, i).join(".");
		if (TS_TO_CLASSIC[key]) return TS_TO_CLASSIC[key];
	}
	return null;
}

function buildSyntaxGroups(
	palette: Palette,
	syntaxMapping: SyntaxMapping,
	uiMapping: UIMapping,
	scopes: ScopeEntry[],
	fontStyles: Record<string, FontStyleMapping>,
): {
	treesitter: Record<string, NeovimHighlightGroup>;
	classic: Record<string, NeovimHighlightGroup>;
} {
	const treesitter: Record<string, NeovimHighlightGroup> = {};
	const classic: Record<string, NeovimHighlightGroup> = {};

	for (const entry of scopes) {
		const group: NeovimHighlightGroup = {};

		const parts = entry.syntaxRole.split(".");
		const syntaxGroup = (
			syntaxMapping as unknown as Record<string, Record<string, string>>
		)[parts[0]];
		if (syntaxGroup?.[parts[1]]) {
			group.fg = resolveSyntaxColor(syntaxMapping, palette, entry.syntaxRole);
		} else {
			group.fg = resolveUIColor(uiMapping, palette, parts[0], parts[1]);
		}

		const fontStyle = fontStyles[entry.syntaxRole];
		if (fontStyle) {
			if (fontStyle.fontStyle === "italic") group.italic = true;
			if (fontStyle.fontWeight === "bold") group.bold = true;
		}

		if (entry.syntaxRole === "invalid.deprecated") {
			group.strikethrough = true;
		}

		for (const scope of entry.scope) {
			const tsGroup = `@${scope}`;
			treesitter[tsGroup] = group;

			const classicGroup = resolveClassicGroup(scope);
			if (classicGroup && !classic[classicGroup]) {
				classic[classicGroup] = { ...group };
			}
		}
	}

	return { treesitter, classic };
}

function buildUIGroups(
	variant: VariantName,
	palette: Palette,
	uiMapping: UIMapping,
): Record<string, NeovimHighlightGroup> {
	const type = VARIANT_TYPE[variant];
	const _isDark = type === "dark";

	return {
		Normal: {
			fg: uc(uiMapping, palette, "editor", "foreground"),
			bg: uc(uiMapping, palette, "editor", "background"),
		},
		NormalNC: {
			fg: uc(uiMapping, palette, "text", "tertiary"),
			bg: uc(uiMapping, palette, "editor", "background"),
		},
		NormalFloat: {
			fg: uc(uiMapping, palette, "text", "primary"),
			bg: uc(uiMapping, palette, "background", "base"),
		},
		StatusLine: {
			fg: uc(uiMapping, palette, "text", "primary"),
			bg: uc(uiMapping, palette, "surface", "active"),
		},
		StatusLineNC: {
			fg: uc(uiMapping, palette, "text", "tertiary"),
			bg: uc(uiMapping, palette, "surface", "default"),
		},
		TabLine: {
			fg: uc(uiMapping, palette, "text", "tertiary"),
			bg: uc(uiMapping, palette, "background", "deepest"),
		},
		TabLineFill: { bg: uc(uiMapping, palette, "background", "deepest") },
		TabLineSel: {
			fg: uc(uiMapping, palette, "text", "primary"),
			bg: uc(uiMapping, palette, "background", "base"),
		},
		CursorLine: {
			bg: uc(uiMapping, palette, "editor", "active_line_background"),
		},
		CursorColumn: {
			bg: uc(uiMapping, palette, "editor", "active_line_background"),
		},
		LineNr: {
			fg: uc(uiMapping, palette, "editor", "line_number"),
			bg: uc(uiMapping, palette, "editor", "background"),
		},
		CursorLineNr: {
			fg: uc(uiMapping, palette, "editor", "active_line_number"),
		},
		SignColumn: { bg: uc(uiMapping, palette, "editor", "background") },
		VertSplit: { fg: uc(uiMapping, palette, "surface", "default") },
		WinSeparator: { fg: uc(uiMapping, palette, "border", "default") },
		FloatBorder: { fg: uc(uiMapping, palette, "border", "focused") },
		FloatTitle: { fg: uc(uiMapping, palette, "text", "primary") },
		Pmenu: {
			fg: uc(uiMapping, palette, "text", "primary"),
			bg: uc(uiMapping, palette, "surface", "default"),
		},
		PmenuSel: {
			fg: uc(uiMapping, palette, "text", "primary"),
			bg: uc(uiMapping, palette, "surface", "hover"),
		},
		PmenuThumb: { bg: uc(uiMapping, palette, "surface", "active") },
		PmenuSbar: { bg: uc(uiMapping, palette, "surface", "default") },
		Visual: { bg: uc(uiMapping, palette, "editor", "selection"), blend: 15 },
		Search: {
			fg: uc(uiMapping, palette, "text", "on_accent"),
			bg: uc(uiMapping, palette, "editor", "find_match"),
		},
		IncSearch: {
			fg: uc(uiMapping, palette, "text", "on_accent"),
			bg: uc(uiMapping, palette, "editor", "find_active_match"),
		},
		Folded: {
			fg: uc(uiMapping, palette, "text", "tertiary"),
			bg: uc(uiMapping, palette, "surface", "default"),
		},
		FoldColumn: {
			fg: uc(uiMapping, palette, "text", "tertiary"),
			bg: uc(uiMapping, palette, "background", "base"),
		},
		DiagnosticError: { fg: uc(uiMapping, palette, "status", "error") },
		DiagnosticWarn: { fg: uc(uiMapping, palette, "status", "warning") },
		DiagnosticInfo: { fg: uc(uiMapping, palette, "status", "info") },
		DiagnosticHint: { fg: uc(uiMapping, palette, "status", "success") },
		DiagnosticUnderlineError: {
			sp: uc(uiMapping, palette, "status", "error"),
			undercurl: true,
		},
		DiagnosticUnderlineWarn: {
			sp: uc(uiMapping, palette, "status", "warning"),
			undercurl: true,
		},
		DiagnosticUnderlineInfo: {
			sp: uc(uiMapping, palette, "status", "info"),
			undercurl: true,
		},
		DiagnosticUnderlineHint: {
			sp: uc(uiMapping, palette, "status", "success"),
			undercurl: true,
		},
		ErrorMsg: { fg: uc(uiMapping, palette, "status", "error") },
		WarningMsg: { fg: uc(uiMapping, palette, "status", "warning") },
		MsgArea: { fg: uc(uiMapping, palette, "text", "primary") },
		MsgSeparator: { fg: uc(uiMapping, palette, "text", "tertiary") },
		MoreMsg: { fg: uc(uiMapping, palette, "text", "accent") },
		ModeMsg: { fg: uc(uiMapping, palette, "text", "primary"), bold: true },
		NonText: { fg: uc(uiMapping, palette, "editor", "line_number") },
		Whitespace: { fg: uc(uiMapping, palette, "editor", "line_number") },
		SpecialKey: { fg: uc(uiMapping, palette, "editor", "line_number") },
		EndOfBuffer: { fg: uc(uiMapping, palette, "editor", "background") },
		Directory: { fg: uc(uiMapping, palette, "text", "accent") },
		MatchParen: {
			fg: uc(uiMapping, palette, "editor", "find_active_match"),
			bold: true,
		},
		ColorColumn: { bg: uc(uiMapping, palette, "surface", "default") },
		Conceal: {
			fg: uc(uiMapping, palette, "text", "tertiary"),
			bg: uc(uiMapping, palette, "editor", "background"),
		},
		Cursor: {
			fg: uc(uiMapping, palette, "text", "on_accent"),
			bg: uc(uiMapping, palette, "editor", "cursor"),
		},
		lCursor: { link: "Cursor" },
		CursorIM: { link: "Cursor" },
		TermCursor: { link: "Cursor" },
		TermCursorNC: { bg: uc(uiMapping, palette, "editor", "cursor") },
		QuickFixLine: { bg: uc(uiMapping, palette, "surface", "hover") },
		WildMenu: {
			fg: uc(uiMapping, palette, "text", "primary"),
			bg: uc(uiMapping, palette, "surface", "hover"),
		},
		Substitute: { bg: uc(uiMapping, palette, "editor", "find_match") },
		SpellBad: {
			sp: uc(uiMapping, palette, "status", "error"),
			undercurl: true,
		},
		SpellCap: {
			sp: uc(uiMapping, palette, "status", "warning"),
			undercurl: true,
		},
		SpellLocal: {
			sp: uc(uiMapping, palette, "status", "info"),
			undercurl: true,
		},
		SpellRare: {
			sp: uc(uiMapping, palette, "status", "success"),
			undercurl: true,
		},
		Question: { fg: uc(uiMapping, palette, "text", "accent") },
		Bold: { bold: true },
		Italic: { italic: true },
		Underlined: { underline: true },
		DiffAdd: { fg: uc(uiMapping, palette, "vcs", "added") },
		DiffChange: { fg: uc(uiMapping, palette, "vcs", "modified") },
		DiffDelete: { fg: uc(uiMapping, palette, "vcs", "deleted") },
		DiffText: { fg: pc(palette, "lavender") },
	};
}

export function generateNeovimPalette(
	variant: VariantName,
	palette: Palette,
	uiMapping: UIMapping,
	syntaxMapping: SyntaxMapping,
	scopes: ScopeEntry[],
	fontStyles: Record<string, FontStyleMapping>,
): NeovimVariantPalette {
	const name = `synthpunk-${variant}`;
	const type = VARIANT_TYPE[variant];
	const isDark = type === "dark";

	const ui = buildUIGroups(variant, palette, uiMapping);
	const syntaxGroups = buildSyntaxGroups(
		palette,
		syntaxMapping,
		uiMapping,
		scopes,
		fontStyles,
	);

	// Terminal background is the editor background (base); floor chromatic ANSI
	// text colors against it so they stay legible (no-op on dark themes).
	const terminalBgRgb = resolveColor(palette, "base").rgb;
	const t = uiMapping.terminal;

	const terminal: string[] = [];
	if (isDark) {
		terminal.push(pc(palette, "crust"));
	} else {
		terminal.push(pc(palette, "text"));
	}
	terminal.push(floorPc(palette, t.red, terminalBgRgb));
	terminal.push(floorPc(palette, t.green, terminalBgRgb));
	terminal.push(floorPc(palette, t.yellow, terminalBgRgb));
	terminal.push(floorPc(palette, t.blue, terminalBgRgb));
	terminal.push(floorPc(palette, t.magenta, terminalBgRgb));
	terminal.push(floorPc(palette, t.cyan, terminalBgRgb));
	if (isDark) {
		terminal.push(uc(uiMapping, palette, "terminal", "white"));
	} else {
		terminal.push(pc(palette, "subtext1"));
	}
	if (isDark) {
		terminal.push(uc(uiMapping, palette, "terminal", "bright_black"));
	} else {
		terminal.push(pc(palette, "subtext1"));
	}
	terminal.push(floorPc(palette, t.bright_red, terminalBgRgb));
	terminal.push(floorPc(palette, t.bright_green, terminalBgRgb));
	terminal.push(floorPc(palette, t.bright_yellow, terminalBgRgb));
	terminal.push(floorPc(palette, t.bright_blue, terminalBgRgb));
	terminal.push(floorPc(palette, t.bright_magenta, terminalBgRgb));
	terminal.push(floorPc(palette, t.bright_cyan, terminalBgRgb));
	terminal.push(uc(uiMapping, palette, "terminal", "bright_white"));

	const lspLinks: Record<string, string> = {
		"@lsp.type.class": "@type",
		"@lsp.type.comment": "@comment",
		"@lsp.type.decorator": "@attribute",
		"@lsp.type.enum": "@type",
		"@lsp.type.enumMember": "@constant",
		"@lsp.type.event": "@type",
		"@lsp.type.function": "@function",
		"@lsp.type.interface": "@type",
		"@lsp.type.keyword": "@keyword",
		"@lsp.type.macro": "@constant",
		"@lsp.type.method": "@function.method",
		"@lsp.type.namespace": "@namespace",
		"@lsp.type.number": "@number",
		"@lsp.type.operator": "@operator",
		"@lsp.type.parameter": "@variable.parameter",
		"@lsp.type.property": "@property",
		"@lsp.type.regexp": "@string",
		"@lsp.type.string": "@string",
		"@lsp.type.struct": "@type",
		"@lsp.type.type": "@type",
		"@lsp.type.typeParameter": "@type",
		"@lsp.type.variable": "@variable",
	};

	return {
		meta: { name, variant, type },
		ui,
		syntaxTreesitter: syntaxGroups.treesitter,
		syntaxClassic: syntaxGroups.classic,
		lspLinks,
		terminal,
	};
}

function stringifyNeovimLuaValue(value: unknown, indent: number = 0): string {
	const pad = "  ".repeat(indent);
	const padInner = "  ".repeat(indent + 1);

	if (value === null || value === undefined) return "nil";
	if (typeof value === "boolean") return value ? "true" : "false";
	if (typeof value === "number") return String(value);
	if (typeof value === "string") {
		if (value.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/)) return value;
		return `"${value}"`;
	}
	if (Array.isArray(value)) {
		if (value.length === 0) return "{}";
		const items = value
			.map((v) => `${padInner}${stringifyNeovimLuaValue(v, indent + 1)}`)
			.join(",\n");
		return `{\n${items}\n${pad}}`;
	}
	if (typeof value === "object") {
		const entries = Object.entries(value as Record<string, unknown>);
		if (entries.length === 0) return "{}";
		const items = entries
			.map(([k, v]) => {
				const key = k.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/) ? k : `["${k}"]`;
				return `${padInner}${key} = ${stringifyNeovimLuaValue(v, indent + 1)}`;
			})
			.join(",\n");
		return `{\n${items}\n${pad}}`;
	}
	return "nil";
}

function stringifyNeovimVariantPalette(p: NeovimVariantPalette): string {
	return stringifyNeovimLuaValue({
		meta: p.meta,
		ui: p.ui,
		syntaxTreesitter: p.syntaxTreesitter,
		syntaxClassic: p.syntaxClassic,
		lspLinks: p.lspLinks,
		terminal: p.terminal,
	});
}

export function stringifyNeovimThemeModule(
	pastelDark: NeovimVariantPalette,
	pastelLight: NeovimVariantPalette,
	neonDark: NeovimVariantPalette,
	neonLight: NeovimVariantPalette,
): string {
	const lines: string[] = [];

	lines.push("-- Synthpunk Neovim theme — generated; do not edit");
	lines.push("");
	lines.push("local M = {}");
	lines.push("");
	lines.push("local variants = {");
	lines.push(
		`  ["pastel-dark"] = ${stringifyNeovimVariantPalette(pastelDark)},`,
	);
	lines.push(
		`  ["pastel-light"] = ${stringifyNeovimVariantPalette(pastelLight)},`,
	);
	lines.push(`  ["neon-dark"] = ${stringifyNeovimVariantPalette(neonDark)},`);
	lines.push(`  ["neon-light"] = ${stringifyNeovimVariantPalette(neonLight)},`);
	lines.push("}");
	lines.push("");
	lines.push("local function hl(group, opts)");
	lines.push("  if opts.link then");
	lines.push("    vim.api.nvim_set_hl(0, group, { link = opts.link })");
	lines.push("    return");
	lines.push("  end");
	lines.push("  local ok, result = pcall(vim.api.nvim_set_hl, 0, group, opts)");
	lines.push("  if not ok then");
	lines.push(
		"    vim.api.nvim_set_hl(0, group, { fg = opts.fg, bg = opts.bg })",
	);
	lines.push("  end");
	lines.push("end");
	lines.push("");
	lines.push("function M.apply(variant)");
	lines.push("  local palette = variants[variant]");
	lines.push("  if not palette then");
	lines.push(
		'    vim.notify("synthpunk: unknown variant \\"" .. variant .. "\\"", vim.log.levels.ERROR)',
	);
	lines.push("    return");
	lines.push("  end");
	lines.push("");
	lines.push("  vim.o.termguicolors = true");
	lines.push("  vim.o.background = palette.meta.type");
	lines.push("");
	lines.push("  for group, opts in pairs(palette.ui) do hl(group, opts) end");
	lines.push(
		"  for group, opts in pairs(palette.syntaxTreesitter) do hl(group, opts) end",
	);
	lines.push(
		"  for group, opts in pairs(palette.syntaxClassic) do hl(group, opts) end",
	);
	lines.push(
		"  for from, to in pairs(palette.lspLinks) do hl(from, { link = to }) end",
	);
	lines.push("");
	lines.push("  for i, color in ipairs(palette.terminal) do");
	lines.push('    vim.g["terminal_color_" .. (i - 1)] = color');
	lines.push("  end");
	lines.push("end");
	lines.push("");
	lines.push("return M");
	lines.push("");

	return lines.join("\n");
}

export function stringifyNeovimColorsFile(variant: VariantName): string {
	const lines: string[] = [];
	lines.push("-- Synthpunk Neovim colorscheme — generated; do not edit");
	lines.push(`vim.g.colors_name = "synthpunk-${variant}"`);
	lines.push(`require("synthpunk.theme").apply("${variant}")`);
	lines.push("");
	return lines.join("\n");
}
