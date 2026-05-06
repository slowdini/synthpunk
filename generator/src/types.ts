export interface PaletteColor {
  hex: string;
  rgb: [number, number, number];
  description: string;
}

export interface PaletteInfo {
  name: string;
  description: string;
  version: string;
}

export interface Palette {
  $schema?: string;
  info: PaletteInfo;
  colors: Record<string, PaletteColor>;
}

export type VariantName = "pastel-dark" | "pastel-light" | "neon-dark" | "neon-light";

export const VARIANT_DISPLAY_NAMES: Record<VariantName, string> = {
  "pastel-dark": "Synthpunk Pastel Dark",
  "pastel-light": "Synthpunk Pastel Light",
  "neon-dark": "Synthpunk Neon Dark",
  "neon-light": "Synthpunk Neon Light",
};

export const VARIANT_TYPE: Record<VariantName, "dark" | "light"> = {
  "pastel-dark": "dark",
  "pastel-light": "light",
  "neon-dark": "dark",
  "neon-light": "light",
};

export interface ResolvedColor {
  hex: string;
  rgb: [number, number, number];
}

export interface UIMapping {
  background: Record<string, string>;
  surface: Record<string, string>;
  text: Record<string, string>;
  border: Record<string, string>;
  editor: Record<string, string>;
  terminal: Record<string, string>;
  status: Record<string, string>;
  vcs: Record<string, string>;
}

export interface SyntaxMapping {
  info: PaletteInfo;
  keywords: Record<string, string>;
  storage: Record<string, string>;
  literals: Record<string, string>;
  comments: Record<string, string>;
  functions: Record<string, string>;
  variables: Record<string, string>;
  entities: Record<string, string>;
  support: Record<string, string>;
  invalid: Record<string, string>;
  emphasis?: Record<string, string>;
  fontStyles?: Record<string, FontStyleMapping>;
}

export interface ScopeEntry {
  name: string;
  scope: string[];
  syntaxRole: string;
}

export interface FontStyleMapping {
  fontStyle?: "italic" | "normal";
  fontWeight?: "bold" | "normal";
}