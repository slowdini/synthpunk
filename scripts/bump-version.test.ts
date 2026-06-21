import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { bumpFiles } from "./bump-version";

const FIXTURE_ROOT = join(tmpdir(), `synthpunk-bump-test-${process.pid}`);

beforeAll(() => {
	mkdirSync(FIXTURE_ROOT, { recursive: true });
});

afterAll(() => {
	rmSync(FIXTURE_ROOT, { recursive: true, force: true });
});

describe("bump-version bumpFiles", () => {
	test("bumps JSON version field and emits biome-canonical formatting (short arrays stay one line)", () => {
		// Use a non-package.json filename: biome has special handling for
		// package.json that preserves expanded arrays.
		const file = join(FIXTURE_ROOT, "manifest.json");
		writeFileSync(
			file,
			[
				"{",
				'  "name": "demo",',
				'  "version": "0.0.1",',
				'  "keywords": [',
				'    "synthwave",',
				'    "vaporwave"',
				"  ]",
				"}",
				"",
			].join("\n"),
		);

		const updated = bumpFiles([file], "1.2.3");
		expect(updated).toEqual([file]);

		const content = readFileSync(file, "utf8");
		const parsed = JSON.parse(content) as {
			version: string;
			keywords: string[];
		};

		expect(parsed.version).toBe("1.2.3");
		expect(parsed.keywords).toEqual(["synthwave", "vaporwave"]);
		expect(content).toContain('"keywords": ["synthwave", "vaporwave"]');
		expect(content).toMatch(/\n$/);
	});

	test("bumps TOML version line in extension.toml", () => {
		const file = join(FIXTURE_ROOT, "extension.toml");
		writeFileSync(
			file,
			[
				'id = "synthpunk"',
				'name = "Synthpunk"',
				'version = "0.1.0"',
				"schema_version = 1",
				'repository = "https://github.com/slowdini/synthpunk"',
				"",
			].join("\n"),
		);

		const updated = bumpFiles([file], "2.0.0");
		expect(updated).toEqual([file]);

		const content = readFileSync(file, "utf8");
		expect(content).toContain('version = "2.0.0"');
		expect(content).not.toContain('version = "0.1.0"');
		expect(content).toContain('id = "synthpunk"');
		expect(content).toContain("schema_version = 1");
	});

	test("skips JSON files without a version field", () => {
		const noVersion = join(FIXTURE_ROOT, "no-version.json");
		writeFileSync(noVersion, `${JSON.stringify({ name: "x" }, null, 2)}\n`);

		const updated = bumpFiles([noVersion], "3.0.0");
		expect(updated).toEqual([]);
	});

	test("handles mixed JSON and TOML files in one call", () => {
		const jsonFile = join(FIXTURE_ROOT, "mixed.json");
		writeFileSync(
			jsonFile,
			`${JSON.stringify({ name: "demo", version: "0.0.1" }, null, 2)}\n`,
		);
		const tomlFile = join(FIXTURE_ROOT, "mixed.toml");
		writeFileSync(tomlFile, `id = "demo"\nversion = "0.0.1"\n`);

		const updated = bumpFiles([jsonFile, tomlFile], "4.5.6");
		expect(updated).toEqual([jsonFile, tomlFile]);

		const jsonParsed = JSON.parse(readFileSync(jsonFile, "utf8")) as {
			version: string;
		};
		expect(jsonParsed.version).toBe("4.5.6");

		const tomlContent = readFileSync(tomlFile, "utf8");
		expect(tomlContent).toContain('version = "4.5.6"');
	});
});
