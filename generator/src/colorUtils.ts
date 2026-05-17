export function hexToRgb(hex: string): [number, number, number] {
	const h = hex.replace("#", "");
	return [
		parseInt(h.substring(0, 2), 16),
		parseInt(h.substring(2, 4), 16),
		parseInt(h.substring(4, 6), 16),
	];
}

export function rgbToHex(r: number, g: number, b: number): string {
	return [r, g, b]
		.map((c) =>
			Math.max(0, Math.min(255, Math.round(c)))
				.toString(16)
				.padStart(2, "0")
				.toUpperCase(),
		)
		.join("");
}

export function rgbToHsl(
	r: number,
	g: number,
	b: number,
): [number, number, number] {
	const rn = r / 255;
	const gn = g / 255;
	const bn = b / 255;
	const max = Math.max(rn, gn, bn);
	const min = Math.min(rn, gn, bn);
	const l = (max + min) / 2;
	if (max === min) return [0, 0, l];
	const d = max - min;
	const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	let h: number;
	switch (max) {
		case rn:
			h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
			break;
		case gn:
			h = ((bn - rn) / d + 2) / 6;
			break;
		default:
			h = ((rn - gn) / d + 4) / 6;
			break;
	}
	return [h, s, l];
}

export function hslToRgb(
	h: number,
	s: number,
	l: number,
): [number, number, number] {
	if (s === 0) {
		const v = Math.round(l * 255);
		return [v, v, v];
	}
	const hue2rgb = (p: number, q: number, t: number) => {
		let tt = t;
		if (tt < 0) tt += 1;
		if (tt > 1) tt -= 1;
		if (tt < 1 / 6) return p + (q - p) * 6 * tt;
		if (tt < 1 / 2) return q;
		if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
		return p;
	};
	const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	const p = 2 * l - q;
	return [
		Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
		Math.round(hue2rgb(p, q, h) * 255),
		Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
	];
}

export type BrightnessDirection = "lighten" | "dim";

export function adjustBrightness(
	rgb: [number, number, number],
	factor: number,
	direction: BrightnessDirection,
): [number, number, number] {
	const [h, s, l] = rgbToHsl(...rgb);
	let newL: number;
	if (direction === "lighten") {
		newL = l + (1 - l) * factor;
	} else {
		newL = l * (1 - factor);
	}
	return hslToRgb(h, s, newL).map((c) => Math.max(0, Math.min(255, c))) as [
		number,
		number,
		number,
	];
}
