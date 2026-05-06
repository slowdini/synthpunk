export const OPACITY_RULES: Record<string, number> = {
  selection: 0.24,
  inactive_selection: 0.15,
  hover: 0.75,
  active_line: 0.12,
  search_match: 0.2,
  search_match_border: 0.4,
  word_highlight_read: 0.1,
  word_highlight_write: 0.25,
  scrollbar: 0.3,
  scrollbar_hover: 0.6,
  drop_target: 0.5,
  suggestion: 0.05,
  folded: 0.1,
  guide: 0.05,
  active_guide: 0.1,
};

export function resolveOpacity(hex: string, alpha: number): string {
  if (alpha >= 1) {
    return hex.startsWith("#") ? hex : `#${hex}`;
  }
  const a = Math.round(alpha * 255).toString(16).padStart(2, "0").toUpperCase();
  const cleanHex = hex.replace("#", "");
  return `#${cleanHex}${a}`;
}