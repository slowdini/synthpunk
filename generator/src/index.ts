import fs from "node:fs";
import path from "node:path";
import { loadPalette } from "./palette";
import { loadUIMapping } from "./uiMapping";
import { loadSyntaxMapping, loadScopes, loadFontStyles } from "./syntaxMapping";
import { generateVSCodeTheme } from "./targets/vscode";
import { generateZedTheme } from "./targets/zed";
import { generateWeztermTheme, tomlStringify } from "./targets/wezterm";
import { loadTerminalMapping } from "./terminalMapping";
import { VariantName, VARIANT_DISPLAY_NAMES, VARIANTS } from "./types";

const PROJECT_DIR = path.resolve(import.meta.dir, "../..");
const PALETTE_DIR = path.join(PROJECT_DIR, "palette");
const ZED_DIR = path.join(PROJECT_DIR, "themes", "zed", "themes");
const VSCODE_DIR = path.join(PROJECT_DIR, "themes", "vscode", "themes");
const WEZTERM_DIR = path.join(PROJECT_DIR, "themes", "wezterm");

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
    const theme = generateVSCodeTheme(variant, palette, uiMapping, syntaxMapping, scopes, fontStyles);
    const fileName = VARIANT_VSCODE_FILE[variant];
    const filePath = path.join(VSCODE_DIR, fileName);
    fs.writeFileSync(filePath, JSON.stringify(theme, null, 2) + "\n");
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
  fs.writeFileSync(pastelZedPath, JSON.stringify(pastelZedTheme, null, 2) + "\n");
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
  fs.writeFileSync(neonZedPath, JSON.stringify(neonZedTheme, null, 2) + "\n");
  console.log(`Generated ${neonZedPath}`);

  // Generate WezTerm themes
  ensureDir(WEZTERM_DIR);
  for (const variant of VARIANTS) {
    const palette = loadPalette(PALETTE_DIR, variant);
    const weztermTheme = generateWeztermTheme(variant, palette, uiMapping, terminalMapping);
    const toml = tomlStringify(VARIANT_DISPLAY_NAMES[variant], weztermTheme);
    const fileName = VARIANT_WEZTERM_FILE[variant];
    const filePath = path.join(WEZTERM_DIR, fileName);
    fs.writeFileSync(filePath, toml);
    console.log(`Generated ${filePath}`);
  }
}

generateAll();