/**
 * Builds review/legibility.html: a visual sheet for manually reviewing text
 * legibility in every variant. It shows the rule matrix from
 * palette/legibility.json, text on accent fills and editor overlays, and
 * terminal, prompt, and code samples rendered from the generated artifacts
 * the way each tool parses them.
 *
 * Run: bun run legibility:sheet
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import {
	composite,
	contrastRatio,
	hexToRgb,
	rgbToHex,
} from "../generator/colorUtils";
import {
	allowedMatrix,
	allowedTextColors,
	fillMatrix,
	type LegibilityRules,
	loadLegibilityRules,
	paletteViolations,
} from "../generator/legibility";
import { loadPalette } from "../generator/palette";
import {
	type Palette,
	VARIANT_DISPLAY_NAMES,
	VARIANTS,
} from "../generator/types";
import {
	CODE,
	PROMPT_SEGMENTS,
	SHEET_CSS,
	TERMINAL,
} from "./legibility-sheet-content";

type Table = Record<string, unknown>;

export interface SheetVariant {
	name: string;
	palette: Palette;
	/** Parsed WezTerm scheme TOML, or null when the file is missing. */
	wezterm: Table | null;
	/** Parsed starship.toml (shared by all variants), or null. */
	starship: Table | null;
	/** `colors` from the VS Code theme JSON, or null. */
	vscodeColors: Record<string, string> | null;
}

export interface SheetInput {
	rules: LegibilityRules;
	/** palette/syntax.json: group -> role -> palette color name. */
	syntax: Record<string, unknown>;
	variants: SheetVariant[];
}

const esc = (s: string) => Bun.escapeHTML(s);
const hexOf = (p: Palette, name: string) => `#${p.colors[name].hex}`;
const SAMPLE = "Aa 0Oo 1lI {}";

function displayName(name: string): string {
	return (
		VARIANT_DISPLAY_NAMES[name as keyof typeof VARIANT_DISPLAY_NAMES] ?? name
	);
}

function missing(what: string, why: string): string {
	return `<div class="missing"><strong>MISSING</strong> ${esc(what)}: ${esc(why)}</div>`;
}

type Status = "pass" | "fail" | "weak" | "info";

function cell(
	pair: string,
	fg: string,
	bg: string,
	ratio: number,
	status: Status,
	note: string,
	sample = SAMPLE,
): string {
	const badge = { pass: "✓", fail: "✗", weak: "·", info: "" }[status];
	return `<div class="cell" data-pair="${esc(pair)}" data-status="${status}">
		<div class="swatch" style="background:${bg};color:${fg}">${esc(sample)}</div>
		<div class="meta"><span class="ratio">${ratio.toFixed(2)}</span> <span class="badge">${badge}</span> ${esc(note)}</div>
	</div>`;
}

function statusOf(pass: boolean, required: boolean): Status {
	if (pass) return "pass";
	return required ? "fail" : "weak";
}

function matrixSection(v: SheetVariant, rules: LegibilityRules): string {
	const cells = allowedMatrix(v.palette, rules);
	const surfaces = Object.keys(rules.surfaces).filter(
		(s) => v.palette.colors[s],
	);
	const head = surfaces.map((s) => `<th>${esc(s)}</th>`).join("");
	const rows = Object.entries(rules.text)
		.filter(([color]) => v.palette.colors[color])
		.map(([color, tier]) => {
			const tds = surfaces.map((surface) => {
				const c = cells.find((x) => x.surface === surface && x.color === color);
				if (!c) return "<td></td>";
				const note = c.pass ? "" : c.required ? `< ${c.min}` : "not required";
				const status = statusOf(c.pass, c.required);
				return `<td>${cell(`${color} on ${surface}`, hexOf(v.palette, color), hexOf(v.palette, surface), c.ratio, status, note)}</td>`;
			});
			return `<tr><th scope="row">${esc(color)}<span class="tier">${esc(tier)} ≥ ${rules.tiers[tier].min}</span></th>${tds.join("")}</tr>`;
		});
	return `<h3>Text on backgrounds</h3>
	<div class="scroll"><table class="matrix"><thead><tr><th>text color</th>${head}</tr></thead><tbody>${rows.join("")}</tbody></table></div>`;
}

