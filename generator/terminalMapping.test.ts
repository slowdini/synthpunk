import { describe, expect, test } from "bun:test";
import path from "node:path";
import { loadTerminalMapping } from "./terminalMapping";

const PROJECT_DIR = path.resolve(import.meta.dir, "../");
const PALETTE_DIR = path.join(PROJECT_DIR, "palette");

describe("loadTerminalMapping", () => {
	test("loads terminal mapping from palette directory", () => {
		const mapping = loadTerminalMapping(PALETTE_DIR);

		expect(mapping.info.name).toBe("synthpunk-terminal");
		expect(mapping.cursor.bg).toBe("lavender");
		expect(mapping.cursor.fg).toBe("base");
		expect(mapping.cursor.border).toBe("lavender");
		expect(mapping.selection.bg).toBe("teal");
		expect(mapping.selection.bg_alpha).toBeCloseTo(0.3);
		expect(mapping.tab_bar.background).toBe("mantle");
		expect(mapping.tab_bar.active_tab.bg).toBe("base");
		expect(mapping.tab_bar.active_tab.fg).toBe("text");
		expect(mapping.split).toBe("surface1");
		expect(mapping.compose_cursor).toBe("flamingo");
	});
});
