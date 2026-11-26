import fs from "node:fs";
import path from "node:path";
import { loadClaudeMapping } from "./claudeMapping";
import { loadPalette } from "./palette";
import { loadFontStyles, loadScopes, loadSyntaxMapping } from "./syntaxMapping";
import {
	CLAUDE_LOOKS,
	claudeMarketplaceManifest,
	claudePluginManifest,
	generateCliTheme,
	generateDesktopLook,
	REGISTER_MODULE,
	REGISTER_TEST_MODULE,
	stringifyLooksModule,
} from "./targets/claude";
import {
	generateNeovimPalette,
	stringifyNeovimColorsFile,
	stringifyNeovimThemeModule,
} from "./targets/neovim";
import { generateStarshipToml } from "./targets/starship";
import { generateVSCodeTheme } from "./targets/vscode";
import { generateWeztermTheme, tomlStringify } from "./targets/wezterm";
import { generateZedTheme } from "./targets/zed";
import { loadTerminalMapping } from "./terminalMapping";
import { VARIANT_DISPLAY_NAMES, VARIANTS, type VariantName } from "./types";
import { loadUIMapping } from "./uiMapping";

const PROJECT_DIR = path.resolve(import.meta.dir, "../");
const PALETTE_DIR = path.join(PROJECT_DIR, "palette");
const ZED_EXTENSION_DIR = path.join(PROJECT_DIR, "themes", "zed");
const ZED_DIR = path.join(ZED_EXTENSION_DIR, "themes");
const VSCODE_DIR = path.join(PROJECT_DIR, "themes", "vscode", "themes");
const WEZTERM_DIR = path.join(PROJECT_DIR, "themes", "wezterm");
const STARSHIP_DIR = path.join(PROJECT_DIR, "themes", "starship");
const NEOVIM_DIR = path.join(PROJECT_DIR, "themes", "neovim");
const NEOVIM_COLORS_DIR = path.join(NEOVIM_DIR, "colors");
const NEOVIM_LUA_DIR = path.join(NEOVIM_DIR, "lua", "synthpunk");
const CLAUDE_PLUGIN_DIR = path.join(PROJECT_DIR, "themes", "claude");
const CLAUDE_MARKETPLACE_DIR = path.join(PROJECT_DIR, ".claude-plugin");

const VARIANT_VSCODE_FILE: Record<VariantName, string> = {
	"pastel-dark": "synthpunk-pastel-dark-color-theme.json",
	"pastel-light": "synthpunk-pastel-light-color-theme.json",
	"neon-dark": "synthpunk-neon-dark-color-theme.json",
	"neon-light": "synthpunk-neon-light-color-theme.json",
};

const VARIANT_WEZTERM_FILE: Record<VariantName, string> = {
	"pastel-dark": "synthpunk-pastel-dark.toml",
	"pastel-light": "synthpunk-pastel-light.toml",
	"neon-dark": "synthpunk-neon-dark.toml",
	"neon-light": "synthpunk-neon-light.toml",
};

function ensureDir(dir: string) {
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}
}

