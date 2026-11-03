/**
 * Sample content and styles for the legibility review sheet
 * (scripts/legibility-sheet.ts): a terminal transcript, prompt segments, and a
 * tokenized code sample, each colored by role rather than by literal color.
 */

/** Terminal text: [ANSI palette index 0-15, or null for the default foreground, text]. */
export type Seg = [number | null, string];

export const TERMINAL: Seg[][] = [
	[
		[3, "WARN"],
		[
			null,
			'[0000] The "CI_REGISTRY_IMAGE" variable is not set. Defaulting to a blank string.',
		],
	],
	[[null, "[+] up 3/3"]],
	[
		[2, " ✔"],
		[null, " Network app-network      "],
		[2, "Created"],
	],
	[
		[2, " ✔"],
		[null, " Container appdb          "],
		[2, "Started"],
	],
	[
		[11, " !"],
		[null, " appdb                    "],
		[
			11,
			"The requested image's platform (linux/amd64) does not match the host",
		],
	],
	[[null, "$ git status"]],
	[[null, "Changes to be committed:"]],
	[[2, "        new file:   README.md"]],
	[[null, "Changes not staged for commit:"]],
	[[1, "        modified:   src/app.ts"]],
	[[null, "$ ls -F"]],
	[
		[4, "docs/"],
		[null, "  "],
		[4, "src/"],
		[null, "  "],
		[2, "build.sh*"],
		[null, "  "],
		[6, "latest@"],
		[null, "  "],
		[5, "logo.png"],
	],
];

export const PROMPT_SEGMENTS: [string, string][] = [
	["os", " ◆"],
	["username", " user "],
	["directory", " ~/projects/synthpunk "],
	["git_branch", " ⎇ main "],
	["bun", " bun v1.4.4 "],
	["docker_context", " default "],
	["time", " 15:05 "],
];

/** Code text: [syntax role as "group.key" from palette/syntax.json, or null for plain text, text]. */
export type Tok = [string | null, string];

export const CODE: Tok[][] = [
	[["comments.line", "// Load a scheme once and cache it by name"]],
	[
		["keywords.keyword", "export "],
		["storage.modifier", "class "],
		["storage.class", "ThemeLoader"],
		[null, " {"],
	],
	[
		[null, "  "],
		["storage.modifier", "private readonly "],
		["variables.property", "cache"],
		["keywords.operator", " = "],
		["keywords.keyword", "new "],
		["support.type", "Map<string, Scheme>"],
		[null, "();"],
	],
	[
		[null, "  "],
		["storage.modifier", "async "],
		["functions.function", "load"],
		[null, "("],
		["functions.parameter", "name"],
		[null, ": "],
		["storage.type", "string"],
		[null, ", "],
		["functions.parameter", "retries"],
		["keywords.operator", " = "],
		["literals.number", "3"],
		[null, ") {"],
	],
	[
		[null, "    "],
		["storage.type", "const "],
		["variables.variable", "scheme"],
		["keywords.operator", " = "],
		["keywords.control", "await "],
		["functions.function", "fetchScheme"],
		[null, "("],
		["literals.string", '"themes/" + name'],
		[null, ");"],
	],
	[
		[null, "    "],
		["keywords.control", "return "],
		["keywords.keyword", "this"],
		[null, "."],
		["variables.property", "cache"],
		[null, "."],
		["functions.method", "set"],
		[null, "("],
		["functions.parameter", "name"],
		[null, ", "],
		["variables.variable", "scheme"],
		[null, ");"],
	],
	[[null, "  }"]],
	[[null, "}"]],
];

