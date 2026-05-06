import { describe, expect, test } from "bun:test";
import { generateVSCodeTheme } from "./vscode";
import { loadPalette } from "../palette";
import { loadUIMapping } from "../uiMapping";
import { loadSyntaxMapping, loadScopes, loadFontStyles } from "../syntaxMapping";
import type { VariantName } from "../types";
import path from "node:path";

const PROJECT_DIR = path.resolve(import.meta.dir, "../../..");
const PALETTE_DIR = path.join(PROJECT_DIR, "palette");

describe("generateVSCodeTheme", () => {
  test("produces a valid dark theme structure", () => {
    const variant: VariantName = "pastel-dark";
    const palette = loadPalette(PALETTE_DIR, variant);
    const uiMapping = loadUIMapping(PALETTE_DIR);
    const syntaxMapping = loadSyntaxMapping(PALETTE_DIR);
    const scopes = loadScopes(PALETTE_DIR);
    const fontStyles = loadFontStyles(PALETTE_DIR);

    const theme = generateVSCodeTheme(variant, palette, uiMapping, syntaxMapping, scopes, fontStyles);

    expect(theme.name).toBe("Synthpunk Pastel Dark");
    expect(theme.type).toBe("dark");
    expect(theme.colors).toBeDefined();
    expect(theme.colors["editor.background"]).toBe("#1E1028");
    expect(theme.colors["editor.foreground"]).toBe("#F0E0F0");
    expect(theme.tokenColors).toBeDefined();
    expect(theme.tokenColors.length).toBeGreaterThan(0);
    expect(theme.tokenColors[0]).toHaveProperty("name");
    expect(theme.tokenColors[0]).toHaveProperty("scope");
    expect(theme.tokenColors[0]).toHaveProperty("settings");
  });

  test("produces a valid light theme structure", () => {
    const variant: VariantName = "pastel-light";
    const palette = loadPalette(PALETTE_DIR, variant);
    const uiMapping = loadUIMapping(PALETTE_DIR);
    const syntaxMapping = loadSyntaxMapping(PALETTE_DIR);
    const scopes = loadScopes(PALETTE_DIR);
    const fontStyles = loadFontStyles(PALETTE_DIR);

    const theme = generateVSCodeTheme(variant, palette, uiMapping, syntaxMapping, scopes, fontStyles);

    expect(theme.name).toBe("Synthpunk Pastel Light");
    expect(theme.type).toBe("light");
    expect(theme.colors["editor.background"]).toBe("#FFF8F5");
  });
});