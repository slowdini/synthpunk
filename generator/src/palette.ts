import type { Palette, VariantName, ResolvedColor } from "./types";
import fs from "node:fs";
import path from "node:path";

const VARIANT_PALETTE_FILE: Record<VariantName, string> = {
  "pastel-dark": "dark.json",
  "pastel-light": "base.json",
  "neon-dark": "neon-dark.json",
  "neon-light": "neon-light.json",
};

export function loadPalette(paletteDir: string, variant: VariantName): Palette {
  const fileName = VARIANT_PALETTE_FILE[variant];
  const filePath = path.join(paletteDir, fileName);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Palette;
}

export function resolveColor(palette: Palette, colorName: string): ResolvedColor {
  const entry = palette.colors[colorName];
  if (!entry) {
    throw new Error(`Unknown color name: "${colorName}" in palette "${palette.info.name}"`);
  }
  return {
    hex: entry.hex,
    rgb: entry.rgb,
  };
}

export function colorToHex(color: ResolvedColor, alpha?: number): string {
  if (alpha === undefined || alpha === 1) {
    return `#${color.hex}`;
  }
  const a = Math.round(alpha * 255).toString(16).padStart(2, "0").toUpperCase();
  return `#${color.hex}${a}`;
}