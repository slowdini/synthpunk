import fs from "node:fs";
import path from "node:path";
import {
	contrastRatio,
	ensureContrast,
	hexToRgb,
	rgbToHex,
} from "./colorUtils";
import { loadPalette } from "./palette";
import type { Palette } from "./types";
import { VARIANTS } from "./types";

const DEFAULT_PALETTE_DIR = path.resolve(import.meta.dir, "../palette");

export interface LegibilityTier {
	min: number;
	description: string;
}

/** Contents of palette/legibility.json. See schemas/legibility.json. */
export interface LegibilityRules {
	tiers: Record<string, LegibilityTier>;
	/** Palette color name -> tier it is held to when used as text. */
	text: Record<string, string>;
	/** Background color name -> tiers whose text colors must all pass on it. */
	surfaces: Record<string, string[]>;
	/** Accent fills, the colors allowed as text on them, and their tier. */
	fills: { colors: string[]; text: string[]; tier: string };
}

export interface MatrixCell {
	surface: string;
	color: string;
	tier: string;
	min: number;
	ratio: number;
	pass: boolean;
	/** The surface requires this color's tier, so a failure is a violation. */
	required: boolean;
}

export interface FillCell {
	fill: string;
	text: string;
	min: number;
	ratio: number;
	pass: boolean;
}

export type PaletteViolation =
	| {
			kind: "text";
			variant: string;
			color: string;
			tier: string;
			min: number;
			failures: { surface: string; ratio: number }[];
			/** Same hue, lightness shifted until every failing surface passes. */
			suggestion: string;
	  }
	| {
			kind: "fill";
			variant: string;
			fill: string;
			text: string;
			ratio: number;
			min: number;
	  }
	| { kind: "missing"; variant: string; color: string };

export interface LegibilityPair {
	label: string;
	/** Opaque `#RRGGBB`. */
	fg: string;
	/** Opaque `#RRGGBB`; composite translucent backgrounds first. */
	bg: string;
	tier: string;
}

export function loadLegibilityRules(
	paletteDir = DEFAULT_PALETTE_DIR,
): LegibilityRules {
	const raw = fs.readFileSync(path.join(paletteDir, "legibility.json"), "utf8");
	return JSON.parse(raw) as LegibilityRules;
}

/** Tier references that don't name a defined tier. */
export function validateRules(rules: LegibilityRules): string[] {
	const errors: string[] = [];
	const known = (tier: string) => Object.hasOwn(rules.tiers, tier);
	for (const [color, tier] of Object.entries(rules.text)) {
		if (!known(tier))
			errors.push(`text.${color} uses undefined tier "${tier}"`);
	}
	for (const [surface, tiers] of Object.entries(rules.surfaces)) {
		for (const tier of tiers) {
			if (!known(tier)) {
				errors.push(`surfaces.${surface} uses undefined tier "${tier}"`);
			}
		}
	}
	if (!known(rules.fills.tier)) {
		errors.push(`fills.tier uses undefined tier "${rules.fills.tier}"`);
	}
	return errors;
}

function rgbOf(palette: Palette, name: string): [number, number, number] {
	return hexToRgb(palette.colors[name].hex);
}

function has(palette: Palette, name: string): boolean {
	return Object.hasOwn(palette.colors, name);
}

/** Contrast of every rule text color on every rule surface in one palette. */
export function allowedMatrix(
	palette: Palette,
	rules: LegibilityRules,
): MatrixCell[] {
	const cells: MatrixCell[] = [];
	for (const [surface, requiredTiers] of Object.entries(rules.surfaces)) {
		if (!has(palette, surface)) continue;
		for (const [color, tier] of Object.entries(rules.text)) {
			if (!has(palette, color)) continue;
			const min = rules.tiers[tier].min;
			const ratio = contrastRatio(
				rgbOf(palette, color),
				rgbOf(palette, surface),
			);
			cells.push({
				surface,
				color,
				tier,
				min,
				ratio,
				pass: ratio >= min,
				required: requiredTiers.includes(tier),
			});
		}
	}
	return cells;
}