function fillsSection(v: SheetVariant, rules: LegibilityRules): string {
	const cells = fillMatrix(v.palette, rules).map((c) =>
		cell(
			`${c.text} on ${c.fill}`,
			hexOf(v.palette, c.text),
			hexOf(v.palette, c.fill),
			c.ratio,
			c.pass ? "pass" : "fail",
			`${c.text} on ${c.fill}`,
			` ${c.fill} segment `,
		),
	);
	return `<h3>Text on accent fills <span class="hint">badges, buttons, prompt segments, search hits</span></h3>
	<div class="row">${cells.join("")}</div>`;
}

const OVERLAYS: [string, string][] = [
	["editor.selectionBackground", "Selection"],
	["editor.lineHighlightBackground", "Current line"],
	["editor.findMatchBackground", "Find match"],
	["editor.findMatchHighlightBackground", "Other matches"],
];

function overlaysSection(v: SheetVariant, rules: LegibilityRules): string {
	const colors = v.vscodeColors;
	if (!colors)
		return `<h3>Editor overlays</h3>${missing("VS Code theme", "file not found")}`;
	const base = hexToRgb(colors["editor.background"]);
	const rows = OVERLAYS.filter(([key]) => colors[key]).map(([key, label]) => {
		const raw = colors[key].replace("#", "");
		const alpha =
			raw.length === 8 ? Number.parseInt(raw.slice(6), 16) / 255 : 1;
		const bg = `#${rgbToHex(...composite(hexToRgb(raw), alpha, base))}`;
		const tds = Object.entries(rules.text)
			.filter(([color]) => v.palette.colors[color])
			.map(([color, tier]) => {
				const fg = hexOf(v.palette, color);
				const ratio = contrastRatio(hexToRgb(fg), hexToRgb(bg));
				const pass = ratio >= rules.tiers[tier].min;
				return cell(
					`${color} on ${label}`,
					fg,
					bg,
					ratio,
					pass ? "pass" : "fail",
					"",
					color,
				);
			});
		return `<div class="overlay"><div class="overlay-label">${esc(label)} <code>${esc(key)}</code></div><div class="row">${tds.join("")}</div></div>`;
	});
	return `<h3>Editor overlays <span class="hint">VS Code backgrounds composited over the editor</span></h3>${rows.join("")}`;
}

function terminalSection(v: SheetVariant, rules: LegibilityRules): string {
	if (!v.wezterm) return missing("WezTerm scheme", "file not found");
	const colors = (v.wezterm.colors ?? {}) as Table;
	const ansi = colors.ansi;
	const brights = colors.brights;
	if (!Array.isArray(ansi) || !Array.isArray(brights)) {
		return missing(
			"WezTerm colors.ansi / colors.brights",
			"not defined directly under [colors], so WezTerm refuses to load this scheme and shows its default ANSI colors",
		);
	}
	const palette16 = [...ansi, ...brights] as string[];
	const fg = String(colors.foreground);
	const bg = String(colors.background);
	const lines = TERMINAL.map((line) =>
		line
			.map(([idx, text]) =>
				idx === null
					? esc(text)
					: `<span style="color:${palette16[idx]}">${esc(text)}</span>`,
			)
			.join(""),
	);
	const accentMin = rules.tiers.accent?.min ?? 3;
	const chips = palette16.map((c, i) => {
		const ratio = contrastRatio(hexToRgb(c), hexToRgb(bg));
		const chromatic = (i >= 1 && i <= 6) || (i >= 9 && i <= 14);
		const status: Status = !chromatic
			? "info"
			: ratio >= accentMin
				? "pass"
				: "fail";
		return cell(
			`ansi ${i}`,
			c,
			bg,
			ratio,
			status,
			chromatic ? "" : "structural",
			`■ ${String(i).padStart(2, "0")}`,
		);
	});
	return `<pre class="term" style="background:${bg};color:${fg}">${lines.join("\n")}</pre>
	<div class="row">${chips.join("")}</div>`;
}

