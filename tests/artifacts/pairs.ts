import { expect } from "bun:test";
import { join } from "node:path";
import { composite, hexToRgb, rgbToHex } from "../../generator/colorUtils";
import {
	checkPairs,
	type LegibilityPair,
	type LegibilityRules,
	loadLegibilityRules,
} from "../../generator/legibility";
import { loadPalette } from "../../generator/palette";
import type { Palette, VariantName } from "../../generator/types";

// Shared helpers for the artifact legibility tests: each target test pulls
// concrete fg/bg pairs out of a generated theme file and checks them against
// palette/legibility.json.

export const REPO_ROOT = join(import.meta.dir, "../..");
const PALETTE_DIR = join(REPO_ROOT, "palette");

export const RULES: LegibilityRules = loadLegibilityRules(PALETTE_DIR);

export function palette(variant: VariantName): Palette {
	return loadPalette(PALETTE_DIR, variant);
}

/**
 * An opaque `#RRGGBB` for a color as rendered over `backdrop`. Accepts
 * `#RRGGBB`, `#RRGGBBAA`, and CSS `rgba(r, g, b, a)`.
 */
export function flatten(color: string, backdrop: string): string {
	const rgba = color.match(
		/^rgba\(\s*(\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\s*\)$/,
	);
	if (rgba) {
		const [r, g, b, a] = rgba.slice(1).map(Number);
		return `#${rgbToHex(...composite([r, g, b], a, hexToRgb(backdrop)))}`;
	}
	const hex = color.replace("#", "");
	if (hex.length === 6) return `#${hex.toUpperCase()}`;
	const alpha = Number.parseInt(hex.slice(6, 8), 16) / 255;
	return `#${rgbToHex(...composite(hexToRgb(hex), alpha, hexToRgb(backdrop)))}`;
}

/**
 * The tier of a rule text color with exactly this hex (alpha ignored), or
 * undefined when none matches. When several share a hex, the strictest wins.
 */
export function tierOf(color: string, pal: Palette): string | undefined {
	const hex = color.replace("#", "").slice(0, 6).toUpperCase();
	const tiers = Object.entries(RULES.text)
		.filter(([name]) => pal.colors[name]?.hex.toUpperCase() === hex)
		.map(([, tier]) => tier);
	return tiers.sort((a, b) => RULES.tiers[b].min - RULES.tiers[a].min)[0];
}

/** `#RRGGBBff` -> `#RRGGBB`; anything translucent is left for checkPairs to reject. */
function opaque(color: string): string {
	const hex = color.replace("#", "").toUpperCase();
	return `#${hex.length === 8 && hex.endsWith("FF") ? hex.slice(0, 6) : hex}`;
}

/**
 * A pair whose tier comes from the fg color's palette role unless given. The
 * fg is composited over `bg`; `bg` must already be opaque. An fg that is no
 * rule text color gets a tier name that checkPairs reports.
 */
export function textPair(
	label: string,
	fg: string,
	bg: string,
	pal: Palette,
	tier?: string,
): LegibilityPair {
	const resolved =
		tier ?? tierOf(fg, pal) ?? `none (no palette text color ${fg})`;
	const opaqueBg = opaque(bg);
	return { label, fg: flatten(fg, opaqueBg), bg: opaqueBg, tier: resolved };
}

export function expectLegible(pairs: LegibilityPair[]): void {
	expect(pairs.length).toBeGreaterThan(0);
	expect(checkPairs(pairs, RULES)).toEqual([]);
}

/**
 * Tier for ANSI palette slot `index` (0-15) on the terminal background:
 * the six color slots are accent; black/white slots are muted, since
 * programs use them for de-emphasis as often as for text. Black on a dark
 * background is invisible by convention, so it returns null (exempt).
 */
export function ansiTier(index: number, isDark: boolean): string | null {
	const slot = index % 8;
	if (index === 0 && isDark) return null;
	return slot >= 1 && slot <= 6 ? "accent" : "muted";
}
