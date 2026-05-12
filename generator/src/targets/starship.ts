import type { VariantName, Palette } from "../types";
import { VARIANTS } from "../types";

const LANGUAGE_SYMBOLS: Record<string, string> = {
	c: " ",
	rust: "",
	golang: "",
	nodejs: "",
	bun: "",
	php: "",
	java: " ",
	kotlin: "",
	haskell: "",
	python: "",
};

const LANGUAGE_MODULES = Object.keys(LANGUAGE_SYMBOLS);

const OS_SYMBOLS: Record<string, string> = {
	Alpaquita: "",
	Alpine: "",
	Amazon: "",
	Android: "",
	Arch: "󰣇",
	Artix: "󰣇",
	CentOS: "",
	Debian: "󰣚",
	DragonFly: "",
	Emscripten: "󰖟",
	EndeavourOS: "",
	Fedora: "󰣛",
	FreeBSD: "",
	Gentoo: "󰣨",
	HardenedBSD: "",
	Illumos: "",
	Linux: "󰌽",
	Mabox: "",
	Macos: "󰀵",
	Manjaro: "",
	Mariner: "󰍲",
	MidnightBSD: "",
	Mint: "󰣭",
	NetBSD: "",
	NixOS: "",
	OpenBSD: "",
	OpenCloudOS: "󰅟",
	openEuler: "󰏒",
	openSUSE: "",
	OracleLinux: "󱄛",
	Pop: "",
	Raspbian: "󰐿",
	Redhat: "󱄛",
	RedHatEnterprise: "󱄛",
	Redox: "󰌽",
	Solus: "",
	SUSE: "",
	Ubuntu: "󰕈",
	Unknown: "󰋗",
	Windows: "",
};

const VARIANT_PALETTE_NAME: Record<VariantName, string> = {
	"pastel-dark": "synthpunk_pastel_dark",
	"pastel-light": "synthpunk_pastel_light",
	"neon-dark": "synthpunk_neon_dark",
	"neon-light": "synthpunk_neon_light",
};

function paletteSection(variant: VariantName, palette: Palette): string {
	const name = VARIANT_PALETTE_NAME[variant];
	const sectionLines: string[] = [`[palettes.${name}]`];
	for (const [colorName, color] of Object.entries(palette.colors)) {
		sectionLines.push(`${colorName} = "#${color.hex}"`);
	}
	return sectionLines.join("\n");
}

