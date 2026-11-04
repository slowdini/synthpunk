import { describe, expect, test } from "bun:test";
import {
	parseWezTermTheme,
	vsCodePreviewHtml,
	wezTermPreviewHtml,
	type VSCodePreviewTheme,
} from "./tool-previews";

const editorTheme: VSCodePreviewTheme = {
	colors: {
		"editor.background": "#100420",
		"editor.foreground": "#eeeeff",
		"editorLineNumber.foreground": "#776688",
		"editorLineNumber.activeForeground": "#00eeff",
		"editor.lineHighlightBackground": "#221133",
		"activityBar.background": "#080210",
		"activityBar.foreground": "#bbaacc",
		"activityBar.inactiveForeground": "#665577",
		"activityBarBadge.background": "#dd44ff",
		"activityBarBadge.foreground": "#050008",
		"sideBar.background": "#0a0314",
		"sideBar.foreground": "#ddd0ee",
		"sideBarSectionHeader.background": "#221133",
		"sideBarSectionHeader.foreground": "#bbaacc",
		"tab.activeBackground": "#100420",
		"tab.inactiveBackground": "#0a0314",
		"tab.activeForeground": "#eeeeff",
		"tab.inactiveForeground": "#887799",
		"tab.activeBorderTop": "#dd44ff",
		"editorGroupHeader.tabsBackground": "#0a0314",
		"titleBar.activeBackground": "#080210",
		"titleBar.activeForeground": "#eeeeff",
		"statusBar.background": "#050008",
		"statusBar.foreground": "#bbaacc",
		"panel.background": "#0a0314",
		"panel.border": "#221133",
	},
};

describe("synthetic tool previews", () => {
	test("VS Code preview combines recognizable application chrome with themed Shiki code", () => {
		const html = vsCodePreviewHtml(editorTheme, '<pre class="shiki"><code>themed code</code></pre>');

		expect(html).toContain("Visual Studio Code");
		expect(html).toContain("App.tsx");
		expect(html).toContain("Explorer");
		expect(html).toContain("TypeScript React");
		expect(html).toContain("themed code");
		expect(html).toContain("--editor-bg:#100420");
		expect(html).toContain("--activity-bg:#080210");
		expect(html).toContain("--status-bg:#050008");
		expect(html).toContain("--line-number:#776688");
		expect(html).not.toContain("⑂");
	});

	test("WezTerm preview uses the terminal, tab bar, cursor, and ANSI palette values", () => {
		const theme = parseWezTermTheme(`
[colors]
foreground = "#eeeeff"
background = "#100420"
cursor_bg = "#dd44ff"
cursor_fg = "#100420"
selection_fg = "#eeeeff"
selection_bg = "rgba(0, 238, 255, 0.3)"
split = "#221133"
ansi = ["#050008", "#ff4455", "#44ff88", "#ffee44", "#aa66ff", "#ff44aa", "#00eeff", "#bbaacc"]
brights = ["#887799", "#ff6677", "#66ffaa", "#ffee88", "#bb88ff", "#ff66bb", "#44ffff", "#eeeeff"]

[colors.tab_bar]
background = "#0a0314"

[colors.tab_bar.active_tab]
bg_color = "#100420"
fg_color = "#eeeeff"

[colors.tab_bar.inactive_tab]
bg_color = "#0a0314"
fg_color = "#bbaacc"

[colors.tab_bar.new_tab]
bg_color = "#0a0314"
fg_color = "#bbaacc"
`);
		const html = wezTermPreviewHtml(theme);

		expect(html).toContain("WezTerm");
		expect(html).toContain("bun run build");
		expect(html).toContain("--terminal-bg:#100420");
		expect(html).toContain("--terminal-fg:#eeeeff");
		expect(html).toContain("--cursor-bg:#dd44ff");
		expect(html).toContain("--tab-bg:#0a0314");
		expect(html).toContain("--ansi-red:#ff4455");
		expect(html).toContain("--ansi-green:#44ff88");
		expect(html).toContain("--ansi-cyan:#00eeff");
	});
});
