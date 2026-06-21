#!/usr/bin/env bun
import { readFileSync, writeFileSync } from "node:fs";
import { VERSION_LOCKED_MANIFESTS } from "./manifest-files";

/**
 * Rewrites the `version` field in each manifest, then runs JSON files through
 * biome so the output is byte-for-byte what `biome check` produces. Without the
 * biome pass, `JSON.stringify(_, null, 2)` explodes short arrays
 * one-element-per-line while biome collapses them — so every bump would
 * reintroduce a formatting diff the pre-commit hook then fights. TOML files are
 * updated in-place with a targeted regex (biome does not format TOML). Returns
 * the list of files that were actually updated.
 */
export function bumpFiles(files: readonly string[], version: string): string[] {
	const updatedFiles: string[] = [];
	const jsonFiles: string[] = [];

	for (const file of files) {
		if (file.endsWith(".toml")) {
			if (bumpToml(file, version)) {
				updatedFiles.push(file);
				console.log(`Bumped ${file}`);
			} else {
				console.log(`Skipped ${file} (no version field)`);
			}
		} else {
			if (bumpJson(file, version)) {
				updatedFiles.push(file);
				jsonFiles.push(file);
				console.log(`Bumped ${file}`);
			} else {
				console.log(`Skipped ${file} (no version field)`);
			}
		}
	}

	if (jsonFiles.length > 0) {
		formatWithBiome(jsonFiles);
	}

	return updatedFiles;
}

function bumpJson(file: string, version: string): boolean {
	const content = JSON.parse(readFileSync(file, "utf8"));
	if (content.version === undefined) {
		return false;
	}
	content.version = version;
	writeFileSync(file, `${JSON.stringify(content, null, 2)}\n`);
	return true;
}

function bumpToml(file: string, version: string): boolean {
	const content = readFileSync(file, "utf8");
	const versionPattern = /^version = ".*"/m;
	if (!versionPattern.test(content)) {
		return false;
	}
	const updated = content.replace(versionPattern, `version = "${version}"`);
	writeFileSync(file, updated);
	return true;
}

/**
 * Normalizes the given JSON files with the project's biome so a version bump
 * never leaves a file in a state `biome check` would want to reformat. Fails
 * loudly: a silent skip would reintroduce the formatting drift this exists to
 * prevent.
 */
function formatWithBiome(files: string[]): void {
	const result = Bun.spawnSync(
		["bunx", "@biomejs/biome", "format", "--write", ...files],
		{ stdout: "pipe", stderr: "pipe" },
	);
	if (result.exitCode !== 0) {
		console.error(result.stderr.toString());
		throw new Error(
			`biome formatting failed (exit ${result.exitCode}); manifests may be left in a non-canonical format`,
		);
	}
}

if (import.meta.main) {
	const version = process.argv[2];
	if (!version || !/^\d+\.\d+\.\d+/.test(version)) {
		console.error("Usage: bun scripts/bump-version.ts <version>");
		process.exit(1);
	}
	bumpFiles(VERSION_LOCKED_MANIFESTS, version);
}
