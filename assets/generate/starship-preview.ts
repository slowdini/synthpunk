export type StarshipPalette = Record<string, string>;

export function parseStarshipPalette(source: string, variant: string): StarshipPalette {
	const document = Bun.TOML.parse(source) as {
		palettes: Record<string, StarshipPalette>;
	};
	const palette = document.palettes[variant];
	if (!palette) throw new Error(`Starship palette not found: ${variant}`);
	return palette;
}

const MONO_FONT = "'Cascadia Code', 'Cascadia Mono', Menlo, Consolas, monospace";
const UI_FONT = "-apple-system, 'Segoe UI', system-ui, sans-serif";
const STARSHIP_CSS = `
	.starship-preview { width: 1120px; height: 650px; overflow: hidden; border-radius: 12px; display: flex; flex-direction: column; background: var(--terminal-bg); color: var(--terminal-fg); font-family: ${MONO_FONT}; box-shadow: 0 30px 70px rgba(0,0,0,.55),0 0 0 1px rgba(255,255,255,.06); }
	.starship-preview * { box-sizing: border-box; }
	.starship-title { height: 40px; flex: 0 0 40px; display: flex; align-items: center; gap: 8px; padding: 0 14px; background: var(--terminal-alt); color: var(--muted); font: 12px ${UI_FONT}; }
	.starship-title .dot { width: 11px; height: 11px; border-radius: 50%; }
	.starship-title .name { margin-left: 8px; }
	.starship-body { flex: 1; padding: 42px 38px; font-size: 15px; line-height: 1.65; }
	.starship-context { margin-bottom: 24px; color: var(--muted); font-size: 13px; }
	.starship-prompt { display: flex; align-items: stretch; padding-right: 22px; filter: drop-shadow(0 7px 12px rgba(0,0,0,.24)); }
	.starship-segment { min-height: 48px; display: flex; align-items: center; gap: 8px; margin-right: -13px; padding: 0 29px 0 18px; color: var(--segment-ink); background: var(--segment); clip-path: polygon(0 0,calc(100% - 15px) 0,100% 50%,calc(100% - 15px) 100%,0 100%); white-space: nowrap; font-weight: 600; }
	.starship-segment:first-child { padding-left: 22px; }
	.starship-command { margin-top: 18px; }
	.starship-character { color: var(--success); font-weight: 700; }
	.starship-output { margin: 14px 0 0 25px; }
	.starship-output .pass { color: var(--success); }
	.starship-output .muted { color: var(--muted); }
	.starship-output .command { color: var(--accent); }
	.starship-next { margin-top: 24px; }
	.starship-cursor { display: inline-block; width: 9px; height: 19px; margin-left: 5px; vertical-align: -4px; background: var(--cursor); }
	.starship-note { margin-top: 32px; padding-top: 20px; border-top: 1px solid var(--border); color: var(--muted); font-size: 12px; }
	.starship-note strong { color: var(--accent); font-weight: 500; }
`;

export function starshipPreviewHtml(palette: StarshipPalette): string {
	const variables = [
		`--terminal-bg:${palette.base}`,
		`--terminal-alt:${palette.crust}`,
		`--terminal-fg:${palette.text}`,
		`--segment-ink:${palette.ink}`,
		`--segment-red:${palette.red}`,
		`--segment-peach:${palette.peach}`,
		`--segment-yellow:${palette.yellow}`,
		`--segment-green:${palette.green}`,
		`--segment-sapphire:${palette.sapphire}`,
		`--segment-lavender:${palette.lavender}`,
		`--success:${palette.green}`,
		`--accent:${palette.teal}`,
		`--cursor:${palette.lavender}`,
		`--muted:${palette.subtext0}`,
		`--border:${palette.surface1}`,
	].join(";");
	return `<section class="tool-preview starship-preview" style="${variables}">
		<div class="starship-title"><span class="dot" style="background:#FF5F57"></span><span class="dot" style="background:#FEBC2E"></span><span class="dot" style="background:#28C840"></span><span class="name">Terminal — Starship</span></div>
		<div class="starship-body"><div class="starship-context">zsh · ~/projects/synthpunk</div>
		<div class="starship-prompt"><span class="starship-segment" style="--segment:var(--segment-red)">linux studio</span><span class="starship-segment" style="--segment:var(--segment-peach)">~/synthpunk</span><span class="starship-segment" style="--segment:var(--segment-yellow)">Y main*</span><span class="starship-segment" style="--segment:var(--segment-green)">bun 1.4.4</span><span class="starship-segment" style="--segment:var(--segment-sapphire)">docker</span><span class="starship-segment" style="--segment:var(--segment-lavender)">14:32</span></div>
		<div class="starship-command"><span class="starship-character">❯</span> bun test</div>
		<div class="starship-output"><div><span class="pass">✓</span> all tests passed</div><div><span class="pass">✓</span> 0 failures</div><div class="muted">target and preview checks passed</div></div>
		<div class="starship-next"><span class="starship-character">❯</span> <span class="starship-cursor"></span></div>
		<div class="starship-note"><strong>Starship</strong> · synthpunk_neon_dark palette · OS, directory, Git, runtime, container, and time modules</div></div>
		<style>${STARSHIP_CSS}</style></section>`;
}
