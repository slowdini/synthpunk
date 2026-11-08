import { describe, expect, test } from "bun:test";
import { shouldGenerateIcon } from "./generation-options";

describe("asset generation options", () => {
	test("keeps branding unchanged by default", () => {
		expect(shouldGenerateIcon([])).toBe(false);
		expect(shouldGenerateIcon(["--unknown"])).toBe(false);
	});

	test("allows an explicit icon render", () => {
		expect(shouldGenerateIcon(["--icon"])).toBe(true);
	});
});
