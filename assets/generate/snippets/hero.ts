type Variant = "pastel" | "neon";

// Build a Synthpunk theme id from its parts.
function themeId(variant: Variant, dark: boolean): string {
  const mode = dark ? "dark" : "light";
  return `synthpunk-${variant}-${mode}`;
}

const current = themeId("neon", true);
console.log(`active → ${current}`);
