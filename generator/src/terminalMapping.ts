import fs from "node:fs";
import path from "node:path";
import type { TerminalMapping } from "./types";

export function loadTerminalMapping(paletteDir: string): TerminalMapping {
	const filePath = path.join(paletteDir, "terminal-mapping.json");
	const raw = fs.readFileSync(filePath, "utf-8");
	return JSON.parse(raw) as TerminalMapping;
}
