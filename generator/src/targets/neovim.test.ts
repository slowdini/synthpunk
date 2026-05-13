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

  test("pastel-dark has @comment with correct fg and italic", () => {
    const { palette, uiMapping, syntaxMapping, scopes, fontStyles } = loadFixtures("pastel-dark");
    const result = generateNeovimPalette("pastel-dark", palette, uiMapping, syntaxMapping, scopes, fontStyles);

    expect(result.syntaxTreesitter["@comment"]).toBeDefined();
    expect(result.syntaxTreesitter["@comment"].fg).toBe("#705880");
    expect(result.syntaxTreesitter["@comment"].italic).toBe(true);
  });

  test("pastel-dark has matching Comment classic group", () => {
    const { palette, uiMapping, syntaxMapping, scopes, fontStyles } = loadFixtures("pastel-dark");
    const result = generateNeovimPalette("pastel-dark", palette, uiMapping, syntaxMapping, scopes, fontStyles);

    expect(result.syntaxClassic.Comment).toBeDefined();
    expect(result.syntaxClassic.Comment.fg).toBe("#FF5470");
    expect(result.syntaxClassic.Comment.strikethrough).toBe(true);
  });

  test("pastel-dark has @string with correct fg", () => {
    const { palette, uiMapping, syntaxMapping, scopes, fontStyles } = loadFixtures("pastel-dark");
    const result = generateNeovimPalette("pastel-dark", palette, uiMapping, syntaxMapping, scopes, fontStyles);

    expect(result.syntaxTreesitter["@string"]).toBeDefined();
    expect(result.syntaxTreesitter["@string"].fg).toBe("#7FD7B5");
  });

  test("pastel-dark has @keyword with correct fg", () => {
    const { palette, uiMapping, syntaxMapping, scopes, fontStyles } = loadFixtures("pastel-dark");
    const result = generateNeovimPalette("pastel-dark", palette, uiMapping, syntaxMapping, scopes, fontStyles);

    expect(result.syntaxTreesitter["@keyword"]).toBeDefined();
    expect(result.syntaxTreesitter["@keyword"].fg).toBe("#FF9BB6");
  });

  test("pastel-dark has @entity.name.function with correct fg", () => {
    const { palette, uiMapping, syntaxMapping, scopes, fontStyles } = loadFixtures("pastel-dark");
    const result = generateNeovimPalette("pastel-dark", palette, uiMapping, syntaxMapping, scopes, fontStyles);

    expect(result.syntaxTreesitter["@entity.name.function"]).toBeDefined();
    expect(result.syntaxTreesitter["@entity.name.function"].fg).toBe("#8BA4FF");
  });

  test("neon-dark has @keyword with correct fg", () => {
    const { palette, uiMapping, syntaxMapping, scopes, fontStyles } = loadFixtures("neon-dark");
    const result = generateNeovimPalette("neon-dark", palette, uiMapping, syntaxMapping, scopes, fontStyles);

    expect(result.syntaxTreesitter["@keyword"]).toBeDefined();
    expect(result.syntaxTreesitter["@keyword"].fg).toBe("#FF5CA8");
  });

  test("all four variants generate without throwing", () => {
    const variants: VariantName[] = ["pastel-dark", "pastel-light", "neon-dark", "neon-light"];
    for (const v of variants) {
      const { palette, uiMapping, syntaxMapping, scopes, fontStyles } = loadFixtures(v);
      expect(() => generateNeovimPalette(v, palette, uiMapping, syntaxMapping, scopes, fontStyles)).not.toThrow();
    }
  });
});
