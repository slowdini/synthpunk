import fs from "node:fs";
import path from "node:path";
import { colorToHex, resolveColor } from "./palette";
import type { Palette, UIMapping } from "./types";

export function loadUIMapping(paletteDir: string): UIMapping {
	const filePath = path.join(paletteDir, "ui-mapping.json");
	const raw = fs.readFileSync(filePath, "utf-8");
	return JSON.parse(raw) as UIMapping;
}

export function resolveUIColor(
	mapping: UIMapping,
	palette: Palette,
	group: string,
	key: string,
	alpha?: number,
): string {
	const groupMap = (
		mapping as unknown as Record<string, Record<string, string>>
	)[group];
	if (!groupMap) {
		throw new Error(`Unknown UI mapping group: "${group}"`);
	}
	const colorName = groupMap[key];
	if (!colorName) {
		throw new Error(`Unknown UI mapping key: "${group}.${key}"`);
	}
	const color = resolveColor(palette, colorName);
	return colorToHex(color, alpha);
}