function lastToken(text: string, key: "fg" | "bg"): string | undefined {
	const matches = [...text.matchAll(new RegExp(`${key}:(\\w+)`, "g"))];
	return matches.at(-1)?.[1];
}

function promptSection(v: SheetVariant): string {
	if (!v.starship) return missing("Starship config", "file not found");
	const paletteName = `synthpunk_${v.name.replaceAll("-", "_")}`;
	const pal = (
		v.starship.palettes as Record<string, Record<string, string>> | undefined
	)?.[paletteName];
	if (!pal)
		return missing(
			`Starship palette ${paletteName}`,
			"not defined in starship.toml",
		);
	const base = hexOf(v.palette, "base");
	const segs = PROMPT_SEGMENTS.flatMap(([module, sample]) => {
		const table = v.starship?.[module] as Table | undefined;
		if (!table) return [];
		const text = [table.style, table.style_user, table.format]
			.filter(Boolean)
			.join(" ");
		const fg = pal[lastToken(text, "fg") ?? ""];
		const bgc = pal[lastToken(text, "bg") ?? ""];
		if (!fg || !bgc)
			return [
				`<span class="seg-missing">[${esc(module)}: color not in palette]</span>`,
			];
		return [
			`<span title="${contrastRatio(hexToRgb(fg), hexToRgb(bgc)).toFixed(2)}:1" style="background:${bgc};color:${fg}">${esc(sample)}</span>`,
		];
	});
	const charTable = v.starship.character as Table | undefined;
	const charColor =
		pal[lastToken(String(charTable?.success_symbol ?? ""), "fg") ?? ""] ??
		hexOf(v.palette, "text");
	return `<pre class="term prompt" style="background:${base};color:${hexOf(v.palette, "text")}">${segs.join("")}  <span style="color:${charColor};font-weight:700">❯</span> docker compose up -d appdb</pre>`;
}

function codeSection(v: SheetVariant, syntax: Record<string, unknown>): string {
	const text = hexOf(v.palette, "text");
	const resolve = (role: string | null): string => {
		if (!role) return text;
		const [group, key] = role.split(".");
		const name = (syntax[group] as Record<string, string> | undefined)?.[key];
		return name && v.palette.colors[name] ? hexOf(v.palette, name) : text;
	};
	const lines = CODE.map((line) =>
		line
			.map(
				([role, t]) => `<span style="color:${resolve(role)}">${esc(t)}</span>`,
			)
			.join(""),
	);
	return `<pre class="term" style="background:${hexOf(v.palette, "base")};color:${text}">${lines.join("\n")}</pre>`;
}

function distinctSection(v: SheetVariant, rules: LegibilityRules): string {
	const accents = Object.entries(rules.text)
		.filter(([color, tier]) => tier === "accent" && v.palette.colors[color])
		.map(
			([color]) =>
				`<span style="color:${hexOf(v.palette, color)}">${esc(color)}</span>`,
		);
	return `<h3>Accents side by side <span class="hint">can you tell every pair apart?</span></h3>
	<div class="distinct" style="background:${hexOf(v.palette, "base")}">${accents.join(" ")}</div>`;
}

function variantSection(v: SheetVariant, input: SheetInput): string {
	const violations = paletteViolations({ [v.name]: v.palette }, input.rules);
	const count = violations.length;
	return `<section id="${esc(v.name)}" class="variant">
	<header class="variant-head"><h2>${esc(displayName(v.name))}</h2>
	<span class="pill ${count ? "pill-fail" : "pill-pass"}">${count ? `${count} rule violation${count === 1 ? "" : "s"}` : "all rules pass"}</span></header>
	${matrixSection(v, input.rules)}
	${fillsSection(v, input.rules)}
	${overlaysSection(v, input.rules)}
	<h3>In context <span class="hint">rendered from the generated theme files</span></h3>
	<h4>Terminal (WezTerm scheme)</h4>${terminalSection(v, input.rules)}
	<h4>Prompt (Starship)</h4>${promptSection(v)}
	<h4>Code (syntax roles)</h4>${codeSection(v, input.syntax)}
	${distinctSection(v, input.rules)}
	</section>`;
}

