import { describe, expect, test } from "bun:test";
import { generateNeovimPalette } from "./neovim";
import { loadPalette } from "../palette";
import { loadUIMapping } from "../uiMapping";
import { loadSyntaxMapping, loadScopes, loadFontStyles } from "../syntaxMapping";
import type { VariantName } from "../types";
import path from "node:path";

const PROJECT_DIR = path.resolve(import.meta.dir, "../../..");
const PALETTE_DIR = path.join(PROJECT_DIR, "palette");

function loadFixtures(variant: VariantName) {
  const palette = loadPalette(PALETTE_DIR, variant);
  const uiMapping = loadUIMapping(PALETTE_DIR);
  const syntaxMapping = loadSyntaxMapping(PALETTE_DIR);
  const scopes = loadScopes(PALETTE_DIR);
  const fontStyles = loadFontStyles(PALETTE_DIR);
  return { palette, uiMapping, syntaxMapping, scopes, fontStyles };
}

describe("generateNeovimPalette", () => {
  test("pastel-dark palette has correct Normal fg/bg", () => {
    const { palette, uiMapping, syntaxMapping, scopes, fontStyles } = loadFixtures("pastel-dark");
    const result = generateNeovimPalette("pastel-dark", palette, uiMapping, syntaxMapping, scopes, fontStyles);

    expect(result.meta.name).toBe("synthpunk-pastel-dark");
    expect(result.meta.type).toBe("dark");
    expect(result.ui.Normal).toEqual({ fg: "#F0E0F0", bg: "#1E1028" });
  });

  test("pastel-light palette has correct Normal fg/bg", () => {
    const { palette, uiMapping, syntaxMapping, scopes, fontStyles } = loadFixtures("pastel-light");
    const result = generateNeovimPalette("pastel-light", palette, uiMapping, syntaxMapping, scopes, fontStyles);

    expect(result.meta.name).toBe("synthpunk-pastel-light");
    expect(result.meta.type).toBe("light");
    expect(result.ui.Normal).toEqual({ fg: "#2E1A24", bg: "#FFF8F5" });
  });

  test("terminal palette has 16 entries", () => {
    const { palette, uiMapping, syntaxMapping, scopes, fontStyles } = loadFixtures("pastel-dark");
    const result = generateNeovimPalette("pastel-dark", palette, uiMapping, syntaxMapping, scopes, fontStyles);

    expect(result.terminal).toHaveLength(16);
  });
});
