import { describe, expect, test } from "bun:test";
import path from "node:path";
import { loadPalette } from "../palette";
import type { Palette, VariantName } from "../types";
import { VARIANTS } from "../types";
import { generateStarshipToml } from "./starship";

const PROJECT_DIR = path.resolve(import.meta.dir, "../../..");
const PALETTE_DIR = path.join(PROJECT_DIR, "palette");

function loadAllPalettes(): Record<VariantName, Palette> {
	const palettes: Record<string, Palette> = {};
	for (const v of VARIANTS) {
		palettes[v] = loadPalette(PALETTE_DIR, v);
	}
	return palettes as Record<VariantName, Palette>;
}

describe("generateStarshipToml", () => {
	const palettes = loadAllPalettes();
	const toml = generateStarshipToml(palettes);

	test("contains schema header", () => {
		expect(toml).toContain(
			"\"$schema\" = 'https://starship.rs/config-schema.json'",
		);
	});

	test("contains default palette line", () => {
		expect(toml).toContain("palette = 'synthpunk_pastel_dark'");
	});

	test("format string contains key segments", () => {
		expect(toml).toContain("$os");
		expect(toml).toContain("$username");
		expect(toml).toContain("$directory");
		expect(toml).toContain("$git_branch");
		expect(toml).toContain("$git_status");
		expect(toml).toContain("$rust");
		expect(toml).toContain("$nodejs");
		expect(toml).toContain("$python");
		expect(toml).toContain("$docker_context");
		expect(toml).toContain("$conda");
		expect(toml).toContain("$time");
		expect(toml).toContain("$cmd_duration");
		expect(toml).toContain("$line_break");
		expect(toml).toContain("$character");
	});

	test("all 4 palette sections present", () => {
		expect(toml).toContain("[palettes.synthpunk_pastel_dark]");
		expect(toml).toContain("[palettes.synthpunk_pastel_light]");
		expect(toml).toContain("[palettes.synthpunk_neon_dark]");
		expect(toml).toContain("[palettes.synthpunk_neon_light]");
	});

	test("pastel-dark palette has correct hex values", () => {
		expect(toml).toContain('rosewater = "#FFE8F0"');
		expect(toml).toContain('red = "#FF5470"');
		expect(toml).toContain('peach = "#FFA07A"');
		expect(toml).toContain('yellow = "#FFE4B5"');
		expect(toml).toContain('green = "#7FD7B5"');
		expect(toml).toContain('blue = "#8BA4FF"');
		expect(toml).toContain('lavender = "#C49BFF"');
		expect(toml).toContain('text = "#F0E0F0"');
		expect(toml).toContain('crust = "#0D0612"');
		expect(toml).toContain('base = "#1E1028"');
	});

	test("neon-dark palette has correct hex values", () => {
		expect(toml).toContain('rosewater = "#FFB8E0"');
		expect(toml).toContain('red = "#FF3A50"');
		expect(toml).toContain('green = "#40FF80"');
		expect(toml).toContain('lavender = "#D040FF"');
		expect(toml).toContain('crust = "#060210"');
	});

	test("each palette has exactly 23 color entries", () => {
		const colorNames = Object.keys(palettes["pastel-dark"].colors);
		expect(colorNames).toHaveLength(23);

		const pastelDarkSection = toml
			.split("[palettes.synthpunk_pastel_dark]")[1]
			?.split("[palettes.")[0];
		const pastelDarkLines =
			pastelDarkSection
				?.split("\n")
				.filter(
					(line: string) =>
						line.trim() && !line.startsWith("[") && line.includes("="),
				) ?? [];
		expect(pastelDarkLines).toHaveLength(23);
	});

	test("os module config exists with correct properties", () => {
		expect(toml).toContain("[os]");
		expect(toml).toContain("disabled = false");
		expect(toml).toContain('style = "bg:red fg:crust"');
	});

	test("os.symbols section exists", () => {
		expect(toml).toContain("[os.symbols]");
	});

	test("username module config exists with correct properties", () => {
		expect(toml).toContain("[username]");
		expect(toml).toContain("show_always = true");
		expect(toml).toContain('style_user = "bg:red fg:crust"');
		expect(toml).toContain('style_root = "bg:red fg:crust"');
	});

	test("directory module config exists with correct properties", () => {
		expect(toml).toContain("[directory]");
		expect(toml).toContain('style = "bg:peach fg:crust"');
		expect(toml).toContain("truncation_length = 3");
		expect(toml).toContain('truncation_symbol = ".../"');
	});

	test("directory.substitutions section exists", () => {
		expect(toml).toContain("[directory.substitutions]");
	});

	test("git_branch module config exists", () => {
		expect(toml).toContain("[git_branch]");
		expect(toml).toContain('style = "bg:yellow"');
	});

	test("git_status module config exists", () => {
		expect(toml).toContain("[git_status]");
		expect(toml).toContain('style = "bg:yellow"');
	});

	test("language modules exist with correct style", () => {
		for (const lang of [
			"c",
			"rust",
			"golang",
			"nodejs",
			"bun",
			"php",
			"java",
			"kotlin",
			"haskell",
			"python",
		]) {
			expect(toml).toContain(`[${lang}]`);
			expect(toml).toContain('style = "bg:green"');
		}
	});

	test("docker_context module config exists", () => {
		expect(toml).toContain("[docker_context]");
		expect(toml).toContain('style = "bg:sapphire"');
	});

	test("conda module config exists", () => {
		expect(toml).toContain("[conda]");
		expect(toml).toContain('style = "fg:crust bg:sapphire"');
	});

	test("time module config exists", () => {
		expect(toml).toContain("[time]");
		expect(toml).toContain("disabled = false");
		expect(toml).toContain('time_format = "%R"');
		expect(toml).toContain('style = "bg:lavender"');
	});

	test("line_break module config exists", () => {
		expect(toml).toContain("[line_break]");
		expect(toml).toContain("disabled = true");
	});

	test("character module config exists", () => {
		expect(toml).toContain("[character]");
		expect(toml).toContain("disabled = false");
		expect(toml).toContain('success_symbol = "[❯](bold fg:green)"');
		expect(toml).toContain('error_symbol = "[❯](bold fg:red)"');
	});

	test("cmd_duration module config exists", () => {
		expect(toml).toContain("[cmd_duration]");
		expect(toml).toContain("show_milliseconds = true");
		expect(toml).toContain("disabled = false");
	});
});
