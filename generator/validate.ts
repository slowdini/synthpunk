import path from "node:path";
import { loadPalette } from "./palette";
import { loadScopes, loadSyntaxMapping } from "./syntaxMapping";
import type { VariantName } from "./types";
import { loadUIMapping } from "./uiMapping";

const PROJECT_DIR = path.resolve(import.meta.dir, "../");
const PALETTE_DIR = path.join(PROJECT_DIR, "palette");

const VARIANTS: VariantName[] = [
	"pastel-dark",
	"pastel-light",
	"neon-dark",
	"neon-light",
];

function validatePalettes(): boolean {
	let ok = true;
	for (const variant of VARIANTS) {
		try {
			const palette = loadPalette(PALETTE_DIR, variant);
			const colorNames = Object.keys(palette.colors);
			let errors = 0;
			for (const name of colorNames) {
				const color = palette.colors[name];
				const expectedHex = `${color.rgb[0].toString(16).padStart(2, "0").toUpperCase()}${color.rgb[1].toString(16).padStart(2, "0").toUpperCase()}${color.rgb[2].toString(16).padStart(2, "0").toUpperCase()}`;
				if (color.hex.toUpperCase() !== expectedHex) {
					console.error(
						`  Hex/RGB mismatch for ${name}: hex=${color.hex}, expected=${expectedHex}`,
					);
					errors++;
				}
			}
			if (errors > 0) {
				ok = false;
			} else {
				console.log(
					`  OK — ${palette.info.name}: ${colorNames.length} colors validated`,
				);
			}
		} catch (e) {
			console.error(`  FAILED: ${variant}: ${e}`);
			ok = false;
		}
	}
	return ok;
}

function validateMappings(): boolean {
	let ok = true;
	const uiMapping = loadUIMapping(PALETTE_DIR);
	const syntaxMapping = loadSyntaxMapping(PALETTE_DIR);

	for (const variant of VARIANTS) {
		const palette = loadPalette(PALETTE_DIR, variant);

		const groups = [
			"background",
			"surface",
			"text",
			"border",
			"editor",
			"terminal",
			"status",
			"vcs",
		] as const;
		for (const group of groups) {
			const groupMap = (
				uiMapping as unknown as Record<string, Record<string, string>>
			)[group];
			for (const [key, colorName] of Object.entries(groupMap)) {
				if (!(colorName in palette.colors)) {
					console.error(
						`  Unknown color "${colorName}" in ui-mapping.${group}.${key} for ${variant}`,
					);
					ok = false;
				}
			}
		}

		const syntaxGroups = [
			"keywords",
			"storage",
			"literals",
			"comments",
			"functions",
			"variables",
			"entities",
			"support",
			"invalid",
			"emphasis",
		] as const;
		for (const group of syntaxGroups) {
			const groupMap = (
				syntaxMapping as unknown as Record<string, Record<string, string>>
			)[group];
			if (!groupMap) continue;
			for (const [key, colorName] of Object.entries(groupMap)) {
				if (!(colorName in palette.colors)) {
					console.error(
						`  Unknown color "${colorName}" in syntax.${group}.${key} for ${variant}`,
					);
					ok = false;
				}
			}
		}

		console.log(`  OK — ${variant} mapping validations passed`);
	}
	return ok;
}

function validateScopes(): boolean {
	const scopes = loadScopes(PALETTE_DIR);
	const syntaxMapping = loadSyntaxMapping(PALETTE_DIR);
	let ok = true;
	for (const entry of scopes) {
		const parts = entry.syntaxRole.split(".");
		const group = parts[0];
		const role = parts.slice(1).join(".");
		const groupMap = (
			syntaxMapping as unknown as Record<string, Record<string, string>>
		)[group];
		if (!groupMap || !(role in groupMap)) {
			console.error(
				`  Unknown syntaxRole "${entry.syntaxRole}" in scope "${entry.name}"`,
			);
			ok = false;
		}
	}
	if (ok) console.log(`  OK — ${scopes.length} scopes validated`);
	return ok;
}

export function validate(): boolean {
	console.log("Validating palettes...");
	const p = validatePalettes();
	console.log("\nValidating mappings...");
	const m = validateMappings();
	console.log("\nValidating scopes...");
	const s = validateScopes();
	console.log(`\n${"=".repeat(50)}`);
	if (p && m && s) {
		console.log("All validations passed!");
		return true;
	}
	console.log("Some validations failed.");
	return false;
}

if (import.meta.main) {
	const success = validate();
	process.exit(success ? 0 : 1);
}
