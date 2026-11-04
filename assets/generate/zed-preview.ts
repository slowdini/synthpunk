import { targetShikiTheme, type TargetThemeRegistration } from "./shiki-theme";

export type ZedSyntaxEntry = {
	color: string;
	font_style: string | null;
	font_weight: number | null;
};

export type ZedPreviewStyle = {
	[key: string]: unknown;
	syntax: Record<string, ZedSyntaxEntry>;
};

export function parseZedTheme(source: string, variantName: string): ZedPreviewStyle {
	const document = JSON.parse(source) as {
		themes: Array<{ name: string; style: ZedPreviewStyle }>;
	};
	const variant = document.themes.find((theme) => theme.name === variantName);
	if (!variant) throw new Error(`Zed variant not found: ${variantName}`);
	return variant.style;
}

function ui(style: ZedPreviewStyle, key: string, fallback = "#000000"): string {
	const value = style[key];
	return typeof value === "string" ? value : fallback;
}

function syntax(style: ZedPreviewStyle, key: string, fallback: string): string {
	return style.syntax[key]?.color ?? fallback;
}

export function zedThemeRegistration(style: ZedPreviewStyle): TargetThemeRegistration {
	const foreground = ui(style, "editor.foreground", "#FFFFFF");
	return targetShikiTheme(
		"Synthpunk Zed Neon Dark",
		ui(style, "editor.background"),
		foreground,
		{
			comment: syntax(style, "comment", foreground),
			keyword: syntax(style, "keyword", foreground),
			string: syntax(style, "string", foreground),
			number: syntax(style, "number", foreground),
			boolean: syntax(style, "boolean", foreground),
			constant: syntax(style, "constant", foreground),
			operator: syntax(style, "operator", foreground),
			function: syntax(style, "function", foreground),
			type: syntax(style, "type", foreground),
			variable: syntax(style, "variable", foreground),
			property: syntax(style, "property", foreground),
			namespace: syntax(style, "namespace", foreground),
			attribute: syntax(style, "attribute", foreground),
			tag: syntax(style, "tag", foreground),
		},
	);
}

const MONO_FONT = "'Cascadia Code', 'Cascadia Mono', Menlo, Consolas, monospace";
const UI_FONT = "-apple-system, 'Segoe UI', system-ui, sans-serif";
const ZED_CSS = `
	.zed-preview { width: 1200px; height: 760px; overflow: hidden; border-radius: 12px; display: flex; flex-direction: column; background: var(--editor-bg); color: var(--text); font-family: ${UI_FONT}; box-shadow: 0 30px 70px rgba(0,0,0,.55),0 0 0 1px rgba(255,255,255,.06); }
	.zed-preview * { box-sizing: border-box; }
	.zed-title { height: 42px; flex: 0 0 42px; display: flex; align-items: center; gap: 8px; padding: 0 15px; background: var(--title-bg); border-bottom: 1px solid var(--border); color: var(--muted); font-size: 12px; }
	.zed-title .dot { width: 11px; height: 11px; border-radius: 50%; }
	.zed-title .project-name { margin-left: 8px; color: var(--text); }
	.zed-title .collab { margin-left: auto; display: flex; gap: 15px; color: var(--accent); }
	.zed-workspace { flex: 1; min-height: 0; display: grid; grid-template-columns: 200px minmax(0,1fr); }
	.zed-sidebar { padding: 13px 0; background: var(--panel-bg); border-right: 1px solid var(--border); color: var(--muted); font-size: 11px; }
	.zed-sidebar .heading { display: flex; justify-content: space-between; padding: 0 15px 13px; color: var(--text); font-size: 12px; font-weight: 600; }
	.zed-sidebar .root { padding: 7px 14px; color: var(--accent); background: var(--selected); font-weight: 700; font-size: 10px; }
	.zed-sidebar .row { padding: 5px 14px 5px 25px; white-space: nowrap; }
	.zed-sidebar .row.nested { padding-left: 39px; }
	.zed-sidebar .row.active { color: var(--text); background: var(--selected); }
	.zed-editor { min-width: 0; min-height: 0; display: grid; grid-template-rows: 43px 34px minmax(0,1fr); }
	.zed-tabs { display: flex; background: var(--tabbar-bg); border-bottom: 1px solid var(--border); }
	.zed-tab { min-width: 165px; display: flex; align-items: center; gap: 8px; padding: 0 15px; color: var(--muted); background: var(--tab-inactive); border-right: 1px solid var(--border); font-size: 11px; }
	.zed-tab.active { color: var(--text); background: var(--tab-active); box-shadow: inset 0 2px var(--accent); }
	.zed-tab .close { margin-left: auto; opacity: .55; }
	.zed-toolbar { display: flex; align-items: center; padding: 0 18px; gap: 7px; color: var(--muted); background: var(--editor-bg); border-bottom: 1px solid var(--border); font-size: 10px; }
	.zed-toolbar .tools { margin-left: auto; display: flex; gap: 14px; color: var(--accent); }
	.zed-code { min-height: 0; overflow: hidden; padding: 15px 18px; counter-reset: line; }
	.zed-code pre.shiki { margin: 0; overflow: visible; background: transparent !important; }
	.zed-code pre.shiki code { font: 14px/22px ${MONO_FONT}; }
	.zed-code .line { display: flex; min-height: 22px; white-space: pre; counter-increment: line; }
	.zed-code .line::before { content: counter(line); flex: 0 0 46px; padding-right: 18px; text-align: right; color: var(--line-number); font: 11px/22px ${MONO_FONT}; }
	.zed-code .line:nth-child(12) { background: var(--active-line); }
	.zed-code .line:nth-child(12)::before { color: var(--active-line-number); }
	.zed-status { height: 27px; flex: 0 0 27px; display: flex; align-items: center; gap: 18px; padding: 0 13px; background: var(--status-bg); border-top: 1px solid var(--border); color: var(--muted); font-size: 10px; }
	.zed-status .push { margin-left: auto; }
`;