export const SHEET_CSS = `
:root {
	/* Layout: one reading column; each variant is a stacked section, wide tables scroll inside their own box */
	--paper: #f6f4f8; --ink: #1c1922; --muted: #5f5869; --rule: #dcd6e2; --panel: #ffffff;
	--accent: #8b2a6e; --pass: #1d7348; --fail: #b3261e; --weak: #7a6420;
	--font-ui: "IBM Plex Sans", system-ui, sans-serif;
	--font-mono: "IBM Plex Mono", ui-monospace, Menlo, Consolas, monospace;
}
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) {
	--paper: #131017; --ink: #ebe6f0; --muted: #a79fb1; --rule: #2f2938; --panel: #1b1720;
	--accent: #e48ac8; --pass: #63c993; --fail: #ff8077; --weak: #d9b867; color-scheme: dark; } }
:root[data-theme="dark"] {
	--paper: #131017; --ink: #ebe6f0; --muted: #a79fb1; --rule: #2f2938; --panel: #1b1720;
	--accent: #e48ac8; --pass: #63c993; --fail: #ff8077; --weak: #d9b867; color-scheme: dark; }
body { background: var(--paper); color: var(--ink); font: 15px/1.55 var(--font-ui); margin: 0;
	padding-block: 32px 64px; padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); }
main { max-width: 1120px; margin: 0 auto; display: grid; gap: 40px; }
h1 { font-size: 30px; line-height: 1.2; margin: 0; text-wrap: balance; }
h2 { font-size: 22px; margin: 0; }
h3 { font-size: 16px; margin: 28px 0 10px; }
h4 { font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted); margin: 18px 0 8px; }
.hint, .tier { font-weight: 400; color: var(--muted); font-size: 13px; }
.tier { display: block; font-size: 11px; letter-spacing: 0.03em; }
p, li { max-width: 68ch; }
code { font-family: var(--font-mono); font-size: 0.9em; }
nav ul { display: flex; flex-wrap: wrap; gap: 8px 20px; list-style: none; padding: 0; margin: 0; }
a { color: var(--accent); }
a:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.summary { display: grid; gap: 16px; }
.scroll { overflow-x: auto; border: 1px solid var(--rule); border-radius: 6px; background: var(--panel); }
table { border-collapse: collapse; font-variant-numeric: tabular-nums; }
th, td { padding: 6px 8px; text-align: left; vertical-align: top; border-bottom: 1px solid var(--rule); }
thead th { font-size: 12px; color: var(--muted); font-weight: 600; }
th[scope="row"] { font-family: var(--font-mono); font-size: 13px; white-space: nowrap; }
.allowed td { font-family: var(--font-mono); font-size: 13px; }
.variant { border-top: 3px solid var(--ink); padding-top: 16px; }
.variant-head { display: flex; flex-wrap: wrap; align-items: baseline; gap: 12px; }
.pill { font-size: 12px; padding: 2px 10px; border-radius: 999px; border: 1px solid currentColor; }
.pill-fail { color: var(--fail); } .pill-pass { color: var(--pass); }
.row { display: flex; flex-wrap: wrap; gap: 8px; }
.cell { width: 128px; }
.swatch { font: 14px/1.4 var(--font-mono); padding: 8px; border-radius: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.meta { font: 12px/1.4 var(--font-mono); padding: 3px 2px 0; color: var(--muted); }
[data-status="fail"] .swatch { outline: 2px solid var(--fail); outline-offset: 1px; }
[data-status="fail"] .meta, [data-status="fail"] .badge { color: var(--fail); font-weight: 600; }
[data-status="pass"] .badge { color: var(--pass); }
[data-status="weak"] .meta { color: var(--weak); }
.overlay { display: grid; gap: 6px; margin-bottom: 14px; }
.overlay-label { font-size: 13px; }
.term { font: 14px/1.5 var(--font-mono); padding: 14px 16px; border-radius: 6px; margin: 0 0 10px; overflow-x: auto; }
.prompt span { padding: 1px 0; }
.seg-missing, .missing { color: var(--fail); }
.missing { border: 2px dashed var(--fail); border-radius: 6px; padding: 12px 14px; font-size: 14px; margin-bottom: 10px; }
.distinct { font: 16px/1.9 var(--font-mono); padding: 14px 16px; border-radius: 6px; }
ol { padding-left: 20px; display: grid; gap: 6px; }
@media (prefers-reduced-motion: reduce) { * { scroll-behavior: auto; } }
`;
