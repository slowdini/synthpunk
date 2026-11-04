import type { ThemeRegistrationRaw } from "shiki";

export type TargetThemeRegistration = ThemeRegistrationRaw & { name: string };

export type TargetSyntaxPalette = {
	comment: string;
	keyword: string;
	string: string;
	number: string;
	boolean: string;
	constant: string;
	operator: string;
	function: string;
	type: string;
	variable: string;
	property: string;
	namespace: string;
	attribute: string;
	tag: string;
};

export function opaque(color: string): string {
	return /^#[0-9a-f]{8}$/i.test(color) ? color.slice(0, 7) : color;
}

export function targetShikiTheme(
	name: string,
	background: string,
	foreground: string,
	syntax: TargetSyntaxPalette,
): TargetThemeRegistration {
	return {
		name,
		type: "dark",
		colors: {
			"editor.background": opaque(background),
			"editor.foreground": opaque(foreground),
		},
		tokenColors: [
			{
				name: "Comment",
				scope: ["comment", "comment.block", "comment.line"],
				settings: { foreground: opaque(syntax.comment), fontStyle: "italic" },
			},
			{
				name: "Keyword",
				scope: ["keyword", "storage.modifier"],
				settings: { foreground: opaque(syntax.keyword), fontStyle: "" },
			},
			{
				name: "String",
				scope: ["string", "string.quoted", "string.template"],
				settings: { foreground: opaque(syntax.string), fontStyle: "" },
			},
			{
				name: "Number",
				scope: ["constant.numeric"],
				settings: { foreground: opaque(syntax.number), fontStyle: "" },
			},
			{
				name: "Boolean",
				scope: ["constant.language.boolean"],
				settings: { foreground: opaque(syntax.boolean), fontStyle: "" },
			},
			{
				name: "Constant",
				scope: ["constant", "constant.language"],
				settings: { foreground: opaque(syntax.constant), fontStyle: "" },
			},
			{
				name: "Operator",
				scope: ["keyword.operator"],
				settings: { foreground: opaque(syntax.operator), fontStyle: "" },
			},
			{
				name: "Function",
				scope: ["entity.name.function", "support.function"],
				settings: { foreground: opaque(syntax.function), fontStyle: "" },
			},
			{
				name: "Type",
				scope: ["entity.name.type", "support.type", "storage.type"],
				settings: { foreground: opaque(syntax.type), fontStyle: "" },
			},
			{
				name: "Variable",
				scope: ["variable", "variable.other", "variable.parameter"],
				settings: { foreground: opaque(syntax.variable), fontStyle: "" },
			},
			{
				name: "Property",
				scope: ["variable.other.property", "entity.name.variable.member", "meta.property"],
				settings: { foreground: opaque(syntax.property), fontStyle: "" },
			},
			{
				name: "Namespace",
				scope: ["entity.name.namespace", "entity.name.module"],
				settings: { foreground: opaque(syntax.namespace), fontStyle: "" },
			},
			{
				name: "Attribute",
				scope: ["entity.other.attribute", "entity.other.attribute-name", "meta.attribute", "decorator"],
				settings: { foreground: opaque(syntax.attribute), fontStyle: "" },
			},
			{
				name: "Tag",
				scope: ["entity.name.tag"],
				settings: { foreground: opaque(syntax.tag), fontStyle: "" },
			},
		],
	// Shiki accepts tokenColors-only VS Code themes even though RawTheme
	// describes the alternative settings representation as required.
	} as unknown as TargetThemeRegistration;
}
