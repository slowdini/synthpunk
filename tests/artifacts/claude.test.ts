import { describe, expect, test } from "bun:test";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import {
	VARIANT_DISPLAY_NAMES,
	VARIANT_TYPE,
	VARIANTS,
} from "../../generator/types";
import { checkColors } from "../../generator/vendor/make-colors.js";
import { expectLegible, palette, REPO_ROOT, textPair } from "./pairs";

// These tests read the committed plugin files the way Claude Code does: the
// hooks module's looks for the Desktop app, the theme files for the CLI's
// /theme, and the manifests that install them. CI's generator sync check
// guarantees the committed files equal `bun run build` output.

const PLUGIN_DIR = join(REPO_ROOT, "themes", "claude");
const HEX_COLOR = /^#[0-9A-F]{6}$/;

function readJson(...parts: string[]): Record<string, unknown> {
	return JSON.parse(readFileSync(join(...parts), "utf8"));
}

// The tokens a CLI theme file may override, from the custom theme reference
// (code.claude.com/docs/en/terminal-config#create-a-custom-theme). Claude
// Code ignores any other key, so a typo would silently paint nothing.
const CLI_TOKENS = new Set([
	"claude",
	"text",
	"inverseText",
	"inactive",
	"subtle",
	"suggestion",
	"permission",
	"remember",
	"success",
	"error",
	"warning",
	"merged",
	"promptBorder",
	"planMode",
	"autoAccept",
	"bashBorder",
	"ide",
	"fastMode",
	"effortUltra",
	"diffAdded",
	"diffRemoved",
	"diffAddedDimmed",
	"diffRemovedDimmed",
	"diffAddedWord",
	"diffRemovedWord",
	"userMessageBackground",
	"userMessageBackgroundHover",
	"selectionBg",
	"composerSidebarBackground",
	"bashMessageBackgroundColor",
	"memoryBackgroundColor",
]);

// Tokens drawn as text on the terminal background.
const CLI_FOREGROUNDS = [
	"claude",
	"text",
	"inactive",
	"subtle",
	"suggestion",
	"remember",
	"permission",
	"planMode",
	"autoAccept",
	"ide",
	"success",
	"error",
	"warning",
	"merged",
];

// Tokens drawn behind the `text` color.
const CLI_BACKGROUNDS = [
	"diffAdded",
	"diffRemoved",
	"diffAddedDimmed",
	"diffRemovedDimmed",
	"diffAddedWord",
	"diffRemovedWord",
	"userMessageBackground",
	"selectionBg",
	"composerSidebarBackground",
];

// Fills that `inverseText` labels sit on.
const CLI_INVERSE_FILLS = [
	"claude",
	"permission",
	"success",
	"error",
	"warning",
];

for (const variant of VARIANTS) {
	describe(`themes/claude/themes/synthpunk-${variant}.json`, () => {
		const theme = readJson(PLUGIN_DIR, "themes", `synthpunk-${variant}.json`);
		const overrides = theme.overrides as Record<string, string>;

		test("names the variant and builds on the built-in theme of its kind", () => {
			expect(Object.keys(theme).sort()).toEqual(["base", "name", "overrides"]);
			expect(theme.name).toBe(VARIANT_DISPLAY_NAMES[variant]);
			expect(theme.base).toBe(VARIANT_TYPE[variant]);
		});

		test("overrides only documented tokens, each with an opaque hex", () => {
			const unknown = Object.keys(overrides).filter(
				(key) => !CLI_TOKENS.has(key),
			);
			expect(unknown).toEqual([]);
			const notHex = Object.entries(overrides).filter(
				([, value]) => !HEX_COLOR.test(value),
			);
			expect(notHex).toEqual([]);
		});

		test("text colors meet the legibility rules on the terminal background", () => {
			const pal = palette(variant);
			const base = `#${pal.colors.base.hex}`;
			expectLegible([
				...CLI_FOREGROUNDS.map((token) =>
					textPair(token, overrides[token], base, pal),
				),
				...CLI_BACKGROUNDS.map((token) =>
					textPair(
						`text on ${token}`,
						overrides.text,
						overrides[token],
						pal,
						"body",
					),
				),
				...CLI_INVERSE_FILLS.map((token) =>
					textPair(
						`inverseText on ${token}`,
						overrides.inverseText,
						overrides[token],
						pal,
						"accent",
					),
				),
			]);
		});
	});
}

describe("themes/claude/hooks/looks.ts", async () => {
	const { LOOKS } = await import(join(PLUGIN_DIR, "hooks", "looks.ts"));

	for (const [key, look] of Object.entries(LOOKS)) {
		const problems = checkColors(look);

		test(`${key}: the Desktop app paints it`, () => {
			expect(
				problems.filter((line) => line.startsWith("Desktop won't paint")),
			).toEqual([]);
		});

		// The design system lists every pair under its own bar. Plain text on a
		// plain surface is what people read all day, so none of it may be listed.
		test(`${key}: text and role text clear the design system's bar on every surface`, () => {
			const plainText = problems.filter((line) =>
				/^text-(primary|secondary|muted|accent|danger|success|warning|pro) on surface-\d/.test(
					line,
				),
			);
			expect(plainText).toEqual([]);
		});

		test(`${key}: has a light and a dark half`, () => {
			const { inputs } = look as { inputs: Record<string, object> };
			expect(Object.keys(inputs).sort()).toEqual(["dark", "light"]);
		});
	}
});

describe("plugin manifests", () => {
	const manifest = readJson(PLUGIN_DIR, ".claude-plugin", "plugin.json");

	test("hooks.json names the hooks module, which exists", () => {
		const hooks = readJson(PLUGIN_DIR, "hooks", "hooks.json");
		expect(hooks).toEqual({ modules: ["./register.ts"] });
		expect(existsSync(join(PLUGIN_DIR, "hooks", "register.ts"))).toBe(true);
	});

	test("the variant option offers exactly the looks the module holds", async () => {
		const { LOOKS } = await import(join(PLUGIN_DIR, "hooks", "looks.ts"));
		const variant = (
			manifest.userConfig as Record<string, Record<string, unknown>>
		).variant;
		expect(variant.options).toEqual(Object.keys(LOOKS));
		expect(Object.keys(LOOKS)).toContain(variant.default as string);
	});

	test("the repository's marketplace lists the plugin at its folder", () => {
		const marketplace = readJson(
			REPO_ROOT,
			".claude-plugin",
			"marketplace.json",
		);
		const plugins = marketplace.plugins as { name: string; source: string }[];
		expect(plugins).toHaveLength(1);
		expect(plugins[0].name).toBe(manifest.name as string);
		expect(
			existsSync(
				join(REPO_ROOT, plugins[0].source, ".claude-plugin", "plugin.json"),
			),
		).toBe(true);
	});
});