export function zedPreviewHtml(style: ZedPreviewStyle, codeHtml: string): string {
	const foreground = ui(style, "text", "#FFFFFF");
	const variables = [
		`--editor-bg:${ui(style, "editor.background")}`,
		`--panel-bg:${ui(style, "panel.background")}`,
		`--status-bg:${ui(style, "status_bar.background")}`,
		`--title-bg:${ui(style, "title_bar.background")}`,
		`--tabbar-bg:${ui(style, "tab_bar.background")}`,
		`--tab-active:${ui(style, "tab.active_background")}`,
		`--tab-inactive:${ui(style, "tab.inactive_background")}`,
		`--text:${foreground}`,
		`--muted:${ui(style, "text.muted", foreground)}`,
		`--accent:${ui(style, "text.accent", foreground)}`,
		`--border:${ui(style, "border")}`,
		`--selected:${ui(style, "element.selected")}`,
		`--active-line:${ui(style, "editor.active_line.background")}`,
		`--line-number:${ui(style, "editor.line_number")}`,
		`--active-line-number:${ui(style, "editor.active_line_number")}`,
	].join(";");
	return `<section class="tool-preview zed-preview" style="${variables}">
		<div class="zed-title"><span class="dot" style="background:#FF5F57"></span><span class="dot" style="background:#FEBC2E"></span><span class="dot" style="background:#28C840"></span><span class="project-name">synthpunk — Zed</span><div class="collab"><span>Share</span><span>⌕</span><span>+</span></div></div>
		<div class="zed-workspace"><div class="zed-sidebar"><div class="heading"><span>Project</span><span>⋯</span></div><div class="root">⌄ SYNTHPUNK</div><div class="row">⌄ assets</div><div class="row nested">⌄ generate</div><div class="row nested">⌄ snippets</div><div class="row nested active">lib.rs</div><div class="row nested">App.tsx</div><div class="row nested">pipeline.py</div><div class="row nested">Service.cs</div><div class="row">› generator</div><div class="row">› palette</div><div class="row">› themes</div><div class="row">package.json</div><div class="row">README.md</div></div>
		<div class="zed-editor"><div class="zed-tabs"><div class="zed-tab active">◈ lib.rs <span class="close">×</span></div><div class="zed-tab">App.tsx <span class="close">×</span></div></div><div class="zed-toolbar">assets › generate › snippets › lib.rs <span>›</span> Palette <div class="tools"><span>Split</span><span>⌕</span><span>⋯</span></div></div><div class="zed-code">${codeHtml}</div></div></div>
		<div class="zed-status"><span>Y main*</span><span>✓ 0 △ 0</span><span>1 buffer</span><span class="push">Ln 12, Col 24</span><span>Rust</span><span>UTF-8</span><span>14:32</span></div>
		<style>${ZED_CSS}</style></section>`;
}