/** Contrast of every allowed fill text color on every fill in one palette. */
export function fillMatrix(
	palette: Palette,
	rules: LegibilityRules,
): FillCell[] {
	const min = rules.tiers[rules.fills.tier].min;
	const cells: FillCell[] = [];
	for (const fill of rules.fills.colors) {
		if (!has(palette, fill)) continue;
		for (const text of rules.fills.text) {
			if (!has(palette, text)) continue;
			const ratio = contrastRatio(rgbOf(palette, text), rgbOf(palette, fill));
			cells.push({ fill, text, min, ratio, pass: ratio >= min });
		}
	}
	return cells;
}

/**
 * For each surface, the text colors that meet their tier on it in every
 * palette. Mappings are shared across variants, so this is the set a mapping
 * can rely on.
 */
export function allowedTextColors(
	palettes: Palette[],
	rules: LegibilityRules,
): Record<string, string[]> {
	const matrices = palettes.map((palette) => allowedMatrix(palette, rules));
	const allowed: Record<string, string[]> = {};
	for (const surface of Object.keys(rules.surfaces)) {
		allowed[surface] = Object.keys(rules.text).filter((color) =>
			matrices.every((cells) =>
				cells.some((c) => c.surface === surface && c.color === color && c.pass),
			),
		);
	}
	return allowed;
}

function referencedColors(rules: LegibilityRules): string[] {
	return [
		...new Set([
			...Object.keys(rules.surfaces),
			...Object.keys(rules.text),
			...rules.fills.colors,
			...rules.fills.text,
		]),
	];
}

/** Every way the palettes break the rules, keyed by variant name. */
export function paletteViolations(
	palettes: Record<string, Palette>,
	rules: LegibilityRules,
): PaletteViolation[] {
	const violations: PaletteViolation[] = [];
	for (const [variant, palette] of Object.entries(palettes)) {
		const cells = allowedMatrix(palette, rules);
		for (const color of Object.keys(rules.text)) {
			const failing = cells
				.filter((c) => c.color === color && c.required && !c.pass)
				.sort((a, b) => a.ratio - b.ratio);
			if (failing.length === 0) continue;
			const { tier, min } = failing[0];
			let suggestion = rgbOf(palette, color);
			for (const { surface } of failing) {
				suggestion = ensureContrast(suggestion, rgbOf(palette, surface), min);
			}
			violations.push({
				kind: "text",
				variant,
				color,
				tier,
				min,
				failures: failing.map(({ surface, ratio }) => ({ surface, ratio })),
				suggestion: `#${rgbToHex(...suggestion)}`,
			});
		}
		for (const cell of fillMatrix(palette, rules)) {
			if (cell.pass) continue;
			violations.push({
				kind: "fill",
				variant,
				fill: cell.fill,
				text: cell.text,
				ratio: cell.ratio,
				min: cell.min,
			});
		}
		for (const color of referencedColors(rules)) {
			if (!has(palette, color)) {
				violations.push({ kind: "missing", variant, color });
			}
		}
	}
	return violations;
}

const OPAQUE_HEX = /^#[0-9A-F]{6}$/i;

/**
 * Check concrete fg/bg pairs (as a tool renders them) against their tiers.
 * Returns one readable message per failing pair; empty when all pass.
 */
export function checkPairs(
	pairs: LegibilityPair[],
	rules: LegibilityRules,
): string[] {
	const failures: string[] = [];
	for (const { label, fg, bg, tier } of pairs) {
		const translucent = [fg, bg].find((c) => !OPAQUE_HEX.test(c));
		if (translucent) {
			failures.push(
				`${label}: ${translucent} is not an opaque #RRGGBB color; composite it over its backdrop first`,
			);
			continue;
		}
		if (!Object.hasOwn(rules.tiers, tier)) {
			failures.push(`${label}: undefined tier "${tier}"`);
			continue;
		}
		const min = rules.tiers[tier].min;
		const ratio = contrastRatio(hexToRgb(fg), hexToRgb(bg));
		if (ratio < min) {
			failures.push(
				`${label}: ${fg} on ${bg} is ${ratio.toFixed(2)}:1, below the ${tier} minimum ${min}:1`,
			);
		}
	}
	return failures;
}

