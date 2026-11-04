export type VSCodePreviewTheme = {
	colors: Record<string, string>;
};

export type WezTermPreviewTheme = {
	foreground: string;
	background: string;
	cursor_bg: string;
	cursor_fg: string;
	selection_fg: string;
	selection_bg: string;
	split: string;
	ansi: string[];
	brights: string[];
	tab_bar: {
		background: string;
		active_tab: { bg_color: string; fg_color: string };
		inactive_tab: { bg_color: string; fg_color: string };
		new_tab: { bg_color: string; fg_color: string };
	};
};

export function parseWezTermTheme(source: string): WezTermPreviewTheme {
	const document = Bun.TOML.parse(source) as { colors: WezTermPreviewTheme };
	return document.colors;
}

const MONO_FONT = "'Cascadia Code', 'Cascadia Mono', Menlo, Consolas, monospace";
const UI_FONT = "-apple-system, 'Segoe UI', system-ui, sans-serif";

function editorColor(theme: VSCodePreviewTheme, key: string, fallback: string): string {
	return theme.colors[key] ?? fallback;
}

const VSCODE_CSS = `
	.vscode-preview {
		width: 1200px; height: 760px; overflow: hidden; border-radius: 12px;
		display: flex; flex-direction: column; color: var(--editor-fg); background: var(--editor-bg);
		font-family: ${UI_FONT}; box-shadow: 0 30px 70px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.06);
	}
	.vscode-preview * { box-sizing: border-box; }
	.vscode-titlebar { height: 38px; flex: 0 0 38px; display: flex; align-items: center; padding: 0 14px; gap: 8px; background: var(--title-bg); color: var(--title-fg); font-size: 12px; }
	.vscode-titlebar .dot { width: 11px; height: 11px; border-radius: 50%; }
	.vscode-titlebar .title { margin-left: 10px; opacity: .9; }
	.vscode-menus { display: flex; gap: 20px; margin-left: 26px; font-size: 11px; opacity: .72; }
	.vscode-workbench { flex: 1; min-height: 0; display: grid; grid-template-columns: 50px 184px minmax(0,1fr); }
	.vscode-activity { display: flex; flex-direction: column; align-items: center; padding: 10px 0; background: var(--activity-bg); color: var(--activity-inactive); border-right: 1px solid var(--border); }
	.vscode-activity .activity-icon { position: relative; width: 50px; height: 45px; display: grid; place-items: center; font: 25px/1 ${UI_FONT}; }
	.vscode-activity .activity-icon.active { color: var(--activity-fg); border-left: 2px solid var(--tab-accent); }
	.vscode-activity .activity-icon:last-child { margin-top: auto; }
	.vscode-activity .badge { position: absolute; right: 5px; bottom: 4px; min-width: 16px; height: 16px; padding: 0 4px; border-radius: 9px; display: grid; place-items: center; background: var(--badge-bg); color: var(--badge-fg); font: 9px/1 ${UI_FONT}; }
	.vscode-sidebar { min-width: 0; padding: 12px 0; background: var(--sidebar-bg); color: var(--sidebar-fg); border-right: 1px solid var(--border); font-size: 11px; }
	.vscode-sidebar .explorer-title { padding: 0 16px 14px; text-transform: uppercase; letter-spacing: .7px; font-size: 10px; }
	.vscode-sidebar .project { padding: 6px 12px; background: var(--sidebar-heading-bg); color: var(--sidebar-heading-fg); font-weight: 700; font-size: 10px; }
	.vscode-sidebar .tree-row { padding: 5px 10px 5px 24px; white-space: nowrap; }
	.vscode-sidebar .tree-row.nested { padding-left: 38px; }
	.vscode-sidebar .tree-row.selected { color: var(--tab-active-fg); background: var(--active-line-bg); }
	.vscode-sidebar .tree-row.muted { opacity: .65; }
	.vscode-editor { min-width: 0; min-height: 0; display: grid; grid-template-rows: 40px 28px minmax(0,1fr) 30px; background: var(--editor-bg); }
	.vscode-tabs { display: flex; background: var(--tabs-bg); border-bottom: 1px solid var(--border); }
	.vscode-tab { min-width: 150px; display: flex; align-items: center; gap: 8px; padding: 0 14px; color: var(--tab-inactive-fg); background: var(--tab-inactive-bg); border-right: 1px solid var(--border); font-size: 11px; }
	.vscode-tab.active { color: var(--tab-active-fg); background: var(--tab-active-bg); border-top: 2px solid var(--tab-accent); }
	.vscode-tab .close { margin-left: auto; opacity: .65; }
	.vscode-breadcrumbs { display: flex; align-items: center; gap: 7px; padding: 0 18px; color: var(--tab-inactive-fg); font-size: 10px; }
	.vscode-code-wrap { min-height: 0; display: grid; grid-template-columns: minmax(0,1fr) 66px; overflow: hidden; }
	.vscode-code { min-width: 0; overflow: hidden; padding: 12px 12px 18px 0; counter-reset: line; }
	.vscode-code pre.shiki { margin: 0; background: transparent !important; overflow: visible; }
	.vscode-code pre.shiki code { font: 13px/20px ${MONO_FONT}; }
	.vscode-code .line { display: flex; min-height: 20px; white-space: pre; counter-increment: line; padding-right: 12px; }
	.vscode-code .line::before { content: counter(line); flex: 0 0 48px; padding-right: 15px; text-align: right; color: var(--line-number); font: 11px/20px ${MONO_FONT}; user-select: none; }
	.vscode-code .line:nth-child(12) { background: var(--active-line-bg); }
	.vscode-code .line:nth-child(12)::before { color: var(--active-line-number); }
	.vscode-minimap { position: relative; padding: 18px 10px; opacity: .5; background: var(--editor-bg); }
	.vscode-minimap span { display: block; height: 3px; margin: 0 0 4px; border-radius: 2px; background: var(--minimap-color); }
	.vscode-panel { display: flex; align-items: center; gap: 20px; padding: 0 16px; background: var(--panel-bg); border-top: 1px solid var(--border); color: var(--tab-inactive-fg); font-size: 10px; }
	.vscode-panel .active { height: 30px; display: flex; align-items: center; color: var(--tab-active-fg); border-bottom: 1px solid var(--tab-accent); }
	.vscode-status { height: 24px; flex: 0 0 24px; display: flex; align-items: center; gap: 18px; padding: 0 12px; background: var(--status-bg); color: var(--status-fg); font-size: 10px; }
	.vscode-status .push { margin-left: auto; }
`;

