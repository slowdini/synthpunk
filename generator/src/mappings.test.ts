import { describe, expect, test } from "bun:test";
import { loadUIMapping, resolveUIColor } from "./uiMapping";
import { loadSyntaxMapping, resolveSyntaxColor, loadScopes, loadFontStyles } from "./syntaxMapping";
import { OPACITY_RULES, resolveOpacity } from "./opacity";
import { loadPalette } from "./palette";
import type { VariantName } from "./types";
import path from "node:path";

const PROJECT_DIR = path.resolve(import.meta.dir, "../..");
const PALETTE_DIR = path.join(PROJECT_DIR, "palette");

describe("loadUIMapping", () => {
  test("loads ui-mapping.json", () => {
    const mapping = loadUIMapping(PALETTE_DIR);
    expect(mapping.background.base).toBe("base");
    expect(mapping.editor.cursor).toBe("lavender");
    expect(mapping.terminal.red).toBe("red");
  });
});

describe("resolveUIColor", () => {
  test("resolves a UI color role to palette color", () => {
    const mapping = loadUIMapping(PALETTE_DIR);
    const palette = loadPalette(PALETTE_DIR, "pastel-dark");
    const hex = resolveUIColor(mapping, palette, "editor", "cursor");
    expect(hex).toBe("#C49BFF");
  });

  test("resolves background base", () => {
    const mapping = loadUIMapping(PALETTE_DIR);
    const palette = loadPalette(PALETTE_DIR, "pastel-dark");
    const hex = resolveUIColor(mapping, palette, "background", "base");
    expect(hex).toBe("#1E1028");
  });

  test("resolves with alpha", () => {
    const mapping = loadUIMapping(PALETTE_DIR);
    const palette = loadPalette(PALETTE_DIR, "pastel-dark");
    const hex = resolveUIColor(mapping, palette, "editor", "selection", 0.24);
    expect(hex).toBe("#5ED4E03D");
  });
});

describe("loadSyntaxMapping", () => {
  test("loads syntax.json", () => {
    const mapping = loadSyntaxMapping(PALETTE_DIR);
    expect(mapping.keywords.keyword).toBe("flamingo");
    expect(mapping.literals.string).toBe("green");
  });
});

describe("resolveSyntaxColor", () => {
  test("resolves a syntax role to palette color", () => {
    const mapping = loadSyntaxMapping(PALETTE_DIR);
    const palette = loadPalette(PALETTE_DIR, "pastel-dark");
    const hex = resolveSyntaxColor(mapping, palette, "keywords.keyword");
    expect(hex).toBe("#FF9BB6");
  });

  test("resolves nested syntax role", () => {
    const mapping = loadSyntaxMapping(PALETTE_DIR);
    const palette = loadPalette(PALETTE_DIR, "pastel-dark");
    const hex = resolveSyntaxColor(mapping, palette, "comments.line");
    expect(hex).toBe("#705880");
  });
});

describe("loadScopes", () => {
  test("loads scopes.json", () => {
    const scopes = loadScopes(PALETTE_DIR);
    expect(scopes.length).toBeGreaterThan(0);
    expect(scopes[0].name).toBe("Comment");
    expect(scopes[0].scope).toContain("comment");
    expect(scopes[0].syntaxRole).toBe("comments.line");
  });
});

describe("loadFontStyles", () => {
  test("loads font styles from syntax.json", () => {
    const fontStyles = loadFontStyles(PALETTE_DIR);
    expect(fontStyles).toBeDefined();
    expect(fontStyles["comments.line"].fontStyle).toBe("italic");
    expect(fontStyles["emphasis_strong"].fontWeight).toBe("bold");
  });
});

describe("OPACITY_RULES", () => {
  test("has selection opacity", () => {
    expect(OPACITY_RULES.selection).toBeDefined();
    expect(OPACITY_RULES.selection).toBeLessThan(1);
  });

  test("resolveOpacity returns hex with alpha", () => {
    const hex = resolveOpacity("#FF5470", 0.2);
    expect(hex).toBe("#FF547033");
  });

  test("resolveOpacity with 1.0 returns hex without alpha", () => {
    const hex = resolveOpacity("#FF5470", 1);
    expect(hex).toBe("#FF5470");
  });
});