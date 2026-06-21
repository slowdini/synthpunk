/**
 * Generates the README marketing images from the Synthpunk VS Code themes:
 *   - assets/icon.png          angular-synthwave neon icon
 *   - assets/sample-*.png      Neon Dark syntax-highlight previews (react/python/rust/csharp/markdown)
 *   - assets/hero.png          2x2 grid of one snippet across all four variants
 *
 * Highlighting uses shiki loaded with the repo's own VS Code theme JSON, so the
 * colors are exactly what the editor renders. Rendering is done by screenshotting
 * HTML with the system Chrome via puppeteer-core.
 *
 * Run:  bun install && bun run generate.ts   (set CHROME_PATH to override the browser)
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";
import { createHighlighter, type ThemeRegistrationRaw } from "shiki";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(HERE, "..", "..");
const THEMES_DIR = resolve(REPO, "themes/vscode/themes");
const SNIPPETS = resolve(HERE, "snippets");
const OUT = resolve(REPO, "assets");

// --- theme loading ---------------------------------------------------------

const VARIANT_FILES = {
	"pastel-dark": "synthpunk-pastel-dark-color-theme.json",
	"pastel-light": "synthpunk-pastel-light-color-theme.json",
	"neon-dark": "synthpunk-neon-dark-color-theme.json",
	"neon-light": "synthpunk-neon-light-color-theme.json",
} as const;
type VariantKey = keyof typeof VARIANT_FILES;

type Theme = {
	name: string;
	type: string;
	colors: Record<string, string>;
	tokenColors: unknown[];
};

const themes = Object.fromEntries(
	(Object.keys(VARIANT_FILES) as VariantKey[]).map((key) => [
		key,
		JSON.parse(readFileSync(resolve(THEMES_DIR, VARIANT_FILES[key]), "utf8")) as Theme,
	]),
) as Record<VariantKey, Theme>;

// --- browser / chrome ------------------------------------------------------

function chromePath(): string {
	const candidates = [
		process.env.CHROME_PATH,
		"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
		"/Applications/Chromium.app/Contents/MacOS/Chromium",
		"/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
		"/usr/bin/google-chrome",
		"/usr/bin/chromium",
	].filter((p): p is string => Boolean(p));
	const found = candidates.find((p) => existsSync(p));
	if (!found) {
		throw new Error("No Chrome/Chromium found. Set CHROME_PATH to a browser executable.");
	}
	return found;
}

// --- html templating -------------------------------------------------------

const FONT_STACK = "'Cascadia Code', 'Cascadia Mono', Menlo, Consolas, monospace";
const UI_FONT = "-apple-system, 'Segoe UI', system-ui, sans-serif";

const PAGE_CSS = `
	* { box-sizing: border-box; }
	html, body { margin: 0; padding: 0; background: transparent; }
	#shot { display: inline-block; padding: 56px; background: transparent; }
	.window {
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 30px 70px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.05);
	}
	.titlebar { display: flex; align-items: center; gap: 9px; padding: 13px 16px; }
	.dot { width: 12px; height: 12px; border-radius: 50%; display: inline-block; }
	.filename { margin-left: 10px; font: 500 13px ${UI_FONT}; opacity: 0.85; }
	.code { padding: 22px 26px; overflow: hidden; }
	.code pre.shiki { margin: 0; background: transparent !important; }
	.code pre.shiki code { font: 15px/1.65 ${FONT_STACK}; }
	.code .line { white-space: pre; }
	.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 36px; }
	.cell .label { margin: 0 0 11px 3px; font: 600 14px ${UI_FONT}; color: #9a8fb0; letter-spacing: 0.4px; }
`;

function page(inner: string, pad = 56): string {
	return `<!doctype html><html><head><meta charset="utf-8"><style>${PAGE_CSS}
	#shot { padding: ${pad}px; }</style></head><body><div id="shot">${inner}</div></body></html>`;
}

function windowHtml(codeHtml: string, theme: Theme, filename: string): string {
	const bg = theme.colors["editor.background"];
	const titleBg = theme.colors["titleBar.activeBackground"] ?? bg;
	const nameColor = theme.colors["tab.activeForeground"] ?? theme.colors.foreground ?? "#888";
	return `<div class="window" style="background:${bg}">
		<div class="titlebar" style="background:${titleBg}">
			<span class="dot" style="background:#FF5F57"></span>
			<span class="dot" style="background:#FEBC2E"></span>
			<span class="dot" style="background:#28C840"></span>
			<span class="filename" style="color:${nameColor}">${filename}</span>
		</div>
		<div class="code" style="background:${bg}">${codeHtml}</div>
	</div>`;
}

const ICON_HTML = `<!doctype html><html><head><meta charset="utf-8"><style>
	html, body { margin: 0; padding: 0; background: transparent; }
	.icon {
		position: relative; width: 512px; height: 512px; border-radius: 116px; overflow: hidden;
		background: radial-gradient(135% 135% at 28% 16%, #1d0f33 0%, #0f0620 56%, #060210 100%);
	}
	.shard { position: absolute; mix-blend-mode: screen; filter: blur(1.5px); }
	.floor {
		position: absolute; left: -25%; right: -25%; bottom: -4%; height: 46%;
		background:
			repeating-linear-gradient(90deg, transparent 0 46px, rgba(0,232,240,0.55) 46px 48px),
			repeating-linear-gradient(0deg, transparent 0 40px, rgba(208,64,255,0.45) 40px 42px);
		transform: perspective(340px) rotateX(64deg); transform-origin: bottom center;
		mix-blend-mode: screen; opacity: 0.45;
	}
</style></head><body><div class="icon">
	<div class="shard" style="left:-22%;top:4%;width:164%;height:74px;transform:rotate(-30deg);background:linear-gradient(90deg,transparent,#FF5CA8 24%,#FF2A8A 50%,#FF5CA8 76%,transparent)"></div>
	<div class="shard" style="left:-22%;top:30%;width:164%;height:96px;transform:rotate(-30deg);background:linear-gradient(90deg,transparent,#A060FF 24%,#D040FF 50%,#A060FF 76%,transparent)"></div>
	<div class="shard" style="left:-22%;top:57%;width:164%;height:74px;transform:rotate(-30deg);background:linear-gradient(90deg,transparent,#00E8F0 24%,#40FF80 50%,#00E8F0 76%,transparent)"></div>
	<div class="shard" style="left:-22%;top:16%;width:164%;height:26px;transform:rotate(27deg);background:linear-gradient(90deg,transparent,#FF8040 38%,#FFE040 62%,transparent)"></div>
	<div class="shard" style="left:-22%;top:64%;width:164%;height:22px;transform:rotate(27deg);background:linear-gradient(90deg,transparent,#FFE040 38%,#40FF80 62%,transparent)"></div>
	<div class="floor"></div>
</div></body></html>`;

// --- rendering -------------------------------------------------------------

async function main() {
	const highlighter = await createHighlighter({
		themes: Object.values(themes) as ThemeRegistrationRaw[],
		langs: ["tsx", "python", "rust", "csharp", "markdown", "typescript"],
	});

	const browser = await puppeteer.launch({
		executablePath: chromePath(),
		headless: true,
		args: ["--force-color-profile=srgb", "--font-render-hinting=none", "--hide-scrollbars"],
	});

	async function shoot(html: string, outFile: string, selector = "#shot", scale = 2) {
		const p = await browser.newPage();
		await p.setViewport({ width: 1700, height: 1100, deviceScaleFactor: scale });
		await p.setContent(html, { waitUntil: "load" });
		await p.evaluate(async () => {
			await document.fonts.ready;
		});
		const el = await p.$(selector);
		if (!el) throw new Error(`selector ${selector} not found`);
		await el.screenshot({ path: outFile, omitBackground: true });
		await p.close();
		console.log("wrote", outFile.replace(`${REPO}/`, ""));
	}

	function read(name: string): string {
		return readFileSync(resolve(SNIPPETS, name), "utf8").replace(/\n+$/, "");
	}

	// Per-language samples in Neon Dark.
	const neon = themes["neon-dark"];
	const samples = [
		{ out: "sample-react.png", file: "App.tsx", lang: "tsx", snippet: "App.tsx" },
		{ out: "sample-python.png", file: "pipeline.py", lang: "python", snippet: "pipeline.py" },
		{ out: "sample-rust.png", file: "lib.rs", lang: "rust", snippet: "lib.rs" },
		{ out: "sample-csharp.png", file: "Service.cs", lang: "csharp", snippet: "Service.cs" },
		{ out: "sample-markdown.png", file: "README.md", lang: "markdown", snippet: "sample.md" },
	];
	for (const s of samples) {
		const codeHtml = highlighter.codeToHtml(read(s.snippet), { lang: s.lang, theme: neon.name });
		await shoot(page(windowHtml(codeHtml, neon, s.file)), resolve(OUT, s.out));
	}

	// Four-variant hero from one shared snippet.
	const heroCode = read("hero.ts");
	const order: Array<[VariantKey, string]> = [
		["pastel-dark", "Pastel Dark"],
		["pastel-light", "Pastel Light"],
		["neon-dark", "Neon Dark"],
		["neon-light", "Neon Light"],
	];
	const cells = order
		.map(([key, label]) => {
			const codeHtml = highlighter.codeToHtml(heroCode, { lang: "typescript", theme: themes[key].name });
			return `<div class="cell"><div class="label">${label}</div>${windowHtml(codeHtml, themes[key], "theme.ts")}</div>`;
		})
		.join("");
	await shoot(page(`<div class="grid">${cells}</div>`, 56), resolve(OUT, "hero.png"));

	// Icon.
	await shoot(ICON_HTML, resolve(OUT, "icon.png"), ".icon");

	await browser.close();
	console.log("done.");
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