export function vsCodePreviewHtml(theme: VSCodePreviewTheme, codeHtml: string): string {
	const editorBg = editorColor(theme, "editor.background", "#000000");
	const editorFg = editorColor(theme, "editor.foreground", "#ffffff");
	const border = editorColor(theme, "panel.border", editorBg);
	const variables = [
		`--editor-bg:${editorBg}`,
		`--editor-fg:${editorFg}`,
		`--line-number:${editorColor(theme, "editorLineNumber.foreground", editorFg)}`,
		`--active-line-number:${editorColor(theme, "editorLineNumber.activeForeground", editorFg)}`,
		`--active-line-bg:${editorColor(theme, "editor.lineHighlightBackground", editorBg)}`,
		`--activity-bg:${editorColor(theme, "activityBar.background", editorBg)}`,
		`--activity-fg:${editorColor(theme, "activityBar.foreground", editorFg)}`,
		`--activity-inactive:${editorColor(theme, "activityBar.inactiveForeground", editorFg)}`,
		`--badge-bg:${editorColor(theme, "activityBarBadge.background", editorFg)}`,
		`--badge-fg:${editorColor(theme, "activityBarBadge.foreground", editorBg)}`,
		`--sidebar-bg:${editorColor(theme, "sideBar.background", editorBg)}`,
		`--sidebar-fg:${editorColor(theme, "sideBar.foreground", editorFg)}`,
		`--sidebar-heading-bg:${editorColor(theme, "sideBarSectionHeader.background", editorBg)}`,
		`--sidebar-heading-fg:${editorColor(theme, "sideBarSectionHeader.foreground", editorFg)}`,
		`--tab-active-bg:${editorColor(theme, "tab.activeBackground", editorBg)}`,
		`--tab-inactive-bg:${editorColor(theme, "tab.inactiveBackground", editorBg)}`,
		`--tab-active-fg:${editorColor(theme, "tab.activeForeground", editorFg)}`,
		`--tab-inactive-fg:${editorColor(theme, "tab.inactiveForeground", editorFg)}`,
		`--tab-accent:${editorColor(theme, "tab.activeBorderTop", editorFg)}`,
		`--tabs-bg:${editorColor(theme, "editorGroupHeader.tabsBackground", editorBg)}`,
		`--title-bg:${editorColor(theme, "titleBar.activeBackground", editorBg)}`,
		`--title-fg:${editorColor(theme, "titleBar.activeForeground", editorFg)}`,
		`--status-bg:${editorColor(theme, "statusBar.background", editorBg)}`,
		`--status-fg:${editorColor(theme, "statusBar.foreground", editorFg)}`,
		`--panel-bg:${editorColor(theme, "panel.background", editorBg)}`,
		`--minimap-color:${editorColor(theme, "editorLineNumber.foreground", editorFg)}`,
		`--border:${border}`,
	].join(";");

	return `<section class="tool-preview vscode-preview" style="${variables}">
		<div class="vscode-titlebar">
			<span class="dot" style="background:#FF5F57"></span><span class="dot" style="background:#FEBC2E"></span><span class="dot" style="background:#28C840"></span>
			<div class="vscode-menus"><span>File</span><span>Edit</span><span>Selection</span><span>View</span><span>Go</span><span>Run</span><span>Terminal</span><span>Help</span></div>
			<span class="title">App.tsx — synthpunk — Visual Studio Code</span>
		</div>
		<div class="vscode-workbench">
			<div class="vscode-activity">
				<div class="activity-icon active">▱</div><div class="activity-icon">⌕</div><div class="activity-icon">Y<span class="badge">1</span></div><div class="activity-icon">▷</div><div class="activity-icon">▦</div><div class="activity-icon">⚙</div>
			</div>
			<div class="vscode-sidebar">
				<div class="explorer-title">Explorer</div><div class="project">⌄ SYNTHPUNK</div>
				<div class="tree-row">⌄ assets</div><div class="tree-row nested">⌄ generate</div><div class="tree-row nested">⌄ snippets</div><div class="tree-row nested selected">◈ App.tsx</div>
				<div class="tree-row nested muted">pipeline.py</div><div class="tree-row nested muted">lib.rs</div><div class="tree-row nested muted">Service.cs</div>
				<div class="tree-row">› generator</div><div class="tree-row">› palette</div><div class="tree-row">› themes</div><div class="tree-row muted">package.json</div><div class="tree-row muted">README.md</div>
			</div>
			<div class="vscode-editor">
				<div class="vscode-tabs"><div class="vscode-tab active"><span>◈</span> App.tsx <span class="close">×</span></div><div class="vscode-tab">pipeline.py <span class="close">×</span></div></div>
				<div class="vscode-breadcrumbs">assets › generate › snippets › App.tsx <span>›</span> Counter</div>
				<div class="vscode-code-wrap"><div class="vscode-code">${codeHtml}</div><div class="vscode-minimap">
					<span style="width:80%"></span><span style="width:55%"></span><span style="width:68%"></span><span style="width:38%"></span><span style="width:72%"></span><span style="width:46%"></span><span style="width:88%"></span><span style="width:76%"></span><span style="width:60%"></span><span style="width:84%"></span><span style="width:42%"></span><span style="width:70%"></span><span style="width:92%"></span><span style="width:64%"></span><span style="width:52%"></span><span style="width:78%"></span><span style="width:58%"></span><span style="width:82%"></span><span style="width:36%"></span><span style="width:67%"></span>
				</div></div>
				<div class="vscode-panel"><span class="active">Problems 0</span><span>Output</span><span>Debug Console</span><span>Terminal</span></div>
			</div>
		</div>
		<div class="vscode-status"><span>main*</span><span>✓ 0 △ 0</span><span class="push">Ln 12, Col 24</span><span>Spaces: 2</span><span>UTF-8</span><span>TypeScript React</span><span>✓ Prettier</span></div>
		<style>${VSCODE_CSS}</style>
	</section>`;
}

