import type { VariantName, Palette, UIMapping, SyntaxMapping, ScopeEntry, FontStyleMapping } from "../types";
import { VARIANT_DISPLAY_NAMES, VARIANT_TYPE } from "../types";
import { resolveColor, colorToHex } from "../palette";
import { resolveUIColor } from "../uiMapping";
import { resolveSyntaxColor } from "../syntaxMapping";

export interface NeovimHighlightGroup {
  fg?: string;
  bg?: string;
  sp?: string;
  blend?: number;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  undercurl?: boolean;
  strikethrough?: boolean;
  reverse?: boolean;
  link?: string;
}

export interface NeovimVariantPalette {
  meta: { name: string; variant: string; type: "dark" | "light" };
  ui: Record<string, NeovimHighlightGroup>;
  syntaxTreesitter: Record<string, NeovimHighlightGroup>;
  syntaxClassic: Record<string, NeovimHighlightGroup>;
  lspLinks: Record<string, string>;
  terminal: string[];
}

function uc(uiMapping: UIMapping, palette: Palette, group: string, key: string, alpha?: number): string {
  return resolveUIColor(uiMapping, palette, group, key, alpha);
}

function pc(palette: Palette, colorName: string, alpha?: number): string {
  const color = resolveColor(palette, colorName);
  return colorToHex(color, alpha);
}

function buildUIGroups(variant: VariantName, palette: Palette, uiMapping: UIMapping): Record<string, NeovimHighlightGroup> {
  const type = VARIANT_TYPE[variant];
  const isDark = type === "dark";

  return {
    Normal:              { fg: uc(uiMapping, palette, "editor", "foreground"), bg: uc(uiMapping, palette, "editor", "background") },
    NormalNC:            { fg: uc(uiMapping, palette, "text", "tertiary"), bg: uc(uiMapping, palette, "editor", "background") },
    NormalFloat:         { fg: uc(uiMapping, palette, "text", "primary"), bg: uc(uiMapping, palette, "background", "base") },
    StatusLine:          { fg: uc(uiMapping, palette, "text", "primary"), bg: uc(uiMapping, palette, "surface", "active") },
    StatusLineNC:        { fg: uc(uiMapping, palette, "text", "tertiary"), bg: uc(uiMapping, palette, "surface", "default") },
    TabLine:             { fg: uc(uiMapping, palette, "text", "tertiary"), bg: uc(uiMapping, palette, "background", "deepest") },
    TabLineFill:         { bg: uc(uiMapping, palette, "background", "deepest") },
    TabLineSel:          { fg: uc(uiMapping, palette, "text", "primary"), bg: uc(uiMapping, palette, "background", "base") },
    CursorLine:          { bg: uc(uiMapping, palette, "editor", "active_line_background") },
    CursorColumn:        { bg: uc(uiMapping, palette, "editor", "active_line_background") },
    LineNr:              { fg: uc(uiMapping, palette, "editor", "line_number"), bg: uc(uiMapping, palette, "editor", "background") },
    CursorLineNr:        { fg: uc(uiMapping, palette, "editor", "active_line_number") },
    SignColumn:          { bg: uc(uiMapping, palette, "editor", "background") },
    VertSplit:           { fg: uc(uiMapping, palette, "surface", "default") },
    WinSeparator:        { fg: uc(uiMapping, palette, "border", "default") },
    FloatBorder:         { fg: uc(uiMapping, palette, "border", "focused") },
    FloatTitle:          { fg: uc(uiMapping, palette, "text", "primary") },
    Pmenu:               { fg: uc(uiMapping, palette, "text", "primary"), bg: uc(uiMapping, palette, "surface", "default") },
    PmenuSel:            { fg: uc(uiMapping, palette, "text", "primary"), bg: uc(uiMapping, palette, "surface", "hover") },
    PmenuThumb:          { bg: uc(uiMapping, palette, "surface", "active") },
    PmenuSbar:           { bg: uc(uiMapping, palette, "surface", "default") },
    Visual:              { bg: uc(uiMapping, palette, "editor", "selection"), blend: 15 },
    Search:              { fg: uc(uiMapping, palette, "text", "on_accent"), bg: uc(uiMapping, palette, "editor", "find_match") },
    IncSearch:           { fg: uc(uiMapping, palette, "text", "on_accent"), bg: uc(uiMapping, palette, "editor", "find_active_match") },
    Folded:              { fg: uc(uiMapping, palette, "text", "tertiary"), bg: uc(uiMapping, palette, "surface", "default") },
    FoldColumn:          { fg: uc(uiMapping, palette, "text", "tertiary"), bg: uc(uiMapping, palette, "background", "base") },
    DiagnosticError:     { fg: uc(uiMapping, palette, "status", "error") },
    DiagnosticWarn:      { fg: uc(uiMapping, palette, "status", "warning") },
    DiagnosticInfo:      { fg: uc(uiMapping, palette, "status", "info") },
    DiagnosticHint:      { fg: uc(uiMapping, palette, "status", "success") },
    DiagnosticUnderlineError: { sp: uc(uiMapping, palette, "status", "error"), undercurl: true },
    DiagnosticUnderlineWarn:  { sp: uc(uiMapping, palette, "status", "warning"), undercurl: true },
    DiagnosticUnderlineInfo:  { sp: uc(uiMapping, palette, "status", "info"), undercurl: true },
    DiagnosticUnderlineHint:  { sp: uc(uiMapping, palette, "status", "success"), undercurl: true },
    ErrorMsg:            { fg: uc(uiMapping, palette, "status", "error") },
    WarningMsg:          { fg: uc(uiMapping, palette, "status", "warning") },
    MsgArea:             { fg: uc(uiMapping, palette, "text", "primary") },
    MsgSeparator:        { fg: uc(uiMapping, palette, "text", "tertiary") },
    MoreMsg:             { fg: uc(uiMapping, palette, "text", "accent") },
    ModeMsg:             { fg: uc(uiMapping, palette, "text", "primary"), bold: true },
    NonText:             { fg: uc(uiMapping, palette, "editor", "line_number") },
    Whitespace:          { fg: uc(uiMapping, palette, "editor", "line_number") },
    SpecialKey:          { fg: uc(uiMapping, palette, "editor", "line_number") },
    EndOfBuffer:         { fg: uc(uiMapping, palette, "editor", "background") },
    Directory:           { fg: uc(uiMapping, palette, "text", "accent") },
    MatchParen:          { fg: uc(uiMapping, palette, "editor", "find_active_match"), bold: true },
    ColorColumn:         { bg: uc(uiMapping, palette, "surface", "default") },
    Conceal:             { fg: uc(uiMapping, palette, "text", "tertiary"), bg: uc(uiMapping, palette, "editor", "background") },
    Cursor:              { fg: uc(uiMapping, palette, "text", "on_accent"), bg: uc(uiMapping, palette, "editor", "cursor") },
    lCursor:             { link: "Cursor" },
    CursorIM:            { link: "Cursor" },
    TermCursor:          { link: "Cursor" },
    TermCursorNC:        { bg: uc(uiMapping, palette, "editor", "cursor") },
    QuickFixLine:        { bg: uc(uiMapping, palette, "surface", "hover") },
    WildMenu:            { fg: uc(uiMapping, palette, "text", "primary"), bg: uc(uiMapping, palette, "surface", "hover") },
    Substitute:          { bg: uc(uiMapping, palette, "editor", "find_match") },
    SpellBad:            { sp: uc(uiMapping, palette, "status", "error"), undercurl: true },
    SpellCap:            { sp: uc(uiMapping, palette, "status", "warning"), undercurl: true },
    SpellLocal:          { sp: uc(uiMapping, palette, "status", "info"), undercurl: true },
    SpellRare:           { sp: uc(uiMapping, palette, "status", "success"), undercurl: true },
    Question:            { fg: uc(uiMapping, palette, "text", "accent") },
    Bold:                { bold: true },
    Italic:              { italic: true },
    Underlined:          { underline: true },
    DiffAdd:             { fg: uc(uiMapping, palette, "vcs", "added") },
    DiffChange:          { fg: uc(uiMapping, palette, "vcs", "modified") },
    DiffDelete:          { fg: uc(uiMapping, palette, "vcs", "deleted") },
    DiffText:            { fg: pc(palette, "lavender") },
  };
}

