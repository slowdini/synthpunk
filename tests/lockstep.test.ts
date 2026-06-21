import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { VERSION_LOCKED_MANIFESTS } from "../scripts/manifest-files";

const REPO_ROOT = join(import.meta.dir, "..");

function readVersion(relPath: string): string | undefined {
	const content = readFileSync(join(REPO_ROOT, relPath), "utf8");

	if (relPath.endsWith(".toml")) {
		const match = content.match(/^version = "(.*)"/m);
		return match?.[1];
	}

	const parsed = JSON.parse(content) as { version?: string };
	return parsed.version;
}

describe("version lockstep", () => {
	const packageVersion = readVersion("package.json") as string;

	test.each([
		...VERSION_LOCKED_MANIFESTS,
	])("%s version matches package.json (%s)", (relPath) => {
		const version = readVersion(relPath);
		expect(version).toBeDefined();
		expect(version).toBe(packageVersion);
	});
});
