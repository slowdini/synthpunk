import type { ThemeColors } from "claude-code";
import { composite, rgbToHex } from "../colorUtils";
import { colorToHex, resolveColor } from "../palette";
import type {
	ClaudeAnchorName,
	ClaudeCliColor,
	ClaudeMapping,
	Palette,
	VariantName,
} from "../types";
import { VARIANT_DISPLAY_NAMES, VARIANT_TYPE } from "../types";
import { makeColors } from "../vendor/make-colors.js";

type Hex = `#${string}`;
type Mode = "dark" | "light";

/** A look the Desktop app can show: one palette per mode, picked by `key`. */
export interface ClaudeLook {
	key: string;
	label: string;
	variants: Record<Mode, VariantName>;
}

/** The looks the plugin's `variant` option picks between; the first is the default. */
export const CLAUDE_LOOKS: readonly ClaudeLook[] = [
	{
		key: "pastel",
		label: "Synthpunk Pastel",
		variants: { dark: "pastel-dark", light: "pastel-light" },
	},
	{
		key: "neon",
		label: "Synthpunk Neon",
		variants: { dark: "neon-dark", light: "neon-light" },
	},
];

/** A CLI theme file, as `/theme` reads it from a plugin's `themes/` folder. */
export interface ClaudeCliTheme {
	name: string;
	base: Mode;
	overrides: Record<string, string>;
}

const REPOSITORY = "https://github.com/slowdini/synthpunk";
const AUTHOR = { name: "slowdini", url: "https://github.com/slowdini" };

function lowerHex(palette: Palette, colorName: string): Hex {
	return `#${resolveColor(palette, colorName).hex.toLowerCase()}`;
}

function hexEach<K extends string>(
	palette: Palette,
	names: Partial<Record<K, string>>,
): Partial<Record<K, Hex>> {
	return Object.fromEntries(
		Object.entries(names)
			.filter((entry): entry is [K, string] => entry[1] !== undefined)
			.map(([key, name]) => [key, lowerHex(palette, name)]),
	) as Partial<Record<K, Hex>>;
}

/** One mode's makeColors anchors, as the palette's hex values. */
export function desktopAnchorHexes(
	mapping: ClaudeMapping,
	palette: Palette,
	mode: Mode,
): { "surface-0": Hex; "text-primary": Hex } & Partial<
	Record<ClaudeAnchorName, Hex>
> {
	const anchors = mapping.desktop.anchors[mode];
	return {
		...hexEach<ClaudeAnchorName>(palette, anchors),
		"surface-0": lowerHex(palette, anchors["surface-0"]),
		"text-primary": lowerHex(palette, anchors["text-primary"]),
	};
}

/**
 * The Desktop app's palette for one look, built by the design system's own
 * makeColors. Throws where the Desktop app would refuse to paint it: it then
 * ignores the whole theme, so shipping one would paint nothing.
 */
export function generateDesktopLook(
	label: string,
	darkPalette: Palette,
	lightPalette: Palette,
	mapping: ClaudeMapping,
): ThemeColors {
	const mode = (palette: Palette, name: Mode) => ({
		gray: { anchors: desktopAnchorHexes(mapping, palette, name) },
		roles: hexEach(palette, mapping.desktop.roles),
		git: hexEach(palette, mapping.desktop.git),
	});
	const { theme, problems } = makeColors({
		label,
		id: label.toLowerCase().replace(/\s+/g, "-"),
		dark: mode(darkPalette, "dark"),
		light: mode(lightPalette, "light"),
	});
	const unpainted = problems.filter((line) =>
		line.startsWith("Desktop won't paint"),
	);
	if (unpainted.length > 0) {
		throw new Error(`${label}:\n${unpainted.join("\n")}`);
	}
	return theme;
}

function cliColor(palette: Palette, value: ClaudeCliColor): string {
	if (typeof value === "string") {
		return colorToHex(resolveColor(palette, value));
	}
	const color = resolveColor(palette, value.color);
	const base = resolveColor(palette, "base");
	return `#${rgbToHex(...composite(color.rgb, value.alpha, base.rgb))}`;
}

/**
 * One CLI theme: the variant's colors over the built-in theme of its kind.
 * Every value is opaque, since the terminal draws no alpha; a translucent
 * mapping is blended over the variant's `base`, the terminal background the
 * matching WezTerm theme sets.
 */
export function generateCliTheme(
	variant: VariantName,
	palette: Palette,
	mapping: ClaudeMapping,
): ClaudeCliTheme {
	return {
		name: VARIANT_DISPLAY_NAMES[variant],
		base: VARIANT_TYPE[variant],
		overrides: Object.fromEntries(
			Object.entries(mapping.cli).map(([token, value]) => [
				token,
				cliColor(palette, value),
			]),
		),
	};
}

