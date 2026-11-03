import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { LegibilityPair } from "../../generator/legibility";
import { VARIANTS } from "../../generator/types";
import { expectLegible, palette, REPO_ROOT, RULES, textPair } from "./pairs";

// Starship draws prompt segments as text on accent fills, and the prompt
// character on the terminal background (the variant's `base`).

type Table = Record<string, unknown>;

const config = Bun.TOML.parse(
	readFileSync(join(REPO_ROOT, "themes", "starship", "starship.toml"), "utf8"),
) as Table;

/** Every style spec a module applies to its own text. */
function moduleStyles(module: Table): string[] {
	const styles = ["style", "style_user", "style_root"]
		.map((key) => module[key])
		.filter((s): s is string => typeof s === "string");
	const format = typeof module.format === "string" ? module.format : "";
	// Inline styles: the `(…)` that follows a `[text]` group.
	const inline = [...format.matchAll(/\]\(([^)$]*)\)/g)].map((m) => m[1]);
	return [...styles, ...inline];
}

function token(style: string, key: "fg" | "bg"): string | undefined {
	return style.match(new RegExp(`(?:^|\\s)${key}:(\\w+)`))?.[1];
}

describe("themes/starship/starship.toml", () => {
	const modules = Object.entries(config).filter(
		([name, value]) =>
			typeof value === "object" &&
			value !== null &&
			!Array.isArray(value) &&
			name !== "palettes",
	) as [string, Table][];

	test("finds styled segments to check", () => {
		const segments = modules.flatMap(([, m]) =>
			moduleStyles(m).filter((s) => token(s, "fg") && token(s, "bg")),
		);
		expect(segments.length).toBeGreaterThan(5);
	});

	for (const variant of VARIANTS) {
		test(`${variant} palette: segment and prompt text meets the legibility rules`, () => {
			const paletteName = `synthpunk_${variant.replaceAll("-", "_")}`;
			const colors = (
				config.palettes as Record<string, Record<string, string>>
			)[paletteName];
			const pal = palette(variant);
			const base = `#${pal.colors.base.hex}`;
			const pairs: LegibilityPair[] = [];
			for (const [name, module] of modules) {
				for (const style of moduleStyles(module)) {
					const fg = token(style, "fg");
					const bg = token(style, "bg");
					if (fg && bg) {
						pairs.push(
							textPair(
								`${name}: fg:${fg} bg:${bg}`,
								colors[fg],
								colors[bg],
								pal,
								RULES.fills.tier,
							),
						);
					}
				}
				// Prompt characters, e.g. success_symbol = "[❯](bold fg:green)".
				for (const [key, value] of Object.entries(module)) {
					if (!key.endsWith("_symbol") || typeof value !== "string") continue;
					for (const style of value.matchAll(/\]\(([^)]*)\)/g)) {
						const fg = token(style[1], "fg");
						if (fg && !token(style[1], "bg")) {
							pairs.push(
								textPair(`${name}.${key}: fg:${fg}`, colors[fg], base, pal),
							);
						}
					}
				}
			}
			expectLegible(pairs);
		});
	}
});