export function renderSheet(input: SheetInput): string {
	const { rules } = input;
	const tiers = Object.entries(rules.tiers)
		.map(
			([name, t]) =>
				`<li><strong>${esc(name)}</strong> ≥ ${t.min}:1. ${esc(t.description)}</li>`,
		)
		.join("");
	const allowed = allowedTextColors(
		input.variants.map((v) => v.palette),
		rules,
	);
	const allowedRows = Object.entries(allowed)
		.map(
			([s, colors]) =>
				`<tr><th scope="row">${esc(s)}</th><td>${esc(colors.join(", ") || "none")}</td></tr>`,
		)
		.join("");
	const nav = input.variants
		.map((v) => {
			const n = paletteViolations({ [v.name]: v.palette }, rules).length;
			return `<li><a href="#${esc(v.name)}">${esc(displayName(v.name))}</a> <span class="hint">${n} violation${n === 1 ? "" : "s"}</span></li>`;
		})
		.join("");
	return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Synthpunk Legibility Review</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600;700&family=IBM+Plex+Sans:wght@400;600;700&display=swap">
<style>${SHEET_CSS}</style></head>
<body><main>
<header class="summary">
	<h1>Synthpunk Legibility Review</h1>
	<p>Every text color from <code>palette/legibility.json</code> on every background, in each variant, plus samples rendered from the generated theme files. Contrast is the WCAG 2 ratio. Regenerate with <code>bun run legibility:sheet</code>.</p>
	<ul>${tiers}</ul>
	<nav><ul>${nav}</ul></nav>
	<h3>How to review</h3>
	<ol>
		<li>Read every <span style="color:var(--pass)">✓</span> sample at your normal viewing distance. Flag any that still feel hard to read; the threshold may need raising.</li>
		<li>Look at the <span style="color:var(--fail)">✗</span> samples. These break the rules today and are what the palette retune must fix.</li>
		<li>Check the terminal, prompt and code samples. A <strong style="color:var(--fail)">MISSING</strong> box means a tool can't load those colors from the generated file.</li>
		<li>In "Accents side by side", make sure every accent is distinguishable from its neighbors.</li>
		<li>Give each variant a thumbs up or down.</li>
	</ol>
	<h3>Allowed in every variant <span class="hint">text colors that meet their tier on that background in all variants</span></h3>
	<div class="scroll"><table class="allowed"><tbody>${allowedRows}</tbody></table></div>
</header>
${input.variants.map((v) => variantSection(v, input)).join("\n")}
</main></body></html>
`;
}

function readOptional<T>(file: string, parse: (text: string) => T): T | null {
	try {
		return parse(readFileSync(file, "utf8"));
	} catch {
		return null;
	}
}

if (import.meta.main) {
	const root = path.resolve(import.meta.dir, "..");
	const paletteDir = path.join(root, "palette");
	const starship = readOptional(
		path.join(root, "themes/starship/starship.toml"),
		(t) => Bun.TOML.parse(t) as Table,
	);
	const variants: SheetVariant[] = VARIANTS.map((name) => ({
		name,
		palette: loadPalette(paletteDir, name),
		wezterm: readOptional(
			path.join(root, `themes/wezterm/synthpunk-${name}.toml`),
			(t) => Bun.TOML.parse(t) as Table,
		),
		starship,
		vscodeColors: readOptional(
			path.join(
				root,
				`themes/vscode/themes/synthpunk-${name}-color-theme.json`,
			),
			(t) => (JSON.parse(t) as { colors: Record<string, string> }).colors,
		),
	}));
	const html = renderSheet({
		rules: loadLegibilityRules(paletteDir),
		syntax: JSON.parse(
			readFileSync(path.join(paletteDir, "syntax.json"), "utf8"),
		),
		variants,
	});
	const outDir = path.join(root, "review");
	mkdirSync(outDir, { recursive: true });
	const outFile = path.join(outDir, "legibility.html");
	writeFileSync(outFile, html);
	console.log(`Wrote ${path.relative(root, outFile)}`);
}
