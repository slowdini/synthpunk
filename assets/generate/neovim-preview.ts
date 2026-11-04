import type { NeovimVariantPalette } from "../../generator/targets/neovim";
import { targetShikiTheme, type TargetThemeRegistration } from "./shiki-theme";

function groupColor(
	theme: NeovimVariantPalette,
	group: string,
	key: "fg" | "bg",
	fallback = "#000000",
): string {
	return theme.ui[group]?.[key] ?? fallback;
}

function syntaxColor(theme: NeovimVariantPalette, group: string): string {
	return theme.syntaxClassic[group]?.fg ?? groupColor(theme, "Normal", "fg", "#FFFFFF");
}

function treeSitterColor(
	theme: NeovimVariantPalette,
	group: string,
	classicFallback: string,
): string {
	return theme.syntaxTreesitter[group]?.fg ?? syntaxColor(theme, classicFallback);
}

export function neovimThemeRegistration(theme: NeovimVariantPalette): TargetThemeRegistration {
	return targetShikiTheme(
		"Synthpunk Neovim Neon Dark",
		groupColor(theme, "Normal", "bg"),
		groupColor(theme, "Normal", "fg", "#FFFFFF"),
		{
			comment: syntaxColor(theme, "Comment"),
			keyword: syntaxColor(theme, "Keyword"),
			string: syntaxColor(theme, "String"),
			number: syntaxColor(theme, "Number"),
			boolean: syntaxColor(theme, "Boolean"),
			constant: syntaxColor(theme, "Constant"),
			operator: syntaxColor(theme, "Operator"),
			function: syntaxColor(theme, "Function"),
			type: syntaxColor(theme, "Type"),
			variable: treeSitterColor(theme, "@variable", "Identifier"),
			property: treeSitterColor(theme, "@variable.other.property", "Identifier"),
			namespace: treeSitterColor(theme, "@entity.name.namespace", "Identifier"),
			attribute: treeSitterColor(theme, "@entity.other.attribute", "SpecialChar"),
			tag: treeSitterColor(theme, "@entity.name.tag", "Tag"),
		},
	);
}

const MONO_FONT = "'Cascadia Code', 'Cascadia Mono', Menlo, Consolas, monospace";
const UI_FONT = "-apple-system, 'Segoe UI', system-ui, sans-serif";
const NEOVIM_CSS = `
	.neovim-preview { width: 1120px; height: 650px; overflow: hidden; border-radius: 12px; display: flex; flex-direction: column; background: var(--normal-bg); color: var(--normal-fg); font-family: ${MONO_FONT}; box-shadow: 0 30px 70px rgba(0,0,0,.55),0 0 0 1px rgba(255,255,255,.06); }
	.neovim-preview * { box-sizing: border-box; }
	.neovim-title { height: 38px; flex: 0 0 38px; display: flex; align-items: center; gap: 8px; padding: 0 14px; background: var(--tab-fill); color: var(--tab-fg); font: 12px ${UI_FONT}; }
	.neovim-title .dot { width: 11px; height: 11px; border-radius: 50%; }
	.neovim-title .name { margin-left: 8px; }
	.neovim-tabline { height: 35px; flex: 0 0 35px; display: flex; align-items: stretch; background: var(--tab-fill); color: var(--tab-fg); border-bottom: 1px solid var(--border); font-size: 12px; }
	.neovim-tab { min-width: 145px; display: flex; align-items: center; gap: 9px; padding: 0 14px; border-right: 1px solid var(--border); }
	.neovim-tab.active { color: var(--tab-active-fg); background: var(--tab-active-bg); }
	.neovim-tab .modified { color: var(--cursor-line-number); }
	.neovim-code { flex: 1; min-height: 0; overflow: hidden; padding: 10px 20px 10px 0; counter-reset: line; }
	.neovim-code pre.shiki { margin: 0; overflow: visible; background: transparent !important; }
	.neovim-code pre.shiki code { font: 14px/20px ${MONO_FONT}; }
	.neovim-code .line { display: flex; min-height: 20px; white-space: pre; counter-increment: line; }
	.neovim-code .line::before { content: counter(line); flex: 0 0 58px; padding-right: 15px; text-align: right; color: var(--line-number); font: 12px/20px ${MONO_FONT}; }
	.neovim-code .line:nth-child(12) { background: var(--cursor-line); }
	.neovim-code .line:nth-child(12)::before { color: var(--cursor-line-number); font-weight: 700; }
	.neovim-status { height: 27px; flex: 0 0 27px; display: flex; align-items: center; gap: 0; background: var(--status-bg); color: var(--status-fg); font-size: 11px; }
	.neovim-status .mode { align-self: stretch; display: flex; align-items: center; padding: 0 17px; margin-right: 16px; background: var(--cursor-line-number); color: var(--normal-bg); font-weight: 700; }
	.neovim-status .branch { margin-right: 18px; }
	.neovim-status .push { margin-left: auto; margin-right: 18px; }
	.neovim-status span:last-child { margin: 0 14px 0 18px; }
	.neovim-command { height: 28px; flex: 0 0 28px; display: flex; align-items: center; padding: 0 12px; background: var(--normal-bg); color: var(--message); font-size: 12px; }
`;

export function neovimPreviewHtml(theme: NeovimVariantPalette, codeHtml: string): string {
	const normalBg = groupColor(theme, "Normal", "bg");
	const normalFg = groupColor(theme, "Normal", "fg", "#FFFFFF");
	const variables = [
		`--normal-bg:${normalBg}`,
		`--normal-fg:${normalFg}`,
		`--status-bg:${groupColor(theme, "StatusLine", "bg", normalBg)}`,
		`--status-fg:${groupColor(theme, "StatusLine", "fg", normalFg)}`,
		`--tab-fill:${groupColor(theme, "TabLineFill", "bg", normalBg)}`,
		`--tab-fg:${groupColor(theme, "TabLine", "fg", normalFg)}`,
		`--tab-active-bg:${groupColor(theme, "TabLineSel", "bg", normalBg)}`,
		`--tab-active-fg:${groupColor(theme, "TabLineSel", "fg", normalFg)}`,
		`--line-number:${groupColor(theme, "LineNr", "fg", normalFg)}`,
		`--cursor-line-number:${groupColor(theme, "CursorLineNr", "fg", normalFg)}`,
		`--cursor-line:${groupColor(theme, "CursorLine", "bg", normalBg)}`,
		`--border:${groupColor(theme, "WinSeparator", "fg", normalBg)}`,
		`--message:${groupColor(theme, "MsgArea", "fg", normalFg)}`,
	].join(";");
	return `<section class="tool-preview neovim-preview" style="${variables}">
		<div class="neovim-title"><span class="dot" style="background:#FF5F57"></span><span class="dot" style="background:#FEBC2E"></span><span class="dot" style="background:#28C840"></span><span class="name">Terminal — Neovim</span></div>
		<div class="neovim-tabline"><div class="neovim-tab active">1 lib.rs <span class="modified">●</span></div><div class="neovim-tab">2 pipeline.py</div><div class="neovim-tab">3 App.tsx</div></div>
		<div class="neovim-code">${codeHtml}</div>
		<div class="neovim-status"><span class="mode">NORMAL</span><span class="branch">Y main*</span><span>lib.rs [+]</span><span class="push">rust</span><span>utf-8</span><span>12:24</span></div>
		<div class="neovim-command">:colorscheme synthpunk-neon-dark</div>
		<style>${NEOVIM_CSS}</style></section>`;
}
