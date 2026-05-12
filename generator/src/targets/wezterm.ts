import type { VariantName, Palette, UIMapping, TerminalMapping } from "../types";
import { VARIANT_TYPE } from "../types";
import { resolveColor, colorToHex } from "../palette";
import { adjustBrightness } from "../colorUtils";

interface WeztermTab {
  bg_color: string;
  fg_color: string;
}

interface WeztermTabBar {
  background: string;
  active_tab: WeztermTab;
  inactive_tab: WeztermTab;
  new_tab: WeztermTab;
}

interface WeztermTheme {
  foreground: string;
  background: string;
  cursor_bg: string;
  cursor_fg: string;
  cursor_border: string;
  selection_fg: string;
  selection_bg: string;
  scrollbar_thumb: string;
  split: string;
  compose_cursor: string;
  tab_bar: WeztermTabBar;
  ansi: string[];
  brights: string[];
}

function hex(palette: Palette, colorName: string): string {
  const color = resolveColor(palette, colorName);
  return colorToHex(color);
}

function brightHex(palette: Palette, colorName: string, factor: number = 0.2): string {
  const color = resolveColor(palette, colorName);
  const brightRgb = adjustBrightness(color.rgb, factor, "lighten");
  return `#${brightRgb.map(c => Math.max(0, Math.min(255, Math.round(c))).toString(16).padStart(2, "0").toUpperCase()).join("")}`;
}

function buildAnsiColors(palette: Palette, isDark: boolean, uiMapping: UIMapping): string[] {
  const t = uiMapping.terminal;
  const ansi0 = isDark ? hex(palette, "crust") : hex(palette, t.black);
  const ansi7 = isDark ? hex(palette, t.white) : hex(palette, t.white);

  return [
    ansi0,
    hex(palette, t.red),
    hex(palette, t.green),
    hex(palette, t.yellow),
    hex(palette, t.blue),
    hex(palette, t.magenta),
    hex(palette, t.cyan),
    ansi7,
  ];
}

function buildBrightColors(palette: Palette, isDark: boolean, uiMapping: UIMapping): string[] {
  const t = uiMapping.terminal;
  const bright0 = isDark ? hex(palette, "subtext0") : hex(palette, "subtext1");
  const bright7 = hex(palette, t.bright_white);

  return [
    bright0,
    brightHex(palette, t.red),
    brightHex(palette, t.green),
    brightHex(palette, t.yellow),
    brightHex(palette, t.blue),
    brightHex(palette, t.magenta),
    brightHex(palette, t.cyan),
    bright7,
  ];
}

export function generateWeztermTheme(
  variant: VariantName,
  palette: Palette,
  uiMapping: UIMapping,
  terminalMapping: TerminalMapping,
): WeztermTheme {
  const isDark = VARIANT_TYPE[variant] === "dark";
  const tm = terminalMapping;

  const selectionRgb = resolveColor(palette, tm.selection.bg).rgb;
  const selectionBg = `rgba(${selectionRgb.join(", ")}, ${tm.selection.bg_alpha})`;

  return {
    foreground: hex(palette, "text"),
    background: hex(palette, "base"),
    cursor_bg: hex(palette, tm.cursor.bg),
    cursor_fg: hex(palette, tm.cursor.fg),
    cursor_border: hex(palette, tm.cursor.border),
    selection_fg: hex(palette, tm.selection.fg),
    selection_bg: selectionBg,
    scrollbar_thumb: hex(palette, tm.scrollbar.thumb),
    split: hex(palette, tm.split),
    compose_cursor: hex(palette, tm.compose_cursor),
    tab_bar: {
      background: hex(palette, tm.tab_bar.background),
      active_tab: {
        bg_color: hex(palette, tm.tab_bar.active_tab.bg),
        fg_color: hex(palette, tm.tab_bar.active_tab.fg),
      },
      inactive_tab: {
        bg_color: hex(palette, tm.tab_bar.inactive_tab.bg),
        fg_color: hex(palette, tm.tab_bar.inactive_tab.fg),
      },
      new_tab: {
        bg_color: hex(palette, tm.tab_bar.new_tab.bg),
        fg_color: hex(palette, tm.tab_bar.new_tab.fg),
      },
    },
    ansi: buildAnsiColors(palette, isDark, uiMapping),
    brights: buildBrightColors(palette, isDark, uiMapping),
  };
}

export function tomlStringify(name: string, theme: WeztermTheme): string {
  const lines: string[] = [];

  lines.push(`# ${name}`);
  lines.push("");

  lines.push("[colors]");
  lines.push(`foreground = "${theme.foreground}"`);
  lines.push(`background = "${theme.background}"`);
  lines.push(`cursor_bg = "${theme.cursor_bg}"`);
  lines.push(`cursor_fg = "${theme.cursor_fg}"`);
  lines.push(`cursor_border = "${theme.cursor_border}"`);
  lines.push(`selection_fg = "${theme.selection_fg}"`);
  lines.push(`selection_bg = "${theme.selection_bg}"`);
  lines.push(`scrollbar_thumb = "${theme.scrollbar_thumb}"`);
  lines.push(`split = "${theme.split}"`);
  lines.push(`compose_cursor = "${theme.compose_cursor}"`);
  lines.push("");

  lines.push("[colors.tab_bar]");
  lines.push(`background = "${theme.tab_bar.background}"`);
  lines.push("");

  lines.push("[colors.tab_bar.active_tab]");
  lines.push(`bg_color = "${theme.tab_bar.active_tab.bg_color}"`);
  lines.push(`fg_color = "${theme.tab_bar.active_tab.fg_color}"`);
  lines.push("");

  lines.push("[colors.tab_bar.inactive_tab]");
  lines.push(`bg_color = "${theme.tab_bar.inactive_tab.bg_color}"`);
  lines.push(`fg_color = "${theme.tab_bar.inactive_tab.fg_color}"`);
  lines.push("");

  lines.push("[colors.tab_bar.new_tab]");
  lines.push(`bg_color = "${theme.tab_bar.new_tab.bg_color}"`);
  lines.push(`fg_color = "${theme.tab_bar.new_tab.fg_color}"`);
  lines.push("");

  const ansiStr = theme.ansi.map(c => `"${c}"`).join(", ");
  lines.push(`ansi = [${ansiStr}]`);
  lines.push("");

  const brightsStr = theme.brights.map(c => `"${c}"`).join(", ");
  lines.push(`brights = [${brightsStr}]`);
  lines.push("");

  return lines.join("\n");
}