// --- CLI report -------------------------------------------------------------

function formatReport(
	palettes: Record<string, Palette>,
	rules: LegibilityRules,
): { text: string; violationCount: number } {
	const out: string[] = [];
	const tierSummary = Object.entries(rules.tiers)
		.map(([name, t]) => `${name} ≥ ${t.min}:1`)
		.join(" · ");
	out.push("Legibility report — rules in palette/legibility.json");
	out.push(`Tiers: ${tierSummary}`);
	out.push("");

	out.push("Allowed text colors (meet their tier in every variant):");
	const allowed = allowedTextColors(Object.values(palettes), rules);
	for (const [surface, colors] of Object.entries(allowed)) {
		out.push(`  ${surface.padEnd(9)} ${colors.join(", ") || "(none)"}`);
	}
	out.push("");

	out.push(
		"Contrast per variant (✗ required tier fails, · fails but not required):",
	);
	const surfaces = Object.keys(rules.surfaces);
	for (const [variant, palette] of Object.entries(palettes)) {
		const cells = allowedMatrix(palette, rules);
		out.push(
			`  ${variant.padEnd(19)}${surfaces.map((s) => s.padStart(10)).join("")}`,
		);
		for (const [color, tier] of Object.entries(rules.text)) {
			const row = surfaces.map((surface) => {
				const cell = cells.find(
					(c) => c.surface === surface && c.color === color,
				);
				if (!cell) return "—".padStart(10);
				const mark = cell.pass ? " " : cell.required ? "✗" : "·";
				return `${cell.ratio.toFixed(2)}${mark}`.padStart(10);
			});
			out.push(`    ${color.padEnd(10)}${tier.padEnd(7)}${row.join("")}`);
		}
	}
	out.push("");

	const fillMin = rules.tiers[rules.fills.tier].min;
	out.push(`Text on accent fills (${rules.fills.tier} ≥ ${fillMin}:1):`);
	for (const [variant, palette] of Object.entries(palettes)) {
		const byFill = rules.fills.colors.map((fill) => {
			const parts = fillMatrix(palette, rules)
				.filter((c) => c.fill === fill)
				.map((c) => `${c.text} ${c.ratio.toFixed(2)}${c.pass ? "" : "✗"}`);
			return `${fill} (${parts.join(", ")})`;
		});
		out.push(`  ${variant.padEnd(13)} ${byFill.join("  ")}`);
	}
	out.push("");

	const violations = paletteViolations(palettes, rules);
	out.push(`Violations: ${violations.length}`);
	for (const v of violations) {
		if (v.kind === "text") {
			const where = v.failures
				.map((f) => `${f.surface} ${f.ratio.toFixed(2)}`)
				.join(", ");
			out.push(
				`  ${v.variant.padEnd(13)} ${v.color} (${v.tier} ≥ ${v.min}) on ${where} → try ${v.suggestion}`,
			);
		} else if (v.kind === "fill") {
			out.push(
				`  ${v.variant.padEnd(13)} ${v.text} text on ${v.fill} fill is ${v.ratio.toFixed(2)} (${rules.fills.tier} ≥ ${v.min})`,
			);
		} else {
			out.push(`  ${v.variant.padEnd(13)} missing color "${v.color}"`);
		}
	}
	return { text: out.join("\n"), violationCount: violations.length };
}

if (import.meta.main) {
	const rules = loadLegibilityRules();
	const ruleErrors = validateRules(rules);
	if (ruleErrors.length > 0) {
		console.error(
			`Invalid palette/legibility.json:\n  ${ruleErrors.join("\n  ")}`,
		);
		process.exit(1);
	}
	const palettes = Object.fromEntries(
		VARIANTS.map((v) => [v, loadPalette(DEFAULT_PALETTE_DIR, v)]),
	);
	const report = formatReport(palettes, rules);
	console.log(report.text);
	process.exit(report.violationCount > 0 ? 1 : 0);
}