/** The plugin's `.claude-plugin/plugin.json`. */
export function claudePluginManifest(version: string) {
	return {
		name: "synthpunk",
		version,
		description:
			"Synthpunk, a synthwave color scheme, for Claude Code: the Desktop app in Pastel or Neon, light and dark, and four CLI themes for /theme.",
		author: AUTHOR,
		homepage: REPOSITORY,
		repository: REPOSITORY,
		license: "MIT",
		keywords: ["theme", "synthwave", "vaporwave", "pastel", "neon"],
		userConfig: {
			variant: {
				type: "string",
				title: "Look",
				description:
					"Which Synthpunk look the Desktop app shows. Light or dark follows the app's own setting.",
				options: CLAUDE_LOOKS.map((look) => look.key),
				default: CLAUDE_LOOKS[0].key,
			},
		},
	};
}

/** The repository's `.claude-plugin/marketplace.json`, listing the plugin. */
export function claudeMarketplaceManifest(pluginSource: string) {
	return {
		name: "synthpunk",
		description:
			"Synthpunk, a synthwave-inspired color scheme, as a Claude Code plugin.",
		owner: AUTHOR,
		plugins: [
			{
				name: "synthpunk",
				source: pluginSource,
				description: claudePluginManifest("").description,
			},
		],
	};
}

const GENERATED = "// Generated by generator/targets/claude.ts. Don't edit.";

/** `hooks/looks.ts`: each look's resolved palette, keyed as the option names it. */
export function stringifyLooksModule(looks: Record<string, ThemeColors>) {
	const keys = Object.keys(looks)
		.map((key) => JSON.stringify(key))
		.join(" | ");
	return `${GENERATED}
import type { ThemeColors } from "claude-code";

export const LOOKS: Record<${keys}, ThemeColors> = ${JSON.stringify(looks, null, "\t")};
`;
}

/**
 * `hooks/register.test.ts`: the mod's own test, run against the engine with
 * `claude plugin test themes/claude` (bun test skips it; see bunfig.toml).
 */
export const REGISTER_TEST_MODULE = `${GENERATED}
// Run with \`claude plugin test themes/claude\`.
import { expect, test } from "claude-code/testing";
import { LOOKS } from "./looks";

// Nothing sits beneath the plugin in a test: each hook here stands for the
// engine. A call on \`$\` is answered \`{ value }\`; an event by its own result.
for (const variant of Object.keys(LOOKS) as (keyof typeof LOOKS)[]) {
	test(\`session start paints the \${variant} look\`, { options: { variant } }, async ($, on) => {
		const painted: unknown[] = [];
		on("session.start", (_, e) => ({ cwd: e.cwd }));
		on("theme.set", (_, e) => {
			painted.push(e.colors);
			return { value: { isDrawn: true, requestId: "theme" } };
		});

		await $.session.start({ cwd: "/", surface: "desktop", isInteractive: true });

		expect(painted).toEqual([LOOKS[variant]]);
	});
}

test("a session no surface draws the look for still starts", { options: { variant: "neon" } }, async ($, on) => {
	on("session.start", (_, e) => ({ cwd: e.cwd }));
	on("theme.set", () => ({ value: { isDrawn: false, reason: "no client draws themes" } }));

	expect(await $.session.start({ cwd: "/", surface: "terminal", isInteractive: true })).toEqual({ cwd: "/" });
});

test("a look no surface draws puts nothing in the transcript", async ($, on) => {
	const sinks: unknown[] = [];
	on("session.start", (_, e) => ({ cwd: e.cwd }));
	on("theme.set", () => ({ value: { isDrawn: false, reason: "no client draws themes" } }));
	on("ui.log", (_, e) => {
		sinks.push(e.to ?? "transcript");
		return { value: undefined };
	});

	await $.session.start({ cwd: "/", surface: "terminal", isInteractive: true });

	expect(sinks).toEqual(["debug"]);
});
`;

/**
 * `hooks/register.ts`: paints the session in the look the plugin's `variant`
 * option names. Only the desktop and mobile apps draw a look; a terminal
 * session gets the CLI themes in `themes/` through `/theme` instead, so a look
 * nobody draws is noted in the debug log and nothing more.
 */
export const REGISTER_MODULE = `${GENERATED}
import type { Register } from "claude-code";
import { LOOKS } from "./looks";

type LookKey = keyof typeof LOOKS;

const DEFAULT_LOOK: LookKey = ${JSON.stringify(CLAUDE_LOOKS[0].key)};

function lookOf(variant: unknown): LookKey {
	return typeof variant === "string" && variant in LOOKS ? (variant as LookKey) : DEFAULT_LOOK;
}

export const register: Register = (on, options) => {
	on("session.start", async ($, e, next) => {
		const set = await $.theme.set({ colors: LOOKS[lookOf(options.variant)] });

		if (!set.isDrawn) {
			$.ui.log(\`Synthpunk look not drawn: \${set.reason}\`, { to: "debug" });
		}

		return next(e);
	});
};
`;
