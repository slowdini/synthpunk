export const VARIANTS = [
	{ key: "pastel-dark", label: "Pastel Dark" },
	{ key: "pastel-light", label: "Pastel Light" },
	{ key: "neon-dark", label: "Neon Dark" },
	{ key: "neon-light", label: "Neon Light" },
] as const;

export type VariantKey = (typeof VARIANTS)[number]["key"];

export const LANGUAGES = [
	{ key: "react", label: "React / TSX", file: "App.tsx", lang: "tsx", snippet: "App.tsx" },
	{ key: "python", label: "Python", file: "pipeline.py", lang: "python", snippet: "pipeline.py" },
	{ key: "rust", label: "Rust", file: "lib.rs", lang: "rust", snippet: "lib.rs" },
	{ key: "csharp", label: "C#", file: "Service.cs", lang: "csharp", snippet: "Service.cs" },
] as const;

export const PREVIEW_JOBS = VARIANTS.flatMap((variant) =>
	LANGUAGES.map((language) => ({
		variant,
		language,
		out: `sample-${language.key}-${variant.key}.png`,
	})),
);