function generateAll() {
	const uiMapping = loadUIMapping(PALETTE_DIR);
	const terminalMapping = loadTerminalMapping(PALETTE_DIR);
	const syntaxMapping = loadSyntaxMapping(PALETTE_DIR);
	const scopes = loadScopes(PALETTE_DIR);
	const fontStyles = loadFontStyles(PALETTE_DIR);

	// Generate VSCode themes
	ensureDir(VSCODE_DIR);
	for (const variant of VARIANTS) {
		const palette = loadPalette(PALETTE_DIR, variant);
		const theme = generateVSCodeTheme(
			variant,
			palette,
			uiMapping,
			syntaxMapping,
			scopes,
			fontStyles,
		);
		const fileName = VARIANT_VSCODE_FILE[variant];
		const filePath = path.join(VSCODE_DIR, fileName);
		fs.writeFileSync(filePath, `${JSON.stringify(theme, null, "\t")}\n`);
		console.log(`Generated ${filePath}`);
	}

	// Generate Zed themes
	ensureDir(ZED_DIR);

	// Pastel (contains both dark and light)
	const pastelDarkPalette = loadPalette(PALETTE_DIR, "pastel-dark");
	const pastelLightPalette = loadPalette(PALETTE_DIR, "pastel-light");
	const pastelZedTheme = generateZedTheme(
		"synthpunk-pastel",
		"Synthpunk Pastel",
		"Synthpunk",
		pastelDarkPalette,
		pastelLightPalette,
		uiMapping,
		syntaxMapping,
		fontStyles,
	);
	const pastelZedPath = path.join(ZED_DIR, "synthpunk-pastel.json");
	fs.writeFileSync(
		pastelZedPath,
		`${JSON.stringify(pastelZedTheme, null, "\t")}\n`,
	);
	console.log(`Generated ${pastelZedPath}`);

	// Neon (contains both dark and light)
	const neonDarkPalette = loadPalette(PALETTE_DIR, "neon-dark");
	const neonLightPalette = loadPalette(PALETTE_DIR, "neon-light");
	const neonZedTheme = generateZedTheme(
		"synthpunk-neon",
		"Synthpunk Neon",
		"Synthpunk",
		neonDarkPalette,
		neonLightPalette,
		uiMapping,
		syntaxMapping,
		fontStyles,
	);
	const neonZedPath = path.join(ZED_DIR, "synthpunk-neon.json");
	fs.writeFileSync(
		neonZedPath,
		`${JSON.stringify(neonZedTheme, null, "\t")}\n`,
	);
	console.log(`Generated ${neonZedPath}`);

	// The Zed extension registry reads the license from the extension directory
	// only (it never walks up to the repository root), so the root LICENSE has to
	// be mirrored here or submission fails with "No license was found."
	const zedLicensePath = path.join(ZED_EXTENSION_DIR, "LICENSE");
	fs.copyFileSync(path.join(PROJECT_DIR, "LICENSE"), zedLicensePath);
	console.log(`Generated ${zedLicensePath}`);

	// Generate WezTerm themes
	ensureDir(WEZTERM_DIR);
	for (const variant of VARIANTS) {
		const palette = loadPalette(PALETTE_DIR, variant);
		const weztermTheme = generateWeztermTheme(
			variant,
			palette,
			uiMapping,
			terminalMapping,
		);
		const toml = tomlStringify(VARIANT_DISPLAY_NAMES[variant], weztermTheme);
		const fileName = VARIANT_WEZTERM_FILE[variant];
		const filePath = path.join(WEZTERM_DIR, fileName);
		fs.writeFileSync(filePath, toml);
		console.log(`Generated ${filePath}`);
	}

	// Generate Starship theme
	const starshipPalettes: Record<
		VariantName,
		ReturnType<typeof loadPalette>
	> = {} as Record<VariantName, ReturnType<typeof loadPalette>>;
	for (const variant of VARIANTS) {
		starshipPalettes[variant] = loadPalette(PALETTE_DIR, variant);
	}
	const starshipToml = generateStarshipToml(starshipPalettes);
	ensureDir(STARSHIP_DIR);
	const starshipPath = path.join(STARSHIP_DIR, "starship.toml");
	fs.writeFileSync(starshipPath, starshipToml);
	console.log(`Generated ${starshipPath}`);

	// Generate Neovim themes
	ensureDir(NEOVIM_COLORS_DIR);
	ensureDir(NEOVIM_LUA_DIR);

	// Build all variant palettes
	const neovimPalettes: Record<
		VariantName,
		ReturnType<typeof generateNeovimPalette>
	> = {} as Record<VariantName, ReturnType<typeof generateNeovimPalette>>;
	for (const variant of VARIANTS) {
		const palette = loadPalette(PALETTE_DIR, variant);
		neovimPalettes[variant] = generateNeovimPalette(
			variant,
			palette,
			uiMapping,
			syntaxMapping,
			scopes,
			fontStyles,
		);
	}

	// Write shared theme.lua
	const themeModuleLua = stringifyNeovimThemeModule(
		neovimPalettes["pastel-dark"],
		neovimPalettes["pastel-light"],
		neovimPalettes["neon-dark"],
		neovimPalettes["neon-light"],
	);
	const themeModulePath = path.join(NEOVIM_LUA_DIR, "theme.lua");
	fs.writeFileSync(themeModulePath, themeModuleLua);
	console.log(`Generated ${themeModulePath}`);

	// Write per-variant colors files
	const NEOVIM_COLORS_FILE: Record<VariantName, string> = {
		"pastel-dark": "synthpunk-pastel-dark.lua",
		"pastel-light": "synthpunk-pastel-light.lua",
		"neon-dark": "synthpunk-neon-dark.lua",
		"neon-light": "synthpunk-neon-light.lua",
	};
	for (const variant of VARIANTS) {
		const lua = stringifyNeovimColorsFile(variant);
		const filePath = path.join(NEOVIM_COLORS_DIR, NEOVIM_COLORS_FILE[variant]);
		fs.writeFileSync(filePath, lua);
		console.log(`Generated ${filePath}`);
	}

	generateClaudePlugin();
}

function writeGenerated(filePath: string, content: string) {
	ensureDir(path.dirname(filePath));
	fs.writeFileSync(filePath, content);
	console.log(`Generated ${filePath}`);
}

function writeJson(filePath: string, value: unknown) {
	writeGenerated(filePath, `${JSON.stringify(value, null, "\t")}\n`);
}

// One Claude Code plugin: the Desktop app's look (a mod's hooks module) and
// the CLI's /theme entries (theme files), plus the marketplace that lists it.
function generateClaudePlugin() {
	const mapping = loadClaudeMapping(PALETTE_DIR);
	const { version } = JSON.parse(
		fs.readFileSync(path.join(PROJECT_DIR, "package.json"), "utf-8"),
	) as { version: string };

	writeJson(
		path.join(CLAUDE_PLUGIN_DIR, ".claude-plugin", "plugin.json"),
		claudePluginManifest(version),
	);
	writeJson(path.join(CLAUDE_PLUGIN_DIR, "hooks", "hooks.json"), {
		modules: ["./register.ts"],
	});

	const looks = Object.fromEntries(
		CLAUDE_LOOKS.map((look) => [
			look.key,
			generateDesktopLook(
				look.label,
				loadPalette(PALETTE_DIR, look.variants.dark),
				loadPalette(PALETTE_DIR, look.variants.light),
				mapping,
			),
		]),
	);
	writeGenerated(
		path.join(CLAUDE_PLUGIN_DIR, "hooks", "looks.ts"),
		stringifyLooksModule(looks),
	);
	writeGenerated(
		path.join(CLAUDE_PLUGIN_DIR, "hooks", "register.ts"),
		REGISTER_MODULE,
	);
	writeGenerated(
		path.join(CLAUDE_PLUGIN_DIR, "hooks", "register.test.ts"),
		REGISTER_TEST_MODULE,
	);

	for (const variant of VARIANTS) {
		writeJson(
			path.join(CLAUDE_PLUGIN_DIR, "themes", `synthpunk-${variant}.json`),
			generateCliTheme(variant, loadPalette(PALETTE_DIR, variant), mapping),
		);
	}

	writeJson(
		path.join(CLAUDE_MARKETPLACE_DIR, "marketplace.json"),
		claudeMarketplaceManifest("./themes/claude"),
	);
}

generateAll();
