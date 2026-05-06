import fs from "node:fs";
import path from "node:path";
import type { Palette, SyntaxMapping, ScopeEntry, FontStyleMapping } from "./types";
import { resolveColor, colorToHex } from "./palette";

export function loadSyntaxMapping(paletteDir: string): SyntaxMapping {
  const filePath = path.join(paletteDir, "syntax.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as SyntaxMapping;
}

export function resolveSyntaxColor(
  mapping: SyntaxMapping,
  palette: Palette,
  dotPath: string,
): string {
  const parts = dotPath.split(".");
  if (parts.length !== 2) {
    throw new Error(`Invalid syntax role path: "${dotPath}". Expected "group.role" format.`);
  }
  const [group, role] = parts;
  const groupMap = (mapping as Record<string, Record<string, string>>)[group];
  if (!groupMap) {
    throw new Error(`Unknown syntax mapping group: "${group}"`);
  }
  const colorName = groupMap[role];
  if (!colorName) {
    throw new Error(`Unknown syntax mapping role: "${dotPath}"`);
  }
  const color = resolveColor(palette, colorName);
  return colorToHex(color);
}

export function loadScopes(paletteDir: string): ScopeEntry[] {
  const filePath = path.join(paletteDir, "scopes.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as ScopeEntry[];
}

export function loadFontStyles(paletteDir: string): Record<string, FontStyleMapping> {
  const filePath = path.join(paletteDir, "syntax.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const mapping = JSON.parse(raw) as SyntaxMapping & { fontStyles?: Record<string, FontStyleMapping> };
  return mapping.fontStyles ?? {};
}