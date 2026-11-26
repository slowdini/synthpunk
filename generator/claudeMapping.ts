import fs from "node:fs";
import path from "node:path";
import type { ClaudeMapping } from "./types";

export function loadClaudeMapping(paletteDir: string): ClaudeMapping {
	const filePath = path.join(paletteDir, "claude-mapping.json");
	const raw = fs.readFileSync(filePath, "utf-8");
	return JSON.parse(raw) as ClaudeMapping;
}

/** Every palette color name the mapping refers to, each once. */
export function claudeMappingColorNames(mapping: ClaudeMapping): string[] {
	const names = [
		...Object.values(mapping.desktop.anchors.dark),
		...Object.values(mapping.desktop.anchors.light),
		...Object.values(mapping.desktop.roles),
		...Object.values(mapping.desktop.git),
		...Object.values(mapping.cli).map((value) =>
			typeof value === "string" ? value : value.color,
		),
	].filter((name): name is string => name !== undefined);
	return [...new Set(names)];
}
