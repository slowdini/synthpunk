import { describe, expect, test } from "bun:test";
import { LANGUAGES, PREVIEW_JOBS, VARIANTS } from "./preview-manifest";

describe("README preview manifest", () => {
	test("defines the four variants in README display order", () => {
		expect(VARIANTS).toEqual([
			{ key: "pastel-dark", label: "Pastel Dark" },
			{ key: "pastel-light", label: "Pastel Light" },
			{ key: "neon-dark", label: "Neon Dark" },
			{ key: "neon-light", label: "Neon Light" },
		]);
	});
	test("defines four language samples without Markdown", () => {
		expect(LANGUAGES).toEqual([
			{ key: "react", label: "React / TSX", file: "App.tsx", lang: "tsx", snippet: "App.tsx" },
			{ key: "python", label: "Python", file: "pipeline.py", lang: "python", snippet: "pipeline.py" },
			{ key: "rust", label: "Rust", file: "lib.rs", lang: "rust", snippet: "lib.rs" },
			{ key: "csharp", label: "C#", file: "Service.cs", lang: "csharp", snippet: "Service.cs" },
		]);
	});
	test("creates one deterministically named image for every variant and language", () => {
		expect(PREVIEW_JOBS.map((job) => job.out)).toEqual([
			"sample-react-pastel-dark.png",
			"sample-python-pastel-dark.png",
			"sample-rust-pastel-dark.png",
			"sample-csharp-pastel-dark.png",
			"sample-react-pastel-light.png",
			"sample-python-pastel-light.png",
			"sample-rust-pastel-light.png",
			"sample-csharp-pastel-light.png",
			"sample-react-neon-dark.png",
			"sample-python-neon-dark.png",
			"sample-rust-neon-dark.png",
			"sample-csharp-neon-dark.png",
			"sample-react-neon-light.png",
			"sample-python-neon-light.png",
			"sample-rust-neon-light.png",
			"sample-csharp-neon-light.png",
		]);
		expect(PREVIEW_JOBS).toHaveLength(16);
		expect(new Set(PREVIEW_JOBS.map((job) => job.out)).size).toBe(16);
		expect(PREVIEW_JOBS.map((job) => job.language.lang)).not.toContain("markdown");
	});
});