export function generateNeovimPalette(
  variant: VariantName,
  palette: Palette,
  uiMapping: UIMapping,
  syntaxMapping: SyntaxMapping,
  scopes: ScopeEntry[],
  fontStyles: Record<string, FontStyleMapping>,
): NeovimVariantPalette {
  const name = `synthpunk-${variant}`;
  const type = VARIANT_TYPE[variant];
  const isDark = type === "dark";

  const ui = buildUIGroups(variant, palette, uiMapping);

  const terminal: string[] = [];
  if (isDark) {
    terminal.push(pc(palette, "crust"));
  } else {
    terminal.push(pc(palette, "text"));
  }
  terminal.push(uc(uiMapping, palette, "terminal", "red"));
  terminal.push(uc(uiMapping, palette, "terminal", "green"));
  terminal.push(uc(uiMapping, palette, "terminal", "yellow"));
  terminal.push(uc(uiMapping, palette, "terminal", "blue"));
  terminal.push(uc(uiMapping, palette, "terminal", "magenta"));
  terminal.push(uc(uiMapping, palette, "terminal", "cyan"));
  if (isDark) {
    terminal.push(uc(uiMapping, palette, "terminal", "white"));
  } else {
    terminal.push(pc(palette, "subtext1"));
  }
  if (isDark) {
    terminal.push(uc(uiMapping, palette, "terminal", "bright_black"));
  } else {
    terminal.push(pc(palette, "subtext1"));
  }
  terminal.push(uc(uiMapping, palette, "terminal", "bright_red"));
  terminal.push(uc(uiMapping, palette, "terminal", "bright_green"));
  terminal.push(uc(uiMapping, palette, "terminal", "bright_yellow"));
  terminal.push(uc(uiMapping, palette, "terminal", "bright_blue"));
  terminal.push(uc(uiMapping, palette, "terminal", "bright_magenta"));
  terminal.push(uc(uiMapping, palette, "terminal", "bright_cyan"));
  terminal.push(uc(uiMapping, palette, "terminal", "bright_white"));

  return {
    meta: { name, variant, type },
    ui,
    syntaxTreesitter: {},
    syntaxClassic: {},
    lspLinks: {},
    terminal,
  };
}
