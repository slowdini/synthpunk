import { describe, expect, test } from "bun:test";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { loadPalette } from "../../generator/palette";
import {
	loadFontStyles,
	loadScopes,
	loadSyntaxMapping,
} from "../../generator/syntaxMapping";
import { generateNeovimPalette } from "../../generator/targets/neovim";
import {
	VARIANT_TYPE,
	VARIANTS,
	type VariantName,
} from "../../generator/types";
import { loadUIMapping } from "../../generator/uiMapping";

// These tests load the committed colorscheme in a real headless Neovim and
// inspect the highlight state Neovim ends up with, rather than the generator's
// in-memory object. CI's generator sync check guarantees the committed files
// equal `bun run build` output. Set NVIM_BIN to choose a specific binary.

const REPO_ROOT = join(import.meta.dir, "../..");
const PALETTE_DIR = join(REPO_ROOT, "palette");
const NEOVIM_DIR = join(REPO_ROOT, "themes", "neovim");
const NVIM = process.env.NVIM_BIN ?? Bun.which("nvim");

if (!NVIM && process.env.CI) {
	throw new Error("nvim must be installed in CI to verify the Neovim theme");
}

interface NvimHighlight {
	fg?: number;
	bg?: number;
	sp?: number;
	link?: string;
}

interface ColorschemeState {
	stderr: string;
	background: string;
	groups: Record<string, NvimHighlight>;
}

function loadColorscheme(variant: VariantName): ColorschemeState {
	const dir = mkdtempSync(join(tmpdir(), "synthpunk-nvim-"));
	const outFile = join(dir, "state.json");
	const dump = [
		`local f = assert(io.open(${JSON.stringify(outFile)}, "w"))`,
		"f:write(vim.json.encode({",
		"  background = vim.o.background,",
		"  groups = vim.api.nvim_get_hl(0, {}),",
		"}))",
		"f:close()",
	].join(" ");
	try {
		const proc = Bun.spawnSync(
			[
				NVIM as string,
				"--headless",
				"--clean",
				"--cmd",
				`set rtp^=${NEOVIM_DIR}`,
				"-c",
				`colorscheme synthpunk-${variant}`,
				"-c",
				`lua ${dump}`,
				"-c",
				"qa!",
			],
			{ stdout: "pipe", stderr: "pipe" },
		);
		const state = JSON.parse(readFileSync(outFile, "utf8"));
		return { stderr: proc.stderr.toString().trim(), ...state };
	} finally {
		rmSync(dir, { recursive: true, force: true });
	}
}

function toHex(color: number | undefined): string | undefined {
	if (color === undefined) return undefined;
	return `#${color.toString(16).padStart(6, "0").toUpperCase()}`;
}

function expectedUiGroups(variant: VariantName) {
	return generateNeovimPalette(
		variant,
		loadPalette(PALETTE_DIR, variant),
		loadUIMapping(PALETTE_DIR),
		loadSyntaxMapping(PALETTE_DIR),
		loadScopes(PALETTE_DIR),
		loadFontStyles(PALETTE_DIR),
	).ui;
}

for (const variant of VARIANTS) {
	describe.skipIf(!NVIM)(`colorscheme synthpunk-${variant}`, () => {
		// The describe body still runs at collection time when skipped.
		const state = NVIM
			? loadColorscheme(variant)
			: ({ stderr: "", background: "", groups: {} } as ColorschemeState);
		const palette = loadPalette(PALETTE_DIR, variant);

		test("loads without errors", () => {
			expect(state.stderr).toBe("");
		});

		test("sets 'background' to the variant's appearance", () => {
			expect(state.background).toBe(VARIANT_TYPE[variant]);
		});

		test("Normal uses the palette text and base colors", () => {
			const normal = state.groups.Normal;
			expect(toHex(normal?.fg)).toBe(`#${palette.colors.text.hex}`);
			expect(toHex(normal?.bg)).toBe(`#${palette.colors.base.hex}`);
		});

		// Syntax groups are applied after UI groups and nvim_set_hl replaces a
		// whole group, so a syntax group sharing a UI group's name would erase it.
		test("every UI group keeps the colors and link the theme defines", () => {
			const mismatches: string[] = [];
			for (const [name, want] of Object.entries(expectedUiGroups(variant))) {
				const got = state.groups[name] ?? {};
				const actual = {
					fg: toHex(got.fg),
					bg: toHex(got.bg),
					sp: toHex(got.sp),
					link: got.link,
				};
				const expected = {
					fg: want.fg,
					bg: want.bg,
					sp: want.sp,
					link: want.link,
				};
				if (JSON.stringify(actual) !== JSON.stringify(expected)) {
					mismatches.push(
						`${name}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`,
					);
				}
			}
			expect(mismatches).toEqual([]);
		});
	});
}
