// Stand-in for the `claude-code` module, which only exists inside the Claude
// Code engine. make-colors.d.ts imports `ThemeColors` from it. This ambient
// declaration, picked up by tsconfig.json's `include`, resolves that import so
// the vendored files stay unchanged. The shape is copied from the engine's own
// `ThemeColors` type (Claude Code 2.1.331).
declare module "claude-code" {
	export type ThemeColorInputs = {
		[token: string]: `#${string}`;
	};

	export type ThemeColors = {
		v: 1;
		id?: string;
		label: string;
		inputs: {
			light?: ThemeColorInputs;
			dark?: ThemeColorInputs;
		};
		codeTheme?: {
			light?: string;
			dark?: string;
		};
		contrast?: "more";
	};
}