const WEZTERM_CSS = `
	.wezterm-preview {
		width: 1120px; height: 650px; overflow: hidden; border-radius: 12px; display: flex; flex-direction: column;
		background: var(--terminal-bg); color: var(--terminal-fg); font-family: ${UI_FONT};
		box-shadow: 0 30px 70px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.06);
	}
	.wezterm-preview * { box-sizing: border-box; }
	.wezterm-title { height: 38px; flex: 0 0 38px; display: flex; align-items: center; gap: 8px; padding: 0 14px; background: var(--tab-bg); color: var(--tab-inactive-fg); font-size: 12px; }
	.wezterm-title .dot { width: 11px; height: 11px; border-radius: 50%; }
	.wezterm-title .name { margin-left: 8px; }
	.wezterm-tabs { height: 44px; flex: 0 0 44px; display: flex; align-items: stretch; padding-top: 7px; background: var(--tab-bg); font-size: 12px; }
	.wezterm-tab { min-width: 205px; display: flex; align-items: center; gap: 9px; padding: 0 16px; color: var(--tab-inactive-fg); background: var(--tab-inactive-bg); border-right: 1px solid var(--split); }
	.wezterm-tab.active { color: var(--tab-active-fg); background: var(--tab-active-bg); border-radius: 7px 7px 0 0; }
	.wezterm-tab .pid { opacity: .55; font-size: 10px; }
	.wezterm-new { width: 42px; display: grid; place-items: center; color: var(--new-tab-fg); background: var(--new-tab-bg); font-size: 18px; }
	.wezterm-body { flex: 1; min-height: 0; padding: 22px 26px; overflow: hidden; font: 15px/1.6 ${MONO_FONT}; }
	.wezterm-line { min-height: 24px; white-space: pre; }
	.wezterm-line .green { color: var(--ansi-green); } .wezterm-line .red { color: var(--ansi-red); }
	.wezterm-line .yellow { color: var(--ansi-yellow); } .wezterm-line .blue { color: var(--ansi-blue); }
	.wezterm-line .magenta { color: var(--ansi-magenta); } .wezterm-line .cyan { color: var(--ansi-cyan); }
	.wezterm-line .muted { color: var(--ansi-bright-black); } .wezterm-line .bright { color: var(--ansi-bright-white); }
	.wezterm-spacer { height: 14px; }
	.wezterm-selection { color: var(--selection-fg); background: var(--selection-bg); }
	.wezterm-cursor { display: inline-block; width: 9px; height: 18px; margin-left: 3px; vertical-align: -3px; background: var(--cursor-bg); }
	.wezterm-ramp { display: flex; gap: 7px; margin: 15px 0 10px; }
	.wezterm-ramp span { width: 44px; height: 18px; border-radius: 3px; }
	.wezterm-ramp span:nth-child(1) { background: var(--ansi-black); } .wezterm-ramp span:nth-child(2) { background: var(--ansi-red); }
	.wezterm-ramp span:nth-child(3) { background: var(--ansi-green); } .wezterm-ramp span:nth-child(4) { background: var(--ansi-yellow); }
	.wezterm-ramp span:nth-child(5) { background: var(--ansi-blue); } .wezterm-ramp span:nth-child(6) { background: var(--ansi-magenta); }
	.wezterm-ramp span:nth-child(7) { background: var(--ansi-cyan); } .wezterm-ramp span:nth-child(8) { background: var(--ansi-white); }
	.wezterm-status { height: 25px; flex: 0 0 25px; display: flex; align-items: center; gap: 22px; padding: 0 14px; background: var(--tab-bg); color: var(--tab-inactive-fg); font-size: 10px; }
	.wezterm-status .push { margin-left: auto; }
`;

