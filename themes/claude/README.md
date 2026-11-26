# Synthpunk for Claude Code

A Claude Code plugin with two parts:

- **The Desktop app's look.** Pastel or Neon, with light and dark halves, painted over the Claude desktop app's Code tab.
- **Four CLI themes** for `/theme` in Claude Code on the terminal: Synthpunk Pastel Dark, Pastel Light, Neon Dark and Neon Light.

## Installation

At the prompt of a Claude Code terminal session:

```text
/plugin install synthpunk --marketplace slowdini/synthpunk
```

From a shell:

```sh
claude plugin install synthpunk --marketplace slowdini/synthpunk
```

In the Claude desktop app, click **+** next to the prompt box, then **Plugins**. Choose **Add marketplace**, enter `slowdini/synthpunk`, then choose **Add plugin**.

A plugin installed at the user scope from a terminal also loads in the desktop app's local sessions.

## The Desktop look

The look applies when a session starts. It follows the app's own light or dark setting.

To choose between Pastel and Neon, set the plugin's **Look** option, which defaults to `pastel`. You set it when you install the plugin, and can change it later in the `synthpunk.variant` row of `/config` in a terminal session.

The look uses the app's design-system colors: surfaces, text, borders, and the accent, status and git colors. Claude Code keeps these parts in its own colors:

- Permission prompts.
- The integrated terminal's 16 ANSI colors. Set those with your shell's or terminal's own theme.
- Syntax highlighting in code blocks and in the file and diff panes. It uses one of the app's built-in highlighting themes.

## The CLI themes

Run `/theme` and pick a Synthpunk entry. Each one builds on Claude Code's built-in `dark` or `light` theme and replaces its text, status, mode, border and diff colors.

The terminal draws the background, so pair each CLI theme with the matching Synthpunk terminal theme, such as the [WezTerm schemes](../wezterm/README.md). The contrast checks assume that background.

## Files

| Path | Contents |
|------|----------|
| `.claude-plugin/plugin.json` | Manifest, including the **Look** option |
| `hooks/register.ts` | Sets the look at session start |
| `hooks/looks.ts` | Each look's resolved palette |
| `hooks/register.test.ts` | The hooks module's test. Run it with `claude plugin test themes/claude` |
| `themes/*.json` | The four CLI themes |

Every file except this README is generated. Run `bun run build` from the repository root to regenerate it.