export function generateStarshipToml(
	palettes: Record<VariantName, Palette>,
): string {
	const lines: string[] = [];

	lines.push(`"$schema" = 'https://starship.rs/config-schema.json'`);
	lines.push("");

	const LEFT_CURVE = "\uE0B6";
	const RIGHT_HARD = "\uE0B0";
	const RIGHT_CURVE = "\uE0B4";

	const formatBody = [
		`[${LEFT_CURVE}](red)\\`,
		`$os\\`,
		`$username\\`,
		`[${RIGHT_HARD}](bg:peach fg:red)\\`,
		`$directory\\`,
		`[${RIGHT_HARD}](bg:yellow fg:peach)\\`,
		`$git_branch\\`,
		`$git_status\\`,
		`[${RIGHT_HARD}](fg:yellow bg:green)\\`,
		`$c\\`,
		`$rust\\`,
		`$golang\\`,
		`$nodejs\\`,
		`$bun\\`,
		`$php\\`,
		`$java\\`,
		`$kotlin\\`,
		`$haskell\\`,
		`$python\\`,
		`[${RIGHT_HARD}](fg:green bg:sapphire)\\`,
		`$conda\\`,
		`$docker_context\\`,
		`[${RIGHT_HARD}](fg:sapphire bg:lavender)\\`,
		`$time\\`,
		`[${RIGHT_CURVE} ](fg:lavender)\\`,
		`$cmd_duration\\`,
		`$line_break\\`,
		`$character"""`,
	];

	lines.push('format = """');
	for (const line of formatBody) {
		lines.push(line);
	}
	lines.push("");
	lines.push("palette = 'synthpunk_pastel_dark'");
	lines.push("");

	lines.push("[os]");
	lines.push("disabled = false");
	lines.push(`style = "bg:red fg:crust"`);
	lines.push("");

	lines.push("[os.symbols]");
	for (const [os, symbol] of Object.entries(OS_SYMBOLS)) {
		lines.push(`${os} = "${symbol}"`);
	}
	lines.push("");

	lines.push("[username]");
	lines.push("show_always = true");
	lines.push(`style_user = "bg:red fg:crust"`);
	lines.push(`style_root = "bg:red fg:crust"`);
	lines.push(`format = "[ $user]($style)"`);
	lines.push("");

	lines.push("[directory]");
	lines.push(`style = "bg:peach fg:crust"`);
	lines.push(`format = "[ $path ]($style)"`);
	lines.push("truncation_length = 3");
	lines.push(`truncation_symbol = ".../"`);
	lines.push("");

	lines.push("[directory.substitutions]");
	lines.push(`Documents = "󰈙 "`);
	lines.push(`Downloads = " "`);
	lines.push(`Music = "󰝚 "`);
	lines.push(`Pictures = " "`);
	lines.push(`Developer = "󰲋 "`);
	lines.push("");

	lines.push("[git_branch]");
	lines.push(`symbol = ""`);
	lines.push(`style = "bg:yellow"`);
	lines.push(`format = "[[ $symbol $branch ](fg:crust bg:yellow)]($style)"`);
	lines.push("");

	lines.push("[git_status]");
	lines.push(`style = "bg:yellow"`);
	lines.push(
		`format = "[[($all_status$ahead_behind )](fg:crust bg:yellow)]($style)"`,
	);
	lines.push("");

	for (const lang of LANGUAGE_MODULES) {
		const symbol = LANGUAGE_SYMBOLS[lang];
		lines.push(`[${lang}]`);
		lines.push(`style = "bg:green"`);
		lines.push(
			`format = "[[ ${symbol}( $version) ](fg:crust bg:green)]($style)"`,
		);
		lines.push("");
	}

	lines.push("[docker_context]");
	lines.push(`symbol = ""`);
	lines.push(`style = "bg:sapphire"`);
	lines.push(
		`format = "[[ $symbol( $context) ](fg:crust bg:sapphire)]($style)"`,
	);
	lines.push("");

	lines.push("[conda]");
	lines.push(`symbol = "  "`);
	lines.push(`style = "fg:crust bg:sapphire"`);
	lines.push(`format = "[$symbol$environment ]($style)"`);
	lines.push("ignore_base = false");
	lines.push("");

	lines.push("[time]");
	lines.push("disabled = false");
	lines.push(`time_format = "%R"`);
	lines.push(`style = "bg:lavender"`);
	lines.push(`format = "[[  $time ](fg:crust bg:lavender)]($style)"`);
	lines.push("");

	lines.push("[line_break]");
	lines.push("disabled = true");
	lines.push("");

	lines.push("[character]");
	lines.push("disabled = false");
	lines.push(`success_symbol = "[❯](bold fg:green)"`);
	lines.push(`error_symbol = "[❯](bold fg:red)"`);
	lines.push(`vimcmd_symbol = "[❮](bold fg:green)"`);
	lines.push(`vimcmd_replace_one_symbol = "[❮](bold fg:lavender)"`);
	lines.push(`vimcmd_replace_symbol = "[❮](bold fg:lavender)"`);
	lines.push(`vimcmd_visual_symbol = "[❮](bold fg:yellow)"`);
	lines.push("");

	lines.push("[cmd_duration]");
	lines.push("show_milliseconds = true");
	lines.push(`format = " in $duration "`);
	lines.push(`style = "bg:lavender"`);
	lines.push("disabled = false");
	lines.push("show_notifications = true");
	lines.push("min_time_to_notify = 45000");
	lines.push("");

	for (const variant of VARIANTS) {
		lines.push(paletteSection(variant, palettes[variant]));
		lines.push("");
	}

	return lines.join("\n");
}