export function wezTermPreviewHtml(theme: WezTermPreviewTheme): string {
	const variables = [
		`--terminal-bg:${theme.background}`,
		`--terminal-fg:${theme.foreground}`,
		`--cursor-bg:${theme.cursor_bg}`,
		`--cursor-fg:${theme.cursor_fg}`,
		`--selection-fg:${theme.selection_fg}`,
		`--selection-bg:${theme.selection_bg}`,
		`--split:${theme.split}`,
		`--tab-bg:${theme.tab_bar.background}`,
		`--tab-active-bg:${theme.tab_bar.active_tab.bg_color}`,
		`--tab-active-fg:${theme.tab_bar.active_tab.fg_color}`,
		`--tab-inactive-bg:${theme.tab_bar.inactive_tab.bg_color}`,
		`--tab-inactive-fg:${theme.tab_bar.inactive_tab.fg_color}`,
		`--new-tab-bg:${theme.tab_bar.new_tab.bg_color}`,
		`--new-tab-fg:${theme.tab_bar.new_tab.fg_color}`,
		`--ansi-black:${theme.ansi[0]}`,
		`--ansi-red:${theme.ansi[1]}`,
		`--ansi-green:${theme.ansi[2]}`,
		`--ansi-yellow:${theme.ansi[3]}`,
		`--ansi-blue:${theme.ansi[4]}`,
		`--ansi-magenta:${theme.ansi[5]}`,
		`--ansi-cyan:${theme.ansi[6]}`,
		`--ansi-white:${theme.ansi[7]}`,
		`--ansi-bright-black:${theme.brights[0]}`,
		`--ansi-bright-white:${theme.brights[7]}`,
	].join(";");

	return `<section class="tool-preview wezterm-preview" style="${variables}">
		<div class="wezterm-title"><span class="dot" style="background:#FF5F57"></span><span class="dot" style="background:#FEBC2E"></span><span class="dot" style="background:#28C840"></span><span class="name">WezTerm</span></div>
		<div class="wezterm-tabs"><div class="wezterm-tab active"><span class="green">●</span> zsh <span class="pid">~/projects/synthpunk</span></div><div class="wezterm-tab"><span>○</span> logs <span class="pid">2/2</span></div><div class="wezterm-new">+</div></div>
		<div class="wezterm-body">
			<div class="wezterm-line"><span class="green">sam@studio</span> <span class="cyan">~/projects/synthpunk</span> <span class="muted">on</span> <span class="magenta"> main</span></div>
			<div class="wezterm-line"><span class="green">❯</span> bun run build</div>
			<div class="wezterm-spacer"></div>
			<div class="wezterm-line muted">Generating Synthpunk from the palette source…</div>
			<div class="wezterm-line"><span class="green">✓</span> VS Code   <span class="muted">4 variants</span></div>
			<div class="wezterm-line"><span class="green">✓</span> Zed       <span class="muted">4 variants</span></div>
			<div class="wezterm-line"><span class="green">✓</span> Neovim    <span class="muted">4 variants</span></div>
			<div class="wezterm-line"><span class="green">✓</span> WezTerm   <span class="muted">4 variants</span></div>
			<div class="wezterm-line"><span class="green">✓</span> Starship  <span class="muted">4 palettes</span></div>
			<div class="wezterm-line"><span class="green">✓</span> <span class="bright">Theme generation and legibility checks passed</span></div>
			<div class="wezterm-spacer"></div>
			<div class="wezterm-line"><span class="green">❯</span> ls palette</div>
			<div class="wezterm-line"><span class="cyan">base.json</span>  <span class="cyan">dark.json</span>  <span class="cyan">neon-dark.json</span>  <span class="cyan">neon-light.json</span></div>
			<div class="wezterm-line">syntax.json  ui-mapping.json  terminal-mapping.json  <span class="yellow">legibility.json</span></div>
			<div class="wezterm-ramp"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
			<div class="wezterm-line"><span class="muted">ANSI palette</span> <span class="red">error</span> <span class="yellow">warning</span> <span class="green">success</span> <span class="blue">info</span> <span class="wezterm-selection">selected text</span></div>
			<div class="wezterm-spacer"></div>
			<div class="wezterm-line"><span class="green">❯</span> <span class="wezterm-cursor"></span></div>
		</div>
		<div class="wezterm-status"><span>WezTerm</span><span>zsh</span><span class="push">110 × 32</span><span>UTF-8</span></div>
		<style>${WEZTERM_CSS}</style>
	</section>`;
}
